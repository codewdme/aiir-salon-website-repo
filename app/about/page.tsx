import type { Metadata } from "next";
import { AboutHeaderSection } from "../../components/about/about-header";
import { AboutCommunitySection } from "../../components/about/about-community-section";
import { AboutCoreValuesSection } from "../../components/about/about-core-values";
import { AboutWhyAiirSection } from "../../components/about/about-why-aiir";

//update meta tag

// UPDATE (per your instruction — add meta tags across every page):
// description text draws on this page's own real confirmed content
// ("A Community of Creatives. United by Beauty.", the OUR STORY hero) —
// the OG image reuses this page's own confirmed hero background photo.
const ABOUT_TITLE = "About Us";
const ABOUT_DESCRIPTION =
  "Discover the story, community and core values behind Aiir Salon — a luxury hair, beauty, nails and grooming destination in East Patel Nagar, New Delhi.";
const ABOUT_IMAGE =
  "/about-page-hero-image.jpg";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: `${ABOUT_TITLE} | Aiir Salon`,
    description: ABOUT_DESCRIPTION,
    images: [{ url: ABOUT_IMAGE, alt: "Aiir Salon" }],
  },
};

/**
 * About page
 *
 * Source: Framer project "aiir-salon-claude", About page Desktop node
 * (nodeId NvA_e7aHR), read via getNodeXml — full page structure confirmed
 * in one read: Header -> AboutSection ("A Community of Creatives...") ->
 * CoreValues -> Metrics ("WHY AIIR") -> FaQs -> Gallery -> Footer.
 *
 * Header, AboutSection (built as `AboutCommunitySection`), CoreValues
 * (built as `AboutCoreValuesSection`), and the "WHY AIIR" Metrics grid
 * (built as `AboutWhyAiirSection`) are the About-specific content built
 * so far.
 *
 * UPDATE (your instruction to share NavBar/Footer/FAQ/Gallery across all
 * pages): NavBar, Footer, the FAQ section, and Gallery now come from the
 * shared `app/layout.tsx` — this page no longer needs its own FAQ/
 * Gallery build, since About's confirmed page order (FaQs -> Gallery ->
 * Footer, right after this content) already matches what the shared
 * layout appends automatically. This file only returns the sections
 * unique to About.
 */

export default function About() {
  return (
    <>
      <AboutHeaderSection />
      <AboutCommunitySection />
      <AboutCoreValuesSection />
      <AboutWhyAiirSection />
    </>
  );
}
