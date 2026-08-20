const answers8Ball = [
    'Yes — absolutely.',
    'No — not this time.',
    'The signs point to yes.',
    'Ask again after a snack.',
    'It is very likely.',
    'The outlook is uncertain.',
    'Definitely not.',
    'Trust your instincts.'
];

const fortunes = [
    'A small opportunity will turn into something memorable.',
    'Your next good idea is closer than you think.',
    'Someone appreciates your effort more than they say.',
    'A surprise message will brighten your day.',
    'Patience will reveal the best answer.',
    'Your sense of humor will solve an awkward moment.',
    'A bold but kind choice will work in your favor.'
];

const pickupLines = [
    'Are you a notification? Because I smile every time you appear.',
    'You must be a magician; you made everyone else disappear.',
    'If kindness were a language, you would be fluent.',
    'Are you the menu? Because you are the best option here.',
    'I was going to tell a joke, but your smile already stole the show.'
];

const rpsChoices = ['rock', 'paper', 'scissors'];

function pick(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function formatName(text) {
    return text?.trim() || 'friend';
}

async function send(sock, chatId, msg, text) {
    return sock.sendMessage(chatId, { text }, { quoted: msg });
}

module.exports = async function funpack(sock, chatId, msg, commandName, q, args) {
    const input = q?.trim() || '';
    const lowerInput = input.toLowerCase();

    switch (commandName) {
        case '8ball':
        case 'magic8':
            if (!input) return send(sock, chatId, msg, '🎱 Ask a yes/no question. Example: .8ball will today be lucky?');
            return send(sock, chatId, msg, `🎱 *Magic 8-Ball*\n\nQuestion: ${input}\nAnswer: ${pick(answers8Ball)}`);

        case 'choose':
        case 'pick': {
            const options = input.split(/\s*(?:\||,| or )\s*/i).map(item => item.trim()).filter(Boolean);
            if (options.length < 2) return send(sock, chatId, msg, '🎯 Give me at least two options. Example: .choose pizza | burger');
            return send(sock, chatId, msg, `🎯 I choose: *${pick(options)}*`);
        }

        case 'dice': {
            const count = Math.min(Math.max(parseInt(args?.[0], 10) || 1, 1), 10);
            const sides = Math.min(Math.max(parseInt(args?.[1], 10) || 6, 2), 100);
            const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
            return send(sock, chatId, msg, `🎲 Rolled ${count}d${sides}: *${rolls.join(', ')}*\nTotal: *${rolls.reduce((sum, value) => sum + value, 0)}*`);
        }

        case 'rps':
        case 'rockpaperscissors': {
            const player = lowerInput;
            if (!rpsChoices.includes(player)) return send(sock, chatId, msg, '✊ Choose rock, paper, or scissors. Example: .rps rock');
            const bot = pick(rpsChoices);
            const won = (player === 'rock' && bot === 'scissors') || (player === 'paper' && bot === 'rock') || (player === 'scissors' && bot === 'paper');
            const result = player === bot ? 'It is a draw.' : won ? 'You win!' : 'I win this round!';
            return send(sock, chatId, msg, `✊ You: *${player}*\n🤖 Bot: *${bot}*\n\n🏆 ${result}`);
        }

        case 'fortune':
            return send(sock, chatId, msg, `🔮 *Your fortune*\n\n${pick(fortunes)}`);

        case 'pickup':
            return send(sock, chatId, msg, `💘 ${pick(pickupLines)}`);

        case 'rate': {
            const target = formatName(input);
            const score = Math.floor(Math.random() * 101);
            return send(sock, chatId, msg, `📊 I rate *${target}* ${score}/100.`);
        }

        case 'lottery': {
            const numbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1).sort((a, b) => a - b);
            return send(sock, chatId, msg, `🎟️ Your lucky numbers: *${numbers.join(' - ')}*`);
        }

        case 'mock': {
            if (!input) return send(sock, chatId, msg, '😏 Give me text to mock. Example: .mock I am serious');
            const mocked = [...input].map((character, index) => index % 2 ? character.toLowerCase() : character.toUpperCase()).join('');
            return send(sock, chatId, msg, `😏 ${mocked}`);
        }

        case 'complimentme':
            return send(sock, chatId, msg, `🌟 ${formatName(input)}, you bring a surprisingly good energy to every chat.`);

        default:
            return send(sock, chatId, msg, '❌ Unknown fun command. Try .8ball, .choose, .dice, .rps, .fortune, .pickup, .rate, .lottery, .mock, or .complimentme.');
    }
};

module.exports.pick = pick;
module.exports.answers8Ball = answers8Ball;
module.exports.fortunes = fortunes;
module.exports.pickupLines = pickupLines;
