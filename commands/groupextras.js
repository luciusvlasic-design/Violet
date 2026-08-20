function isGroupChat(chatId) {
    return typeof chatId === 'string' && chatId.endsWith('@g.us');
}

async function send(sock, chatId, msg, text, mentions = []) {
    return sock.sendMessage(chatId, { text, mentions }, { quoted: msg });
}

function getAdmins(participants = []) {
    return participants.filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin');
}

function displayNumber(jid) {
    return `@${String(jid).split('@')[0]}`;
}

async function getMetadata(sock, chatId) {
    return sock.groupMetadata(chatId);
}

module.exports = async function groupExtras(sock, chatId, msg, isAdmin, commandName, q) {
    if (!isGroupChat(chatId)) {
        return send(sock, chatId, msg, '⚠️ This command can only be used inside a WhatsApp group.');
    }

    try {
        const metadata = await getMetadata(sock, chatId);
        const participants = metadata.participants || [];
        const admins = getAdmins(participants);
        const adminIds = admins.map(participant => participant.id);

        switch (commandName) {
            case 'admins':
            case 'adminlist': {
                if (!admins.length) return send(sock, chatId, msg, '👑 No group admins were found.');
                const lines = admins.map((admin, index) => `${index + 1}. ${displayNumber(admin.id)}`);
                return send(sock, chatId, msg, `👑 *GROUP ADMINS*\n\n${lines.join('\n')}`, adminIds);
            }

            case 'tagadmins':
                if (!admins.length) return send(sock, chatId, msg, '👑 No group admins were found.');
                return send(sock, chatId, msg, `📢 Admin attention requested:\n${adminIds.map(displayNumber).join(' ')}`, adminIds);

            case 'members': {
                const maxMembers = 100;
                const visibleMembers = participants.slice(0, maxMembers);
                const lines = visibleMembers.map((participant, index) => `${index + 1}. ${displayNumber(participant.id)}`);
                const suffix = participants.length > maxMembers ? `\n\n…and ${participants.length - maxMembers} more members.` : '';
                return send(sock, chatId, msg, `👥 *GROUP MEMBERS (${participants.length})*\n\n${lines.join('\n')}${suffix}`, visibleMembers.map(participant => participant.id));
            }

            case 'membercount':
                return send(sock, chatId, msg, `👥 This group has *${participants.length} members* and *${admins.length} admins*.`);

            case 'groupid':
                return send(sock, chatId, msg, `🆔 Group ID:\n${chatId}`);

            case 'groupstats': {
                const owner = metadata.owner || metadata.subjectOwner || admins.find(admin => admin.admin === 'superadmin')?.id;
                const ownerText = owner ? displayNumber(owner) : 'Not available';
                return send(sock, chatId, msg, `📊 *GROUP STATS*\n\nName: *${metadata.subject || 'Unnamed group'}*\nMembers: *${participants.length}*\nAdmins: *${admins.length}*\nOwner: ${ownerText}\nDescription: ${metadata.desc || 'No description'}`, owner ? [owner] : []);
            }

            case 'setsubject':
                if (!isAdmin) return send(sock, chatId, msg, '❌ Only group admins can change the group name.');
                if (!q?.trim()) return send(sock, chatId, msg, '⚠️ Usage: .setsubject <new group name>');
                await sock.groupUpdateSubject(chatId, q.trim());
                return send(sock, chatId, msg, '✅ Group name updated successfully.');

            case 'announce':
            case 'lockchat':
                if (!isAdmin) return send(sock, chatId, msg, '❌ Only group admins can lock the chat.');
                await sock.groupSettingUpdate(chatId, 'announcement');
                return send(sock, chatId, msg, '🔒 Group locked. Only admins can send messages.');

            case 'openchat':
            case 'unlockchat':
                if (!isAdmin) return send(sock, chatId, msg, '❌ Only group admins can open the chat.');
                await sock.groupSettingUpdate(chatId, 'not_announcement');
                return send(sock, chatId, msg, '🔓 Group opened. All members can send messages.');

            default:
                return send(sock, chatId, msg, '❌ Unknown group utility command.');
        }
    } catch (error) {
        return send(sock, chatId, msg, `❌ Group command error: ${error.message}`);
    }
};

module.exports.isGroupChat = isGroupChat;
module.exports.getAdmins = getAdmins;
module.exports.displayNumber = displayNumber;
