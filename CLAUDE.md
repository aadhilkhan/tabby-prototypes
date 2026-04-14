# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive prototype of Tabby's in-app checkout flows — built to demonstrate exact screen behavior to developers. Two prototypes live in the same bundle:

- **`/`** — the original "station screen" shown inside a merchant's app while the user completes their BNPL purchase in the Tabby app.
- **`/ivr`** — the post-downpayment IVR verification flow for KSA BNPL (regulatory requirement). Single page with 4 states: `hold_created` → `ivr_in_progress` → `ivr_failed` / `ivr_success`.

Both prototypes share the same iPhone frame, NavBar, Button component, design tokens, and fonts. A browser-tab-style `PrototypeTabs` header at the top of the viewport lets you switch between them.

## Commands

```bash
npm install        # Install dependencies (first time setup)
npm run dev        # Start dev server at http://localhost:5173
npm run typecheck  # TypeScript project-reference check (no emit)
npm run build      # typecheck + Vite build
npm run preview    # Preview production build
```

`tsconfig.json` runs in strict mode with `noUnusedLocals` / `noUnusedParameters` enabled so dead locals fail the build. No test runner or linter is configured.

## Deployment

- **GitHub**: `aadhilkhan/tabby-prototypes` (private)
- **Vercel**: https://tabby-prototypes.vercel.app — auto-deploys on push to `main`
- **SPA rewrites**: `vercel.json` rewrites any non-asset / extensionless path to `/index.html` so client-side pathname routing works (e.g. `/ivr` serves the app shell).

## Routing

No router library — lightweight pathname branch in `src/main.tsx`:

```ts
const path = window.location.pathname;
if (path.startsWith("/ivr")) return <IVRVerification />;
return <App />;
```

Cross-page nav is via `<a href>` (full reload) because there are only two top-level prototypes. `PrototypeTabs` renders at the top of both pages with active-tab highlighting.

## Architecture

### State Machine

The app has 3 states defined as `StationState` in `src/types.ts`: `"sending"` → `"sent"` → `"complete"`. State is managed in `App.tsx` and flows down to all components. URL param `?state=sending|sent|complete` locks to a specific state and hides controls (used for Figma capture).

### Version Toggle (V1/V2)

`PrototypeVersion` type (`"v1" | "v2"`) in `src/types.ts`. Toggled via segmented control on the right side of the phone frame.

- **V1 (Spinner icon)**: Main SpinnerIcon has rotating purple arc. Tracker step indicators are static dots/icons.
- **V2 (Spinner nodes)**: Main icon is static (88×88 purple circle, no spinner rings). Loading spinners appear on tracker step indicators instead — grey mini spinners (20px) that move from step to step as state progresses.

Version flows: `App.tsx` → `StationScreen` → `SpinnerIcon` (spinning prop) + `getTrackerStepsV2()` (indicatorSpinning on steps).

### Language Toggle (EN/AR) + RTL

`Language` type (`"en" | "ar"`) in `src/types.ts`. Toggled via the العربية/English button in the NavBar (inside the phone frame). `lang` state lives in `App.tsx` and is threaded as a prop to all components that render text.

- **Translations**: `src/translations.ts` — flat object of `{ key: { en, ar } }` entries with a `t(key, lang)` lookup function. No i18n library.
- **RTL layout**: PhoneFrame sets `dir="rtl"` and `.lang-ar` class on the screen container when Arabic is active. Flexbox auto-mirrors most layouts. StatusBar and SafariBar are wrapped in `dir="ltr"` so iOS chrome doesn't flip.
- **Logical CSS properties**: TrackerStep uses `pe-[12px]` (padding-inline-end) and `text-start` instead of physical `pr-`/`text-left` so the timeline mirrors correctly.
- **Animation direction**: Screen slide transitions (account, success) and station screen push are RTL-aware — `isRtl` flag in App.tsx flips `x` values and box-shadow direction.
- **Font handling**: Arabic headings use Radial Saudi (already supports Arabic). Arabic body text uses `.lang-ar` class → `"SF Pro Arabic", "Geeza Pro", -apple-system, sans-serif`.
- **Phone input**: The input row container follows RTL (country code moves to right), but each individual input box has `dir="ltr"` so digits type left-to-right.
- **Notification banner**: Inherits RTL from PhoneFrame — icon moves to right, text right-aligns in Arabic.
- **Tracker step configs**: `getTrackerSteps(state, lang, phoneNumber)` and `getTrackerStepsV2(state, lang, phoneNumber)` accept language + phone number — `phoneNumber` is interpolated into Step 1's description ("…SMS sent to +971 55 444 6868"). Translated strings are resolved via `t()`.

