import { Header } from "../header/header";

/**
 * BlogsHero
 *
 * New file, created only for the blogs listing page — does not modify
 * any other page/component.
 *
 * Source: live Framer-hosted site (https://aiirsalon.framer.website/blogs
 * — the real published route; the NavBar's "Journal" label links here,
 * not to `/journal`, confirmed against `components/nav-bar/nav-bar.tsx`'s
 * existing `{ label: "Journal", href: "/blogs" }` entry). The Framer
 * canvas's own "Blogs" page node wasn't reachable via a direct
 * `getSelectedNodesXml` read this session, so this hero was read
 * directly off the live site instead — same fallback already used
 * elsewhere in this project when a node read isn't available.
 *
 * CONFIRMED (from the live page + a DOM check for the overlay's real
 * computed background-color):
 * - Full-width section, background photo, a dark overlay
 *   `rgba(83, 68, 62, 0.35)` — the EXACT same overlay color already
 *   confirmed and used on the Services/About hero sections, so this
 *   reuses that established pattern rather than guessing a new one.
 * - Content is the shared `Header` component: eyebrow "JOURNAL", line1
 *   "Stories, insights,", line2 "and slow truths" (renders in `Header`'s
 *   default italic serif treatment), both textColor/eyebrowColor the
 *   confirmed off-white (`rgb(252, 247, 237)`).
 *
 * INFERRED:
 * - Exact section height wasn't checked pixel-for-pixel against the live
 *   site (no Framer node data to confirm it) — used the same `h-[75vh]`
 *   already confirmed for Services/About, since the live screenshot's
 *   proportions look consistent with that.
 */

const HERO_IMAGE =
  "https://framerusercontent.com/images/EGgrVcRVQLMdAPTkAFN1rteKM.png";

export function BlogsHero() {
  return (
    <section className="relative flex h-[75vh] w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(83, 68, 62, 0.35)" }}
      />

      <div className="relative z-[2] flex w-full justify-center px-6 md:px-8 lg:px-16">
        <Header
          theme="dark"
          textColor="rgb(252, 247, 237)"
          eyebrowColor="rgb(252, 247, 237)"
          eyebrow="JOURNAL"
          line1="Stories, insights, and slow truths"
          line2=""
        />
      </div>
    </section>
  );
}
