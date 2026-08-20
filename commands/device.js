module.exports = async function(sock, chatId, msg) {
    try {
        const deviceInfo = sock.user || {};
        const platform = sock.ws?.socket?._httpMessage?.headers?.['user-agent'] || 'Unknown';
        
        const text = `*\u1F4F1 Device Information*\n\n` +
            `Bot Name: ${deviceInfo.name || 'Unknown'}\n` +
            `Number: ${deviceInfo.id ? deviceInfo.id.split(':')[0] : 'Unknown'}\n` +
            `Platform: ${platform}\n` +
            `Connected: Yes\n` +
            `Protocol: Baileys (WhatsApp Web)\n\n` +
            `_𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐫𝐚𝐝𝐞𝐧 v3.0_`;
        
        await sock.sendMessage(chatId, { text }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(chatId, { text: '\u274C Error: ' + e.message }, { quoted: msg });
    }
};
