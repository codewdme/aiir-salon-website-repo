import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "../buttons/button";
import type { ServiceDetail } from "./service-detail-data";
import { REAL_RESULTS_IMAGES, SERVICE_INFO_STATIC } from "./service-detail-data";
import {
  ArrowRightIcon,
  AvailabilityIcon,
  CategoryIcon,
  CheckCircleIcon,
  DurationIcon,
  IncludesIcon,
  PriceIcon,
  ProductsIcon,
} from "./service-detail-icons";

/**
 * ServiceDetailPanel
 *
 * Source: Framer project "aiir-salon-claude", individual service page
 * Desktop node (nodeId I6TLya5ax, example item "Pedicure"), read via
 * getSelectedNodesXml — the page's "HeroSection" (nodeId sBi83JN4c) came
 * through in full, plus live-site verification (see
 * `service-detail-data.ts` for how the data was confirmed).
 *
 * CONFIRMED:
 * - Section background `/Secondary text color` (-> `bg-secondary-text`,
 *   the same off-white/cream token used elsewhere), two columns: a
 *   white `Service Info` card (fixed-ish width, grows with content) and
 *   a wider text column (About/What's Included/Benefits/Real Results),
 *   40px gap between them, 25px section padding.
 * - Service Info card: white bg, 24px padding, 58px gap between the
 *   "Service Info" tag and the info rows, rounded corners. Each row is a
 *   label+icon on the left and a bold value on the right, separated by a
 *   5%-opacity 1px divider line (confirmed from Framer's data:
 *   `backgroundColor="/Black 100"` at `opacity="0.05"`).
 * - "Book now" button below the rows: solid tan fill
 *   (`rgb(138, 109, 80)`, this project's `/Primary color` token), white
 *   text, trailing arrow icon — confirmed against the live site's
 *   rendered button color.
 * - Right column: "About the service" (real per-service copy) ->
 *   "What's Included ?" (bulleted list) -> "Benefits" (check-circle list)
 *   -> "Real Results" (2-image grid, 350px tall, 16px gap, 12px radius).
 * - All 4 section headings ("Service Info"/"About the service"/"What's
 *   Included ?"/"Benefits"/"Real Results") render in this project's
 *   H6 serif style but ITALIC and in the tan `/Primary color`
 *   (`rgb(138, 109, 80)`) — confirmed against the live site (the
 *   existing `SectionTag` component elsewhere uses plain upright
 *   `primary-text`, which doesn't match here, so this is a local heading
 *   style rather than reusing that component).
 *
 * INFERRED:
 * - Benefits list text color/weight: live site shows a bold, slightly
 *   darker warm-brown than this project's default `primary-text` —
 *   approximated with `text-primary-text font-semibold`.
 * - "Book now"'s real href wasn't meaningful in Framer's raw data
 *   (literal "/"); pointed at `/contact` instead, matching every other
 *   "Book Now" CTA already built in this project.
 */

const SERVICE_INFO_ROWS = (
  info: typeof SERVICE_INFO_STATIC,
) => [
  { label: "Price", value: info.price, Icon: PriceIcon },
  { label: "Category", value: info.category, Icon: CategoryIcon },
  { label: "Duration", value: info.duration, Icon: DurationIcon },
  { label: "Includes", value: info.includes, Icon: IncludesIcon },
  { label: "Products", value: info.products, Icon: ProductsIcon },
  { label: "Availability", value: info.availability, Icon: AvailabilityIcon },
];

function PanelHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-h6 text-primary italic">{children}</h3>
  );
}

export function ServiceDetailPanel({ service }: { service: ServiceDetail }) {
  const rows = SERVICE_INFO_ROWS(SERVICE_INFO_STATIC);

  return (
    <section className="bg-secondary-text w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-8 lg:flex-row lg:gap-10">
        <div className="flex w-full flex-col items-start gap-8 rounded-[12px] bg-white p-6 md:p-8 lg:w-[380px] lg:shrink-0">
          <PanelHeading>Service Info</PanelHeading>

          <div className="flex w-full flex-col">
            {rows.map(({ label, value, Icon }, index) => (
              <div key={label}>
                <div className="flex w-full items-center justify-between py-3">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-body-16 text-primary-text">
                      {label}
                    </span>
                  </div>
                  <span className="text-body-16 text-primary-text font-semibold">
                    {value}
                  </span>
                </div>
                {index < rows.length - 1 && (
                  <div className="bg-black h-px w-full opacity-5" />
                )}
              </div>
            ))}
          </div>

          <Button
            href="/contact"
            default={{ text: "rgb(255, 255, 255)", bg: "rgb(138, 109, 80)" }}
            hover={{ text: "rgb(255, 255, 255)", bg: "rgb(83, 68, 62)" }}
          >
            Book now
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex w-full flex-col items-start gap-10 lg:flex-1">
          <div className="flex w-full flex-col items-start gap-3">
            <PanelHeading>About the service</PanelHeading>
            <p className="text-body-16 text-primary-text">{service.about}</p>
          </div>

          <div className="flex w-full flex-col items-start gap-3">
            <PanelHeading>What&apos;s Included ?</PanelHeading>
            <ul className="flex w-full flex-col">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="text-body-16 text-primary-text">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col items-start gap-3.5">
            <PanelHeading>Benefits</PanelHeading>
            <ul className="flex w-full flex-col items-start gap-4">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2.5 text-primary"
                >
                  <CheckCircleIcon className="h-5 w-5 shrink-0" />
                  <span className="text-body-16 text-primary-text font-semibold">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col items-start gap-3">
            <PanelHeading>Real Results</PanelHeading>
            <div className="grid w-full grid-cols-2 gap-4">
              {REAL_RESULTS_IMAGES.map((src) => (
                <div
                  key={src}
                  className="relative h-[350px] w-full overflow-hidden rounded-[12px]"
                >
                  <Image
                    src={src}
                    alt={`${service.title} — real result`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