### IVR Flow (`/ivr`)

Separate page at `src/pages/IVRVerification.tsx`. State machine type `IVRState = "hold_created" | "ivr_in_progress" | "ivr_failed" | "ivr_success"`. Reuses `PhoneFrame`, `NavBar`, `Button`, same viewport scaling, same `#f0f0f0` canvas. URL param `?state=hold|calling|failed|success` locks a state and hides the control panel.

- **Sticky CTAs**: each state component is `relative h-full flex flex-col` with `flex-1 overflow-y-auto` content + `absolute bottom-0` footer — matches the `AccountScreen` pattern.
- **Success slide-in**: `state === "ivr_success"` is treated as an overlay. A `baseStateRef` remembers the last non-success state so the base layer keeps rendering underneath; the success screen animates in from the right (left in RTL) with the shared `SPRING` transition while the base pushes 30% opposite — identical to the station screen's success/account slide.
- **IVRSuccessState**: mirrors the station `SuccessScreen` layout exactly (80px `CheckCircleIcon`, heading + subtext, Adidas merchant card) with IVR-appropriate data ("Payment confirmed", "SAR 49.75/mo").
- **Calling screen**: incoming-call banner at the top via `IncomingCallBanner` → renders `<img src="/incoming-call.png" />` (save a PNG to `assets/incoming-call.png` to populate). Timer counts 0:45 → 0; at 15s elapsed the "Didn't get the call?" button activates as "Resend call"; at 0 it auto-transitions to `ivr_failed`.
- **Hold screen supercell icons**: three 40×40 filled badges in `src/components/ivr/icons.tsx` (`LockBadge40`, `HandsetBadge40`, `CheckCircleBadge40`) — the circle background is baked into each SVG, so `IVRInfoRow` renders them without wrapping.

### Prototype Tabs

`src/components/PrototypeTabs.tsx` — fixed 40px white strip at the top of each page. Chrome-style tabs left-aligned; the active tab has background `#f0f0f0` (matches the page canvas) so it looks merged with the content below. Coloured dot per page (green for station, purple for IVR). Hidden when `?state=` param is present.

### Viewport Layout

Both pages use the same `useViewportLayout(hideControls)` hook with a 40px `tabsH` subtracted. Phone is wrapped in an outer box sized to the actual scaled dimensions (`PHONE.width * scale × PHONE.height * scale`) with `transform-origin: top left`, so flex `items-start` on mobile puts the phone flush under the tab bar with zero gap. Desktop uses `items-center`.

### Component Hierarchy

```
App.tsx (state + version + lang)
└── PrototypeShell (shared layout - canvas, tabs, scaled phone, slots)
    ├── PhoneFrame (iPhone bezel + notification overlay, dir="rtl" when AR)
    │   ├── div[dir="ltr"] (locks iOS chrome to LTR)
    │   │   ├── StatusBar
    │   │   └── SafariBar
    │   ├── NavBar (lang toggle: العربية ↔ English)
    │   ├── StationScreen (main content, version + lang)
    │   │   ├── SpinnerIcon (spinning in V1, static in V2)
    │   │   ├── Tracker → TrackerStep[]
    │   │   └── Footer (account switcher, hidden during "sending")
    │   ├── AccountScreen (phone input + validation)
    │   ├── SuccessScreen (purchase complete)
    │   ├── TroubleBottomSheet (drag-to-dismiss)
    │   └── NotificationBanner
    ├── desktopLeft  → ControlPanel (4 action buttons)
    ├── desktopRight → VersionToggle (V1/V2)
    └── mobileToolbar → StationMobileToolbar (all controls in one row)
```

