import Link from "next/link";

/**
 * FooterMenuItem
 *
 * Source: Framer project "aiir-salon-claude", component "Footer menu item"
 * (nodeId kEUlIEDij), used throughout the Footer's Navigation/Contact
 * columns.
 *
 * CONFIRMED (from every instance in the Footer's Desktop data): each
 * instance is a plain text link, fixed row height 26px, driven by a
 * label + href custom prop pair per instance (e.g. "Home" -> "/",
 * "+91 97113 19369" -> "tel:+919711319369").
 *
 * INFERRED — same as Button, Framer returned "Node is not a text node" on
 * every getNodeXml attempt for this component's internals, so the exact
 * text style/color/hover treatment aren't confirmed from Framer data.
 * Used the "/Paragraph/Body 16" text style (-> `text-body-16`) in the
 * off-white `white` token with a subtle hover-opacity change, matching
 * the footer screenshot.
 */

type FooterMenuItemProps = {
  href: string;
  children: string;
};

export function FooterMenuItem({ href, children }: FooterMenuItemProps) {
  return (
    <Link
      href={href}
      className="text-body-16 text-white flex h-[26px] items-center opacity-90 transition-opacity duration-200 hover:opacity-100"
    >
      {children}
    </Link>
  );
}
