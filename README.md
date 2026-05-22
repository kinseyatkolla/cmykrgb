# CMYK/RGB

Design & creative development studio site — Vue 3 + Vite, served on Node via [Railway](https://railway.app).

## Stack

- **Vue 3** + **Vue Router**
- **Vite** for dev & build
- **serve** for production static hosting on Railway (Nixpacks)

Typography: **[Outfit](https://fonts.google.com/specimen/Outfit)** for headings, **[Google Sans](https://fonts.google.com/specimen/Google+Sans)** for body copy (Google Fonts in `index.html`).

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

`PORT` is set automatically on Railway.

## Project images

Add case study images to `public/work/` named by project id:

- `correspondences.jpg`
- `ibm-events.jpg`
- `ibm-watson.jpg`
- etc.

Missing images show a CMYK/RGB gradient placeholder.

## Deploy on Railway (GitHub)

1. Push this repo to GitHub.
2. In Railway: **New Project** → **Deploy from GitHub repo** → select this repository.
3. Railway uses `railway.json` / Nixpacks: `npm ci` → `npm run build` → `npm start`.
4. Optional: enable **PR deploys** and connect your custom domain.

GitHub Actions (`.github/workflows/ci.yml`) runs `npm run build` on push/PR — separate from Railway’s deploy, useful as a CI gate.

## Pages

| Route       | Content                          |
| ----------- | -------------------------------- |
| `/`         | Hero, services preview, work, CTA |
| `/work`     | Full case study grid             |
| `/services` | Services, process, engagement    |
| `/about`    | Studio story & values            |
| `/contact`  | Inquiry form (mailto)            |