`IVRVerification.tsx` plugs `IVRDesktopControls` + `IVRSimulatePanel` + `IVRMobileToolbar` into the same `PrototypeShell` slots.

### Key Patterns

- **Shared constants** in `src/constants.ts`: `SPRING`/`SPRING_SOFT` animation configs, `PHONE` dimensions, and tracker step configs. V1/V2 tracker functions share base step objects — V2 only overrides diffs.
- **Tracker step configs** are generated by `getTrackerSteps(state, lang)` (V1) or `getTrackerStepsV2(state, lang)` (V2) in `src/constants.ts` — each state returns different step data (colors, text, line fills, indicatorSpinning). Text is resolved via `t()` from `src/translations.ts`.
- **Footer visibility**: Footer (account switcher) only appears after notification is sent (state !== "sending")
- **Heading font**: `.font-heading` CSS class in `index.css` for Radial Saudi headings — use this instead of inline `fontFamily` style.
- **Button component**: `<Button variant="primary|secondary">` in `src/components/Button.tsx` for in-app full-width action buttons.
- **Animations** use Motion library (`motion/react`, NOT `framer-motion`) for notification slide, indicator color transitions, and content expand (AnimatePresence). Spinner rotation uses CSS keyframes. **Important**: Motion `animate` props need concrete hex values for color interpolation — `var()` CSS references won't animate smoothly.
- **Audio**: All sounds use a shared `AudioContext` singleton in `src/sounds.ts` (`playDing`, `playTapSound`). Never create `new AudioContext()` elsewhere.
- **Screen transitions**: Account and Success screens slide in from right (LTR) or left (RTL) with spring animation; station screen pushes opposite 30% simultaneously. Direction is controlled by `isRtl` flag in App.tsx. Success screen is triggered manually via "Success Screen" control panel button (not auto-shown). Bottom sheets slide up with backdrop.
- **Notification management**: `hideNotification` prop on PhoneFrame + `notificationDismissed` state in App.tsx. Bottom sheet and account screen dismiss notification on open; "Send notification" button restores it.
- **Account number change**: When phone number is changed via AccountScreen, state resets to "sending" to re-send notification to the new number. Same number keeps current state.
- **Viewport scaling**: `useViewportScale` hook in App.tsx scales the phone frame to fit any screen size
- **Static assets**: Vite `publicDir` is set to `assets/` — reference files as `/filename.png` (not `/assets/filename.png`)

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** — config via `@theme` block in `src/index.css` (not `tailwind.config.js`). Uses `@tailwindcss/vite` plugin.
- **Motion** (import from `motion/react`, NOT `framer-motion`)
- **lucide-react** — used sparingly in the IVR flow for secondary icons (e.g. `Lock` next to "Nothing is charged"). Primary state icons are hand-written SVGs in `src/components/ivr/icons.tsx` to match Tabby's icon set.
- **Inter** font via `@fontsource-variable/inter`
- **Radial Saudi** variable font loaded via `@font-face` in `src/index.css` from `/Radial_Saudi/variable/RadialSaudiGX.woff2`

## Design Tokens

Colors and typography tokens are defined in `src/index.css` under `@theme`. Key Figma-sourced values:

