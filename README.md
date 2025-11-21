<div align="center">

<img src="web/public/icon.png" alt="Darko Mode Icon" width="96" height="96" />

**Dark mode for every website — with adjustable filters**

[![WXT](https://img.shields.io/badge/WXT-0.20-blue)](https://wxt.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-2.x-6E9F18)](https://vitest.dev/)

[Visit Website](https://darkomode.com) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## Features

### Core Functionality

- **Theme Modes** — Toggle between Dark, Light, System, or Off
- **Visual Filters** — Fine‑tune brightness, contrast, saturation, sepia, and grayscale
- **Native Dark Detection** — Detects if a site is already dark and inverts logic to avoid double‑dark
- **Shadow DOM Support** — Applies filters inside Shadow DOMs and observes dynamically added elements

### User Experience

- **Instant Preview** — Smooth, throttled updates while dragging sliders (~30fps)
- **No Flash of Unstyled Content (FOUC)** — Blocks initial paint until styles are ready
- **Remembers Your Preferences** — Uses `storage.sync` when available; falls back to `storage.local`
- **Per‑Tab Context** — Popup shows current page title, favicon, and domain context
- **Accessible UI** — Built with semantic controls and keyboard‑friendly interactions

### Privacy & Security

- **No Tracking, No Accounts** — Preferences are stored only in your browser
- **Minimal Permissions** — `storage`, `activeTab`, `tabs`, and `<all_urls>` for styling
- **Robust Error Handling** — Error boundaries in the popup; safe fallbacks in content scripts

---

## Quick Start (Extension)

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)
- Chrome/Firefox for loading the extension

### Install and Build

```bash
# From repo root
cd extension
npm install

# Development build (watch)
npm run dev

# Production build
npm run build
```

### Load in Chrome (Developer Mode)

1. Open `chrome://extensions`
2. Enable “Developer mode”
3. Click “Load unpacked”
4. Select `extension/dist/chrome-mv3`

### Load in Firefox (Temporary Add-on)

1. Build for Firefox:
   ```bash
   cd extension
   npm run build:firefox
   ```
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Choose the `manifest.json` inside `extension/dist/firefox-mv3`

### Package for Stores

```bash
cd extension
npm run zip           # Chrome
npm run zip:firefox   # Firefox
```

---

## Tech Stack

### Core

- **[WXT](https://wxt.dev/)** — Unified extension tooling (MV3)
- **[Vite](https://vitejs.dev/)** — Fast builds and TS support
- **[React 18](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**

### UI & Styling

- **Tailwind CSS** + **tailwind-merge**
- **Heroicons** and **Radix UI** primitives

### Testing

- **Vitest** + **jsdom** with coverage reports

---

## Testing

```bash
cd extension

# Run tests in watch mode
npm run test:watch

# Run tests once (CI-friendly)
npm test

# Test UI
npm run test:ui

# Coverage report
npm run test:coverage
```

---

## Usage Tips

- Use the **Theme** tab to switch between Dark, Light, System, or Off
- Use the **Customize** tab to adjust:
  - Brightness (0–200%)
  - Contrast (0–200%)
  - Saturation (0–200%)
  - Sepia (0–100%)
  - Grayscale (0–100%)
- Click “Reset to Defaults” to quickly revert all filters

---

## How It Works (High‑Level)

- A content script injects CSS filters at `document_start` to prevent FOUC
- Native dark detection runs before filters are applied to avoid mis‑detection
- Filters are applied to both the page and known Shadow DOMs, with observers and intercepted `attachShadow` calls to keep styling in sync
- Storage writes are debounced; visual updates are throttled for smoothness

---

## Project Structure

```
darko-mode/
├── extension/
│   ├── src/
│   │   ├── components/
│   │   │   └── popup/        # Popup UI (Theme & Customize tabs)
│   │   ├── entrypoints/
│   │   │   └── content/      # Content script logic (theme controller, FOUC prevention)
│   │   └── utils/            # Storage, messaging, theme detection, shadow DOM
│   ├── public/               # Extension icons
│   └── wxt.config.ts         # Manifest and build config
└── web/                      # Marketing site (Next.js)
```

---

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/awesome-improvement`)
3. Commit your changes (`git commit -m 'feat: awesome improvement'`)
4. Push to your branch (`git push origin feat/awesome-improvement`)
5. Open a Pull Request
