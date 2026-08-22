import type { ReactNode } from "react";

/**
 * BlogTab
 *
 * Source: Framer project "aiir-salon-claude", component "Blog Tabs"
 * (nodeId ALmZSsLX4, in the "Components" folder — a distinct component
 * from the already-built `TabButton`/"Tab button", yAKyZywWQ, used on
 * the FAQ section: different padding, different text style, and
 * Unselected has a real fill here instead of being transparent), read
 * via getSelectedNodesXml (both states, Unselected/Selected, came
 * through in full).
 *
 * CONFIRMED:
 * - Shape: borderRadius 8px (-> rounded-lg), padding "8px 24px" (-> px-6
 *   py-2), text uses "/Paragraph/Body 14" (-> `text-body-14`).
 * - Unselected: backgroundColor "/Primary BG" (-> `bg-primary-bg`, the
 *   project's off-white token — not transparent, unlike TabButton).
 * - Selected: backgroundColor "/Primary color" (-> `bg-primary`).
 *
 * INFERRED:
 * - Neither state's text node had a color attribute — Unselected reads
 *   dark brown in your screenshot (used `primary-text`, this project's
 *   default body-text color); Selected reads white/off-white against the
 *   brown fill (used `text-white`).
 * - No hover styling exists in Framer's static data — added a subtle
 *   opacity fade on hover as a reasonable default for an interactive tab.
 */

type BlogTabProps = {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export function BlogTab({
  selected = false,
  onClick,
  children,
  className,
}: BlogTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "text-body-14 rounded-lg px-6 py-2 transition-opacity duration-200 hover:opacity-80",
        selected ? "bg-primary text-white" : "bg-primary-bg text-primary-text",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
