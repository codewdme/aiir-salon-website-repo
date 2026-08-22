import type { ReactNode } from "react";

/**
 * MetricsCard
 *
 * Source: Framer project "aiir-salon-claude", component "Metrics card"
 * (nodeId O7q1aJlYi, in the "Components" folder), read via
 * getSelectedNodesXml — all 4 instances (Metrics1–4) came through in
 * full in one read.
 *
 * CONFIRMED:
 * - Card: 275x174.5px, borderRadius 14px, padding "24px 32px" (-> py-6
 *   px-8), vertical stack, gap 16px (unused visually here since the
 *   card only has one child block, but kept for parity with the source).
 * - Inner content block: gap 6px between the title and description.
 * - Title: "/Headings/H6" (-> `text-h6`, Italiana 22px — matches the
 *   italic-serif look in your screenshot).
 * - Description: "/Paragraph/Body 14" (-> `text-body-14`, centered,
 *   14px Montserrat) on Metrics1; Metrics2–4 set the same font
 *   (Montserrat regular) via a direct `font` override instead of the
 *   style path — functionally the same text, so all 4 use `text-body-14`
 *   here for consistency.
 * - Background alternates by source token — Metrics1/3 use
 *   "/Secondary text color", Metrics2/4 use "/White" — but both resolve
 *   to the exact same value (rgb(252, 247, 237)) in this project's
 *   ColorStyles, so there's no visual difference; used `bg-white`
 *   (already mapped to that value) uniformly rather than reproducing a
 *   distinction that doesn't actually show up.
 * - The 4-card row in your screenshot is page-level composition (a grid
 *   of 4 `MetricsCard` instances with their real copy), not a separate
 *   Framer "list" component — no such wrapper exists in the project's
 *   component list, so this file is just the single reusable card. The
 *   4 confirmed instances' copy is exported below as `METRICS_CARDS` for
 *   convenience when assembling that section.
 *
 * INFERRED:
 * - Neither title nor description had a color attribute in Framer's data
 *   (the familiar "unset color" pattern) — used `primary-text` for the
 *   title and `primary-text/70` for the description, matching the
 *   lighter/muted tone visible in your screenshot.
 */

// UPDATE (per your instruction — site-wide fade-slide-in on first
// scroll into view, not from Framer data): `reveal` on the outer card.

type MetricsCardProps = {
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

export function MetricsCard({
  title,
  description,
  className,
}: MetricsCardProps) {
  return (
    <div
      className={[
        "reveal flex w-[300px] lg:w-[275px] flex-col items-center justify-center gap-4 rounded-[14px] bg-[rgb(255,255,255)] px-8 py-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h6 className="text-h6 text-primary-text">{title}</h6>
        <p className="text-body-14 text-primary-text/70">{description}</p>
      </div>
    </div>
  );
}

export const METRICS_CARDS = [
  {
    title: "Personalized",
    description:
      "Every experience begins with understanding you, your preferences and your desired outcome.",
  },
  {
    title: "Professional",
    description:
      "Our team combines technical expertise, precision and an eye for detail.",
  },
  {
    title: "Premium",
    description:
      "We curate premium products and professional-grade treatments to elevate every service.",
  },
  {
    title: "Experience",
    description:
      "From the environment to the final reveal, every touchpoint is designed to make your visit memorable.",
  },
];
