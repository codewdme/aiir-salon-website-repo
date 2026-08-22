import Link from "next/link";

/**
 * ReadMore
 *
 * Source: Framer project "aiir-salon-claude", component "Read more"
 * (nodeId ZT2Cj2rbK, in the "Buttons" folder), read via
 * getSelectedNodesXml (all 4 states: Light default/hover, Dark
 * default/hover).
 *
 * CONFIRMED:
 * - Shape: "Read more" text ("/Paragraph/Body 16" -> `text-body-16`) +
 *   an outward-arrow icon (18x19), gap 8px (-> gap-2), horizontal,
 *   centered.
 * - Light variant color: rgb(252, 247, 237) on both default and hover —
 *   matches this project's `white` token exactly (-> `text-white`).
 * - Dark variant color: rgb(138, 109, 80) default, dropping to
 *   rgba(138, 109, 80, 0.75) on hover — matches the `primary` token
 *   exactly (-> `text-primary`), with a confirmed opacity-75 hover fade.
 *
 * INFERRED:
 * - Light variant's hover state read back the exact same solid color as
 *   its default (no opacity/hue change captured in the static data) —
 *   unlike Dark, which clearly fades to 75% opacity on hover. Applied
 *   the same opacity-75 hover fade to Light too, on the assumption this
 *   is one shared hover treatment for the component rather than Light
 *   genuinely having no hover feedback at all. Worth a live check.
 * - The arrow's path isn't in Framer's data (icon nodes only expose a
 *   fill color) — drawn as a simple 45°-outward arrow at the confirmed
 *   18x19 size.
 */

function ArrowOutwardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 19" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 13.5L13 5.5M13 5.5H6.5M13 5.5V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ReadMoreProps = {
  href: string;
  variant?: "light" | "dark";
  className?: string;
};

const colorByVariant: Record<NonNullable<ReadMoreProps["variant"]>, string> =
  {
    light: "text-white",
    dark: "text-primary",
  };

export function ReadMore({
  href,
  variant = "light",
  className,
}: ReadMoreProps) {
  return (
    <Link
      href={href}
      className={[
        "w-fit hover:border  hover:border-[rgb(65, 19, 19)] bg-[rgb(65, 19, 19)] hover:text-[rgb(65, 19, 19] px-3 py-2 rounded-lg text-body-16 inline-flex items-center gap-2 transition-opacity duration-200 opacity-80 hover:opacity-100",
        colorByVariant[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Read more
      <ArrowOutwardIcon className="h-[19px] w-[18px]" />
    </Link>
  );
}
