import { Button } from "../buttons/button";
import { ImageScrollEffect } from "./image-scroll-effect";

/**
 * Gallery
 *
 * Source: Framer project "aiir-salon-claude", component "Gallery"
 * (nodeId aa9oETZqE, in the "Components" folder — a different component
 * from "Gallery Section", nodeId Ge8W_C7VA, which wasn't selected), read
 * via getSelectedNodesXml. All 3 breakpoints (Desktop, Tablet, Phone)
 * came through in full in one read.
 *
 * CONFIRMED:
 * - All 3 breakpoints: fixed height 800px, backgroundColor
 *   rgb(51, 40, 35) — not a project token, used as-is.
 * - ImageScrollEffect instance (see image-scroll-effect.tsx): diamondSize
 *   420, cornerRadius 10, gap 12, backgroundColor rgb(65, 19, 19) — this
 *   one *does* match the project's "/Black" token exactly, used via
 *   `bg-black` isn't applicable here since the prop is inline style, so
 *   passed as the literal value.
 * - TextContainer padding: Desktop "0px 64px", Tablet "0px 32px", Phone
 *   "0px 24px" (-> px-6/md:px-8/lg:px-16, matching the padding scale
 *   already used elsewhere e.g. Footer/NavBar).
 * - Heading width: Desktop 57%, Tablet 85%, Phone 100% (-> max-width
 *   caps at each breakpoint).
 * - Button: componentId XmxgwoN1v (the already-built `Button`), variant
 *   "Secondary" (nodeId PATjj42DD), href "/contact", label "Take the
 *   first step".
 *
 * INFERRED:
 * - Button's confirmed instance prop XNm_QCB5G ("rgb(255, 255, 255)")
 *   maps to the same custom-prop slot `Button`'s `textColor` uses
 *   elsewhere (Footer's instance) — but applying white text here would
 *   be invisible against the button's own white fill, and your
 *   screenshot clearly shows dark text on a white pill instead.
 *
 * UPDATE (bug fix, found by you — "can't see this text and button on
 * top"): when `Button` was rebuilt with the `default`/`hover` object API,
 * this call site got migrated to `default={{text: white, bg:
 * transparent}}` — the opposite of the dark-text-on-white-pill look
 * documented right above. Once you separately changed the shared
 * `Button` component so its border always matches its own background
 * (`border-(--btn-bg)`, no more fixed white border), a transparent bg +
 * transparent border + near-white text over this busy photo mosaic
 * became effectively invisible. Fixed to match your reference screenshot
 * and the original documented finding: dark text (`rgb(65, 19, 19)`) on
 * a solid white pill at rest, inverting to white text on a dark fill on
 * hover (same hover treatment already used by every other CTA on this
 * page).
 * - The heading text is one plain string in Framer's data with no
 *   per-run style info (rich-text spans aren't exposed by this read),
 *   but your screenshot clearly shows "it's time" in italic against
 *   otherwise-regular text — split manually into a plain run + an
 *   italic `<em>` for just that phrase. No `inlineTextStyle` was set on
 *   the heading at all (unlike every other heading in this project,
 *   which references a `/Headings/*` style path) — sized it against
 *   `/Headings/H2 sans` (48px Italiana) as the closest visual match to
 *   your screenshot's proportions; not confirmed against real canvas
 *   metrics. Center-aligned to match the screenshot (the H2 token's own
 *   default alignment is left).
 * - The "Mask" layer (nodeId KvROmnGeU, full-bleed, backgroundColor
 *   matching the section background, zIndex 2, `locked` in Framer) reads
 *   as a gradient/vignette mask fading the diamond mosaic into the dark
 *   background — its actual gradient shape isn't exposed by this API
 *   (same limitation as the EyebrowText divider lines: Framer masks
 *   aren't readable as plain attributes). Approximated with a
 *   radial-gradient vignette from the top-left corner, matching what
 *   your screenshot shows; not a pixel-exact reproduction.
 * UPDATE (per your request — "use all the images from the public
 * folder"): real salon photography is now in `public/` (17 files, all
 * named `aiir-*.jpg`), confirmed by listing the folder directly — kept
 * only those 17; excluded `hair-wash-relax.jpg` (an older,
 * differently-named leftover from an earlier upload, not part of this
 * batch) and `images/testimonials/*` (headshots for the Testimonial
 * section, not gallery photography). `image-scroll-effect.tsx`'s grid
 * was generalized to size itself to however many images it's given
 * (see its own UPDATE 2) instead of a hard-locked 9, so all 17 real
 * photos are passed in below rather than the old 9 Unsplash
 * placeholders.
 *
 * UPDATE 2 (per your instruction — pick more images from
 * `draft/Aiir Web img`, rename thoroughly, and use them here): of the
 * folder's remaining files (beyond the 6 already used in the Home
 * slideshow), most were near-duplicate frames of the same 2 shots
 * (e.g. DSC00020 vs. DSC00019; DSC00054/55/56 vs. DSC00053 — same pose,
 * same take) or an exact repeat of a photo already in the slideshow
 * (IMG_0340.JPG.jpeg); one file (IMG_9165.HEIC) couldn't be previewed or
 * converted in this environment (no HEIC decoder available), so it was
 * left out rather than guessed at. That left 4 genuinely new, distinct
 * photos, added here per your choice to combine them with the existing
 * 17 rather than replace them (21 total).
 *
 * Per your instruction to rename thoroughly, all 21 files went by one
 * consistent `gallery-section-image-N.jpg` scheme instead of the mixed
 * `aiir-*.jpg` names — copied (not moved) into `public/` under these new
 * names. Copies, not renames-in-place, because 3 of the original 17
 * files (`aiir-reception-desk-1.jpg`, `aiir-styling-station-hair-
 * service.jpg`, `aiir-lounge-sofa.jpg`) are also used by
 * `problems-section.tsx` — renaming those originals would have broken
 * that unrelated page, which is out of scope for this task. Those 21
 * `gallery-section-image-*.jpg` files are still sitting in `public/`
 * (unused now, not deleted — this environment can't delete files on
 * your device) alongside the original 17 `aiir-*.jpg` files.
 *
 * UPDATE 3 (per your instruction — "change the images of the gallery
 * section with the people images we used in the intro section"): swapped
 * to the same 6 real client-portrait photos already used by the Home
 * page's `Slideshow` (`components/home/slideshow.tsx`'s `SLIDES` array,
 * `/aiir-client-portrait-*.jpg`) instead of the salon-interior mosaic.
 * Reused the exact same file paths already in `public/` rather than
 * copying under new names, since both components now intentionally point
 * at the same photo set.
 *
 * UPDATE 4 (per your instruction — "apart from the images used now, fill
 * the remaining spots with other images"): the grid math sizes itself to
 * however many images it's given (see image-scroll-effect.tsx's UPDATE
 * 2), so the 6 portraits alone rendered a sparse 2-row mosaic. First pass
 * appended all 21 `gallery-section-image-*.jpg` salon photos after the 6
 * portraits (27 total) — but that made portraits only ~22% of the grid,
 * which you flagged ("i want the people images as the main focus"). nothing
 * had actually been removed, the ratio was just wrong.
 *
 * UPDATE 5 (per your clarification — portraits should stay the clear
 * majority, salon photos as accents only, no repeats): kept the same 6
 * portraits and cut the salon accents down to 4 (from the 21 available),
 * picked spread across the set rather than consecutive — `gallery-
 * section-image-1/6/11/16.jpg` — so the accent photos vary rather than
 * all coming from the same original run. 10 images total: 6 portraits
 * (60%) + 4 salon accents (40%).
 */

