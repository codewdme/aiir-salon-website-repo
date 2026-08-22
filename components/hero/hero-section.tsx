import {
  Heart,
  FlowerLotus,
  BatteryChargingVertical,
  PersonArmsSpread,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "../buttons/button";

/**
 * HeroSection
 *
 * Source: Framer project "aiir-salon-claude", Home page Desktop node
 * (nodeId augiA20Il -> WQLkyLRf1), the "Hero" section (nodeId o80gA6OW_),
 * read via getSelectedNodesXml (you selected this section directly on
 * the canvas) — came through in full.
 *
 * CONFIRMED:
 * - Full-viewport (`height: 100vh`) sticky section with a looping,
 *   autoplaying, muted background video (real confirmed asset URL),
 *   padding "0 64px 40px 64px", content pinned to the bottom-right via
 *   stack distribution "end"/"end".
 * - Heading: "Experience" ("/Headings/H1 sans") directly above "Luxury
 *   Above." ("/Headings/H1 serif"), both real confirmed copy — paired
 *   with the already-built `Button` ("Book Your Experience" -> /contact,
 *   variant "primary" per the same nodeId->variant mapping confirmed on
 *   the Footer's identical button instance).
 * - Below a full-width divider: a 4-item icon "Ticker" (Hair/Beauty/
 *   Nails/Grooming, each with a Phosphor icon — weight/size/color came
 *   through as explicit instance props: 20px, 1.5 stroke weight equiv.,
 *   white) and a "TrustStrip" — 4 overlapping circular avatar images
 *   (real confirmed URLs, 46px, 3px white border) plus a star rating
 *   ("4.8/5") and "800+ Delighted Clients" line.
 * - A bottom gradient `Overlay` (36% height) sits behind the text for
 *   legibility over the video.
 *
 * INFERRED:
 * - The `Stars` node (nodeId akQ6XmA4X) is an empty stack in Framer's
 *   data — almost certainly meant to hold 5 star icons that just didn't
 *   come through as real children. Rendered as 5 filled `Star` icons
 *   (Phosphor, matching the ticker icons' visual weight) as the obvious
 *   intent, since a bare "4.8/5" with no stars would look broken.
 * - The icons' exact Phosphor weight prop wasn't literally named
 *   "regular"/"bold" in Framer's data (just a stroke-width number,
 *   1.5) — mapped to Phosphor's `weight="regular"` as the closest
 *   standard match.
 *
 * UPDATE (per your report — you selected the Phone breakpoint's Ticker
 * node and confirmed it's a continuously auto-scrolling marquee on
 * phone only, not the static wrapped row desktop uses): Framer's API
 * never exposes animation/interaction data (confirmed again here — no
 * CSS keyframes, no detectable movement on the live site's DOM), so
 * this is built from your description, not inferred from node
 * attributes. Below `md:`, the ticker now renders as
 * `animate-marquee` (globals.css) — the items rendered twice
 * back-to-back in one row, sliding left by exactly one set's width on
 * a seamless loop. At `md:` and up, the original static `flex-wrap`
 * row (unchanged) takes over.
 *
 * UPDATE 2 (per your upload — two real hero video files, portrait for
 * phone and landscape for desktop/tablet): the background video was
 * previously a single Framer CDN asset used at every breakpoint. Both
 * files you sent already existed in `public/` (confirmed via listing
 * the folder — `aiir-hero-portrait-mobile.mp4` and
 * `aiir-hero-landscape-desktop-tablet.mp4`), so no upload/move was
 * needed, just wiring them in. Implemented with two `<source media>`
 * children on one `<video>` element (the standard responsive-video
 * pattern, same idea as `<picture>`'s `<source media>`) rather than two
 * separate `<video>` elements, so there's exactly one autoplay/loop
 * instance and the browser only ever fetches whichever file matches —
 * portrait below `md:` (max-width 767px, this project's established
 * phone cutoff), landscape at `md:` and up. Note: like `<picture>`,
 * the browser picks a source once and doesn't necessarily re-swap on a
 * live resize past the breakpoint without a reload — acceptable here
 * since this is a real device's viewport, not a resizable browser
 * window in practice.
 *
 * UPDATE 3 (per your instruction — site-wide fade-slide-in on first
 * scroll into view, not from Framer data): added `reveal` (staggered
 * with `reveal-delay-*`) to the heading, the button's existing wrapper
 * div, the ticker row (both the phone marquee's outer wrapper and the
 * desktop static row — NOT the marquee's own inner track, which already
 * animates its own `transform` via `animate-marquee` and would fight
 * `reveal`'s `transform` if put on the same element), and the trust
 * strip. Deliberately did NOT add `reveal` to `Button` itself — it
 * already owns a `transition-all` for its hover color/scale (see
 * button.tsx's own documented bug about competing transition
 * declarations), and `reveal`'s transition would silently replace it.
 * Applying `reveal` to the button's existing wrapper div instead gets
 * the same fade-in without touching button.tsx or adding any new
 * element.
 */

const TICKER_ITEMS = [
  { Icon: Heart, label: "Hair" },
  { Icon: FlowerLotus, label: "Beauty" },
  { Icon: BatteryChargingVertical, label: "Nails" },
  { Icon: PersonArmsSpread, label: "Grooming" },
];

const TRUST_AVATARS = [
  "https://framerusercontent.com/images/1xnUez0XmtxlaB1bdyOPnW3e1g.jpg",
  "https://framerusercontent.com/images/L9uCUFBF4t9LcTddOzezNHnVG4.png",
  "https://framerusercontent.com/images/ilVvsWzMYZgw7mIh6uUoJkZg.png",
  "https://framerusercontent.com/images/ETz7QmJr4eW74F6mVXEDHLzxd4.png",
];

// Real hero video files, confirmed already present in public/ (see
// UPDATE 2 above). Root-relative paths since these are served straight
// out of the public folder by Next.js.
const HERO_VIDEO_PORTRAIT_MOBILE = "/aiir-hero-portrait-mobile.mp4";
const HERO_VIDEO_LANDSCAPE_DESKTOP_TABLET =
  "/aiir-hero-landscape-desktop-tablet.mp4";

// UPDATE (found via framer-nextjs-visual-verify, live-checking this
// section against https://aiirsalon.framer.website/): the video's own
// networkState/readyState is stuck at "loading, nothing loaded yet" on
// BOTH the live Framer site and localhost — this is the CDN asset
// itself intermittently 503-ing, not a bug in this component. Framer's
// own player falls back to a real poster frame while that happens
// (confirmed via `video.poster` on the live tab); added the same
// fallback here via the `poster` attribute so a slow/failed video load
// doesn't leave the hero blank.
const HERO_VIDEO_POSTER =
  "https://framerusercontent.com/images/CPYY10s4KHEnWuBPj1yEiTid5g.jpg";

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-white">
      <path d="M10 1.5l2.47 5.51 6.03.62-4.53 4.06 1.32 5.9L10 14.72l-5.29 2.87 1.32-5.9L1.5 7.63l6.03-.62L10 1.5z" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      className="sticky top-0 z-[-1] flex h-screen w-full flex-col items-end justify-end overflow-hidden px-6 pb-8 md:px-8 md:pb-10 lg:px-16"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        poster={HERO_VIDEO_POSTER}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={HERO_VIDEO_PORTRAIT_MOBILE} media="(max-width: 767px)" />
        <source src={HERO_VIDEO_LANDSCAPE_DESKTOP_TABLET} />
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[36%] w-full bg-gradient-to-t from-black/60 to-transparent"
      />

      <div className="relative z-[3] flex w-full flex-col items-start gap-4">
        <div className="flex w-full flex-col items-start gap-1">
          <div className="flex w-full flex-col items-start lg:items-end justify-between gap-4 md:flex-row">
            <h1 className="reveal flex flex-col justify-start  items-start text-white">
              <span className="text-h1-sans text-[48px]   text-left leading-[1em] md:text-[80px] lg:text-[96px]">
                Experience
              </span>
              <span className="text-h1-serif text-[48px]  text-left leading-[1em] md:text-[86px] lg:text-[96px]">
                Luxury Above.
              </span>
            </h1>
            <div className="reveal reveal-delay-1 flex w-full items-center justify-center pb-3.5 md:w-[24%]">
              <Button
                href="/contact"
                hover={{ text: "rgb(255, 255, 255)", bg: "rgb(65, 19, 19)" }}
                default={{ text: "rgb(83, 68, 62)", bg: "rgb(255, 255, 255)" }}
                className="w-full"
              >
                Book Your Experience
              </Button>
            </div>
          </div>
          <div className="h-px w-full bg-white" />
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          {/* Phone only: continuously auto-scrolling marquee (see
              globals.css's `animate-marquee`). Content is duplicated
              once so the track's -50% translateX lands back on an
              identical position for a seamless loop. `overflow-hidden`
              on the wrapper clips the second copy until it's needed. */}
          <div className="reveal reveal-delay-2 w-full overflow-hidden md:hidden">
            <div className="animate-marquee flex w-max items-center gap-6">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map(({ Icon, label }, i) => (
                <div key={`${label}-${i}`} className="flex shrink-0 items-center gap-1.5">
                  <Icon size={20} weight="regular" color="rgb(252, 247, 237)" />
                  <span className="text-body-16 text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* md: and up — original static wrapped row, unchanged. */}
          <div className="reveal reveal-delay-2 hidden w-full items-center gap-6 md:flex md:w-1/2 md:flex-wrap md:gap-10">
            {TICKER_ITEMS.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={20} weight="regular" color="rgb(252, 247, 237)" />
                <span className="text-body-16 text-white">{label}</span>
              </div>
            ))}
          </div>

          <div className="reveal reveal-delay-3 flex items-center gap-4">
            <div className="flex w-[130px] shrink-0 items-center">
              {TRUST_AVATARS.map((src, index) => (
                <div
                  key={src}
                  className="relative -ml-[13px] h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full border-[3px] border-white first:ml-0"
                  style={{ zIndex: index + 1 }}
                >
                  <Image src={src} alt="" fill sizes="46px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="text-body-16 text-white">4.8/5</span>
              </div>
              <span className="text-body-16 text-white">800+ Delighted Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
