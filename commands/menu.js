const settings = require('../settings');

async function menuCommand(sock, from, msg, session, commands) {
    // ===== HEAVY BOX HEADER =====
    let menuText = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
    menuText += `┃  💀  *𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐫𝐚𝐝𝐞𝐧 MENU*  💀               ┃\n`;
    menuText += `┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫\n`;
    menuText += `┃  📋 TOTAL COMMANDS: 300+                   ┃\n`;
    menuText += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;

    // ===== CATEGORIES (آپ کی اوریجنل کیٹیگریز) =====
    const categories = {
        '👑 OWNER': ['public', 'private', 'mode', 'owner', 'ownerhelp', 'botstatus', 'sessioninfo', 'setbio', 'resetreact', 'clearcache', 'listgroups', 'groupcount', 'setname', 'block', 'unblock', 'bcgc', 'bcall', 'restart', 'shutdown', 'xrestart', 'xshutdown', 'nuke', 'clear', 'backup', 'restore', 'clone', 'addsudo', 'delsudo', 'listsudo', 'setprefix', 'broadcast', 'self', 'autostatus', 'autoseen', 'autolike', 'autobio'],
        '👥 GROUP': ['kick', 'add', 'promote', 'demote', 'mute', 'unmute', 'tagall', 'hidetag', 'ever', 'everyone', 'everyonemsg', 'allmsg', 'grouplink', 'groupinfo', 'join', 'leave', 'setdesc', 'setsubject', 'setppgc', 'getbio', 'getdp', 'accept', 'poll', 'listonline', 'admins', 'tagadmins', 'members', 'membercount', 'groupid', 'groupstats', 'tagme', 'mention', 'kickoffline', 'snipe', 'editmsg', 'react', 'send', 'forward', 'save', 'announce', 'lockchat', 'openchat', 'unlockchat', 'welcome', 'goodbye', 'setwelcome', 'setgoodbye', 'antilink', 'antidelete', 'antiviewonce', 'antifake', 'antispam', 'antibug', 'anticall', 'antistatus'],
        '🤖 AI': ['ai', 'chatbot', 'gali', 'chatgpt', 'gemini', 'llama', 'deepseek', 'flux', 'pixart', 'dalle', 'bingai', 'blackbox', 'imagine', 'midjourney', 'simi', 'brainly', 'math'],
        '⬇️ DOWNLOAD': ['song', 'video', 'insta', 'tiktok', 'facebook', 'youtube', 'pinterest', 'twitter', 'reddit', 'spotify', 'mf', 'apk', 'gdrive', 'ytdl', 'ytmp3', 'ytmp4', 'gitclone', 'threads', 'snapchat', 'capcut', 'terabox'],
        '🛠️ TOOLS': ['ping', 'dp', 'vv', 'translate', 'base64', 'qr', 'shorturl', 'calc', 'weather', 'github', 'ipinfo', 'tempmail', 'fakeinfo', 'binlookup', 'whois', 'dnslookup', 'portscan', 'screenshot', 'define', 'timestamp', 'uuid', 'hash', 'urlencode', 'urldecode', 'reverse', 'count', 'jsonpretty', 'random', 'unit', 'color', 'google', 'wiki', 'yts', 'playstore', 'npm', 'sticker', 'toimg', 'tomp3', 'tts', 'blur', 'invert', 'crop', 'flip', 'grayscale', 'removebg', 'enlarge', 'runtime', 'uptime', 'serverinfo', 'speedtest', 'device', 'pdf', 'ocr', 'remini', 'enhance', 'upscale', 'find', 'location', 'time', 'search'],
        '🎉 FUN': ['joke', 'meme', 'dare', 'truth', 'ascii', 'roast', 'compliment', 'ship', 'emojimix', 'character', 'quote', 'fact', 'trivia', 'coinflip', 'roll', 'riddle', 'wouldyourather', '8ball', 'choose', 'dice', 'rps', 'fortune', 'pickup', 'rate', 'lottery', 'mock', 'complimentme', 'hack', 'report', 'spam', 'smsbomb', 'callbomb', 'crash', 'freeze', 'lag', 'bug', 'locspam', 'vcardspam', 'buttonspam', 'pollspam', 'contactspam', 'tictactoe', 'chess', 'hangman'],
        '🕌 ISLAMIC': ['quran', 'hadith', 'prayer', 'qibla', 'asmaulhusna', 'surah', 'ayat', 'tafsir', 'dua', 'azkar'],
        '🎌 ANIME': ['anime', 'manga', 'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'slap', 'kill', 'happy', 'wink', 'poke', 'dance', 'cringe'],
        '🏢 LOGO': ['neon', 'glitch', 'gold', '3dtext', 'fire', 'water', 'galaxy', 'marvel', 'avengers', 'transformer', 'blackpink', 'gradient', 'luxury', 'royal', 'metal', 'steel', 'chrome', 'glossy'],
        '✏️ TEXT MAKER': ['bali', 'cup', 'coffee', 'cloud', 'smoke', 'flower', 'leaf', 'wood', 'stone', 'blood', 'horror', 'scary', 'spooky', 'christmas', 'birthday', 'love', 'heart']
    };

    // ===== BUILD LIST (Horizontal command rows) =====
    for (const [category, cmds] of Object.entries(categories)) {
        menuText += `┏━━━━━━ ❲ *${category}* ❳ ━━━━━━┓\n`;

        const rows = [];
        let row = [];
        let rowLength = 0;
        for (const cmd of cmds) {
            const rendered = `.${cmd}`;
            const nextLength = rowLength === 0 ? rendered.length : rowLength + 2 + rendered.length;
            if (row.length >= 4 || nextLength > 72) {
                rows.push(row.join('  '));
                row = [rendered];
                rowLength = rendered.length;
            } else {
                row.push(rendered);
                rowLength = nextLength;
            }
        }
        if (row.length) rows.push(row.join('  '));

        for (const [index, rowText] of rows.entries()) {
            menuText += `┃  ${index === 0 ? '➤ ' : '   '}${rowText}\n`;
        }
        menuText += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
    }

    // ===== FOOTER =====
    menuText += `☠️  *POWERED BY : 𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐫𝐚𝐝𝐞𝐧*  ☠️`;

    // ===== SEND =====
    try {
        await sock.sendMessage(from, { image: { url: settings.startimage }, caption: menuText }, { quoted: msg });
    } catch (e) {
        // Fallback
        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
    }
}

module.exports = menuCommand;