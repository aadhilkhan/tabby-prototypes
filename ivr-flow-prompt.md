# PROMPT: Tabby IVR Verification Flow

Build the KSA BNPL **IVR phone-verification flow** — the moment right after a user completes their downpayment, when Tabby regulatory-required calls them to confirm. Output is the raw app content **only**: no iPhone frame, no browser chrome, no merchant-header / navbar, no language switcher, no home indicator. The four screens fill the viewport.

A placeholder 5-button demo toolbar (**Hold · Calling · Failed · Success · Reset**) fixed at the bottom of the viewport lets me jump between states. Support a `?state=hold|calling|failed|success` URL param that locks the initial state and hides the toolbar.

## State machine

```ts
type IVRState = "hold_created" | "ivr_in_progress" | "ivr_failed" | "ivr_success";
```

Amount is a constant `"49.75"` (Saudi Riyal).

## Transition spec — this is the interesting part

- **Hold** and **Failed** share the **base layer**. Swapping between them is a cross-fade.
- **Calling** is a **slide-in overlay** (`z-index: 10`) that enters from the trailing inline edge (right in LTR, left in RTL). When it enters, the base pushes 30% in the leading direction.
- **Success** is a **slide-in overlay above Calling** (`z-index: 20`). When Success opens, the **Calling overlay stays mounted and animates to -30%** (pushes back just like the base). When Success closes, Calling animates back to 0.
- Going Calling → Hold or Calling → Failed unmounts Calling with a slide out to the trailing edge.
- Overlay slides use a spring (`stiffness: 400, damping: 40, mass: 1` with `motion/react`) and a soft drop shadow on the leading edge.
- A ref that only updates when state is hold/failed keeps the correct base rendering underneath while any overlay is open.
- RTL flips the slide direction automatically via `dir` on `BaseThemeProvider` + CSS logical properties for the overlay translation.

## Screen 1 — Hold Created

Scrollable content, sticky-bottom primary CTA.

1. A small status pill at the top: **"Almost there - one quick step"** (hyphen, not em-dash). Use whatever O25 primitive matches a pill/badge with a pulsing dot — info/blue tone.
2. Heading (variant `h1`): **"We'll confirm this with a quick call"**.
3. Body (variant `body1Loose`, secondary text tone): **"We've set aside this amount while we verify your number. It'll only be confirmed once verification is complete."**
4. A merchant supercell row: 40px Adidas logo · "Adidas" / "Downpayment" on the left · Riyal glyph + `49.75` on the right. Use the O25 Supercell or the closest Supercell variant that matches this layout.
5. Three info rows — a 40px circular badge + label text:
   - Lock badge — "This is a temporary hold, not a charge"
   - Handset badge — "A short call will confirm your order"
   - Check-circle badge — "If verification fails, this hold is released automatically"
6. Sticky primary Button: **"Verify now"** → sets state to `ivr_in_progress`.

## Screen 2 — Calling (ivr_in_progress)

Scrollable content, sticky-bottom stack.

1. An **incoming-call banner image** at the top. Expect `/incoming-call.png` in the public dir — render an `<img>` tag.
2. Status pill: **"Calling you now"** — accent purple tone, pulsing dot.
3. Heading (`h1`): **"Pick up and press 1 to verify"**.
4. Body (`body1Loose`, secondary): **"Answer the call from Tabby. Once you press 1, your order will be confirmed right away."**
5. A muted-surface row: small spinner · **"Waiting for your response"** · tabular-nums countdown in `m:ss`.

**Timer logic**

- Starts at **45 seconds**, decrements once per second.
- Resets to 45 whenever a `resetKey` changes (so clicking "Resend call" re-arms it).
- **Before 15 seconds have elapsed** (`secondsLeft > 30`): the primary CTA is a **disabled** "Didn't get the call?" button.
- **From 15 seconds elapsed onward**: the CTA becomes an **enabled** "Resend call" button — clicking it bumps the reset key and restarts the countdown (stays on this screen).
- When `secondsLeft` hits 0: auto-advance to `ivr_failed`.

Sticky bottom stack:

- Small centered reassurance row: lock icon + **"Nothing is charged while we wait"** (caption).
- The Resend button (per above).
- A subtle "Cancel" text link below → sets state to `ivr_failed`.

## Screen 3 — Failed

Scrollable content, sticky-bottom primary CTA.

1. 88×88 circle in warning tint with a 44px phone-off icon in warning color.
2. Status pill: **"Hold released"** (warning tone).
3. Heading (`h1`): **"We couldn't reach you"**.
4. Body (`body1Loose`, secondary): "No money was taken. The temporary hold of `<Riyal glyph>49.75` has been released back to your account." — only the amount + glyph take the primary text color; the surrounding prose stays secondary.
5. A small summary card with two rows:
   - `Downpayment` → `<Riyal> 49.75`
   - `Status` → green check + **"Released"**
6. Helper line below (caption, secondary): **"Your bank may take a moment to reflect this"**.
7. Sticky primary Button: **"Try again"** → sets state back to `hold_created`.

## Screen 4 — Success

Vertically centered, no scroll.

1. 80px green check-circle icon.
2. Heading (`h1`): **"Payment confirmed"**.
3. Body (`body1Loose`, primary text): **"You're now being redirected to Adidas page"**.
4. The same merchant supercell row as the Hold screen, but the subtitle reads **"Pay in 4"** and the amount reads `<Riyal> 49.75/mo`.
5. No CTA (terminal state).

## Assets to expect in `/public`

- `/incoming-call.png` — iOS-style incoming-call banner placeholder.
- `/adidas-logo.png` — 40×40 merchant logo.

## Deliverables

- One screen per directory under `src/screens/…`, state orchestration in `App.tsx`.
- All four transitions feel smooth — Calling never collides with Success on the same edge.
- All copy exactly as written above (note: hyphen `-`, not em-dash `—`, in the Hold-screen pill).
- Works in `dir="rtl"` — slide directions mirror automatically via logical properties.

Start by inventorying the O25 primitives you'll need (Button, Text, Supercell, Badge/Indicator, Loader, divider-like row helpers, icon set) through the tabby-ui MCP, then compose the screens, then wire the state machine + slide orchestration last.
