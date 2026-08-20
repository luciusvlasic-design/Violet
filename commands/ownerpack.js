async function send(sock, chatId, msg, text) {
    return sock.sendMessage(chatId, { text }, { quoted: msg });
}

function ownerOnly(isOwner, sock, chatId, msg) {
    if (isOwner) return true;
    send(sock, chatId, msg, '❌ Owner only!');
    return false;
}

async function getGroups(sock) {
    const groups = await sock.groupFetchAllParticipating();
    return Object.values(groups || {});
}

module.exports = async function ownerpack(sock, chatId, msg, isOwner, session, commandName, q) {
    if (!ownerOnly(isOwner, sock, chatId, msg)) return;

    try {
        switch (commandName) {
            case 'ownerhelp':
                return send(sock, chatId, msg, `👑 *OWNER CONTROLS*\n\n.botstatus — show bot state\n.sessioninfo — show session details\n.setbio <text> — update profile bio\n.resetreact — restart emoji rotation\n.clearcache — clear local session caches\n.listgroups — list joined groups\n.groupcount — count joined groups`);

            case 'botstatus':
                return send(sock, chatId, msg, `📡 *BOT STATUS*\n\nConnection: *${session.isConnected ? 'Connected' : 'Disconnected'}*\nMode: *${session.isPublic ? 'Public' : 'Private'}*\nAutoreact: *${session.autoReact ? 'ON' : 'OFF'}*\nGhost mode: *${session.ghostMode ? 'ON' : 'OFF'}*\nSession: *${session.userId}*`);

            case 'sessioninfo':
                return send(sock, chatId, msg, `🧾 *SESSION INFO*\n\nUser ID: ${session.userId}\nPhone: ${session.phoneNumber || 'Not paired'}\nConnected: ${session.isConnected ? 'Yes' : 'No'}\nAuth path: ${session.authPath}`);

            case 'setbio':
                if (!q?.trim()) return send(sock, chatId, msg, '⚠️ Usage: .setbio <new profile bio>');
                if (typeof sock.updateProfileStatus !== 'function') return send(sock, chatId, msg, '❌ This WhatsApp connection does not support profile updates.');
                await sock.updateProfileStatus(q.trim());
                return send(sock, chatId, msg, '✅ Profile bio updated.');

            case 'resetreact':
                session.autoReactIndex = 0;
                return send(sock, chatId, msg, '✅ Autoreact emoji rotation reset to the first emoji.');

            case 'clearcache':
                if (session.processedMessages?.clear) session.processedMessages.clear();
                session.userChats = {};
                return send(sock, chatId, msg, '✅ Local session caches cleared.');

            case 'listgroups': {
                const groups = await getGroups(sock);
                if (!groups.length) return send(sock, chatId, msg, '👥 This session has not joined any groups.');
                const lines = groups.slice(0, 30).map((group, index) => `${index + 1}. ${group.subject || group.id}`);
                const suffix = groups.length > 30 ? `\n…and ${groups.length - 30} more groups.` : '';
                return send(sock, chatId, msg, `👥 *JOINED GROUPS (${groups.length})*\n\n${lines.join('\n')}${suffix}`);
            }

            case 'groupcount': {
                const groups = await getGroups(sock);
                return send(sock, chatId, msg, `👥 Joined groups: *${groups.length}*`);
            }

            default:
                return send(sock, chatId, msg, '❌ Unknown owner command. Try .ownerhelp.');
        }
    } catch (error) {
        return send(sock, chatId, msg, `❌ Owner command error: ${error.message}`);
    }
};

module.exports.ownerOnly = ownerOnly;
module.exports.getGroups = getGroups;
