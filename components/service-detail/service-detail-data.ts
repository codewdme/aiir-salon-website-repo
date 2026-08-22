import { SERVICES_HOME } from "../services-home/services-data";

/**
 * service-detail-data
 *
 * New file, created only for the individual/single service page — does
 * NOT modify `services-home/services-data.ts` (only imports `SERVICES_HOME`
 * from it, read-only, for the fields already confirmed real there: slug,
 * title, about copy, and hero photo).
 *
 * Source: Framer project "aiir-salon-claude", the individual service page
 * Desktop node (nodeId I6TLya5ax, example item "Pedicure"), read via
 * getSelectedNodesXml (you selected it on the canvas). That read only
 * ever exposes ONE example instance (Pedicure) because the real content
 * is CMS-bound — same limitation as every other CMS-driven list in this
 * project.
 *
 * CONFIRMED against the LIVE site (https://aiirsalon.framer.website/services/<slug>),
 * checked for all 10 real services (pedicure, manicure, facial, cleanup,
 * nail-art, bridal-makeup, haircut-styling, hair-spa, hair-colour,
 * hair-treatment) via the page's own rendered text:
 * - The "Service Info" panel's Price/Category/Duration/Includes/Products/
 *   Availability values are IDENTICAL on every single one of the 10 real
 *   service pages (Rs. 4000 / "Hair Cut" / "45 – 60 min" / "Free
 *   Consultation" / "Kérastase, Redken" / "Mon – Sat") — even for
 *   services where "Category: Hair Cut" or "Products: Kérastase, Redken"
 *   makes no real sense (e.g. Pedicure, Bridal Makeup). This isn't
 *   fabricated by this codebase — it's copied verbatim from what the
 *   live, published site actually shows today. It reads as an unfinished
 *   CMS field the client never customized per service, but reproducing
 *   the real site 1:1 means keeping it exactly as-is here (as static,
 *   shared values) rather than guessing more plausible per-service
 *   content that wouldn't match the live site.
 * - The "Real Results" 2-image grid at the bottom of the panel is ALSO
 *   the exact same 2 photo URLs on every one of the 10 real service
 *   pages (confirmed via fetching each page's HTML and diffing the image
 *   URLs) — kept here as shared/static for the same reason.
 * - `whatsIncluded` (the full 6-10 item bullet list) and `benefits` (the
 *   4-item list) DO vary per service and were pulled from each real
 *   page's own rendered text — real, per-service copy.
 * - `about`/`title`/`slug`/hero `image` are reused from `SERVICES_HOME`
 *   (already confirmed real there from the "Services by Aiir" CMS
 *   collection) rather than duplicated, so there's exactly one source of
 *   truth for that shared data.
 */

export type ServiceDetail = {
  slug: string;
  title: string;
  about: string;
  image: string;
  whatsIncluded: string[];
  benefits: string[];
};

// Confirmed identical across all 10 real live service pages — see note above.
export const SERVICE_INFO_STATIC = {
  price: "Rs. 4000",
  category: "Hair Cut",
  duration: "45 – 60 min",
  includes: "Free Consultation",
  products: "Kérastase, Redken",
  availability: "Mon – Sat",
};

// Confirmed identical across all 10 real live service pages — see note above.
export const REAL_RESULTS_IMAGES: [string, string] = [
  "https://framerusercontent.com/images/zFkSXVGitM0C0u3a6fHi495sXk.jpg",
  "https://framerusercontent.com/images/owrHbiZb5Nq5C3iwW9Ai63RytRc.jpg",
];

