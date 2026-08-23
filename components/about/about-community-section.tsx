import Image from "next/image";
import { Button } from "../buttons/button";

/**
 * AboutCommunitySection
 *
 * Source: Framer project "aiir-salon-claude", About page, the
 * "AboutSection" section (nodeId KQEMR2TVE), read via getNodeXml on the
 * About page's Desktop node (NvA_e7aHR) — came through in full alongside
 * every other About page section in one read.
 *
 * Named "Community" here (not "AboutSection") to avoid confusion with
 * `components/home/about-section.tsx`, which is a different section (the
 * Home page's "About Aiir Salon" teaser) — this one is About page-only.
 *
 * CONFIRMED:
 * - backgroundColor "/Primary BG", padding "140px 0", Container maxWidth
 *   1600px, padding "0 64px", gap 64px, horizontal, align start.
 * - Left: a real confirmed photo, 44% width, 540px height, 24px border
 *   radius, 4px solid white border/frame.
 * - Right (50% width, 540px height, space-between vertical stack):
 *   - H3 heading: "A Community of Creatives. United by Beauty."
 *   - Two real confirmed body paragraphs at 74% width.
 *   - A stat bar: bg "/Secondary text color" (-> `bg-secondary-text`,
 *     resolves to the same off-white token as "/White" elsewhere in this
 *     project), 14px radius, 24px padding, 3 stat columns separated by
 *     2 real 1px/117px-tall dividers — "10+ / YEARS OF EXPERIENCE",
 *     "400+ / SATISFIED CLIENTS", "8+ / SERVICES OFFERED". The big
 *     numbers use `/Headings/H3`; the captions use Montserrat medium
 *     14px, which is exactly `text-eyebrow` already defined in
 *     globals.css (kept per this project's "Instrument Sans dropped,
 *     Montserrat everywhere" instruction — Framer's raw data still shows
 *     "Instrument Sans-500" on one of the three captions, a leftover
 *     from before that change, not applied here).
 */

const ABOUT_IMAGE =
  "https://framerusercontent.com/images/onY9Hw9oDuVSklRH2towCjhQBO4.jpg";

function StatColumn({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-1 text-center">
      <span className="text-[36px]  text-h3 text-primary-text">{value}</span>
      <span className="text-[14px] lg:text-[12px] text-eyebrow  text-center text-primary-text/70">{label}</span>
    </div>
  );
}

function StatDivider() {
  return (
    <div className="hidden h-[117px] w-px shrink-0 bg-[rgb(207,207,207)] sm:block" />
  );
}

export function AboutCommunitySection() {
  return (
    <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-8 lg:flex-row lg:gap-16">
        <div className="relative h-[360px] w-full shrink-0 overflow-hidden rounded-[24px] border-4 border-white md:h-[450px] lg:h-[540px] lg:w-[44%]">
          <Image
            src={ABOUT_IMAGE}
            alt="Aiir Salon"
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-8 lg:h-[540px] lg:w-[50%]">
          <div className="flex w-full flex-col items-start gap-6">
            <div className="">

            <h3 className="text-h3 text-[28px] lg:text-[36px] w-full text-left lg:text-primary-text">
              A Community of Creatives. 
            </h3>
            <h3 className="text-h3 text-[28px] lg:text-[36px] w-full text-left lg:text-primary-text">
              United By Beauty
            </h3>
            </div>
            <div className="flex w-full flex-col items-start gap-4 lg:w-full">
              <p className="text-[14px] lg:text-[16px] text-body-16 text-primary-text/80 text-balance">
                Aiir is a community of creatives united by a shared passion
                for enhancing the wellbeing, beauty and confidence of
                others. We believe the best beauty experiences are not
                created by following a formula, they are created by people
                who care about their craft.
              </p>
              <p className="text-[14px] lg:text-[16px]  text-body-16 text-primary-text/80 text-balance">
                Our stylists, artists and beauty professionals bring
                together expertise, creativity and attention to detail to
                create experiences that feel distinctly yours. Because
                every person who walks through our doors deserves more
                than a service, they deserve an experience worth
                remembering.
              </p>
            </div>
          
          <Button
                href="/blogs"
                default={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
                hover={{ text: "rgb(255, 255, 255)", bg: "rgb(65, 19, 19)" }}
                className="w-[200px]"
              >
                Read More...
              </Button>
              </div>

          {/* <div className="bg-secondary-text flex w-full flex-col items-stretch gap-6 rounded-[14px] p-6 sm:flex-row sm:items-center sm:gap-5">
            <StatColumn value="10+" label="YEARS OF EXPERIENCE" />
            <StatDivider />
            <StatColumn value="400+" label="SATISFIED CLIENTS" />
            <StatDivider />
            <StatColumn value="8+" label="SERVICES OFFERED" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
