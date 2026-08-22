
import { BsEnvelope } from "react-icons/bs";
import { SocialMediaCard } from "../social-media/social-media-card";
import { BiSolidMapPin, BiSolidPhoneIncoming } from "react-icons/bi";

/**
 * ContactDetails
 *
 * Source: Framer project "aiir-salon-claude", Contact page Desktop node
 * (nodeId afN_GnEcN), the "ContactDetails" card (nodeId jnhI9gny8), read
 * via getSelectedNodesXml — came through in full.
 *
 * CONFIRMED:
 * - Card: backgroundColor "/Secondary BG", border 4px solid "/Secondary
 *   text color", borderRadius 14px, padding 24px, gap 32px between the
 *   info tiles and the social grid.
 * - 3 info tiles (Email, Phone, Address), gap 16px between them: each
 *   backgroundColor "/Primary BG" (-> `bg-primary-bg`), borderRadius
 *   10px, padding 16px, gap 16px between icon and text, icon color
 *   rgb(138, 109, 80) (-> matches the `primary` token exactly). Label
 *   uses "/Paragraph/Eyebrow text" (-> `text-eyebrow`), value uses
 *   "/Paragraph/Body 18" (-> `text-body-18`).
 * - Real confirmed values: hello@aiirsalon.com, +91 97113 19369 (tel
 *   link, same number already used in Footer), "East Patel Nagar, New
 *   Delhi" (same address already used in Footer).
 * - Social grid: 2 real `SocialMediaCard` instances (the component
 *   already built) — Instagram (same URL as Footer's) and "Location"
 *   (the same Google Maps share link already used for Footer's location
 *   icon), gap 10px. Framer's grid was set up for 3 columns but only 2
 *   real items exist — used a 2-column grid to match the actual content
 *   rather than leaving an empty 3rd slot.
 * - "FOLLOW" label above the grid: "/Paragraph/Eyebrow text".
 *
 * UPDATE (bug fix, found by framer-nextjs-visual-verify comparing against
 * the live site — this whole grid was rendering completely empty, not
 * just visually off): `className="w-full"` here overrides
 * `SocialMediaCard`'s own default className entirely (by design — see
 * that component's own UPDATE note), which means the height it normally
 * ships with (`h-[200px]`) was dropped and never replaced with anything.
 * With no height, the `<Image fill>` inside collapsed to 0px tall —
 * Next.js even warns about this in the console ("has 'fill' and a height
 * value of 0"), which is what caught it. Fixed by giving each card an
 * `aspect-[141.5/200]` (the same proportions as the component's own
 * default size) instead of a fixed height, so it still sizes correctly
 * at any grid-cell width.
 *
 * INFERRED:
 * - The Address tile's icon is literally named "Settings" in Framer's
 *   data, which doesn't match its use here at all (paired with "ADDRESS"
 *   / a physical location) — almost certainly a copy-paste leftover from
 *   whatever template this project started from, same pattern as the
 *   unrelated FAQ content found earlier. Used a `MapPin` icon instead of
 *   a literal gear/settings icon, since that's clearly the intent.
 * - Icons for Email/Phone use `Envelope`/`Phone` from
 *   @phosphor-icons/react (already a project dependency) as the closest
 *   match to Framer's "Mail"/"PhoneCall" icon components — exact path
 *   data wasn't recoverable, same limitation as every other icon in
 *   this project.
 */

const EMAIL = "hello@aiirsalon.com";
const PHONE_DISPLAY = "+91 97113 19369";
const PHONE_TEL = "tel:+919711319369";
const ADDRESS = "East Patel Nagar, New Delhi";
const MAP_URL = "https://share.google/YI0uCWHGUAPU66r3g";
const INSTAGRAM_URL =
  "https://www.instagram.com/aiirsalon?igsh=MWozZ2w3OW9jMjQycw==";

function InfoTile({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="bg-primary-bg flex w-full items-start gap-4 rounded-[10px] p-4">
      <span className="text-primary shrink-0">{icon}</span>
      <div className="flex flex-col items-start gap-0.5">
        <span className="text-eyebrow text-primary-text/70">{label}</span>
        <span className="text-body-18 text-primary-text">{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="w-full">
        {content}
      </a>
    );
  }

  return content;
}

export function ContactDetails() {
  return (
    <div className="border-secondary-text bg-secondary-bg flex w-full flex-col gap-8 rounded-[14px]  p-6">
      <div className="flex w-full flex-col gap-4">
        <InfoTile
          icon={<BsEnvelope size={24}  />}
          label="EMAIL"
          value={EMAIL}
          href={`mailto:${EMAIL}`}
        />
        <InfoTile
          icon={<BiSolidPhoneIncoming size={24}/>}
          label="PHONE NUMBER"
          value={PHONE_DISPLAY}
          href={PHONE_TEL}
        />
        <InfoTile
          icon={<BiSolidMapPin size={24}  />}
          label="ADDRESS"
          value={ADDRESS}
          href={MAP_URL}
        />
      </div>

      {/* <div className="flex w-full flex-col items-start gap-3">
        <span className="text-eyebrow text-primary-text/70">FOLLOW</span>
        <div className="grid w-full grid-cols-2 gap-2.5">
          <SocialMediaCard
            label="Instagram"
            href={INSTAGRAM_URL}
            className="aspect-[141.5/200] w-full"
          />
          <SocialMediaCard
            label="Location"
            href={MAP_URL}
            className="aspect-[141.5/200] w-full"
          />
        </div>
      </div> */}
    </div>
  );
}
