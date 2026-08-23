"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Slideshow
 *
 * Source: Framer project "aiir-salon-claude", Home page "Intro" section,
 * the "SlideshowWrapper" component (nodeId xXLN4Swsn), read via
 * getSelectedNodesXml (you selected this component directly on the
 * canvas) — came through in full.
 *
 * CONFIRMED:
 * - The actual `Slideshow` control node itself: width 345px, height
 *   436px (a portrait item), maxWidth 580px, centered inside a
 *   1000px-wide `overflow: hidden` frame — `direction="left"`,
 *   `autoPlayControl="true"`, `intervalControl="1.5"` (seconds),
 *   `dragControl="true"`, `itemAmount="1"` (one focal slide at a time),
 *   `gap="24"`, `borderRadius="14"`.
 * - 5 real confirmed image URLs.
 *
 * UPDATE 2 (you shared real screenshots of the live rendered effect):
 * this is a "coverflow"-style carousel, not a plain sliding strip — the
 * center slide is full-size/full-opacity/upright, and the slides on
 * either side are visibly faded (blending toward the section's own
 * cream background) and tilted back in 3D, not just smaller. Rebuilt to
 * render all 5 real slides in a row and style each one by its distance
 * from the current center index: center = full opacity/scale/no
 * rotation; immediate neighbors = heavily faded, scaled down, and
 * rotated a few degrees (mirrored left/right, matching the screenshots'
 * "tilting away" look); anything further is clipped by the frame's own
 * `overflow: hidden` rather than styled. Auto-advances every 1.5s.
 *
 * UPDATE (earlier correction): an initial pass read this from
 * `getNodeXml` on the page (no selection), which only surfaced 5
 * sibling `Image` layers at 255x319px sitting outside the Slideshow
 * control's own frame — those turned out to be Framer's internal source
 * layers for the slideshow's content, not the actual rendered item
 * size. The Slideshow control's own `width`/`height` (345x436, portrait)
 * are the real dimensions.
 *
 * INFERRED:
 * - Framer's `Slideshow` here is a proprietary interactive plugin
 *   component — its internal drag physics aren't exposed as readable
 *   XML (only its config props are, plus what your screenshots show).
 *   The exact fade/scale/rotation amounts are a visual match to your
 *   screenshots rather than numbers pulled from Framer's data (it
 *   doesn't expose them) — nudge these if they're slightly off from the
 *   live canvas. Drag-to-scroll wasn't reproduced — flag if that
 *   interaction turns out to matter.
 *
 * UPDATE (per your instruction — use the 6 real client photos you
 * uploaded from `draft/Aiir Web img` instead of the 5 Framer CDN
 * placeholders): copied those 6 files into `public/` (identified by
 * exact byte-size match against your upload, since the folder's
 * filenames — "Aiir salon.jpg", "Aiir salon2.jpg", etc. — don't
 * correspond to the images 1:1 by name) as `aiir-client-portrait-*.jpg`,
 * and swapped them in here as local root-relative paths. Slide count
 * changed from 5 to 6; nothing else about the component (timing,
 * coverflow styling, layout) was touched.
 */

const SLIDES = [
  "/aiir-client-portrait-bag.jpg",
  "/aiir-client-portrait-lehenga.jpg",
  "/aiir-client-portrait-black-dress.jpg",
  "/aiir-client-portrait-hair-flip.jpg",
  "/aiir-client-portrait-choker.jpg",
  "/aiir-client-portrait-long-hair.jpg",
];

const ITEM_WIDTH = 345;
const GAP = 24;
const STEP = ITEM_WIDTH + GAP;
const INTERVAL_MS = 1500;

function styleForOffset(offset: number): React.CSSProperties {
  if (offset === 0) {
    return {
      opacity: 1,
      transform: "scale(1) rotate(0deg)",
      zIndex: 3,
    };
  }
  const abs = Math.abs(offset);
  if (abs === 1) {
    return {
      opacity: 0.18,
      transform: `scale(0.92) rotate(${offset > 0 ? 5 : -5}deg)`,
      zIndex: 2,
    };
  }
  return {
    opacity: 0,
    transform: `scale(0.85) rotate(${offset > 0 ? 8 : -8}deg)`,
    zIndex: 1,
  };
}

export function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Centers item[current] within the frame: the track's left edge starts
  // pinned to the frame's horizontal center (`left-1/2`), then this shifts
  // it left by exactly the current item's own center offset so that
  // point lands back on the frame's center.
  const trackShift = current * STEP + ITEM_WIDTH / 2;

  return (
    <div className="relative mx-auto h-[436px] w-full max-w-[1000px] overflow-hidden">
      <div
        className="absolute top-0 left-1/2 flex transition-transform duration-700 ease-out"
        style={{
          gap: `${GAP}px`,
          transform: `translateX(${-trackShift}px)`,
        }}
      >
        {SLIDES.map((src, index) => (
          <div
            key={src}
            className="relative h-[436px] w-[345px] shrink-0 overflow-hidden rounded-[14px] transition-all duration-700 ease-out"
            style={styleForOffset(index - current)}
          >
            <Image
              src={src}
              alt="Aiir Salon"
              fill
              sizes="345px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
