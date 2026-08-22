import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * Button
 *
 * REBUILT FROM SCRATCH (same reason as EyebrowText's rebuild): the
 * previous `variant="primary" | "secondary"` + single `textColor`
 * override kept picking colors internally (a hardcoded `hoverBgByVariant`
 * map, a `text-white` fallback when no `textColor` was passed) that
 * turned out wrong at several real call sites — most visibly the
 * "Discover Aiir" / "About Aiir Salon" / Services "Learn more" buttons,
 * which rendered white text on light backgrounds and were flagged but
 * never actually fixed under the old API. Framer's own component data
 * (nodeId XmxgwoN1v, read via getSelectedNodesXml across all 4 states)
 * has NEVER exposed a real default text/background color for this
 * component in any read this session — only the border (0.5px solid
 * "/White", confirmed identical on every state, so that stays fixed) and
 * shape/spacing are real data. So exactly like EyebrowText, this stops
 * guessing: `default` and `hover` are now REQUIRED props, each an
 * explicit `{ text, bg }` pair. Every call site sets its own real colors
 * for both states — no variant, no fallback, no silent default.
 *
 * CONFIRMED (shape/spacing, unchanged from the original read):
 * - borderRadius 8px (-> rounded-lg), border 0.5px solid "/White" on
 *   every state (kept fixed — this one WAS confirmed real data), padding
 *   "12px 24px" (-> px-6 py-3), gap 6px (-> gap-1.5). Text uses
 *   "/Paragraph/Body 16" (-> `text-body-16`).
 *
 * IMPLEMENTATION NOTE: colors are set as CSS custom properties via
 * inline `style` and consumed through Tailwind v4's arbitrary-value
 * selectors (`text-(color:--btn-text)`, `bg-(--btn-bg)`, and their
 * `hover:` counterparts) rather than a client-side `onMouseEnter` toggle
 * — keeps this a server component, and matches the `text-(--btn-text)`
 * pattern already used elsewhere in this project. `bg-(--var)` needs no
 * type hint (background is unambiguous); `text-(color:--var)` does,
 * since `text-` is ambiguous between font-size and color.
 *
 * UPDATE (bug fix — a `hover:scale-105` micro-interaction was added
 * alongside a second `transition-all ease-in-out`, while the base
 * classes still had `transition-colors duration-300`): two classes
 * setting `transition-property` (`transition-colors` vs `transition-all`)
 * fight over the same CSS property, and which one wins in the compiled
 * stylesheet depends on Tailwind's internal ordering, not the order
 * they're listed in this array. If `transition-colors` had won,
 * `transform` would never be in the transitioned property list and
 * `hover:scale-105` would snap instantly instead of easing in. Fixed by
 * keeping exactly one `transition-*` declaration (`transition-all
 * duration-300 ease-in-out`) that covers both the color swap and the
 * scale.
 */

type ButtonColorState = {
  text: string;
  bg: string;
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** Required — the button's resting-state text + background color. */
  default: ButtonColorState;
  /** Required — the button's color on hover. */
  hover: ButtonColorState;
  className?: string;
};

export function Button({
  href,
  children,
  default: defaultColors,
  hover: hoverColors,
  className,
}: ButtonProps) {
  const style = {
    "--btn-text": defaultColors.text,
    "--btn-bg": defaultColors.bg,
    "--btn-hover-text": hoverColors.text,
    "--btn-hover-bg": hoverColors.bg,
  } as CSSProperties;

  return (
    <Link
      href={href}
      style={style}
      className={[
        "text-body-16 inline-flex items-center justify-center gap-1.5 rounded-lg border-[0.5px] border-(--btn-bg) px-6 py-3",
        "transition-all duration-300 ease-in-out",
        "text-(color:--btn-text) bg-(--btn-bg)",
        "hover:scale-[102%] hover:text-(color:--btn-hover-text) hover:bg-(--btn-hover-bg)  hover:border-(--btn-hover-bg)",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
