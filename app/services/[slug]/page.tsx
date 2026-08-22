import { notFound } from "next/navigation";
import { ServiceDetailHero } from "../../../components/service-detail/service-detail-hero";
import { ServiceDetailPanel } from "../../../components/service-detail/service-detail-panel";
import { SERVICE_DETAILS, getServiceDetail } from "../../../components/service-detail/service-detail-data";

/**
 * Individual service page (`/services/[slug]`)
 *
 * New dynamic route, created only for this task — does not modify
 * `app/services/page.tsx`, `app/page.tsx`, `app/layout.tsx`, or any
 * other existing page/file. See `components/service-detail/` for the
 * new components/data this route uses.
 *
 * Source: Framer project "aiir-salon-claude", individual service page
 * Desktop node (nodeId I6TLya5ax, you selected it on the canvas,
 * example item "Pedicure"), read via getSelectedNodesXml: Header (hero)
 * -> HeroSection (Service Info card + About/What's Included/Benefits/
 * Real Results) -> Gallery -> [Footer implied].
 *
 * NavBar, Footer, the FAQ section, and Gallery come from the shared
 * `app/layout.tsx` (same as every other page) — this file only returns
 * the two service-specific sections (hero + info panel). The Framer
 * node's own trailing `Gallery` instance is intentionally NOT
 * duplicated here, since the shared layout already renders one on every
 * route.
 *
 * `generateStaticParams` pre-builds all 10 real slugs from
 * `SERVICE_DETAILS` (sourced from the confirmed-real "Services by Aiir"
 * CMS collection). An unknown slug renders Next's `notFound()` page
 * rather than guessing content.
 */

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceDetailHero title={service.title} image={service.image} />
      <ServiceDetailPanel service={service} />
    </>
  );
}
