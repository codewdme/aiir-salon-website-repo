
import { Button } from "@/components/buttons/button";
import { ServicesHeroSection } from "../../components/services-page/services-hero";
import { SERVICES_HOME } from "@/components/services-home/services-data";
import Image from "next/image";


/**
 * Services page
 *
 * Source: Framer project "aiir-salon-claude", Services page Desktop node
 * (nodeId SxOi4dspa), read via getSelectedNodesXml (you selected it
 * directly on the canvas) — came through in full: Header (hero) ->
 * Services (card list) -> Gallery -> [Footer implied].
 *
 * NavBar, Footer, the FAQ section, and Gallery come from the shared
 * `app/layout.tsx` (same as every other page) — this file only returns
 * the Services-specific content: the hero (`ServicesHeroSection`) and
 * the card list (`ServicesListSection`, reusing the exact same cards as
 * the Home page's "Our Services" section per your instruction).
 */

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <section className="bg-primary-bg w-full p-4">
      <div className="bg-primary mx-auto flex w-full flex-col items-center gap-16 rounded-[20px] lg:rounded-[48px] px-3 py-16 md:px-8 lg:px-16 lg:py-[140px]">
        <div className="flex w-full max-w-[1600px] flex-col items-center gap-4 lg:gap-16">
         
          <div className="flex w-full flex-col gap-12 lg:gap-5">
            {SERVICES_HOME.map((service, index) => (
              <div
                key={service.slug}
                className="lg:sticky w-full"
                
              >
                <div className="flex w-full flex-col gap-3 md:min-h-[460px] md:flex-row md:items-stretch">
                  <div className="relative h-[300px] w-full shrink-0 overflow-hidden rounded-[12px] md:h-auto md:min-h-[460px] md:w-1/2">
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

      
        </div>
      </div>
    </section>
    </>
  );
}
