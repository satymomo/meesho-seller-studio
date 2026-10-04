import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ChevronLeft,
  Download,
  LayoutGrid,
  Crown,
  Mic,
  MousePointer2,
  ImagePlus,
  Plus,
  Share2,
  ShoppingBag,
  Sparkles,
  ScanSearch,
  WandSparkles,
  X,
} from "lucide-react";

import blueKurti from "@/assets/blue-kurti.jpg";
import maroonKurti from "@/assets/maroon-kurti.jpg";
import anarkaliKurti from "@/assets/anarkali-kurti.jpg";
import shoesPhoto from "@/assets/shoes.jpg";
import handbagPhoto from "@/assets/handbag.jpg";
import cookwarePhoto from "@/assets/cookware.jpg";
import originalPhoto from "@/assets/original.png.asset.json";
import whiteFront from "@/assets/white.png.asset.json";
import whiteSide from "@/assets/white_side.png.asset.json";
import whiteClose from "@/assets/white_close.png.asset.json";
import whiteBack from "@/assets/white_back.png.asset.json";
import whiteSleeve from "@/assets/white_sleeve.png.asset.json";
import whiteDimensions from "@/assets/white_dimn.png.asset.json";
import festiveFront from "@/assets/festive.png.asset.json";
import festiveSide from "@/assets/festive_side.png.asset.json";
import festiveClose from "@/assets/festive_close.png.asset.json";
import festiveBack from "@/assets/festive_back.png.asset.json";
import festiveSleeve from "@/assets/festive_sleeve.png.asset.json";
import festiveDimensions from "@/assets/festive_dimn.png.asset.json";
import twirlFront from "@/assets/twirl.png.asset.json";
import twirlSide from "@/assets/twirl_side.png.asset.json";
import twirlClose from "@/assets/twirl_close.png.asset.json";
import twirlBack from "@/assets/twirl_back.png.asset.json";
import twirlSleeve from "@/assets/twirl_sleeve.png.asset.json";
import twirlDimensions from "@/assets/twirl_dimn.png.asset.json";
import boldFront from "@/assets/meesho-bold.png.asset.json";
import boldSide from "@/assets/meesho-bold_side.png.asset.json";
import boldClose from "@/assets/meesho-bold_close.png.asset.json";
import boldBack from "@/assets/meesho-bold_back.png.asset.json";
import boldSleeve from "@/assets/meesho-bold_sleeve.png.asset.json";
import boldDimensions from "@/assets/meesho-bold_dimn.png.asset.json";
import threeDFront from "@/assets/3D.png.asset.json";
import threeDSide from "@/assets/3D_side.png.asset.json";
import threeDClose from "@/assets/3D_close.png.asset.json";
import threeDBack from "@/assets/3D_back.png.asset.json";
import threeDSleeve from "@/assets/3D_sleeve.png.asset.json";
import threeDDimensions from "@/assets/3D_dimn.png.asset.json";
import motionFront from "@/assets/motion.png.asset.json";
import motionSide from "@/assets/motion_side.png.asset.json";
import motionClose from "@/assets/motion_close.png.asset.json";
import motionBack from "@/assets/motion_back.png.asset.json";
import motionSleeve from "@/assets/motion_sleeve.png.asset.json";
import motionDimensions from "@/assets/motion_dimn.png.asset.json";
import blackFront from "@/assets/black.png.asset.json";
import blackSide from "@/assets/black_side.png.asset.json";
import blackClose from "@/assets/black_close.png.asset.json";
import blackBack from "@/assets/black_back.png.asset.json";
import blackSleeve from "@/assets/black_sleeve.png.asset.json";
import blackDimensions from "@/assets/black_dimn.png.asset.json";
import { Button } from "@/components/ui/button";
import { inferProduct } from "@/lib/category-inference";

type Screen = "home" | "studio" | "understanding" | "creation" | "shotSelection" | "loading" | "export" | "save" | "bulk" | "bulkModes" | "bulkAssign" | "bulkPresets" | "bulkLoading" | "bulkResults" | "pricing";
type Product = { id: string; name: string; shortName: string; price: string; image: string };
type Preset = { name: string; note: string; image: string; premium: boolean; family: string; filter: string };
type BulkResult = { product: Product; style: (typeof styles)[number]; image: string };

const defaultProduct: Product = { id: "kurti-embroidered", name: "Blue Embroidered Kurti", shortName: "Blue embroidery", price: "Sample photo", image: originalPhoto.url };
const products: Product[] = [
  defaultProduct,
  { id: "kurti-floral", name: "Blue Floral Kurti", shortName: "Blue kurti", price: "₹499", image: blueKurti },
  { id: "kurti-maroon", name: "Maroon Straight Kurti", shortName: "Maroon kurti", price: "₹599", image: maroonKurti },
  { id: "kurti-anarkali", name: "Festive Anarkali Kurti", shortName: "Festive anarkali", price: "₹899", image: anarkaliKurti },
  { id: "shoes-sneaker", name: "Tan Suede Sneakers", shortName: "Sneakers", price: "₹549", image: shoesPhoto },
  { id: "handbag-tote", name: "Wine Satchel Handbag", shortName: "Handbag", price: "₹699", image: handbagPhoto },
  { id: "cookware-kadai", name: "Non-stick Kadai 24 cm", shortName: "Kadai", price: "₹449", image: cookwarePhoto },
];
const bulkCatalogue = products.filter((product) => product.id.startsWith("kurti"));
const safedShaanShots = [
  { label: "Front", image: whiteFront.url },
  { label: "Side", image: whiteSide.url },
  { label: "Close-up", image: whiteClose.url },
  { label: "Back", image: whiteBack.url },
  { label: "Sleeve", image: whiteSleeve.url },
  { label: "Dimensions", image: whiteDimensions.url },
];
const ghoomarShots = [
  { label: "Front", image: twirlFront.url },
  { label: "Side", image: twirlSide.url },
  { label: "Close-up", image: twirlClose.url },
  { label: "Back", image: twirlBack.url },
  { label: "Sleeve", image: twirlSleeve.url },
  { label: "Dimensions", image: twirlDimensions.url },
];
const bazaarShots = [
  { label: "Front", image: boldFront.url },
  { label: "Side", image: boldSide.url },
  { label: "Close-up", image: boldClose.url },
  { label: "Back", image: boldBack.url },
  { label: "Sleeve", image: boldSleeve.url },
  { label: "Dimensions", image: boldDimensions.url },
];
const shaadiShots = [
  { label: "Front", image: festiveFront.url },
  { label: "Side", image: festiveSide.url },
  { label: "Close-up", image: festiveClose.url },
  { label: "Back", image: festiveBack.url },
  { label: "Sleeve", image: festiveSleeve.url },
  { label: "Dimensions", image: festiveDimensions.url },
];
const chalteChalteShots = [
  { label: "Front", image: motionFront.url },
  { label: "Side", image: motionSide.url },
  { label: "Close-up", image: motionClose.url },
  { label: "Back", image: motionBack.url },
  { label: "Sleeve", image: motionSleeve.url },
  { label: "Dimensions", image: motionDimensions.url },
];
const chandniShots = [
  { label: "Front", image: blackFront.url },
  { label: "Side", image: blackSide.url },
  { label: "Close-up", image: blackClose.url },
  { label: "Back", image: blackBack.url },
  { label: "Sleeve", image: blackSleeve.url },
  { label: "Dimensions", image: blackDimensions.url },
];
const jadoo3DShots = [
  { label: "Front", image: threeDFront.url },
  { label: "Side", image: threeDSide.url },
  { label: "Close-up", image: threeDClose.url },
  { label: "Back", image: threeDBack.url },
  { label: "Sleeve", image: threeDSleeve.url },
  { label: "Dimensions", image: threeDDimensions.url },
];
const presetShots: Record<string, typeof safedShaanShots> = {
  "Safed Shaan": safedShaanShots,
  "Shaadi Shringar": shaadiShots,
  "Ghoomar Glow": ghoomarShots,
  "Bazaar Bold": bazaarShots,
  "Chalte Chalte": chalteChalteShots,
  "Chandni": chandniShots,
  "3D Jadoo": jadoo3DShots,
};

