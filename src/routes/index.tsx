import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  ImagePlus,
  Instagram,
  LayoutGrid,
  Mic,
  Package,
  Play,
  Plus,
  Share2,
  ShoppingBag,
  Sparkles,
  Upload,
  UserRound,
  Video,
  WandSparkles,
  X,
} from "lucide-react";

import blueKurti from "@/assets/blue-kurti.jpg";
import maroonKurti from "@/assets/maroon-kurti.jpg";
import anarkaliKurti from "@/assets/anarkali-kurti.jpg";

type Screen = "home" | "studio" | "creation" | "loading" | "results" | "export" | "bulk";
type CreationType = "Clean product photo" | "Show on a model" | "Festive / lifestyle image" | "Short product video";

const products = [
  { name: "Blue Floral Kurti", shortName: "Blue kurti", price: "₹499", image: blueKurti },
  { name: "Maroon Straight Kurti", shortName: "Maroon kurti", price: "₹599", image: maroonKurti },
  { name: "Festive Anarkali Kurti", shortName: "Festive anarkali", price: "₹899", image: anarkaliKurti },
];

const creationTypes: Array<{ label: CreationType; description: string; icon: typeof ImagePlus }> = [
  { label: "Clean product photo", description: "Clean listing shot", icon: ImagePlus },
  { label: "Show on a model", description: "See the fit", icon: UserRound },
  { label: "Festive / lifestyle image", description: "Ready for sharing", icon: Sparkles },
  { label: "Short product video", description: "5 second reel", icon: Video },
];

const styles = [
  { name: "Simple Catalogue", note: "Clean white", tone: "bg-sky-soft" },
  { name: "Everyday Model", note: "Natural light", tone: "bg-brand-soft" },
  { name: "Festive Look", note: "Festive colour", tone: "bg-warning-soft" },
  { name: "Modern Look", note: "Fresh and bold", tone: "bg-success-soft" },
];

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full bg-glass text-ink ring-1 ring-line transition hover:bg-brand-soft active:scale-95"
    >
      {children}
    </button>
  );
}

function BottomNav({ active, onHome, onStudio }: { active: "home" | "studio"; onHome: () => void; onStudio: () => void }) {
  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[390px] -translate-x-1/2 px-5 pb-4">
      <div className="flex items-center justify-between rounded-full bg-glass px-2 py-2 shadow-[0_12px_30px_-16px_var(--ink)] ring-1 ring-line backdrop-blur">
        <button type="button" onClick={onHome} className={`flex flex-1 flex-col items-center gap-1 rounded-full py-2 text-[10px] font-medium ${active === "home" ? "bg-brand-soft text-brand" : "text-ink-2"}`}>
          <span className={`grid size-4 place-items-center rounded-full ${active === "home" ? "bg-brand" : "bg-ink-2/40"}`} />
          Home
        </button>
        <button type="button" onClick={onStudio} className={`mx-1 flex flex-1 flex-col items-center gap-1 rounded-full py-2 text-[10px] font-medium ${active === "studio" ? "bg-brand-soft text-brand" : "text-ink-2"}`}>
          <Sparkles size={15} strokeWidth={2.2} />
          Studio
        </button>
        <button type="button" onClick={() => undefined} className="flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium text-ink-2">
          <Package size={15} strokeWidth={2.2} />
          Orders
        </button>
        <button type="button" onClick={() => undefined} className="flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium text-ink-2">
          <UserRound size={15} strokeWidth={2.2} />
          Me
        </button>
      </div>
    </div>
  );
}

