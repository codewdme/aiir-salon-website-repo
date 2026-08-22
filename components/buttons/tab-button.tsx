import type { ReactNode } from "react";

/**
 * TabButton
 *
 * Source: Framer project "aiir-salon-claude", component "Tab button"
 * (nodeId yAKyZywWQ, in the "Buttons" folder), read via
 * getSelectedNodesXml.
 *
 * CONFIRMED (from both variant states):
 * - Shape: borderRadius 8px (-> rounded-lg), padding "8px 16px" (->
 *   px-4 py-2), text uses the "/Paragraph/Eyebrow text" project text
 *   style (-> `text-eyebrow`).
 * - Selected state: backgroundColor "/Primary color" (-> `bg-primary`),
 *   white text.
 * - Unselected state: no backgroundColor set (transparent).
 *
 * INFERRED:
 * - Unselected text color wasn't explicitly set on the node (no color
 *   attribute on either variant's text child) — Framer's canvas preview
 *   showed it in a muted dark-red tone, which reads like the canvas's
 *   "unset/inherited color" placeholder rather than an intentional design
 *   color. Used the `primary-text` token (the project's default text
 *   color) instead of guessing that red — flag if the real design
 *   actually wants a distinct unselected color.
 * - No hover styling was present in Framer's static data for the
 *   unselected state; added a subtle tint on hover as a reasonable
 *   default for an interactive tab control.
 */

type TabButtonProps = {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export function TabButton({
  selected = false,
  onClick,
  children,
  className,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "text-eyebrow text-body rounded-lg px-2 py-2 transition-colors duration-200",
        selected
          ? "bg-primary text-white"
          : "text-body-12 hover:bg-primary/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
