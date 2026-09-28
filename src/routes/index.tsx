import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  LayoutGrid,
  Crown,
  Mic,
  ImagePlus,
  Plus,
  Share2,
  ShoppingBag,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";

import blueKurti from "@/assets/blue-kurti.jpg";
import maroonKurti from "@/assets/maroon-kurti.jpg";
import anarkaliKurti from "@/assets/anarkali-kurti.jpg";
import originalPhoto from "@/assets/original.png.asset.json";
import whitePreset from "@/assets/white.webp.asset.json";
import festivePreset from "@/assets/festive.webp.asset.json";
import twirlPreset from "@/assets/twirl.webp.asset.json";
import boldPreset from "@/assets/meesho-bold.webp.asset.json";
import threeDPreset from "@/assets/3D.webp.asset.json";
import motionPreset from "@/assets/motion.webp.asset.json";
import blackPreset from "@/assets/black.webp.asset.json";
import { Button } from "@/components/ui/button";
import { streamImage } from "@/lib/stream-image";

type Screen = "home" | "studio" | "creation" | "loading" | "export" | "bulk" | "pricing";
type Product = { name: string; shortName: string; price: string; image: string };

const defaultProduct: Product = { name: "Blue Embroidered Kurti", shortName: "Blue embroidery", price: "Sample photo", image: originalPhoto.url };
const products: Product[] = [
  defaultProduct,
  { name: "Blue Floral Kurti", shortName: "Blue kurti", price: "₹499", image: blueKurti },
  { name: "Maroon Straight Kurti", shortName: "Maroon kurti", price: "₹599", image: maroonKurti },
  { name: "Festive Anarkali Kurti", shortName: "Festive anarkali", price: "₹899", image: anarkaliKurti },
];

