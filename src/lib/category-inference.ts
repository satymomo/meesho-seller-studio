// Demo-only category inference layer. Every result is hard-coded and deterministic.
// Swap `inferProduct` for a real vision + SKU-metadata model later; the UI only depends on `ProductInsight`.

export type CategoryKey = "kurti" | "shoes" | "handbag" | "cookware";

export type CategoryPreset = {
  name: string;
  note: string;
  family: string;
  premium: boolean;
  /** CSS filter used to preview this look on the seller's own photo (non-kurti demo). */
  filter: string;
};

export type CategoryProfile = {
  key: CategoryKey;
  category: string;
  subcategory: string;
  shotPlan: string[];
  buyerNeeds: string[];
  presetFamilies: string[];
  presets: CategoryPreset[];
};

export type ProductInsight = {
  sku: string;
  profile: CategoryProfile;
  leaf: string;
  attributes: { label: string; value: string }[];
  recommended: string[];
  confidence: number;
};

export const categoryProfiles: Record<CategoryKey, CategoryProfile> = {
  kurti: {
    key: "kurti",
    category: "Women Ethnic",
    subcategory: "Kurtis",
    shotPlan: ["Front", "Side", "Embroidery detail", "Flare", "Lifestyle"],
    buyerNeeds: ["True fabric colour", "Print and embroidery", "Length and fit"],
    presetFamilies: ["Studio", "Festive", "Lifestyle", "Detail"],
    presets: [],
  },
  shoes: {
    key: "shoes",
    category: "Footwear",
    subcategory: "Women Casual Shoes",
    shotPlan: ["Front", "Side", "Sole", "On-foot", "Close-up"],
    buyerNeeds: ["Sole grip", "Material texture", "How it looks worn"],
    presetFamilies: ["Studio", "On-foot", "Street", "Detail"],
    presets: [
      { name: "Safed Floor", note: "Clean studio floor", family: "Studio", premium: false, filter: "brightness(1.12) saturate(0.9)" },
      { name: "Sadak Style", note: "Street walk look", family: "Street", premium: false, filter: "contrast(1.1) saturate(1.15)" },
      { name: "Paon Pe", note: "Shown on-foot", family: "On-foot", premium: false, filter: "sepia(0.15) brightness(1.05)" },
      { name: "Sole Close-up", note: "Grip and stitching", family: "Detail", premium: true, filter: "contrast(1.25) saturate(1.1)" },
      { name: "Shaam Walk", note: "Evening outdoor light", family: "Street", premium: true, filter: "sepia(0.3) saturate(1.3) brightness(0.95)" },
    ],
  },
  handbag: {
    key: "handbag",
    category: "Bags & Accessories",
    subcategory: "Handbags",
    shotPlan: ["Front", "Inside", "Hardware close-up", "Scale-on-person", "Lifestyle"],
    buyerNeeds: ["Real size", "Inside pockets", "Hardware finish"],
    presetFamilies: ["Studio", "Lifestyle", "Scale", "Detail"],
    presets: [
      { name: "Safed Shaan", note: "Crisp catalogue look", family: "Studio", premium: false, filter: "brightness(1.1) saturate(0.95)" },
      { name: "Kandhe Pe", note: "Carried on shoulder", family: "Scale", premium: false, filter: "sepia(0.12) brightness(1.04)" },
      { name: "Office Chal", note: "Work-day lifestyle", family: "Lifestyle", premium: false, filter: "contrast(1.08) saturate(1.05)" },
      { name: "Sona Detail", note: "Hardware close-up", family: "Detail", premium: true, filter: "contrast(1.2) saturate(1.2)" },
      { name: "Party Raat", note: "Evening party look", family: "Lifestyle", premium: true, filter: "brightness(0.8) contrast(1.2) saturate(1.2)" },
    ],
  },
  cookware: {
    key: "cookware",
    category: "Home & Kitchen",
    subcategory: "Cookware",
    shotPlan: ["Front", "Size reference", "Interior", "In-use", "Feature close-up"],
    buyerNeeds: ["Actual size", "Coating quality", "Handle and base"],
    presetFamilies: ["Studio", "In-use", "Kitchen", "Detail"],
    presets: [
      { name: "Saaf Counter", note: "Clean kitchen counter", family: "Studio", premium: false, filter: "brightness(1.1) saturate(0.95)" },
      { name: "Rasoi Ready", note: "Food cooking inside", family: "In-use", premium: false, filter: "sepia(0.25) saturate(1.3)" },
      { name: "Size Dikhao", note: "Next to a hand for scale", family: "Kitchen", premium: false, filter: "contrast(1.05) brightness(1.05)" },
      { name: "Coating Close-up", note: "Non-stick surface", family: "Detail", premium: true, filter: "contrast(1.25) brightness(0.95)" },
      { name: "Tyohar Thali", note: "Festive family table", family: "Kitchen", premium: true, filter: "sepia(0.35) saturate(1.45)" },
    ],
  },
};

