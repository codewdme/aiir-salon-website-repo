/**
 * service-detail-icons
 *
 * Small line icons for the individual service page's "Service Info"
 * rows (Price/Category/Duration/Includes/Products/Availability) and the
 * "Benefits" list's check-circle marker.
 *
 * INFERRED: Framer's `getSelectedNodesXml` read only exposes each icon
 * node as a generic `<Icon>`-style element with no readable path/shape
 * data (same limitation already documented for NavBar/ReadMore/Gallery's
 * icons elsewhere in this project) — drawn here as simple inline SVGs at
 * the confirmed 16x16 size, chosen to visually match what the live site
 * shows for each row (a coin/price mark, a small grid, a clock, a
 * person, a droplet, a calendar), using `currentColor` so each call site
 * controls the color via its own text color class.
 */

type IconProps = { className?: string };

export function PriceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 4.5v7M9.8 6.2c0-.8-.8-1.4-1.8-1.4s-1.8.6-1.8 1.4c0 2 3.6 1 3.6 2.8 0 .8-.8 1.4-1.8 1.4s-1.8-.6-1.8-1.4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CategoryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function DurationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5.5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 1.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IncludesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProductsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 1.5h3v2.2h-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path
        d="M5.5 3.7h5l.8 1.6v7.7a1 1 0 01-1 1h-3.6a1 1 0 01-1-1V5.3z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M5.3 8.5h5.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function AvailabilityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="3" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6.2h12" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 1.7v2M11 1.7v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M6 10.2l2.4 2.4L14.2 7"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
