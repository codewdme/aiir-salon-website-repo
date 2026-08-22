"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

/**
 * Testimonial
 *
 * Source: Framer project "aiir-salon-claude", component "Testimonial"
 * (nodeId Ku27VONWV, in the "Sections"/main canvas), read via
 * getSelectedNodesXml for Client1 (came through in full) and then
 * getNodeXml with the nodeId-concatenation technique (Client2/3/4's
 * nodeId + Client1's leaf nodeIds, e.g. "TJp5gT1QAjFRPWUuWk") for
 * Client2–4's quote/name text, since Framer's character limit truncated
 * them on the first pass and direct reads on those nodeIds alone came
 * back empty (they're non-primary variants).
 *
 * CONFIRMED (Desktop, Client1–4, all 4 identical in structure):
 * - Card ("Stack"): backgroundColor rgb(247, 247, 247) — not a project
 *   token, used as-is; borderRadius 8px; padding 46px; vertical stack,
 *   gap 10px.
 * - Decorative quotation-mark SVG: 141x135 box, path fill "#875C3C"
 *   fill-opacity 0.2 (used inline, verbatim).
 * - Quote text: inlineTextStyle "/Headings/H4 Italics" (-> text-h4-italic).
 * - Name prefix: a 40x1px Frame, backgroundColor "/Primary text color",
 *   borderRadius 20px (-> bg-primary-text rounded-full), directly before
 *   the name text.
 * - Name text: inlineTextStyle "/Headings/H4" (-> text-h4).
 * - Arrow buttons (component LUERLp4GL): 64x64, borderRadius 12px,
 *   backgroundColor rgb(218, 222, 198) — not a project token, used as-is.
 *   Left variant (lU0Ak7zsI): opacity 0.5. Right variant (KkjeFXHiI): no
 *   opacity override (1.0). This asymmetry is confirmed straight from
 *   Framer's data — preserved even though its cause (e.g. a "no more
 *   previous" affordance) isn't stated anywhere in the project.
 * - Client quote/name text, verbatim from Framer:
 *   1. Yashika Narula — hair colour compliment.
 *   2. Ananyaaa — nails done by "Jyoti".
 *   3. Nanki Ahuja — general service compliment.
 *   4. Vidhushi — attentive staff / results compliment.
 * - Phone card ("Phone1" variant, via nodeId concatenation): bg
 *   rgb(247, 247, 247), borderRadius 14px, padding 24px, gap 32px;
 *   ImageClients instance there is full-width, height 350px (i.e. image
 *   sits above the text on phone, not beside it).
 * - Text styles at phone width (from your screenshots): quote ->
 *   "/Paragraph/Body 16" (text-body-16), name -> "/Paragraph/Body 18"
 *   (text-body-18) — smaller than Desktop's H4 styles.
 *
 * INFERRED:
 * - Client photos: Framer's own "ImageClients" sub-component never had
 *   real photo URLs anywhere in its data (every client instance
 *   referenced the same placeholder image asset) — per your call, using
 *   the 4 real client photos you sent instead, one per named client
 *   (matched by filename: yashikanaruka -> Yashika Narula, ananyaaa ->
 *   Ananyaaa [nail photo, matches her "Jyoti did my nails" quote],
 *   nanki -> Nanki Ahuja, vidhusi -> Vidhushi). Framer's own image node
 *   was 300x573 — a tall stacked-photo composite (see next point) — not
 *   a usable single-photo aspect ratio, so the photo area here uses a
 *   4:5 portrait crop (object-cover) sized to look right in the card
 *   instead of reproducing that exact box.
 * - Framer's design literally repeats a 5-photo image stack per client
 *   (a marquee-style scroll of thumbnails) with a Normal/Grayscale pair
 *   per photo (componentId zPE8GIUxU) for the "in focus vs tinted" look.
 *   Per your explicit choice, this was simplified to one photo per
 *   client: on change, the leaving photo tints toward black and drifts
 *   up/out, the entering photo drifts up/in from below and un-tints into
 *   focus — matches your description's visual result with far less
 *   moving-part complexity to maintain.
 * - Interaction (arrows + timing + phone slide) was specified directly by
 *   you, not read from Framer (Framer's data is static): "testimonial
 *   changes every 5 seconds automatically, also changes when clicked the
 *   arrow button... testimonial text rolls out and new roll in, in sync
 *   with that the image stack, image in focus is coloured else an
 *   overlay of black tint comes on top of it. also the images move
 *   upwards and downwards like a scroll. in phone view component images
 *   slide left or right and so does the testimonial text when changing."
 *   Implemented as: desktop/tablet = crossfade + vertical drift (both
 *   photo and text move together, one direction per step so it always
 *   reads as a continuous "reel"); phone (<md) = the same crossfade but
 *   with horizontal drift instead of vertical, per your explicit call-out
 *   for phone. Auto-advance runs on a 5s interval and resets its timer on
 *   every manual arrow click, so a manual click never fights the next
 *   automatic tick.
 * - The real icon component inside the Arrow button (nodeId yEL3y7Hg4)
 *   returned "Node with ID yEL3y7Hg4 not found" on every attempt — drawn
 *   here as a simple inline chevron/arrow SVG at the confirmed 24x24 size
 *   from the Arrow component's icon slot, consistent with the hand-drawn
 *   icon pattern already used elsewhere (nav-bar, ReadMore).
 * - Card max-width isn't given anywhere in Framer's data (its canvas
 *   width, 1089px per client frame, is an arbitrary artboard size) — used
 *   max-w-[900px] as a reasonable content width; adjust once this sits in
 *   the real page layout.
 */