const demoCatalogue: Record<string, Omit<ProductInsight, "profile"> & { key: CategoryKey }> = {
  "kurti-embroidered": {
    key: "kurti", sku: "MSH-KUR-24817", leaf: "Straight Embroidered", confidence: 97,
    attributes: [{ label: "Fabric", value: "Cotton blend" }, { label: "Colour", value: "Indigo blue" }, { label: "Price band", value: "₹399–₹599" }, { label: "Occasion", value: "Daily wear" }],
    recommended: ["Safed Shaan", "Ghoomar Glow", "Chalte Chalte"],
  },
  "kurti-floral": {
    key: "kurti", sku: "MSH-KUR-31052", leaf: "Floral Printed", confidence: 96,
    attributes: [{ label: "Fabric", value: "Rayon" }, { label: "Colour", value: "Sky blue" }, { label: "Price band", value: "₹399–₹599" }, { label: "Occasion", value: "Casual" }],
    recommended: ["Safed Shaan", "Chalte Chalte", "Bazaar Bold"],
  },
  "kurti-maroon": {
    key: "kurti", sku: "MSH-KUR-28740", leaf: "Straight Solid", confidence: 95,
    attributes: [{ label: "Fabric", value: "Cotton" }, { label: "Colour", value: "Maroon" }, { label: "Price band", value: "₹499–₹699" }, { label: "Occasion", value: "Office" }],
    recommended: ["Safed Shaan", "Kaali Raat", "Chalte Chalte"],
  },
  "kurti-anarkali": {
    key: "kurti", sku: "MSH-KUR-40219", leaf: "Anarkali", confidence: 98,
    attributes: [{ label: "Fabric", value: "Georgette" }, { label: "Colour", value: "Festive mix" }, { label: "Price band", value: "₹799–₹1,199" }, { label: "Occasion", value: "Festive" }],
    recommended: ["Shaadi Shringar", "Ghoomar Glow", "3D Jadoo"],
  },
  "shoes-sneaker": {
    key: "shoes", sku: "MSH-FTW-10563", leaf: "Suede Sneakers", confidence: 94,
    attributes: [{ label: "Material", value: "Faux suede" }, { label: "Colour", value: "Tan" }, { label: "Price band", value: "₹449–₹699" }, { label: "Sole", value: "Rubber, white" }],
    recommended: ["Safed Floor", "Paon Pe", "Sadak Style"],
  },
  "handbag-tote": {
    key: "handbag", sku: "MSH-BAG-77201", leaf: "Satchel Handbag", confidence: 95,
    attributes: [{ label: "Material", value: "Faux leather" }, { label: "Colour", value: "Wine" }, { label: "Price band", value: "₹599–₹899" }, { label: "Hardware", value: "Gold tone" }],
    recommended: ["Safed Shaan", "Kandhe Pe", "Office Chal"],
  },
  "cookware-kadai": {
    key: "cookware", sku: "MSH-KIT-55318", leaf: "Non-stick Kadai", confidence: 96,
    attributes: [{ label: "Material", value: "Aluminium, non-stick" }, { label: "Size", value: "24 cm" }, { label: "Price band", value: "₹349–₹549" }, { label: "Handle", value: "Wood finish" }],
    recommended: ["Saaf Counter", "Rasoi Ready", "Size Dikhao"],
  },
};

/** Deterministic demo inference: reads the product id and returns a category-aware insight. */
export function inferProduct(productId: string | null): ProductInsight {
  const entry = demoCatalogue[productId ?? ""] ?? {
    ...demoCatalogue["kurti-embroidered"]!,
    sku: "NEW-UPLOAD",
    confidence: 88,
  };
  const { key, ...rest } = entry;
  return { ...rest, profile: categoryProfiles[key] };
}
