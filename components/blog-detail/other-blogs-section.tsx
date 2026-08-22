import { BlogCard } from "../blog-card/blog-card";
import { Header } from "../header/header";
import type { BlogPost } from "../blogs/blogs-data";

/**
 * OtherBlogsSection
 *
 * Source: Framer project "aiir-salon-claude", individual blog post page
 * Desktop node (nodeId aQXFagLFP), read via getSelectedNodesXml — the
 * "OtherBlogs" section (nodeId wLl4_DAwt) came through in full.
 *
 * CONFIRMED:
 * - `/Secondary BG` fill (-> `bg-secondary-bg`, this project's mid tan
 *   token), 140px vertical padding, Container maxWidth 1600px.
 * - Uses the already-built `Header` component: eyebrow "JOURNAL", line1
 *   "Thoughts worth,", line2 "Sitting with", both text/eyebrow color the
 *   confirmed off-white (`rgb(252, 247, 237)`) — explicit override
 *   (matches this project's established pattern of passing real colors
 *   directly rather than relying on `theme`, since this section's tan
 *   background isn't the usual light/dark case `Header`'s own default
 *   mapping expects).
 * - Grid of the already-built `BlogCard` (`variant="vertical"`, the same
 *   card used on `/blogs`), linking to `/blogs/:slug`.
 *
 * INFERRED:
 * - Framer's own data only ever exposed ONE example related-post card
 *   (CMS-bound list, same limitation as every other CMS list in this
 *   project) — renders the 3 most recent OTHER real posts (excluding
 *   the one currently being viewed) from `BLOG_POSTS`, a reasonable
 *   "you might also like" count matching the 3-column grid already used
 *   on `/blogs`, rather than guessing a different number.
 */

type OtherBlogsSectionProps = {
  posts: BlogPost[];
};

export function OtherBlogsSection({ posts }: OtherBlogsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16">
        <Header
          eyebrow="JOURNAL"
          line1="Thoughts worth, Sitting with"
          line2=""
          textColor="rgb(138, 109, 80)"
          eyebrowColor="rgb(138, 109, 80)"
        />

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              variant="vertical"
              href={`/blogs/${post.slug}`}
              image={post.image}
              category={post.category}
              title={post.title}
              date={new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              readTime={post.readTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
