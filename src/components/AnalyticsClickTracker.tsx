"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const SCROLL_THRESHOLDS = [50, 90] as const;

/** Delegates data-track clicks and scroll-depth events to GA4. */
export function AnalyticsClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-track]"
      );
      if (!target) return;

      trackEvent("cta_click", {
        track_label: target.dataset.track ?? "unknown",
        track_detail: target.dataset.trackDetail ?? "",
        link_url: target instanceof HTMLAnchorElement ? target.href : "",
        page_path: pathname,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  useEffect(() => {
    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackEvent("scroll_depth", {
            percent_scrolled: threshold,
            page_path: pathname,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
