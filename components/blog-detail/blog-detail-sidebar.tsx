import { BlogShareIcons } from "./blog-share-icons";

/**
 * BlogDetailSidebar
 *
 * Source: Framer project "aiir-salon-claude", individual blog post page
 * Desktop node (nodeId aQXFagLFP), read via getSelectedNodesXml — the
 * "LeftSide" panel (nodeId oGPGCoI__) came through in full.
 *
 * CONFIRMED:
 * - Sticky (`top: 50px`), 30% width, `/Secondary BG` fill (this
 *   project's mid tan token, -> `bg-secondary-bg`), 3px solid border in
 *   `/Secondary text color` (-> `border-secondary-text`), 14px radius,
 *   22px padding, 32px gap.
 * - "Insights" heading ("/Headings/H5" -> `text-h5`), then 5 stacked
 *   label/value rows (16px gap) — Category, Date of publish, Read time,
 *   Author, Share — each a small label ("/Paragraph/Body 18") above its
 *   value ("/Paragraph/Body 16", or the `BlogShareIcons` row for
 *   "Share").
 *
 * INFERRED:
 * - Neither the label nor value text nodes carried a color attribute in
 *   this read (the familiar "unset color" pattern elsewhere in this
 *   project) — this card's own confirmed `/Secondary BG` fill is a
 *   mid-tone tan, so `primary-text` (this project's default dark text)
 *   is used for both, consistent with every other "unset color on a
 *   light-enough surface" case handled elsewhere.
 *
 * UPDATE (bug fix, you flagged it from a phone screenshot): `sticky`
 * was applied unconditionally, so on phone widths — where this card
 * stacks above the article body instead of sitting beside it — it stuck
 * to the top of the viewport as you scrolled through the entire post,
 * overlapping the content below it. Sticky positioning only makes sense
 * in the side-by-side desktop layout. Changed to `relative` by default
 * and only `lg:sticky` at the breakpoint where this card actually sits
 * next to the content column (matching the existing `lg:w-[30%]`
 * side-by-side breakpoint already used here).
 */

type BlogDetailSidebarProps = {
  category: string;
  date: string;
  readTime: string;
  author: string;
  shareUrl: string;
  shareTitle: string;
  shareImage: string;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-1">
      <span className="text-body-18 text-white">{label}</span>
      <span className="text-body-16 text-white/60">{value}</span>
    </div>
  );
}

export function BlogDetailSidebar({
  category,
  date,
  readTime,
  author,
  shareUrl,
  shareTitle,
  shareImage,
}: BlogDetailSidebarProps) {
  return (
    <aside className="reveal reveal-delay-2 border-secondary-text bg-secondary-bg relative flex w-full flex-col items-start gap-8 rounded-[14px] border-[3px] p-[22px] lg:sticky lg:top-[50px] lg:w-[30%] lg:shrink-0">
      <h2 className="text-h3 text-white ">Insights</h2>

      <div className="flex w-full flex-col items-start gap-4">
        <Row label="Category" value={category} />
        <Row label="Date of publish" value={date} />
        <Row label="Read time" value={readTime} />
        <Row label="Author" value={author} />

        <div className="flex w-full flex-col gap-1">
          <span className="text-body-18 text-white">Share</span>
          <BlogShareIcons url={shareUrl} title={shareTitle} image={shareImage} />
        </div>
      </div>
    </aside>
  );
}
