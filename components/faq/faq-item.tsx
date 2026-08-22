"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * FaqItem
 *
 * Source: Framer project "aiir-salon-claude", component "Faq Item"
 * (nodeId Q7xHNVSK3, in the "Components" folder), read via getNodeXml —
 * Closed came through directly; Open's nested content needed the nodeId
 * concatenation technique (direct reads of the Open variant kept
 * returning an empty self-closing node).
 *
 * CONFIRMED:
 * - Card: bg "/Secondary text color" (-> `bg-white`, the project's
 *   off-white token), borderRadius 12px (-> rounded-xl), padding 24px
 *   (-> p-6), gap 14px between the question row and the answer (only
 *   visible when open, since Closed has no second child).
 * - Question row: gap 24px (-> gap-6), text style "/Paragraph/Body 18"
 *   (-> `text-body-18`) for the question, flex-1 so it fills the row.
 * - Chevron button: 28x24 (-> w-7 h-6), borderRadius 1000px (effectively
 *   a pill -> rounded-full), background rgb(172,116,85) — a color not
 *   matching any existing project token, used as-is. Contains the same
 *   12x12 chevron SVG in both states
 *   (https://framerusercontent.com/images/OhumfgUHgpwyjoAftj3DACzba0.svg),
 *   rotation 0 when closed, rotation -180 when open — a straightforward
 *   flip animation.
 * - Hover state ("FAQ Closed · Hover" in your screenshot): Framer's
 *   third selected variant was the same Closed card at opacity 0.75 —
 *   which, rendered over a dark canvas, is exactly the grayish-tan tone
 *   your screenshot shows. Reproduced as `hover:opacity-75` on the whole
 *   card rather than a separate hover color.
 *
 * INFERRED:
 * - The Answer text node ("Write your Answer Here...") was never
 *   readable — every attempt (direct read, via parent, via nodeId
 *   concatenation) only ever returned the Question row, never a sibling
 *   answer node. Text style/color are a best guess from the screenshot:
 *   smaller and more muted than the question (`text-body-16` at reduced
 *   opacity), not confirmed from Framer data.
 * - Question/answer text color: unset in Framer's data (same pattern as
 *   TabButton/Button) — used the `primary-text` token.
 * - This is a single controlled item — a parent "FAQ list" component
 *   would own which item is open and pass `defaultOpen`/handle toggling
 *   for accordion-style (only-one-open) behavior; this component alone
 *   just toggles itself.
 *
 * UPDATE (requested, not from Framer data): the answer originally
 * mounted/unmounted with a plain `{open && ...}`, which snapped open and
 * closed instantly instead of animating. Replaced with `motion`'s
 * `AnimatePresence` + a `motion.div` animating `height`/`opacity` (`auto`
 * height is supported directly, no manual measuring needed) so the card
 * smoothly grows open and shrinks closed. Already a project dependency
 * (used elsewhere for nav-bar/testimonial), so nothing new was added.
 *
 * UPDATE 2 (per your instruction — site-wide fade-slide-in on first
 * scroll into view, not from Framer data): `reveal` goes on the inner
 * `p-6` div, not the outer card, since the outer card already owns
 * `transition-opacity duration-200 hover:opacity-75` — adding `reveal`'s
 * transition there would silently replace that hover timing (same class
 * of conflict documented in button.tsx).
 */

const CHEVRON_SRC =
  "https://framerusercontent.com/images/OhumfgUHgpwyjoAftj3DACzba0.svg";

type FaqItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white overflow-hidden rounded-xl transition-opacity duration-200 hover:opacity-75">
      <div className="reveal flex flex-col p-6">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-center gap-6 text-left"
        >
          <span className="text-body-18 text-primary-text flex-1">
            {question}
          </span>
          <span className="flex h-6 w-7 shrink-0 items-center justify-center rounded-full bg-[rgb(172,116,85)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHEVRON_SRC}
              alt=""
              className="h-3 w-3 transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <p className="text-body-16 text-primary-text/70 pt-[14px]">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
