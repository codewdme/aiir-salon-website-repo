"use client";

import { useEffect } from "react";

/**
 * RevealObserver
 *
 * Per your instruction ("without changing any design structure...
 * simply add a smooth fade in effect for every text and buttons, and
 * some components... which only fade slide in once they appear in
 * viewport") — not from Framer data, an explicit site-wide request.
 *
 * Deliberately NOT a wrapper component (no `<Reveal>{children}</Reveal>`
 * pattern) — wrapping every text node/button in a new element would add
 * DOM nodes around existing markup, which risks shifting flex/grid
 * layouts that size themselves off their direct children. Instead this
 * mounts once (in `app/layout.tsx`, alongside NavBar/Footer) and runs a
 * single shared `IntersectionObserver` over every element that already
 * carries the plain `reveal` className (see globals.css) — adding that
 * class to an existing element changes nothing about layout, only its
 * own opacity/transform.
 *
 * Behavior: the moment a `.reveal` element is >=10% visible, `.is-
 * revealed` is added (triggering the CSS transition in globals.css) and
 * that element is unobserved — so it fades in exactly once on first
 * appearance, never again on subsequent scrolls past it, matching "only
 * fade slide in once they appear."
 *
 * Runs once on mount and again via a MutationObserver for elements added
 * later (e.g. blog posts loaded client-side, accordion content) — plain
 * `querySelectorAll` on mount alone would miss anything not present in
 * the initial server-rendered HTML.
 */
export function RevealObserver() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    };

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
