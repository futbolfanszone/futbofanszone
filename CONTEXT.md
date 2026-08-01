# Futbol Fans Zone — Project Context & Handover

> Handover doc for any developer or agentic coding tool picking up this project.
> Read this first, then `README.md` for setup commands.

## 1. What this project is

**Futbol Fans Zone** (futbolfanszone.com) is a fan-first football (soccer) media
brand — think AFTV / Global Fan Network, but its own thing. The website is the
brand's home base. It exists to:

- Grow an **email list** and send **weekly newsletters** to subscribers.
- Collect **applications** from fans who want to appear on shows (quiz show,
  debate, match reactions) or apply for **jobs/crew roles**. The owner reviews
  these and picks who comes on.
- Centralize **contact info** and links to all **social channels**.
- Provide a **partnerships/sponsorship** funnel for brands.
- Lay the groundwork for a future **merch store**.

Brand identity (logo, fonts, colors) comes from the design files in `assets/`
and is codified in code (see section 5).

## 2. Tech stack

| Concern | Choice |
|--------|--------|
| Framework | **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript |
| Styling | **Tailwind CSS v4** (config-less, tokens in `globals.css`) |
| Database | **Supabase** (Postgres) — via service role key from server routes only |
| Email | **Resend** — double opt-in confirmations + newsletter Audience |
| Icons | `lucide-react` (pinned to `0.511.0`) |
| Validation | `zod` |
| Hosting | **Netlify** (`@netlify/plugin-nextjs`), domain `futbolfanszone.com` |
| Node | **20+ required** (Next 16 will not run on Node 19) |

> IMPORTANT: This is Next.js **16**, which has breaking changes vs. older
> versions many models were trained on. See `AGENTS.md` — read
> `node_modules/next/dist/docs/` before writing framework code.

## 3. Features already built

All of the following are implemented and the project builds cleanly
(`npm run build` passes).

### Public site
- **Home** (`src/app/page.tsx`) — hero with brand crest + tagline, animated
  stat counters, shows preview, newsletter signup, YouTube CTA, social row,
  hosts/creators grid.
- **Shows** (`src/app/shows/page.tsx`) — the recurring formats, each linking to
  the apply form pre-filtered by type.
- **Apply** (`src/app/apply/page.tsx`) — multi-type application form
  (quiz / job / general) with name, email, phone, socials, message,
  availability, and video link.
- **Subscribe** (`src/app/subscribe/page.tsx`) + **confirm**
  (`src/app/subscribe/confirm/page.tsx`) — newsletter signup + double opt-in
  landing.
- **Contact** (`src/app/contact/page.tsx`) — contact form + email/phone/socials.
- **Partners** (`src/app/partners/page.tsx`) — sponsorship lead form (reuses the
  contact pipeline with a preset subject).
- **Shop** (`src/app/shop/page.tsx`) — "coming soon" placeholder, scaffolded for
  future merch.
- **Privacy** / **Terms** (`src/app/privacy`, `src/app/terms`) — legal pages for
  email compliance.
- **Consent banner** (`src/components/ConsentBanner.tsx`) — cookie/analytics
  consent stored in localStorage.

### Admin
- **Login** (`src/app/admin/login`) — password gate. Session is a signed,
  HTTP-only cookie (`src/lib/auth.ts`).
- **Dashboard** (`src/app/admin/page.tsx` + `src/components/admin/AdminDashboard.tsx`)
  — list/filter applications by status & type, change status
  (new / shortlisted / picked / rejected), export CSV, and see subscriber counts
  (total / confirmed / pending).

### API routes (`src/app/api/**`)
- `POST /api/subscribe` — creates a pending subscriber, emails a confirm link.
- `GET  /api/subscribe/confirm` handled by the confirm page via `src/lib/subscribe.ts`.
- `POST /api/apply` — stores an application, emails applicant ack + admin notice.
- `POST /api/contact` — stores a contact message + emails admin.
- `POST /api/admin/login`, `POST /api/admin/logout`.
- `GET  /api/admin/applications`, `PATCH /api/admin/applications/[id]`.
- `GET  /api/admin/subscribers` (counts).

All public form routes have **zod validation**, a **honeypot** field, and basic
in-memory **rate limiting** (`src/lib/rate-limit.ts`).

### Data model — `supabase/schema.sql`
- `subscribers` — email (unique), status (pending/confirmed/unsubscribed),
  confirm_token, source.
- `applications` — type, name, email, phone, socials (jsonb), message, extra
  (jsonb), status.
- `contact_messages` — name, email, subject, message.
- RLS is enabled with **no public policies**; all access is server-side via the
  service role key.

## 4. Key design decisions / gotchas

