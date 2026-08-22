import Link from "next/link";
import type { ComponentType } from "react";

/**
 * SocialIconLink
 *
 * Source: Framer project "aiir-salon-claude", component "Social icons"
 * (nodeId Fdym5hEtd), used 4x in the Footer.
 *
 * CONFIRMED (from Framer node data):
 * - 4 variants used in the Footer, one per platform: Instagram
 *   (tnXR9Gry7), Facebook (WPbNUO09k), Pinterest (tF0Ii6xnn), MapPin
 *   (DEhLZILIq). Each: borderRadius 8px, padding 5px, containing a
 *   Phosphor icon (componentId tXVUikx) at 24x24, weight "fill".
 * - Icon color and a second color control both read rgb(252,247,237)
 *   (the `white`/off-white token) on every Footer instance.
 * - Per-instance links (confirmed from the Footer's Desktop data):
 *     Instagram -> https://www.instagram.com/aiirsalon?igsh=MWozZ2w3OW9jMjQycw==
 *     Pinterest -> https://in.pinterest.com/aiirsalon/aiir-luxury-salon/
 *     Facebook  -> https://share.google/YI0uCWHGUAPU66r3g
 *     MapPin    -> https://share.google/YI0uCWHGUAPU66r3g
 *   NOTE: Facebook and MapPin point at the exact same Google Maps share
 *   link in Framer's data — kept as-is rather than "fixed" silently,
 *   since it reads like a placeholder link on the Facebook icon that may
 *   need a real Facebook URL. Worth double-checking in Framer.
 *
 * Uses @phosphor-icons/react (added to package.json — run `npm install`)
 * to match Framer's own icon set exactly, per your call to install rather
 * than hand-draw approximations.
 */

type SocialIconLinkProps = {
  href: string;
  label: string;
  Icon: ComponentType<{ size?: number; weight?: string; className?: string }>;
};

export function SocialIconLink({ href, label, Icon }: SocialIconLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-white flex items-center justify-center rounded-lg border border-white p-[5px] transition-opacity duration-200 hover:opacity-80"
    >
      <Icon size={24} weight="fill" />
    </Link>
  );
}
