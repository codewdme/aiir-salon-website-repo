import { Header } from "../components/header/header";
import { Testimonial } from "../components/testimonial/testimonial";
import { HeroSection } from "../components/hero/hero-section";
import { IntroSection } from "../components/home/intro-section";
import { AboutSection } from "../components/home/about-section";
import { ProblemsSection } from "../components/problems/problems-section";
import { ServicesSection } from "../components/services-home/services-section";

/**
 * Home page
 *
 * Source: Framer project "aiir-salon-claude", Home page node augiA20Il
 * (Desktop breakpoint, nodeId WQLkyLRf1), read via getProjectXml /
 * getNodeXml, plus the Hero section specifically via getSelectedNodesXml
 * (you selected it directly on the canvas).
 *
 * CONFIRMED page order: Hero (sticky, full-viewport video) -> Intro
 * ("More than a salon" + Slideshow) -> Problems ("The Aiir Experience")
 * -> About -> Services (CMS-driven, pulled from the "Services by Aiir"
 * collection per your instruction) -> Testimonials -> FAQs -> Gallery ->
 * Footer.
 *
 * UPDATE (your instruction to share NavBar/Footer/FAQ/Gallery across all
 * pages): those 4 now live in the shared `app/layout.tsx` instead of
 * being duplicated here — this file only returns the Home-specific
 * content (everything between NavBar and the shared FAQ section). See
 * layout.tsx for why FAQs + Gallery come "for free" after this content.
 *
 * REUSE DECISIONS:
 * - Testimonials section: the already-built `Header` + `Testimonial`
 *   components, no new component needed.
 *
 * ⚠ Two sections use placeholder card designs pending Framer data —
 * see the header comments in `components/problems/problems-section.tsx`
 * and `components/services-home/services-section.tsx` for exactly what's
 * confirmed vs. guessed. The "Problem card" and "Service Card" Framer
 * components both failed to read via getNodeXml; select them on the
 * canvas to get these corrected.
 *
 * INFERRED:
 * - Framer's root-level `SmoothScroll` node (a Lenis-style smooth-scroll
 *   wrapper, intensity 10) wasn't reproduced — it's a page-wide scroll
 *   feel, not a visual component, and this project doesn't yet have a
 *   smooth-scroll library wired in. Flag if the real site's scroll feel
 *   needs to be matched exactly.
 */

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* UPDATE (bug fix, found by framer-nextjs-visual-verify on
          localhost): everything after the sticky, full-viewport Hero
          needs to visually slide up and cover it as you scroll — that's
          the whole point of Hero being `position: sticky` with no
          wrapping height constraint (it stays pinned for the entire
          remaining page height otherwise, per how CSS sticky containing
          blocks work). Originally gave Hero `z-[4]` (misreading
          Framer's zIndex="4" on the outer <Main> node, which was about
          Main vs. Footer stacking, not Hero vs. its own siblings) and
          only wrapped Intro/Problems/About in a *lower* z-index — so
          everything rendered UNDER the pinned hero and the page looked
          stuck. Fixed: Hero now sits at the base stacking level
          (`z-0`), and ALL of the content that scrolls over it — every
          section from here down — is wrapped in one `relative z-10`
          layer so it consistently paints above the pinned video. */}
      <div className="relative z-10 flex flex-col">
        <IntroSection />
        <ProblemsSection />
        <AboutSection />
        <ServicesSection showAll={false} />

        <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16">
            {/* UPDATE (bug fix, same issue as ProblemsSection): this
                section sits on the same light `/Primary BG` cream as
                Problems, where Header's default white heading is
                invisible — Framer's confirmed data for this instance
                also specifies dark text (`rgb(65, 19, 19)`). */}
            <Header
              theme="light"
              textColor="rgb(65, 19, 19)"
              eyebrow="TESTIMONIALS"
              line1="Stories of Transformation"
              line2=""
              line2Italic={false}
            />
            <div className="w-full max-w-[1000px]">
              <Testimonial />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
