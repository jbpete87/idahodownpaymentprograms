import { PROGRAMS } from "@/lib/programs-data";
import { LOCATIONS } from "@/lib/locations-data";

export async function GET() {
  const activePrograms = PROGRAMS.filter(p => p.fundingStatus !== "closed");
  const closedPrograms = PROGRAMS.filter(p => p.fundingStatus === "closed");
  
  const markdown = `# Idaho Down Payment Assistance Programs - Complete Reference

> Last updated: May 2026 | https://www.idahodownpaymentprograms.com

This document contains comprehensive information about all down payment assistance (DPA) programs available to Idaho homebuyers in 2026.

---

## Table of Contents

1. [What is Down Payment Assistance?](#what-is-dpa)
2. [Types of Assistance](#types-of-assistance)
3. [Eligibility Requirements](#eligibility)
4. [Active Programs](#active-programs)
5. [Programs by Location](#by-location)
6. [Frequently Asked Questions](#faq)
7. [How to Apply](#how-to-apply)

---

## What is Down Payment Assistance? {#what-is-dpa}

Down payment assistance (DPA) programs help homebuyers cover their down payment and closing costs. In Idaho, these programs are offered by:

- **Idaho Housing and Finance Association (IHFA)** - Statewide programs
- **Counties** - Ada, Canyon, Bonneville, Kootenai
- **Cities** - Boise HOP


### Key Statistics (2026)

- **${activePrograms.length}** active programs in Idaho
- **Up to 8% of sales price** in combined assistance available
- **4 priority counties + statewide IHFA** covered statewide
- **$30,000-$50,000** typical assistance for qualifying buyers

---

## Types of Assistance {#types-of-assistance}

### 1. Grants
- **Free money** - no repayment required
- Most competitive, limited funding
- Examples: At Home in Layton ($10,000), UHC Veteran Grant ($2,500)

### 2. Forgivable Loans
- **Forgiven after 5 years** of occupancy
- Repaid pro-rata if sold/refinanced early
- Most common type in Idaho
- Examples: Murray City DPA ($30,000), Midvale City DPA ($30,000)

### 3. Deferred Loans
- **No monthly payments**
- Repaid when you sell, refinance, or pay off mortgage
- 0-3% interest typically
- Examples: Davis County ($50,000), Provo Home Purchase Plus ($60,000)

### 4. Second Mortgages
- **Monthly payments** at favorable rates
- Best for maximum assistance amount
- Example: UHC Second Mortgage ($10,000-$27,500)

---

## Eligibility Requirements {#eligibility}

### Income Limits

Most programs use Area Median Income (AMI) limits:

| AMI Level | Family of 4 (Approximate) |
|-----------|---------------------------|
| 80% AMI   | $70,000 - 8% of sales price/year    |
| 100% AMI  | $88,000 - $106,000/year   |
| 120% AMI  | $105,000 - $130,000/year  |

*Limits vary by county. Salt Lake County has higher limits than rural areas.*

### Credit Requirements
- Minimum credit score: **620-680** (varies by program)
- Some programs allow lower with FHA loans
- Stable employment history required

### Property Requirements
- Must be **primary residence**
- Purchase price limits apply (typically $400,000-$600,000)
- Single-family homes, condos, townhomes usually qualify
- Investment properties do NOT qualify

### First-Time Buyer Status
- Many programs require first-time buyer status
- Definition: Have not owned a home in **past 3 years**
- Some programs available to repeat buyers (UHC Score Loan, Community Lending)

### Education Requirements
- Most programs require **homebuyer education course**
- Online courses available (2-8 hours)
- Cost: $50-100 (sometimes reimbursed)

---

## Active Programs {#active-programs}

${activePrograms.map(program => `
### ${program.name}

- **Amount**: Up to $${program.maxAmount.toLocaleString()}
- **Type**: ${formatAssistanceType(program.assistanceType)}
- **Agency**: ${program.agency}
- **Location**: ${program.geographyType === "statewide" ? "Statewide" : program.geographyValues.join(", ")}
- **Buyer Types**: ${program.buyerTypes.includes("first_time") && program.buyerTypes.includes("repeat") ? "All buyers" : program.buyerTypes.includes("first_time") ? "First-time buyers only" : "Repeat buyers welcome"}
- **Income Limit**: ${program.amiPercent}% AMI
- **Funding Status**: ${program.fundingStatus === "open" ? "✅ Open" : program.fundingStatus === "limited" ? "⚠️ Limited funds" : "❌ Closed"}
${program.forgivenessYears ? `- **Forgiveness**: After ${program.forgivenessYears} years` : ""}

**Terms**: ${program.termsSummary}

**How to Apply**: ${program.applicationSteps}

**Website**: ${program.websiteUrl}

---
`).join("")}

${closedPrograms.length > 0 ? `
## Currently Unavailable Programs

The following programs are temporarily out of funds or closed:

${closedPrograms.map(program => `
- **${program.name}** (${program.agency}) - ${program.fundingStatus === "closed" ? "Out of funds" : "Temporarily unavailable"}
`).join("")}

---
` : ""}

## Programs by Location {#by-location}

${LOCATIONS.filter(loc => loc.type === "county").map(location => `
### ${location.name}

${location.description}

**Available Programs**: ${location.localPrograms.length}+ programs

**Key Programs**:
${location.localPrograms.slice(0, 5).map(id => {
  const program = PROGRAMS.find(p => p.id === id);
  return program ? `- ${program.name} (${program.maxAmount > 0 ? "$" + program.maxAmount.toLocaleString() : "Varies"})` : "";
}).filter(Boolean).join("\n")}

**Cities Covered**: ${location.nearbyAreas?.filter(a => !a.includes("county")).slice(0, 5).join(", ") || "Various cities"}

Learn more: https://www.idahodownpaymentprograms.com/locations/${location.slug}

`).join("")}

---

## Frequently Asked Questions {#faq}

### What is down payment assistance in Idaho?

Down payment assistance (DPA) programs in Idaho provide grants, forgivable loans, or low-interest second mortgages to help homebuyers cover their down payment and closing costs. Programs are offered by the state (Idaho Housing and Finance Association (IHFA)), counties, and cities, with assistance amounts ranging from $2,500 to $60,000+ depending on the program.

### Who qualifies for Idaho down payment assistance?

Eligibility varies by program but typically includes:
- Income limits (usually 80-120% of Area Median Income)
- Property location requirements
- Minimum credit scores (typically 620-680)
- Sometimes first-time homebuyer status
- Some programs have special benefits for teachers, first responders, veterans, and healthcare workers

### How much down payment assistance can I get in Idaho?

Idaho homebuyers can access up to 8% of sales price in combined assistance by stacking multiple programs. Individual programs range from $2,500 (UHC Veteran Grant) to $60,000 (Provo Home Purchase Plus). The exact amount depends on your location, income, occupation, and which programs you qualify for.

### Do I have to pay back down payment assistance?

It depends on the program type:
- **Grants**: No repayment required
- **Forgivable loans**: Forgiven if you stay in the home for a set period (usually 5 years)
- **Deferred loans**: Repaid when you sell, refinance, or pay off the mortgage
- **Second mortgages**: Monthly payments but often at below-market rates

### Can I combine multiple DPA programs?

Yes! Many Idaho programs can be stacked. For example, you could combine a city program (like Murray's $30,000) with a UHC second mortgage ($10,000-$27,500). Some buyers access $50,000+ in combined assistance.

### What credit score do I need?

Most programs require a minimum credit score of 620-680. FHA loans (popular with DPA programs) allow scores as low as 580 with 3.5% down. Some programs help buyers with credit improvement.

### Do I need to be a first-time homebuyer?

Not always. While many programs target first-time buyers, several Idaho programs are available to repeat buyers who meet income requirements. UHC Score Loan, Community Lending Program, and some city programs welcome all buyers.

---

## How to Apply {#how-to-apply}

### Step 1: Check Your Eligibility
Take the free eligibility quiz at https://www.idahodownpaymentprograms.com/quiz to see which programs you may qualify for. No SSN or sensitive information required.

### Step 2: Complete Homebuyer Education
Most programs require a HUD-approved homebuyer education course. Online courses take 2-8 hours and cost $50-100. Some programs reimburse this cost.

### Step 3: Get Pre-Approved
Work with a lender experienced in DPA programs. They'll verify your income, credit, and eligibility for specific programs. Not all lenders offer all programs.

### Step 4: Find Your Home
Search for homes within program price limits and geographic areas. Your lender can help you understand the limits for programs you're targeting.

### Step 5: Apply for DPA Programs
Your lender submits applications on your behalf. Some programs like city grants require separate applications. Processing times vary from 1 day to 2+ weeks.

### Step 6: Close on Your Home
DPA funds are disbursed at closing. You'll sign documents for your first mortgage plus any DPA loans.

---

## About This Resource

Idaho Down Payment Programs is a free educational resource maintained by licensed Idaho mortgage professionals Tim Hawkes and Jake Peterson (The Tim Hawkes Team | Cornerstone Home Lending).

**Contact**:
- Email: jake@thetimhawkesteam.com
- Phone: (801) 820-7620 / (801) 698-6071
- Website: https://www.idahodownpaymentprograms.com

**Data Sources**:
- Idaho Housing and Finance Association (IHFA) (idahohousing.com)
- HUD.gov
- Individual city and county housing departments
- Direct verification with program administrators

**Last Updated**: May 2026

---

*This document is provided for informational purposes only. Program details, availability, and requirements may change. Always verify current information with program administrators and participating lenders.*
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
}

function formatAssistanceType(type: string): string {
  switch (type) {
    case "grant":
      return "Grant (no repayment)";
    case "forgivable_loan":
      return "Forgivable Loan";
    case "deferred_loan":
      return "Deferred Loan";
    case "second_mortgage":
      return "Second Mortgage";
    default:
      return type;
  }
}

