import type { ReactNode } from "react";

/**
 * ServiceInfoTag
 *
 * Source: Framer project "aiir-salon-claude", component "Service info"
 * (nodeId rPwm8y07U, in the "Components" folder), read via
 * getSelectedNodesXml — the one variant/state came through in full.
 *
 * CONFIRMED:
 * - Row: width 333px (used as a max-width cap, not fixed, so it still
 *   shrinks), justify-between, items-center.
 * - Left group: gap 4px — a 16x16 icon ("SelectionAll" in Framer, color
 *   rgb(252, 247, 237) — matches this project's "/White" token exactly)
 *   + a "Category" label ("/Paragraph/Body 16"). Both "Category" and
 *   "Hair cutting" are placeholder content in Framer's data (a literal
 *   category-name placeholder and a generic example service), not real
 *   copy — this component takes them via `category`/`service` props.
 * - Right: a label using a literal font override ("Rethink Sans",
 *   weight 500) instead of a project text style.
 *
 * INFERRED:
 * - Rethink Sans isn't a font this project uses anywhere else (only
 *   Italiana for headings and Montserrat for everything else, per your
 *   instruction to standardize on just those two) — used Montserrat at
 *   weight 500 here instead of adding a 3rd family.
 * - Neither text node had a color attribute, but the icon's color
 *   (`/White`) strongly suggests this tag is meant to sit on a colored/
 *   dark surface (e.g. a Service Card) — used white for both labels to
 *   match the icon rather than this project's default dark `primary-text`.
 * - The "SelectionAll" icon's exact shape isn't in Framer's readable
 *   data (icon nodes only expose a fill color + stroke width) and
 *   doesn't have an obvious 1:1 match in the @phosphor-icons/react set
 *   already used elsewhere — drawn here as a simple inline checkmark-in-
 *   circle SVG at the confirmed 16x16 size, consistent with this
 *   project's existing hand-drawn-icon pattern (nav-bar, ReadMore).
 */

function SelectionIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.5 8L7.25 9.75L10.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ServiceInfoTagProps = {
  category: ReactNode;
  service: ReactNode;
  className?: string;
};

export function ServiceInfoTag({
  category,
  service,
  className,
}: ServiceInfoTagProps) {
  return (
    <div
      className={["flex w-full max-w-[333px] items-center justify-between gap-2.5", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-1 text-white">
        <SelectionIcon className="h-4 w-4" />
        <span className="text-body-16">{category}</span>
      </div>
      <span className="font-montserrat text-body-16 font-medium text-white">
        {service}
      </span>
    </div>
  );
}
