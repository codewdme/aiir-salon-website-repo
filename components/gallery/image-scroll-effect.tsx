"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * ImageScrollEffect
 *
 * Source: a Framer code component (codeFileId z2QuRg1, "ImageScrollEffect_1.tsx")
 * you pasted directly rather than a design node — the diamond-mosaic
 * parallax background used inside the Gallery section. Ported near
 * verbatim from your Framer code file, with only the Framer-runtime bits
 * removed since they don't exist outside Framer's canvas:
 * - `addPropertyControls` (Framer's canvas property panel) — dropped,
 *   replaced by plain typed props.
 * - `useIsStaticRenderer` (from the `framer` package, detects Framer's
 *   static canvas/export render) — dropped; this component only ever
 *   runs client-side here (`"use client"`), so there's no static-render
 *   case to special-case around.
 * - `import { useScroll, useMotionValueEvent } from "framer-motion"` ->
 *   `from "motion/react"` — this project already depends on `motion`
 *   (the successor package, same API) for nav-bar/testimonial, not
 *   `framer-motion`, so no new dependency was added.
 * - The 9 individual `image1`..`image9` props were collapsed into a
 *   single `images?: string[]` array (still defaults to your original 9
 *   Unsplash placeholders, still fully overridable) — easier to swap for
 *   real salon photos later without 9 separate props.
 *
 * Everything else (the scroll-driven per-column parallax via refs +
 * rAF + IntersectionObserver, the 45°-rotated diamond grid math) is
 * unchanged from your file.
 *
 * UPDATE (jitter fix, not from Framer data): the original port applied
 * `scrollY * speed` directly on every scroll "change" event, which maps
 * transform 1:1 to raw wheel/trackpad deltas — those fire in uneven
 * bursts (not a smooth ramp), so the parallax visibly snapped/jittered
 * instead of gliding. Replaced with a continuous rAF loop that lerps a
 * "smoothed" scroll value toward the real one every frame (a standard
 * scroll-parallax smoothing technique) — the loop runs only while the
 * section is in view (same IntersectionObserver gate as before) and
 * self-stops once it settles within the target to avoid burning idle
 * frames.
 *
 * UPDATE 2 (per your request — "use all the images from the public
 * folder"): this component originally hard-locked itself to exactly 9
 * images (a fixed 3x3 diamond grid, silently truncating/padding
 * anything else). Real salon photos are now available (17 files,
 * `public/aiir-*.jpg` — confirmed by listing your `public/` folder;
 * excluded `hair-wash-relax.jpg` as an older, differently-named leftover
 * from an earlier upload batch, and the `images/testimonials/*` photos
 * since those are headshots for the Testimonial section, not gallery
 * photography), so the grid math is generalized here to size itself to
 * however many images are passed in — still exactly 3 columns wide (the
 * diamond parallax's `COL_CONFIG` is indexed `i % 3`), but now `rows =
 * ceil(images.length / 3)` instead of a fixed 3. All 17 real photos are
 * laid out in the mosaic; the ones beyond what fits in the section's
 * 800px viewport window are still part of the same continuous diagonal
 * grid, revealed/hidden as you scroll and the parallax shifts each
 * column — the same vignette-masked "larger mosaic behind a fixed
 * window" mechanic this component already used with 9 placeholders, just
 * with real photos and more rows.
 */

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
];

type ImageScrollEffectProps = {
  images?: string[];
  cornerRadius?: number;
  gap?: number;
  diamondSize?: number;
  backgroundColor?: string;
  className?: string;
};

export function ImageScrollEffect({
  images = DEFAULT_IMAGES,
  cornerRadius = 10,
  gap = 12,
  diamondSize = 420,
  backgroundColor = "#000000",
  className,
}: ImageScrollEffectProps) {
  const clampedRadius = Math.max(10, cornerRadius);
  const containerRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const isInViewRef = useRef(false);
  // Smoothing state for the lerp-based rAF loop (see UPDATE note above).
  const smoothedYRef = useRef(0);
  const loopRunningRef = useRef(false);

  // Generalized to however many images are passed (see UPDATE 2 above) —
  // no longer truncated/padded to exactly 9. Falls back to the 9 default
  // placeholders only when no images are provided at all.
  const gridImages = useMemo(
    () => (images.length > 0 ? images : DEFAULT_IMAGES),
    [images]
  );
  const rows = Math.max(1, Math.ceil(gridImages.length / 3));

  const EXTRA = diamondSize * 0.65;
  const colW = diamondSize + gap;
  const rowH = diamondSize + gap;
  const totalW = colW * 3 - gap;
  const totalH = rowH * rows + EXTRA * 2;
  // Centers the row stack the same way the old fixed-3-row math did
  // (row 1 of 3 sat exactly on the vertical center, i.e. offset `row -
  // 1`); generalized to `row - (rows - 1) / 2` so it re-centers
  // correctly for any row count.
  const rowCenterOffset = (rows - 1) / 2;

  const COL_CONFIG = useMemo(
    () => [
      { speed: 0.18, offsetY: -EXTRA, dir: -1 },
      { speed: 0.38, offsetY: -EXTRA * 0.6, dir: 1 },
      { speed: 0.26, offsetY: -EXTRA * 1.2, dir: -1 },
    ],
    [EXTRA]
  );

  // Ref to always-fresh config — keeps the loop stable with empty deps
  const configRef = useRef({ COL_CONFIG });
  configRef.current = { COL_CONFIG };

  const applyTransforms = (smoothY: number) => {
    const { COL_CONFIG: cfg } = configRef.current;
    cellRefs.current.forEach((cell, i) => {
      if (!cell) return;
      const { speed, dir } = cfg[i % 3];
      // transform instead of top — compositor only, no layout reflow
      cell.style.transform = `translateY(${smoothY * speed * dir}px)`;
    });
  };

  useEffect(() => {
    const LERP_FACTOR = 0.08; // higher = snappier, lower = smoother/laggier
    const SETTLE_EPSILON = 0.05;

    const loop = () => {
      const el = containerRef.current;
      if (!el) {
        loopRunningRef.current = false;
        return;
      }
      const targetY = -el.getBoundingClientRect().top;
      const current = smoothedYRef.current;
      const next = current + (targetY - current) * LERP_FACTOR;
      smoothedYRef.current = next;
      applyTransforms(next);

      const settled = Math.abs(targetY - next) < SETTLE_EPSILON;
      if (isInViewRef.current && !settled) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        loopRunningRef.current = false;
      }
    };

    const startLoop = () => {
      if (loopRunningRef.current) return;
      loopRunningRef.current = true;
      rafRef.current = requestAnimationFrame(loop);
    };

    // Initial paint (no animation needed for the very first frame).
    const el = containerRef.current;
    if (el) {
      smoothedYRef.current = -el.getBoundingClientRect().top;
      applyTransforms(smoothedYRef.current);
    }

    const onScroll = () => {
      if (isInViewRef.current) startLoop();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Also (re)start the loop whenever the section enters view — e.g. the
    // user scrolls it into frame without the scroll listener having fired
    // a fresh event yet, or resizes into it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startLoop();
      },
      { rootMargin: "200px" }
    );
    if (el) observer.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      loopRunningRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        background: backgroundColor,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: totalW,
          height: totalH,
          transform: "translate(-50%, -50%) rotate(45deg)",
        }}
      >
        {gridImages.map((src, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const { offsetY } = COL_CONFIG[col];
          const x = col * colW;
          const y = totalH / 2 + (row - rowCenterOffset) * rowH + offsetY;

          return (
            <div
              key={i}
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: x,
                top: y, // static — set once at render
                willChange: "transform",
                width: diamondSize,
                height: diamondSize,
                overflow: "hidden",
                borderRadius: `${clampedRadius}px`,
                isolation: "isolate",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20%",
                  left: "-20%",
                  width: "140%",
                  height: "140%",
                  transform: "rotate(-45deg)",
                  transformOrigin: "center center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
