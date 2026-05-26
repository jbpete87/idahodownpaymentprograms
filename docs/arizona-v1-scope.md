# Arizona DPA Site — V1 Scope

**Project:** `arizonadownpaymentprograms.com`  
**Model:** Fork of [utahdownpaymentprograms.com](https://www.utahdownpaymentprograms.com) or Idaho fork (if ID shipped first)  
**Lead funnel:** Tim Hawkes Team (Utah team — your pipeline)  
**Target launch:** 5–7 weeks from kickoff (start after Idaho fork is proven)  
**Priority:** **Build second** — real volume (~12.6k/mo in keyword research)  
**Last updated:** May 2026

---

## Why Arizona second

| Factor | Detail |
|--------|--------|
| **Keyword volume** | ~12,600/mo — nearly tied with Colorado |
| **Head terms** | `arizona first time home buyer programs` + `grants` at **5,000/mo each** |
| **Low-comp gems** | Home Plus program (idx 25) |
| **Politics** | Outside Colorado RM territory |
| **Complexity** | Moderate — 2 statewide IDA programs + Maricopa/Pima split |

**Success metric:** 500+ GSC impressions/mo by month 3; 5+ quiz completions/mo by month 6.

---

## Domain & branding

| Item | Value |
|------|-------|
| **Domain** | `arizonadownpaymentprograms.com` |
| **Site name** | Arizona DPA Finder |
| **Title template** | `%s \| Arizona DPA Finder 2026` |

---

## Programs — v1 launch (~15–18)

Verify against [Home Plus AZ](https://homeplusaz.com/) and [Arizona Is Home](https://arizonaishome.org/) before publish.

### Tier 1 — Statewide (P0)

| Slug | Program | Max help | Coverage |
|------|---------|----------|----------|
| `home-plus` | Home Plus (Arizona IDA) | Up to 4% DPA | **All counties**, all zip codes |
| `arizona-is-home` | Arizona Is Home (IDA + ADOH) | 4% DPA + below-market 1st | All counties **except Maricopa & Pima**; not Chino Valley |
| `pathway-to-purchase` | Pathway to Purchase (ADOH) | Up to $20k | **Limited** — specific cities/zips only; verify 2026 funding status |

**Important content note:** Maricopa/Pima (Phoenix, Tucson metros) → primarily **Home Plus**. Rest of state → Home Plus **or** Arizona Is Home — quiz should branch on county.

### Tier 2 — Metro / county (P1)

| Slug | Program / page | Area |
|------|----------------|------|
| `maricopa-county-dpa` | Maricopa overview (Home Plus focus) | Maricopa |
| `pima-county-dpa` | Pima overview (Home Plus focus) | Pima |
| `phoenix-first-time-buyer` | Phoenix city guide | Phoenix |
| `tucson-first-time-buyer` | Tucson city guide | Tucson |
| `mesa-dpa` | Mesa | Mesa |
| `scottsdale-dpa` | Scottsdale | Scottsdale |
| `chandler-dpa` | Chandler | Chandler |
| `gilbert-dpa` | Gilbert | Gilbert |

### Tier 3 — Optional v1.1

- Flagstaff, Yuma, Pinal County local programs  
- ADOH legacy / event programs if funding returns  

---

## Locations — v1 launch (8)

| Slug | Name | Primary program |
|------|------|-----------------|
| `phoenix` | Phoenix | Home Plus |
| `mesa` | Mesa | Home Plus |
| `scottsdale` | Scottsdale | Home Plus |
| `chandler` | Chandler | Home Plus |
| `tucson` | Tucson | Home Plus |
| `gilbert` | Gilbert | Home Plus |
| `maricopa-county` | Maricopa County | Home Plus |
| `pima-county` | Pima County | Home Plus |

**Phase 1.1:** Glendale, Tempe, Peoria, Surprise, Flagstaff, Yuma.

---

## Quiz logic (Arizona-specific)

```
IF county IN (Maricopa, Pima) OR city = Chino Valley
  → prioritize Home Plus
ELSE
  → show Home Plus AND Arizona Is Home (compare AMI / income limits)
```

Income limits differ: Home Plus ~$155k cap (verify current); Arizona Is Home ~100% AMI.

---

## Pages

Same structure as Utah/Idaho — full parity recommended for Arizona given volume:

| Route | Priority |
|-------|----------|
| `/`, `/guide`, `/programs`, `/locations`, `/quiz` | P0 |
| `/first-time-home-buyer` | P0 (5k/mo head terms) |
| `/income-limits` | P0 |
| `/calculator` | P1 |
| `/about`, `/contact`, `/methodology`, llms.txt | P1 |

---

## SEO targets

```
arizona first time home buyer programs    (~5,000/mo)
arizona first time home buyer grants      (~5,000/mo)
arizona down payment assistance           (~500/mo)
arizona home plus program                 (~500/mo)
phoenix first time home buyer programs    (~500/mo)
pathway to purchase arizona               (~50/mo)
```

---

## Cross-links

- **Utah site footer:** "Buying in Arizona?"  
- **Idaho site footer:** regional cross-link when both live  
- **THT blog (later):** Utah vs Arizona comparison  
- **Defer:** Utah vs Colorado until CO launch  

---

## Business prerequisites

- [ ] Tim Hawkes Team on **Home Plus / Arizona IDA approved lender** list  
- [ ] Arizona Is Home lender approval (if stacking)  
- [ ] Quiz leads → `[AZ DPA Quiz]` email tag  
- [ ] GA4 + GSC for Arizona domain  

---

## Launch timeline

| Week | Work |
|------|------|
| 1–2 | Fork from Idaho repo; Home Plus + Arizona Is Home data |
| 3–4 | 8 location pages, Maricopa/Pima quiz branching |
| 5 | `/first-time-home-buyer`, income limits, SEO overrides |
| 6–7 | QA, Utah/Idaho cross-links, deploy, GSC |

---

## Expansion roadmap (updated)

```
1. Idaho   ← playbook test (3–4 weeks)
2. Arizona ← volume test (5–7 weeks)
3. Nevada  ← optional #3 (low comp, ~3.8k/mo)
4. Colorado ← when ready + optional RM sync
5. Texas   ← scale play later
```

---

## Related

- [Idaho v1 scope](./idaho-v1-scope.md) — build first  
- [Colorado v1 scope](./colorado-v1-scope.md) — deferred  
