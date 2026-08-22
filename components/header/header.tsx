import { EyebrowText } from "../eyebrow-text/eyebrow-text";

/**
 * Header
 *
 * Source: Framer project "aiir-salon-claude", component "Header" (nodeId
 * Fcfj6tXXU, in the "Components" folder — distinct from "Header 2",
 * nodeId dmSRcbrEQ, which wasn't selected), read via getSelectedNodesXml
 * — all 4 states (DesktopTabletLight, DesktopTabletDark, PhoneLight,
 * PhoneDark) came through in full in one read.
 *
 * CONFIRMED:
 * - Structure: an `EyebrowText` instance (the component already built at
 *   components/eyebrow-text) + a 2-word Heading directly below, gap 8px.
 * - The only difference between the "Light" and "Dark" states is which
 *   `EyebrowText` variant is used: Light -> "center-dark" (nodeId
 *   ATSb8A0gf), Dark -> "center-light" (nodeId erq0deAkF) — i.e. "Light"/
 *   "Dark" here names the *section background* this Header sits on, not
 *   the heading text's own color (see INFERRED below — the heading text
 *   itself is identical across all 4 states).
 * - Heading, Desktop/Tablet: horizontal stack, gap 16px — "Doing fine,"
 *   ("/Headings/H2 sans") then "Feeling empty" ("/Headings/H2 serif") on
 *   one line. Phone: vertical stack (no gap value given in Framer's
 *   data for either Phone state) — same two text styles, stacked.
 * - Eyebrow copy: "SOUND FAMILIAR" (confirmed identical across all 4
 *   states).
 *
 * INFERRED:
 * - Neither Heading text node had a color attribute in any of the 4
 *   states, and — unlike most of this project's "unset color" cases —
 *   your screenshots show the *same* off-white color in both the Light
 *   and Dark variants, not a value that flips with the theme. Read as:
 *   this heading is always meant to render over a dark/image backdrop
 *   regardless of which section theme it's placed in, so text color is
 *   hardcoded to `white` rather than swapped by the `theme` prop (an
 *   optional `textColor` override is exposed in case that's wrong for a
 *   specific placement).
 * - "Feeling empty" reads as italic in your screenshot, but
 *   `/Headings/H2 serif` (unlike `/Headings/H4 Italics` elsewhere in this
 *   project) has no italic flag in its own definition — same situation
 *   as Gallery's "it's time". Added `italic` directly on that word to
 *   match what's visible.
 * - Phone's stack gap wasn't given in Framer's data for either Phone
 *   state — used `gap-2` (8px) between the two stacked lines as a
 *   reasonable default; adjust if the real phone canvas uses something
 *   else.
 *
 * UPDATE (once real page instances were read — Contact page's hero and
 * FAQ section both use this component): the eyebrow text and both
 * heading words are real per-instance custom props on the Framer
 * component (confirmed: Contact hero uses eyebrow "LET'S CREATE YOUR
 * AIIR EXPERIENCE", "Tell us what" / "you're looking for"; Contact's
 * FAQ section uses "FAQS", "Your questions," / "Our answers"), not
 * fixed copy — so this was always meant to be data-driven. Added
 * `eyebrow`/`line1`/`line2` props, defaulting to the original "SOUND
 * FAMILIAR" / "Doing fine," / "Feeling empty" so existing usage is
 * unaffected. `line2` keeps the serif-italic treatment regardless of
 * its actual text.
 *
 * UPDATE 2 (EyebrowText rebuilt — it no longer guesses its own color
 * from a variant name, `textColor` is now a required prop there). This
 * component already has its own explicit, screenshot-confirmed color
 * mapping for the eyebrow: white on the `dark` theme (Hero/Services
 * panel), the tan `/Primary color` (rgb(138, 109, 80)) on the `light`
 * theme (matches every light-background instance seen so far — e.g.
 * "THE AIIR EXPERIENCE"). Exposed as an `eyebrowColor` override prop in
 * case a future instance needs to diverge from that default, same
 * pattern as the existing `textColor` override for the heading itself.
 *
 * UPDATE 3 (bug fix, found by framer-nextjs-visual-verify against the
 * live About page — this instance's `line2` was "care", which the live
 * site renders UPRIGHT, not italic, contradicting the "line2 is always
 * italic" assumption baked in above from the original "Feeling empty"
 * example). Every other confirmed instance checked so far (Home's
 * "Feeling empty", "Purpose", "Transformation") IS italic, so the
 * default stays `true` rather than flipping it — added a `line2Italic`
 * override instead, same override pattern as `textColor`/`eyebrowColor`,
 * so About's Header call can opt out without changing anyone else.
 *
 * UPDATE 4 (bug fix, found by framer-nextjs-visual-verify against the
 * live About page — the "WHY AIIR" instance, "Because Ordinary Isn't" /
 * "the Standard"): every instance checked so far goes side-by-side at
 * `md:flex-row`, but this one stays stacked vertically even at desktop
 * width (checked at the same 1440px viewport on both tabs). Added a
 * `stacked` override (default `false`, preserving every existing
 * instance's side-by-side behavior) that keeps the heading in
 * `flex-col` instead of switching to `md:flex-row` at the `md`
 * breakpoint.
 *
 * UPDATE 5 (reverted, per your follow-up request): briefly switched
 * line1/line2 to `text-h3` below the `md` breakpoint (24px, -0.05em,
 * 1.3em) instead of a scaled-down H2 sans/serif, then reverted back to
 * the original unconditional `text-h2-sans`/`text-h2-serif` (48px/52px
 * at every breakpoint, no phone-specific size) at your request. Left
 * this note so a future pass doesn't reintroduce the same change
 * without knowing it was already tried and rolled back.
 *
 * UPDATE 6 (per your instruction — site-wide fade-slide-in on first
 * scroll into view, not from Framer data): the `<h2>` gets `reveal
 * reveal-delay-1` (globals.css/RevealObserver) so it fades in just
 * after `EyebrowText` (which already carries its own `reveal`
 * internally) rather than both firing in the same instant. Since this
 * one shared component renders every page's hero/FAQ title, this
 * covers all of them without touching any call site.
 */

