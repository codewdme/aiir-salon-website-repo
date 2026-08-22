import { Header } from "../header/header";

/**
 * ServiceDetailHero
 *
 * Source: Framer project "aiir-salon-claude", individual service page
 * Desktop node (nodeId I6TLya5ax, example item "Pedicure"), read via
 * getSelectedNodesXml — the page's "Header" section (nodeId RAULE25gY)
 * came through in full.
 *
 * CONFIRMED:
 * - Full-width section, `height: 75vh`, per-service background image
 *   (real photo, same URL already confirmed on the Home/Services cards
 *   for this service — verified the live individual page uses the exact
 *   same hero photo per service, e.g. Pedicure's own photo, not a shared
 *   generic one), a dark overlay (`rgba(83, 68, 62, 0.35)`, full-bleed,
 *   zIndex 1) — same overlay pattern as the Services list page's own
 *   hero.
 * - Content is the shared `Header` component: eyebrow "OUR SERVICE"
 *   (singular — distinct from the Services list page's "OUR SERVICES"),
 *   line1 empty (`sgYca72wO=""`), line2 = the service title (e.g.
 *   "Pedicure"), both textColor/eyebrowColor the confirmed off-white
 *   (`rgb(252, 247, 237)`) — confirmed against the live site: the title
 *   renders in `Header`'s default italic serif treatment, centered.
 */

type ServiceDetailHeroProps = {
  title: string;
  image: string;
};

export function ServiceDetailHero({ title, image }: ServiceDetailHeroProps) {
  return (
    <section className="relative flex h-[75vh] w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(83, 68, 62, 0.35)" }}
      />

      <div className="relative z-[2] flex w-full justify-center px-6 md:px-8 lg:px-16">
        <Header
          theme="dark"
          textColor="rgb(252, 247, 237)"
          eyebrowColor="rgb(252, 247, 237)"
          eyebrow="OUR SERVICE"
          line1={title}
          line2=""
        />
      </div>
    </section>
  );
}
