# Tabby Station Screen Prototype (Skip OTP)

## Project Overview
Interactive prototype of Tabby's in-app checkout "station screen" — the screen shown inside a merchant's app while a user completes their BNPL purchase in the Tabby app. Built to demonstrate exact screen behavior to developers.

## Figma Source
- **File**: In-app Checkout Flow (Skip OTP)
- **Screen 1** (Sending): `node-id=1331-8482`
- **Screen 2** (Notification Sent): `node-id=1331-9292`
- **Screen 3** (Purchase Complete): `node-id=1331-9500`
- **File key**: `ekQkGLPpsC1RqPEO9mScsv`

## Tech Stack
- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (config via `@theme` in CSS, `@tailwindcss/vite` plugin)
- **Motion** (formerly Framer Motion, import from `motion/react`)
- **Inter** via `@fontsource-variable/inter`
- **Radial Saudi** via local woff2 variable font in `/assets/`

## Design Tokens (from Figma)
### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--tui-background-general` | `#ffffff` | Screen bg |
| `--tui-background-accent-muted` | `#f2e8ff` | Spinner circle bg |
| `--tui-front-primary` | `#1d2329` | Headings, body text |
| `--tui-front-secondary` | `#7f8b99` | Descriptions, captions |
| `--tui-front-tertiary` | `#b8c3d1` | Inactive step 1 indicator |
| `--tui-front-accent` | `#5d21de` | Accent purple |
| `--tui-line-disabled` | `#e9eff5` | Inactive dots, lines |
| `--tui-line-positive` | `#31cc7e` | Active/complete indicators |
| `--tui-line-accent` | `#ccb1fa` | Accent line |
| Notification bg | `rgba(80,79,79,0.7)` | Notification banner |
| Browser header tint | `#F9F9F9` | Status bar + Safari bar bg |

### Typography
| Style | Font | Size/Weight/LH/LS |
|-------|------|--------------------|
| H1 | Radial Saudi SemiBold | 35px / 600 / 36px / -0.7px |
| Body 1 Bold | Inter Bold | 16px / 700 / 20px / -0.16px |
| Body 1 | Inter Medium | 16px / 500 / 20px / -0.16px |
| Body 2 | Inter Medium | 14px / 500 / 20px / -0.16px |
| Caption | Inter Medium | 12px / 500 / 16px / -0.13px |

## 3 States
1. **Sending** — initial state, "Sending notification...", gray indicators
2. **Sent** — notification banner slides in, step 1 green + expanded, "Having trouble?" link
3. **Complete** — notification slides out, all steps green, lines green

## Key Components
| Component | Path | Purpose |
|-----------|------|---------|
| `PhoneFrame` | `src/components/PhoneFrame.tsx` | iPhone shell + notification overlay |
| `StationScreen` | `src/components/StationScreen.tsx` | Main screen layout |
| `SpinnerIcon` | `src/components/SpinnerIcon.tsx` | Rotating progress arc + arrow icon |
| `TrackerStep` | `src/components/TrackerStep.tsx` | Individual timeline step with animation |
| `NotificationBanner` | `src/components/NotificationBanner.tsx` | iOS notification with spring slide |
| `Footer` | `src/components/Footer.tsx` | Account switcher + consent |
| `ControlPanel` | `src/components/ControlPanel.tsx` | 3 external buttons |

## Assets
- `/assets/icon.png` — Arrow icon for spinner
- `/assets/TBadge.png` — Tabby T badge for notification
- `/assets/RadialSaudiGX.woff2` — Variable font for headings

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
- Used user-provided TBadge.png and icon.png assets
- Fixed spinner bg color to #f2e8ff (from Figma --tui-background-accent-muted)
- Added Radial Saudi font via @font-face for heading
- Tinted browser header/notch with #F9F9F9
- Centered Dynamic Island notch
- Added green fill animation to tracker connector lines as steps complete