- **Graceful degradation**: if Supabase/Resend env vars are missing, forms return
  a clear "not connected yet" message instead of crashing. So the site runs
  locally before you wire up services. See `isSupabaseConfigured()` /
  `isResendConfigured()`.
- **Secrets never reach the browser**: only `NEXT_PUBLIC_*` vars are client-side.
  `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `ADMIN_PASSWORD` are
  server-only.
- **Admin auth is intentionally simple** (single shared password + HMAC-signed
  cookie). Fine for a single owner; upgrade to Supabase Auth if multiple admins
  are needed.
- **lucide-react is pinned** to `0.511.0` because the latest release was missing
  brand icons (`Instagram`, `Youtube`) under Next 16's bundler.
- **Newsletter sending** is not automated in-app: confirmed subscribers are
  synced to a **Resend Audience**, and you compose/send weekly broadcasts from
  the Resend dashboard. An in-app composer could be added later.

## 5. Brand system

Source design files live in `assets/` (gitignored — see `.gitignore`). Optimized,
committed copies used by the app:

- `public/brand/` — logos, badges, hero SVG crests, colorways.
- `src/fonts/` — **Field Gothic** (primary UI/headlines) + **Tac One**
  (display/"chant" text like the tagline).
- `src/lib/brand.ts` — color tokens + asset paths (single source of truth).
- `src/components/brand/Logo.tsx` — shared logo (full wordmark or badge).
- `src/components/brand/SocialIcons.tsx` — social links incl. X/Twitter.
- `src/lib/constants.ts` — site name, tagline, contact info, social URLs, nav,
  shows, hosts, stats.

**Palette**: Navy `#1B4075`/`#0D2342` (foundation), Green `#16B016`/`#40D840`
(success/heritage), Yellow `#FFF34D`/`#F8E803` (CTAs), Blue `#096AD3`/`#2987ED`,
Orange `#DA532E`/`#FC411D`. Defined as CSS tokens in `src/app/globals.css` and
exposed as Tailwind color utilities (e.g. `bg-yellow`, `text-ice`, `bg-navy-deep`).

> Note: the Field Gothic files are TEST/trial cuts (small, limited glyphs).
> Swap in the licensed full fonts before production if full character coverage
> is needed.

## 6. Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used in emails/metadata) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only DB access |
| `RESEND_API_KEY` | Resend sending |
| `RESEND_FROM_EMAIL` | Verified from-address |
| `RESEND_AUDIENCE_ID` | Newsletter audience |
| `ADMIN_NOTIFICATION_EMAIL` | Where form notifications go |
| `ADMIN_PASSWORD` | Admin dashboard login (defaults to `admin` in dev if unset) |

## 7. How to run

```bash
nvm use 20          # Node 20+ required
npm install
cp .env.example .env.local
npm run dev         # http://localhost:3000
npm run build       # production build check
```

Admin: visit `/admin/login`.

## 8. Deployment

Netlify site connected to `github.com/futbolfanszone/futbofanszone`. Build config
is in `netlify.toml` (Node 20 + Next.js plugin). Set all env vars in Netlify's
dashboard. Point `futbolfanszone.com` DNS to Netlify and verify the sending
domain in Resend (SPF/DKIM) so newsletters land in inboxes.

## 9. What's left / roadmap

Not yet built (ordered roughly by value):

- [ ] **Wire up live services** — create the Supabase project, run
      `supabase/schema.sql`, set up Resend (domain verify + audience), fill env
      vars. Until then forms show "not connected".
- [ ] **Real hosts/content** — `HOSTS` in `constants.ts` is placeholder
      ("Coming Soon"); add real people + photos.
- [ ] **Merch store** — replace the `/shop` placeholder with Shopify or Stripe
      Checkout.
- [ ] **News/blog section** — for SEO and repeat visits (MDX or Supabase-backed).
- [ ] **Live YouTube feed** — currently a static CTA; pull latest uploads via the
      YouTube Data API.
- [ ] **In-app newsletter composer** — optional; today you send from Resend.
- [ ] **Analytics** — hook the consent banner up to Plausible/GA4.
- [ ] **Fan polls / predictions, match center, events/watch parties** — engagement
      features from the original plan.
- [ ] **Automated tests** — none yet.
- [ ] **Multi-admin auth** — upgrade from the single shared password if needed.

## 10. Repo conventions

- `AGENTS.md` — **keep this.** It's the cross-tool instruction file agentic
  coding tools auto-load; it warns that this is Next.js 16 with breaking changes.
- `CLAUDE.md` — points Claude-based tools at `AGENTS.md`. Keep it in sync.
- Server-only logic lives in `src/lib/*` and `src/app/api/*`; UI in
  `src/components/*`. Prefer editing `constants.ts` / `brand.ts` over hardcoding
  brand values in components.
