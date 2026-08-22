"use client";

import { useState } from "react";
import { TabButton } from "../buttons/tab-button";
import { FaqItem } from "./faq-item";

/**
 * FaqList
 *
 * Source: Framer project "aiir-salon-claude", component "FAQ list"
 * (nodeId aunrI7I1o, in the "Components" folder), read via
 * getSelectedNodesXml — Desktop states came through in full; Phone
 * states hit Framer's character limit and needed a follow-up
 * nodeId-concatenation read for the tab bar (its list of FaqItems below
 * wasn't re-confirmed at phone width, but reuses the same FaqItem
 * component already built, so it's structurally the same).
 *
 * CONFIRMED:
 * - One FaqList = 3 category tabs (General / Customer Service /
 *   Booking & Payment) driving which set of FaqItem rows is shown below
 *   — a single active-tab selector, not 3 separate panels. Reused the
 *   already-built `TabButton` (selected/unselected) for the tabs and
 *   `FaqItem` for each row.
 * - Tab bar ("Stack"): background rgb(247,247,247) — a light-gray not
 *   matching any existing project token (used as-is), borderRadius 4px,
 *   gap 16px (-> gap-4). Desktop padding 4px all sides (-> p-1); Phone
 *   padding "8px 4px" (-> px-1 py-2) with the row wrapping onto 2 lines
 *   at narrow widths (stackWrap="true" in Framer's Phone variant, only
 *   present there — not on Desktop).
 * - Gap between the tab bar and the FAQ rows: 40px (-> gap-10). Gap
 *   between FAQ rows: 12px (-> gap-3, matches FaqItem's own list usage).
 * - Desktop panel width: 703px — used as a max-width cap, not a fixed
 *   width, so it still shrinks correctly on smaller screens.
 *
 * Content: the real Framer instances contained placeholder copy from a
 * different, unrelated project (a coaching business's FAQ text) rather
 * than anything about Aiir Salon — per your instruction, replaced with
 * generic salon-appropriate stock questions/answers instead of importing
 * that unrelated content. Swap `CATEGORIES` below for the real copy
 * whenever it's ready.
 */

type FaqCategory = {
  label: string;
  items: { question: string; answer: string }[];
};

const CATEGORIES: FaqCategory[] = [
  {
    label: "General",
    items: [
      {
        question: "What services do you offer?",
        answer:
          "Hair, beauty, nails, and grooming — everything under one roof. Browse the full menu on our Services page, or ask us for a recommendation when you book.",
      },
      {
        question: "Do I need to book an appointment in advance?",
        answer:
          "We recommend booking ahead, especially for weekends and peak hours. Walk-ins are welcome when a slot is open, but a reservation guarantees your preferred time.",
      },
      {
        question: "Who are your services suited for?",
        answer:
          "Anyone looking for a relaxed, elevated salon experience — whether it's a quick touch-up or a full styling session, our team tailors each visit to you.",
      },
      {
        question: "How long does a typical appointment take?",
        answer:
          "It depends on the service — a simple trim can take 30 minutes, while color or a full beauty session may run longer. We'll give you a time estimate when you book.",
      },
    ],
  },
  {
    label: "Customer Service",
    items: [
      {
        question: "How do I get in touch?",
        answer:
          "Call or WhatsApp us at +91 97113 19369, or drop by the salon in East Patel Nagar, New Delhi. We're happy to answer questions before you book.",
      },
      {
        question: "What if I need to reschedule?",
        answer:
          "Just give us a call or message as early as you can. We'll do our best to find another slot that works for you.",
      },
      {
        question: "What if I'm not happy with my service?",
        answer:
          "Let us know right away — your satisfaction matters to us, and we'll make it right, whether that's a touch-up or a conversation about what went wrong.",
      },
      {
        question: "Do you offer referrals or recommendations?",
        answer:
          "Absolutely — our stylists are happy to recommend the right service or specialist for your hair, skin, or nail needs.",
      },
    ],
  },
  {
    label: "Booking & Payment",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Book directly through our contact page, or call/WhatsApp us at +91 97113 19369. We'll confirm your slot and any details you need to know.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, all major cards, and UPI. Payment is due at the end of your visit.",
      },
      {
        question: "Do you offer packages or memberships?",
        answer:
          "Yes — ask our team about current packages and membership options when you visit or book, as offers can change seasonally.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "We ask for at least a few hours' notice if you need to cancel or reschedule, so we can offer the slot to someone else.",
      },
    ],
  },
];

export function FaqList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = CATEGORIES[activeIndex];

  return (
    <div className="mx-auto flex w-full max-w-[703px] flex-col items-center gap-10">
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-[4px] bg-[rgb(247,247,247)] px-1 py-2 md:p-1">
        {CATEGORIES.map((category, index) => (
          <TabButton
            key={category.label}
            selected={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {category.label}
          </TabButton>
        ))}
      </div>

      <div className="flex w-full flex-col gap-3">
        {activeCategory.items.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
