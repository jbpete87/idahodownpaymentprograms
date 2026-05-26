# Idaho DPA Finder

Idaho down payment assistance resource site — forked from [utahdownpaymentprograms](https://github.com/jbpete87/utahdownpaymentprograms).

**Domain:** `idahodownpaymentprograms.com`  
**Scope:** See [idaho-v1-scope.md](./idaho-v1-scope.md)

## Stack

- Next.js 16 (App Router), React 19, Tailwind 4
- Static program data in `src/lib/programs-data.ts`
- Quiz + matching engine → Resend lead emails

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Quiz lead emails |
| `RESEND_TO_EMAIL` | Lead destination (default: jake@thetimhawkesteam.com) |
| `RESEND_FROM_EMAIL` | From address (`Idaho DPA <noreply@idahodownpaymentprograms.com>`) |
| `NEXT_PUBLIC_GA_ID` | GA4 property (new for Idaho domain) |
| `GOOGLE_SITE_VERIFICATION` | GSC verification token |

Optional (v1.1): `CRON_SECRET`, Upstash Redis for live rates API.

## AMI updates

```bash
HUD_API_TOKEN=xxx npm run update-ami:idaho
```

## Deploy (Vercel)

1. Create new Vercel project linked to this repo
2. Add domain `idahodownpaymentprograms.com` + `www`
3. Set env vars above in Vercel dashboard
4. Deploy — `next.config.ts` redirects non-www → www

Skip Vercel cron / rates API for v1 (calculator deferred).

## Cross-links

- Idaho footer → Utah site ("Buying in Utah?")
- Utah footer → Idaho site ("Buying in Idaho?")

## Content maintenance

Primary data files:

- `src/lib/programs-data.ts` — IHFA + local programs, AMI limits
- `src/lib/locations-data.ts` — Boise, Meridian, Nampa, Idaho Falls, Coeur d'Alene
- `src/lib/seo-metadata.ts` — SERP overrides, GSC monitoring queries

Verify IHFA program details at [idahohousing.com](https://www.idahohousing.com/homebuyers/down-payment-closing-cost-assistance/) before publishing updates.
