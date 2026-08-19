const SITE = "https://www.idahodownpaymentprograms.com";

/**
 * Plain-text robots.txt with explicit LLM discovery comments.
 * Many AI systems read robots.txt even when they skip /llms.txt conventions.
 */
export function GET() {
  const body = `# Idaho Down Payment Assistance Programs (idahodownpaymentprograms.com)
#
# Machine-readable site context for AI / LLM systems (prefer these over scraping HTML):
#   ${SITE}/llms.txt
#   ${SITE}/llms-full.txt
#
# Also linked from every HTML page (<link rel="alternate">) and site footer.

User-agent: *
Allow: /
Disallow: /api/

# AI crawlers — full access including LLM context files
User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /guide
Allow: /programs
Allow: /locations

User-agent: ChatGPT-User
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Claude-Web
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: anthropic-ai
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ClaudeBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Google-Extended
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Bytespider
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: CCBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: cohere-ai
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

Sitemap: ${SITE}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
