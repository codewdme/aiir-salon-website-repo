import { AboutHeaderSection } from "../../components/about/about-header";
import { AboutCommunitySection } from "../../components/about/about-community-section";
import { AboutCoreValuesSection } from "../../components/about/about-core-values";
import { AboutWhyAiirSection } from "../../components/about/about-why-aiir";
//finally
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
