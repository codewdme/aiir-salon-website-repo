import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * MenuItem
 *
 * Source: Framer project "aiir-salon-claude", component "Menu item"
 * (nodeId KsoQjfaIb), read via getSelectedNodesXml / getNodeXml.
 *
 * Per user: "Primary" and "Secondary" are theme variants of this same
 * button, reused in different locations around the project (e.g. a
 * light-background nav vs. a dark-background nav) — the two color states
 * captured per variant in Framer are its default appearance and its hover
 * appearance, not two unrelated components.
 *
 * CONFIRMED (from Framer node data, all 6 variant states, plus the actual
 * Nav bar instances read via getComponentInsertUrlAndTypes-adjacent
 * instance attributes):
 * - Base shape: borderRadius 8px, layout=stack gap=10px, text uses the
 *   "/Paragraph/Eyebrow text" project text style (-> `text-eyebrow` utility
 *   from globals.css).
 * - Primary: padding "10px 20px 10px 20px" (py-2.5 px-5), default
 *   background transparent.
 * - Secondary: padding "10px 20px 10px 20px" (py-2.5 px-5), default
 *   background white.
 * - PhoneMenuItem: no padding attribute set in Framer at all (unlike
 *   Primary/Secondary) — left unpadded here too so the parent mobile menu
 *   controls spacing.
 * - Real Nav bar instances pass two per-instance color controls (confirmed
 *   with user): a text color, and a hover-background-fill color. E.g. the
 *   About/Services/Journal items use text rgb(252,247,237) with hover-fill
 *   rgb(255,255,255); "Get in touch" uses text rgb(138,109,80) with
 *   hover-fill rgb(252,247,237). Exposed here as `textColor` / `hoverBg`.
 *
 * INFERRED:
 * - PhoneMenuItem's two selected states (D9Kv2Buh7 / Co5va3iOu) came back
 *   structurally identical in Framer's data (no background/color diff) —
 *   there may be a hover/press effect that isn't exposed via static XML.
 *   Treated as a single flat style for now.
 *
 * UPDATE (bug fix, reported after the Contact page build — not from Framer
 * data): `textColor` was only ever applied as a static inline style, so it
 * never changed on hover. For the primary nav items (About/Services/
 * Journal) this meant hovering swapped the pill to a white background but
 * left the text at its light cream default — text and background ended up
 * nearly the same tone, so the label effectively vanished on hover. Added
 * an optional `hoverTextColor` prop (same CSS-variable + Tailwind arbitrary
 * `hover:` pattern already used for `hoverBg`) so a darker hover text color
 * can be supplied per-instance; falls back to the static `textColor` when
 * not provided, so `Get in touch`/phone items (which already had enough
 * contrast) are unaffected.
 *
 * UPDATE 2 (bug fix, reported after the above still showed no color change
 * on hover): the class was `hover:text-(--menu-item-hover-text)` — but
 * unlike `bg-`, Tailwind v4's `text-` utility is ambiguous (it could mean
 * font-size OR color), so an arbitrary CSS-variable value there needs an
 * explicit type hint or Tailwind silently fails to generate a color rule.
 * Fixed to `hover:text-(color:--menu-item-hover-text)`. Also: per your
 * clarification, the correct "Primary text color" value is `#411313` /
 * `rgb(65, 19, 19)` — NavBar's `PRIMARY_HOVER_TEXT_COLOR` updated to match
 * (it was previously using this project's *other* duplicated "Primary text
 * color" Framer entry, `rgb(83, 68, 62)` — see globals.css's own note on
 * these Framer-side duplicates).
 *
 * UPDATE 3 (bug fix, found by inspecting the live page in Chrome — the
 * hover CSS rule from UPDATE 2 turned out to be generating correctly all
 * along; verified via the compiled stylesheet that
 * `.hover\:text-(color:--menu-item-hover-text):hover { color: var(...) }`
 * was really there). The actual cause: the *default* `textColor` was
 * applied as an inline `style.color`, and inline styles always win over
 * ANY class-selector rule in CSS's cascade — `:hover` or not — so the
 * hover class could never override it no matter how it was written.
 * Fixed by moving the default text color into a CSS variable + a
 * `text-(color:--menu-item-text)` *class* (same specificity tier as the
 * hover class) instead of an inline style, so the two now compete fairly
 * and `:hover`'s extra pseudo-class specificity lets it win as intended.
 *
 * UPDATE 4 (per your request — phone-menu-only sizing, not from Framer
 * data): added an optional `fontSize` prop, applied as an inline style.
 * Unlike the color props above, this one doesn't need to compete with a
 * `:hover` class, so a plain inline style is the simplest reliable way
 * to override `text-eyebrow`'s own font-size without depending on
 * Tailwind's generated-CSS ordering (the exact ambiguity this file has
 * already hit once, see UPDATE 2). Left `undefined` by default, so
 * every existing call site (desktop nav, phone CTA at its old size) is
 * completely unaffected — only the phone-menu call sites that now pass
 * it pick up the new size.
 */

type MenuItemProps = {
  href: string;
  variant?: "primary" | "secondary" | "phone";
  textColor?: string;
  hoverBg?: string;
  hoverTextColor?: string;
  /** Optional inline font-size override (e.g. "20px") — only used by
   *  the phone menu today; leave unset to keep `text-eyebrow`'s default. */
  fontSize?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const paddingByVariant: Record<NonNullable<MenuItemProps["variant"]>, string> =
  {
    primary: "px-5 py-2.5",
    secondary: "px-5 py-2.5",
    phone: "",
  };

const defaultBgByVariant: Record<
  NonNullable<MenuItemProps["variant"]>,
  string
> = {
  primary: "bg-transparent",
  secondary: "bg-white",
  phone: "bg-transparent",
};

const defaultHoverByVariant: Record<
  NonNullable<MenuItemProps["variant"]>,
  string
> = {
  primary: "hover:bg-white",
  secondary: "hover:bg-primary-text",
  phone: "hover:bg-white/60",
};

export function MenuItem({
  href,
  variant = "primary",
  textColor,
  hoverBg,
  hoverTextColor,
  fontSize,
  children,
  className,
  onClick,
}: MenuItemProps) {
  const style: CSSProperties & {
    "--menu-item-text"?: string;
    "--menu-item-hover-bg"?: string;
    "--menu-item-hover-text"?: string;
  } = {};
  if (fontSize) style.fontSize = fontSize;
  // Both the default and hover text colors go through CSS variables +
  // Tailwind classes (never inline `style.color`) — an inline color would
  // always beat the hover class in specificity, no matter how it's
  // written. See UPDATE 3 above.
  if (textColor) style["--menu-item-text"] = textColor;
  if (hoverBg) style["--menu-item-hover-bg"] = hoverBg;
  // Falls back to the static textColor so items that already have enough
  // contrast against their hover background don't need to pass this.
  style["--menu-item-hover-text"] = hoverTextColor ?? textColor;

  return (
    <Link
      href={href}
      onClick={onClick}
      style={style}
      className={[
        "text-eyebrow inline-flex items-center justify-center gap-2.5 rounded-lg overflow-hidden transition-colors duration-200",
        defaultBgByVariant[variant],
        textColor ? "text-(color:--menu-item-text)" : "",
        hoverBg ? "hover:bg-(--menu-item-hover-bg)" : defaultHoverByVariant[variant],
        "hover:text-(color:--menu-item-hover-text)",
        paddingByVariant[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
