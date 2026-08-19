# justalastfm

![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![Last.fm](https://img.shields.io/badge/Last.fm-%23D51007.svg?style=for-the-badge&logo=lastdotfm&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)

justalastfm is a public, user-installable Discord app for displaying your currently playing or most recently scrobbled track. Connect your Last.fm username, run `/fm`, and get a clean Discord Components v2 card with the song, artist, album, cover art, and a direct Last.fm link.

## Get started

> [!NOTE]
> Installation is done entirely from the terminal. Node.js 22 or newer and a Last.fm API key are required.

### 1. Clone the repository

```bash
git clone https://github.com/realryz/justalastfm.git
cd justalastfm
npm i
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and add your values:

```env
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_application_id
LASTFM_API_KEY=your_lastfm_api_key
DATA_FILE=./data/accounts.json
```

Get your Discord token and Application ID from the [Discord Developer Portal](https://discord.com/developers/applications). Create a Last.fm key at [Last.fm API](https://www.last.fm/api/account/create).

### 3. Register commands and start the bot

```bash
npm run register
npm run build
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

## Add the bot to Discord

Install the app directly with this link:

<p align="center">
  <a href="https://discord.com/oauth2/authorize?client_id=1539424944310587422"><img src="https://img.shields.io/badge/Add%20to%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Add to Discord" /></a>
</p>

In the Developer Portal, enable **User Install** under **Installation** and use only the `applications.commands` scope for user installations.

## Commands

- `/fm` displays the currently playing or most recent Last.fm track.
- `/fm-login` opens the Connect Last.fm card and username modal.
- `/fm-logout` removes the saved Last.fm connection.

If no Last.fm account is connected, `/fm` automatically displays the Connect card. The Connect button is gray and remains fully clickable.

## Privacy safeguards

Only the Discord ID, Last.fm username, and connection timestamp are stored. No Last.fm passwords or OAuth tokens are stored. By default, data is kept in `data/accounts.json` and is excluded from the repository.

## Emoji synchronization

On startup, the app downloads `album.png`, `lastfm.png`, `microphone.png`, and `wave.png` directly from `cloud.ryz.wtf` and creates missing Application Emojis through Discord's API. No local emoji files are required.

<br/>

<p align="center">
  <a href="https://ryz.wtf"><img src="https://img.shields.io/badge/ryz.wtf-181a1e?style=for-the-badge&logo=googlechrome&logoColor=FFFFFF" alt="Website" /></a>
  <a href="https://discord.com/oauth2/authorize?client_id=1539424944310587422"><img src="https://img.shields.io/badge/Discord%20App-181a1e?style=for-the-badge&logo=discord&logoColor=FFFFFF" alt="Discord App" /></a>
  <a href="mailto:hey@ryz.wtf"><img src="https://img.shields.io/badge/hey@ryz.wtf-181a1e?style=for-the-badge&logo=maildotru&logoColor=FFFFFF" alt="Email" /></a>
</p>