type TestimonialData = {
  name: string;
  quote: string;
  image: string;
};

const TESTIMONIALS: TestimonialData[] = [
  {
    name: "Yashika Narula",
    quote:
      "Very good experience 🩷 I got my hair colour done and it's so pretty! Must visit, staff here is also very cooperative.",
    image: "/images/testimonials/yashika-narula.jpeg",
  },
  {
    name: "Ananyaaa",
    quote:
      "I had a wonderful experience at Aiir Salon! I got my nails done by Jyoti, and she did an amazing job. She was patient, detail-oriented, and made sure everything looked perfect. I absolutely love how my nails turned out! The entire team was professional, friendly, and made me feel comfortable throughout my visit.",
    image: "/images/testimonials/ananyaaa.png",
  },
  {
    name: "Nanki Ahuja",
    quote:
      "I had an amazing experience at this salon! The staff was incredibly friendly, professional, and made me feel comfortable from the moment I walked in. They paid close attention to every detail and delivered exactly the look I wanted. I'm so happy with the results and will definitely be coming back. Highly recommended to anyone looking for excellent service and quality.",
    image: "/images/testimonials/nanki-ahuja.jpg",
  },
  {
    name: "Vidhushi",
    quote:
      "Really happy with the service and the overall experience. The staff is super attentive, and I loved the results.",
    image: "/images/testimonials/vidhushi.jpeg",
  },
];

const AUTO_ADVANCE_MS = 5000;

