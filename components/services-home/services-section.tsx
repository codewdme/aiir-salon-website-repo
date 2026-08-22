import Image from "next/image";
import { Button } from "../buttons/button";
import { Header } from "../header/header";
import { SERVICES_HOME } from "./services-data";

/**
 * ServicesSection ("Our Services")
 *
 * Source: Framer project "aiir-salon-claude", Home page "Services"
 * section (nodeId G9ktU2oiy), read via getNodeXml on the Home page's
 * Desktop node, plus the real CMS collection "Services by Aiir"
 * (collectionId dLMsbfuG0, per your instruction to pull service details
 * from there) via getCMSItems — 10 real items came through in full.
 *
 * CONFIRMED:
 * - backgroundColor "/Primary color", borderRadius 48px, padding
 *   "140px 64px", Container maxWidth 1600px, gap 64px. Uses the
 *   already-built `Header` ("Our Services" / "Your Hair Deserves the
 *   Best"), and the already-built `Button` ("View all services" ->
 *   /services, variant "primary").
 * - The "ServicesByAiirs" wrapper holds a `position: sticky; top: 160px`
 *   card list — Framer's static XML only ever captures ONE example
 *   child (a "Pedicure" `ServiceCard` instance) because the real list is
 *   CMS-bound and only renders whichever item happens to be selected on
 *   the canvas. The real content for all cards is pulled from the
 *   "Services by Aiir" CMS collection per your instruction (see
 *   services-data.ts for the full mapped list — 10 real services, each
 *   with title, price, description, a short "what's included" list and
 *   a real photo).
 *
 * UPDATE (MAJOR CORRECTION — you selected the real "Service Card"
 * component, nodeId DJS4zDsmx, on the canvas; read via
 * getSelectedNodesXml, Desktop variant nodeId VQz2N7KPk): the placeholder
 * card below (photo + title/price row + full description + bullet list +
 * one "Learn more" button, inside a bordered/shadowed outer wrapper) was
 * a guess and is now replaced with the real confirmed structure:
 * - No outer border/shadow wrapper — just two elements side by side with
 *   12px gap: an `ImageWrapper` (50% width, 12px radius, a single photo
 *   at 460px height) and a `TextContainer` (the other 50%, white
 *   background, 12px radius, 32px padding, 32px internal gap,
 *   space-between vertical stack).
 * - No price is shown anywhere on the real card — dropped it from the
 *   rendered output (still kept in `services-data.ts` in case another
 *   section needs it).
 * - TextContainer content, top to bottom: a Title block (H4 service name
 *   + one regular-weight line directly under it — mapped to the CMS
 *   `about` copy here, since that's the real per-service copy available,
 *   even though the one example instance Framer exposed happened to be
 *   a single short line), then "What's included:" (`/Paragraph/Body 18`)
 *   above the real CMS bullet list (`/Paragraph/Body 16`), then a
 *   `PriceButton` row with TWO real confirmed buttons side by side (not
 *   one) — "Know more" (-> `/services/{slug}`, textColor
 *   `rgb(138, 109, 80)`, the tan `/Primary color` token) and "Book Now"
 *   (-> `/contact`, textColor `rgb(65, 19, 19)`, the dark
 *   `/Primary text color` token) — both `variant="secondary"` per
 *   Button's confirmed nodeId->variant mapping (`XmxgwoN1v`/`olhzrI2Iw`).
 *   Both buttons' default state is a transparent fill + a white 0.5px
 *   border that's invisible against this card's own white background —
 *   confirmed intentional (same "ghost button, fills tan on hover"
 *   pattern already established for Button elsewhere), not a bug.
 *
 * UPDATE (your sizing correction): the card's min-height on desktop is
 * 460px (not a fixed height — the image stays pinned to 460px min while
 * the text column can grow taller than that if a service's copy/bullet
 * list runs long, and the image stretches to match via `items-stretch`).
 * On phone, the image's own min-height is 360px (up from the earlier
 * 260px placeholder guess).
 */

export function ServicesSection({showAll = false }:{showAll: boolean}) {
  return (
    <section className="bg-primary-bg w-full p-4">
      <div className="bg-primary mx-auto flex w-full flex-col items-center gap-16 rounded-[20px] lg:rounded-[48px] px-3 py-16 md:px-8 lg:px-16 lg:py-[140px]">
        <div className="flex w-full max-w-[1600px] flex-col items-center gap-4 lg:gap-16">
          <Header
            theme="dark"
            eyebrow="OUR SERVICES"
            line1="Your Hair Deserves the Best"
            line2=""
          />

          <div className="flex w-full flex-col gap-12 lg:gap-5">
            {SERVICES_HOME.slice(0, showAll ? 10 : 3 ).map((service, index) => (
              <div
                key={service.slug}
                className="sticky w-full"
                style={{ top: "60px", zIndex: index + 1 }}
              >
                <div className="flex w-full flex-col gap-3 md:min-h-[460px] md:flex-row md:items-stretch">
                  <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-[12px] md:h-auto md:min-h-[460px] md:w-1/2">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex w-full flex-col items-start justify-between gap-8 rounded-[12px] bg-white p-4 lg:p-8 md:w-1/2">
                    <div className="flex w-full flex-col items-start gap-0.5">
                      <h3 className="text-h4 text-primary-text">
                        {service.title}
                      </h3>
                      <p className="text-body-14 text-left lg:text-body-16 text-primary-text/80">
                        {service.about.slice(0,100)}...
                      </p>
                    </div>

                    <div className="flex w-full flex-col items-start gap-4">
                      <span className="text-body-18 text-primary-text">
                        What&apos;s included:
                      </span>
                      <ul className="flex w-full flex-col gap-1">
                        {service.includedShort.map((line) => (
                          <li
                            key={line}
                            className="text-body-14 text-left lg:text-body-16  text-primary-text/70"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full items-center gap-2.5">
                      <Button
                        href={`/services/${service.slug}`}
                        default={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80,0.9)" }}
                        hover={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
                        className="flex-1 w-full"
                      >
                        Know more
                      </Button>
                      <Button
                        href="/contact"
                        default={{ text: "rgb(255,255,255)", bg: "rgb(65, 19, 19, 0.9)" }}
                        hover={{ text: "rgb(255,255,255)", bg: "rgb(65, 19, 19)"}}
                        className="flex-1 w-full"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            href="/services"
            default={{ text: "rgb(83, 68, 62)", bg: "rgb(255, 255, 255)" }}
            hover={{ text: "rgb(255, 255, 255)", bg: "rgb(83, 68, 62)" }}
            className="w-full lg:w-fit"
          >
            View all services
          </Button>
        </div>
      </div>
    </section>
  );
}
