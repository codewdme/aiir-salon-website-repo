import Image from "next/image";
import { Header } from "../../components/header/header";
import { ContactForm } from "../../components/contact/contact-form";
import { ContactDetails } from "../../components/contact/contact-details";

/**
 * Contact page
 *
 * Source: Framer project "aiir-salon-claude", page node afN_GnEcN
 * ("Desktop" breakpoint of the Contact page), read via
 * getSelectedNodesXml — came through in full for this breakpoint.
 * Assembles the already-built section components; see each one's own
 * file header for what's confirmed vs. inferred within it.
 *
 * CONFIRMED:
 * - Page order: hero image header -> ContactUs (form + details) -> FAQ
 *   section -> Gallery -> Footer.
 * - Hero: real background photo (confirmed URL — the same image used as
 *   one blog post's featured image elsewhere in this project), a dark
 *   overlay `rgba(84,69,63,0.46)`, theme="dark", eyebrow "LET'S CREATE
 *   YOUR AIIR EXPERIENCE", heading "Tell us what" / "you're looking for".
 *
 * UPDATE (bug fix, found by comparing localhost against the live Framer
 * site with framer-nextjs-visual-verify — not from re-reading node XML):
 * this hero was `h-[75vh]`, then at some point became `h-[85vh]` — either
 * way, both were wrong. The live site's hero measures a FIXED 450px
 * (confirmed via `getComputedStyle` on the actual rendered section, with
 * Framer's own scroll-entrance `scale()` transform accounted for), not a
 * viewport-relative height at all. On a typical ~900px-tall viewport,
 * 85vh (~765px) rendered nearly 2x taller than the real site, pushing the
 * whole page down. Fixed to the confirmed `h-[450px]`. Only checked at
 * desktop width — unconfirmed whether the live site changes this at
 * smaller breakpoints.
 * - ContactUs section: backgroundColor "/Primary BG", padding "140px 0",
 *   Container maxWidth 1600px padding "0 64px", inner Wrapper gap 32px —
 *   a sticky real photo on the left, `ContactForm` + `ContactDetails`
 *   stacked on the right (48% width on the confirmed Desktop canvas).
 *
 * UPDATE 2 (your instruction to share NavBar/Footer/FAQ/Gallery across
 * all pages): those 4 now live in the shared `app/layout.tsx` instead of
 * being duplicated here — this file only returns the Contact-specific
 * hero + form/details section.
 *
 * INFERRED:
 * - Framer's Wrapper used `width="48%"` for the ContactSection column on
 *   a 1200px-wide Desktop canvas — treated as a `lg:w-[48%]` cap rather
 *   than a literal percentage tied to that specific canvas width, since
 *   this page needs to work at arbitrary viewport widths.
 * - Only the Desktop breakpoint was read for this page — Tablet/Phone
 *   layout wasn't selected, so this page's responsive behavior below
 *   `lg` is a reasonable default (stacked columns, sticky disabled)
 *   rather than confirmed against real breakpoint data.
 */

const HERO_IMAGE =
  "https://framerusercontent.com/images/ZJ0qugPD9UbmEsIUSexQ5Ewg9CE.jpg";

const CONTACT_IMAGE =
  "https://framerusercontent.com/images/5TmknRa6DXD21ZZRLc7AGPzuKRg.jpg";

export default function ContactPage() {
  return (
    <>
      <section className="relative flex h-[450px] w-full items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Aiir Salon"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(84,69,63,0.46)]"
        />
        <div className="relative z-[1] px-6">
          <Header
            theme="dark"
            eyebrow="LET'S CREATE YOUR AIIR EXPERIENCE"
            line1="Tell us what you're looking for"
            line2=""
          />
        </div>
      </section>

      <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[140px]">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          <div className="top-16 h-[400px] w-full lg:sticky lg:h-[600px] lg:flex-1">
            {/* UPDATE (bug fix, found by framer-nextjs-visual-verify): the
                outer div had both `relative` (base) and `lg:sticky`
                (desktop) — at desktop width `sticky` wins, and Next.js's
                `<Image fill>` only accepts a parent computed to
                absolute/fixed/relative, so it warned in the console (image
                still rendered by luck, but this wasn't guaranteed). Split
                into an outer div that's purely responsible for the sticky
                scroll behavior and an inner `relative` wrapper that's
                purely the fill Image's positioning context. */}
            <div className="relative h-full w-full overflow-hidden rounded-[14px]">
              <Image
                src={CONTACT_IMAGE}
                alt="Aiir Salon"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-8 lg:w-[50%] lg:shrink-0">
            <ContactForm />
            <ContactDetails />
          </div>
        </div>
      </section>
    </>
  );
}
