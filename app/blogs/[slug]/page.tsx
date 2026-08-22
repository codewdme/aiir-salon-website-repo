import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../../../components/blogs/blogs-data";
import { BLOG_CONTENT } from "../../../components/blog-detail/blog-content-data";
import { BlogDetailHero } from "../../../components/blog-detail/blog-detail-hero";
import { BlogDetailSidebar } from "../../../components/blog-detail/blog-detail-sidebar";
import { BlogContentBody } from "../../../components/blog-detail/blog-content-body";
import { OtherBlogsSection } from "../../../components/blog-detail/other-blogs-section";

// UPDATE (per your instruction — add meta tags across every page): no
// post has a dedicated excerpt field in `blogs-data.ts`, so the
// description is derived from the post's own real `bodyHtml` (tags
// stripped, collapsed to plain text, truncated to a clean word boundary
// under ~155 chars) rather than inventing new copy. OG image reuses the
// post's own real confirmed featured photo.
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const content = BLOG_CONTENT[slug];
  if (!post || !content) return {};

  const description = truncate(stripHtml(content.bodyHtml), 155);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: "article",
      url: `/blogs/${slug}`,
      title: `${post.title} | Aiir Salon`,
      description,
      publishedTime: post.date,
      authors: [content.author],
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

/**
 * Individual blog post page (`/blogs/[slug]`)
 *
 * New dynamic route, created only for this task — does not modify
 * `app/blogs/page.tsx`, `app/services/page.tsx`,
 * `app/services/[slug]/page.tsx`, `app/layout.tsx`, or any other
 * existing page/file. See `components/blog-detail/` for the new
 * components/data this route uses.
 *
 * Source: Framer project "aiir-salon-claude", individual blog post page
 * Desktop node (nodeId aQXFagLFP, you selected it on the canvas, example
 * item "What Should You Look for When Choosing a Luxury Salon?"), read
 * via getSelectedNodesXml: Header (hero) -> BlogDetail (sidebar +
 * content) -> OtherBlogs -> Gallery -> [Footer implied].
 *
 * NavBar, Footer, the FAQ section, and Gallery come from the shared
 * `app/layout.tsx` (same as every other page) — this file only returns
 * the 3 post-specific sections. The Framer node's own trailing `Gallery`
 * instance is intentionally NOT duplicated here, same reasoning already
 * used on the individual service page.
 *
 * `generateStaticParams` pre-builds all 10 real slugs from `BLOG_POSTS`
 * (sourced from the confirmed-real "Blogs" CMS collection). An unknown
 * slug renders Next's `notFound()` page rather than guessing content.
 *
 * The share links in the sidebar need a real, absolute URL for this
 * specific post — rather than fabricating a production domain that
 * hasn't been confirmed yet, this reads the actual request host (via
 * `next/headers`) at request time, so it's always correct wherever this
 * is actually running (localhost during development, or the real domain
 * once deployed).
 */

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const content = BLOG_CONTENT[slug];

  if (!post || !content) {
    notFound();
  }

  const headerList = await headers();
  const host = headerList.get("host") ?? "aiirsalon.framer.website";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const shareUrl = `${protocol}://${host}/blogs/${slug}`;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <BlogDetailHero title={post.title} image={post.image} />

      <section className="bg-white w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[100px]">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-10 lg:flex-row lg:justify-between">
          <BlogDetailSidebar
            category={post.category}
            date={formattedDate}
            readTime={post.readTime}
            author={content.author}
            shareUrl={shareUrl}
            shareTitle={post.title}
            shareImage={post.image}
          />
          <BlogContentBody
            title={post.title}
            bodyHtml={content.bodyHtml}
            bodyImage={content.bodyImage}
          />
        </div>
      </section>

      <OtherBlogsSection posts={otherPosts} />
    </>
  );
}
