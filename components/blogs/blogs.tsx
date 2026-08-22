"use client";

import { useState } from "react";
import { BlogCard } from "../blog-card/blog-card";
import { BlogTab } from "../blog-tabs/blog-tab";
import { BLOG_POSTS } from "./blogs-data";

/**
 * BlogsSection
 *
 * Source: Framer project "aiir-salon-claude", component "Blogs" (nodeId
 * BK9hC0frI, in the "Components" folder — this is the blog *listing*
 * page block, not an individual post page), read via
 * getSelectedNodesXml for Desktop ("DesktopTab1", full data), then the
 * nodeId-concatenation technique for Tablet/Phone (both came back
 * empty on every attempt — your screenshots were used to confirm their
 * responsive grid/tab-wrap behavior instead, see INFERRED).
 *
 * CONFIRMED:
 * - Outer container: backgroundColor rgba(255,255,255,1) (-> `bg-white`),
 *   padding 4px, gap 32px between the tab row and the post grid.
 * - Tab row: 5 tabs, real confirmed labels — "View All" (selected by
 *   default), "Beauty", "Nails", "Grooming", "Hair" — built with the
 *   already-existing `BlogTab` component.
 * - Post grid: gap 20px (both axes), 3 columns on Desktop (Framer's own
 *   `gridColumns="3"`).
 * - Each post uses the already-built `BlogCard` (`variant="vertical"`,
 *   Framer's own `variant="pp5iNQnEp"` maps to it), driven by
 *   title/date/readTime/category custom props on the instance —
 *   confirmed real values for post #2 directly from the section node;
 *   the rest of the real posts came from this project's Framer CMS
 *   collection (see blogs-data.ts's own header for that story).
 *
 * INFERRED:
 * - Tablet showed 2 grid columns and Phone showed 1 in your screenshots
 *   — Framer's own Tablet/Phone node data was unreadable (empty on
 *   every attempt), so the responsive grid below (`grid-cols-1
 *   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) is built to match
 *   what's visible in your screenshots rather than confirmed node data.
 * - The tab row's Framer data has an odd fixed 3-tab/2-tab split (a
 *   "Top" and "Bottom" sub-stack) rather than one wrapping row — but
 *   every one of your screenshots (Desktop, Tablet, Phone) shows
 *   exactly what a plain `flex-wrap` row would produce at each width,
 *   so used a single wrapping flex row instead of reproducing that
 *   fixed split, which would break at arbitrary screen widths a fixed
 *   split can't adapt to.
 * - Filtering by tab is implemented (matching each post's `category`
 *   field against the selected tab, "View All" always shows everything)
 *   even though every real post's category is currently "All" — so
 *   right now every tab except "View All" would show an empty grid.
 *   That's a real gap in the source content, not a bug here; the filter
 *   logic is ready for whenever posts get tagged into Beauty/Nails/
 *   Grooming/Hair.
 * - No pagination or "show more" was present in Framer's data for this
 *   grid (`gridRows="2"` on the Desktop instance suggests a 6-post cap,
 *   but nothing else confirms that) — this renders every matching post
 *   from `BLOG_POSTS` at once rather than guessing at a page size.
 */

const TABS = ["View All", "Beauty", "Nails", "Grooming", "Hair"];

export function BlogsSection() {
  const [activeTab, setActiveTab] = useState("View All");

  const posts =
    activeTab === "View All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeTab);

  return (
    <div className="mx-auto flex w-full max-w-[1072px] flex-col gap-8 rounded-xl bg-[rgb(255,255,255)] p-1 lg:p-16">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {TABS.map((tab) => (
          <BlogTab
            key={tab}
            selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </BlogTab>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
