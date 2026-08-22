"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrandLogo } from "./brand-logo";
import { MenuItem } from "./menu-item";

/**
 * NavBar
 *
 * Source: Framer project "aiir-salon-claude", component "Nav bar"
 * (nodeId VEwbzWSE3), read via getSelectedNodesXml / getNodeXml.
 *
 * CONFIRMED (from Framer node data):
 * - Desktop variant (adHHy4B02): row layout, justify-between, items-center,
 *   gap 10px, padding "0px 64px" on the outer wrapper (px-16), inner
 *   Container padding "4px 0px" (py-1).
 * - Tablet variant (XAhNmBP1l): identical structure to Desktop, only the
 *   outer padding differs — "0px 32px" (px-8).
 * - Both Desktop and Tablet contain: BrandLogo (variant="navbar") on the
 *   left, and a pill-shaped Menu on the right — backgroundColor
 *   rgba(191,170,147,0.8), borderRadius 10px, padding 4px (p-1), gap 8px
 *   (gap-2) — holding 4 MenuItem instances:
 *     About (/about), Services (/services), Journal (/blogs) as
 *     variant="primary" with textColor rgb(252,247,237) / hoverBg
 *     rgb(255,255,255); "Get in touch" (/contact) as variant="secondary"
 *     with textColor rgb(138,109,80) / hoverBg rgb(252,247,237).
 * - PhoneClose variant (VWtrtQNBc): row, justify-between, padding
 *   "8px 24px", holding a compact BrandLogo (53x37, confirmed instance
 *   override) and a MenuIcon button — backgroundColor
 *   rgba(252,247,237,0.44), borderRadius 8px, padding 12px (p-3), icon
 *   24x24 colored rgb(65,19,19) (= the `black` token).
 * - PhoneOpen variant (UisusRCnd): 390x800 panel, backgroundColor
 *   "/Green Accent", padding 24px on all sides, containing a vertical
 *   Container with gap 24px, padding "4px 0px 24px 0px" (confirmed via a
 *   second read after the first attempt returned no children — see
 *   INFERRED below for why the nav links inside weren't recoverable).
 *
 * INFERRED, then CONFIRMED by a user-supplied screenshot of the actual
 * PhoneOpen state (Framer's node read repeatedly returned empty content
 * for everything nested more than one level inside this variant — tried
 * getNodeXml directly, via the parent component, and via the
 * id-concatenation technique for recovering variant-only data — none
 * recovered the children). The screenshot showed:
 * - A 5th link, "Home" (/), that no other breakpoint's data mentioned —
 *   added it as the first item, phone-menu only.
 * - Links are left-aligned in a vertical stack (not centered), plain text
 *   with no pill background/padding — only the "Get in touch" CTA is an
 *   actual button (white pill, padded, shrink-to-content width, still
 *   left-aligned, not full width).
 * - Link text renders in a dark brown, close to the "/Primary text color"
 *   token — applied as an explicit textColor now instead of inheriting
 *   currentColor.
 *
 * INFERRED (still unconfirmed):
 * - No close ("X") icon or panel structure came through for PhoneOpen, so
 *   the close button here reuses the PhoneClose's MenuIcon button styling
 *   with an X glyph instead of the hamburger.
 * - The hamburger/close icon *shapes* aren't in Framer's XML (icon nodes
 *   only expose a fill color, not path data) — drawn here as plain inline
 *   SVGs at the confirmed 24x24 size and rgb(65,19,19) color.
 * - Slide-in-from-right open/close animation for the phone menu was
 *   explicitly requested (not from Framer data) — implemented with
 *   `motion` (already a project dependency).
 * - Outer max-width for the desktop/tablet bar isn't specified in Framer
 *   (its canvas widths are arbitrary artboard sizes, not real breakpoints)
 *   — used max-w-[1360px] as a reasonable default; adjust if the real site
 *   uses a different content width.
 *
 * UPDATE (per your request, phone breakpoint only, not from Framer data):
 * - Body scroll lock while the phone menu is open: a `matchMedia`-driven
 *   effect toggles `document.body.style.overflow` only when BOTH `open`
 *   is true AND the viewport is currently at/under the `md` breakpoint
 *   (767px) — so this never touches scroll behavior on desktop/tablet,
 *   even in the unlikely case `open` were somehow true there. Listens
 *   for the breakpoint changing while the menu is open (e.g. rotating a
 *   tablet) so the lock re-evaluates instead of getting stuck either way.
 * - Phone menu items (the 4 nav links + "Get in touch") are 6px larger
 *   than `text-eyebrow`'s default 14px (-> `fontSize="20px"` on each,
 *   see `MenuItem`'s new optional prop) — scoped to only these phone-menu
 *   instances, the desktop nav's own `MenuItem`s are untouched.
 * - 8px left padding (`pl-2`) added to the 4 link items only (About/
 *   Services/Journal/the phone-only "Home" link) — NOT the "Get in
 *   touch" button, which stays exactly as it was.
 *
 * UPDATE 2 (per your request — the gradient div you selected on the
 * canvas, nodeId H2qKyeAtR, read via getSelectedNodesXml, then its real
 * computed style read directly off the live site since the gradient
 * itself doesn't come through Framer's plain XML attributes, same
 * limitation already hit for Gallery's vignette mask):
 * - CONFIRMED real values (checked identical on both `/` and `/about`
 *   on the live site): `position: fixed`, full width, `height: 258px`,
 *   `top: 0`, `z-index: 9` (below this header's own `z-50`, above page
 *   content), `opacity: 0.7`, background
 *   `linear-gradient(rgba(191, 170, 147, 0.6) 0%, rgba(148, 139, 129, 0) 100%)`
 *   — a soft tan-to-transparent fade from the very top of the page,
 *   there on every page, not tied to any specific hero image. Bundled
 *   into `NavBar` itself (rather than added separately to
 *   `app/layout.tsx`) per your instruction that it should always travel
 *   with the nav bar. `pointer-events-none` since it's purely decorative
 *   and sits in front of the page content.
 *
 * UPDATE 3 (per your request — hide-on-scroll-down / reveal-on-scroll-up):
 * - Changed the outer `<header>` from `absolute` to `fixed` — a
 *   scroll-direction-driven show/hide only makes sense if the bar stays
 *   pinned to the viewport while scrolling; `absolute` would just let it
 *   scroll away with the page like ordinary content instead. Not from
 *   Framer data (its canvas has no scroll behavior to read), built to
 *   your description: a `scroll` listener (rAF-throttled) compares the
 *   new scroll position against the last one — scrolling down past a
 *   small threshold (24px, so it doesn't flicker on tiny touch-scroll
 *   jitter) slides the bar up out of view (`-translate-y-full`);
 *   scrolling up at all slides it back down; staying within the first
 *   24px of the page always shows it. Forced visible whenever the phone
 *   menu is open, so it can't hide itself out from under its own close
 *   button mid-interaction.
 */

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/blogs" },
];

