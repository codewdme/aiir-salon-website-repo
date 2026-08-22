import type { Icon } from "@phosphor-icons/react";
import { Atom } from "@phosphor-icons/react/dist/ssr";

/**
 * CoreValuesCard
 *
 * Source: Framer project "aiir-salon-claude", component "core values
 * card" (nodeId nP34PLevI, in the "Components" folder — used inside the
 * separate "Core values" list component, QLuYCJUFl, which wasn't
 * selected/read), read via getNodeXml. Only one variant/state exists
 * ("Variant 1 · Primary") — came through in full.
 *
 * CONFIRMED:
 * - Card: 341.5x238px, backgroundColor "/White" (-> `bg-white`),
 *   borderRadius 14px, padding 24px, vertical stack, gap 16px between
 *   the icon and the text block.
 * - Icon: Framer's own "Atom" icon component, color rgb(192, 170, 147)
 *   — matches this project's "/Green Accent" token exactly (->
 *   `text-green-accent`), strokeWidth 1.5, ~32px. Reused this project's
 *   existing @phosphor-icons/react dependency (already used in Footer)
 *   rather than adding a new icon package — Phosphor ships an equivalent
 *   `Atom` icon, close to Framer's original shape.
 * - Text block: gap 8px. Title: "/Headings/H6" (-> `text-h6`). Description:
 *   "/Paragraph/Blog content" (-> a 16px Montserrat style; this project
 *   doesn't have a named `text-*` utility for that exact style yet, so
 *   its properties — 16px, line-height 1.6em, letter-spacing -0.02em —
 *   are applied inline via `text-body-16` which already matches these
 *   exact values).
 *
 * INFERRED:
 * - Neither text node had a color attribute — title uses `primary-text`
 *   (matches the dark brown in your screenshot); description uses
 *   `primary-text/70`, matching the established convention from
 *   MetricsCard's description text (same muted look).
 * - This card only has one Framer state, but it's clearly meant to
 *   repeat with different icon/title/description per "core value" (the
 *   separate "Core values" list component wasn't read) — built with
 *   `icon`, `title`, `description` props so it's ready to reuse; `icon`
 *   defaults to Atom (this instance's own icon) but accepts any
 *   `@phosphor-icons/react` icon component.
 *
 * UPDATE (once the "Core values" list component was actually read):
 * the confirmed 341.5px width is just this single instance's canvas
 * size — inside the real list it sits in a 2-column flex stack, so a
 * hardcoded width here would fight the `className` override at the
 * Tailwind-cascade level (two conflicting width utilities, order in the
 * generated stylesheet decides, not source order). Switched to `w-full`
 * so it always fills whatever width its parent gives it; pass a
 * `className` with an explicit width only for standalone usage.
 */

// UPDATE (per your instruction — site-wide fade-slide-in on first
// scroll into view, not from Framer data): `reveal` on the outer card.

type CoreValuesCardProps = {
  icon?: Icon;
  title: string;
  description: string;
  className?: string;
};

export function CoreValuesCard({
  icon: IconComponent = Atom,
  title,
  description,
  className,
}: CoreValuesCardProps) {
  return (
    <div
      className={[
        "reveal h-full flex w-full flex-col items-start gap-4 rounded-[14px] bg-white p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <IconComponent size={32} weight="regular" className="text-green-accent" />
      <div className="flex flex-col items-start gap-2">
        <h6 className="text-h6 text-primary-text">{title}</h6>
        <p className="text-body-16 text-primary-text/70">{description}</p>
      </div>
    </div>
  );
}
