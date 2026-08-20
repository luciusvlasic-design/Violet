const crypto = require('crypto');

function send(sock, chatId, msg, text) {
    return sock.sendMessage(chatId, { text }, { quoted: msg });
}

function parseHexColor(value) {
    const normalized = value.trim().replace(/^#/, '');
    if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
    return {
        hex: `#${normalized.toUpperCase()}`,
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16)
    };
}

const lengthUnits = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344
};

async function toolpack(sock, chatId, msg, commandName, q, args = []) {
    const input = q?.trim() || '';

    try {
        switch (commandName) {
            case 'timestamp':
                return send(sock, chatId, msg, `🕒 Current time\nUTC: ${new Date().toISOString()}\nUnix: ${Math.floor(Date.now() / 1000)}`);

            case 'uuid':
                return send(sock, chatId, msg, `🆔 ${crypto.randomUUID()}`);

            case 'hash': {
                if (!input) return send(sock, chatId, msg, '⚠️ Usage: .hash <text>');
                return send(sock, chatId, msg, `🔐 SHA-256:\n${crypto.createHash('sha256').update(input, 'utf8').digest('hex')}`);
            }

            case 'urlencode':
                if (!input) return send(sock, chatId, msg, '⚠️ Usage: .urlencode <text>');
                return send(sock, chatId, msg, encodeURIComponent(input));

            case 'urldecode':
                if (!input) return send(sock, chatId, msg, '⚠️ Usage: .urldecode <encoded text>');
                return send(sock, chatId, msg, decodeURIComponent(input));

            case 'reverse':
                if (!input) return send(sock, chatId, msg, '⚠️ Usage: .reverse <text>');
                return send(sock, chatId, msg, [...input].reverse().join(''));

            case 'count': {
                if (!input) return send(sock, chatId, msg, '⚠️ Usage: .count <text>');
                const words = input.split(/\s+/).filter(Boolean);
                const characters = [...input].length;
                return send(sock, chatId, msg, `📏 Characters: *${characters}*\nWords: *${words.length}*\nLines: *${input.split(/\r?\n/).length}*`);
            }

            case 'jsonpretty': {
                if (!input) return send(sock, chatId, msg, '⚠️ Usage: .jsonpretty <JSON>');
                const formatted = JSON.stringify(JSON.parse(input), null, 2);
                return send(sock, chatId, msg, formatted.length > 3900 ? `${formatted.slice(0, 3890)}\n…` : formatted);
            }

            case 'random': {
                const min = Number(args[0] ?? 1);
                const max = Number(args[1] ?? 100);
                if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) return send(sock, chatId, msg, '⚠️ Usage: .random <min> <max>');
                const value = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
                return send(sock, chatId, msg, `🎲 Random number: *${value}*`);
            }

            case 'unit': {
                const [amountText, from, to] = input.split(/\s+/);
                const amount = Number(amountText);
                if (!Number.isFinite(amount) || !lengthUnits[from] || !lengthUnits[to]) return send(sock, chatId, msg, '⚠️ Usage: .unit <amount> <from> <to>\nExample: .unit 10 km mi');
                const result = amount * lengthUnits[from] / lengthUnits[to];
                return send(sock, chatId, msg, `📐 ${amount} ${from} = *${Number(result.toFixed(8))} ${to}*`);
            }

            case 'color': {
                const color = parseHexColor(input);
                if (!color) return send(sock, chatId, msg, '⚠️ Usage: .color <6-digit hex>\nExample: .color #8A2BE2');
                return send(sock, chatId, msg, `🎨 ${color.hex}\nRGB: *${color.r}, ${color.g}, ${color.b}*`);
            }

            default:
                return send(sock, chatId, msg, '❌ Unknown tool command.');
        }
    } catch (error) {
        return send(sock, chatId, msg, `❌ Tool error: ${error.message}`);
    }
}

module.exports = toolpack;
module.exports.parseHexColor = parseHexColor;
module.exports.lengthUnits = lengthUnits;
