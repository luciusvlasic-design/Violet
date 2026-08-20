const MODES = new Set(['del', 'kick']);

function ensureStore(botData) {
    if (!botData.antilinkGroups || typeof botData.antilinkGroups !== 'object') {
        botData.antilinkGroups = {};
    }
    return botData.antilinkGroups;
}

function normalizeMode(value) {
    const action = String(value || '').trim().toLowerCase();
    if (['on', 'enable', 'enabled', 'del', 'delete', 'remove'].includes(action)) return 'del';
    if (['kick', 'removeandkick', 'kickanddelete'].includes(action)) return 'kick';
    if (['off', 'disable', 'disabled', 'none'].includes(action)) return 'off';
    if (['status', 'state'].includes(action)) return 'status';
    return null;
}

function getAntiLinkStatus(botData, chatId) {
    const mode = ensureStore(botData)[chatId];
    return mode === 'kick' ? 'kick' : mode === 'del' ? 'del' : 'off';
}

async function antilinkCommand(sock, from, msg, isAdmin, botData, saveBotData, args = []) {
    if (!from.endsWith('@g.us')) {
        return sock.sendMessage(from, { text: '⚠️ `.antilink` can only be used in groups.' }, { quoted: msg });
    }
    if (!isAdmin) {
        return sock.sendMessage(from, { text: '❌ Only group admins can use this command.' }, { quoted: msg });
    }

    const store = ensureStore(botData);
    const mode = normalizeMode(args[0]);

    if (mode === 'status') {
        const current = getAntiLinkStatus(botData, from);
        const label = current === 'kick' ? 'Delete + kick' : current === 'del' ? 'Delete only' : 'Disabled';
        return sock.sendMessage(from, { text: `🔗 Anti-link status: *${label}*\n\nUsage: .antilink on, .antilink kick, or .antilink off` }, { quoted: msg });
    }

    if (mode === 'off') {
        delete store[from];
        saveBotData();
        return sock.sendMessage(from, { text: '✅ Anti-link disabled for this group.' }, { quoted: msg });
    }

    if (MODES.has(mode)) {
        store[from] = mode;
        saveBotData();
        const label = mode === 'kick' ? 'delete links and remove the sender' : 'delete links only';
        return sock.sendMessage(from, { text: `✅ Anti-link enabled: ${label}.` }, { quoted: msg });
    }

    return sock.sendMessage(from, { text: '⚠️ Usage: .antilink on | .antilink kick | .antilink off | .antilink status' }, { quoted: msg });
}

module.exports = antilinkCommand;
module.exports.MODES = MODES;
module.exports.ensureStore = ensureStore;
module.exports.normalizeMode = normalizeMode;
module.exports.getAntiLinkStatus = getAntiLinkStatus;
