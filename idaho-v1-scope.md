# Idaho DPA Site — V1 Scope

**Project:** `idahodownpaymentprograms.com`  
**Model:** Fork of [utahdownpaymentprograms.com](https://www.utahdownpaymentprograms.com)  
**Lead funnel:** Tim Hawkes Team (Utah team — your pipeline)  
**Target launch:** 3–4 weeks from kickoff  
**Priority:** **Build first** — fast validation of multi-state playbook  
**Last updated:** May 2026

---

## Why Idaho first

| Factor | Detail |
|--------|--------|
| **Keyword volume** | ~1,200/mo (smallest of core states — this is a *playbook test*, not volume play) |
| **Build complexity** | **Low** — mostly IHFA-centric; few city/county layers |
| **Politics** | No Colorado regional manager overlap |
| **Utah adjacency** | Boise/Treasure Valley buyers often compare Utah vs Idaho |
| **Maintenance** | Lowest ongoing data burden (~8–12 program pages) |

**Success metric:** Site live, GSC indexing, first quiz completion within 60 days — not massive traffic.

---

## Domain & branding

| Item | Value |
|------|-------|
| **Domain** | `idahodownpaymentprograms.com` |
| **Site name** | Idaho DPA Finder |
| **Title template** | `%s \| Idaho DPA Finder 2026` |

---

## Programs — v1 launch (~10–12)

Verify against [Idaho Housing](https://www.idahohousing.com/homebuyers/down-payment-closing-cost-assistance/) before publish.

### Tier 1 — Statewide (P0)

| Slug | Program | Max help | Notes |
|------|---------|----------|-------|
| `ihfa-dpa` | IHFA Down Payment & Closing Cost Assistance | Up to 8% of sales price | $500 min borrower contribution; repeat buyers OK |
| `ihfa-first-loan` | IHFA First Loan + DPA combo | Paired with DPA | Primary 1st mortgage product |
| `idaho-heroes` | Idaho Heroes 15 Year Second Mortgage | Up to 8% | Nurses, teachers, first responders |
| `ihfa-forgiving` | IHFA Forgiving Second (if applicable) | Varies | Verify current product name |

### Tier 2 — Local / adjacent (P1)

| Slug | Program | Area | Priority |
|------|---------|------|----------|
| `boise-city` | Boise city programs | Boise | P1 — verify current funding |
| `treasure-valley` | Regional overview page | Ada + Canyon | P0 as location, not separate program |
| `canyon-county` | Canyon County assistance | Canyon County | P2 |
| `idaho-falls-local` | Idaho Falls area | Idaho Falls | P2 |
| `coeur-d-alene-local` | Kootenai County / CDA | North Idaho | P2 |

**V1 target:** 10–12 program/location pages total. IHFA carries 80% of the value.

---

## Locations — v1 launch (5)

| Slug | Name | Why |
|------|------|-----|
| `boise` | Boise | Largest market |
| `meridian` | Meridian | Fast growth suburb |
| `nampa` | Nampa | Canyon County hub |
| `idaho-falls` | Idaho Falls | East Idaho |
| `coeur-d-alene` | Coeur d'Alene | North Idaho |

**Phase 1.1:** Twin Falls, Pocatello, Caldwell, Treasure Valley hub page.

---

## Pages (minimal v1)

| Route | Priority |
|-------|----------|
| `/`, `/guide`, `/programs`, `/programs/[slug]` | P0 |
| `/locations`, `/locations/[slug]` | P0 |
| `/quiz` | P0 |
| `/first-time-home-buyer` | P1 |
| `/income-limits` | P1 |
| `/about`, `/contact`, `/methodology` | P1 |
| `/calculator` | P2 (defer to v1.1) |

---

## SEO targets

```
idaho down payment assistance          (~500/mo)
idaho first time home buyer programs   (~500/mo)
ihfa down payment assistance
boise down payment assistance
idaho housing down payment assistance
```

---

## Cross-links

- **Utah site footer:** "Buying in Idaho?" → Idaho site  
- **THT:** `/down-payment-assistance` hub link when live  
- **Comparison content (later):** Utah vs Idaho (after Idaho live)

---

## Business prerequisites

- [ ] Tim Hawkes Team on **IHFA approved lender** list  
- [ ] Quiz leads → your team (jake@thetimhawkesteam.com), subject `[ID DPA Quiz]`  
- [ ] GA4 + GSC for Idaho domain  

---

## Launch timeline

| Week | Work |
|------|------|
| 1 | Fork repo, domain, IHFA program research + data entry |
| 2 | 5 location pages, quiz geography, SEO metadata |
| 3 | QA, cross-links from Utah, deploy |
| 4 | GSC submit, monitor |

---

## Related

- [Arizona v1 scope](./arizona-v1-scope.md) — build second  
- [Colorado v1 scope](./colorado-v1-scope.md) — deferred  
