import { BlogsHero } from "../../components/blogs/blogs-hero";
import { BlogsSection } from "../../components/blogs/blogs";

/**
 * Blogs (Journal) listing page — `/blogs`
 *
 * New page, created only for this task — does not modify
 * `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/page.tsx`,
 * `app/layout.tsx`, or any other existing page/file. The NavBar's
 * "Journal" link (`components/nav-bar/nav-bar.tsx`) already points at
 * `/blogs`, so this route was simply missing until now.
 *
 * Reuses `BlogsHero` (new, see that file) for the hero, and the
 * already-built `BlogsSection` (tabs + post grid, `components/blogs/blogs.tsx`)
 * for the listing itself — that component and its real CMS-sourced data
 * (`components/blogs/blogs-data.ts`, all 10 real posts) already existed
 * in this codebase and weren't changed.
 *
 * NavBar, Footer, the FAQ section, and Gallery come from the shared
 * `app/layout.tsx` (same as every other page) — this file only returns
 * the page-specific hero + listing section.
 *
 * CONFIRMED (from the live site, https://aiirsalon.framer.website/blogs):
 * - Below the hero, a cream section background (`bg-primary-bg`) with
 *   the same padding scale used elsewhere (`px-6 md:px-8 lg:px-16`,
 *   generous vertical padding) wraps `BlogsSection`'s own white rounded
 *   card — matches the live page's layout.
 */

export default function BlogsPage() {
  return (
    <>
      <BlogsHero />
      <section className="bg-primary-bg w-full px-6 py-16 md:px-8 lg:px-16 lg:py-[100px]">
        <BlogsSection />
      </section>
    </>
  );
}
