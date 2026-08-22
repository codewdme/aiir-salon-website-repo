import Image from "next/image";
import { ReadMore } from "../buttons/read-more";

/**
 * BlogCard
 *
 * Source: Framer project "aiir-salon-claude", component "Blog card"
 * (nodeId NdI9K0MK7, in the "Components" folder), read via
 * getSelectedNodesXml for the two "Vertical" states (default/hover, both
 * came through in full), then getNodeXml + the nodeId-concatenation
 * technique for "Horizontal desktop" and "Horizontal mobile" (both hit
 * Framer's character limit on the first pass).
 *
 * CONFIRMED:
 * - Two card shapes exist in Framer as 3 separate variants (Vertical,
 *   Horizontal desktop, Horizontal mobile), but Horizontal desktop and
 *   Horizontal mobile are the *same* card — same bg/radius/padding,
 *   only the internal stack direction changes (horizontal on desktop,
 *   vertical on mobile) — so they're combined here into one
 *   `variant="horizontal"` that switches direction responsively, rather
 *   than duplicating near-identical markup into two components.
 * - Vertical: no card background (sits directly on the page), image
 *   height 346px, borderRadius 12px on the image wrapper, padding
 *   "0 0 32px 0" (bottom only), gap 16px between image and text block,
 *   gap 24px inside the text block. Category label: "/Paragraph/Body
 *   14". Title: "/Headings/H6". Meta row (date + separator dot + read
 *   time): gap 12px, "/Paragraph/Body 16"; the separator is a tiny
 *   ~4x4px dot, backgroundColor "/Primary color" (-> `bg-primary`).
 *   Uses the already-built `ReadMore` (variant "Dark", nodeId
 *   SC4Qmsaep -> `variant="dark"`).
 * - Horizontal: backgroundColor "/Primary color" (-> `bg-primary`),
 *   borderRadius 12px, padding 16px, gap 32px between image and text.
 *   Desktop image height 420px, Mobile image height 350px — both full
 *   width of their column. Text block: `justify-between` so the title
 *   block sits at the top and `ReadMore` is pushed to the bottom (
 *   desktop had `gap-24`/`space-between`; mobile had a much larger
 *   `gap-64` between title and ReadMore instead of space-between —
 *   reproduced both). Uses `ReadMore` variant "Light" (nodeId
 *   mRMoqM2k4 -> `variant="light"`), matching white text against
 *   the brown fill.
 *
 * INFERRED:
 * - No text node in *any* variant had a color attribute set (the
 *   familiar "unset color" pattern) — for Vertical (no card fill, sits
 *   on the page background) used this project's default text tokens:
 *   category in `primary` (the tan/brown accent), title in
 *   `primary-text`, meta in `primary-text/60`. For Horizontal (brown
 *   card fill), used white throughout (category at reduced opacity,
 *   title full white, meta at reduced opacity) since that's what's
 *   actually legible against the brown background in your screenshot.
 * - Vertical's "Hover" state came through with identical structure/data
 *   to its default (no captured style difference) — added a subtle
 *   opacity fade on hover as a reasonable default for a clickable card,
 *   consistent with how hover was inferred elsewhere in this project
 *   (FaqItem, SocialMediaCard) when Framer's static data didn't carry
 *   one.
 * - No real image exists in Framer's data for any variant (the Vertical
 *   thumbnail in your screenshot is visibly a gray placeholder pattern,
 *   not a real photo) — `image` is a required prop with no built-in
 *   default, since a specific blog post's photo should always be passed
 *   in rather than defaulted to a stock placeholder.
 * - Neither the Vertical nor Horizontal top-level node has a `link`
 *   attribute in Framer's data — only the inner `ReadMore` instance is
 *   an actual link. So the card itself renders as a plain `div`, not an
 *   `<a>`; wrapping the whole card in a link would have nested an
 *   anchor inside `ReadMore`'s own anchor, which is invalid HTML. Pass
 *   `href` once and it flows to `ReadMore`.
 */

// UPDATE (per your instruction — site-wide fade-slide-in on first
// scroll into view, not from Framer data): `reveal` goes on the
// Vertical variant's outer card (no competing transition there). The
// Horizontal variant's outer card already has its own `transition-
// opacity duration-200 hover:opacity-90` — adding `reveal`'s transition
// there would silently replace that hover timing (same class of
// conflict documented in button.tsx), so `reveal` goes on its inner
// text block instead, which has no competing transition of its own.

type BlogCardProps = {
  variant?: "vertical" | "horizontal";
  href: string;
  image: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  className?: string;
};

export function BlogCard({
  variant = "vertical",
  href,
  image,
  category,
  title,
  date,
  readTime,
  className,
}: BlogCardProps) {
  if (variant === "horizontal") {
    return (
      <div
        className={[
          "group flex w-full flex-col gap-8 rounded-xl bg-primary p-4 transition-opacity duration-200 hover:opacity-90 md:flex-row",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="relative h-[350px] w-full overflow-hidden rounded-xl md:h-[420px] md:flex-1">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="reveal flex flex-1 flex-col justify-between gap-16 md:gap-6">
          <div className="flex flex-col  gap-1.5">
            <span className=" text-body-14 text-white/70 ">{category}</span>
            <h6 className="text-h6 text-white">{title}</h6>
            <div className="flex items-center gap-3">
              <span className="text-body-16 text-white/70">{date}</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-white/70"
              />
              <span className="text-body-16 text-white/70">{readTime}</span>
            </div>
          </div>
          <ReadMore href={href} variant="light" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "reveal group flex w-full flex-col gap-4 pb-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative h-[346px] w-full overflow-hidden rounded-xl transition-opacity duration-200 group-hover:opacity-80">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 344px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-left text-body-14 text-primary">{category}</span>
          <h6 className="text-h6 text-primary-text">{title}</h6>
          <div className="flex items-center gap-3">
            <span className="text-body-16 text-primary-text/60">{date}</span>
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full bg-primary"
            />
            <span className="text-body-16 text-primary-text/60">
              {readTime}
            </span>
          </div>
        </div>
        <ReadMore href={href} variant="dark" />
      </div>
    </div>
  );
}