| Token | Hex | Usage |
|-------|-----|-------|
| `--tui-front-primary` | `#1d2329` | Headings, body text |
| `--tui-front-secondary` | `#7f8b99` | Descriptions, captions |
| `--tui-front-tertiary` | `#b8c3d1` | Inactive indicators |
| `--tui-front-accent` | `#5d21de` | Accent purple (links) |
| `--tui-front-accent-bright` | `#6236FF` | Brighter accent (action links) |
| `--tui-line-disabled` | `#e9eff5` | Inactive dots, lines |
| `--tui-line-positive` | `#31cc7e` | Active/complete indicators + lines |
| `--spinner-bg` | `#f2e8ff` | Spinner background |
| `--tui-line-accent` | `#ccb1fa` | Spinner arc |
| `--surface-muted` | `#f2f5f7` | Muted surface backgrounds |
| `--tabby-green` | `#3EEDB1` | Tabby brand green |
| `--notification-bg` | `rgba(80,79,79,0.7)` | Notification backdrop |
| `--browser-header` | `#F9F9F9` | Safari/nav bar background |
| `--tabby-badge-bg` | `#292929` | Notification badge bg |
| `--ivr-hold-blue` | `#3366ff` | IVR hold screen accent |
| `--ivr-hold-blue-bg` | `#eef2ff` | IVR hold screen tint |
| `--ivr-success` | `#00b365` | IVR verified pill |
| `--ivr-success-light` | `#e6f9f0` | IVR success tint |
| `--ivr-warning` | `#ff8800` | IVR timeout pill |
| `--ivr-warning-light` | `#fff4e6` | IVR warning tint |
| `--ivr-border` | `#e8ecf0` | IVR dividers |

Typography: H1 uses Radial Saudi (35px/500), body uses Inter Variable (16px/500 or 700, 14px, 12px).

## Figma Source

- **File key**: `ekQkGLPpsC1RqPEO9mScsv`
- Screen 1 (Sending): `node-id=1331-8482`
- Screen 2 (Notification Sent): `node-id=1331-9292`
- Screen 3 (Purchase Complete): `node-id=1331-9500`
- Having Trouble Bottom Sheet: `node-id=1363-18662`

## Session Log

### Session 1 (2026-04-05)
- Scaffolded project, read Figma screens via MCP, extracted design tokens
- Built full prototype with 3 states and animated transitions

### Session 2 (2026-04-05)
- Integrated actual assets (TBadge.png, icon.png, wordmark.png, iphone-frame.png)
- Added Radial Saudi font, browser header tinting, green fill-down animation
- Safari bar, NavBar, Footer refinements; deployed to Vercel

### Session 3 (2026-04-06)
- URL `?state=` param for Figma capture, viewport auto-scaling
- Control buttons repositioned to float left of phone frame
- Capture script (`capture.js`) in index.html for Figma HTML-to-Design workflow

### Session 4 (2026-04-06)
- Account switcher screen with phone input and iOS push transition
- Payment success screen with auto-transition 2s after complete state

### Session 5 (2026-04-06)
- "Having trouble?" bottom sheet with stacked buttons (Send notification + Resend SMS timer)
- SMS button disabled with 59s countdown timer, enables when complete
- Notification banner hides on bottom sheet open, restores on "Send notification"
- Station screen pushes left for both account and success screen transitions
- Pointer cursors on all interactive buttons and links
- Replaced phone icon with user icon in footer
- Changed "Sending notification..." to "Sending push notification..."
- Phone number change resets state to "sending" for re-notification

### Session 6 (2026-04-06)
- V1/V2 version toggle: V1 = spinner on main icon (original), V2 = spinners on tracker node indicators
- SpinnerIcon accepts `spinning` prop — V2 shows static 88×88 circle with 48×48 arrow icon
- TrackerStep supports `indicatorSpinning` — renders grey mini spinner (20px) on active step
- `getTrackerStepsV2()` in constants.ts for V2 step configs
- Footer hidden during "sending" state, appears only after notification with fade-in animation
- Version toggle positioned right of phone frame, aligned to top with control buttons
- Cursor-pointer added to control panel buttons