function ArrowIcon({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M15 5l-7 7 7 7"
            : "M9 5l7 7-7 7"
        }
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Desktop/tablet: vertical drift. Phone: horizontal slide. Both crossfade
// + tint together, direction-aware so it always reads as one continuous
// reel rather than snapping back and forth.
const photoVariants = {
  enter: (direction: { step: number; isPhone: boolean }) => ({
    opacity: 0,
    y: direction.isPhone ? 0 : direction.step > 0 ? 32 : -32,
    x: direction.isPhone ? (direction.step > 0 ? 48 : -48) : 0,
  }),
  center: { opacity: 1, y: 0, x: 0 },
  exit: (direction: { step: number; isPhone: boolean }) => ({
    opacity: 0,
    y: direction.isPhone ? 0 : direction.step > 0 ? -32 : 32,
    x: direction.isPhone ? (direction.step > 0 ? -48 : 48) : 0,
  }),
};

const tintVariants = {
  enter: { opacity: 1 },
  center: { opacity: 0 },
  exit: { opacity: 1 },
};

const textVariants = {
  enter: (direction: { step: number; isPhone: boolean }) => ({
    opacity: 0,
    y: direction.isPhone ? 0 : direction.step > 0 ? 20 : -20,
    x: direction.isPhone ? (direction.step > 0 ? 40 : -40) : 0,
  }),
  center: { opacity: 1, y: 0, x: 0 },
  exit: (direction: { step: number; isPhone: boolean }) => ({
    opacity: 0,
    y: direction.isPhone ? 0 : direction.step > 0 ? -20 : 20,
    x: direction.isPhone ? (direction.step > 0 ? -40 : 40) : 0,
  }),
};

export function Testimonial() {
  const [[index, step], setState] = useState<[number, number]>([0, 1]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((newStep: number) => {
    setState(([current]) => {
      const length = TESTIMONIALS.length;
      const next = (current + newStep + length) % length;
      return [next, newStep];
    });
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(1), AUTO_ADVANCE_MS);
  }, [goTo]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleArrowClick = (newStep: number) => {
    goTo(newStep);
    resetTimer();
  };

  const active = TESTIMONIALS[index];

  return (
    // reveal: per your instruction (site-wide fade-slide-in on first
    // scroll into view, not from Framer data). Applied only to this
    // outer static wrapper — the motion.div elements inside already
    // drive their own opacity/transform via inline style (set by
    // `motion`), which always wins over any class-based CSS, so `reveal`
    // wouldn't visibly do anything on those anyway.
    <div className="reveal mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 md:gap-8">
      <div className="relative flex w-full flex-col overflow-hidden rounded-[14px] bg-[rgb(247,247,247)] p-6 md:rounded-lg md:p-[46px]">
        <div className="flex flex-col items-start gap-6 md:hidden">
          {/* Phone layout: image above text, per confirmed Phone1 data */}
          <div className="relative h-[280px] w-full overflow-hidden rounded-lg">
            <AnimatePresence mode="popLayout" custom={{ step, isPhone: true }}>
              <motion.div
                key={active.name}
                custom={{ step, isPhone: true }}
                variants={photoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
                <motion.div
                  variants={tintVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-black"
                  aria-hidden="true"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex w-full flex-col gap-8">
            <SidekickQuotationMark className="h-[68px] w-[70px]" />
            <AnimatePresence mode="wait" custom={{ step, isPhone: true }}>
              <motion.div
                key={active.name}
                custom={{ step, isPhone: true }}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                className="flex flex-col gap-5"
              >
                <p className="text-body-16 text-primary-text">
                  {active.quote}
                </p>
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-10 shrink-0 rounded-full bg-primary-text" />
                  <span className="text-body-18 text-primary-text">
                    {active.name}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex lg:gap-12">
          {/* Desktop/tablet layout: image beside text */}
          <div className="relative h-[400px] w-[300px] shrink-0 overflow-hidden rounded-lg">
            <AnimatePresence mode="popLayout" custom={{ step, isPhone: false }}>
              <motion.div
                key={active.name}
                custom={{ step, isPhone: false }}
                variants={photoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <motion.div
                  variants={tintVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-black"
                  aria-hidden="true"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex flex-1 flex-col gap-8">
            <SidekickQuotationMark className="h-[100px] w-[103px]" />
            <AnimatePresence mode="wait" custom={{ step, isPhone: false }}>
              <motion.div
                key={active.name}
                custom={{ step, isPhone: false }}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                className="flex flex-col gap-6"
              >
                <p className="text-h4-italic text-primary-text">
                  {active.quote}
                </p>
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-10 shrink-0 rounded-full bg-primary-text" />
                  <span className="text-h4 text-primary-text">
                    {active.name}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleArrowClick(-1)}
          aria-label="Previous testimonial"
          className="flex h-16 w-16 items-center justify-center rounded-xl bg-[rgb(218,222,198)] opacity-50 transition-opacity hover:opacity-75"
        >
          <ArrowIcon direction="left" className="h-6 w-6 text-primary-text" />
        </button>
        <button
          type="button"
          onClick={() => handleArrowClick(1)}
          aria-label="Next testimonial"
          className="flex h-16 w-16 items-center justify-center rounded-xl bg-[rgb(218,222,198)] transition-opacity hover:opacity-75"
        >
          <ArrowIcon direction="right" className="h-6 w-6 text-primary-text" />
        </button>
      </div>
    </div>
  );
}

function SidekickQuotationMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 110"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M82.5 75.625C87.9645 75.6069 93.2 73.4281 97.0641 69.5641C100.928 65.7 103.107 60.4645 103.125 55C103.125 50.0156 102.073 45.375 99.4125 41.5525C97.5288 38.8231 94.2838 37.2213 91.19 35.5025C91.1556 30.0713 91.2244 28.7375 95.5144 21.5944C98.3125 16.9331 92.9225 11.6738 88.33 14.5819C78.5813 20.7831 71.94 26.3313 67.6637 32.8694C63.3875 39.3938 61.875 46.695 61.875 55C61.8841 60.4673 64.06 65.7081 67.926 69.574C71.7919 73.44 77.0327 75.6159 82.5 75.625ZM27.5 75.625C32.9645 75.6069 38.2 73.4281 42.0641 69.5641C45.9281 65.7 48.1069 60.4645 48.125 55C48.125 50.0156 47.0731 45.375 44.4125 41.5525C42.5288 38.8231 39.2837 37.2213 36.19 35.5025C36.1556 30.0713 36.2175 28.7375 40.5144 21.5944C43.3125 16.9331 37.9225 11.6738 33.33 14.5819C23.5813 20.7831 16.94 26.3313 12.6637 32.8694C8.3875 39.3938 6.875 46.695 6.875 55C6.88409 60.4673 9.06 65.7081 12.926 69.574C16.7919 73.44 22.0327 75.6159 27.5 75.625Z"
        fill="#875C3C"
        fillOpacity="0.2"
      />
    </svg>
  );
}
