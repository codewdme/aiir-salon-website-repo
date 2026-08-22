import { Header } from "../header/header";

/**
 * ServicesHeroSection
 *
 * Source: Framer project "aiir-salon-claude", Services page Desktop node
 * (nodeId SxOi4dspa), read via getSelectedNodesXml (you selected it
 * directly on the canvas) — the page's "Header" section (nodeId
 * efqMmNBFa) came through in full.
 *
 * CONFIRMED:
 * - Full-width section, `height: 75vh`, real confirmed background image
 *   URL, a dark overlay (`rgba(83, 68, 62, 0.35)`, full-bleed, zIndex 1)
 *   between the image and the content, content centered (both axes) —
 *   the exact same pattern already confirmed for About's header section.
 * - Content is the shared `Header` component (componentId Fcfj6tXXU),
 *   this instance's real confirmed data: eyebrow "OUR SERVICES", line1
 *   "Experience", line2 "Aiir Signature Care", both textColor and
 *   eyebrowColor the same confirmed off-white (`rgb(252, 247, 237)`) —
 *   matches every other Header instance placed over a photo backdrop
 *   (Home's Hero, Services panel, About's own header), so `theme="dark"`.
 *
 * Only the Desktop breakpoint was read — Tablet/Phone height isn't
 * confirmed, kept the same `h-[75vh]` responsive default already used
 * elsewhere rather than guessing a fixed px value.
 */

const HERO_IMAGE =
  "https://framerusercontent.com/images/zHvepJGODMimd2nuFZTOOk6lE.png";

export function ServicesHeroSection() {
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
          eyebrow="OUR SERVICES"
          line1="Experience Aiir Signature Care"
          line2=""
        />
      </div>
    </section>
  );
}
