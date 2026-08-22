import { Header } from "../header/header";

/**
 * AboutHeaderSection
 *
 * Source: Framer project "aiir-salon-claude", About page (nodeId
 * NvA_e7aHR), the "Header" section (nodeId Ou35JLvBV), read via
 * getSelectedNodesXml (you selected it directly on the canvas) — came
 * through in full.
 *
 * CONFIRMED:
 * - Full-width section, `height: 75vh`, real confirmed background image
 *   URL, a dark overlay (`rgba(83, 68, 62, 0.35)`, full-bleed, zIndex 1)
 *   sitting between the image and the content for legibility, content
 *   centered (both axes).
 * - Content is the already-built `Header` component (componentId
 *   Fcfj6tXXU — same shared component used on Home/Contact), this
 *   instance's real confirmed per-instance data: eyebrow "OUR STORY",
 *   line1 "Crafted with,", line2 "care", and BOTH the heading text color
 *   and eyebrow color confirmed as the same off-white
 *   (`rgb(252, 247, 237)`) — matches every other Header instance placed
 *   over a photo/video backdrop (Home's Hero, Services panel), so
 *   `theme="dark"` (white eyebrow + explicit `textColor` override to
 *   match the exact confirmed off-white rather than a plain `white`).
 *
 * UPDATE (bug fix, found by framer-nextjs-visual-verify against the live
 * `/about` page — which IS the real design, unlike the root `/` which
 * serves an unrelated "CoachBloom" placeholder): Header's `line2` is
 * hardcoded italic by default (true for every other confirmed instance
 * so far), but the live site renders this instance's "care" upright, not
 * italic. Passed `line2Italic={false}` to override just this call site
 * rather than changing Header's shared default.
 */

const HEADER_IMAGE =
  "https://framerusercontent.com/images/0EsRyw6O5VIlp7GbHxMmVlipXrE.png";

export function AboutHeaderSection() {
  return (
    <section className="relative flex h-[75vh] w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HEADER_IMAGE})` }}
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
          eyebrow="OUR STORY"
          line1="Crafted with Care"
          line2=""
          line2Italic={false}
        />
      </div>
    </section>
  );
}
