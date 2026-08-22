import { Button } from "../buttons/button";
import { EyebrowText } from "../eyebrow-text/eyebrow-text";
import { Slideshow } from "./slideshow";

/**
 * IntroSection
 *
 * Source: Framer project "aiir-salon-claude", Home page "Intro" section
 * (nodeId sJYrvp9Ll), read via getNodeXml on the Home page's Desktop
 * node — came through in full.
 *
 * CONFIRMED:
 * - backgroundColor "/Primary BG", borderRadius "48px 48px 0px 0px"
 *   (rounds the top corners where this section overlaps the sticky
 *   video Hero above it), padding "140px 0 100px 0", Container maxWidth
 *   1600px, padding "0 64px", gap 120px between the text block and the
 *   Slideshow.
 * - Text block (gap 32px, centered): the already-built `EyebrowText`
 *   ("MORE THAN A SALON"), a real confirmed `/Headings/H3` line at 71%
 *   width ("Beauty, Elevated. It's a feeling, a moment of pause, of
 *   care, where every detail is designed around you."), and the
 *   already-built `Button` ("Discover Aiir" -> /about, variant
 *   "secondary" per the nodeId->variant mapping shared with the About
 *   section's identical "About Aiir Salon" button below).
 */

export function IntroSection() {
  return (
    <section className="bg-primary-bg w-full rounded-t-[48px] px-6 pt-24 pb-16 md:px-8 lg:px-16 lg:pt-[140px] lg:pb-[100px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16 lg:gap-[120px]">
        <div className="flex w-full flex-col items-center gap-6 text-center lg:gap-8">
          <EyebrowText variant="center" textColor="rgb(138, 109, 80)">
            MORE THAN A SALON
          </EyebrowText>
          <p className="text-h3 w-full text-primary-text lg:w-[71%]">
            Beauty, Elevated. It&apos;s a feeling, a moment of pause, of care,
            where every detail is designed around you.
          </p>
          <Button
            href="/about"
            default={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
            hover={{ text: "rgb(255, 255, 255)", bg: "rgb(65, 19, 19)" }}
          >
            Discover Aiir
          </Button>
        </div>

        <Slideshow />
      </div>
    </section>
  );
}
