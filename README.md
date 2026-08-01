# Futbol Fan Zone

Fan-first football media site for [futbolfanzone.com](https://futbolfanzone.com) — newsletter, show/job applications, admin review dashboard, and a merch-ready shop placeholder.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres) for subscribers, applications, contact messages
- Resend for confirmation emails + newsletter audience
- Netlify hosting (`@netlify/plugin-nextjs`)

## Brand assets

Source files live in [`assets/`](assets/). Optimized copies used by the site are in:

- `public/brand/` — logos, badges, hero SVGs
- `src/fonts/` — Field Gothic (primary) + Tac One (display/chants)
- [`src/lib/brand.ts`](src/lib/brand.ts) — color tokens + asset paths
- [`src/components/brand/Logo.tsx`](src/components/brand/Logo.tsx) — shared logo component

Palette: Navy `#1B4075` / `#0D2342`, Green `#16B016` / `#40D840`, Yellow `#FFF34D` / `#F8E803`, Blue `#096AD3` / `#2987ED`, Orange `#DA532E` / `#FC411D`.

## Local setup

Requires **Node.js 20+**.

```bash
nvm use 20
npm install
cp .env.example .env.local
npm run dev
```

### Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
3. Copy the project URL and **service role** key into `.env.local`.

### Resend

1. Create an API key at [resend.com](https://resend.com).
2. Verify `futbolfanzone.com` (SPF/DKIM) for production sending.
3. Create an Audience and set `RESEND_AUDIENCE_ID`.
4. Set `RESEND_FROM_EMAIL` to a verified address.

### Admin

Visit `/admin/login` and sign in with `ADMIN_PASSWORD` (defaults to `admin` in local dev if unset).

## Deploy to Netlify

1. Push this repo and create a Netlify site from it.
2. Set all env vars from `.env.example` in Netlify → Site settings → Environment variables.
3. Point `futbolfanzone.com` DNS to Netlify.
4. Verify the sending domain in Resend.

Build settings are in `netlify.toml` (Node 20 + Next.js plugin).

## Pages

| Path | Purpose |
|------|---------|
| `/` | Home — hero, stats, shows, newsletter, YouTube, hosts |
| `/shows` | Show formats + apply CTAs |
| `/apply` | Quiz / job / general applications |
| `/subscribe` | Newsletter signup |
| `/contact` | Contact form + socials |
| `/partners` | Sponsorship lead form |
| `/shop` | Merch coming soon |
| `/admin` | Review applicants, export CSV, subscriber counts |

## Weekly newsletters

Confirmed subscribers are synced to your Resend Audience. Compose and send weekly broadcasts from the Resend dashboard (or add an in-app composer later).
