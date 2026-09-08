<div align="center">
  <img src="img/logo.svg" alt="PB Spotify logo" width="82" />

  # PB Spotify

  **A responsive, browser-based music player inspired by Spotify.**

  Built from scratch with HTML, CSS, and vanilla JavaScript—without frameworks or external UI libraries.

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Responsive](https://img.shields.io/badge/Responsive-Design-1ED760?style=for-the-badge)
</div>

---

## About the project

PB Spotify is a front-end music player that recreates the core experience of a modern streaming application. It discovers locally stored albums, generates album cards and song lists dynamically, and provides a complete audio playback experience across desktop and mobile screens.

The project focuses on practical DOM manipulation, asynchronous data loading, native browser audio APIs, reusable styling, and responsive interface design.

## Highlights

- Dynamic album cards generated from folder metadata
- Automatic discovery of MP3 tracks from album directories
- Play, pause, previous, and next controls
- Automatic playback of the next track
- Clickable seek bar with live progress updates
- Current playback time and total duration display
- Volume slider with mute and volume restoration
- Responsive album grid for different screen sizes
- Mobile slide-out library navigation
- Compact, touch-friendly mobile music player
- Spotify-inspired dark interface with subtle transitions
- Custom scrollbar styling and reusable CSS utilities

## Responsive experience

The interface adapts at multiple breakpoints:

| Screen | Experience |
| --- | --- |
| Desktop | Persistent library sidebar, fluid album grid, and full playback controls |
| Tablet | Collapsible library drawer and two-column album layout |
| Mobile | Touch-friendly controls, compact player, and reduced visual clutter |
| Small mobile | Single-column album layout for maximum readability |

## Tech stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic page structure and player markup |
| CSS3 | Layout, responsive breakpoints, animations, and visual design |
| JavaScript (ES6+) | Album loading, DOM rendering, events, and player state |
| HTML Audio API | Track playback, seeking, timing, and volume control |
| JSON | Album title and description metadata |

No build system, package manager, framework, or database is required.

## How it works

```text
Album folders
    ↓
Read info.json metadata
    ↓
Generate album cards
    ↓
User selects an album
    ↓
Discover and render its MP3 tracks
    ↓
Control playback through the HTML Audio API
```

Every album directory contains:

```text
album-name/
├── cover.jpg
├── info.json
└── one-or-more-tracks.mp3
```

Example metadata:

```json
{
  "title": "Love Songs",
  "description": "This is Love Songs"
}
```

This structure makes it straightforward to extend the application with more local albums.

## Project structure

```text
spotify/
├── img/                 # Interface icons and application logo
├── songs/
│   ├── cs/              # Party Songs album
│   ├── ncs/             # Love Songs album
│   └── soft/            # Soft Songs album
├── index.html           # Application layout
├── Script.js            # Player logic and dynamic rendering
├── style.css            # Main UI and responsive styling
├── Utility.css          # Utility classes and scrollbar styles
├── favicon.ico
└── README.md
```

## Run locally

This project must be served through a local web server because it uses `fetch()` to discover albums and songs. Opening `index.html` directly as a file will not work correctly.

### Using VS Code Live Server

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Install the **Live Server** extension if it is not already available.
4. Start Live Server on port `5500`.
5. Visit:

```text
http://127.0.0.1:5500
```

> The current implementation expects Live Server at `127.0.0.1:5500` and uses its directory-listing response to discover album and track folders.

## Add a new album

1. Create a new folder inside `songs/`.
2. Add a square image named `cover.jpg`.
3. Add an `info.json` file containing a title and description.
4. Place one or more `.mp3` tracks in the same folder.
5. Restart or refresh the application.

The new album will be discovered and displayed automatically when the development server exposes directory listings.

## Key implementation details

- A single `Audio` object keeps playback state consistent when tracks change.
- Album and track interfaces are rendered dynamically instead of being hardcoded in HTML.
- Event listeners connect generated cards, songs, playback buttons, the seek bar, and volume controls.
- CSS Grid creates a fluid album layout, while media queries reshape navigation and playback controls for mobile devices.
- Long track names are truncated safely to prevent layout overflow.
- Invalid or unavailable duration values are handled to avoid broken progress indicators.

## Challenges and learning

Building this project strengthened practical understanding of:

- Working with asynchronous `fetch()` requests
- Parsing server directory responses
- Managing audio state without a framework
- Rendering and updating DOM elements dynamically
- Synchronizing UI controls with playback events
- Designing responsive layouts for both desktop and touch devices
- Organizing album content with reusable folder-based metadata

## Future improvements

- Replace directory scraping with a dedicated album manifest or API
- Add search and filtering
- Add shuffle and repeat modes
- Persist volume and last-played track with local storage
- Highlight the currently playing song
- Add keyboard shortcuts and richer accessibility labels
- Deploy the application with a production-ready content manifest
- Connect signup and login screens to authentication

## Disclaimer

This project is an educational Spotify-inspired interface and is not affiliated with or endorsed by Spotify. Music and artwork should only be used when the appropriate rights or permissions are available.

---

<div align="center">
  Built to demonstrate responsive UI development, DOM programming, and browser audio handling.
</div>
