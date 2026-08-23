import Image from "next/image";
import { Header } from "../header/header";

/**
 * ProblemsSection ("The Aiir Experience")
 *
 * Source: Framer project "aiir-salon-claude", Home page "Problems" section
 * (nodeId MOU5YkNW_), read via getNodeXml on the Home page's Desktop node.
 *
 * CONFIRMED (page-level): backgroundColor "/Primary BG", padding "140px 0",
 * Container maxWidth 1600px, padding "0 64px", gap 64px. Header ("THE AIIR
 * EXPERIENCE" / "Every Detail Has a Purpose") with dark text fix already
 * applied (see below). A 3-col x 2-row grid (gap 16px) of 6 ProblemCard
 * instances, alternating two variants, next to a quote card ("You deserve
 * to feel as good as you look." — Aiir Salon, Creative Direction) on
 * `/Primary color` background, 30% width.
 *
 * UPDATE (you shared a live-site screenshot showing dark text): `Header`
 * defaults its heading to white (correct for the video Hero and tan
 * Services panel it's also used on), but this section's background is the
 * light `/Primary BG` cream — white-on-cream was invisible. Framer's own
 * per-instance data for this exact Header confirms dark text here
 * (`eASyG9Lac="rgb(65, 19, 19)"`), matching your screenshot, so passed
 * `textColor` explicitly instead of changing Header's shared default.
 * Also corrected the heading's capitalization to "Has" per the live
 * screenshot.
 *
 * UPDATE 2 (MAJOR CORRECTION — you selected the real "Problem card"
 * component, nodeId QGhdcy69N, on the canvas; read via
 * getSelectedNodesXml): this component is NOT one text-card template
 * with 6 different background colors, as the original placeholder
 * assumed. It has two genuinely different variants:
 *   - "Problem" (nodeId DtaEkRt3v): a 250x250px white card, 14px border
 *     radius, 24px padding, containing ONE line of body copy at
 *     `/Paragraph/Body 16 compact` — i.e. `text-body-16-compact`,
 *     regular weight (NOT the medium-weight `text-body-18` the
 *     placeholder used).
 *   - "Image" (nodeId BFrVeVfYv): a 250x250px card, 14px border radius,
 *     that is a pure full-bleed photo with NO text at all.
 * Per the page-level XML, the 6 grid instances alternate these two
 * variants in reading order: pVbBWIUvl / RRMd0aPR1 / KF2UMuUSX are the
 * "Problem" (text) variant; sCylnpz8L / DOp7tFGHa / as2EZ9cyQ are the
 * "Image" variant. The 3 text cards keep the real confirmed copy from
 * the earlier full-grid read. The 3 image cards now use the real salon
 * photos you attached, which you confirmed are already in the project's
 * own `public/` folder — swapped in as local Next.js public paths.
 *
 * ⚠ INFERRED: the exact photo -> grid-slot mapping (which of the 3
 * confirmed image cards gets which specific photo) wasn't itself part of
 * the selected-node XML (that only confirms the card TYPE, not which
 * photo goes where) — picked the closest thematic match per slot
 * (consultation/reception, styling/artistry, lounge/spaces, matching the
 * neighboring text card's theme). Flag if these should be swapped to
 * different files from the same folder.
 *
 * UPDATE (per your instruction — site-wide fade-slide-in on first scroll
 * into view, not from Framer data): `reveal` added to the ProblemCard
 * grid container and the quote card (neither has a competing transition,
 * so no conflict). The Header above already reveals itself via its own
 * component-level `reveal` class, so no separate change needed here for
 * that.
 */

type TextCard = {
  kind: "text";
  nodeId: string;
  text: string;
  bgColor: string;
};
type ImageCard = { kind: "image"; nodeId: string; src: string; alt: string };
type ProblemCardData = TextCard | ImageCard;

// UPDATE 3 (per-card background colors restored): the "Problem" variant's
// own component default is a plain white card, but the page's REAL
// per-instance data (confirmed in an earlier read of this section) gives
// each of the 3 text-card instances its own background color override —
// these are the same 3 real confirmed colors from that read, now mapped
// onto the 3 slots that are still text cards after the variant-type
// correction above.
const PROBLEM_CARDS: ProblemCardData[] = [
  {
    kind: "text",
    nodeId: "pVbBWIUvl",
    text: "You show up for everyone else. Your hair hasn't had a good day in months.",
    bgColor: "rgb(192, 170, 147)",
  },
  {
    kind: "image",
    nodeId: "sCylnpz8L",
    src: "/aiir-reception-desk-1.jpg",
    alt: "Aiir Salon reception, personalised consultation",
  },
  {
    kind: "text",
    nodeId: "RRMd0aPR1",
    text: "INDULGE. Premium care & treatments.",
    bgColor: "rgb(247, 247, 247)",
  },
  {
    kind: "image",
    nodeId: "DOp7tFGHa",
    src: "/aiir-styling-station-hair-service.jpg",
    alt: "Aiir Salon styling station, expert artistry",
  },
  {
    kind: "text",
    nodeId: "KF2UMuUSX",
    text: "You deserve to feel as good as you look.",
    bgColor: "rgb(218, 222, 198)",
  },
  {
    kind: "image",
    nodeId: "as2EZ9cyQ",
    src: "/aiir-lounge-sofa.jpg",
    alt: "Aiir Salon lounge, beyond the ordinary salon visit",
  },
];

function ProblemCard(card: ProblemCardData) {
  if (card.kind === "image") {
    return (
      <div className="relative h-[250px] w-full overflow-hidden rounded-[14px]">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-[250px] w-full flex-col items-center justify-center rounded-[14px] p-6 lg:p-16"
      style={{ backgroundColor: card.bgColor }}
    >
      <p className="text-body-16-compact text-primary-text text-center ">{card.text}</p>
    </div>
  );
}

export function ProblemsSection() {
  return (
    <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16">
        <Header
          theme="light"
          textColor="rgb(65, 19, 19)"
          eyebrow="THE AIIR EXPERIENCE"
          line1="Every Detail Has a Purpose"
          line2=""
        />

        <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
          <div className="reveal grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEM_CARDS.map((card) => (
              <ProblemCard key={card.nodeId} {...card} />
            ))}
          </div>

          <div className="min-h-[525px] reveal reveal-delay-1 bg-primary flex w-full flex-col justify-between gap-6 rounded-[14px] p-6 lg:h-full lg:w-[30%] lg:shrink-0">
            <p className="text-h4 text-white">
              &quot;You deserve to feel as good as you look. Behind every cut and colour at Aiir is a team that treats your time as precious, your trust as earned.&quot;
            </p>
            <div className="flex flex-col items-start gap-2.5">
              <span className="text-h4 text-white">Aiir Salon</span>
              <div className="h-px w-full bg-secondary-text opacity-50" />
              <span className="text-body-16 text-white">
                Creative Direction
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
