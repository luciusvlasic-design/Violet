async function autoreactsCommand(sock, from, msg, isAdmin, session, args, botData, saveBotData) {
    if (!isAdmin) return await sock.sendMessage(from, { text: "❌ Only owner can use this command." }, { quoted: msg });

    const action = args[0]?.toLowerCase();
    if (!botData.statusSettings[session.userId]) botData.statusSettings[session.userId] = {};

    if (action === 'on') {
        session.autoReact = true;
        session.autoReactIndex = 0;
        botData.statusSettings[session.userId].autoReact = true;
        saveBotData();
        await sock.sendMessage(from, { text: "✅ Auto-React Enabled! Emojis will rotate across incoming messages." }, { quoted: msg });
    } else if (action === 'off') {
        session.autoReact = false;
        botData.statusSettings[session.userId].autoReact = false;
        saveBotData();
        await sock.sendMessage(from, { text: "❌ Auto-React Disabled!" }, { quoted: msg });
    } else {
        await sock.sendMessage(from, { text: "❌ Usage: .autoreact on/off" }, { quoted: msg });
    }
}

module.exports = autoreactsCommand;