function VoiceCard({ listening, onClick }: { listening: boolean; onClick: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-glass p-3 ring-1 ring-line">
      <button type="button" aria-label={listening ? "Stop voice note" : "Use voice note"} onClick={onClick} className={`grid size-11 shrink-0 place-items-center rounded-full ring-1 transition active:scale-95 ${listening ? "bg-brand text-primary-foreground ring-brand" : "bg-brand-soft text-brand ring-brand/25"}`}>
        {listening ? <span className="flex h-4 items-end gap-[3px]">{[1, 2, 3, 4, 5].map((bar) => <span key={bar} className="mic-bar h-4 w-[3px] rounded-full bg-current" />)}</span> : <Mic size={19} />}
      </button>
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-ink">{listening ? "Listening…" : "Describe the shot by voice"}</div>
        <div className="truncate text-[11px] text-ink-2">“Meri blue kurti ki festive photo bana do”</div>
      </div>
      {listening && <span className="ml-auto size-2 rounded-full bg-brand soft-pulse" />}
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meesho Seller Studio — Product Photo Maker" },
      { name: "description", content: "A simple seller workspace to create better product photos for your Meesho catalogue." },
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
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [creationType, setCreationType] = useState<CreationType>("Clean product photo");
  const [selectedStyle, setSelectedStyle] = useState(styles[0].name);
  const [listening, setListening] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [remaining, setRemaining] = useState(9);
  const [toast, setToast] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedName, setUploadedName] = useState("");
  const [bulkSelection, setBulkSelection] = useState<string[]>([products[0].name, products[1].name]);

  const currentImage = uploadedImage ?? selectedProduct.image;
  const resultImages = useMemo(() => {
    if (selectedProduct.name === products[1].name) return [maroonKurti, blueKurti, anarkaliKurti];
    if (selectedProduct.name === products[2].name) return [anarkaliKurti, blueKurti, maroonKurti];
    return [blueKurti, maroonKurti, anarkaliKurti];
  }, [selectedProduct.name]);

  useEffect(() => {
    if (screen !== "loading") return;
    setLoadingStep(0);
    const stepTimer = window.setInterval(() => setLoadingStep((step) => Math.min(step + 1, 3)), 650);
    const resultTimer = window.setTimeout(() => setScreen("results"), 2850);
    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(resultTimer);
    };
  }, [screen]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const toggleBulk = (name: string) => {
    setBulkSelection((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  };

  const renderHeader = (title: string, eyebrow: string, back: () => void) => (
    <div className="flex items-center justify-between px-5 pb-4 pt-6">
      <div className="flex items-center gap-3">
        <IconButton label="Go back" onClick={back}><ArrowLeft size={18} /></IconButton>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-2">{eyebrow}</div>
          <h1 className="text-[22px] font-semibold leading-tight text-ink">{title}</h1>
        </div>
      </div>
      <div className="rounded-full bg-glass px-3 py-1.5 text-[11px] font-medium text-ink-2 ring-1 ring-line"><span className="text-brand">{remaining}</span> left</div>
    </div>
  );

  const renderHome = () => (
    <>
      <div className="bg-brand px-5 pb-8 pt-7 text-primary-foreground">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/75"><span>Sharma Fashion Store</span><span>Seller home</span></div>
        <div className="mt-4 flex items-end justify-between">
          <div><h1 className="text-[28px] font-semibold leading-tight">Namaste, Sharma!</h1><p className="mt-1 text-[13px] text-primary-foreground/80">Aaj apna shop aur sundar banayein.</p></div>
          <div className="grid size-11 place-items-center rounded-full bg-glass/20"><UserRound size={20} /></div>
        </div>
      </div>
      <main className="space-y-6 px-5 pb-28 pt-5">
        <div className="-mt-12 rounded-[18px] bg-ink p-4 text-primary-foreground shadow-[0_18px_40px_-20px_var(--ink)]">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-primary-foreground/65"><span>This week</span><span>+18% orders</span></div>
          <div className="mt-3 flex items-end justify-between"><div><div className="text-[32px] font-semibold leading-none">₹12,480</div><div className="mt-1 text-[11px] text-primary-foreground/65">total sales</div></div><div className="rounded-full bg-success-soft px-3 py-1.5 text-[11px] font-medium text-success">Good going!</div></div>
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between"><h2 className="text-[15px] font-semibold text-ink">Seller tools</h2><span className="text-[10px] uppercase tracking-[0.15em] text-ink-2">Make it easy</span></div>
          <button type="button" onClick={() => setScreen("studio")} className="group w-full rounded-[18px] bg-glass p-4 text-left ring-1 ring-line transition hover:ring-brand active:scale-[0.99]">
            <div className="flex items-center gap-3"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand"><WandSparkles size={23} /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="text-[15px] font-semibold text-ink">Seller Studio</h3><span className="rounded-full bg-success-soft px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-success">New</span></div><p className="mt-1 text-[12px] text-ink-2">Apne product ki better photo banayein</p></div><ChevronRight className="text-brand transition group-hover:translate-x-0.5" size={19} /></div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-cool px-3 py-2.5 text-[11px] text-ink-2"><span>9 product creations remaining</span><span className="font-medium text-brand">Open studio</span></div>
          </button>
        </section>

        <section><div className="mb-3 flex items-center justify-between"><h2 className="text-[15px] font-semibold text-ink">Your products</h2><button type="button" onClick={() => setScreen("studio")} className="text-[11px] font-medium text-brand">See all</button></div><div className="grid grid-cols-3 gap-2.5">{products.map((product) => <button key={product.name} type="button" onClick={() => { setSelectedProduct(product); setScreen("studio"); }} className="text-left"><img src={product.image} alt={product.name} loading="lazy" width={768} height={960} className="aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-line" /><div className="mt-1.5 truncate text-[11px] font-medium text-ink">{product.shortName}</div><div className="text-[10px] text-ink-2">{product.price}</div></button>)}</div></section>

        <section className="rounded-[18px] bg-sky-soft p-4 ring-1 ring-line"><div className="flex items-center justify-between"><div><div className="text-[13px] font-semibold text-ink">Create many at once</div><div className="mt-1 text-[11px] text-ink-2">For sellers with many products</div></div><button type="button" onClick={() => setScreen("bulk")} aria-label="Open bulk create" className="grid size-10 place-items-center rounded-full bg-glass text-sky ring-1 ring-line"><LayoutGrid size={18} /></button></div></section>
      </main>
      <BottomNav active="home" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>
  );

  const renderStudio = () => (
    <>
      {renderHeader("Choose a product", "Seller studio", () => setScreen("home"))}
      <main className="space-y-5 px-5 pb-28">
        <div className="relative overflow-hidden rounded-[18px] bg-glass ring-1 ring-line">
          <img src={currentImage} alt={selectedProduct.name} width={768} height={960} className="aspect-[4/3] w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="drift absolute -inset-y-6 -left-6 w-1/2 -rotate-[24deg] bg-glass/35 blur-[2px]" /><div className="absolute -inset-y-6 right-0 w-1/3 -rotate-[24deg] bg-brand/10 blur-[1px]" /></div>
          <div className="absolute left-3 top-3 rounded-full bg-glass px-3 py-1.5 text-[11px] font-medium text-ink ring-1 ring-line">{uploadedName || selectedProduct.name} <span className="text-ink-2">· {selectedProduct.price}</span></div>
          <div className="absolute bottom-3 right-3 rounded-full bg-glass px-3 py-1.5 text-[11px] font-medium text-brand ring-1 ring-line">Step 1 of 4</div>
        </div>

        <section><div className="mb-2 flex items-center justify-between"><div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-2">Choose from your products</div><span className="text-[10px] text-ink-2">3 saved</span></div><div className="flex gap-2.5 overflow-x-auto pb-1">{products.map((product) => <button type="button" key={product.name} onClick={() => { setSelectedProduct(product); setUploadedImage(null); setUploadedName(""); }} className={`w-[86px] shrink-0 rounded-2xl bg-glass p-2 text-left ring-1 ${selectedProduct.name === product.name && !uploadedImage ? "ring-brand" : "ring-line"}`}><img src={product.image} alt={product.name} loading="lazy" width={768} height={960} className="aspect-square w-full rounded-xl object-cover" /><div className="mt-1 truncate text-[10px] font-medium text-ink">{product.shortName}</div></button>)}<label className="w-[86px] shrink-0 cursor-pointer rounded-2xl bg-glass p-2 ring-1 ring-line"><div className="grid aspect-square place-items-center rounded-xl bg-cool text-brand"><Upload size={20} /></div><div className="mt-1 text-[10px] font-medium text-ink">Upload photo</div><input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) { setUploadedImage(URL.createObjectURL(file)); setUploadedName(file.name); } }} /></label></div></section>

        <VoiceCard listening={listening} onClick={() => { setListening((value) => !value); if (!listening) showToast("Voice note ready for later"); }} />
        <button type="button" onClick={() => setScreen("creation")} className="flex w-full items-center justify-between rounded-full bg-brand px-5 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_16px_30px_-16px_var(--brand)] transition hover:bg-brand/90 active:scale-[0.99]">Continue <ArrowRight size={18} /></button>
      </main>
      <BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>
  );

  const renderCreation = () => (
    <>
      {renderHeader("Make your product shine", "Step 2 of 4", () => setScreen("studio"))}
      <main className="space-y-5 px-5 pb-28">
        <div className="flex items-center gap-3 rounded-2xl bg-glass p-3 ring-1 ring-line"><img src={currentImage} alt={selectedProduct.name} width={768} height={960} className="size-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="truncate text-[13px] font-medium text-ink">{selectedProduct.name}</div><div className="mt-1 text-[11px] text-ink-2">Your product stays the same</div></div><Check className="text-success" size={18} /></div>
        <section><div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-2">What do you want to create?</div><div className="grid grid-cols-2 gap-2.5">{creationTypes.map(({ label, description, icon: TypeIcon }) => <button type="button" key={label} onClick={() => setCreationType(label)} className={`rounded-2xl p-3 text-left ring-1 transition active:scale-[0.98] ${creationType === label ? "bg-brand-soft ring-brand" : "bg-glass ring-line"}`}><TypeIcon size={20} className={creationType === label ? "text-brand" : "text-ink-2"} /><div className="mt-2 text-[13px] font-semibold text-ink">{label}</div><div className="mt-1 text-[11px] text-ink-2">{description}</div></button>)}</div></section>
        <section><div className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-2">Pick a style</div><div className="flex gap-2.5 overflow-x-auto pb-1">{styles.map((style) => <button type="button" key={style.name} onClick={() => setSelectedStyle(style.name)} className={`w-[112px] shrink-0 rounded-2xl bg-glass p-2 text-left ring-1 ${selectedStyle === style.name ? "ring-brand" : "ring-line"}`}><div className={`grid aspect-square place-items-center rounded-xl ${style.tone}`}><Sparkles size={22} className={selectedStyle === style.name ? "text-brand" : "text-ink-2/50"} /></div><div className="mt-1.5 truncate text-[11px] font-medium text-ink">{style.name}</div><div className="text-[10px] text-ink-2">{style.note}</div></button>)}</div></section>
        <VoiceCard listening={listening} onClick={() => { setListening((value) => !value); if (!listening) showToast("Voice note ready for later"); }} />
        <button type="button" onClick={() => { setRemaining((value) => Math.max(value - 1, 0)); setScreen("loading"); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_16px_30px_-16px_var(--brand)] transition hover:bg-brand/90 active:scale-[0.99]"><WandSparkles size={18} /> Generate</button>
        <p className="text-center text-[11px] text-ink-2">9 product creations remaining · retry is free if the product does not match</p>
      </main>
      <BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>
  );

  const renderLoading = () => {
    const steps = ["Product checked", "Colour and print identified", "Product details protected", "Creating options"];
    return <main className="flex min-h-screen flex-col justify-center px-5 pb-20"><div className="mx-auto w-full max-w-[350px] text-center"><div className="mx-auto grid size-20 place-items-center rounded-[24px] bg-brand-soft text-brand"><WandSparkles size={34} /></div><h1 className="mt-6 text-[24px] font-semibold text-ink">Making your options</h1><p className="mt-2 text-[13px] text-ink-2">Your {selectedProduct.shortName} is being prepared.</p><div className="mt-8 space-y-3 text-left">{steps.map((step, index) => <div key={step} className={`flex items-center gap-3 rounded-2xl bg-glass p-3.5 ring-1 ring-line transition ${index <= loadingStep ? "text-ink" : "text-ink-2/40"}`}><span className={`grid size-7 place-items-center rounded-full ${index < loadingStep ? "bg-success-soft text-success" : index === loadingStep ? "bg-brand-soft text-brand" : "bg-cool text-ink-2/50"}`}>{index < loadingStep ? <Check size={15} /> : index === loadingStep ? <span className="size-2 rounded-full bg-brand soft-pulse" /> : <span className="size-1.5 rounded-full bg-current" />}</span><span className="text-[13px] font-medium">{step}</span></div>)}</div></div></main>;
  };

  const renderResults = () => (
    <>
      {renderHeader("Your options are ready", "Step 3 of 4", () => setScreen("creation"))}
      <main className="space-y-5 px-5 pb-28">
        <div className="rounded-2xl bg-success-soft px-4 py-3 text-[12px] font-medium text-success ring-1 ring-success/15"><span className="mr-2">✓</span>Same product, better presentation</div>
        <section><div className="mb-3 flex items-center justify-between"><div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-2">Generated previews</div><span className="text-[10px] text-ink-2">3 options</span></div><div className="grid grid-cols-3 gap-2.5">{resultImages.map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setScreen("export")} className={`relative overflow-hidden rounded-2xl bg-glass text-left ring-1 ${index === 0 ? "ring-brand" : "ring-line"}`}><img src={image} alt={`${selectedProduct.name} preview ${index + 1}`} loading="lazy" width={768} height={960} className="aspect-[3/4] w-full object-cover" />{index === 0 && <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-1 text-[9px] font-semibold text-primary-foreground">Best match</span>}<span className="absolute bottom-2 left-2 rounded-full bg-glass px-2 py-1 text-[9px] font-medium text-ink ring-1 ring-line">Preview</span></button>)}</div></section>
        <section className="rounded-2xl bg-glass p-4 ring-1 ring-line"><div className="flex items-center justify-between"><div className="text-[14px] font-semibold text-ink">Product Match</div><div className="rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">96% match</div></div><div className="mt-4 grid grid-cols-2 gap-2.5">{["Colour", "Print", "Shape", "Details"].map((check) => <div key={check} className="flex items-center gap-2 rounded-xl bg-cool px-3 py-2.5 text-[11px] font-medium text-ink"><span className="grid size-5 place-items-center rounded-full bg-success-soft text-success"><Check size={12} /></span>{check} looks right</div>)}</div><p className="mt-3 text-[11px] text-ink-2">We kept your product’s colour, print and shape unchanged.</p></section>
        <div className="grid grid-cols-3 gap-2"><button type="button" onClick={() => setScreen("loading")} className="rounded-full bg-glass px-2 py-3 text-[11px] font-medium text-ink ring-1 ring-line">Retry free</button><button type="button" onClick={() => setScreen("creation")} className="rounded-full bg-glass px-2 py-3 text-[11px] font-medium text-ink ring-1 ring-line">Try another style</button><button type="button" onClick={() => setScreen("export")} className="rounded-full bg-brand px-2 py-3 text-[11px] font-semibold text-primary-foreground ring-1 ring-brand">Use this image</button></div>
      </main>
      <BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>
  );

  const renderExport = () => (
    <>
      {renderHeader("Ready to share", "Step 4 of 4", () => setScreen("results"))}
      <main className="space-y-5 px-5 pb-28"><div className="relative overflow-hidden rounded-[18px] bg-glass ring-1 ring-line"><img src={currentImage} alt={`${selectedProduct.name} selected preview`} width={768} height={960} className="aspect-[4/3] w-full object-cover" /><div className="absolute bottom-3 left-3 rounded-full bg-glass px-3 py-1.5 text-[11px] font-medium text-ink ring-1 ring-line">{selectedStyle}</div></div><div><h2 className="text-[17px] font-semibold text-ink">What would you like to do?</h2><div className="mt-3 space-y-2.5">{[{ label: "Add to Meesho catalogue", note: "Use this photo in your product listing", icon: ShoppingBag }, { label: "Download HD", note: "Save a clear copy to your phone", icon: Download }, { label: "Share on WhatsApp", note: "Send it to a customer or family", icon: Share2 }, { label: "Use on Instagram", note: "Share as a post or story", icon: Instagram }, { label: "Export for other marketplaces", note: "Use this photo anywhere", icon: ArrowRight }].map(({ label, note, icon: ActionIcon }) => <button type="button" key={label} onClick={() => showToast(`${label} is ready for the next step`)} className="flex w-full items-center gap-3 rounded-2xl bg-glass p-3.5 text-left ring-1 ring-line transition hover:ring-brand active:scale-[0.99]"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><ActionIcon size={18} /></span><span className="min-w-0 flex-1"><span className="block text-[13px] font-semibold text-ink">{label}</span><span className="mt-0.5 block text-[11px] text-ink-2">{note}</span></span><ChevronRight size={17} className="text-ink-2" /></button>)}</div></div><button type="button" onClick={() => { showToast("Photo saved to your catalogue"); setScreen("home"); }} className="w-full rounded-full bg-brand py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_16px_30px_-16px_var(--brand)]">Done</button></main><BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} /></>
  );

  const renderBulk = () => (
    <>
      {renderHeader("Create many at once", "Power seller", () => setScreen("home"))}
      <main className="space-y-5 px-5 pb-28"><div className="rounded-2xl bg-sky-soft p-4 ring-1 ring-line"><div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-glass text-sky"><LayoutGrid size={21} /></div><div><div className="text-[14px] font-semibold text-ink">Select your products</div><div className="mt-1 text-[11px] text-ink-2">Make clean photos for many products together</div></div></div></div><section className="space-y-2.5">{products.map((product) => <button type="button" key={product.name} onClick={() => toggleBulk(product.name)} className={`flex w-full items-center gap-3 rounded-2xl bg-glass p-3 text-left ring-1 ${bulkSelection.includes(product.name) ? "ring-brand" : "ring-line"}`}><img src={product.image} alt={product.name} loading="lazy" width={768} height={960} className="size-14 rounded-xl object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-medium text-ink">{product.name}</span><span className="mt-1 block text-[11px] text-ink-2">{product.price}</span></span><span className={`grid size-6 place-items-center rounded-full ring-1 ${bulkSelection.includes(product.name) ? "bg-brand text-primary-foreground ring-brand" : "bg-cool text-ink-2 ring-line"}`}>{bulkSelection.includes(product.name) && <Check size={14} />}</span></button>)}</section><VoiceCard listening={listening} onClick={() => setListening((value) => !value)} /><button type="button" disabled={bulkSelection.length === 0} onClick={() => showToast(`${bulkSelection.length} products are ready to create`)} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-[15px] font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"><Sparkles size={18} /> Create {bulkSelection.length} products</button><div className="rounded-2xl bg-glass p-4 ring-1 ring-line"><div className="flex items-center justify-between"><div><div className="text-[13px] font-semibold text-ink">Need more?</div><div className="mt-1 text-[11px] text-ink-2">Add products to your pack</div></div><Plus size={18} className="text-brand" /></div><div className="mt-3 grid grid-cols-3 gap-2">{["10 more products", "100 more products", "Large seller pack"].map((pack) => <button type="button" key={pack} onClick={() => showToast(`${pack} selected`)} className="rounded-xl bg-cool px-2 py-3 text-[10px] font-medium text-ink">{pack}</button>)}</div></div></main><BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} /></>
    </>
  );

  return <div className="min-h-screen bg-cool font-sans text-ink"><div className="relative mx-auto min-h-screen w-full max-w-[390px] overflow-hidden bg-cool shadow-[0_0_60px_-35px_var(--ink)]">{screen === "home" && renderHome()}{screen === "studio" && renderStudio()}{screen === "creation" && renderCreation()}{screen === "loading" && renderLoading()}{screen === "results" && renderResults()}{screen === "export" && renderExport()}{screen === "bulk" && renderBulk()}{toast && <div role="status" className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-3 text-[12px] font-medium text-primary-foreground shadow-lg"><Check size={15} className="text-success" />{toast}<button type="button" onClick={() => setToast("")} aria-label="Close message"><X size={14} /></button></div>}</div></div>;
}