import type { Metadata } from "next";
import { Italiana, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NavBar } from "../components/nav-bar/nav-bar";
import { FooterReveal } from "../components/footer/footer-reveal";
import { ContactFaq } from "../components/contact/contact-faq";
import { Gallery } from "../components/gallery/gallery";
import { RevealObserver } from "../components/scroll-reveal/reveal-observer";

// Per your instruction ("use only montserrat everywhere for now and the
// other font for heading"), this project now loads just 2 font
// families: Italiana for headings, Montserrat for everything else
// (body text, eyebrow labels, buttons — previously split across
// Montserrat + Instrument Sans). Instrument Sans has been dropped;
// weight 600 added here to cover what it was standing in for (Form
// button's Success/Error states) and the "Eyebrow text" style (500).
const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// UPDATE (per your instruction — add meta tags across every page): this
// was still the unedited create-next-app boilerplate. Replaced with real
// site-wide defaults every other page's metadata falls back to or
// extends via the `%s | Aiir Salon` title template.
//
// `metadataBase` is set to `https://aiir.salon` — inferred from the real
// business email you gave for the contact route (`hello@aiir.salon`),
// not confirmed as the live production domain. Next.js needs an absolute
// base to resolve every page's relative Open Graph/canonical URLs into
// real absolute ones; if the real domain ends up different, this is the
// one place to change it and every page updates automatically.
//
// UPDATE (per your instruction — set up the favicon, using the reference
// `layout.tsx` you shared for the `icons` shape): the 7 files you
// connected from `assets-raw/aiir-salon-favicon` are the standard
// RealFaviconGenerator output set (favicon.ico, favicon.svg,
// favicon-96x96.png, apple-touch-icon.png, web-app-manifest-192x192.png,
// web-app-manifest-512x512.png, site.webmanifest — the manifest's own
// `name`/`short_name` were already confirmed real, "Aiir Salon"), copied
// as-is into `public/`. Your reference project only had a light/dark
// pair of 32x32 PNGs + an SVG + an Apple icon; this set is a superset of
// that (adds a real `.ico` fallback for older browsers/search engines,
// a manifest for Android "Add to Home Screen", and larger maskable PNGs)
// — no light/dark variants were generated for this project, so `icon`
// only lists the SVG (scales to any size, used by modern browsers) and
// the 96x96 PNG (a fallback for browsers that don't support SVG
// favicons), same 2-icon-array shape as your reference otherwise.
export const metadata: Metadata = {
  metadataBase: new URL("https://aiir.salon"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  title: {
    default: "Aiir Salon | Luxury Hair, Beauty, Nails & Grooming in New Delhi",
    template: "%s | Aiir Salon",
  },
  description:
    "Aiir Salon is a luxury hair, beauty, nails and grooming salon in East Patel Nagar, New Delhi. Book a personalised, premium salon experience today.",
  keywords: [
    "Aiir Salon",
    "luxury salon New Delhi",
    "hair salon East Patel Nagar",
    "beauty salon Delhi",
    "nail salon Delhi",
    "grooming salon Delhi",
    "bridal makeup Delhi",
    "hair spa Delhi",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Aiir Salon",
    title: "Aiir Salon | Luxury Hair, Beauty, Nails & Grooming in New Delhi",
    description:
      "Aiir Salon is a luxury hair, beauty, nails and grooming salon in East Patel Nagar, New Delhi. Book a personalised, premium salon experience today.",
    images: [
      {
        url: "https://framerusercontent.com/images/CPYY10s4KHEnWuBPj1yEiTid5g.jpg",
        alt: "Aiir Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiir Salon | Luxury Hair, Beauty, Nails & Grooming in New Delhi",
    description:
      "Aiir Salon is a luxury hair, beauty, nails and grooming salon in East Patel Nagar, New Delhi. Book a personalised, premium salon experience today.",
    images: [
      "https://framerusercontent.com/images/CPYY10s4KHEnWuBPj1yEiTid5g.jpg",
    ],
  },
};

/**
 * Root layout
 *
 * UPDATE (your instruction: "create a recursive layout layer inside
 * which all pages' main resides, the FAQs and gallery always stay the
 * same at every page anyways, and so does the navbar and footer"):
 * NavBar, Footer, the FAQ section (`ContactFaq`), and `Gallery` were
 * previously copy-pasted into every page file (Home, Contact, and About
 * was about to need its own copies too) — pulled up here instead, since
 * all 4 are identical on every page built so far. This is the standard
 * Next.js App Router pattern: everything in `app/layout.tsx` wraps every
 * route beneath it in the tree, and React doesn't remount shared layout
 * elements across client-side navigations between sibling routes (Home
 * `/`, `/about`, `/contact` all sit directly under this one root layout).
 *
 * Each page.tsx now only returns its own page-specific section content
 * — no more NavBar/Footer/<main>/ContactFaq/Gallery duplicated in
 * app/page.tsx, app/contact/page.tsx, or app/about/page.tsx. That
 * content renders as `{children}` inside the shared <main>, immediately
 * followed by the shared FAQ + Gallery, matching every confirmed page's
 * real Framer order (page content -> FAQs -> Gallery -> Footer).
 *
 * UPDATE (per your report comparing this to the live Framer site: "the
 * footer is kind of fixed at the bottom... everything else scrolling on
 * top of it... when the last section scrolls, the footer... gets
 * revealed"): the live site pins its footer with `position: sticky` in
 * a wrapper that overlaps the end of the main content, so the last
 * section visually scrolls over a footer that's already sitting fixed
 * underneath. Reproduced here by wrapping everything except the footer
 * (NavBar + main content) in a `relative z-10` layer — so it paints on
 * top — ending with a spacer `div` exactly as tall as the footer
 * (height read from the `--footer-height` custom property, which
 * `FooterReveal` measures live and keeps in sync with the footer's
 * actual rendered height at every breakpoint). The footer itself
 * (`FooterReveal`) is `fixed bottom-0 z-0`, behind that layer, with no
 * space of its own in the document flow. Scrolling through the spacer's
 * height is what reveals it. See `components/footer/footer-reveal.tsx`
 * for the full reasoning.
 *
 * UPDATE (per your instruction — "add a smooth fade in effect for every
 * text and buttons... which only fade slide in once they appear in
 * viewport", without changing structure): `RevealObserver` mounts here
 * once, alongside NavBar/Footer. It renders nothing itself — it just
 * runs a shared IntersectionObserver over every element elsewhere in
 * the app carrying the plain `reveal` className (see globals.css and
 * `components/scroll-reveal/reveal-observer.tsx` for the full
 * reasoning on why this is a class + observer, not a wrapper
 * component).
 *
 * UPDATE (bug fix — "I can't touch any links or icons on the footer"):
 * the trailing spacer div (which reserves scroll height so the fixed,
 * lower-z-index footer can reveal underneath) was invisible but still
 * hit-testable — since it sits in this `z-10` layer directly above the
 * footer's `z-0` layer, it (or, once it alone was set to
 * `pointer-events-none`, its own parent wrapper, which occupies that
 * same page area) was the actual element under the cursor everywhere
 * the footer visually shows, intercepting every click before it reached
 * the footer's real links/icons. Fixed by making the whole outer
 * wrapper `pointer-events-none` and re-enabling `pointer-events-auto`
 * only on the inner NavBar+main block — so the real interactive content
 * still works exactly as before, while the trailing empty area (and the
 * spacer within it) now transparently passes clicks through to the
 * footer beneath. No visual or layout change; confirmed live via
 * `elementFromPoint` on the footer's nav link and social icon.
 *
 * UPDATE (per your instruction — install the Google tag, GA4 property
 * G-5B2J79PQPQ): Google's own snippet is raw `<script>` tags meant to go
 * "immediately after <head>", but this is a Next.js App Router project —
 * pasting raw `<script>` tags directly would fight Next's own script
 * loading/dedup and lose its optimizations. Used `next/script`'s
 * `Script` component instead (the Next-recommended way to load 3rd-party
 * scripts like gtag.js), added to an explicit `<head>` here so it still
 * loads sitewide, on every route, exactly once — the same effective
 * result Google's instructions ask for, just through Next's supported
 * mechanism. `strategy="afterInteractive"` loads it right after the page
 * becomes interactive, the strategy Next's own docs recommend for
 * Google Analytics (early enough to catch pageviews, without blocking
 * initial render like a plain synchronous script would).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5B2J79PQPQ"
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5B2J79PQPQ');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <div className="relative z-10 flex flex-col pointer-events-none">
          <div className="pointer-events-auto flex flex-col">
            <NavBar />

            <main className="flex flex-col">
              {children}
              <ContactFaq />
              <Gallery />
            </main>
          </div>

          <div
            aria-hidden="true"
            style={{ height: "var(--footer-height, 0px)" }}
          />
        </div>

        <FooterReveal />
        <RevealObserver />
      </body>
    </html>
  );
}
