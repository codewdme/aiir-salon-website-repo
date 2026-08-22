import Image from "next/image";
import { Button } from "../buttons/button";
import { SERVICES_HOME } from "./services-data";

/**
 * ServiceCardsList
 *
 * Extracted from `components/services-home/services-section.tsx` (the
 * Home page's "Our Services" section) per your instruction to "use the
 * same cards" on the Services page (`/services`) — this is the exact
 * card markup/styling that was already confirmed against the real
 * "Service Card" Framer component (nodeId DJS4zDsmx, Desktop variant
 * VQz2N7KPk), now shared between both places instead of being
 * duplicated. See `services-section.tsx`'s own file header for the full
 * confirmed/inferred history of this card's structure — nothing about
 * the card itself changed here, only its location.
 */

export function ServiceCardsList({showAll = false}:{showAll : boolean}) {
  return (
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
  );
}
