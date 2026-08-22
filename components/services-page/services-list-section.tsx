import Image from "next/image";
import { Button } from "../buttons/button";
import { SERVICES_HOME } from "../services-home/services-data";

/**
 * ServicesListSection
 *
 * Source: Framer project "aiir-salon-claude", Services page Desktop node
 * (nodeId SxOi4dspa), read via getSelectedNodesXml — the page's
 * "Services" section (nodeId HedL32nNt) came through in full.
 *
 * CONFIRMED:
 * - Section bg "/Secondary text color" (-> `bg-secondary-text`, resolves
 *   to the same off-white token as "/White" elsewhere in this project),
 *   padding 140px top/bottom, Container maxWidth 1600px / padding
 *   "0 64px" / gap 64px.
 * - Unlike the Home page's own "Our Services" section, this one has NO
 *   rounded card wrapper, no section-level `Header` (the page's eyebrow/
 *   heading already lives in the hero above — see `services-hero.tsx`),
 *   and no bottom "View all services" button (redundant — you're already
 *   on `/services`). Just the card list itself.
 * - The card list ("ServicesByAiirs") only ever exposed one example
 *   "Pedicure" instance in Framer's static data (CMS-bound list, same
 *   limitation as the Home page's version) — per your instruction to
 *   "use the same cards from the home page", this renders the same card
 *   markup as `components/services-home/services-section.tsx` (all 10
 *   real "Services by Aiir" CMS items), duplicated here rather than
 *   imported from a shared component — you didn't ask for that file to
 *   be refactored, so it's left exactly as it was.
 */

export function ServicesListSection() {
  return (
    <section className="bg-secondary-text w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16">
        <div className="flex w-full flex-col gap-5">
          {SERVICES_HOME.map((service, index) => (
            <div
              key={service.slug}
              className="sticky w-full"
              style={{ top: "160px", zIndex: index + 1 }}
            >
              <div className="flex w-full flex-col gap-3 md:min-h-[460px] md:flex-row md:items-stretch">
                <div className="relative h-[360px] w-full shrink-0 overflow-hidden rounded-[12px] md:h-auto md:min-h-[460px] md:w-1/2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex w-full flex-col items-start justify-between gap-8 rounded-[12px] bg-white p-8 md:w-1/2">
                  <div className="flex w-full flex-col items-start gap-0.5">
                    <h3 className="text-h4 text-primary-text">
                      {service.title}
                    </h3>
                    <p className="text-body-16 text-primary-text/80">
                      {service.about}
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
                          className="text-body-16 text-primary-text/70"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex w-full items-center gap-2.5">
                    <Button
                      href={`/services/${service.slug}`}
                      default={{ text: "rgb(138, 109, 80)", bg: "transparent" }}
                      hover={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
                      className="flex-1"
                    >
                      Know more
                    </Button>
                    <Button
                      href="/contact"
                      default={{ text: "rgb(65, 19, 19)", bg: "transparent" }}
                      hover={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
                      className="flex-1"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
