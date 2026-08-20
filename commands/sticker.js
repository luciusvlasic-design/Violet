const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

ffmpeg.setFfmpegPath(ffmpegStatic);

function unwrapMessage(message) {
    let content = message;
    while (content?.ephemeralMessage?.message || content?.viewOnceMessage?.message || content?.viewOnceMessageV2?.message) {
        content = content.ephemeralMessage?.message || content.viewOnceMessage?.message || content.viewOnceMessageV2?.message;
    }
    return content;
}

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return Buffer.concat(chunks);
}

async function convertVideoToSticker(buffer, inputExtension, outputPath, inputPath) {
    await fs.writeFile(inputPath, buffer);

    await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .inputFormat(inputExtension)
            .outputOptions([
                '-vcodec libwebp',
                '-vf scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000',
                '-loop 0',
                '-t 10',
                '-an',
                '-q:v 50'
            ])
            .toFormat('webp')
            .on('end', resolve)
            .on('error', reject)
            .save(outputPath);
    });

    return fs.readFile(outputPath);
}

module.exports = async function stickerCommand(sock, chatId, msg) {
    let inputPath;
    let outputPath;

    try {
        const messageContent = unwrapMessage(msg.message);
        const quotedContent = unwrapMessage(messageContent?.extendedTextMessage?.contextInfo?.quotedMessage);
        const imageMessage = messageContent?.imageMessage || quotedContent?.imageMessage;
        const videoMessage = messageContent?.videoMessage || quotedContent?.videoMessage;
        const mediaMessage = imageMessage || videoMessage;

        if (!mediaMessage) {
            return await sock.sendMessage(
                chatId,
                { text: '⚠️ Send or reply to an image/video with .sticker' },
                { quoted: msg }
            );
        }

        await sock.sendMessage(chatId, { text: '✨ Converting to sticker...' }, { quoted: msg });

        const mediaType = imageMessage ? 'image' : 'video';
        const stream = await downloadContentFromMessage(mediaMessage, mediaType);
        const buffer = await streamToBuffer(stream);
        if (!buffer.length) throw new Error('The media download was empty. Please try again.');

        const tempDir = path.join(__dirname, '..', 'temp');
        await fs.ensureDir(tempDir);
        const id = crypto.randomBytes(8).toString('hex');
        const inputExtension = mediaType === 'video'
            ? (mediaMessage.mimetype?.includes('webm') ? 'webm' : 'mp4')
            : 'bin';
        inputPath = path.join(tempDir, `${id}_input.${inputExtension}`);
        outputPath = path.join(tempDir, `${id}_sticker.webp`);

        let stickerBuffer;
        if (mediaType === 'image') {
            stickerBuffer = await sharp(buffer)
                .rotate()
                .resize({
                    width: 512,
                    height: 512,
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .webp({ quality: 80 })
                .toBuffer();
        } else {
            stickerBuffer = await convertVideoToSticker(buffer, inputExtension, outputPath, inputPath);
        }

        await sock.sendMessage(chatId, { sticker: stickerBuffer }, { quoted: msg });
    } catch (error) {
        await sock.sendMessage(chatId, { text: '❌ Sticker error: ' + error.message }, { quoted: msg });
    } finally {
        if (inputPath) await fs.remove(inputPath).catch(() => {});
        if (outputPath) await fs.remove(outputPath).catch(() => {});
    }
};

module.exports.unwrapMessage = unwrapMessage;
module.exports.streamToBuffer = streamToBuffer;
module.exports.convertVideoToSticker = convertVideoToSticker;