### Session 7 (2026-04-06)
- Footer fade-in animation: slides up 8px + fades in over 0.4s using motion.div in Footer component
- Step 1 description expand: height expands 0.2s, then text fades in after 0.4s delay (0.3s duration)
- V2 mini spinner darkened (#d5dce5 track / #7f8b99 arc)
- Main icon enlarged to 48×48 in both V1/V2, V2 circle fills full 88×88
- Version toggle label shows "Spinner icon" or "Spinner nodes" for active version
- Account screen opening now dismisses notification; stays hidden when same number is kept

### Session 8 (2026-04-07)
- Major refactor: deduplicated tracker step configs (V1/V2 share base objects), extracted shared constants (SPRING, PHONE)
- Replaced 25+ hardcoded hex colors with CSS variable refs; added new theme tokens (tui-front-accent, surface-muted, etc.)
- Added `.font-heading` CSS class replacing 4 inline fontFamily style objects
- Fixed AudioContext memory leak in NotificationBanner — moved playDing to shared sounds.ts singleton
- Extracted reusable `<Button>` component for primary/secondary in-app buttons
- Phone number validation on AccountScreen: error message + red border + horizontal shake animation on Continue button

### Session 9 (2026-04-08)
- Added Vercel Analytics (`@vercel/analytics/react`) in App.tsx
- Changed "Send Notification" button copy to "Send Notification (2s)"
- Decoupled success screen from auto-transition: removed 2s timer after "complete" state, added separate "Success Screen" button to ControlPanel (purple, enabled only when state is "complete" and success screen not yet shown)

### Session 10 (2026-04-08)
- RTL Arabic language support: `Language` type, `src/translations.ts` with 40+ EN/AR string pairs and `t(key, lang)` lookup
- Language toggle via NavBar's العربية/English button (onToggleLang callback from App.tsx) — no external control panel toggle
- PhoneFrame sets `dir="rtl"` + `.lang-ar` class on screen container; StatusBar/SafariBar wrapped in `dir="ltr"` to prevent iOS chrome flipping
- Arabic font: `.lang-ar` in index.css sets body to SF Pro Arabic/Geeza Pro stack; `.lang-ar .font-heading` keeps Radial Saudi for headings
- TrackerStep uses logical CSS properties (`pe-[12px]`, `text-start`) for automatic RTL mirror
- Screen transitions flip direction based on `isRtl` flag (account/success slide from left in RTL, station pushes right 30%)
- AccountScreen input row mirrors in RTL (country code on right) but individual input boxes keep `dir="ltr"` for digit entry
- NotificationBanner inherits RTL — icon on right, text right-aligned in Arabic
- All components (NavBar, Footer, StationScreen, AccountScreen, SuccessScreen, TroubleBottomSheet, NotificationBanner) accept `lang` prop and use translated strings
- Tracker step config functions (`getTrackerSteps`, `getTrackerStepsV2`) accept `lang` parameter

### Session 11 (2026-04-08)
- Security audit: full codebase analysis — no XSS, no injection vectors, no secrets, no unsafe DOM patterns
- Patched Vite 6.4.1 → 6.4.2 (fixed 2 high-severity CVEs: path traversal in `.map` handling + arbitrary file read via dev server WebSocket)
- Identified: external Figma capture.js has no SRI hash, no CSP/security headers on Vercel deployment (no vercel.json yet)

### Session 12 (2026-04-13)
- Tracker copy refresh from Figma (nodes 1551:52520, 1551:52787, 1551:53114):
  - Step 1 (sent/complete) → "Tap the Tabby push notification or SMS link"
  - Step 1 description now interpolates current `phoneNumber` ("…SMS sent to +971 55 444 6868")
  - Step 1 action link → "Having trouble?"
  - Step 2 → "Complete your purchase in the app" (no trail price)
  - Step 3 → "Return here once your payment is complete" + trail "AED 400.00"
  - `getTrackerSteps` / `getTrackerStepsV2` now take a `phoneNumber` parameter
- TroubleBottomSheet restructure (Figma node 1551:53522):
  - Left-aligned H2 layout (icon-circle removed)
  - New copy: "Enable push notifications…" + "Then return here and tap **Send notification** to continue your purchase in the app."
  - Inline phone row (📱 +971 55 444 6868 • Change ›) between body and buttons — opens the AccountScreen
  - Three visual states via internal state: resend timer → resend ready → no attempts left
  - Attempts counter ("N of 3 attempts remaining") below buttons; tapping Resend SMS decrements counter and restarts 59s timer (no longer auto-closes sheet)
  - Secondary button permanently disabled once `attemptsLeft === 0`
- Removed footer consent line ("By continuing, you consent to sharing your data with AECB") and its `footer.consent*` translation keys — Footer is now just the phone/Change row

### Session 15 (2026-04-14) - Production-readiness refactor
Goal: reduce duplication, strengthen types, and clean up dead code so the prototype reads as a maintained codebase rather than a vibe-coded sketch. No behavior changes.

**New shared modules**
- `src/hooks/useViewportLayout.ts` - single source of truth for the phone-scaling hook. Previously duplicated byte-for-byte in `App.tsx` and `IVRVerification.tsx`. Viewport constants (`MOBILE_BREAKPOINT_PX=960`, `MOBILE_TOOLBAR_HEIGHT_PX=100`, `TABS_HEIGHT_PX=40`, `DESKTOP_LINK_HEIGHT_PX=32`) are now named rather than scattered magic numbers. Exact scaling semantics preserved (desktop adds link height to the denominator; mobile subtracts toolbar from the budget).
- `src/lib/formatPhone.ts` - UAE phone formatter `"+971 XX XXX XXXX"`. Previously implemented three times (`Footer.tsx`, `TroubleBottomSheet.tsx`, `constants.ts#formatPhoneForStep1`).
- `src/components/PrototypeShell.tsx` - wraps the scaled-phone outer layout, `PrototypeTabs`, desktop control slots (left/right), mobile toolbar slot, and `<Analytics />`. Both pages now just render state + their control panels into its slots.
- `src/components/MobileToolbar.tsx` - `MobileToolbar`, `MobileToolbarButton` (tone: positive/primary/accent/neutral), `MobileToolbarDivider` primitives.
- `src/components/VersionToggle.tsx` - extracted from the inline block in `App.tsx`; `compact` prop drives the mobile variant, `showLabel` toggles the "Spinner icon / Spinner nodes" caption.
- `src/components/station/StationMobileToolbar.tsx` - mobile toolbar row for `/`.
- `src/components/ivr/IVRDesktopControls.tsx` + `IVRMobileToolbar.tsx` - extracted from inline JSX in `IVRVerification.tsx`. `IVR_STATE_LABELS` / `IVR_STATE_COLORS` exported as const maps.

**Type cleanup**
- `IVRState` moved from `pages/IVRVerification.tsx` into `src/types.ts` so components can import it without a page→component cycle.
- `translations.ts` no longer re-declares `Language`; it imports from `types.ts`.
- `tsconfig.json`: `noUnusedLocals` / `noUnusedParameters` / `forceConsistentCasingInFileNames` flipped to true.
- `package.json`: new `typecheck` script (`tsc -b`) for CI / quick checks.

**Dead code removed**
- Unused components: `src/components/ivr/IVRCallingSpinner.tsx`, `src/components/ivr/IVRAmountDisplay.tsx`.
- Unused station icon exports: `InfoIcon`, `ArrowUpRightIcon`, `CheckIcon`, `TabbyTBadge`.
- Unused IVR icons: `ShieldCheckedIcon`, `PhoneCallIcon`.
- Unused sound: `playHoverSound` in `sounds.ts`.
- Dead locals in `TrackerStep.tsx`: `lineColor` + `lineColorMap` (line fill is driven by `scaleY` on a fixed-palette `.bg-tui-line-positive` overlay).

**Token hygiene**
- New `--color-canvas: #f0f0f0` token replaces hardcoded hex in `PrototypeShell` (now `bg-canvas`) and `PrototypeTabs`.
- `NotificationBanner` now actually uses the pre-existing `--color-notification-bg` var (it was defined but not referenced).

**A11y**
- `NavBar` close + lang-toggle buttons gain `aria-label` (localised); `type="button"` on all non-submit buttons in new shared components.

**App.tsx**: shrank from ~295 to ~180 lines (state + screen composition only); `IVRVerification.tsx` from ~285 to ~150.

### Session 14 (2026-04-14)
- New `src/components/RiyalSymbol.tsx` - reusable SVG component for the new Saudi Riyal glyph (SAMA 2025). Uses `currentColor` and scales via `size` prop. Replaces every currency-display `SAR`/`﷼` across the IVR flow (HoldCreatedState amount card, IVRSuccessState merchant card, IVRFailedState body prose + summary row, IVRAmountDisplay). Keep using this component wherever an amount is shown.
- `IVRAmountDisplay` had its `currency` prop removed - the riyal glyph is baked in now.
- HoldCreatedState redesign: removed the 88×88 `ShieldCheckedIcon` from the top of the screen. Amount moved out of the header into a Supercell-style merchant card (Adidas logo + "Adidas" / "Downpayment" + glyph + amount on the right, `bg-surface-muted` rounded-24) placed below the heading/body. Matches the station `SuccessScreen` card pattern.
- Replaced em dashes (`-`) with hyphens (`-`) across the whole src/ directory - 11 files, 1 user-facing string ("Almost there - one quick step") + 10 code comments.
- `.claude/launch.json` scaffolded with `tabby-prototypes-dev` → `npm run dev` on port 5173 (gitignored via `.claude` entry in `.gitignore`).

### Session 13 (2026-04-14)
- New `/ivr` page — IVR verification flow after downpayment hold (KSA BNPL regulatory requirement). Single page, 4 states: `hold_created` / `ivr_in_progress` / `ivr_failed` / `ivr_success`.
- Pathname router in `src/main.tsx` (no react-router). `vercel.json` SPA rewrite so `/ivr` serves `index.html`.
- New shared component `PrototypeTabs.tsx` — 40px Chrome-style tab bar at the top of both pages for cross-nav; active tab bg = page canvas `#f0f0f0`, inactive = white, coloured dot (green/purple) indicates page.
- Viewport layout refactor: scaled phone wrapped in a sized outer box with `transform-origin: top left` so `items-start` on mobile eliminates any gap above the phone. Both `App.tsx` and `IVRVerification.tsx` use the same pattern.
- IVR states reuse `PhoneFrame`, `NavBar`, and `<Button>`; sticky-bottom CTA pattern matches `AccountScreen`.
- IVR success = slide-in overlay (not an inline state). `baseStateRef` tracks last non-success state so the underlying view keeps rendering while the success screen slides in from the right (left in RTL) via shared `SPRING`. Visually mirrors the station `SuccessScreen` — 80px `CheckCircleIcon` + "Payment confirmed" + Adidas merchant card + "SAR 49.75/mo".
- New icons in `src/components/ivr/icons.tsx`:
  - `ShieldCheckedIcon` (hold), `PhoneCallIcon` (calling), `PhoneOffIcon` (failed) — tinted per state, inside 88×88 surface-muted circles
  - `LockBadge40`, `HandsetBadge40`, `CheckCircleBadge40` — 40×40 self-contained supercell badges from Tabby's core icon set (Figma node 19575:23789). Circle bg is baked into each SVG.
- `IncomingCallBanner.tsx` — renders `<img src="/incoming-call.png">` at the top of the calling screen. Drop a PNG into `assets/` with that name to populate it (Vite's `publicDir`).
- Desktop control panel on IVR page mirrors the station's ControlPanel layout (TBadge + 4 state pills + Restart). During `ivr_in_progress` a second column appears on the right with "▸ Success" / "▸ Failure" simulate buttons. Mobile gets the same bottom-toolbar pattern.
- Added `lucide-react` dep (v1.8.0, the latest on npm — packages >0.x moved to the 1.x line).
- Tokens added to `@theme` in `src/index.css` (`--color-ivr-*`) and new animation keyframes (`ivr-fade-in-up`, `ivr-scale-in`, `ivr-pulse-dot`, `ivr-ring-pulse`, `ivr-spin`, `ivr-check-draw`, `ivr-circle-draw`).
