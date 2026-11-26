# Jyoti Chataut — Portfolio

## Prerequisites

| Software | Version              |
| -------- | -------------------- |
| Node.js  | 18.x or 20.x         |
| npm      | 9+ (ships with Node) |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:3000)
npm run dev

# 3. Build for production (static export → /out)
npm run build
```

The dev server supports hot reload. Open `http://localhost:3000` in a browser.

## Production Build

```bash
npm run build
```

Output is in `out/` — a fully static site. Deploy `out/` to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Project Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion 11
- **Language:** TypeScript
- **Fonts:** Cormorant Garamond, DM Sans, JetBrains Mono (via `next/font/google`)

## File Structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, globals
│   ├── page.tsx          # page assembly
│   └── globals.css       # CSS variables, resets
├── components/
│   ├── Hero.tsx           # grid hero with image gallery
│   ├── WeaveGrid.tsx      # reusable CSS Grid primitive
│   ├── Navbar.tsx
│   ├── About.tsx
│   ├── Work.tsx
│   ├── ProjectPatch.tsx
│   ├── Hobbies.tsx
│   ├── Skills.tsx
│   ├── Credentials.tsx
│   └── Contact.tsx
└── data/
    └── projects.ts
```
