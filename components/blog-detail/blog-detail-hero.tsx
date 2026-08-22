import { EyebrowText } from "../eyebrow-text/eyebrow-text";

/**
 * BlogDetailHero
 *
 * Source: Framer project "aiir-salon-claude", individual blog post page
 * Desktop node (nodeId aQXFagLFP, you selected it on the canvas, example
 * item "What Should You Look for When Choosing a Luxury Salon?"), read
 * via getSelectedNodesXml — the page's "Header" section (nodeId
 * dhhhswZN9) came through in full.
 *
 * CONFIRMED:
 * - Full-width section, `height: 75vh`, dark overlay
 *   `rgba(83, 68, 62, 0.35)` — the same overlay already confirmed and
 *   reused on Services/About/the individual service page's own heroes.
 * - Content: the `EyebrowText` component directly (not the combined
 *   `Header` component used elsewhere — this page's hero has no
 *   secondary/line1 heading, just eyebrow + one title line), eyebrow
 *   "JOURNAL", confirmed off-white (`rgb(252, 247, 237)`).
 * - Title: a single heading, 60% width, centered, "/Headings/H2 sans"
 *   (-> `text-h2-sans`) — real per-post title (the CMS `title` field
 *   already confirmed in `components/blogs/blogs-data.ts`).
 *
 * INFERRED:
 * - The background photo per post: Framer's raw node data for this hero
 *   didn't carry a `backgroundImage` attribute in this read (unlike the
 *   individual service page, which did) — used each post's own real CMS
 *   thumbnail (`BLOG_POSTS[i].image`) as the hero backdrop, since that's
 *   the only real per-post photo available and it's consistent with how
 *   every other hero in this project uses a real, specific photo rather
 *   than a generic one.
 */

type BlogDetailHeroProps = {
  title: string;
  image: string;
};

export function BlogDetailHero({ title, image }: BlogDetailHeroProps) {
  return (
    <section className="relative flex h-[75vh] w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(83, 68, 62, 0.35)" }}
      />

      <div className="reveal relative z-[2] flex w-full flex-col items-center gap-3 px-6 md:px-8 lg:px-16">
        <EyebrowText variant="center" textColor="rgb(252, 247, 237)">
          JOURNAL
        </EyebrowText>
        <h1 className="reveal  reveal-delay-2 text-h3 text-balance w-full text-center text-white md:w-[80%] lg:w-[60%]">
          {title}
        </h1>
      </div>
    </section>
  );
}
