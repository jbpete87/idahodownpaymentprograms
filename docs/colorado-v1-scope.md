# Colorado DPA Site — V1 Scope

> **Status: DEFERRED** — Build Idaho and Arizona first. Revisit Colorado after those sites are live and producing leads. Colorado regional manager alignment optional before launch.

**Project:** `coloradodownpaymentprograms.com` (working title)  
**Model:** Fork of [utahdownpaymentprograms.com](https://www.utahdownpaymentprograms.com) architecture  
**Lead funnel:** Tim Hawkes Team (licensed CO lender)  
**Target launch:** TBD (after Idaho + Arizona)  
**Last updated:** May 2026

---

## Goals

1. Capture Colorado DPA search demand (~13k/mo in keyword research; CHFA terms low competition).
2. Convert via eligibility quiz → consult / pre-approval on thetimhawkesteam.com.
3. Cross-link with Utah site and THT for users comparing states (relocation intent).
4. Reuse Utah codebase patterns — data shape, quiz, SEO, llms.txt — with Colorado-specific content.

---

## Domain & branding

| Item | Recommendation |
|------|----------------|
| **Primary domain** | `coloradodownpaymentprograms.com` |
| **Alt / redirect** | `codownpaymentprograms.com` (optional) |
| **Site name** | Colorado DPA Finder |
| **Title template** | `%s \| Colorado DPA Finder 2026` |
| **Primary color** | Keep green system or shift to CO-friendly blue/gold accent (decide at fork) |
| **Hosting** | Vercel (separate project or monorepo — see Architecture) |
| **GA4** | New property `G-XXXXXXXX` |
| **GSC** | Add property at launch |

---

## Architecture options

### Option A — New repo (recommended for v1)

- Copy `utahdownpaymentprograms` repo → `coloradodownpaymentprograms`
- Find/replace Utah → Colorado in copy, config, schema
- Independent deploy, DNS, analytics
- **Pros:** Clean, no risk to Utah site  
- **Cons:** Duplicate maintenance; use DPA data playbook to sync process

### Option B — Monorepo later (v2)

- Shared `@dpa-finder/core` package: types, matching engine, quiz UI, calculator
- State-specific `programs-data.ts` + `locations-data.ts` per app
- **Defer** until 2+ state sites exist

**V1 decision:** Option A — fork and ship.

---

## Pages to build (mirror Utah)

| Route | Priority | Notes |
|-------|----------|-------|
| `/` | P0 | Hero, top programs, quiz CTA, “Licensed in Colorado” trust line |
| `/guide` | P0 | 2026 Colorado DPA pillar page |
| `/programs` | P0 | Server SEO intro + client filter (like Utah split) |
| `/programs/[slug]` | P0 | One page per program (~18–22 at launch) |
| `/locations` | P0 | Location index |
| `/locations/[slug]` | P0 | 8 launch cities/counties (below) |
| `/quiz` | P0 | 8-step flow; CO counties/cities in StepLocation |
| `/first-time-home-buyer` | P1 | Targets 5k/mo head terms |
| `/income-limits` | P1 | FY 2026 AMI for CO metros |
| `/calculator` | P2 | Optional v1.1 — Utah has it; nice for parity |
| `/about`, `/contact`, `/methodology` | P1 | THT attribution, disclaimers |
| `/llms.txt` + `/llms-full.txt` | P1 | AI crawler discovery |
| `/sitemap.xml`, `/robots.txt` | P0 | Auto-generated |

**Not in v1:** Blog (comparison content lives on THT first), rate API, multi-state hub.

---

## Programs — v1 launch list (~20)

Verify all against official sources before publish. Mark `lastVerified` on each entry.

### Tier 1 — Statewide (must-have)

| Slug | Program | Agency | Max assistance | Type | Priority |
|------|---------|--------|----------------|------|----------|
| `chfa-dpa-grant` | CHFA Down Payment Assistance Grant | CHFA | Lesser of $25k or 3% of 1st mortgage | Grant (no repayment) | P0 |
| `chfa-second-mortgage` | CHFA Second Mortgage Loan | CHFA | Lesser of $25k or 4% of 1st mortgage | Deferred 2nd | P0 |
| `chfa-first-generation` | CHFA First Generation Homebuyer | CHFA | Up to $25k | Deferred 2nd | P1 |
| `chfa-disability` | CHFA Disability Assistance | CHFA | Up to $25k | Deferred 2nd | P1 |
| `chac-statewide` | CHAC Mortgage Assistance | CHAC | Up to $12k (6% of price/appraisal) | Second mortgage w/ payments | P0 |
| `metrodpa` | metroDPA | Denver / Front Range | % of 1st mortgage (varies by product) | Deferred 0% 2nd | P0 |
| `metrodpa-denver-advantage` | metroDPA Denver Advantage | Denver | Enhanced metroDPA for Denver County | Deferred 2nd | P1 |
| `metrodpa-edge` | metroDPA EDGE | Denver | Targeted metroDPA series | Deferred 2nd | P2 |

**Sources:** [CHFA DPA](https://www.chfainfo.com/homeownership/down-payment-assistance), [metroDPA](https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Department-of-Housing-Stability/Resident-Resources/Affordable-Home-Ownership/metroDPA), [CHAC lenders](https://chaconline.org/lenders/)

### Tier 2 — Metro / city (high search + stackability)

| Slug | Program | Area | Max assistance | Priority |
|------|---------|------|----------------|----------|
| `aurora-hoap` | Aurora Home Ownership Assistance Program (HOAP) | Aurora | Up to $10k | P0 |
| `boulder-h2o` | Boulder H2O (House to Homeownership) | Boulder city | Up to $100k shared appreciation | P1 |
| `fort-collins-homebuyer` | Fort Collins Home Buyer Assistance | Fort Collins | TBD — verify current fund | P1 |
| `longmont-dpa` | Longmont Down Payment Assistance | Longmont | TBD | P2 |
| `pikes-peak-dpa` | Pikes Peak / El Paso County DPA (Turnkey Plus) | Colorado Springs area | ~5% of loan amount forgivable | P0 |
| `pueblo-homeownership` | Pueblo housing assistance | Pueblo | TBD | P2 |
| `greeley-housing` | Greeley / High Plains Housing | Greeley | TBD | P2 |

### Tier 3 — County / nonprofit (fill to ~20)

| Slug | Program | Notes | Priority |
|------|---------|-------|----------|
| `crhdc-neighborhoodlift` | CRHDC NeighborhoodLIFT | Adams, Arapahoe, Denver, Douglas, Jefferson | P2 — often event-based |
| `denver-del-norte` | Del Norte Homeownership | Denver metro nonprofit | P2 |
| `wheat-ridge-wrha` | WRHA Home Ownership | Wheat Ridge | P3 |

**V1 target:** 18–22 active program pages. Pause/closed programs get a page with `fundingStatus: "paused"` if they rank (like Utah Davis County pattern).

---

## Locations — v1 launch (8)

Based on keyword volume + program density:

| Slug | Name | Type | Linked programs (IDs TBD) |
|------|------|------|----------------------------|
| `denver` | Denver | City | metroDPA, Denver Advantage, CHFA, CHAC |
| `aurora` | Aurora | City | HOAP, metroDPA, CHFA |
| `colorado-springs` | Colorado Springs | City | Pikes Peak DPA, CHFA |
| `boulder` | Boulder | City | H2O, CHFA, CHAC |
| `fort-collins` | Fort Collins | City | City program, CHFA |
| `arvada` | Arvada | City | metroDPA, CHFA |
| `jefferson-county` | Jefferson County | County | metroDPA, CHFA, CRHDC |
| `adams-county` | Adams County | County | metroDPA, HOAP nearby, CHFA |

**Phase 1.1 locations (weeks 10–14):** Lakewood, Westminster, Pueblo, Weld County, Arapahoe County, Douglas County, Larimer County.

Each location page needs:
- Custom `LOCATION_SEO` title/description (GSC-style phrasing)
- 3–5 FAQs matching query language
- `localPrograms[]` linking to program IDs
- `nearbyAreas[]` internal links

---

## Data layer checklist

Fork these files and replace Utah content:

| File | Changes |
|------|---------|
| `src/lib/programs-data.ts` | All CO programs + `AMI_LIMITS` for CO metros |
| `src/lib/locations-data.ts` | 8+ location entries |
| `src/lib/seo-metadata.ts` | `SITE_URL`, `LOCATION_SEO`, `PROGRAM_SEO`, `GSC_MONITORING_QUERIES` |
| `src/lib/schema.ts` | `areaServed: Colorado`, organization URLs |
| `src/stores/quiz-store.ts` | localStorage key → `colorado-dpa-quiz` |
| `src/components/quiz/StepLocation.tsx` | CO cities/counties dropdown |
| `public/llms.txt` | CO program summary |
| `src/app/llms-full.txt/route.ts` | Dynamic from CO data |
| `scripts/update-ami.mjs` | Point HUD API pulls to CO counties |

**Program type fields:** Reuse existing `Program` interface from `src/types/index.ts` — no schema changes needed.

---

## Quiz & lead flow

Same 8-step flow as Utah:

1. Consent  
2. Location (CO city/county/zip)  
3. Household size  
4. Income  
5. Buyer type / property type  
6. Veteran / occupation  
7. Financing (optional)  
8. Results + lead form  

**Matching engine:** Reuse `matchPrograms()` — update geography rules for CO counties and city programs.

**Lead destination:** `POST /api/quiz-lead` → `jake@thetimhawkesteam.com` with subject line `[CO DPA Quiz]` to distinguish from Utah leads.

**Results CTA:** Link to `https://www.thetimhawkesteam.com/contact` or book URL with UTM `?utm_source=co-dpa-finder&utm_medium=quiz`.

---

## SEO strategy

### Target keywords (from Planner research)

| Priority | Keyword cluster | Est. volume |
|----------|-----------------|-------------|
| P0 | colorado first time home buyer programs | 5,000/mo |
| P0 | colorado first time home buyer grants | 5,000/mo |
| P0 | colorado down payment assistance | 500/mo |
| P0 | chfa down payment assistance | 500/mo (low comp) |
| P1 | chfa first time home buyer | 500/mo |
| P1 | denver down payment assistance | 50/mo (rank fast) |
| P1 | colorado springs down payment assistance | 50/mo |
| P2 | first time home buyer colorado vs utah | long-tail — comparison page on THT |

### Technical SEO (copy Utah patterns)

- Server-rendered metadata on all pages
- Canonical URLs on `www`
- JSON-LD: Organization, WebSite, FAQ, Breadcrumb, Program
- `/programs` hub intro paragraph + internal links (reduce cannibalization)
- Mobile-first — UDP GSC showed mobile converts better

### `GSC_MONITORING_QUERIES` (CO site)

```
colorado down payment assistance
colorado first time home buyer programs
chfa down payment assistance
denver down payment assistance
metrodpa down payment assistance
colorado springs down payment assistance
aurora down payment assistance
colorado first time home buyer grants
```

---

## Cross-links

### From Colorado site → THT

| Placement | Link |
|-----------|------|
| Footer | thetimhawkesteam.com, /contact, /down-payment-assistance |
| Quiz results | Get pre-approved (THT contact) |
| About / Contact | NMLS, Clearfield office + “Serving Colorado buyers remotely” |
| llms.txt | THT DPA hub |

### From Utah site → Colorado

| Placement | Link |
|-----------|------|
| Footer | “Buying in Colorado?” → CO site or THT comparison article |
| `/guide` sidebar | Relocation callout |

### From THT → Colorado

| Placement | Link |
|-----------|------|
| `/down-payment-assistance` hub | “Colorado programs” → CO site |
| Blog: Utah vs Colorado comparison | Both state sites + quiz CTAs |
| Footer resources | CO DPA Finder |

---

## Business prerequisites (confirm before launch)

- [ ] Tim Hawkes Team on **CHFA Participating Lender** list  
- [ ] Tim Hawkes Team on **metroDPA-approved lender** list  
- [ ] CHAC lender approval (if stacking CHAC)  
- [ ] LO licensed in Colorado (already true — verify NMLS)  
- [ ] Homebuyer education referral partner or online course link  
- [ ] Legal disclaimer review (educational site, not CHFA/metroDPA official)

---

## Content & compliance

- **Disclaimer on every page:** Educational resource; not affiliated with CHFA, metroDPA, or any housing authority. Programs change; verify with official sources and a licensed lender.
- **Attribution:** Maintained by Tim Hawkes Team (NMLS #2258)
- **Update cadence:** Quarterly AMI refresh via `update-ami` script; ad-hoc when CHFA/metroDPA announce changes
- **Methodology page:** Same transparency model as Utah (sources, last verified dates)

---

## Launch phases

### Phase 0 — Prep (week 1)

- [ ] Confirm lender approvals (CHFA, metroDPA)
- [ ] Register domain + Vercel project
- [ ] Fork repo
- [ ] Create GA4 + GSC properties

### Phase 1 — Data (weeks 2–4)

- [ ] Research and enter 18–22 programs in `programs-data.ts`
- [ ] Pull FY 2026 AMI for Denver, Colorado Springs, Boulder, Fort Collins MSAs
- [ ] Build 8 location pages
- [ ] Configure SEO metadata overrides

### Phase 2 — Build & QA (weeks 5–7)

- [ ] Global rebrand (copy, schema, llms.txt)
- [ ] Quiz CO geography + matching rules
- [ ] Cross-links on Utah site + THT comparison article published
- [ ] Mobile QA, Lighthouse, structured data test

### Phase 3 — Launch (week 8)

- [ ] Deploy production
- [ ] Submit sitemap to GSC
- [ ] Link from THT `/down-payment-assistance` and Utah footer
- [ ] Monitor GSC + GA4 for 30 days

### Phase 1.1 (weeks 10–14)

- [ ] 6 additional location pages
- [ ] Calculator page parity
- [ ] `/first-time-home-buyer` long-form guide

---

## Success metrics (year 1)

| Metric | Target (6 mo post-launch) |
|--------|----------------------------|
| GSC impressions | 1,000+/month |
| GSC clicks | 15+/month |
| Quiz completions | 10+/month |
| THT consults from CO | 2–5/month |
| Closings | 1–3 in year 1 = validates model |

---

## Open questions

1. **Monorepo vs separate repo** — default separate for v1; revisit after Arizona.
2. **Brand color** — keep Utah green or differentiate Colorado site?
3. **Homebuyer class** — link to Utah's online class or Colorado-specific provider?
4. **Rate calculator** — include in v1 or defer?
5. **Who owns ongoing program data updates?** — assign before launch (playbook from Tim Hawkes Team repo).

---

## Related documents

- [Utah vs Colorado comparison page brief](./utah-vs-colorado-comparison-page.md)
- Tim Hawkes Team DPA data playbook (sister repo)
- Keyword research: `keyword-research-multi-state.csv`
