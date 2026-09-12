# Copyforge — AI Content Studio

React + Vite + TypeScript frontend with an Express backend for secure AI generation.

## Run

1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your Anthropic API key to `.env`.
5. Run `npm run dev`.
6. Open the Vite URL shown in the terminal (normally http://localhost:5173).

The API key stays on the server and is never placed in browser code.

## Features

- Industry selector: clothing, restaurant, car showroom, salon, real estate, gym, electronics, bakery, jewelry.
- Working tabs: Captions, Ad Copy, Content Ideas, Brand Templates, Hashtags & Bio.
- Real AI generation through `/api/generate`.
- Demo/fallback generation when no API key is configured, so the UI still works.
- Copy buttons, regenerate, clear, local history, download TXT.
- Responsive premium glass/3D UI.
- Credit: Created by Abubakar Siddique.