const styles = [
  { name: "Safed Shaan", note: "Crisp catalogue look", image: whiteFront.url, premium: false },
  { name: "Shaadi Shringar", note: "Festive and full of colour", image: festiveFront.url, premium: false },
  { name: "Ghoomar Glow", note: "A graceful twirl", image: twirlFront.url, premium: false },
  { name: "Bazaar Bold", note: "Stand out in style", image: boldFront.url, premium: true },
  { name: "3D Jadoo", note: "A striking display", image: threeDFront.url, premium: true },
  { name: "Chalte Chalte", note: "On-the-move look", image: motionFront.url, premium: true },
  { name: "Chandni", note: "Dramatic dark look", image: blackFront.url, premium: true },
] as const;
const kurtiFamilies: Record<string, string> = {
  "Safed Shaan": "Studio", "Shaadi Shringar": "Festive", "Ghoomar Glow": "Lifestyle", "Bazaar Bold": "Lifestyle",
  "3D Jadoo": "Detail", "Chalte Chalte": "Lifestyle", "Chandni": "Studio",
};

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: ReactNode }) {
  return (
    <Button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full bg-glass text-ink ring-1 ring-line transition hover:bg-brand-soft active:scale-95"
    >
      {children}
    </Button>
  );
}


function VoiceAssistant({
  listening,
  open,
  onToggle,
  onListen,
}: {
  listening: boolean;
  open: boolean;
  onToggle: () => void;
  onListen: () => void;
}) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 px-5">
      {open && (
        <div className="pointer-events-auto mb-3 ml-auto w-[min(290px,calc(100vw-40px))] rounded-2xl bg-glass p-4 shadow-lg ring-1 ring-line backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[14px] font-semibold text-ink">Voice assistant</div>
              <p className="mt-1 text-[12px] text-ink-2">“Meri blue kurti ki festive photo bana do”</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              aria-label="Close voice assistant"
              onClick={onToggle}
              className="size-7 shrink-0 rounded-full text-ink-2"
            >
              <X size={16} />
            </Button>
          </div>
          <Button
            type="button"
            onClick={onListen}
            className="mt-4 w-full rounded-full bg-brand text-primary-foreground hover:bg-brand/90"
          >
            <Mic size={16} />
            {listening ? "Stop listening" : "Start voice note"}
          </Button>
          <p className="mt-2 text-center text-[10px] text-ink-2">Voice notes are a demo in this preview.</p>
        </div>
      )}
      <div className="flex justify-end">
        <Button
          type="button"
          aria-label={open ? "Close voice assistant" : "Open voice assistant"}
          title="Voice assistant"
          onClick={onToggle}
          className="pointer-events-auto size-14 rounded-full bg-brand p-0 text-primary-foreground shadow-lg ring-4 ring-glass hover:bg-brand/90 active:scale-95"
        >
          {listening ? (
            <span className="flex h-5 items-end gap-[3px]">
              {[1, 2, 3, 4, 5].map((bar) => (
                <span key={bar} className="mic-bar h-5 w-[3px] rounded-full bg-current" />
              ))}
            </span>
          ) : (
            <Mic size={23} />
          )}
        </Button>
      </div>
    </div>
  );
}

