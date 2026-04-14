# Tabby Prototypes

Interactive, pixel-faithful prototypes of Tabby product flows — built to demonstrate exact screen behavior, copy, animation, and RTL handling to engineering partners. Each flow lives at its own route inside a single bundle so they can be shared with one URL and switched between via a Chrome-style tab bar at the top of the viewport.

**Live demo:** https://tabby-prototypes.vercel.app

## Flows

| Route | Flow | What it shows |
|-------|------|---------------|
| [`/`](https://tabby-prototypes.vercel.app/) | **Station screen** | The screen rendered inside a merchant's app while the user completes their BNPL purchase in the Tabby app. Push-notification-first with SMS fallback, a 3-step tracker, and a "Having trouble?" bottom sheet for recovery. |
| [`/ivr`](https://tabby-prototypes.vercel.app/ivr) | **IVR verification** | The post-downpayment IVR call flow for KSA BNPL (regulatory requirement). Temporary hold → phone call → press 1 to confirm → success or timeout with hold release. |

New flows get their own route under `src/pages/` and plug into the shared `PrototypeShell` layout — see [`CLAUDE.md`](./CLAUDE.md) for the architecture.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Flow details

### Station screen (`/`)

Three-state machine:

1. **Sending** — push notification is being dispatched
2. **Sent** — notification delivered, waiting for the user to act
3. **Complete** — purchase confirmed; "Success Screen" button shows the final state

**Toggles inside the phone:**
- **V1 / V2** — V1 spins the main icon, V2 spins indicators on the tracker steps
- **EN / العربية** — full RTL mirror with Arabic typography (Radial Saudi for headings, SF Pro Arabic for body)

**Capture URLs** (hide control panel):
```
/?state=sending
/?state=sent
/?state=complete
```

### IVR verification (`/ivr`)

Four-state machine:

1. **hold_created** — temporary hold placed, user is asked to verify
2. **ivr_in_progress** — Tabby is calling the user; 45s timer, "Resend call" unlocks at 15s elapsed
3. **ivr_failed** — timeout or cancel; hold released back to the user
4. **ivr_success** — user pressed 1; payment confirmed (slide-in overlay)

**Capture URLs** (hide control panel):
```
/ivr?state=hold       (alias: hold_created)
/ivr?state=calling    (alias: ivr_in_progress)
/ivr?state=failed     (alias: ivr_failed)
/ivr?state=success    (alias: ivr_success)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:5173 |
| `npm run typecheck` | TypeScript project-reference check (no emit) |
| `npm run build` | Typecheck + Vite production build |
| `npm run preview` | Preview the production build locally |

`tsconfig.json` runs in strict mode with `noUnusedLocals` / `noUnusedParameters` enabled — dead locals fail the build.

## Tech stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — `@theme` block in `src/index.css` (no `tailwind.config.js`)
- [Motion](https://motion.dev) (imported from `motion/react`, **not** `framer-motion`) for slides, overlays, and notification animations
- [lucide-react](https://lucide.dev) for a handful of secondary IVR icons; primary icons are hand-written SVGs in `src/components/icons.tsx` and `src/components/ivr/icons.tsx` to match Tabby's icon set
- Radial Saudi (variable) + Inter Variable fonts

## Deployment

Auto-deploys to Vercel on push to `main`. `vercel.json` rewrites any non-asset, extensionless path to `/index.html` so client-side pathname routing works (e.g. `/ivr` serves the SPA shell, then `src/main.tsx` picks the right page).
