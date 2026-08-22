import type { ReactNode } from "react";

/**
 * EyebrowText
 *
 * REBUILT FROM SCRATCH (previous version kept guessing colors internally
 * off the variant name — e.g. "center-dark" -> assumed tan, "center-light"
 * -> assumed white — which was never confirmed by Framer's data and kept
 * producing invisible/wrong-color bugs at different call sites. Framer's
 * `getSelectedNodesXml` read of this component (nodeId oqhUbpEF_, all 3
 * variants: `TextCenterDark`/ATSb8A0gf, `TextLeft`/ri6BWDU1D,
 * `TextCenterLight`/erq0deAkF) confirms — again — that NEITHER the line
 * Frames nor the text node expose a color attribute in ANY variant, in
 * this or any earlier read. Framer genuinely never carries this
 * component's color as data. So this rebuild stops guessing entirely:
 * `textColor` is now a REQUIRED prop with no internal default, and
 * `variant` controls ONLY layout (line count/position), never color.
 * Every call site now passes its own real color explicitly from the top,
 * matching what's actually confirmed for that specific placement (a
 * Header's own theme logic, a section's own confirmed text color, etc.)
 * instead of this component silently picking one.
 *
 * CONFIRMED (structure, from the same read):
 * - Horizontal stack, gap 10px, centered, wrapping one line of
 *   `/Paragraph/Eyebrow text` (-> `text-eyebrow`, Instrument Sans 500,
 *   14px, already defined in globals.css).
 * - "center" variant (covers both `TextCenterDark` and `TextCenterLight`
 *   — those two only ever differed by an unconfirmed color, never
 *   structure): a 120x2px rounded-pill line BEFORE the text, and the
 *   same line rotated 180° AFTER it.
 * - "left" variant: only the trailing line (rotated 180°) — no leading
 *   line at all, confirmed absent from Framer's data again, not just
 *   empty.
 * - Both lines fade toward their outer edge in every reference
 *   screenshot seen for this component (not a flat fill) — reproduced as
 *   a `linear-gradient` from the given color (solid, nearest the text)
 *   to transparent (outer edge), same as before, since Framer's plain
 *   `backgroundColor` attribute still can't carry a gradient and nothing
 *   in this read exposed one.
 *
 * UPDATE (bug fix, you reported the whole page panning left/right on
 * phone): the two divider lines were `w-[120px] shrink-0` — a hard
 * fixed width flexbox was never allowed to shrink. This component sits
 * centered inside every section that uses it, so on narrow phone
 * widths `120px + 120px + gaps + the eyebrow text` routinely exceeded
 * the available width, which doesn't just clip the lines — it widens
 * the whole document past the viewport, and mobile browsers respond by
 * letting the ENTIRE page pan horizontally (confirmed by simulating a
 * real 371px-wide viewport: these two spans were the only elements
 * actually escaping the visible width). Changed `shrink-0` to `min-w-0
 * flex-1` with `max-w-[120px]` on each line, so they still reach
 * Framer's confirmed 120px on desktop/tablet where there's room, but
 * now shrink together with the layout instead of forcing an overflow
 * when there isn't.
 *
 * UPDATE (per your instruction — fade-slide-in on first scroll into
 * view, applied site-wide via the shared `reveal` className +
 * `RevealObserver`, not from Framer data): added `reveal` to the outer
 * row. No competing `transition`/`transform` exists on this element, so
 * it's safe to add directly without the kind of transition-conflict
 * bug already documented in `button.tsx`.
 */

type EyebrowTextVariant = "center" | "left";

type EyebrowTextProps = {
  children: ReactNode;
  variant?: EyebrowTextVariant;
  /** Required — this component never guesses its own color. Pass the
   *  real color for wherever you're placing it. */
  textColor: string;
  /** Optional — defaults to `textColor` when the lines should match the
   *  text exactly (the common case). Override only if a placement's
   *  lines are confirmed to differ from the text color. */
  lineColor?: string;
  className?: string;
};

function Divider({
  color,
  fadeFrom,
}: {
  color: string;
  fadeFrom: "start" | "end";
}) {
  return (
    <span
      aria-hidden="true"
      className="h-[2px] w-[120px] min-w-0 max-w-[120px] flex-1 rounded-full"
      style={{
        background:
          fadeFrom === "start"
            ? `linear-gradient(to right, transparent, ${color})`
            : `linear-gradient(to right, ${color}, transparent)`,
      }}
    />
  );
}

export function EyebrowText({
  children,
  variant = "center",
  textColor,
  lineColor,
  className,
}: EyebrowTextProps) {
  const resolvedLineColor = lineColor ?? textColor;

  return (
    <div
      className={["reveal flex items-center justify-center gap-2.5", className]
        .filter(Boolean)
        .join(" ")}
    >
      {variant === "center" && (
        <Divider color={resolvedLineColor} fadeFrom="start" />
      )}
      <span className="text-eyebrow shrink-0" style={{ color: textColor }}>
        {children}
      </span>
      <Divider color={resolvedLineColor} fadeFrom="end" />
    </div>
  );
}
