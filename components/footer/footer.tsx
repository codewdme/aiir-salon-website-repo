import {
  
} from "react-icons";
import Image from "next/image";
import { BrandLogo, LOGO_RATIO, LOGO_SRC } from "../nav-bar/brand-logo";
import { Button } from "../buttons/button";
import { FooterMenuItem } from "./footer-menu-item";
import { SocialIconLink } from "./social-icon-link";
import { BsFacebook, BsInstagram, BsPinterest } from "react-icons/bs";
import { BiSolidMapPin } from "react-icons/bi";

/**
 * Footer
 *
 * Source: Framer project "aiir-salon-claude", component "Footer" (nodeId
 * G4GbwQc9n), read via getNodeXml on Desktop (h9NVXWq2a, fully readable),
 * then Tablet (ow5UCu7Oy) and Phone (kghIatlFc) via the nodeId
 * concatenation technique (their nested content wasn't returned on a
 * direct read — root+childId concatenation recovered layout data, though
 * not confirmed content, since Desktop/Tablet/Phone all reuse the same
 * instances).
 *
 * CONFIRMED:
 * - Desktop Container: bg "/Primary color", padding "100px 64px 231px 64px".
 * - Tablet Container: same bg, padding "80px 32px 288px 32px".
 * - Phone Container: same bg, padding "64px 24px 31px 24px", gap 8px.
 * - Desktop/Tablet "Top>Top" row: horizontal, space-between (gap 10px /
 *   40px respectively). Phone "Top>Top": vertical, gap 32px (brand block
 *   stacks above the nav/contact columns).
 * - Left column: gap 24px, width fit-content on Desktop, 100% on
 *   Tablet/Phone.
 * - BrandDetails: gap 11px — BrandLogo (variant="footer", width 126px)
 *   + paragraph text ("/Paragraph/Body 16 compact" -> text-body-16-compact),
 *   max-width 321.5px: "Experience Luxury Above. Hair | Beauty | Nails |
 *   Grooming" then "East Patel Nagar, New Delhi." (rendered as two blocks
 *   per your screenshot's visible paragraph break — the raw XML text was
 *   flattened into one string with no line-break markers).
 * - SocialIcons row: gap 12px, 4 platform icons (see social-icon-link.tsx
 *   for confirmed per-icon links/colors).
 * - "Book Your Experience" CTA: Button variant, href "/contact".
 * - FooterMenu: gap 64px between the two columns; each Menu: gap 10px
 *   (heading -> items), heading uses "/Headings/H6" (-> text-h6); each
 *   MenuItems list: gap 8px. Navigation column: Home(/), About Aiir
 *   (/about), Services (/services), Journal (/blogs), Contact Us
 *   (/contact). Contact column: "+91 97113 19369"
 *   (tel:+919711319369), "@email.com" (-> /contact — Framer links this
 *   label to the contact page, not a mailto:, kept as-is).
 * - Copyright row: gap 12px, centered; inner Content row at opacity 0.6,
 *   first item width 1fr (pushes the second item, "Created by Digital
 *   Fry", to the far right) — text style "/Paragraph/Body 14"
 *   (-> text-body-14).
 * - Giant background wordmark: same BrandLogo image, opacity 0.21,
 *   confirmed at 473px wide on Desktop only, bottom 20px, centered
 *   horizontally.
 *
 * INFERRED:
 * - Tablet/Phone watermark logo widths weren't in Framer's data (only
 *   Desktop's 473px came through) — scaled down proportionally for
 *   md/base breakpoints; treat as an estimate, not confirmed.
 * - The "Experience Luxury Above..." text's exact line-break points (a
 *   blank line before the address in your screenshot) are inferred from
 *   the screenshot, not from explicit line-break data in Framer's XML.
 */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Aiir", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

const CONTACT_LINKS = [
  { label: "+91 97113 19369", href: "tel:+919711319369" },
  { label: "support@aiir.salon", href: "/mailto:support@aiir.salon" },
];

const SOCIAL_LINKS = [
  {
    Icon: BsInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/aiirsalon?igsh=MWozZ2w3OW9jMjQycw==",
  },
  {
    Icon: BsFacebook,
    label: "Facebook",
    href: "https://share.google/YI0uCWHGUAPU66r3g",
  },
  {
    Icon: BsPinterest,
    label: "Pinterest",
    href: "https://in.pinterest.com/aiirsalon/aiir-luxury-salon/",
  },
  {
    Icon: BiSolidMapPin,
    label: "Location",
    href: "https://share.google/YI0uCWHGUAPU66r3g",
  },
];


export function Footer() {
  return (
    <footer className="relative bg-primary w-full z-0 overflow-hidden px-6 pt-16 pb-8 md:px-8 md:pt-20 md:pb-[288px] lg:px-16 lg:pt-[100px] lg:pb-[231px]">
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10 lg:gap-2.5">
        {/* Left: brand block */}
        <div className="flex w-full flex-col gap-6 lg:w-fit">
          <div className="flex flex-col items-start gap-[11px]">
            <BrandLogo variant="footer" width={126} />
            <div className="text-body-16-compact text-white max-w-[321.5px]">
              <p>
                Experience Luxury Above.
                <br />
                Hair | Beauty | Nails | Grooming
              </p>
              <p className="mt-5">East Patel Nagar, New Delhi.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <SocialIconLink key={social.label} {...social} />
            ))}
          </div>

          {/* NOTE: confirmed instance data (variant="primary",
              textColor rgb(255,255,255)). Button's default state was
              briefly (incorrectly) changed to a white fill based on a
              misread Framer node — verified live against the Framer site
              and reverted to the original transparent/outline look; see
              button.tsx's header for the full story. */}
          <Button
            href="/contact"
            default={{ text: "rgb(65, 19, 19)", bg: "rgb(255, 255, 255)" }}
            hover={{ text: "rgb(255, 255, 255)", bg: "rgb(65, 19, 19)" }}
          >
            Book Your Experience
          </Button>
        </div>

        {/* Right: nav + contact columns */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-2.5">
            <h6 className="text-h6 text-white">Navigation</h6>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <FooterMenuItem key={link.href} href={link.href}>
                  {link.label}
                </FooterMenuItem>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h6 className="text-h6 text-white">Contact</h6>
            <div className="flex flex-col gap-2">
              {CONTACT_LINKS.map((link) => (
                <FooterMenuItem key={link.href} href={link.href}>
                  {link.label}
                </FooterMenuItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-3 ">
        <div className="flex flex-col lg:flex-row w-full items-center  gap-3 opacity-60">
          <p className="text-body-14 text-white flex-1 text-left">
            © 2026 Aiir Salon. All rights reserved.
          </p>
          <a
            href="https://hxmzaehsan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-14 text-white shrink-0"
          >
            Created by Digital Fry
          </a>
        </div>
      </div>

      {/* Decorative watermark wordmark */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-1/2 w-[220px] -translate-x-1/2 opacity-[0.21] md:w-[360px] lg:w-[473px]"
      >
        <Image
          src={LOGO_SRC}
          alt=""
          width={473}
          height={Math.round(473 * LOGO_RATIO)}
          className="h-auto w-full"
        />
      </div> */}
    </footer>
  );
}
