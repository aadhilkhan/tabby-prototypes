# Tabby Station Screen Prototype (Skip OTP)

## Project Overview
Interactive prototype of Tabby's in-app checkout "station screen" — the screen shown inside a merchant's app while a user completes their BNPL purchase in the Tabby app. Built to demonstrate exact screen behavior to developers.

## Deployment
- **GitHub**: `aadhilkhan/station-screen` (private)
- **Vercel**: https://skip-otp.vercel.app
- Auto-deploys on push to `main`

## Figma Source
- **File**: In-app Checkout Flow (Skip OTP)
- **Screen 1** (Sending): `node-id=1331-8482`
- **Screen 2** (Notification Sent): `node-id=1331-9292`
- **Screen 3** (Purchase Complete): `node-id=1331-9500`
- **iPhone Frame**: from file `NDgqvVr42TotXPxYIh81QB`, `node-id=8741-19378`
- **File key**: `ekQkGLPpsC1RqPEO9mScsv`

## Tech Stack
- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (config via `@theme` in CSS, `@tailwindcss/vite` plugin)
- **Motion** (formerly Framer Motion, import from `motion/react`)
- **Inter** via `@fontsource-variable/inter`
- **Radial Saudi** via local woff2 variable font in `/assets/Radial_Saudi/variable/`
- **Vite publicDir** set to `assets` (serves static files from `/assets/`)

## Design Tokens (from Figma)
### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--tui-background-general` | `#ffffff` | Screen bg |
| `--tui-background-accent-muted` | `#f2e8ff` | Spinner circle bg + ring track |
| `--tui-front-primary` | `#1d2329` | Headings, body text |
| `--tui-front-secondary` | `#7f8b99` | Descriptions, captions, safari icons |
| `--tui-front-tertiary` | `#b8c3d1` | Inactive step 1 indicator |
| `--tui-front-accent` | `#5d21de` | Accent purple (العربية, Having trouble link) |
| `--tui-line-disabled` | `#e9eff5` | Inactive dots, lines |
| `--tui-line-positive` | `#31cc7e` | Active/complete indicators + lines |
| `--tui-line-accent` | `#ccb1fa` | Spinner rotating arc |
| Notification bg | `rgba(80,79,79,0.7)` | Notification banner |
| Browser header tint | `#F9F9F9` | Status bar + Safari bar bg |

### Typography
| Style | Font | Size/Weight/LH/LS |
|-------|------|--------------------|
| H1 | Radial Saudi | 35px / 500 / 36px / -0.7px |
| Body 1 Bold | Inter Bold | 16px / 700 / 20px / -0.16px |
| Body 1 | Inter Medium | 16px / 500 / 20px / -0.16px |
| Body 2 | Inter Medium | 14px / 500 / 20px / -0.16px |
| Caption | Inter Medium | 12px / 500 / 16px / -0.13px |

## 3 States
1. **Sending** — initial state, "Sending notification...", gray indicators, gray lines
2. **Sent** — notification banner slides in, step 1 green + expanded with "Having trouble?" link, step 1 line fills green downward
3. **Complete** — notification slides out, all steps green, all lines fill green downward

## Key Components
| Component | Path | Purpose |
|-----------|------|---------|
| `PhoneFrame` | `src/components/PhoneFrame.tsx` | iPhone 15 Pro bezel frame + notification overlay |
| `StationScreen` | `src/components/StationScreen.tsx` | Main screen layout |
| `SpinnerIcon` | `src/components/SpinnerIcon.tsx` | Rotating purple progress arc + arrow icon |
| `TrackerStep` | `src/components/TrackerStep.tsx` | Individual timeline step with animated indicator + fill-down line |
| `NotificationBanner` | `src/components/NotificationBanner.tsx` | iOS notification with spring slide |
| `Footer` | `src/components/Footer.tsx` | Account switcher + consent + home indicator |
| `ControlPanel` | `src/components/ControlPanel.tsx` | 3 external buttons |
| `StatusBar` | `src/components/StatusBar.tsx` | iOS status bar (9:41, signal, wifi, battery) |
| `SafariBar` | `src/components/SafariBar.tsx` | Safari URL bar with pill input |
| `NavBar` | `src/components/NavBar.tsx` | X close, Adidas, tabby wordmark, العربية |

## Assets (served via Vite publicDir = 'assets')
- `/assets/icon.png` — Arrow icon for spinner
- `/assets/TBadge.png` — Tabby T badge for notification + favicon
- `/assets/wordmark.png` — Tabby wordmark logo for NavBar
- `/assets/iphone-frame.png` — iPhone 15 Pro Black Titanium bezel
- `/assets/Radial_Saudi/variable/RadialSaudiGX.woff2` — Variable font for headings

## Running
```bash
npm run dev
```
Opens at http://localhost:5173

## What's NOT built yet (next step)
- Account switcher bottom sheet
- "Having trouble with notification" bottom sheet (resend notification / SMS)

## Session Log

### Session 1 (2026-04-05)
- Scaffolded project from scratch (empty dir)
- Read all 3 Figma screens via MCP, extracted design tokens
- Built full prototype with 3 states and animated transitions
- Components: PhoneFrame, StatusBar, SafariBar, NavBar, SpinnerIcon, Tracker, TrackerStep, NotificationBanner, Footer, ControlPanel
- Animations: spinner rotation (CSS), notification slide (Motion spring), indicator color (Motion), content expand (AnimatePresence)
- Fixed: notification positioning (moved to PhoneFrame), removed link underline

### Session 2 (2026-04-05)
- Used user-provided TBadge.png, icon.png, wordmark.png assets
- Fixed spinner: bg color to #f2e8ff, arc to purple #ccb1fa, ring track to light purple #f2e8ff
- Added Radial Saudi font via @font-face (weight 500 for heading)
- Tinted browser header/notch with #F9F9F9
- Removed Dynamic Island (now part of iPhone frame image)
- Added iPhone 15 Pro bezel frame from Figma (iphone-frame.png)
- Added green fill-down animation (scaleY + transformOrigin top) for tracker connector lines
- Safari bar: pill-shaped URL input, full-width between icons, gray AA/refresh icons
- NavBar: tabby wordmark.png, العربية in accent purple (#5d21de)
- Footer: smaller 12px gray account switcher, home indicator with 8px bottom padding
- Removed AED 400.00 trail from step 2 and step 3
- Added Tabby T badge as favicon
- Pushed to GitHub (aadhilkhan/station-screen) and deployed to Vercel (skip-otp.vercel.app)
