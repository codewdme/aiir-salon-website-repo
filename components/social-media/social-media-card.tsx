import Image from "next/image";

/**
 * SocialMediaCard
 *
 * Source: Framer project "aiir-salon-claude", component "Social media"
 * (nodeId WbQEp3OQu, in the "Components" folder — distinct from the
 * Footer's small icon links, which use "Social icons"/Fdym5hEtd), read
 * via getSelectedNodesXml (2 of 2 states: default and hover both came
 * through in full).
 *
 * CONFIRMED:
 * - Card: 141.5x200px, borderRadius 14px, overflow clip, linkOpenInNewTab
 *   true (-> target="_blank").
 * - Image fills the card (1fr x 1fr).
 * - Default state: a tint overlay sits on top of the image,
 *   backgroundColor rgba(83, 68, 62, 0.4) — not a project token, used as
 *   -is (close to, but not exactly, the `primary-text` token at 40%).
 * - Hover state: the overlay is gone entirely (not just faded — the
 *   hover variant's data has no Overlay child at all), leaving the photo
 *   fully clear. Reproduced as `opacity-0` on hover via a transition
 *   rather than removing the node, so it animates instead of popping.
 * - "Instagram" label: "/Paragraph/Eyebrow text" (-> `text-eyebrow`),
 *   sits above the overlay (zIndex 1) in both states, centered.
 *
 * INFERRED:
 * - No image URL exists anywhere in Framer's data for this component
 *   (same gap as the Testimonial client photos) — per your call, using a
 *   stock salon/beauty placeholder photo as the default, swappable via
 *   the `image` prop.
 * - Label text color isn't set in Framer's data — used white, since it
 *   needs to read against a photo background in both states (matches
 *   the look in your screenshot).
 * - `href` defaults to the salon's real Instagram profile (the same URL
 *   already confirmed and used in Footer's SocialIconLink), since this
 *   card is explicitly an Instagram card — override per-instance if a
 *   specific post URL is needed instead of the profile link.
 *
 * UPDATE (once a real usage appeared — Contact page's ContactDetails
 * needs this to fill a grid cell, not the confirmed instance's fixed
 * 141.5px width): sizing moved out of the hardcoded base classes into
 * `className`'s own default value, so passing a different `className`
 * fully replaces the size instead of fighting it in the generated
 * stylesheet — same fix as CoreValuesCard and FormButton, for the same
 * reason.
 */

const DEFAULT_INSTAGRAM_URL =
  "https://www.instagram.com/aiirsalon?igsh=MWozZ2w3OW9jMjQycw==";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80";

type SocialMediaCardProps = {
  href?: string;
  image?: string;
  label?: string;
  className?: string;
};

export function SocialMediaCard({
  href = DEFAULT_INSTAGRAM_URL,
  image = DEFAULT_IMAGE,
  label = "Instagram",
  className = "h-[200px] w-[141.5px] shrink-0",
}: SocialMediaCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group relative block overflow-hidden rounded-[14px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image src={image} alt={label} fill sizes="142px" className="object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[rgba(83,68,62,0.4)] transition-opacity duration-300 group-hover:opacity-0"
      />
      <span className="text-eyebrow absolute inset-0 z-[1] flex items-center justify-center text-white">
        {label}
      </span>
    </a>
  );
}
