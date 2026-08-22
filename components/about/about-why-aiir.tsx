import { Header } from "../header/header";
import { MetricsCard, METRICS_CARDS } from "../metrics-card/metrics-card";

/**
 * AboutWhyAiirSection
 *
 * Source: Framer project "aiir-salon-claude", About page, "WhyAiir"
 * section (nodeId TWg4I2HJR), read via getNodeXml on the About page's
 * Desktop node (NvA_e7aHR). The 4 `MetricsCard` grid instances only
 * carried a `variant` id each (no per-instance text overrides) — their
 * real copy lives on the shared "Metrics card" component (nodeId
 * O7q1aJlYi) itself, which is the same component + same confirmed copy
 * the already-built `components/metrics-card/metrics-card.tsx` was built
 * from earlier (that file was flagged as unverified/unused until now —
 * re-checked live on `/about` this pass and its `METRICS_CARDS` data
 * matches exactly: Personalized / Professional / Premium / Experience,
 * word-for-word).
 *
 * CONFIRMED (from XML):
 * - Section bg "/Primary BG" (-> `bg-primary-bg`, rgb(252,247,237)),
 *   padding 140px top/bottom, Container maxWidth 1600px / padding
 *   "0 64px" / gap 64px, vertical stack, centered.
 * - Header instance (shared `Header` component): eyebrow "WHY AIIR",
 *   line1 "Because Ordinary Isn't", line2 "the Standard", heading
 *   textColor rgb(65, 19, 19) (a dark brown — unlike every other About
 *   Header instance so far, this section sits on the light Primary BG,
 *   not a dark image/tan backdrop, so the heading is dark-on-light here).
 * - 4-column grid of `MetricsCard` instances, each card 268-275px, real
 *   confirmed copy (see METRICS_CARDS in metrics-card.tsx).
 *
 * UPDATE (bug found, same "raw XML lies" pattern as About header's
 * line2Italic and the Contact hero's height): Framer's raw instance data
 * gives this Header an `eyebrowColor` of rgb(252, 247, 237) — the same
 * off-white used on every dark-backdrop Header — but this section's
 * background is that exact same off-white (`/Primary BG`), which would
 * make the eyebrow invisible. Checked the live `/about` page directly:
 * "WHY AIIR" actually renders in the same dark-brown/tan tone as every
 * other light-background Header instance (e.g. "THE AIIR EXPERIENCE"),
 * not off-white. So the raw `eyebrowColor` override is not applied here
 * — omitted it and left `theme="light"` (the default) so Header's own
 * light-theme default (tan "/Primary color") is used instead.
 *
 * UPDATE 2 (another bug, same category): checked computed styles on the
 * live page for both heading lines — both render as Italiana with
 * `font-style: normal` (48px / 52px, matching `text-h2-sans`/
 * `text-h2-serif`'s own font-size values, which are BOTH already Italiana
 * despite the "sans" name — a leftover Framer style-path label, not an
 * actual sans font). The only thing that visually differs from Header's
 * default assumption is that line2 ("the Standard") is NOT italic here,
 * unlike every other confirmed Header instance so far. Used the existing
 * `line2Italic={false}` override (same one About's "care" header uses)
 * rather than adding anything new to Header.
 *
 * UPDATE 3 (another bug, same category): unlike every other Header
 * instance checked so far, this one stays vertically stacked at desktop
 * width instead of going side-by-side at `md:flex-row` — confirmed by
 * comparing both tabs at the same 1440px viewport. Added a new `stacked`
 * override prop on Header itself for this (see Header's own UPDATE 4).
 */

export function AboutWhyAiirSection() {
  return (
    <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-12 lg:gap-16">
        <Header
          textColor="rgb(65, 19, 19)"
          eyebrow="WHY AIIR"
          line1="Because Ordinary isn't the Standard"
          line2=""
          line2Italic={false}
          stacked
        />

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {METRICS_CARDS.map((card) => (
            <div key={card.title} className="flex justify-center">
              <MetricsCard title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
