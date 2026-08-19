# Last.fm Bot

![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![Last.fm](https://img.shields.io/badge/Last.fm-%23D51007.svg?style=for-the-badge&logo=lastdotfm&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)

Last.fm Bot ist eine private, user-installierbare Discord-App für deinen aktuellen oder zuletzt gescrobbelten Song. Verbinde deinen Last.fm-Username, nutze `/fm` und erhalte eine übersichtliche Components-v2-Karte mit Songtitel, Künstler, Album, Cover und Last.fm-Link.

## Get started

> [!NOTE]
> Die Installation läuft vollständig über das Terminal. Node.js 22 oder neuer und ein Last.fm-API-Key werden benötigt.

### 1. Repository herunterladen

```bash
git clone https://github.com/DEIN-USERNAME/lastfmbot.git
cd lastfmbot
npm i
```

### 2. Umgebungsvariablen einrichten

```bash
cp .env.example .env
```

Öffne `.env` und trage deine Werte ein:

```env
DISCORD_TOKEN=dein_bot_token
DISCORD_CLIENT_ID=deine_application_id
LASTFM_API_KEY=dein_lastfm_api_key
DATA_FILE=./data/accounts.json
```

Den Discord-Token und die Application ID bekommst du im [Discord Developer Portal](https://discord.com/developers/applications). Einen Last.fm-Key kannst du über [Last.fm API](https://www.last.fm/api/account/create) erstellen.

### 3. Commands registrieren und Bot starten

```bash
npm run register
npm run build
npm start
```

Für die Entwicklung mit automatischem Neustart:

```bash
npm run dev
```

## Auf Discord installieren

Installiere den Bot direkt über diesen Link:

<p align="center">
  <a href="https://discord.com/oauth2/authorize?client_id=1539424944310587422"><img src="https://img.shields.io/badge/Add%20to%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Add to Discord" /></a>
</p>

Aktiviere im Developer Portal unter **Installation** den Bereich **User Install** und verwende für User Install ausschließlich den Scope `applications.commands`.

## Commands

- `/fm` zeigt den aktuellen oder letzten Last.fm-Track.
- `/fm-login` öffnet die Connect-Last.fm-Karte und das Username-Modal.
- `/fm-logout` entfernt die gespeicherte Last.fm-Verknüpfung.

Wenn noch kein Last.fm-Account verbunden ist, zeigt `/fm` automatisch die Connect-Karte. Der Connect-Button ist grau und weiterhin anklickbar.

## Privacy safeguards

Gespeichert werden nur Discord-ID, Last.fm-Username und der Verknüpfungszeitpunkt. Last.fm-Passwörter und OAuth-Tokens werden nicht gespeichert. Die Daten liegen standardmäßig in `data/accounts.json` und werden nicht ins Repository eingecheckt.

## Emoji-Synchronisierung

Beim Start lädt die App `album.png`, `microphone.png` und `wave.png` direkt von `cloud.ryz.wtf` und erstellt fehlende Application Emojis über Discords API. Lokale Emoji-Dateien werden nicht benötigt.

<br/>

<p align="center">
  <a href="https://ryz.wtf"><img src="https://img.shields.io/badge/ryz.wtf-181a1e?style=for-the-badge&logo=googlechrome&logoColor=FFFFFF" alt="Website" /></a>
  <a href="https://discord.com/oauth2/authorize?client_id=1539424944310587422"><img src="https://img.shields.io/badge/Discord%20App-181a1e?style=for-the-badge&logo=discord&logoColor=FFFFFF" alt="Discord App" /></a>
  <a href="mailto:hey@ryz.wtf"><img src="https://img.shields.io/badge/hey@ryz.wtf-181a1e?style=for-the-badge&logo=maildotru&logoColor=FFFFFF" alt="Email" /></a>
</p>

## License

MIT
