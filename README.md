# Tabby Prototypes

Interactive prototypes of Tabby's in-app checkout flows — built to demonstrate exact screen behavior to developers. Two prototypes live in the same bundle: the `/` station screen shown inside a merchant's app while a user completes their BNPL purchase, and the `/ivr` post-downpayment IVR verification flow for KSA BNPL.

**Live demo:** https://tabby-prototypes.vercel.app

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
```

## States

The prototype has 3 states that simulate the checkout flow:

1. **Sending** — notification is being sent to the user's Tabby app
2. **Sent** — notification delivered, waiting for user to complete purchase
3. **Complete** — purchase confirmed, auto-transitions to success

Use the control panel buttons to step through states, or lock to a specific state via URL parameter:

```
?state=sending
?state=sent
?state=complete
```

When a `?state` param is set, the control panel is hidden (useful for Figma capture).

## Tech Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animations
- Radial Saudi + Inter Variable fonts

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
