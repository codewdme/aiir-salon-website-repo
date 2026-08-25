/**
 * services-data
 *
 * Source: Framer project "aiir-salon-claude", CMS collection
 * "Services by Aiir" (collectionId dLMsbfuG0), read in full via
 * getCMSItems per your instruction to pull the Home page's Services
 * section content from this collection — 10 real items came through,
 * all mapped below verbatim (title, price, about copy, a short
 * "what's included" bullet list, and a real photo URL per service).
 * `includedShort` is Framer's own bulleted string split into an array
 * on the "•" separator, since that's already how the CMS field is
 * authored (a single string with literal bullet characters).
 */

export type ServiceHome = {
  slug: string;
  title: string;
  price: string;
  about: string;
  includedShort: string[];
};

function splitBullets(raw: string): string[] {
  return raw
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `• ${s}`);
}

export const SERVICES_HOME: (ServiceHome & { image: string })[] = [
  {
    slug: "pedicure",
    title: "Pedicure",
    price: "Rs. 4000",
    about:
      "Give your feet the care they deserve with our relaxing and rejuvenating pedicure. This treatment gently cleanses, exfoliates and nourishes your feet while leaving your nails beautifully groomed.",
    includedShort: splitBullets(
      "• Nail cleaning & shaping \n• Cuticle care \n• Foot soak \n• Scrubbing & dead-skin removal \n• 4 more services....",
    ),
    image: "/services/pedicure.jpg",
  },
  {
    slug: "manicure",
    title: "Manicure",
    price: "Rs. 4000",
    about:
      "Pamper your hands with a rejuvenating manicure designed to cleanse, nourish and beautifully groom your hands and nails.",
    includedShort: splitBullets(
      "• Nail cleaning & shaping \n• Cuticle care \n• Hand soak \n• Gentle exfoliation \n• 4 more services....",
    ),
    image:
      "/services/manicure.jpg",
  },
  {
    slug: "facial",
    title: "Facial",
    price: "Rs. 4000",
    about:
      "A refreshing and nourishing skincare treatment designed to deeply cleanse, exfoliate and rejuvenate your skin, leaving it fresh, smooth and radiant.",
    includedShort: splitBullets(
      "• Deep cleansing \n• Gentle exfoliation \n• Blackhead & whitehead care \n• Face massage \n• 4 more services....",
    ),
    image:
      "/services/facial.jpg",
  },
  {
    slug: "cleanup",
    title: "Cleanup",
    price: "Rs. 4000",
    about:
      "A quick yet effective skincare treatment that refreshes your skin by removing dirt, excess oil and surface impurities for a clean and fresh appearance.",
    includedShort: splitBullets(
      "• Face cleansing \n• Gentle exfoliation \n• Steam \n• Blackhead & whitehead removal \n• 4 more services....",
    ),
    image:
      "/services/clean-up.jpg",
  },
  {
    slug: "nail-art",
    title: "Nail Art",
    price: "Rs. 4000",
    about:
      "Give your nails a stylish and beautiful makeover with our professional Nail Art Services. From simple and elegant designs to trendy and creative nail art, we offer a variety of options to match your personality and occasion.",
    includedShort: splitBullets(
      "• Basic Nail Art \n• Gel Nail Art \n• Custom Nail Designs \n• Floral & Minimal Nail Art \n• 6 more services....",
    ),
    image: "/services/nail-art.jpg",
  },
  {
    slug: "bridal-makeup",
    title: "Bridal Makeup",
    price: "Rs. 4000",
    about:
      "Achieve a flawless, elegant, and picture-perfect bridal look designed specially to complement your features, outfit, and wedding style.",
    includedShort: splitBullets(
      "• HD/Airbrush Makeup \n• Skin Preparation \n• Eye Makeup \n• Contouring & Highlighting \n• 4 more services....",
    ),
    image:
      "/services/bridal-makeup.jpg",
  },
  {
    slug: "haircut-styling",
    title: "Haircut & Styling",
    price: "Rs. 4000",
    about:
      "A professional hair service designed to refresh your look with the right cut, shape and styling according to your face, hair type and personal preference.",
    includedShort: splitBullets(
      "• Hair consultation \n• Hair wash \n• Professional haircut \n• Blow-dry & styling \n• 2 more services....",
    ),
    image:
      "/services/haircut-styling.jpg",
  },
  {
    slug: "hair-spa",
    title: "Hair Spa",
    price: "Rs. 4000",
    about:
      "A deeply nourishing hair treatment designed to restore moisture, improve hair texture and give your hair a healthy, smooth and refreshed finish.",
    includedShort: splitBullets(
      "• Hair & scalp cleansing \n• Nourishing hair treatment \n• Scalp massage \n• Steam therapy \n• 3 more services....",
    ),
    image: "/services/hair-spa.jpg",
  },
  {
    slug: "hair-colour",
    title: "Hair Colour",
    price: "Rs. 4000",
    about:
      "A professional hair-colouring service designed to refresh your look, enhance your natural features and add beautiful depth, dimension or a completely new shade to your hair.",
    includedShort: splitBullets(
      "• Colour consultation \n• Shade selection \n• Hair sectioning & application \n• Professional colour processing \n• 3 more services....",
    ),
    image: "/services/hair-colour.jpg",
  },
  {
    slug: "hair-treatment",
    title: "Hair Treatment",
    price: "Rs. 4000",
    about:
      "A customised treatment designed to nourish, repair and rejuvenate your hair while improving its overall texture, strength and appearance.",
    includedShort: splitBullets(
      "• Hair & scalp analysis \n• Deep cleansing \n• Treatment application \n• Scalp massage \n• 4 more services....",
    ),
    image: "/services/hair-treatment.jpg",
  },
];
