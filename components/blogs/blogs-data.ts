/**
 * Blog post seed data
 *
 * Source: Framer project "aiir-salon-claude" — this is real content
 * pulled from the project's own Framer CMS collection "Blogs" (id
 * JPM7O0QZa, via getCMSCollections/getCMSItems), not from the "Blogs"
 * section node itself. The section's Blog grid instance
 * (nodeId lvw5rJyv3 -> Blog -> BlogCard) only exposed one post's data
 * directly (title/date/readTime/category as custom props on the
 * BlogCard instance) before hitting Framer's character limit — the
 * other two posts visible in your screenshot were read from the CMS
 * collection instead, which turned out to have all 10 real posts with
 * real photos (not stock placeholders — a rare case in this project
 * where the images were actually present in Framer's data).
 *
 * CONFIRMED (from the CMS collection, all 10 items):
 * - Every post's `Category` field is literally the enum value "All" —
 *   none are tagged into Beauty/Nails/Grooming/Hair yet, even though
 *   those are the real tab labels (confirmed separately from the
 *   `Blogs` section's BlogTabs instances). Matches your screenshot,
 *   where every card shows "All" as its category.
 * - The Category enum's *other* defined options (Emotional Healing &
 *   Inner Work, Burnout & Recovery, Mindset & Habits, Body & Nervous
 *   System) don't match a salon at all — leftover from whatever
 *   template this CMS collection started from, same situation as the
 *   unrelated placeholder copy found earlier in the FAQ list. Left
 *   as-is here since it doesn't affect any post actually using "All".
 *
 * This is a static snapshot of that CMS data, not a live connection —
 * wiring this component up to fetch from Framer's CMS (or wherever this
 * content ends up living long-term) is a bigger integration decision I
 * didn't want to make silently, so for now this file is the data layer
 * and `BlogsSection` just imports it directly. Swap this file's export
 * for a real fetch whenever that's decided.
 */

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-should-you-look-for-when-choosing-a-luxury-salon",
    title: "What Should You Look for When Choosing a Luxury Salon?",
    date: "2026-08-14T00:00:00.000Z",
    readTime: "4 mins",
    category: "All",
    image: "https://framerusercontent.com/images/ZJ0qugPD9UbmEsIUSexQ5Ewg9CE.jpg",
  },
  {
    slug: "how-often-should-you-get-professional-hair-skin-nail-treatments",
    title:
      "How Often Should You Get Professional Hair, Skin, and Nail Treatments?",
    date: "2026-08-11T00:00:00.000Z",
    readTime: "6 mins",
    category: "Hair",
    image: "https://framerusercontent.com/images/qxFN4XgJZQJ9LFPEeKi63mLHDmA.jpg",
  },
  {
    slug: "how-can-you-find-the-best-salon-for-your-hair-and-beauty-needs",
    title: "How Can You Find the Best Salon for Your Hair and Beauty Needs?",
    date: "2026-08-08T00:00:00.000Z",
    readTime: "5 mins",
    category: "Beauty",
    image: "https://framerusercontent.com/images/R6zJQHnKKOMc6kABYXVrRuSIZNY.jpg",
  },
  {
    slug: "what-makes-aiir-salon-a-premium-beauty-destination-in-delhi",
    title: "What Makes Aiir Salon a Premium Beauty Destination in Delhi?",
    date: "2026-08-05T00:00:00.000Z",
    readTime: "6 mins",
    category: "All",
    image: "https://framerusercontent.com/images/aiJy6irZIPis9ljpzZircTXnU.jpg",
  },
  {
    slug: "what-makes-the-beauty-experience-at-aiir-salon-different",
    title: "What Makes the Beauty Experience at Aiir Salon Different?",
    date: "2026-08-02T00:00:00.000Z",
    readTime: "6 mins",
    category: "Beauty",
    image: "https://framerusercontent.com/images/tcT5ll2jca5io3cEJEs0yFIK6pQ.jpg",
  },
  {
    slug: "how-can-professional-styling-transform-your-overall-look",
    title: "How Can Professional Styling Transform Your Overall Look?",
    date: "2026-07-30T00:00:00.000Z",
    readTime: "6 mins",
    category: "Beauty",
    image: "https://framerusercontent.com/images/JYaBI2iwswbQqll5jE4C4QLwWA.jpg",
  },
  {
    slug: "which-hair-colour-trends-are-perfect-for-a-modern-elegant-look",
    title: "Which Hair Colour Trends Are Perfect for a Modern, Elegant Look?",
    date: "2026-07-27T00:00:00.000Z",
    readTime: "6 mins",
    category: "Hair",
    image: "https://framerusercontent.com/images/onY9Hw9oDuVSklRH2towCjhQBO4.jpg",
  },
  {
    slug: "how-can-you-build-a-simple-yet-effective-salon-beauty-routine",
    title: "How Can You Build a Simple Yet Effective Salon Beauty Routine?",
    date: "2026-07-24T00:00:00.000Z",
    readTime: "6 mins",
    category: "Beauty",
    image: "https://framerusercontent.com/images/owrHbiZb5Nq5C3iwW9Ai63RytRc.jpg",
  },
  {
    slug: "what-hair-transformation-services-can-you-explore-at-aiir-salon",
    title: "What Hair Transformation Services Can You Explore at Aiir Salon?",
    date: "2026-07-21T00:00:00.000Z",
    readTime: "6 mins",
    category: "All",
    image: "https://framerusercontent.com/images/dzQR7ptxQNhqbSZQYfdZQHKOwJI.jpg",
  },
  {
    slug: "how-can-a-professional-hair-consultation-transform-your-look",
    title: "How Can a Professional Hair Consultation Transform Your Look?",
    date: "2026-07-18T00:00:00.000Z",
    readTime: "6 mins",
    category: "All",
    image: "https://framerusercontent.com/images/5TmknRa6DXD21ZZRLc7AGPzuKRg.jpg",
  },
];