const styles = [
  { name: "Safed Shaan", note: "Crisp catalogue look", image: whitePreset.url, premium: false },
  { name: "Shaadi Shringar", note: "Festive and full of colour", image: festivePreset.url, premium: false },
  { name: "Ghoomar Glow", note: "A graceful twirl", image: twirlPreset.url, premium: false },
  { name: "Bazaar Bold", note: "Stand out in style", image: boldPreset.url, premium: true },
  { name: "3D Jadoo", note: "A striking display", image: threeDPreset.url, premium: true },
  { name: "Chalte Chalte", note: "On-the-move look", image: motionPreset.url, premium: true },
  { name: "Kaali Raat", note: "Dramatic dark look", image: blackPreset.url, premium: true },
] as const;

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
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState("");
  const [partialImage, setPartialImage] = useState<string | null>(null);

  const currentImage = uploadedImage ?? selectedProduct.image;
  const activeStyle = styles.find((style) => style.name === selectedStyle) ?? styles[0];
  useEffect(() => {
    if (screen !== "loading") return;
    const progress = window.setInterval(() => setLoadingStep((step) => Math.min(step + 1, 3)), 650);
    return () => {
      window.clearInterval(progress);
    };
  }, [screen]);

  useEffect(() => {
    setVoiceOpen(false);
  }, [screen]);

  const startGeneration = async () => {
    setLoadingStep(0);
    setGenerationError("");
    setPartialImage(null);
    setGeneratedImage(null);
    setScreen("loading");
    try {
      if (!onlineDemo) {
        await new Promise<void>((resolve) => window.setTimeout(resolve, 2200));
        setGeneratedImage(activeStyle.image);
        setScreen("export");
        return;
      }
      const [productResponse, presetResponse] = await Promise.all([fetch(currentImage), fetch(activeStyle.image)]);
      if (!productResponse.ok || !presetResponse.ok) throw new Error("Could not load the selected photos. Please try again.");
      const normalizePhoto = async (response: Response) => {
        const bitmap = await createImageBitmap(await response.blob());
        const ratio = Math.min(1, 1536 / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(bitmap.width * ratio);
        canvas.height = Math.round(bitmap.height * ratio);
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not prepare this photo. Please try another one.");
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("Could not prepare this photo. Please try another one.");
        return new File([blob], "photo.png", { type: "image/png" });
      };
      const [productBlob, presetBlob] = await Promise.all([normalizePhoto(productResponse), normalizePhoto(presetResponse)]);
      const form = new FormData();
      form.append("image", productBlob);
      form.append("reference", presetBlob);
      form.append("preset", selectedStyle);
      await streamImage("/api/edit-product-photo", form, (src, isFinal) => {
        if (isFinal) {
          setGeneratedImage(src);
          setScreen("export");
        } else setPartialImage(src);
      });
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Could not make your photo. Please try again.");
      setPartialImage(null);
    }
  };

  const generatePhoto = () => {
    if (onlineDemo && activeStyle.premium) {
      setUpgradeOpen(true);
      return;
    }
    void startGeneration();
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const downloadPhoto = async () => {
    try {
      if (!generatedImage) throw new Error("No generated photo");
      const response = await fetch(generatedImage);
      if (!response.ok) throw new Error("Could not load photo");
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${selectedStyle.toLowerCase().replaceAll(" ", "-")}-hd.png`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    } catch {
      showToast("Download unavailable right now");
    }
  };

  const sharePhoto = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      if (!response.ok) throw new Error("Could not load photo");
      const file = new File([await response.blob()], "meesho-studio-photo.png", { type: "image/png" });
      if (!navigator.canShare?.({ files: [file] })) {
        showToast("Sharing isn't available here. Use Download HD instead.");
        return;
      }
      await navigator.share({ files: [file] });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      showToast("Could not share this photo. Use Download HD instead.");
    }
  };

  const finishFlow = () => {
    if (uploadedImage?.startsWith("blob:")) URL.revokeObjectURL(uploadedImage);
    if (generatedImage?.startsWith("blob:")) URL.revokeObjectURL(generatedImage);
    if (partialImage?.startsWith("blob:")) URL.revokeObjectURL(partialImage);
    setUploadedImage(null);
    setUploadedName("");
    setSelectedProduct(defaultProduct);
    setGeneratedImage(null);
    setPartialImage(null);
    setLoadingStep(0);
    setScreen("home");
    showToast("Done. Your new photo is ready to use.");
  };

  const toggleBulk = (name: string) => {
    setBulkSelection((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
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
            <img src={whitePreset.url} alt="Embroidered kurti in a catalogue look" className="size-full object-cover" />
            <span className="absolute bottom-2 left-2 rounded-sm bg-brand px-2 py-1 text-[10px] font-semibold text-primary-foreground">Studio look</span>
          </div>
          <span className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-primary-foreground shadow-md"><ArrowRight size={17} /></span>
        </div>
        <div className="px-5 pt-6">
          <Button type="button" onClick={() => setScreen("studio")} className="h-13 w-full rounded-md bg-brand text-[15px] font-semibold text-primary-foreground hover:bg-brand/90">
            Start with a photo <ArrowRight size={18} />
          </Button>
          <p className="mt-2 text-center text-[11px] text-ink-2">Try it with a sample photo or your own</p>

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
              <p className="mt-0.5 text-[10px] leading-snug text-ink-2">{onlineDemo ? "Creates a new photo using your product." : "Shows preset samples without online generation."}</p>
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
      {renderHeader("Select a photo", "Step 1 of 4", () => setScreen("home"))}
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
            <span className="text-[11px] font-semibold text-brand">1 / 4</span>
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
            onClick={() => setScreen("creation")}
            className="flex h-12 w-[calc(100%-72px)] items-center justify-center gap-2 rounded-md bg-brand text-[14px] font-semibold text-primary-foreground hover:bg-brand/90"
          >
            Next: choose a preset <ArrowRight size={18} />
          </Button>
        </div>
      </main>
    </>
  );

  const renderCreation = () => (
    <>
      {renderHeader("Select preset", "Step 2 of 4", () => setScreen("studio"))}
      <main className="space-y-3 pb-28">
        <section className="bg-background pt-4">
          <div className="flex items-center gap-3 px-5 pb-3">
            <div className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
              <ShoppingBag size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-ink">Sharma Fashion Store</div>
              <div className="text-[11px] text-ink-2">{uploadedName || selectedProduct.name}</div>
            </div>
            <span className="text-[11px] text-ink-2">Preset gallery</span>
          </div>
          <div className="relative bg-cool">
            <img
              src={activeStyle.image}
               alt={`${selectedStyle} preset example`}
              width={1920}
              height={1920}
              className="aspect-[4/3] w-full object-contain transition duration-300"
            />
            <span className="absolute bottom-3 left-3 rounded-md bg-glass px-2.5 py-1.5 text-[11px] font-semibold text-ink">
              {selectedStyle}
            </span>
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-brand">
              <Sparkles size={16} /> {selectedStyle}
            </div>
            <span className="text-[11px] text-ink-2">{activeStyle.note}</span>
          </div>
        </section>
        <section className="bg-background px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-ink">Choose a preset</h2>
            <span className="text-[11px] text-ink-2">3 free · 4 premium</span>
          </div>
          <div className="grid grid-cols-3 gap-x-2.5 gap-y-4">
            {styles.map((style) => (
              <Button
                variant="ghost"
                type="button"
                key={style.name}
                onClick={() => setSelectedStyle(style.name)}
                aria-pressed={selectedStyle === style.name}
                className="h-auto min-w-0 flex-col gap-0 p-0 text-center"
              >
                <span
                  className={`relative block aspect-square w-full overflow-hidden rounded-md bg-cool ring-2 ${selectedStyle === style.name ? "ring-brand" : "ring-transparent"}`}
                >
                  <img src={style.image} alt="" width={1920} height={1920} className="size-full object-cover" />
                  {style.premium && (
                    <span className="absolute left-1 top-1 grid size-6 place-items-center rounded-full bg-glass text-warning" title="Premium preset" aria-label="Premium preset">
                      <Crown size={13} />
                    </span>
                  )}
                  {selectedStyle === style.name && (
                    <span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-brand text-primary-foreground">
                      <Check size={12} />
                    </span>
                  )}
                </span>
                <span
                  className={`mt-2 block w-full whitespace-normal text-[10px] leading-tight ${selectedStyle === style.name ? "font-semibold text-brand" : "text-ink"}`}
                >
                  {style.name}
                </span>
                <span className="mt-0.5 text-[10px] text-ink-2">{style.premium ? "Premium" : "Free"}</span>
              </Button>
            ))}
          </div>
           <p className="mt-4 text-[11px] leading-relaxed text-ink-2">{onlineDemo ? "Preset pictures show the look. Your selected product photo is used when you generate." : "Offline demo shows the preset sample, not an edit of your product photo."}</p>
        </section>
        <div className="px-5 pt-2">
          <Button
            type="button"
            onClick={generatePhoto}
            className="flex h-12 w-[calc(100%-72px)] items-center justify-center gap-2 rounded-md bg-brand text-[14px] font-semibold text-primary-foreground hover:bg-brand/90"
          >
            <Sparkles size={17} /> Generate photo
          </Button>
            <p className="mt-3 text-center text-[11px] text-ink-2">{onlineDemo ? "Your photo is used to create a new image in your chosen look." : "Offline demo · preset sample only"}</p>
        </div>
      </main>
    </>
  );

  const renderLoading = () => {
    const steps = ["Product checked", "Colour and print identified", "Product details protected", "Creating options"];
    return (
      <main className="flex min-h-screen flex-col justify-center px-5 pb-20">
        <div className="mx-auto w-full max-w-[350px] text-center">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">Step 3 of 4</div>
          <div className="mx-auto mt-6 grid size-20 place-items-center rounded-[24px] bg-brand-soft text-brand">
            <WandSparkles size={34} />
          </div>
          <h1 className="mt-6 text-[24px] font-semibold text-ink">Making your options</h1>
           <p className="mt-2 text-[13px] text-ink-2">{onlineDemo ? `Your ${selectedProduct.shortName} is being prepared.` : "Preparing your preset sample."}</p>
           {partialImage && <img src={partialImage} alt="Photo being created" className="mx-auto mt-5 max-h-48 w-auto rounded-md object-contain blur-2xl transition-[filter]" />}
           {generationError && (
             <div role="alert" className="mt-6 text-[13px] text-destructive">
               <p>{generationError}</p>
               <Button type="button" onClick={() => void startGeneration()} className="mt-4 bg-brand text-primary-foreground">Try again</Button>
               <Button type="button" variant="ghost" onClick={() => setScreen("creation")} className="mt-4 text-brand">Back to presets</Button>
             </div>
           )}
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
      {renderHeader("Ready to use", "Step 4 of 4", () => setScreen("creation"))}
      <main className="space-y-4 px-5 pb-28">
        <div className="flex items-center gap-3 rounded-md bg-success-soft p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-background text-success"><Check size={18} /></span>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-ink">Your new photo is ready</div>
            <div className="truncate text-[11px] text-ink-2">{selectedProduct.name} · {selectedStyle}</div>
          </div>
        </div>

        <section>
          <div className="mb-2.5 flex items-baseline justify-between">
            <h2 className="text-[15px] font-semibold text-ink">Before and after</h2>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">HD ready</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <figure className="overflow-hidden rounded-md bg-background ring-1 ring-line">
              <div className="relative">
                <img
                  src={currentImage}
                  alt={`Original ${selectedProduct.name}`}
                  width={768}
                  height={960}
                  className="aspect-[3/4] w-full object-contain bg-cool"
                />
                <span className="absolute left-2 top-2 rounded-sm bg-ink/75 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-background">Before</span>
              </div>
              <figcaption className="border-t border-line px-2.5 py-2">
                <div className="text-[11px] font-semibold text-ink">Original</div>
                <div className="truncate text-[10px] text-ink-2">Your selected photo</div>
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-md bg-background ring-2 ring-brand">
              <div className="relative">
                <img
                  src={generatedImage ?? currentImage}
                  alt={`${selectedStyle} HD preset result`}
                  width={1920}
                  height={1920}
                  className="aspect-[3/4] w-full object-contain bg-cool"
                />
                <span className="absolute left-2 top-2 rounded-sm bg-brand px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-primary-foreground">After</span>
              </div>
              <figcaption className="border-t border-line px-2.5 py-2">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-brand">
                  <Sparkles size={12} /> {onlineDemo ? "Enhanced" : "Preset sample"}
                </div>
                <div className="truncate text-[10px] text-ink-2">{selectedStyle}</div>
              </figcaption>
            </figure>
          </div>
        </section>

        <p className="text-[11px] leading-relaxed text-ink-2">{onlineDemo ? "Check the colour, print and details before using your new photo." : "Offline demo: this is the preset sample, not your product photo. Turn on Online to create an edited image."}</p>

        <section>
          <h2 className="text-[15px] font-semibold text-ink">Use this image</h2>
          <div className="mt-2.5 space-y-2">
            {[
              { label: "Add to Meesho catalog", note: "Use this photo in your product listing", icon: ShoppingBag },
              { label: "Download HD", note: "Save this photo to your device", icon: Download },
              { label: "Share", note: "Send this photo to any app", icon: Share2 },
            ].map(({ label, note, icon: ActionIcon }) => (
              <Button
                variant="ghost"
                type="button"
                key={label}
                onClick={() => label === "Download HD" ? void downloadPhoto() : label === "Share" ? void sharePhoto() : showToast("Adding to Meesho catalog is a demo for now")}
                className="flex h-auto w-full items-center justify-start gap-3 rounded-md bg-glass p-3 text-left ring-1 ring-line transition hover:ring-brand active:scale-[0.99]"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                  <ActionIcon size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold text-ink">{label}</span>
                  <span className="mt-0.5 block text-[11px] text-ink-2">{note}</span>
                </span>
                <ChevronRight size={17} className="shrink-0 text-ink-2" />
              </Button>
            ))}
          </div>
        </section>

        <div className="space-y-1.5 pt-1">
          <Button type="button" onClick={finishFlow} className="h-12 w-[calc(100%-72px)] rounded-md bg-brand text-[15px] font-semibold text-primary-foreground hover:bg-brand/90">
            <Check size={18} /> Done
          </Button>
          <Button type="button" variant="ghost" onClick={() => setScreen("creation")} className="h-8 w-full p-0 text-[12px] font-medium text-ink-2 hover:bg-transparent">
            Try another style
          </Button>
        </div>
      </main>
    </>
  );

  const renderBulk = () => (
    <>
      {renderHeader("Create many at once", "Power seller", () => setScreen("home"))}
      <main className="space-y-5 px-5 pb-28">
        <div className="rounded-2xl bg-sky-soft p-4 ring-1 ring-line">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-glass text-sky">
              <LayoutGrid size={21} />
            </div>
            <div>
              <div className="text-[14px] font-semibold text-ink">Select your products</div>
              <div className="mt-1 text-[11px] text-ink-2">Make clean photos for many products together</div>
            </div>
          </div>
        </div>
        <section className="space-y-2.5">
          {products.map((product) => (
            <button
              type="button"
              key={product.name}
              onClick={() => toggleBulk(product.name)}
              className={`flex w-full items-center gap-3 rounded-2xl bg-glass p-3 text-left ring-1 ${bulkSelection.includes(product.name) ? "ring-brand" : "ring-line"}`}
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={768}
                height={960}
                className="size-14 rounded-xl object-cover"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">{product.name}</span>
                <span className="mt-1 block text-[11px] text-ink-2">{product.price}</span>
              </span>
              <span
                className={`grid size-6 place-items-center rounded-full ring-1 ${bulkSelection.includes(product.name) ? "bg-brand text-primary-foreground ring-brand" : "bg-cool text-ink-2 ring-line"}`}
              >
                {bulkSelection.includes(product.name) && <Check size={14} />}
              </span>
            </button>
          ))}
        </section>
        <button
          type="button"
          disabled={bulkSelection.length === 0}
          onClick={() => showToast(`${bulkSelection.length} products are ready to create`)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-[15px] font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles size={18} /> Create {bulkSelection.length} products
        </button>
        <div className="rounded-2xl bg-glass p-4 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold text-ink">Need more?</div>
              <div className="mt-1 text-[11px] text-ink-2">Add products to your pack</div>
            </div>
            <Plus size={18} className="text-brand" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["10 more products", "100 more products", "Large seller pack"].map((pack) => (
              <button
                type="button"
                key={pack}
                onClick={() => showToast(`${pack} selected`)}
                className="rounded-xl bg-cool px-2 py-3 text-[10px] font-medium text-ink"
              >
                {pack}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );

  const renderPricing = () => {
    const plans = [
      {
        name: "Free Trial",
        tagline: "For new sellers",
        products: "3 products",
        media: "9 photos · 3 videos",
        features: ["1 style pack", "555 photo credits", "Great for trying Seller Studio"],
        price: "Free",
        saving: "Free for your first 3 products",
        action: "Try it free",
        tone: "bg-brand",
        featured: false,
      },
      {
        name: "Basic",
        tagline: "For new sellers",
        products: "10 products",
        media: "30 photos · 10 videos",
        features: ["5 style packs", "1,850 photo credits", "Works out to ₹149 per product"],
        price: "₹1,499",
        saving: "Saves 70–79% per photo",
        action: "Choose Basic",
        tone: "bg-brand",
        featured: false,
      },
      {
        name: "Plus",
        tagline: "For active sellers",
        products: "100 products",
        media: "300 photos · 100 videos",
        features: ["50 style packs", "18,500 photo credits", "Works out to ₹105 per product"],
        price: "₹10,499",
        saving: "Saves 79–85% per photo",
        action: "Choose Plus",
        tone: "bg-brand",
        featured: true,
      },
      {
        name: "Pro",
        tagline: "For power sellers",
        products: "1,000 products",
        media: "3,000 photos · 1,000 videos",
        features: ["All 500+ styles", "185,000 photo credits", "Works out to ₹75 per product"],
        price: "₹74,999",
        saving: "Saves 85–89% per photo",
        action: "Choose Pro",
        tone: "bg-tier-pro",
        featured: false,
      },
    ];
    return (
      <>
        {renderHeader("Plans & pricing", "Seller studio", () => setScreen("home"))}
        <main className="space-y-4 px-5 pb-32">
          <section className="rounded-2xl bg-brand-soft p-4 ring-1 ring-line">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-brand">
              <Sparkles size={16} /> How bundles work
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">
              Pick a bundle for a set number of products. Bigger bundles cost less per product — start small and grow when you're ready.
            </p>
          </section>
          {plans.map((plan) => (
            <section
              key={plan.name}
              className={`overflow-hidden rounded-2xl bg-glass ring-1 ${plan.featured ? "ring-2 ring-brand" : "ring-line"}`}
            >
              <div className={`flex items-center justify-between px-4 py-3 text-primary-foreground ${plan.tone}`}>
                <div>
                  <div className="text-[16px] font-bold leading-tight">{plan.name}</div>
                  <div className="text-[11px] opacity-90">{plan.tagline}</div>
                </div>
                {plan.featured && (
                  <span className="rounded-full bg-glass px-2.5 py-1 text-[10px] font-bold text-brand">Most popular</span>
                )}
              </div>
              <div className="px-4 py-4">
                <div className="text-[24px] font-bold leading-tight text-ink">{plan.products}</div>
                <div className="mt-0.5 text-[12px] text-ink-2">{plan.media}</div>
                <ul className="mt-3 space-y-2 border-b border-line pb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[12px] text-ink">
                      <Check size={15} className="shrink-0 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-3">
                  <div className="text-[22px] font-bold text-ink">{plan.price}</div>
                  <div className="mt-0.5 text-[11px] font-medium text-success">{plan.saving}</div>
                </div>
                <Button
                  type="button"
                  onClick={() => showToast(`${plan.name} bundle is a preview only`)}
                  className={`mt-4 w-full rounded-full ${plan.featured ? "bg-brand text-primary-foreground hover:bg-brand/90" : "bg-brand-soft text-brand hover:bg-brand-soft/80"}`}
                >
                  {plan.action}
                </Button>
              </div>
            </section>
          ))}
          <p className="text-center text-[11px] text-ink-2">Illustrative plans for this preview. No payment is collected.</p>
        </main>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-cool font-sans text-ink">
      <div className="relative mx-auto min-h-screen w-full max-w-[390px] bg-cool shadow-[0_0_60px_-35px_var(--ink)]">

        {screen === "home" && renderHome()}
        {screen === "studio" && renderStudio()}
        {screen === "creation" && renderCreation()}
        {screen === "loading" && renderLoading()}
        {screen === "export" && renderExport()}
        {screen === "bulk" && renderBulk()}
        {screen === "pricing" && renderPricing()}
        {upgradeOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center" role="presentation" onClick={() => setUpgradeOpen(false)}>
            <div role="dialog" aria-modal="true" aria-labelledby="upgrade-title" onClick={(event) => event.stopPropagation()} className="w-full max-w-[350px] rounded-md bg-background p-5 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-md bg-brand-soft text-brand"><Crown size={20} /></span>
                <Button type="button" variant="ghost" size="icon" aria-label="Close upgrade prompt" onClick={() => setUpgradeOpen(false)}><X size={18} /></Button>
              </div>
              <h2 id="upgrade-title" className="mt-4 text-[20px] font-semibold text-ink">Consider upgrading</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{selectedStyle} is a premium preset. Explore a plan to use premium looks, or choose one of the free presets.</p>
              <Button type="button" onClick={() => { setUpgradeOpen(false); setScreen("pricing"); }} className="mt-5 h-11 w-full rounded-md bg-brand text-primary-foreground hover:bg-brand/90">See plans <ArrowRight size={17} /></Button>
              <Button type="button" variant="ghost" onClick={() => setUpgradeOpen(false)} className="mt-1 h-11 w-full text-brand">Keep browsing</Button>
            </div>
          </div>
        )}
        {screen !== "loading" && (
          <VoiceAssistant
            listening={listening}
            open={voiceOpen}
            onToggle={() => setVoiceOpen((value) => !value)}
            onListen={() => {
              setListening((value) => !value);
              if (!listening) showToast("Voice note ready for later");
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