type HeaderProps = {
  theme?: "light" | "dark";
  textColor?: string;
  eyebrowColor?: string;
  eyebrow?: string;
  line1?: string;
  line2?: string;
  line2Italic?: boolean;
  /** Keep line1/line2 stacked vertically even at desktop widths. */
  stacked?: boolean;
  className?: string;
};

export function Header({
  theme = "light",
  textColor = "white",
  eyebrowColor,
  eyebrow = "SOUND FAMILIAR",
  line1 = "Doing fine,",
  line2 = "Feeling empty",
  line2Italic = true,
  stacked = false,
  className,
}: HeaderProps) {
  const resolvedEyebrowColor =
    eyebrowColor ?? (theme === "dark" ? "white" : "rgb(138, 109, 80)");

  return (
    <div
      className={["flex flex-col items-center gap-2", className]
        .filter(Boolean)
        .join(" ")}
    >
      <EyebrowText variant="center" textColor={resolvedEyebrowColor}>
        {eyebrow}
      </EyebrowText>
      <h2
        className={[
          "reveal reveal-delay-1 flex flex-col items-center gap-2 text-center",
          stacked ? "" : "md:flex-row md:gap-4",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="text-h2-sans  text-[28px] lg:text-[36px] text-center " style={{ color: textColor }}>
          {line1}
        </span>
        <span
          className={["text-h2-serif", line2Italic ? "italic" : ""]
            .filter(Boolean)
            .join(" ")}
          style={{ color: textColor }}
        >
          {line2}
        </span>
      </h2>
    </div>
  );
}