function AgentCursor({ x, y, visible, tapping, label }: { x: number; y: number; visible: boolean; tapping: boolean; label: string }) {
  if (!visible) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[80] transition-all duration-500 ease-in-out motion-reduce:transition-none"
      style={{ left: x, top: y }}
    >
      {tapping && <span className="absolute -inset-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 animate-ping" />}
      <span className={`relative grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-primary-foreground shadow-lg ring-2 ring-background transition-transform ${tapping ? "scale-90" : "scale-100"}`}>
        <MousePointer2 size={16} />
      </span>
      <span className="absolute left-5 top-4 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-background shadow">{label}</span>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meesho Seller Studio — Product Photo Maker" },
      {
        name: "description",
        content: "A simple seller workspace to create better product photos for your Meesho catalogue.",
      },
      { property: "og:title", content: "Meesho Seller Studio" },
      { property: "og:description", content: "Create simple, catalogue-ready product photos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [onlineDemo, setOnlineDemo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(defaultProduct);
  const [selectedStyle, setSelectedStyle] = useState("Safed Shaan");
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [toast, setToast] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedName, setUploadedName] = useState("");
  const [bulkSelection, setBulkSelection] = useState<string[]>([defaultProduct.name, "Maroon Straight Kurti"]);
  const [bulkStyle, setBulkStyle] = useState("Safed Shaan");
  const [bulkMode, setBulkMode] = useState<"one-each" | "same-look" | "mix-looks">("same-look");
  const [bulkAssignments, setBulkAssignments] = useState<Record<string, string>>({});
  const [bulkMulti, setBulkMulti] = useState<string[]>(["Safed Shaan", "Shaadi Shringar"]);
  const [bulkResults, setBulkResults] = useState<BulkResult[]>([]);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkError, setBulkError] = useState("");
  const [upgradeStyle, setUpgradeStyle] = useState("");
  const [selectedShots, setSelectedShots] = useState<number[]>([]);
  const [activeShot, setActiveShot] = useState(0);
  const [previewStyle, setPreviewStyle] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [autoPilot, setAutoPilot] = useState(false);
  const autoTimers = useRef<number[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, tapping: false, label: "" });

  const currentImage = uploadedImage ?? selectedProduct.image;
  const insight = inferProduct(uploadedImage ? null : selectedProduct.id);
  const isKurti = insight.profile.key === "kurti";
  const basePresets: Preset[] = isKurti
    ? styles.map((style) => ({ name: style.name, note: style.note, image: style.image, premium: style.premium, family: kurtiFamilies[style.name] ?? "Studio", filter: "" }))
    : insight.profile.presets.map((preset) => ({ ...preset, image: currentImage }));
  const presetList = [...basePresets].sort((a, b) => Number(insight.recommended.includes(b.name)) - Number(insight.recommended.includes(a.name)));
  const activePreset = presetList.find((preset) => preset.name === selectedStyle) ?? presetList[0] ?? { name: "Safed Shaan", note: "Catalogue look", image: whiteFront.url, premium: false, family: "Studio", filter: "" };
  const previewPreset = presetList.find((preset) => preset.name === previewStyle);
  const displayFilter = activePreset.filter || "none";
  const selectedBulkProducts = products.filter((product) => bulkSelection.includes(product.name));
  const bulkPairs = selectedBulkProducts.flatMap((product) => {
    if (bulkMode === "one-each") {
      const style = styles.find((item) => item.name === (bulkAssignments[product.name] ?? "Safed Shaan"));
      return style ? [{ product, style }] : [];
    }
    if (bulkMode === "mix-looks") {
      return styles.filter((style) => bulkMulti.includes(style.name)).map((style) => ({ product, style }));
    }
    const style = styles.find((item) => item.name === bulkStyle);
    return style ? [{ product, style }] : [];
  });
  const activeShots = presetShots[activePreset.name];
  const previewShotsList = previewPreset ? presetShots[previewPreset.name] : undefined;
  const shots = activeShots && isKurti ? activeShots.map((shot) => shot.label) : insight.profile.shotPlan;
  const previewShots = previewShotsList && isKurti ? previewShotsList.map((shot) => shot.label) : insight.profile.shotPlan;
  const selectedSet = selectedShots;
  const shotImage = (index: number) => activeShots && isKurti ? (activeShots[index]?.image ?? activePreset.image) : activePreset.image;
  const previewShotImage = (index: number) => previewShotsList && isKurti ? (previewShotsList[index]?.image ?? previewPreset?.image) : previewPreset?.image;
  const shotFilter = (index: number) => activeShots && isKurti ? "none" : `${displayFilter === "none" ? "" : displayFilter} ${["", "brightness(1.08)", "contrast(1.12)", "saturate(1.1)", "brightness(0.95) contrast(1.08)"][index % 5]}`.trim() || "none";
  const previewShotFilter = (index: number) => previewShotsList && isKurti ? "none" : `${previewPreset?.filter ?? ""} ${["", "brightness(1.08)", "contrast(1.12)", "saturate(1.1)", "brightness(0.95) contrast(1.08)"][index % 5]}`.trim() || "none";
  const scrollGalleryTo = (index: number) => {
    setActiveShot(index);
    galleryRef.current?.scrollTo({
      left: index * galleryRef.current.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };
  const moveGallery = (direction: number) => {
    const next = Math.max(0, Math.min((previewStyle ? previewShots : shots).length - 1, activeShot + direction));
    scrollGalleryTo(next);
  };
  useEffect(() => {
    if (screen !== "loading" && screen !== "understanding") return;
    const progress = window.setInterval(() => setLoadingStep((step) => Math.min(step + 1, 3)), screen === "understanding" ? 500 : 650);
    return () => {
      window.clearInterval(progress);
    };
  }, [screen]);

  useEffect(() => {
    if (screen !== "understanding" || autoPilot) return;
    const timer = window.setTimeout(() => setScreen("creation"), 3000);
    return () => window.clearTimeout(timer);
  }, [screen, autoPilot]);

  useEffect(() => () => autoTimers.current.forEach((t) => window.clearTimeout(t)), []);

  // Agentic cursor: flies to a control, pulses a "tap", moves on.
  const moveCursor = (selector: string, label: string, tapping = false) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, visible: true, tapping, label });
  };
  const hideCursor = () => setCursor((current) => ({ ...current, visible: false, tapping: false }));

  // Hard-coded demo: "Meri blue kurti ki festive photo bana do" → blue kurti → Shaadi Shringar → photo selection.
  function runVoiceFlow() {
    autoTimers.current.forEach((t) => window.clearTimeout(t));
    autoTimers.current = [];
    const festive = "Shaadi Shringar";
    const shotsCount = (presetShots[festive] ?? []).length || 6;
    const steps: [number, () => void][] = [
      [0, () => { setAutoPilot(true); setVoiceOpen(false); showToast("Samajh gaya! Blue kurti ki festive photos bana raha hoon"); setUploadedImage(null); setUploadedName(""); setPreviewStyle(null); setScreen("studio"); }],
      [500, () => moveCursor(`[data-agent="product-${defaultProduct.name}"]`, "Selecting product")],
      [1100, () => { moveCursor(`[data-agent="product-${defaultProduct.name}"]`, "Selecting product", true); setSelectedProduct(defaultProduct); }],
      [1800, () => moveCursor('[data-agent="next-preset"]', "Continuing")],
      [2400, () => { moveCursor('[data-agent="next-preset"]', "Continuing", true); setLoadingStep(0); setActiveShot(0); setScreen("understanding"); }],
      [3200, () => moveCursor('[data-agent="understanding"]', "Reading product")],
      [4200, () => setScreen("creation")],
      [4800, () => moveCursor(`[data-agent="preset-${festive}"]`, "Opening festive look")],
      [5400, () => { moveCursor(`[data-agent="preset-${festive}"]`, "Opening festive look", true); setPreviewStyle(festive); setActiveShot(0); }],
    ];
    // Visit every shot in the catalogue before the voice demo chooses it.
    for (let index = 1; index < shotsCount; index += 1) {
      steps.push([6200 + (index - 1) * 600, () => {
        moveCursor(`[data-agent="catalogue-shot-${index}"]`, "Browsing catalogue", true);
        scrollGalleryTo(index);
      }]);
    }
    const lastShotTime = 6200 + Math.max(0, shotsCount - 2) * 600;
    steps.push(
      [lastShotTime + 750, () => moveCursor('[data-agent="choose-catalogue"]', "Choosing catalogue")],
      [lastShotTime + 1250, () => { moveCursor('[data-agent="choose-catalogue"]', "Choosing catalogue", true); setSelectedStyle(festive); setSelectedShots(Array.from({ length: shotsCount }, (_, i) => i)); setActiveShot(0); setPreviewStyle(null); setScreen("shotSelection"); setAutoPilot(false); hideCursor(); }],
    );
    autoTimers.current = steps.map(([delay, fn]) => window.setTimeout(fn, delay));
  }

  useEffect(() => {
    setVoiceOpen(false);
  }, [screen]);

  const startGeneration = async () => {
    setLoadingStep(0);
    setActiveShot(selectedShots[0] ?? 0);
    setScreen("loading");
    await new Promise<void>((resolve) => window.setTimeout(resolve, 1900));
    setScreen("export");
  };

  const generatePhoto = () => {
    if (activePreset.premium) {
      setUpgradeStyle(activePreset.name);
      setUpgradeOpen(true);
      return;
    }
    void startGeneration();
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const getShotFile = async (index: number) => {
    const response = await fetch(shotImage(index));
    if (!response.ok) throw new Error("Could not load photo");
    const bitmap = await createImageBitmap(await response.blob());
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare photo");
    context.filter = shotFilter(index);
    context.drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Could not prepare photo");
    return new File([blob], `${activePreset.name.toLowerCase().replaceAll(" ", "-")}-${shots[index]?.toLowerCase().replaceAll(" ", "-")}.png`, { type: "image/png" });
  };

  const downloadPhoto = async () => {
    try {
      for (const index of selectedSet) {
        const file = await getShotFile(index);
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
        await new Promise<void>((resolve) => window.setTimeout(resolve, 200));
      }
    } catch { showToast("Download unavailable right now"); }
  };

  const sharePhoto = async () => {
    try {
      const files = await Promise.all(selectedSet.map(getShotFile));
      if (!navigator.canShare?.({ files })) {
        showToast("Sharing isn't available here. Use Download HD instead.");
        return;
      }
      await navigator.share({ files });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      showToast("Could not share these photos. Use Download HD instead.");
    }
  };

  const finishFlow = () => {
    if (uploadedImage?.startsWith("blob:")) URL.revokeObjectURL(uploadedImage);
    setUploadedImage(null);
    setUploadedName("");
    setSelectedProduct(defaultProduct);
    setLoadingStep(0);
    setScreen("home");
    showToast("Done. Your catalogue selection is ready.");
  };

  const toggleBulk = (name: string) => {
    setBulkSelection((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  };

  const createBulkPhotos = async () => {
    if (bulkPairs.length === 0) return;
    const premium = bulkPairs.find(({ style }) => style.premium);
    if (premium) {
      setUpgradeStyle(premium.style.name);
      setUpgradeOpen(true);
      return;
    }
    setBulkResults([]);
    setBulkError("");
    setBulkProgress(0);
    setScreen("bulkLoading");
    const results: BulkResult[] = [];
    try {
      for (const { product, style } of bulkPairs) {
        const image = style.image;
        results.push({ product, style, image });
        setBulkProgress(results.length);
        await new Promise<void>((resolve) => window.setTimeout(resolve, 260));
      }
      setBulkResults(results);
      setScreen("bulkResults");
    } catch (error) {
      setBulkError(error instanceof Error ? error.message : "Could not make your photos. Please try again.");
    }
  };

  const renderHeader = (title: string, eyebrow: string, back: () => void) => (
    <div className="flex items-center justify-between px-5 pb-4 pt-6">
      <div className="flex items-center gap-3">
        <IconButton label="Go back" onClick={back}>
          <ArrowLeft size={18} />
        </IconButton>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">{eyebrow}</div>
          <h1 className="text-[22px] font-semibold leading-tight text-ink">{title}</h1>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <>
      <header className="flex items-center justify-between border-b border-line bg-background px-5 py-4">
        <div className="flex items-center gap-2.5 text-brand">
          <span className="grid size-9 place-items-center rounded-md bg-brand text-primary-foreground"><ShoppingBag size={20} /></span>
          <span className="text-[22px] font-bold leading-none">meesho</span>
        </div>
        <span className="text-[11px] font-medium text-ink-2">Sharma Fashion Store</span>
      </header>
      <main className="bg-background pb-24">
        <div className="px-5 pb-5 pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-warning px-2.5 py-1 text-[11px] font-bold text-ink"><Sparkles size={13} /> NEW FOR SELLERS</span>
          <h1 className="mt-4 text-[32px] font-bold leading-[1.12] text-ink">Meesho<br />Seller Studio</h1>
          <p className="mt-3 max-w-[310px] text-[14px] leading-relaxed text-ink-2">Make your product photos ready to share. Choose a photo, try a look, and see the difference.</p>
        </div>
        <div className="relative h-[190px] overflow-hidden bg-brand-soft sm:h-[230px]">

          <div className="absolute inset-y-4 left-5 w-[46%] overflow-hidden rounded-md border border-line bg-background shadow-sm">
            <img src={originalPhoto.url} alt="Original embroidered kurti product photo" className="size-full object-contain" />
            <span className="absolute bottom-2 left-2 rounded-sm bg-background px-2 py-1 text-[10px] font-semibold text-ink">Your photo</span>
          </div>
          <div className="absolute inset-y-4 right-5 w-[46%] overflow-hidden rounded-md border-2 border-brand bg-background shadow-md">
             <img src={whiteFront.url} alt="Embroidered kurti in a catalogue look" className="size-full object-cover" />
            <span className="absolute bottom-2 left-2 rounded-sm bg-brand px-2 py-1 text-[10px] font-semibold text-primary-foreground">Studio look</span>
          </div>
          <span className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-primary-foreground shadow-md"><ArrowRight size={17} /></span>
        </div>
        <div className="px-5 pt-6">
          <Button type="button" onClick={() => setScreen("studio")} className="h-13 w-full rounded-md bg-brand text-[15px] font-semibold text-primary-foreground hover:bg-brand/90">
            Start with a photo <ArrowRight size={18} />
          </Button>
          <p className="mt-2 text-center text-[11px] text-ink-2">Try it with a sample photo or your own</p>

          <div className="mt-5 border-l-2 border-warning bg-warning-soft px-3 py-2.5 text-[12px] font-medium text-ink">Help your products appear better than your peers with a complete photo set.</div>
          <div className="mt-7 rounded-md border border-line bg-brand-soft/50 p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">How it works</div>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-1.5">
              <div className="flex flex-col items-center text-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background text-brand shadow-sm"><ImagePlus size={18} /></span>
                <span className="mt-2 text-[11px] font-semibold leading-tight text-ink">Choose photo</span>
                <span className="mt-1 text-[10px] leading-snug text-ink-2">From your phone</span>
              </div>
              <ArrowRight className="mt-3 shrink-0 text-brand/60" size={15} />
              <div className="flex flex-col items-center text-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background text-brand shadow-sm"><Sparkles size={18} /></span>
                <span className="mt-2 text-[11px] font-semibold leading-tight text-ink">Try a look</span>
                <span className="mt-1 text-[10px] leading-snug text-ink-2">Tap a preset</span>
              </div>
              <ArrowRight className="mt-3 shrink-0 text-brand/60" size={15} />
              <div className="flex flex-col items-center text-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background text-brand shadow-sm"><Share2 size={18} /></span>
                <span className="mt-2 text-[11px] font-semibold leading-tight text-ink">Save & share</span>
                <span className="mt-1 text-[10px] leading-snug text-ink-2">Download or post</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
            <Button type="button" variant="ghost" onClick={() => setScreen("bulk")} className="h-auto p-0 text-[12px] font-medium text-brand hover:bg-transparent">Create many <ChevronRight size={15} /></Button>
            <Button type="button" variant="ghost" onClick={() => setScreen("pricing")} className="h-auto p-0 text-[12px] font-medium text-brand hover:bg-transparent">Plans & pricing <ChevronRight size={15} /></Button>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-md bg-cool px-3.5 py-3">
            <div className="min-w-0">
              <label htmlFor="demo-mode" className="text-[12px] font-semibold text-ink">Demo mode: {onlineDemo ? "Online" : "Offline"}</label>
              <p className="mt-0.5 text-[10px] leading-snug text-ink-2">{onlineDemo ? "Catalogue preview stays local; no live creation." : "Shows local preset samples without online generation."}</p>
            </div>
            <Button id="demo-mode" type="button" role="switch" aria-label="Online demo mode" aria-checked={onlineDemo} onClick={() => setOnlineDemo((value) => !value)} className={`h-6 w-11 shrink-0 rounded-full p-0 transition-colors ${onlineDemo ? "bg-brand hover:bg-brand/90" : "bg-input hover:bg-line"}`}>
              <span className={`block size-4 rounded-full bg-background shadow-sm transition-transform ${onlineDemo ? "translate-x-2.5" : "-translate-x-2.5"}`} />
            </Button>
          </div>
        </div>
      </main>
    </>
  );

  const renderStudio = () => (
    <>
      {renderHeader("Select a photo", "Step 1 of 6", () => setScreen("home"))}
      <main className="space-y-3 pb-28">
        <div className="bg-background px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
              <ShoppingBag size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-ink">Sharma Fashion Store</div>
              <div className="text-[11px] text-ink-2">Choose a product photo</div>
            </div>
              <span className="text-[11px] font-semibold text-brand">1 / 6</span>
          </div>
          <div className="mt-4 -mx-5 bg-cool">
            <img
              src={currentImage}
              alt={selectedProduct.name}
              width={768}
              height={960}
              className="aspect-[4/3] w-full object-contain"
            />
          </div>
           <div className="flex items-center justify-between pt-3">
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold text-ink">{uploadedName || selectedProduct.name}</div>
              <div className="text-[11px] text-ink-2">
                {uploadedImage ? "Photo from your phone" : `${selectedProduct.price} · Your catalogue`}
              </div>
            </div>
            <Check className="shrink-0 text-brand" size={18} />
          </div>
         </div>
         <section className="bg-background px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-ink">Your photos</h2>
            <span className="text-[11px] text-ink-2">Tap to select</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {products.map((product) => (
              <Button
                variant="ghost"
                type="button"
                key={product.name}
                data-agent={`product-${product.name}`}
                aria-label={`Select ${product.name}`}
                aria-pressed={selectedProduct.name === product.name && !uploadedImage}
                onClick={() => {
                  setSelectedProduct(product);
                  setUploadedImage(null);
                  setUploadedName("");
                }}
                className={`relative h-auto min-w-0 flex-col gap-1 overflow-hidden rounded-md p-0 text-left ring-2 ${selectedProduct.name === product.name && !uploadedImage ? "ring-brand" : "ring-transparent"}`}
              >
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  width={768}
                  height={960}
                  className="aspect-square w-full object-cover"
                />
                <span className="w-full truncate px-1 pb-1 text-[10px] text-ink">{product.shortName}</span>
                {selectedProduct.name === product.name && !uploadedImage && (
                  <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-brand text-primary-foreground">
                    <Check size={12} />
                  </span>
                )}
              </Button>
            ))}
            <label
              className={`relative flex cursor-pointer flex-col gap-1 overflow-hidden rounded-md ring-2 ${uploadedImage ? "ring-brand" : "ring-transparent"}`}
            >
              <span className="grid aspect-square place-items-center bg-brand-soft text-brand">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded product" className="size-full object-cover" />
                ) : (
                  <ImagePlus size={23} />
                )}
              </span>
              <span className="truncate px-1 pb-1 text-[10px] text-ink">Add photo</span>
              <input
                type="file"
               accept="image/jpeg,image/png,image/webp"
                aria-label="Upload a product photo"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                     if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 15_000_000) {
                       showToast("Choose a JPG, PNG or WebP photo under 15 MB");
                       return;
                     }
                    if (uploadedImage) URL.revokeObjectURL(uploadedImage);
                    setUploadedImage(URL.createObjectURL(file));
                    setUploadedName(file.name);
                  }
                }}
              />
              {uploadedImage && (
                <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-brand text-primary-foreground">
                  <Check size={12} />
                </span>
              )}
            </label>
          </div>
        </section>
        <div className="px-5 pt-2">
          <Button
            type="button"
            data-agent="next-preset"
             onClick={() => { setLoadingStep(0); setActiveShot(0); setSelectedShots(insight.profile.shotPlan.map((_, index) => index)); setSelectedStyle(insight.recommended[0] ?? "Safed Shaan"); setPreviewStyle(null); setScreen("understanding"); }}
            className="flex h-12 w-[calc(100%-72px)] items-center justify-center gap-2 rounded-md bg-brand text-[14px] font-semibold text-primary-foreground hover:bg-brand/90"
          >
            Next: choose a preset <ArrowRight size={18} />
          </Button>
        </div>
      </main>
    </>
  );

  const renderUnderstanding = () => {
    const ready = loadingStep >= 3;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 px-5" role="presentation">
        <section role="dialog" aria-modal="true" aria-labelledby="product-title" data-agent="understanding" className="w-full max-w-[350px] overflow-hidden rounded-md bg-background p-5 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-cool">
              <img src={currentImage} alt="" className="size-full object-cover" />
              {!ready && <span className="scan-line absolute inset-x-0 h-8 bg-brand/25" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-brand"><ScanSearch size={14} />{ready ? "Product detected" : "Scanning product…"}</div>
              <h1 id="product-title" className="mt-1 text-[17px] font-semibold leading-tight text-ink">{ready ? insight.leaf : "Understanding your photo"}</h1>
              {ready && <p className="mt-1 text-[11px] text-ink-2">{insight.profile.category} › {insight.profile.subcategory}</p>}
            </div>
          </div>
           {ready && <div className="fade-up mt-4 border-t border-line pt-4">
             <p className="text-[12px] font-semibold text-ink">{insight.sku} · {insight.profile.subcategory}</p>
             <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
               {insight.attributes.map(({ label, value }) => <div key={label}><dt className="text-[10px] text-ink-2">{label}</dt><dd className="text-[12px] font-medium text-ink">{value}</dd></div>)}
             </dl>
           </div>}
        </section>
      </div>
    );
  };

  const renderCreation = () => (
    <>
      {renderHeader("Choose a preset", "Step 2 of 6", () => setScreen("studio"))}
      <main className="bg-background px-5 pb-28 pt-4">
        <p className="mb-4 text-[13px] text-ink-2">{uploadedName || selectedProduct.name} · {insight.profile.subcategory}</p>
        <div className="mb-4 flex items-center justify-between gap-2"><h2 className="text-[15px] font-semibold text-ink">Browse catalogue looks</h2><span className="shrink-0 text-[11px] text-ink-2">{presetList.filter((p) => !p.premium).length} free · {presetList.filter((p) => p.premium).length} premium</span></div>
        <div className="grid grid-cols-2 gap-3">
          {presetList.map((style) => (
            <Button key={style.name} type="button" variant="ghost" data-agent={`preset-${style.name}`} aria-label={`Preview ${style.name} catalogue`} onClick={() => { setPreviewStyle(style.name); setActiveShot(0); }} className="h-auto min-w-0 flex-col items-stretch gap-0 overflow-hidden rounded-md border border-line p-0 text-left hover:bg-brand-soft">
              <span className="relative block aspect-[4/5] w-full overflow-hidden bg-cool">
                <img src={style.image} alt="" className="size-full object-cover" style={{ filter: style.filter || "none" }} />
                {style.premium && <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background text-warning" aria-label="Premium preset"><Crown size={15} /></span>}
                {insight.recommended.includes(style.name) && <span className="absolute bottom-2 left-2 rounded-sm bg-warning px-1.5 py-0.5 text-[10px] font-semibold text-ink">For you</span>}
              </span>
              <span className="block w-full px-2.5 py-2"><span className="block text-[12px] font-semibold text-ink">{style.name}</span><span className="block text-[11px] text-ink-2">{style.family} · {style.premium ? "Premium" : "Free"}</span></span>
            </Button>
          ))}
        </div>
         <p className="mt-5 text-[11px] text-ink-2">Safed Shaan, Shaadi Shringar, Ghoomar Glow, Bazaar Bold, Chalte Chalte, Chandni and 3D Jadoo use sample catalogue photos; other looks are illustrative previews.</p>
      </main>
      {previewPreset && <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-3 sm:items-center" role="presentation" onClick={() => setPreviewStyle(null)}>
        <section role="dialog" aria-modal="true" aria-labelledby="catalogue-preview-title" onClick={(event) => event.stopPropagation()} className="flex max-h-[94dvh] w-full max-w-[390px] flex-col overflow-hidden rounded-md bg-background shadow-xl">
           <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3"><div className="min-w-0"><h2 id="catalogue-preview-title" className="truncate text-[16px] font-semibold text-ink">{previewPreset.name} catalogue</h2><p className="text-[11px] text-ink-2">{previewShots.length} photo styles · {previewPreset.family}</p></div><Button type="button" variant="ghost" size="icon" aria-label="Close catalogue preview" onClick={() => setPreviewStyle(null)}><X size={19} /></Button></div>
           <div data-agent="catalogue-gallery" className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto" onScroll={(event) => { const width = event.currentTarget.clientWidth; if (width) setActiveShot(Math.min(previewShots.length - 1, Math.max(0, Math.round(event.currentTarget.scrollLeft / width)))); }} ref={galleryRef}>
             {previewShots.map((shot, index) => <figure key={shot} className="relative w-full shrink-0 snap-start bg-cool"><img src={previewShotImage(index)} alt={`${shot} catalogue preview`} className="max-h-[56dvh] w-full object-contain" style={{ aspectRatio: "4/5", filter: previewShotFilter(index) }} /><figcaption className="absolute bottom-2 left-3 rounded-sm bg-background/95 px-2 py-1 text-[12px] font-semibold text-ink">{shot}</figcaption></figure>)}
          </div>
            <div className="shrink-0 px-4 pb-4 pt-3"><div className="flex items-center justify-between"><Button type="button" variant="ghost" size="icon" aria-label="Previous catalogue photo" disabled={activeShot === 0} onClick={() => moveGallery(-1)} className="size-9 rounded-full border border-line"><ChevronLeft size={18} /></Button><div className="flex gap-1" aria-label={`Photo ${activeShot + 1} of ${previewShots.length}`}>{previewShots.map((shot, index) => <Button key={shot} type="button" variant="ghost" data-agent={`catalogue-shot-${index}`} aria-label={`Show ${shot} preview`} onClick={() => scrollGalleryTo(index)} className="grid size-8 place-items-center rounded-full p-0"><span className={`block rounded-full transition-all ${activeShot === index ? "size-2.5 bg-brand" : "size-1.5 bg-line"}`} /></Button>)}</div><Button type="button" variant="ghost" size="icon" aria-label="Next catalogue photo" disabled={activeShot === previewShots.length - 1} onClick={() => moveGallery(1)} className="size-9 rounded-full border border-line"><ChevronRight size={18} /></Button></div>
            <p className="mt-1 text-center text-[11px] text-ink-2">Swipe to see the catalogue · demo samples</p>
             <Button type="button" data-agent="choose-catalogue" onClick={() => { setSelectedStyle(previewPreset.name); setSelectedShots(previewShots.map((_, index) => index)); setActiveShot(0); setPreviewStyle(null); setScreen("shotSelection"); }} className="mt-3 h-12 w-full rounded-md bg-brand text-primary-foreground hover:bg-brand/90">Choose this catalogue <ArrowRight size={17} /></Button>
          </div>
        </section>
      </div>}
    </>
  );

  const renderShotSelection = () => (
    <>
      {renderHeader("Choose your photos", "Step 3 of 6", () => { setActiveShot(0); setScreen("creation"); })}
      <main className="bg-background px-5 pb-28 pt-4">
        <div className="mb-3 flex items-center justify-between gap-2"><div className="min-w-0"><h2 className="truncate text-[15px] font-semibold text-ink">{activePreset.name} catalogue</h2><p className="text-[12px] text-ink-2">Tick the photos you want.</p></div><span className="shrink-0 text-[11px] text-ink-2">{activeShot + 1} / {shots.length}</span></div>
        <div ref={galleryRef} onScroll={(event) => { const width = event.currentTarget.clientWidth; if (width) setActiveShot(Math.min(shots.length - 1, Math.max(0, Math.round(event.currentTarget.scrollLeft / width)))); }} className="flex snap-x snap-mandatory overflow-x-auto rounded-md bg-cool scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto">
          {shots.map((shot, index) => <figure key={shot} className="relative w-full shrink-0 snap-start">
            <img src={shotImage(index)} alt={`${shot} illustrative preview`} className="aspect-[4/5] w-full object-contain" style={{ filter: shotFilter(index) }} />
            <figcaption className="absolute bottom-3 left-3 rounded-sm bg-background/95 px-2.5 py-1.5 text-[12px] font-semibold text-ink">{shot}</figcaption>
            <Button type="button" variant="ghost" aria-label={`${selectedShots.includes(index) ? "Remove" : "Select"} ${shot} photo`} aria-pressed={selectedShots.includes(index)} onClick={() => setSelectedShots((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index].sort((a, b) => a - b))} className={`absolute right-3 top-3 flex h-10 items-center gap-1.5 rounded-md border px-3 text-[12px] font-semibold shadow-sm transition-colors ${selectedShots.includes(index) ? "border-brand bg-brand text-primary-foreground hover:bg-brand/90 hover:text-primary-foreground" : "border-line bg-background text-ink hover:bg-background hover:text-ink"}`}><span className={`grid size-5 place-items-center rounded-sm border ${selectedShots.includes(index) ? "border-primary-foreground bg-primary-foreground text-brand" : "border-ink-2 bg-background"}`}>{selectedShots.includes(index) && <Check size={14} />}</span>{selectedShots.includes(index) ? "Selected" : "Select"}</Button>
          </figure>)}
        </div>
        <div className="mt-3 flex items-center justify-between"><Button type="button" variant="ghost" size="icon" aria-label="Previous catalogue photo" disabled={activeShot === 0} onClick={() => moveGallery(-1)} className="size-8 rounded-full border border-line text-ink"><ChevronLeft size={18} /></Button><div className="flex items-center gap-0.5" aria-label={`Photo ${activeShot + 1} of ${shots.length}`}>{shots.map((shot, index) => <Button key={shot} type="button" variant="ghost" aria-label={`Show ${shot} preview${selectedShots.includes(index) ? ", selected" : ""}`} onClick={() => scrollGalleryTo(index)} className="grid size-8 place-items-center rounded-full p-0"><span className={`block rounded-full transition-all duration-200 motion-reduce:transition-none ${activeShot === index ? "size-2.5 bg-brand ring-2 ring-brand-soft" : selectedShots.includes(index) ? "size-2 bg-brand/55" : "size-1.5 bg-line"}`} /></Button>)}</div><Button type="button" variant="ghost" size="icon" aria-label="Next catalogue photo" disabled={activeShot === shots.length - 1} onClick={() => moveGallery(1)} className="size-8 rounded-full border border-line text-ink"><ChevronRight size={18} /></Button></div>
        <p className="mt-2 text-center text-[12px] font-semibold text-brand" role="status">{selectedShots.length} of {shots.length} photos selected</p>
         {!presetShots[activePreset.name] && <p className="mt-3 text-[11px] text-ink-2">Illustrative demo previews, not separate generated photos.</p>}
        <Button type="button" onClick={generatePhoto} disabled={selectedShots.length === 0} className="mt-6 h-12 w-full rounded-md bg-brand text-[14px] font-semibold text-primary-foreground hover:bg-brand/90"><Sparkles size={17} /> Generate {selectedShots.length} {selectedShots.length === 1 ? "photo" : "photos"}</Button>
      </main>
    </>
  );

  const renderLoading = () => {
    const steps = ["Preparing catalogue", "Arranging shots", "Finishing previews", "Ready to review"];
    return (
      <main className="flex min-h-screen flex-col justify-center px-5 pb-20">
        <div className="mx-auto w-full max-w-[350px] text-center">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">Step 4 of 6</div>
          <div className="mx-auto mt-6 grid size-20 place-items-center rounded-[24px] bg-brand-soft text-brand">
            <WandSparkles size={34} />
          </div>
          <h1 className="mt-6 text-[24px] font-semibold text-ink">Making your options</h1>
           <p className="mt-2 text-[13px] text-ink-2">Preparing your catalogue previews.</p>

          <div className="mt-8 space-y-3 text-left">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-2xl bg-glass p-3.5 ring-1 ring-line transition ${index <= loadingStep ? "text-ink" : "text-ink-2/40"}`}
              >
                <span
                  className={`grid size-7 place-items-center rounded-full ${index < loadingStep ? "bg-success-soft text-success" : index === loadingStep ? "bg-brand-soft text-brand" : "bg-cool text-ink-2/50"}`}
                >
                  {index < loadingStep ? (
                    <Check size={15} />
                  ) : index === loadingStep ? (
                    <span className="size-2 rounded-full bg-brand soft-pulse" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span className="text-[13px] font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  };

  const renderExport = () => (
    <>
       {renderHeader("Review catalogue", "Step 5 of 6", () => { setActiveShot(0); setScreen("shotSelection"); })}
      <main className="px-5 pb-28">
          <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-[13px] font-semibold text-ink">{activePreset.name}</p><p className="text-[12px] text-ink-2">Your chosen photos, beside the original.</p></div><span className="shrink-0 rounded-sm bg-brand-soft px-2 py-1 text-[11px] font-semibold text-brand">{selectedShots.length} selected</span></div>
        <div className="grid grid-cols-2 gap-2">
          <figure className="overflow-hidden rounded-md border border-line bg-background">
            <img src={currentImage} alt="Original product" className="aspect-[3/4] w-full bg-cool object-contain" />
            <figcaption className="px-2 py-2 text-[11px] text-ink">Your photo</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-md border border-brand bg-background">
            <img src={shotImage(activeShot)} alt={`${shots[activeShot]} catalogue preview`} className="aspect-[3/4] w-full bg-cool object-cover" style={{ filter: shotFilter(activeShot) }} />
            <figcaption className="px-2 py-2 text-[11px] text-ink">{shots[activeShot]} preview</figcaption>
          </figure>
        </div>
          <h2 className="mt-4 border-b border-line pb-2 text-[13px] font-semibold text-ink">{shots[activeShot]}</h2>
         <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
           {selectedShots.map((index) => {
             const shot = shots[index];
              return <Button key={index} type="button" variant="ghost" onClick={() => setActiveShot(index)} aria-label={`Preview ${shot}`} aria-current={activeShot === index ? "true" : undefined} className={`relative h-auto w-20 shrink-0 flex-col gap-0 overflow-hidden rounded-md border p-0 ${activeShot === index ? "border-brand ring-1 ring-brand" : "border-line"}`}>
               <img src={shotImage(index)} alt="" className="aspect-square w-full object-cover" style={{ filter: shotFilter(index) }} />
               <span className="w-full truncate bg-background px-1 py-1.5 text-[10px] text-ink">{shot}</span>
             </Button>;
          })}
        </div>
          <p className="mt-3 text-[11px] text-ink-2">{presetShots[activePreset.name] ? "Sample catalogue photos, not generated from your selected product." : "Illustrative demo samples, not edited product photos."}</p>
        <Button type="button" disabled={selectedShots.length === 0} onClick={() => setScreen("save")} className="mt-6 h-12 w-full rounded-md bg-brand text-primary-foreground disabled:opacity-40">Proceed with {selectedShots.length} {selectedShots.length === 1 ? "photo" : "photos"} <ArrowRight size={17} /></Button>
         <Button type="button" variant="ghost" onClick={() => { setActiveShot(0); setScreen("shotSelection"); }} className="mt-2 w-full text-brand">Change photos</Button>
      </main>
    </>
  );

  const renderSave = () => (
    <>
      {renderHeader("Use your photos", "Step 6 of 6", () => setScreen("export"))}
      <main className="px-5 pb-28">
         <p className="text-[13px] text-ink-2">{selectedShots.length} selected from {activePreset.name} · demo samples</p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {selectedShots.map((index) => <figure key={index} className="w-24 shrink-0 overflow-hidden rounded-md border border-line bg-background"><img src={shotImage(index)} alt={shots[index]} className="aspect-square w-full object-cover" style={{ filter: shotFilter(index) }} /><figcaption className="truncate px-2 py-1 text-[10px] text-ink">{shots[index]}</figcaption></figure>)}
        </div>
        <div className="mt-5 space-y-2">
          <Button type="button" variant="ghost" onClick={() => showToast("Adding to Meesho catalog is a demo for now")} className="h-12 w-full justify-start gap-3 rounded-md border border-line bg-background px-4 text-ink"><ShoppingBag size={18} className="text-brand" /> Add to Meesho catalog <ChevronRight size={16} className="ml-auto" /></Button>
          <Button type="button" variant="ghost" onClick={() => void downloadPhoto()} className="h-12 w-full justify-start gap-3 rounded-md border border-line bg-background px-4 text-ink"><Download size={18} className="text-brand" /> Download HD <ChevronRight size={16} className="ml-auto" /></Button>
          <Button type="button" variant="ghost" onClick={() => void sharePhoto()} className="h-12 w-full justify-start gap-3 rounded-md border border-line bg-background px-4 text-ink"><Share2 size={18} className="text-brand" /> Share <ChevronRight size={16} className="ml-auto" /></Button>
        </div>
        <Button type="button" onClick={finishFlow} className="mt-7 h-12 w-full rounded-md bg-brand text-primary-foreground"><Check size={18} /> Done</Button>
      </main>
    </>
  );

  const renderBulk = () => (
    <>
      {renderHeader("Select products", "Create many · 1 of 4", () => setScreen("home"))}
      <main className="space-y-5 px-5 pb-28">
        <div className="border-b border-line bg-background pb-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-md bg-brand-soft text-brand">
              <LayoutGrid size={21} />
            </div>
            <div>
              <div className="text-[14px] font-semibold text-ink">Select your products</div>
              <div className="mt-1 text-[11px] text-ink-2">{bulkSelection.length} selected · Tap a photo to add or remove it</div>
            </div>
          </div>
        </div>
        <section className="space-y-2.5">
          {bulkCatalogue.map((product) => (
            <Button
              variant="ghost"
              type="button"
              key={product.name}
              onClick={() => toggleBulk(product.name)}
              aria-pressed={bulkSelection.includes(product.name)}
              className={`flex h-auto w-full items-center justify-start gap-3 rounded-md bg-glass p-3 text-left ring-1 ${bulkSelection.includes(product.name) ? "ring-brand" : "ring-line"}`}
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={768}
                height={960}
                className="size-14 rounded-md object-cover"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">{product.name}</span>
                <span className="mt-1 block text-[11px] text-ink-2">{product.price} · {inferProduct(product.id).profile.subcategory} detected</span>
              </span>
              <span
                className={`grid size-6 place-items-center rounded-full ring-1 ${bulkSelection.includes(product.name) ? "bg-brand text-primary-foreground ring-brand" : "bg-cool text-ink-2 ring-line"}`}
              >
                {bulkSelection.includes(product.name) && <Check size={14} />}
              </span>
            </Button>
          ))}
        </section>
        <Button
          type="button"
          disabled={bulkSelection.length === 0}
          onClick={() => setScreen("bulkModes")}
          className="flex h-12 w-[calc(100%-72px)] items-center justify-center gap-2 rounded-md bg-brand text-[15px] font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next: choose looks <ArrowRight size={18} />
        </Button>
      </main>
    </>
  );

  const renderBulkModes = () => {
    const modes = [
      { id: "one-each" as const, title: "One each", desc: "Pick a different look for every product", icon: LayoutGrid },
      { id: "same-look" as const, title: "Same look", desc: "Apply one preset to every selected product", icon: WandSparkles },
      { id: "mix-looks" as const, title: "Mix looks", desc: "Combine several looks across all products", icon: Sparkles },
    ];
    return (
      <>
        {renderHeader("How should we style them?", "Create many · 2 of 4", () => setScreen("bulk"))}
        <main className="space-y-3 px-5 pb-28">
          <p className="text-[13px] text-ink-2">{selectedBulkProducts.length} {selectedBulkProducts.length === 1 ? "product" : "products"} selected</p>
          {modes.map((mode) => (
            <Button
              key={mode.id}
              type="button"
              variant="ghost"
              aria-pressed={bulkMode === mode.id}
              onClick={() => setBulkMode(mode.id)}
              className={`flex h-auto w-full items-center gap-3 rounded-md border p-4 text-left ${bulkMode === mode.id ? "border-brand bg-brand-soft" : "border-line bg-background"}`}
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-md ${bulkMode === mode.id ? "bg-brand text-primary-foreground" : "bg-brand-soft text-brand"}`}>
                <mode.icon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold text-ink">{mode.title}</span>
                <span className="mt-0.5 block text-[12px] text-ink-2">{mode.desc}</span>
              </span>
              {bulkMode === mode.id && <Check size={18} className="shrink-0 text-brand" />}
            </Button>
          ))}
          <Button type="button" onClick={() => setScreen(bulkMode === "same-look" ? "bulkPresets" : "bulkAssign")} className="mt-2 h-12 w-full rounded-md bg-brand text-[15px] font-semibold text-primary-foreground">
            Next: {bulkMode === "same-look" ? "choose one look" : "assign looks"} <ArrowRight size={18} />
          </Button>
        </main>
      </>
    );
  };

  const renderBulkAssign = () => {
    const isMix = bulkMode === "mix-looks";
    return (
      <>
        {renderHeader(isMix ? "Mix looks" : "Assign looks", "Create many · 3 of 4", () => setScreen("bulkModes"))}
        <main className="space-y-4 pb-28">
          {isMix ? (
            <section className="bg-background px-5 py-4">
              <h2 className="text-[14px] font-semibold text-ink">Pick the looks to mix</h2>
              <p className="mt-1 text-[11px] text-ink-2">Every selected product gets each look you tick.</p>
              <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-4">
                {styles.map((style) => {
                  const on = bulkMulti.includes(style.name);
                  return (
                    <Button key={style.name} type="button" variant="ghost" aria-pressed={on} onClick={() => setBulkMulti((current) => current.includes(style.name) ? current.filter((name) => name !== style.name) : [...current, style.name])} className="h-auto min-w-0 flex-col gap-1 p-0 text-center">
                      <span className={`relative block aspect-square w-full overflow-hidden rounded-md ring-2 ${on ? "ring-brand" : "ring-transparent"}`}>
                        <img src={style.image} alt="" className="size-full object-cover" />
                        {on && <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-brand text-primary-foreground"><Check size={12} /></span>}
                        {style.premium && <Crown size={14} className="absolute left-1 top-1 rounded-full bg-background p-0.5 text-warning" />}
                      </span>
                      <span className="w-full whitespace-normal text-[10px] text-ink">{style.name}</span>
                    </Button>
                  );
                })}
              </div>
              <p className="mt-3 text-[12px] font-medium text-brand" role="status">{selectedBulkProducts.length} products × {bulkMulti.length} looks = {selectedBulkProducts.length * bulkMulti.length} photos</p>
            </section>
          ) : (
            <section className="space-y-2.5 px-5">
              <div>
                <h2 className="text-[14px] font-semibold text-ink">Choose a look for each product</h2>
                <p className="mt-1 text-[11px] text-ink-2">Tap a look to assign it.</p>
              </div>
              {selectedBulkProducts.map((product) => {
                const assigned = bulkAssignments[product.name] ?? "Safed Shaan";
                return (
                  <section key={product.name} className="rounded-md bg-glass p-3 ring-1 ring-line">
                    <div className="flex items-center gap-2.5">
                      <img src={product.image} alt={product.name} className="size-10 rounded-md object-cover" />
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{product.name}</span>
                      <span className="shrink-0 rounded-sm bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand">{assigned}</span>
                    </div>
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                      {styles.map((style) => {
                        const on = assigned === style.name;
                        return (
                          <Button key={style.name} type="button" variant="ghost" aria-pressed={on} aria-label={`Assign ${style.name} to ${product.name}`} onClick={() => setBulkAssignments((current) => ({ ...current, [product.name]: style.name }))} className="h-auto w-16 shrink-0 flex-col gap-1 p-0 text-center">
                            <span className={`relative block aspect-square w-full overflow-hidden rounded-md ring-2 ${on ? "ring-brand" : "ring-transparent"}`}>
                              <img src={style.image} alt="" className="size-full object-cover" />
                              {on && <span className="absolute inset-0 grid place-items-center bg-brand/35"><span className="grid size-6 place-items-center rounded-full bg-brand text-primary-foreground"><Check size={14} /></span></span>}
                            </span>
                            <span className="w-full truncate text-[9px] text-ink">{style.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </section>
          )}
          <div className="px-5">
            <Button type="button" onClick={() => void createBulkPhotos()} disabled={isMix ? bulkMulti.length === 0 : selectedBulkProducts.length === 0} className="h-12 w-full rounded-md bg-brand text-primary-foreground disabled:opacity-40">
              <Sparkles size={17} /> Generate {isMix ? selectedBulkProducts.length * bulkMulti.length : selectedBulkProducts.length} {selectedBulkProducts.length * (isMix ? Math.max(bulkMulti.length, 1) : 1) === 1 ? "photo" : "photos"}
            </Button>
          </div>
        </main>
      </>
    );
  };

  const renderBulkPresets = () => {
    const currentStyle = styles.find((style) => style.name === bulkStyle) ?? styles[0];
    return <>
      {renderHeader("Choose a preset", "Create many · 3 of 4", () => setScreen("bulkModes"))}
      <main className="space-y-4 pb-28">
        <section className="bg-background px-5 py-4">
          <h2 className="text-[14px] font-semibold text-ink">{currentStyle.name} catalogue</h2>
          <p className="mt-1 text-[11px] text-ink-2">One look for {selectedBulkProducts.length} selected products</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
             {(presetShots[currentStyle.name] ?? inferProduct(defaultProduct.id).profile.shotPlan.map((label) => ({ label, image: currentStyle.image }))).map(({ label, image }) => <figure key={label} className="overflow-hidden rounded-md border border-line"><img src={image} alt={`${label} sample`} className="aspect-[3/4] w-full object-cover" /><figcaption className="truncate px-1.5 py-1 text-[10px] text-ink">{label}</figcaption></figure>)}
          </div>
          <p className="mt-2 text-[11px] text-ink-2">Illustrative previews · not edited product photos.</p>
        </section>
        <section className="bg-background px-5 py-4">
          <h2 className="mb-3 text-[14px] font-semibold text-ink">Choose a preset</h2>
          <div className="grid grid-cols-3 gap-x-2 gap-y-4">
            {styles.map((style) => <Button key={style.name} type="button" variant="ghost" aria-pressed={style.name === bulkStyle} onClick={() => setBulkStyle(style.name)} className="h-auto min-w-0 flex-col gap-1 p-0 text-center">
              <span className={`relative block aspect-square w-full overflow-hidden rounded-md ring-2 ${style.name === bulkStyle ? "ring-brand" : "ring-transparent"}`}><img src={style.image} alt="" className="size-full object-cover" />{style.premium && <Crown size={15} className="absolute left-1 top-1 rounded-full bg-background p-0.5 text-warning" />}</span>
              <span className="w-full whitespace-normal text-[10px] text-ink">{style.name}</span>
            </Button>)}
          </div>
        </section>
        <div className="px-5"><Button type="button" onClick={() => void createBulkPhotos()} className="h-12 w-full rounded-md bg-brand text-primary-foreground"><Sparkles size={17} /> Generate catalogues</Button></div>
      </main>
    </>;
  };

  const renderBulkLoading = () => (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 pb-20 text-center">
      <div className="grid size-20 place-items-center rounded-md bg-brand-soft text-brand"><WandSparkles size={34} /></div>
      <h1 className="mt-5 text-[23px] font-semibold text-ink">Making your options</h1>
      <p className="mt-2 text-[13px] text-ink-2">{bulkProgress} of {bulkPairs.length} photos ready</p>
      {bulkError && <div role="alert" className="mt-5 text-[13px] text-destructive"><p>{bulkError}</p><Button type="button" variant="ghost" onClick={() => setScreen("bulkPresets")} className="mt-3 text-brand">Back to looks</Button></div>}
    </main>
  );

  const renderBulkResults = () => (
    <>
      {renderHeader("Your photos are ready", "Create many · 4 of 4", () => setScreen(bulkMode === "same-look" ? "bulkPresets" : "bulkAssign"))}
      <main className="space-y-5 px-5 pb-28">
        <p className="text-[13px] text-ink-2">{bulkResults.length} before-and-after {bulkResults.length === 1 ? "pair" : "pairs"}</p>
        {bulkResults.map(({ product, style, image }) => (
          <section key={`${product.name}-${style.name}`} className="border-b border-line pb-5">
            <h2 className="text-[14px] font-semibold text-ink">{product.name}</h2>
            <p className="mb-2 text-[10px] text-ink-2">{(() => { const i = inferProduct(product.id); return `${i.profile.category} › ${i.profile.subcategory} › ${i.leaf}`; })()}</p>
            <div className="grid grid-cols-2 gap-2">
              <figure className="min-w-0 overflow-hidden rounded-md border border-line bg-background">
                <img src={product.image} alt={`Original ${product.name}`} className="aspect-[3/4] w-full bg-cool object-contain" />
                <figcaption className="px-2 py-2 text-[11px] font-semibold text-ink">Before</figcaption>
              </figure>
              <figure className="min-w-0 overflow-hidden rounded-md border-2 border-brand bg-background">
                <img src={image} alt={`${style.name} result for ${product.name}`} className="aspect-[3/4] w-full bg-cool object-contain" />
                <figcaption className="flex items-center justify-between gap-1 px-2 py-2 text-[11px] font-semibold text-brand"><span>After · {style.name}</span>{style.premium && <Crown size={13} className="shrink-0 text-warning" />}</figcaption>
              </figure>
            </div>
          </section>
        ))}
        {!onlineDemo && <p className="text-[11px] leading-relaxed text-ink-2">Offline demo: after photos are preset samples, not edits of your selected products.</p>}
        <Button type="button" onClick={() => { setScreen("home"); setBulkResults([]); }} className="h-12 w-[calc(100%-72px)] rounded-md bg-brand text-primary-foreground"><Check size={18} /> Done</Button>
      </main>
    </>
  );

  const renderPricing = () => {
    const plans = [
      {
        name: "Try once",
        price: "₹9",
        cadence: "one-time",
        spec: "1 Product · 3 Presets · 1 Final Image",
        features: [
          "One product, one finished photo",
          "Three preset looks to choose from",
          "No monthly bill — pay once",
        ],
        action: "Try once for ₹9",
        tone: "bg-brand text-primary-foreground",
      },
      {
        name: "Starter",
        price: "₹49",
        cadence: "/month",
        spec: "1 Product · 10 Presets",
        features: [
          "One new product every month",
          "Ten preset looks",
          "Keep previews free — pay only for finals",
        ],
        action: "Choose Starter",
        tone: "bg-brand text-primary-foreground",
      },
      {
        name: "Growth",
        price: "₹199",
        cadence: "/month",
        spec: "5 Products · More Presets",
        features: [
          "Five new products every month",
          "Larger preset library",
          "Best for sellers adding stock weekly",
        ],
        action: "Choose Growth",
        tone: "bg-brand text-primary-foreground",
      },
      {
        name: "Pro",
        price: "₹499",
        cadence: "/month",
        spec: "15 Products · All Presets",
        features: [
          "Fifteen new products every month",
          "Full N/N preset library",
          "Best for catalog-wide refreshes",
        ],
        action: "Choose Pro",
        tone: "bg-tier-pro text-ink",
      },
    ];
    return (
      <>
        {renderHeader("Plans & pricing", "Seller studio", () => setScreen("home"))}
        <main className="space-y-4 px-5 pb-32">
          <section className="rounded-2xl bg-brand-soft p-4 ring-1 ring-line">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-brand">
              <Sparkles size={16} /> Browse previews first
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">
              Browse previews first. Pay only for final-quality creation.
            </p>
          </section>
          {plans.map((plan) => (
            <section key={plan.name} className="overflow-hidden rounded-2xl bg-glass ring-1 ring-line">
              <div className={`flex items-end justify-between gap-3 px-4 py-3 ${plan.tone}`}>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-extrabold leading-none">{plan.price}</span>
                  <span className="text-[13px] font-bold uppercase tracking-wide">{plan.name}</span>
                </div>
                <span className="text-[11px] font-semibold opacity-90">{plan.cadence}</span>
              </div>
              <div className="px-4 py-4">
                <div className="text-[13px] font-semibold text-ink">{plan.spec}</div>
                <ul className="mt-3 space-y-2 border-b border-line pb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[12px] text-ink">
                      <Check size={15} className="shrink-0 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  onClick={() => showToast(`${plan.name} plan is a preview only`)}
                  className="mt-4 w-full rounded-full bg-brand-soft text-brand hover:bg-brand-soft/80"
                >
                  {plan.action}
                </Button>
              </div>
            </section>
          ))}
          <section className="flex items-start gap-3 rounded-2xl bg-warning-soft p-4 ring-1 ring-line">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-warning text-ink">
              <Plus size={18} />
            </span>
            <div>
              <div className="text-[13px] font-bold text-ink">Top-ups anytime</div>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-2">
                Top-ups available anytime for extra products or generations — no need to change your plan.
              </p>
            </div>
          </section>
          <p className="text-center text-[11px] text-ink-2">Illustrative plans for this preview. No payment is collected.</p>
        </main>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-cool font-sans text-ink">
      <div className="relative mx-auto min-h-screen w-full max-w-[390px] bg-cool shadow-[0_0_60px_-35px_var(--ink)]">

        {screen === "home" && renderHome()}
        {(screen === "studio" || screen === "understanding") && renderStudio()}
        {screen === "understanding" && renderUnderstanding()}
        {screen === "creation" && renderCreation()}
        {screen === "shotSelection" && renderShotSelection()}
        {screen === "loading" && renderLoading()}
        {screen === "export" && renderExport()}
        {screen === "save" && renderSave()}
        {screen === "bulk" && renderBulk()}
        {screen === "bulkModes" && renderBulkModes()}
        {screen === "bulkAssign" && renderBulkAssign()}
        {screen === "bulkPresets" && renderBulkPresets()}
        {screen === "bulkLoading" && renderBulkLoading()}
        {screen === "bulkResults" && renderBulkResults()}
        {screen === "pricing" && renderPricing()}
        {upgradeOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center" role="presentation" onClick={() => setUpgradeOpen(false)}>
            <div role="dialog" aria-modal="true" aria-labelledby="upgrade-title" onClick={(event) => event.stopPropagation()} className="w-full max-w-[350px] rounded-md bg-background p-5 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-md bg-brand-soft text-brand"><Crown size={20} /></span>
                <Button type="button" variant="ghost" size="icon" aria-label="Close upgrade prompt" onClick={() => setUpgradeOpen(false)}><X size={18} /></Button>
              </div>
              <h2 id="upgrade-title" className="mt-4 text-[20px] font-semibold text-ink">Consider upgrading</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{upgradeStyle} is a premium preset. Explore a plan to use premium looks, or choose one of the free presets.</p>
              <Button type="button" onClick={() => { setUpgradeOpen(false); setScreen("pricing"); }} className="mt-5 h-11 w-full rounded-md bg-brand text-primary-foreground hover:bg-brand/90">See plans <ArrowRight size={17} /></Button>
              <Button type="button" variant="ghost" onClick={() => setUpgradeOpen(false)} className="mt-1 h-11 w-full text-brand">Keep browsing</Button>
            </div>
          </div>
        )}
        <AgentCursor {...cursor} />
        {screen !== "loading" && (
          <VoiceAssistant
            listening={listening}
            open={voiceOpen}
            onToggle={() => setVoiceOpen((value) => !value)}
            onListen={() => {
              if (!listening) { setListening(true); return; }
              setListening(false);
              runVoiceFlow();
            }}
          />
        )}
        {toast && (
          <div
            role="status"
            className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-3 text-[12px] font-medium text-primary-foreground shadow-lg"
          >
            <Check size={15} className="text-success" />
            {toast}
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setToast("")}
              aria-label="Close message"
              className="size-5 text-primary-foreground"
            >
              <X size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
