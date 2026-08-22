import { Atom, Butterfly, Clover, Drone } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { CoreValuesCard } from "../core-values-card/core-values-card";

/**
 * CoreValues
 *
 * Source: Framer project "aiir-salon-claude", component "Core values"
 * (nodeId QLuYCJUFl, in the "Components" folder), read via getNodeXml —
 * the one variant ("Variant 1 · Primary") came through in full, all 4
 * cards' real copy + icons + the center image included.
 *
 * CONFIRMED:
 * - Layout: 3 columns, gap 24px. Col1 and Col3 each stack 2
 *   `CoreValuesCard`s vertically (gap 24px). Col2 is a single portrait
 *   image, height 447.5px, borderRadius 14px, with a real image URL
 *   (unlike most images in this project so far, this one was actually
 *   present in Framer's data — used directly).
 * - The 4 cards, left-to-right/top-to-bottom as in your screenshot:
 *   Atom / "Holistic Well-Being", Drone / "Sustainable Growth" (Col1,
 *   top-to-bottom), Butterfly / "Self-Compassion", Clover / "Mindful
 *   Living" (Col3, top-to-bottom) — all real, confirmed copy. Icons are
 *   Framer's own Atom/Drone/Butterfly/Clover; reused this project's
 *   existing @phosphor-icons/react dependency (same icon names exist in
 *   Phosphor's set) rather than adding a new icon package.
 * - Reused the already-built `CoreValuesCard` component for all 4 tiles
 *   instead of re-declaring the card markup here.
 *
 * INFERRED:
 * - Framer's data only has this one (desktop) variant — no Tablet/Phone
 *   breakpoint was defined for this component at all, so the responsive
 *   behavior below is a reasonable default, not confirmed: the 3-column
 *   layout collapses to a single stacked column below `lg`, with the
 *   portrait image moving to the top. Adjust once a real narrow-width
 *   design exists for this section.
 */

const CARDS = [
  {
    icon: Atom,
    title: "Holistic Well-Being",
    description:
      "True wellness comes from creating balance across every aspect of life, not just physical health.",
  },
  {
    icon: Drone,
    title: "Sustainable Growth",
    description:
      "Progress is built through consistent, realistic actions that support long-term well-being and success.",
  },
  {
    icon: Butterfly,
    title: "Self-Compassion",
    description:
      "Growth thrives when we replace self-criticism with understanding, acceptance, and care.",
  },
  {
    icon: Clover,
    title: "Mindful Living",
    description:
      "Awareness helps us make intentional choices that align with our values, health, and happiness.",
  },
];

const IMAGE_SRC =
  "https://framerusercontent.com/images/UwIS5ts9TjeVf0cJctXU1DFEf8.png";

export function CoreValues() {
  const [card1, card2, card3, card4] = CARDS;

  return (
    <div className="mx-auto flex w-full max-w-[1072px] flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-6">
      <div className="relative order-1 h-[300px] w-full shrink-0 overflow-hidden rounded-[14px] lg:order-2 lg:h-auto lg:w-auto lg:flex-1">
        <Image
          src={IMAGE_SRC}
          alt="A woman smiling outdoors, embodying Aiir Salon's core values"
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="order-2 flex flex-1 flex-col gap-6 lg:order-1">
        <CoreValuesCard {...card1} />
        <CoreValuesCard {...card2} />
      </div>

      <div className="order-3 flex flex-1 flex-col gap-6">
        <CoreValuesCard {...card3} />
        <CoreValuesCard {...card4} />
      </div>
    </div>
  );
}