// Phone menu only — confirmed via screenshot, not present in Desktop/Tablet.
const PHONE_ONLY_LINK = { label: "Home", href: "/" };

const CTA_LINK = { label: "Get in touch", href: "/contact" };

const PHONE_LINK_TEXT_COLOR = "rgb(255,255,255)"; // "/Primary text color" token

// Bug fix (not from Framer data): the primary items' hover pill turns
// white, so the light cream default text needs to switch to this dark
// token color on hover or it disappears against the white background —
// see MenuItem's UPDATE note. Per your clarification, this is
// `rgb(65, 19, 19)` / `#411313` — the OTHER duplicated "Primary text
// color" entry in Framer's color styles (globals.css's `--primary-text-
// color` token uses the other one, `rgb(83, 68, 62)`, for the rest of the
// site's body text — left untouched since only this hover state was
// flagged as wrong).
const PRIMARY_HOVER_TEXT_COLOR = "rgb(65, 19, 19)"; // "/Primary text color" token (#411313)

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SCROLL_HIDE_THRESHOLD = 24;

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(true);

  // Scroll lock — phone breakpoint only (md breakpoint = 768px, so lock
  // only applies at 767px and below), and only while the phone menu is
  // actually open.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const applyLock = () => {
      document.body.style.overflow = open && mediaQuery.matches ? "hidden" : "";
    };

    applyLock();
    mediaQuery.addEventListener("change", applyLock);

    return () => {
      mediaQuery.removeEventListener("change", applyLock);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Hide the bar on scroll-down, reveal it on scroll-up.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const evaluate = () => {
      const currentY = window.scrollY;

      if (currentY <= SCROLL_HIDE_THRESHOLD) {
        setBarVisible(true);
      } else if (currentY > lastY) {
        setBarVisible(false); // scrolling down
      } else if (currentY < lastY) {
        setBarVisible(true); // scrolling up
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluate);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:py-6 ">
      {/* Soft tan-to-transparent gradient behind the bar — always present
          with the nav bar, on every page (see UPDATE 2 above). Kept as a
          plain fixed sibling (NOT inside the transformed bar wrapper
          below) — an element with any `transform` becomes a containing
          block for its own `position: fixed` descendants, which would
          otherwise reposition this against the bar's small box instead
          of the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-2 h-[258px] opacity-90"
        style={{
          background:
            "linear-gradient(rgba(191, 170, 147, 0.5) 0%, rgba(148, 139, 129, 0) 100%)",
        }}
      />

      {/* The actual bar row(s) — this inner wrapper is what slides up/down
          on scroll (see UPDATE 3 above). Kept separate from the gradient
          above and the phone-menu overlay/panel below for the same
          containing-block reason: neither of those should move with the
          bar, and the phone panel in particular needs a real,
          untransformed ancestor chain to stay correctly viewport-fixed. */}
      <div
        className={[
          "transition-transform duration-300 ease-in-out",
          barVisible || open ? "translate-y-0" : "-translate-y-24",
        ].join(" ")}
      >
        {/* Desktop / Tablet */}
        <div className="mx-auto hidden w-full max-w-[1360px] items-center justify-between gap-2.5 px-8 py-1 md:flex lg:px-16">
          <BrandLogo variant="navbar" />
          <nav className="flex items-center gap-2 rounded-[10px] bg-[rgba(191,170,147,0.8)] p-1">
            {NAV_LINKS.map((link) => (
              <MenuItem
                key={link.href}
                href={link.href}
                variant="primary"
                textColor="rgb(252, 247, 237)"
                hoverBg="rgb(255, 255, 255)"
                hoverTextColor={PRIMARY_HOVER_TEXT_COLOR}
              >
                {link.label}
              </MenuItem>
            ))}
            <MenuItem
              href={CTA_LINK.href}
              variant="secondary"
              textColor="rgb(138, 109, 80)"
              hoverBg="rgb(252, 247, 237)"
            >
              {CTA_LINK.label}
            </MenuItem>
          </nav>
        </div>

        {/* Phone (closed state) */}
        <div className="flex items-center justify-between gap-2.5 px-6 py-6 md:hidden">
          <BrandLogo variant="navbar" width={53} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center rounded-lg bg-[rgba(65,19,19,0.84)] p-3 text-black"
          >
            <HamburgerIcon className="h-6 w-6 text-white " />
          </button>
        </div>
      </div>

      {/* Phone (open state) — slides in from the right */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="phone-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="phone-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="bg-green-accent fixed inset-y-0 right-0 z-50 flex w-full max-w-[390px] flex-col gap-6 p-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <BrandLogo variant="navbar" width={53} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center rounded-lg bg-[rgb(255,255,255)] p-3 text-black"
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col items-start gap-6 pt-4">
                {[PHONE_ONLY_LINK, ...NAV_LINKS].map((link) => (
                  <MenuItem
                    key={link.href}
                    href={link.href}
                    variant="phone"
                    textColor={PHONE_LINK_TEXT_COLOR}
                    fontSize="20px"
                    className="pl-2 text-h1-serif text-[48px] lg:text-[60px] text-left "
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </MenuItem>
                ))}
                <MenuItem
                  href={CTA_LINK.href}
                  variant="secondary"
                  textColor="rgb(138, 109, 80)"
                  hoverBg="rgb(252, 247, 237)"
                  fontSize="20px"
                  className="text-h1-serif text-[48px] lg:text-[60px] text-left "
                  onClick={() => setOpen(false)}
                >
                  {CTA_LINK.label}
                </MenuItem>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
