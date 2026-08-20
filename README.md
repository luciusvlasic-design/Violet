# 𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐚𝐫𝐝𝐞𝐧 Bot

<img src="[https://capsule-render.vercel.app/api?type=waving&height=230&color=0:ffb6c1,50:ffe4e1,100:ffffff&text=𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐚𝐫𝐝𝐞𝐧%20MD&fontColor=8b0000&fontSize=85&fontAlignY=40&animation=twinkling&desc=Powered%20By%20%E2%9A%94%EF%B8%8FALI%20HAIDER%E2%9A%94%EF%B8%8F](https://capsule-render.vercel.app/api?type=waving&height=230&color=0:ffb6c1,50:ffe4e1,100:ffffff&text=𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐚𝐫𝐝𝐞𝐧%20MD&fontColor=8b0000&fontSize=85&fontAlignY=40&animation=twinkling&desc=Powered%20By%20%E2%9A%94%EF%B8%8FALI%20HAIDER%E2%9A%94%EF%B8%8F)" />
<div style="
margin-top: -60px;
text-align: center;
font-size: 32px;
font-weight: 1000;
letter-spacing: 3px;
background: linear-gradient(90deg, #ffc0cb, #ffffff, #ffe4e1);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-shadow:
0 0 12px #ffc0cb,
0 0 24px #ffffff,
0 0 36px #ffe4e1,
0 0 48px #ffffff;
padding: 12px 0;">

</div>

<div align="center" style="font-family: Arial, sans-serif; color: #8b0000; font-size: 16px; margin-top: 10px;">
"> Built on Baileys • Designed for Speed • Enhanced for Stability • POWERED BY ⚔️ ALI-HAIDER ⚔️
</div>
> A modular WhatsApp automation bot with group management, media tools, utilities, games, owner controls, automation features, Telegram pairing, and a web dashboard.

<p align="center">
  <img src="assets/violet-evergarden.jpg" alt="Violet Evergarden bot artwork" width="520">
</p>

**Violet Evergarden** is a Node.js-based WhatsApp bot built around the Baileys WhatsApp Web client library.[1] It combines a command dispatcher, modular command files, persistent local bot data, media conversion helpers, a Telegram pairing interface, and an Express/Socket.IO dashboard. The bot is designed for personal automation, group administration, media handling, and lightweight entertainment.

## Bot Identity

| Property | Value |
|---|---|
| Bot name | **𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐚𝐫𝐝𝐞𝐧** |
| Version | **3.0.0** |
| Runtime | Node.js 18 or newer |
| Primary platform | WhatsApp Web through Baileys |
| Dashboard | Express and Socket.IO |
| Pairing interface | Telegram bot integration and web dashboard |
| Default command prefix | `.` |
| License | MIT |
| Owner display name | Configurable in `settings.js`; current project value is `CHAYAN SINGHA ROY` |
| Branding | `Powered by 𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐚𝐫𝐝𝐞𝐧` |

> **Branding note:** Keep the owner name and “Powered by” text consistent across `settings.js`, the web dashboard footer, startup messages, and menu output before publishing the repository.

## Feature Overview

The bot contains a broad collection of modular commands. The `.menu` command presents the available command entries in horizontal rows grouped by category, making the command list easier to browse in WhatsApp.

| Area | Capabilities |
|---|---|
| WhatsApp automation | Pairing, session management, public/private mode, status automation, auto-seen, auto-like, auto-react, and message utilities |
| Group management | Member administration, promotions, demotions, muting, mentions, group information, group settings, anti-link, anti-delete, anti-call, and related protections |
| Media processing | Sticker creation, image conversion, audio extraction, image effects, OCR, enhancement, resizing, and WebP conversion |
| Downloads and search | YouTube, TikTok, Instagram, Facebook, Pinterest, Reddit, Spotify, GitHub, Google, Wikipedia, npm, and related search tools |
| Utility tools | Calculator, weather, translation, QR codes, URL conversion, hashing, JSON formatting, timestamps, UUIDs, text analysis, random numbers, unit conversion, and color inspection |
| Fun and games | Eight-ball, dice, rock-paper-scissors, fortunes, random choices, ratings, lottery numbers, mock text, compliments, jokes, trivia, riddles, and other entertainment commands |
| Owner controls | Bot status, session information, profile bio updates, cache cleanup, group inventory, autoreact reset, broadcast, restart, shutdown, and configuration controls |
| AI features | AI chat and optional model-backed features when the required API configuration is available |
| Integrations | Telegram pairing and status commands, web dashboard events, Socket.IO status updates, and optional OpenAI integration |

## Architecture

The project uses a simple modular structure. The main `index.js` file initializes the server, manages bot sessions, receives incoming messages, applies authorization and protection rules, and dispatches commands to modules under `commands/`.

| Component | Responsibility |
|---|---|
| `index.js` | Application entry point, session lifecycle, WhatsApp events, Telegram integration, dashboard server, authorization, protection flow, and command dispatch |
| `commands/` | Individual command modules grouped by feature; each module receives the socket, chat ID, message, permissions, and relevant arguments |
| `commands/menu.js` | Generates the horizontal `.menu` command listing and category sections |
| `commands/everyonemsg.js` | Implements `.ever`, `.everyone`, `.everyonemsg`, and `.allmsg` group mentions |
| `commands/sticker.js` | Converts direct or quoted images and videos into WebP stickers |
| `commands/autoreacts.js` | Enables or disables autoreact and persists its state |
| `commands/antilink.js` | Configures and reports group anti-link behavior |
| `commands/groupextras.js` | Provides additional group information and group-setting utilities |
| `commands/toolpack.js` | Provides local utility commands that do not require external APIs |
| `commands/ownerpack.js` | Provides owner-only status, session, profile, cache, and group-inventory controls |
| `lib/` | Shared helpers, converters, and support utilities |
| `data/` | Local JSON persistence for bot settings and runtime configuration |
| `auth/` | WhatsApp authentication state; this directory must not be committed publicly |
| `index.html` | Web dashboard interface for pairing and session monitoring |
| `settings.js` | Static bot identity, owner configuration, branding, version, and integration settings |

## Requirements

The project requires **Node.js 18 or newer** and npm. Some media features depend on FFmpeg, Sharp, and WebP-related packages declared in `package.json`. A stable internet connection is required for WhatsApp Web, Telegram pairing, downloads, and external APIs.

## Installation

Clone the repository and install the declared dependencies:

```bash
git clone <your-repository-url>
cd <repository-directory>
npm install
```

Create a local `.env` file. Never commit real credentials, bot tokens, API keys, session files, or dashboard passwords to GitHub.

```env
PORT=3000
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
OWNER_NUMBER=your_whatsapp_number_with_country_code
OWNER_TELEGRAM_ID=your_telegram_user_id
ADMIN_PASSWORD=change_this_dashboard_password
OPENAI_API_KEY=optional_api_key
```

Start the bot in production-style mode:

```bash
npm start
```

Start it with automatic reload during development:

```bash
npm run dev
```

The dashboard is normally available at `http://localhost:3000`. If the bot is deployed behind a reverse proxy, firewall, container, or hosting provider, configure the exposed port and access policy accordingly.

## Configuration

The most important configuration values are stored in environment variables and `settings.js`.

| Setting | Purpose | Recommended handling |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Enables Telegram pairing and Telegram owner commands | Store only in `.env` or a secret manager |
| `OWNER_NUMBER` | Identifies the WhatsApp owner number | Include country code and do not publish it in a public repository |
| `OWNER_TELEGRAM_ID` | Identifies the Telegram owner account | Keep private and use the numeric Telegram ID |
| `OPENAI_API_KEY` | Enables optional AI features | Leave unset if AI features are not required |
| `ADMIN_PASSWORD` | Protects dashboard administration | Replace any development password before deployment |
| `PORT` | Sets the web server port | Use the port provided by the hosting environment |
| `settings.botName` | Bot display name | Keep consistent with menu and startup branding |
| `settings.ownerName` | Owner display name | Use a public display name if publishing the repository |
| `settings.prefix` | Command prefix shown in the settings | The current command parser uses `.` commands |

## Pairing and First Run

After starting the application, use the web dashboard or the configured Telegram pairing flow to request a WhatsApp pairing code. Complete the linking process from WhatsApp’s **Linked Devices** section. Once the session is connected, send `.menu` to the bot to view the available command categories.

Authentication data is stored locally under the project’s authentication directory. Treat this directory as sensitive because it can contain credentials that grant access to a WhatsApp session. Delete or rotate it if a deployment is compromised.

## Command Usage

Commands use the default dot prefix. Arguments are separated by spaces, and commands that accept a message usually use the remainder of the message as their query.

```text
.menu
.sticker
.autoreact on
.autoreact off
.antilink status
.antilink kick
.ever Meeting starts at 8 PM
.hash hello world
.unit 10 km mi
```

### Recently Updated Commands

| Command | Description | Permission |
|---|---|---|
| `.menu` | Displays the horizontal command menu | All authorized users |
| `.sticker` / `.s` | Creates a WebP sticker from a direct or quoted image/video | All authorized users, subject to chat policy |
| `.autoreact on/off` | Enables or disables sequential emoji reactions across incoming messages | Admin or owner according to session policy |
| `.antilink on/del` | Deletes detected links in a group | Group admin |
| `.antilink kick` | Deletes links and attempts to remove the sender | Group admin and bot admin privileges |
| `.antilink off/status` | Disables anti-link or reports its state | Group admin |
| `.ever` / `.everyone` | Mentions all current group participants with an optional message | Group admin |
| `.admins` / `.tagadmins` | Lists or mentions group administrators | Group context |
| `.membercount` / `.groupstats` | Displays group membership information | Group context |
| `.ownerhelp` | Shows owner-only controls | Owner only |
| `.botstatus` | Shows connection, mode, autoreact, and ghost-mode state | Owner only |
| `.setbio <text>` | Updates the WhatsApp profile bio | Owner only |
| `.resetreact` | Resets the autoreact emoji rotation | Owner only |
| `.hash <text>` | Generates a local SHA-256 digest | All authorized users |
| `.jsonpretty <JSON>` | Formats JSON for readability | All authorized users |
| `.unit <amount> <from> <to>` | Converts common length units | All authorized users |

## Command Categories

The full menu groups commands into categories. The lists below are representative rather than exhaustive because aliases and additional modules may be added over time.

| Category | Representative commands |
|---|---|
| Owner | `.public`, `.private`, `.mode`, `.ownerhelp`, `.botstatus`, `.sessioninfo`, `.setbio`, `.restart`, `.shutdown`, `.backup`, `.restore` |
| Group | `.kick`, `.add`, `.promote`, `.demote`, `.mute`, `.tagall`, `.hidetag`, `.ever`, `.admins`, `.members`, `.setsubject`, `.antilink`, `.antidelete` |
| Tools | `.ping`, `.translate`, `.base64`, `.qr`, `.calc`, `.weather`, `.github`, `.whois`, `.dnslookup`, `.timestamp`, `.uuid`, `.hash`, `.random`, `.color` |
| Fun | `.joke`, `.meme`, `.truth`, `.dare`, `.8ball`, `.choose`, `.dice`, `.rps`, `.fortune`, `.pickup`, `.rate`, `.lottery` |
| Downloads | `.song`, `.video`, `.youtube`, `.tiktok`, `.instagram`, `.facebook`, `.spotify`, `.gitclone` |
| Media | `.sticker`, `.toimg`, `.tomp3`, `.blur`, `.crop`, `.flip`, `.grayscale`, `.ocr`, `.enhance`, `.upscale` |
| AI | `.ai`, `.chatbot`, `.gali`, and other optional AI integrations |
| Islamic | `.quran`, `.hadith`, `.prayer`, `.qibla`, `.asmaulhusna` |
| Anime and text | Anime interaction commands, logo generators, text effects, and image-text styles |

## Permission Model

The bot distinguishes between regular authorized users, group administrators, the owner, the bot account, and the session user. A command module should enforce its own permission requirement even when the dispatcher passes a permission flag.

| Role | Typical access |
|---|---|
| Regular authorized user | Public tools, fun commands, media conversion, and permitted downloads |
| Group administrator | Group moderation, group settings, participant mentions, and protection toggles |
| Bot owner | Owner controls, session management, broadcasts, mode changes, and sensitive administration |
| Bot account | Exempt from its own automated reactions and moderation actions where appropriate |
| Unauthorized user in private mode | No command execution |

## Protection Features

The project includes configurable protections such as anti-link, anti-delete, anti-call, anti-status, anti-view-once, anti-spam, and related group controls. These protections can affect messages and group membership, so administrators should test them in a private group before enabling them in production.

For anti-link behavior, the supported modes are delete-only and delete-plus-kick. The detector recognizes common HTTP/HTTPS links, `www` links, WhatsApp invite links, `wa.me`, Telegram links, Discord invites, and common website domains. Group administrators, the owner, and the bot are exempt from the enforcement path.

## Dashboard and Telegram Integration

The Express dashboard provides a browser-based pairing and monitoring interface. Socket.IO is used for connection status, logs, pairing-code updates, and dashboard events. The optional Telegram integration can provide pairing, status reporting, and owner-restricted operational commands through the configured Telegram bot token.[2]

Do not expose the dashboard to the public internet without authentication, a strong password, HTTPS, and an appropriate reverse-proxy or firewall policy. If public access is not required, bind it to a private network or restrict access at the infrastructure layer.

## Development Guidelines

New commands should be implemented as small modules under `commands/`. The module should validate its inputs, enforce its permission requirements, return clear error messages, and avoid leaking credentials or internal paths. Add the command to the registry in `index.js`, route aliases in the dispatcher, and add the command to `commands/menu.js` so users can discover it.

Before opening a pull request, run syntax checks and targeted tests for the changed module:

```bash
node --check index.js
node --check commands/your-command.js
npm start
```

Keep temporary test files, authentication directories, `.env` files, logs containing personal data, and generated media out of commits. Use a private fork or a local development environment for testing account-connected behavior.

## Troubleshooting

| Symptom | Possible cause | Suggested action |
|---|---|---|
| Pairing code does not arrive | Telegram token, owner ID, or session setup is incorrect | Check `.env`, Telegram bot status, and application logs |
| Bot connects but ignores commands | Private mode, authorization mismatch, or wrong prefix | Confirm the sender is authorized and use the configured dot prefix |
| `.sticker` fails | Unsupported media, missing conversion dependency, or oversized video | Try a normal image first, then verify npm dependencies and FFmpeg support |
| `.antilink` does nothing | The setting is disabled, the sender is an admin, or the bot lacks group privileges | Run `.antilink status`, enable the desired mode, and promote the bot if kick mode is needed |
| `.ever` fails | The command was sent outside a group or the bot cannot read group metadata | Use it in a group and confirm the bot is connected with group access |
| Dashboard is unavailable | Incorrect port, firewall, or process failure | Check `PORT`, server logs, and the hosting provider’s exposed port |
| Session disconnects repeatedly | Authentication state, network, or WhatsApp device limit issue | Remove only the affected auth state after preserving any required backup, then pair again |

## Security and Responsible Use

This bot can perform moderation, messaging, media downloads, profile updates, and other account actions. Use it only with accounts and groups where you have permission. Do not use bulk messaging, call automation, spam, crash, bug, or destructive features against other users or services. Respect WhatsApp’s terms, local law, privacy expectations, and group rules.

Never publish `.env`, authentication folders, API keys, Telegram tokens, dashboard passwords, owner phone numbers, or personal chat data. Rotate credentials immediately if they are exposed. For production deployments, use a secret manager, HTTPS, least-privilege access, isolated service accounts, rate limits, structured logging, and regular backups.

## License

This project is released under the MIT License. See the `LICENSE` file if one is included in the repository, or add the project’s intended license file before publishing.

## References

[1]: https://github.com/WhiskeySockets/Baileys "Baileys WhatsApp Web API library"
[2]: https://core.telegram.org/bots/api "Telegram Bot API documentation"
[3]: https://nodejs.org/en/docs "Node.js documentation"
[4]: https://expressjs.com/ "Express documentation"
[5]: https://socket.io/docs/v4/ "Socket.IO documentation"
