import Image from "next/image";
import Link from "next/link";

/**
 * BrandLogo
 *
 * Source: Framer project "aiir-salon-claude", component "Brand logo"
 * (nodeId SJuEn1y8c), read via getSelectedNodesXml / getNodeXml.
 *
 * CONFIRMED (from Framer node data):
 * - Fixed width 76px by default, height fit-content (intrinsic image ratio).
 *   The Nav bar's compact "PhoneClose" instance uses 53px wide / 37px tall
 *   instead -> exposed here as an overridable `width` prop.
 * - Wraps a single logo image, linked to "/".
 * - Two layout variants defined in Framer as separate component variants:
 *     - "NavBarLogo": stackAlignment = center   -> variant="navbar"
 *     - "FooterLogo": stackAlignment = start    -> variant="footer"
 * - Each layout variant also has an opacity-0.6 counterpart in Framer
 *   (nodeIds FO6nZckbv / op2rHewFQ) -> exposed here as the `muted` prop.
 * - Logo image: https://framerusercontent.com/images/xJqLTKFOO3uaEb4cVrMD0f0KK4c.png
 *   Natural size confirmed live (via browser fetch, not guessed): 5784 x 4256px
 *   (intrinsic ratio ~0.7357), since Framer's node XML doesn't expose raw
 *   pixel dimensions for background-image nodes.
 *
 * INFERRED:
 * - The exact trigger for the `muted` (opacity 0.6) state wasn't visible in
 *   the selection (no hover/scroll state data came through) — wiring it up
 *   to the right condition (e.g. scroll-triggered nav, hover) is left to
 *   whoever assembles the parent "Nav bar" / "Footer" component.
 */

export const LOGO_SRC =
  "https://framerusercontent.com/images/xJqLTKFOO3uaEb4cVrMD0f0KK4c.png";
export const LOGO_RATIO = 4256 / 5784;

type BrandLogoProps = {
  variant?: "navbar" | "footer";
  muted?: boolean;
  width?: number;
  className?: string;
};

export function BrandLogo({
  variant = "navbar",
  muted = false,
  width = 76,
  className,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      style={{ width }}
      className={[
        "flex flex-col gap-2.5",
        variant === "footer" ? "items-start" : "items-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={[
          "flex w-full items-center justify-center",
          muted ? "opacity-60" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Image
          src={LOGO_SRC}
          alt="AIIR Salon"
          width={width}
          height={Math.round(width * LOGO_RATIO)}
          className="h-auto w-full"
          priority
        />
      </span>
    </Link>
  );
}