const GALLERY_IMAGES = [
  "/aiir-client-portrait-bag.jpg",
  "/aiir-client-portrait-lehenga.jpg",
  "/aiir-client-portrait-black-dress.jpg",
  "/aiir-client-portrait-hair-flip.jpg",
  "/aiir-client-portrait-choker.jpg",
  "/aiir-client-portrait-long-hair.jpg",
  "/gallery-section-image-1.jpg",
  "/gallery-section-image-6.jpg",
  "/gallery-section-image-11.jpg",
  "/gallery-section-image-16.jpg",
];

export function Gallery() {
  return (
    <section className="relative h-[800px] w-full overflow-hidden bg-[rgb(51,40,35)]">
      <ImageScrollEffect
        className="absolute inset-0"
        images={GALLERY_IMAGES}
        backgroundColor="rgb(65, 19, 19)"
        diamondSize={420}
        cornerRadius={10}
        gap={12}
      />

      {/* Vignette mask fading the mosaic into the section background —
          transparent in the center, darkening toward all 4 corners.
          `farthest-corner` (the default) sizes the gradient so its 100%
          stop always reaches the section's actual corners regardless of
          aspect ratio, so this covers the full component edge-to-edge
          rather than just one corner. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(51,40,35,0) 0%, rgba(51,40,35,0) 35%, rgba(51,40,35,0.55) 70%, rgb(51,40,35) 100%)",
        }}
      />

      <div className="relative z-[3] flex h-full flex-col items-center justify-center gap-3 px-6 text-center md:px-8 lg:px-16">
        <h2 className="text-h2-sans w-full text-center text-white md:w-[85%] lg:w-[57%]">
          Something in you already knows <em className="italic">it&apos;s time</em>
        </h2>
        <Button
          href="/contact"
          default={{ text: "rgb(65, 19, 19)", bg: "rgb(255, 255, 255)" }}
          hover={{ text: "rgb(255, 255, 255)", bg: "rgb(83, 68, 62)" }}
        >
          Take the first step
        </Button>
      </div>
    </section>
  );
}
