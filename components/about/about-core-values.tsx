import { Atom, Butterfly, Clover, FlowerLotus } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Header } from "../header/header";
import { CoreValuesCard } from "../core-values-card/core-values-card";

/**
 * AboutCoreValuesSection
 *
 * Source: Framer project "aiir-salon-claude", About page, "CoreValues"
 * section (nodeId EJ2RHm3DU), read via getNodeXml on the About page's
 * Desktop node (NvA_e7aHR).
 *
 * CONFIRMED (from XML):
 * - Section bg "/Secondary BG" (-> `bg-secondary-bg`, rgb(192,170,147)),
 *   padding 140px top/bottom, Container maxWidth 1600px / padding
 *   "0 64px" / gap 64px, vertical stack, centered.
 * - Header instance (the same shared `Header` component used everywhere
 *   else on this page): eyebrow "CORE VALUES", line1 "What we,", line2
 *   "Believe in", textColor + eyebrowColor both the confirmed off-white
 *   rgb(252, 247, 237) -> `theme="dark"`.
 * - Below the header, a 3-column row (`position: sticky`, gap 24px): Col1
 *   and Col3 each stack 2 `CoreValuesCard` instances vertically (gap
 *   24px, each height 1fr so both fill the column evenly); Col2 is a
 *   single real image, 500px tall, 14px radius.
 * - The 4 real cards, confirmed titles + descriptions from custom props:
 *   Col1 top->bottom: "Creativity" / "Beauty is an art form. We encourage
 *   creativity, individuality and new ideas." then "Precision" / "Great
 *   results live in the details." Col3 top->bottom: "Care" / "Every
 *   client deserves to feel heard, comfortable and valued." then
 *   "Excellence" / "We continuously raise our standards, in our craft,
 *   our products and our experience."
 * - Real confirmed center image URL used directly.
 *
 * INFERRED:
 * - None of the 4 CoreValuesCard instances exposed an icon override in
 *   the XML (only title/description custom props came through), so the
 *   icons aren't in Framer's raw data — confirmed instead by zooming into
 *   screenshots of the live `/about` page: Creativity -> Atom, Precision
 *   -> Clover (4-petal shape), Care -> Butterfly, Excellence ->
 *   FlowerLotus (Phosphor's plain "Flower" icon was tried first but is a
 *   6-petal rounded cluster, not a match — FlowerLotus's simple 3-petal
 *   outline matches the live screenshot). All 4 are real Phosphor icons
 *   matching what's visible live; reused this project's existing
 *   @phosphor-icons/react dependency
 *   (Atom/Butterfly/Clover already used by the Home page's own CoreValues
 *   section) rather than adding anything new.
 * - "position: sticky" on the 3-column row plus 140px section padding is
 *   Framer's own scroll-pin effect (the image + row stay pinned while the
 *   page scrolls past). Used a plain `lg:sticky` utility for the same
 *   idea on desktop, without attempting to replicate the exact pin/
 *   release scroll math outside a design tool — flag if this needs a
 *   closer 1:1 scroll match once it's checked against real scroll
 *   behavior (only the static layout was verified this pass).
 * - No Tablet/Phone breakpoint was in Framer's data for this section, so
 *   the 3-column layout collapses to a single stacked column below `lg`
 *   (image first, then the left cards, then the right cards) as a
 *   reasonable default, matching the same responsive pattern already
 *   used in the Home page's CoreValues section.
 */

const IMAGE_SRC =
  "https://framerusercontent.com/images/6dvWtot2cR45sI2O7ZvHPszhnA.jpg";

const LEFT_CARDS = [
  {
    icon: Atom,
    title: "Creativity",
    description:
      "Beauty is an art form. We encourage creativity, individuality and new ideas.",
  },
  {
    icon: Clover,
    title: "Precision",
    description: "Great results live in the details.",
  },
];

const RIGHT_CARDS = [
  {
    icon: Butterfly,
    title: "Care",
    description:
      "Every client deserves to feel heard, comfortable and valued.",
  },
  {
    icon: FlowerLotus,
    title: "Excellence",
    description:
      "We continuously raise our standards, in our craft, our products and our experience.",
  },
];

export function AboutCoreValuesSection() {
  return (
    <section className="bg-secondary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-12 lg:gap-16">
        <Header
          theme="dark"
          textColor="rgb(252, 247, 237)"
          eyebrowColor="rgb(252, 247, 237)"
          eyebrow="CORE VALUES"
          line1="What we, Believe in"
          line2=""
        />

        <div className="flex w-full flex-col items-stretch gap-6 lg:sticky lg:top-24 lg:flex-row lg:gap-6">
          <div className="flex w-full flex-col gap-6 lg:flex-1">
            {LEFT_CARDS.map((card) => (
              <CoreValuesCard key={card.title} {...card} />
            ))}
          </div>

          <div className="relative order-first h-[300px] w-full shrink-0 overflow-hidden rounded-[14px] lg:order-none lg:h-[500px] lg:flex-1">
            <Image
              src={IMAGE_SRC}
              alt="Aiir Salon stylist washing a client's hair"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-6 lg:flex-1">
            {RIGHT_CARDS.map((card) => (
              <CoreValuesCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
