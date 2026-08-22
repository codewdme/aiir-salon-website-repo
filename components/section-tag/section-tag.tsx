import type { ReactNode } from "react";

/**
 * SectionTag
 *
 * Source: Framer project "aiir-salon-claude", component "Section tag"
 * (nodeId cXby8nx3l, in the "Components" folder), read via
 * getSelectedNodesXml — only one variant/state exists ("Variant 1"),
 * came through in full.
 *
 * CONFIRMED:
 * - Structure: a single text label, vertical padding "5px 0" (-> py-1),
 *   gap 6px (unused visually — only one child in Framer's data, kept
 *   for parity in case a future variant adds a second element).
 * - Text: "/Headings/H6" (-> `text-h6`). The placeholder content in
 *   Framer's data was literally "Section Tag / Title" (an unfilled
 *   template label, not real copy) — this component takes its text via
 *   `children` rather than hardcoding that placeholder.
 *
 * INFERRED:
 * - No color attribute was set on the text node — used `primary-text`,
 *   this project's default text color, consistent with how every other
 *   "unset color" text node has been handled elsewhere in this project.
 */

type SectionTagProps = {
  children: ReactNode;
  className?: string;
};

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <span
      className={["text-h6 text-primary-text py-1", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
