import Image from "next/image";
import { Button } from "../buttons/button";
import { EyebrowText } from "../eyebrow-text/eyebrow-text";

/**
 * AboutSection
 *
 * Source: Framer project "aiir-salon-claude", Home page "About" section
 * (nodeId j_hyD2uS7), read via getNodeXml on the Home page's Desktop
 * node — came through in full.
 *
 * CONFIRMED:
 * - backgroundColor "/Primary BG", padding "140px 0", Container maxWidth
 *   1600px, padding "0 64px", gap 64px horizontal between a sticky
 *   photo (600px tall, borderRadius 14px, real confirmed URL) and the
 *   text column.
 * - Text column: the already-built `EyebrowText` ("ABOUT AIIR"), a real
 *   confirmed `/Headings/H3` line ("A luxurious escape where style,
 *   comfort and expertise come together."), two real confirmed body
 *   paragraphs at 74% width, and the already-built `Button` ("About
 *   Aiir Salon" -> /about, variant "secondary").
 * - Below that: a "Qualifications" list of 3 real confirmed one-line
 *   claims ("Certified Colour & Styling Experts", "Premium
 *   International Products", "Hygiene-First Salon Protocols"), each
 *   with its own hairline divider underneath (backgroundColor
 *   rgb(207,207,207), 1px).
 */

const ABOUT_IMAGE =
  "https://framerusercontent.com/images/gcRPt90Q5rCPcluKtL8xrGKXvo.jpg";

const QUALIFICATIONS = [
  "Certified Colour & Styling Experts",
  "Premium International Products",
  "Hygiene-First Salon Protocols",
];

export function AboutSection() {
  return (
    <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        <div className="top-16 h-[400px] w-full lg:sticky lg:h-[600px] lg:flex-1">
          <div className="relative h-full w-full overflow-hidden rounded-[14px]">
            <Image
              src={ABOUT_IMAGE}
              alt="Aiir Salon"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-5 lg:w-[50%] lg:shrink-0 lg:items-start">
          <div className="flex w-full flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <div className="flex w-full justify-start ">
              <EyebrowText variant="left" textColor="rgb(138, 109, 80)">
                ABOUT AIIR
              </EyebrowText>
            </div>
            <h3 className="text-h3 text-[28px]  w-full text-left text-primary-text">
              A luxurious escape where style, comfort and expertise come
              together.
            </h3>
            <div className="flex w-full flex-col items-start gap-4 lg:w-[74%]">
              <p className="text-body-16 text-primary-text/80">
                Aiir Salon is designed to offer a luxurious escape in the
                heart of New Delhi, where style, comfort, and expertise come
                together to create your perfect look.
              </p>
              <p className="text-body-16 text-primary-text/80">
                With a team of skilled professionals and premium products, we
                deliver bespoke hair, skin, and beauty treatments tailored to
                enhance your natural radiance.
              </p>
              <Button
                href="/about"
                default={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
                hover={{ text: "rgb(255, 255, 255)", bg: "rgb(65, 19, 19)" }}
                className="w-[200px]"
              >
                About Aiir Salon
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-2.5 pt-5">
            {QUALIFICATIONS.map((item) => (
              <div key={item} className="flex w-full flex-col items-start gap-2">
                <span className="text-body-18 text-primary-text">{item}</span>
                <div className="h-px w-full bg-[rgb(207,207,207)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
