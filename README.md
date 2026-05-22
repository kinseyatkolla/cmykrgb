# CMYK/RGB

Design & creative development studio site — Vue 3 + Vite, served on Node via [Railway](https://railway.app).

## Stack

- **Vue 3** + **Vue Router**
- **Vite** for dev & build
- **Express** serves the built site and a `/api/contact` endpoint on Railway (Nixpacks)
- **Resend** delivers inquiry emails (no mailto)

Typography: **[Google Sans Flex](https://fonts.google.com/specimen/Google+Sans+Flex)** (variable, 100–900) for almost everything; small caps use weight 300. Hero “Digital + Print” uses **[Aguafina Script](https://fonts.google.com/specimen/Aguafina+Script)** only.

## Local development

```bash
npm install
cp .env.example .env   # add RESEND_API_KEY
npm run dev            # site + contact API at http://localhost:5173
```

## Production build

```bash
npm run build
npm start
```

`PORT` is set automatically on Railway.

## Contact form (Resend)

Inquiries POST to `/api/contact` and email you via [Resend](https://resend.com).

**Railway variables:**

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `RESEND_API_KEY` | Yes | API key from Resend dashboard |
| `CONTACT_TO_EMAIL` | No | Inbox (default: `hello@cmyk-rgb.info`) |
| `CONTACT_FROM_EMAIL` | No | Verified sender, e.g. `CMYK/RGB <hello@cmyk-rgb.info>` |

Until `RESEND_API_KEY` is set, the form returns a friendly error and the direct email link still works.

For local dev, copy `.env.example` to `.env` — Railway injects the same variables in production.

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
3. Railway auto-detects Node (Nixpacks): install deps → `npm run build` → `npm start` (same pattern as [kinsey-dot-info](../kinsey-dot-info/kinsey-info)).
4. Optional: enable **PR deploys** and connect your custom domain.

## Pages

| Route       | Content                          |
| ----------- | -------------------------------- |
| `/`         | Hero, services preview, work, CTA |
| `/work`     | Full case study grid             |
| `/services` | Services, process, engagement    |
| `/about`    | Studio story & values            |
| `/contact`  | Inquiry form → Resend email      |