const WHATS_INCLUDED: Record<string, string[]> = {
  pedicure: [
    "Nail cleaning & shaping",
    "Cuticle care",
    "Foot soak",
    "Scrubbing & dead-skin removal",
    "Callus care",
    "Relaxing foot massage",
    "Moisturising",
    "Nail polish finish",
  ],
  manicure: [
    "Nail cleaning & shaping",
    "Cuticle care",
    "Hand soak",
    "Gentle exfoliation",
    "Dead-skin removal",
    "Relaxing hand massage",
    "Deep moisturisation",
    "Nail polish finish",
  ],
  facial: [
    "Deep cleansing",
    "Gentle exfoliation",
    "Blackhead & whitehead care",
    "Face massage",
    "Face mask",
    "Toner application",
    "Serum & moisturisation",
    "Sunscreen finish",
  ],
  cleanup: [
    "Face cleansing",
    "Gentle exfoliation",
    "Steam",
    "Blackhead & whitehead removal",
    "Face massage",
    "Face pack",
    "Toner",
    "Moisturisation",
  ],
  "nail-art": [
    "Basic Nail Art",
    "Gel Nail Art",
    "Custom Nail Designs",
    "Floral & Minimal Nail Art",
    "French Nail Art",
    "Glitter & Chrome Nails",
    "Stone & 3D Nail Art",
    "Bridal & Party Nail Art",
    "Trendy & Seasonal Designs",
    "Nail Extensions & Nail Art",
  ],
  "bridal-makeup": [
    "HD/Airbrush Makeup",
    "Skin Preparation",
    "Eye Makeup",
    "Contouring & Highlighting",
    "Lip Makeup",
    "Eyelashes",
    "Bridal Hairstyling",
    "Dupatta & Draping Setting",
  ],
  "haircut-styling": [
    "Hair consultation",
    "Hair wash",
    "Professional haircut",
    "Blow-dry & styling",
    "Hair finishing",
    "Basic hair care",
  ],
  "hair-spa": [
    "Hair & scalp cleansing",
    "Nourishing hair treatment",
    "Scalp massage",
    "Steam therapy",
    "Deep conditioning",
    "Hair wash",
    "Blow-dry finish",
  ],
  "hair-colour": [
    "Colour consultation",
    "Shade selection",
    "Hair sectioning & application",
    "Professional colour processing",
    "Hair wash",
    "Conditioning",
    "Blow-dry & finishing",
  ],
  "hair-treatment": [
    "Hair & scalp analysis",
    "Deep cleansing",
    "Treatment application",
    "Scalp massage",
    "Steam therapy",
    "Deep conditioning",
    "Hair wash",
    "Blow-dry finish",
  ],
};

const BENEFITS: Record<string, string[]> = {
  pedicure: [
    "Softer and smoother feet",
    "Refreshed skin",
    "Well-groomed nails",
    "A relaxing, pampering experience",
  ],
  manicure: [
    "Softer hands",
    "Healthy-looking nails",
    "Neat cuticles",
    "A polished, well-groomed look",
  ],
  facial: [
    "Removes impurities",
    "Improves skin texture",
    "Boosts hydration",
    "Leaves your skin looking fresh, healthy and glowing",
  ],
  cleanup: [
    "Cleaner pores",
    "Smoother skin",
    "Reduced dullness",
    "A fresh, rejuvenated look",
  ],
  "nail-art": [
    "Beautiful, well-groomed nails",
    "Stylish, creative designs",
    "A long-lasting finish",
    "A personalized look",
  ],
  "bridal-makeup": [
    "Long-lasting, flawless makeup",
    "Enhances your natural beauty",
    "Keeps you confident and gorgeous",
    "Perfect for your special day",
  ],
  "haircut-styling": [
    "Fresh & polished look",
    "Improved hair shape",
    "Better manageability",
    "A style that complements your overall appearance",
  ],
  "hair-spa": [
    "Helps reduce dryness and frizz",
    "Improves softness and shine",
    "Nourishes the scalp",
    "Leaves hair feeling smooth, healthy and rejuvenated",
  ],
  "hair-colour": [
    "Enhances your overall look",
    "Adds shine and dimension",
    "Refreshes dull hair",
    "Gives you a stylish, personalised finish",
  ],
  "hair-treatment": [
    "Helps improve dryness, frizz and roughness",
    "Restores moisture",
    "Enhances shine",
    "Leaves your hair softer, smoother and healthier-looking",
  ],
};

export const SERVICE_DETAILS: ServiceDetail[] = SERVICES_HOME.map((s) => ({
  slug: s.slug,
  title: s.title,
  about: s.about,
  image: s.image,
  whatsIncluded: WHATS_INCLUDED[s.slug] ?? [],
  benefits: BENEFITS[s.slug] ?? [],
}));

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
