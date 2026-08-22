"use client";

import { useEffect, useRef } from "react";
import { Footer } from "./footer";

/**
 * FooterReveal
 *
 * Not from Framer node data — this replicates a *behavior* you pointed
 * out after comparing the live Framer site to the Next.js build: on the
 * live site the footer sits `position: sticky; bottom: 0` inside its own
 * wrapping section, which is the very last block on the page. Because
 * the last section's content paints on top of it and keeps scrolling
 * up/off while the footer itself stays pinned to the viewport bottom,
 * the footer looks like it's "revealed" from underneath rather than
 * just appearing in normal document flow like a plain last element.
 *
 * A bare `position: sticky` on our footer wouldn't reproduce this by
 * itself: sticky vs. static look identical for the very last element in
 * a document unless something upstream *overlaps* it. Framer creates
 * that overlap implicitly through its transform-based canvas layout;
 * here it's done explicitly:
 *
 * - This component pins `<Footer />` with `fixed inset-x-0 bottom-0
 *   z-0` (behind everything else, no space of its own in flow).
 * - `app/layout.tsx` wraps the rest of the page (NavBar + main content)
 *   in a `relative z-10` layer so it paints ON TOP of the fixed footer,
 *   and ends that layer with a spacer `div` exactly as tall as the
 *   footer's real rendered height.
 * - As the user scrolls through that spacer's height, the content layer
 *   (transparent at that point, nothing left to render) scrolls up and
 *   out, and the fixed footer underneath becomes visible through it —
 *   the reveal effect.
 *
 * The footer's rendered height isn't a fixed number (it wraps
 * differently at each breakpoint and reflows if copy changes), so it's
 * measured live via `ResizeObserver` and published as the `--footer-
 * height` CSS variable on the root element; the spacer div in
 * layout.tsx reads that variable. Falls back to `0px` (rendered by the
 * spacer's own default) until the first measurement lands, and updates
 * automatically on any resize (breakpoint change, content reflow).
 */
export function FooterReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--footer-height",
        `${el.offsetHeight}px`,
      );
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-0">
      <Footer />
    </div>
  );
}
