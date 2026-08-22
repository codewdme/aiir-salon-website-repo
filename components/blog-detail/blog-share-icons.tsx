import {
  FacebookLogo,
  InstagramLogo,
  PinterestLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BsFacebook, BsInstagram, BsPinterest } from "react-icons/bs";

/**
 * BlogShareIcons
 *
 * Source: Framer project "aiir-salon-claude", individual blog post page
 * Desktop node (nodeId aQXFagLFP), read via getSelectedNodesXml — the
 * sidebar's "Share" row (nodeId br8jfhNyS -> SocialIcons, nodeId
 * PMTwF9s25) came through in full: 3 instances of the already-confirmed
 * "Social icons" component (componentId Fdym5hEtd, the same one Footer
 * uses via `SocialIconLink` — variants tnXR9Gry7/WPbNUO09k/tF0Ii6xnn
 * already confirmed there as Instagram/Facebook/Pinterest).
 *
 * CONFIRMED:
 * - Same 3 platforms, same order, as Footer's icon row.
 * - Two real colors on every instance here: `rgb(138, 109, 80)` (this
 *   project's tan `/Primary color`) and `rgb(65, 19, 19)` (`/Black`,
 *   this project's dark accent) — unlike Footer's instances, which only
 *   ever exposed a single white color. Read as a default/hover pair
 *   (tan at rest, darker on hover), matching the same "tan default,
 *   darker on hover" treatment already established for every button and
 *   interactive accent elsewhere in this project — rather than reusing
 *   Footer's `SocialIconLink` (built only for a single fixed white
 *   color) which doesn't fit this two-color, light-card placement.
 *
 * INFERRED:
 * - None of the 3 instances carry an explicit `href` in Framer's data
 *   (unlike Footer's, which do point at Aiir Salon's real social
 *   profiles) — this row sits under a "Share" label next to a specific
 *   post, so it reads as "share THIS post" rather than "go to our
 *   profile." Wired up as real social share-intent links (Facebook's
 *   and Pinterest's official share-URL formats, using the post's own
 *   URL/title/image) rather than left as dead links. Instagram has no
 *   public web share-intent URL, so that icon links to Aiir Salon's own
 *   Instagram profile instead (same real URL already confirmed in
 *   Footer) as the closest real, working destination.
 */

type BlogShareIconsProps = {
  url: string;
  title: string;
  image: string;
};

const ICON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-white text-white transition-colors duration-200 hover:border-[rgb(65,19,19)] hover:text-[rgb(65,19,19)]";

export function BlogShareIcons({ url, title, image }: BlogShareIconsProps) {
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const pinterestHref = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`;
  const instagramHref = "https://www.instagram.com/aiirsalon?igsh=MWozZ2w3OW9jMjQycw==";

  return (
    <div className="flex items-center gap-2.5">
      <a
        href={instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Aiir Salon on Instagram"
        className={ICON_CLASS}
      >
        <BsInstagram size={18} />
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className={ICON_CLASS}
      >
        <BsFacebook size={18}  />
      </a>
      <a
        href={pinterestHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Pinterest"
        className={ICON_CLASS}
      >
        <BsPinterest size={18}  />
      </a>
    </div>
  );
}
