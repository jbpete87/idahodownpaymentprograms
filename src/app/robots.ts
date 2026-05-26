import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // AI crawlers - explicitly allow full access
        userAgent: [
          "GPTBot",           // OpenAI
          "ChatGPT-User",     // ChatGPT browsing
          "Claude-Web",       // Anthropic Claude
          "anthropic-ai",     // Anthropic
          "ClaudeBot",        // Claude
          "PerplexityBot",    // Perplexity
          "Google-Extended",  // Google AI/Gemini
          "Bytespider",       // ByteDance AI
          "CCBot",            // Common Crawl (used by many AI)
          "cohere-ai",        // Cohere
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/guide", "/programs", "/locations"],
      },
    ],
    sitemap: "https://www.idahodownpaymentprograms.com/sitemap.xml",
    // LLM-friendly content available at:
    // - /llms.txt (site overview for AI)
    // - /llms-full.txt (complete program reference in markdown)
  };
}

