import Image from "next/image";

/**
 * BlogContentBody
 *
 * Source: Framer project "aiir-salon-claude", individual blog post page
 * Desktop node (nodeId aQXFagLFP), read via getSelectedNodesXml — the
 * "Content" column (nodeId He8DZnm1C) came through in full: a rich-text
 * `Content` block (font Inter — this project standardizes on
 * Italiana/Montserrat, see INFERRED) followed by a single `Image` (368px
 * height, 14px radius).
 *
 * CONFIRMED:
 * - Column: max-width 700px, 32px gap between the body text and the
 *   image.
 * - The real body content is the CMS collection "Blogs"
 *   (collectionId JPM7O0QZa) `formattedText` field (see
 *   `blog-content-data.ts`) — real per-post rich text (headings,
 *   paragraphs, bold spans), not placeholder copy.
 * - The image below the body is that same CMS item's second real image
 *   field (distinct from the hero/thumbnail photo).
 *
 * INFERRED:
 * - Framer's node data set this text block's font to "Inter", but this
 *   project standardizes on only Italiana (headings) + Montserrat (body)
 *   per your earlier instruction — mapped the CMS HTML's `<h4>` tags to
 *   this project's `text-h5`/Italiana heading style and `<p>`/`<strong>`
 *   to `text-body-16`/Montserrat, via Tailwind's arbitrary child-element
 *   selectors on the wrapper (no new global CSS added, so no other page
 *   is affected).
 * - The CMS content is trusted, build-time content from your own Framer
 *   project (not user input), so it's rendered via
 *   `dangerouslySetInnerHTML` rather than a markdown/HTML parser
 *   dependency.
 */

type BlogContentBodyProps = {
  title: string;
  bodyHtml: string;
  bodyImage: string;
};

export function BlogContentBody({
  title,
  bodyHtml,
  bodyImage,
}: BlogContentBodyProps) {
  return (
    <div className="flex w-full flex-col items-center gap-8 lg:max-w-[700px] reveal reveal-delay-1">
      <div
        className={[
          "flex w-full flex-col gap-4",
          "[&_h4]:text-h5 [&_h4]:text-primary [&_h4]:mt-4",
          "[&_p]:text-body-16 [&_p]:text-primary-text",
          "[&_strong]:font-semibold [&_strong]:text-primary-text",
          "[&_a]:text-primary [&_a]:underline",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      {bodyImage && (
        <div className="relative h-[368px] w-full overflow-hidden rounded-[14px]">
          <Image
            src={bodyImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
