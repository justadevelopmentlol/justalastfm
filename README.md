# Last.fm Bot

Eine private, user-installierbare Discord-App in TypeScript. Mit `/fm` zeigt sie den aktuell laufenden oder zuletzt gescrobbelten Last.fm-Track als Discord Components-v2-Karte. Der Tracktitel führt direkt zur Last.fm-Seite des Songs.

## Funktionen

- User Install: Jede Person fügt die App nur ihrem eigenen Discord-Account hinzu
- `/fm`: aktueller oder letzter Track
- `/fm login`: Modal für den Last.fm-Username
- `/fm logout`: löscht die Verknüpfung
- Zuordnung Discord-ID → Last.fm-Username in `data/accounts.json`
- Application Emojis werden beim Start von `cloud.ryz.wtf` synchronisiert
- Components v2 mit Container, Section, Thumbnail und Buttons

## Voraussetzungen

- Node.js 22 oder neuer
- Eine Discord-Anwendung mit Bot-Token
- Ein [Last.fm API-Key](https://www.last.fm/api/account/create)

## Installation

```bash
git clone https://github.com/DEIN-USERNAME/lastfmbot.git
cd lastfmbot
npm install
cp .env.example .env
```

Trage anschließend die Werte in `.env` ein:

```env
DISCORD_TOKEN=dein_bot_token
DISCORD_CLIENT_ID=deine_application_id
LASTFM_API_KEY=dein_lastfm_api_key
```

## Discord konfigurieren

Öffne das [Discord Developer Portal](https://discord.com/developers/applications), wähle deine Anwendung und konfiguriere unter **Installation**:

1. Aktiviere **User Install** unter *Installation Contexts*.
2. Wähle bei *Install Link* **Discord Provided Link**.
3. Stelle bei *User Install* als Scope ausschließlich `applications.commands` ein.
4. Speichere die Änderungen.

Danach die globale Command-Definition registrieren und die App starten:

```bash
npm run register
npm run build
npm start
```

Die App ist nun über ihren Install-Link persönlich installierbar. User-Install-Apps sind nur für die jeweilige Person sichtbar, nicht als Server-Bot für alle Mitglieder.

## Entwicklung

```bash
npm run dev
npm run check
```

`data/accounts.json` wird beim ersten Login erstellt und ist absichtlich nicht versioniert. Für produktive Nutzung ersetze den JSON-Store bei mehreren Instanzen durch eine gemeinsame Datenbank.

## Emoji-Synchronisierung

Beim erfolgreichen Start lädt die App `album.webp`, `microphone.webp` und `wave.webp` direkt von `cloud.ryz.wtf` und erstellt fehlende Application Emojis über Discords API. Bereits vorhandene Emojis gleichen Namens werden wiederverwendet. Falls Discord den Upload ablehnt oder die Cloud vorübergehend nicht erreichbar ist, verwendet die Karte automatisch passende Unicode-Emojis als Fallback.

## Datenschutz

Gespeichert werden nur Discord-ID, Last.fm-Username und der Verknüpfungszeitpunkt. Es werden keine Last.fm-Passwörter oder OAuth-Tokens benötigt.

## Lizenz

MIT
