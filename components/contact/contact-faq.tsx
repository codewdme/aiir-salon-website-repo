"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../buttons/button";
import { TabButton } from "../buttons/tab-button";
import { FaqItem } from "../faq/faq-item";
import { Header } from "../header/header";

/**
 * ContactFaq
 *
 * Source: Framer project "aiir-salon-claude", Contact page Desktop node
 * (nodeId afN_GnEcN), the "FaQs" section (nodeId mFpKCqZfV), read via
 * getSelectedNodesXml.
 *
 * CONFIRMED:
 * - Section: backgroundColor "/Secondary BG", padding "140px 0",
 *   Container maxWidth 1600px, padding "0 64px", gap 64px.
 * - Uses the already-built `Header` (theme="light" -> Framer's
 *   "DesktopTabletLight" variant), eyebrow "FAQS", heading "Your
 *   questions," / "Our answers".
 * - Below the heading: a sticky left column (image + a small "Need more
 *   help?" contact card) and a FAQ list on the right, gap 32px.
 * - Sticky image: 280px tall, borderRadius 14px, real confirmed URL.
 * - "Need more help?" card: backgroundColor "/White", borderRadius 14px,
 *   padding 16px, gap 32px. Title "/Headings/H6", body
 *   "/Paragraph/Body 14", real confirmed copy. Uses the already-built
 *   `Button` (variant "secondary" per the same nodeId mapping confirmed
 *   for Gallery's button) linking to "/contact".
 * - Tab row uses 3 real confirmed labels: "General", "Services",
 *   "Booking & Payment" — via the already-built `TabButton`.
 * - The "General" tab's 4 real FAQ items came through in full (real
 *   questions/answers, specific to Aiir Salon) — uses the already-built
 *   `FaqItem`.
 *
 * INFERRED:
 * - Framer's static data only ever shows whichever tab is currently
 *   active on the canvas, so only "General"'s content was readable —
 *   "Services" and "Booking & Payment" have no real content anywhere in
 *   Framer's data. Per this project's established precedent (FaqList
 *   used stock content for its own unrelated-placeholder situation),
 *   filled these two tabs with generic salon-appropriate stock Q&A
 *   rather than leaving them empty — swap for real copy once it exists.
 * - `Button`'s confirmed instance prop again suggested a white
 *   `textColor`, which would be invisible on its own white fill — same
 *   conflict as Gallery's button, resolved the same way (default dark
 *   text, matching what's actually visible in your screenshot).
 */

type FaqEntry = { question: string; answer: string };

const GENERAL_FAQS: FaqEntry[] = [
  {
    question: "What services does Aiir Salon offer?",
    answer:
      "We offer bespoke hair, skin and beauty treatments — from precision cuts and colour to hair botox and facials — tailored to your natural features and lifestyle.",
  },
  {
    question: "Where is Aiir Salon located?",
    answer: "Aiir Salon is located in East Patel Nagar, New Delhi.",
  },
  {
    question: "Do I need an appointment?",
    answer:
      "Appointments are recommended to ensure your preferred professional, service and time are available. Walk-ins may be accommodated subject to availability.",
  },
  {
    question: "How do I know which hair service is right for me?",
    answer:
      "Every transformation begins with a consultation. Our professionals assess your hair, understand your preferences and recommend a suitable service.",
  },
];

// No real content exists in Framer's data for these two tabs — stock
// placeholder, matching this project's established fallback for
// unfilled Framer content (see FaqList).
const SERVICES_FAQS: FaqEntry[] = [
  {
    question: "How long does a typical service take?",
    answer:
      "It depends on the service — a simple trim can take 30 minutes, while colour or a full styling session may run longer. We'll give you a time estimate when you book.",
  },
  {
    question: "Do you offer packages or memberships?",
    answer:
      "Yes — ask our team about current packages and membership options when you visit or book, as offers can change seasonally.",
  },
  {
    question: "Can I request a specific stylist?",
    answer:
      "Absolutely — let us know your preference when booking and we'll do our best to accommodate it, subject to availability.",
  },
];

const BOOKING_FAQS: FaqEntry[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "Book directly through our contact page, or call/WhatsApp us at +91 97113 19369. We'll confirm your slot and any details you need to know.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major cards, and UPI. Payment is due at the end of your visit.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask for at least a few hours' notice if you need to cancel or reschedule, so we can offer the slot to someone else.",
  },
];

const TABS = [
  { label: "General", items: GENERAL_FAQS },
  { label: "Services", items: SERVICES_FAQS },
  { label: "Booking & Payment", items: BOOKING_FAQS },
];

const SIDEBAR_IMAGE =
  "https://framerusercontent.com/images/qnPbtyeGJb4GRMY6yYQJl5Bazfs.jpg";

export function ContactFaq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TABS[activeIndex];

  return (
    <section className="bg-secondary-bg w-full px-6 py-24 md:px-8 lg:px-16 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-12 lg:gap-16">
        <Header theme="dark" eyebrow="FAQS" line1="Your questions, Our answers" line2=""  />

        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start">
          <div className="top-16 flex w-full flex-col gap-4 lg:sticky lg:w-[33%] lg:shrink-0">
            <div className="relative h-[280px] w-full overflow-hidden rounded-[14px]">
              <Image
                src={SIDEBAR_IMAGE}
                alt="Aiir Salon interior"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-8 rounded-[14px] bg-white p-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-h6 text-primary-text">Need more help?</h6>
                <p className="text-left text-body-16 text-primary-text/70">
                  We are here to answer your Questions. We normally answer in
                  24 hours time
                </p>
              </div>
              <Button
                href="/contact"
                default={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
                hover={{ text: "rgb(255, 255, 255)", bg: "rgb(65,19,19)" }}
              >
                Contact us
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3 lg:w-[66%]">
            <div className="lg:w-1/2 w-full flex items-center justify-between rounded-[8px] bg-[rgb(247,247,247)] px-2 py-2">
              {TABS.map((tab, index) => (
                <TabButton
                  key={tab.label}
                  selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  {tab.label}
                </TabButton>
              ))}
            </div>
            <div className="flex w-full flex-col gap-3">
              {active.items.map((item) => (
                <FaqItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
