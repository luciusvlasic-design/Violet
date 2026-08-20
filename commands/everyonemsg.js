function getParticipantId(participant) {
    return participant?.id || participant?.jid || participant?.phoneNumber || null;
}

module.exports = async function everyonemsg(sock, chatId, msg, isAdmin, q = '') {
    if (!chatId.endsWith('@g.us')) {
        return sock.sendMessage(chatId, { text: '⚠️ This command can only be used inside a group.' }, { quoted: msg });
    }
    if (!isAdmin) {
        return sock.sendMessage(chatId, { text: '❌ Only group admins can use this command.' }, { quoted: msg });
    }

    try {
        const metadata = await sock.groupMetadata(chatId);
        const mentions = [...new Set((metadata.participants || []).map(getParticipantId).filter(Boolean))];
        if (!mentions.length) {
            return sock.sendMessage(chatId, { text: '❌ No group participants were found.' }, { quoted: msg });
        }

        const mentionText = mentions.map(jid => `@${jid.split('@')[0]}`).join(' ');
        const messageText = q.trim() || 'Hello everyone!';
        const text = `📢 *EVERYONE MESSAGE*\n\n${mentionText}\n\n${messageText}`;

        return sock.sendMessage(chatId, { text, mentions }, { quoted: msg });
    } catch (error) {
        return sock.sendMessage(chatId, { text: `❌ Could not mention the group: ${error.message}` }, { quoted: msg });
    }
};

module.exports.getParticipantId = getParticipantId;
