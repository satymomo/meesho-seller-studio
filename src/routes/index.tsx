import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Instagram,
  LayoutGrid,
  Mic,
  Package,
  Plus,
  Share2,
  ShoppingBag,
  Sparkles,
  Upload,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";

import blueKurti from "@/assets/blue-kurti.jpg";
import maroonKurti from "@/assets/maroon-kurti.jpg";
import anarkaliKurti from "@/assets/anarkali-kurti.jpg";
import { Button } from "@/components/ui/button";

type Screen = "home" | "studio" | "creation" | "loading" | "results" | "export" | "bulk" | "pricing";
type Product = { name: string; shortName: string; price: string; image: string };

const defaultProduct: Product = { name: "Blue Floral Kurti", shortName: "Blue kurti", price: "₹499", image: blueKurti };
const products: Product[] = [
  defaultProduct,
  { name: "Maroon Straight Kurti", shortName: "Maroon kurti", price: "₹599", image: maroonKurti },
  { name: "Festive Anarkali Kurti", shortName: "Festive anarkali", price: "₹899", image: anarkaliKurti },
];

const styles = [
  { name: "Simple Catalogue", note: "Clean white", frame: "bg-background", image: "object-contain p-2 brightness-105" },
  { name: "Everyday Model", note: "Natural light", frame: "bg-sky-soft", image: "object-cover brightness-105 saturate-90" },
  { name: "Festive Look", note: "Warm celebration", frame: "bg-warning-soft", image: "object-cover contrast-110 saturate-125" },
  { name: "Modern Look", note: "Fresh and bold", frame: "bg-success-soft", image: "object-cover contrast-125 saturate-75" },
];

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: ReactNode }) {
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

function VoiceAssistant({ listening, open, onToggle, onListen }: { listening: boolean; open: boolean; onToggle: () => void; onListen: () => void }) {
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 px-5">
      {open && <div className="pointer-events-auto mb-3 ml-auto w-[min(290px,calc(100vw-40px))] rounded-2xl bg-glass p-4 shadow-lg ring-1 ring-line backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3"><div><div className="text-[14px] font-semibold text-ink">Voice assistant</div><p className="mt-1 text-[12px] text-ink-2">“Meri blue kurti ki festive photo bana do”</p></div><Button variant="ghost" size="icon" type="button" aria-label="Close voice assistant" onClick={onToggle} className="size-7 shrink-0 rounded-full text-ink-2"><X size={16} /></Button></div>
        <Button type="button" onClick={onListen} className="mt-4 w-full rounded-full bg-brand text-primary-foreground hover:bg-brand/90"><Mic size={16} />{listening ? "Stop listening" : "Start voice note"}</Button>
        <p className="mt-2 text-center text-[10px] text-ink-2">Voice notes are a demo in this preview.</p>
      </div>}
      <div className="flex justify-end"><Button type="button" aria-label={open ? "Close voice assistant" : "Open voice assistant"} title="Voice assistant" onClick={onToggle} className="pointer-events-auto size-14 rounded-full bg-brand p-0 text-primary-foreground shadow-lg ring-4 ring-glass hover:bg-brand/90 active:scale-95">{listening ? <span className="flex h-5 items-end gap-[3px]">{[1, 2, 3, 4, 5].map((bar) => <span key={bar} className="mic-bar h-5 w-[3px] rounded-full bg-current" />)}</span> : <Mic size={23} />}</Button></div>
      </div>
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
  const [selectedProduct, setSelectedProduct] = useState<Product>(defaultProduct);
  const [selectedStyle, setSelectedStyle] = useState("Simple Catalogue");
  const [listening, setListening] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [remaining, setRemaining] = useState(9);
  const [toast, setToast] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedName, setUploadedName] = useState("");
  const [bulkSelection, setBulkSelection] = useState<string[]>([defaultProduct.name, "Maroon Straight Kurti"]);

  const currentImage = uploadedImage ?? selectedProduct.image;
  const activeStyle = styles.find((style) => style.name === selectedStyle) ?? styles[0];
  const resultStyles = [activeStyle, ...styles.filter((style) => style.name !== selectedStyle).slice(0, 2)];

  useEffect(() => {
    if (screen !== "loading") return;
    const progress = window.setInterval(() => setLoadingStep((step) => Math.min(step + 1, 3)), 650);
    const finish = window.setTimeout(() => setScreen("results"), 2850);
    return () => { window.clearInterval(progress); window.clearTimeout(finish); };
  }, [screen]);

  const startGeneration = () => {
    setLoadingStep(0);
    setScreen("loading");
  };

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
        <Button type="button" variant="outline" onClick={() => setScreen("pricing")} className="flex h-auto w-full justify-between rounded-2xl bg-glass px-4 py-4 text-left text-ink ring-line"><span><span className="block text-[13px] font-semibold">Plans & pricing</span><span className="mt-1 block text-[11px] font-normal text-ink-2">Find the right plan for your shop</span></span><ChevronRight size={18} className="text-brand" /></Button>
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

        <button type="button" onClick={() => setScreen("creation")} className="flex w-full items-center justify-between rounded-full bg-brand px-5 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_16px_30px_-16px_var(--brand)] transition hover:bg-brand/90 active:scale-[0.99]">Continue <ArrowRight size={18} /></button>
      </main>
      <BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>
  );

  const renderCreation = () => (
    <>
      {renderHeader("Choose your look", "Step 2 of 4", () => setScreen("studio"))}
      <main className="space-y-5 px-5 pb-28">
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div><h2 className="text-[17px] font-semibold text-ink">See the result instantly</h2><p className="mt-1 text-[11px] text-ink-2">Tap a style to preview it on your product.</p></div>
            <span className="rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">Product protected</span>
          </div>
          <div className={`relative overflow-hidden rounded-[18px] ring-1 ring-brand ${activeStyle?.frame ?? "bg-background"}`}>
            <img src={currentImage} alt={`${selectedProduct.name} in ${selectedStyle} style`} width={768} height={960} className={`aspect-[4/3] w-full transition duration-300 ${activeStyle?.image ?? "object-cover"}`} />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-glass px-3 py-2 ring-1 ring-line backdrop-blur">
              <span className="text-[11px] font-semibold text-ink">{selectedStyle}</span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-success"><Check size={12} /> Live preview</span>
            </div>
          </div>
        </section>
        <section>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-2">Choose a style</div>
          <div className="grid grid-cols-2 gap-2.5">{styles.map((style) => <button type="button" key={style.name} onClick={() => setSelectedStyle(style.name)} aria-pressed={selectedStyle === style.name} className={`overflow-hidden rounded-2xl bg-glass p-2 text-left ring-1 transition active:scale-[0.98] ${selectedStyle === style.name ? "ring-brand" : "ring-line"}`}><div className={`relative aspect-[4/3] overflow-hidden rounded-xl ${style.frame}`}><img src={currentImage} alt="" width={768} height={960} className={`size-full ${style.image}`} />{selectedStyle === style.name && <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-brand text-primary-foreground"><Check size={13} /></span>}</div><div className="mt-2 text-[11px] font-semibold text-ink">{style.name}</div><div className="text-[10px] text-ink-2">{style.note}</div></button>)}</div>
        </section>
        <Button type="button" onClick={() => { setRemaining((value) => Math.max(value - 1, 0)); startGeneration(); }} className="flex h-auto w-full items-center justify-between rounded-full bg-brand px-5 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_16px_30px_-16px_var(--brand)] hover:bg-brand/90">Proceed <ArrowRight size={18} /></Button>
        <p className="text-center text-[11px] text-ink-2">{remaining} product creations remaining · retry is free if the product does not match</p>
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
      <main className="space-y-5 px-5 pb-32">
        <div className="rounded-2xl bg-success-soft px-4 py-3 text-[12px] font-medium text-success ring-1 ring-success/15"><Check size={15} className="mr-2 inline" />Same product, better presentation</div>
        <section><div className="mb-3 flex items-center justify-between"><div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-2">Generated previews</div><span className="text-[10px] text-ink-2">3 options</span></div><div className="grid grid-cols-3 gap-2.5">{resultStyles.map((style, index) => <Button type="button" variant="ghost" key={style.name} aria-label={`Select ${style.name} preview`} aria-pressed={selectedStyle === style.name} onClick={() => setSelectedStyle(style.name)} className={`relative h-auto min-w-0 flex-col items-start overflow-hidden rounded-2xl p-0 text-left ring-1 ${selectedStyle === style.name ? "ring-brand" : "ring-line"}`}><span className={`block aspect-[3/4] w-full overflow-hidden ${style.frame}`}><img src={currentImage} alt={`${selectedProduct.name} in ${style.name} style`} width={768} height={960} className={`size-full ${style.image}`} /></span>{index === 0 && <span className="absolute left-1 top-1 rounded-full bg-brand px-1.5 py-1 text-[8px] font-semibold text-primary-foreground">Best match</span>}<span className="block w-full truncate bg-glass px-2 py-2 text-[9px] font-medium text-ink">{style.name}</span></Button>)}</div></section>
        <section className="rounded-2xl bg-glass p-4 ring-1 ring-line"><div className="flex items-center justify-between"><div className="text-[14px] font-semibold text-ink">Product Match</div><div className="rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">96% match</div></div><div className="mt-4 grid grid-cols-2 gap-2.5">{["Colour", "Print", "Shape", "Details"].map((check) => <div key={check} className="flex items-center gap-2 rounded-xl bg-cool px-3 py-2.5 text-[11px] font-medium text-ink"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-success-soft text-success"><Check size={12} /></span>{check} looks right</div>)}</div><p className="mt-3 text-[11px] text-ink-2">We kept your product’s colour, print and shape unchanged.</p></section>
        <div className="grid grid-cols-3 gap-2"><Button type="button" variant="outline" onClick={startGeneration} className="h-auto whitespace-normal rounded-full bg-glass px-2 py-3 text-[11px] text-ink">Retry free</Button><Button type="button" variant="outline" onClick={() => setScreen("creation")} className="h-auto whitespace-normal rounded-full bg-glass px-2 py-3 text-[11px] text-ink">Try another style</Button><Button type="button" onClick={() => setScreen("export")} className="h-auto whitespace-normal rounded-full bg-brand px-2 py-3 text-[11px] text-primary-foreground hover:bg-brand/90">Use this image</Button></div>
      </main>
      <BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>
  );

  const renderExport = () => (
    <>
      {renderHeader("Ready to use", "Step 4 of 4", () => setScreen("results"))}
      <main className="space-y-5 px-5 pb-28">
        <section>
          <div className="mb-3 flex items-center justify-between"><h2 className="text-[15px] font-semibold text-ink">See the improvement</h2><span className="text-[10px] font-medium text-success">96% product match</span></div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="overflow-hidden rounded-2xl bg-glass ring-1 ring-line"><img src={currentImage} alt={`Original ${selectedProduct.name}`} width={768} height={960} className="aspect-[3/4] w-full object-cover" /><div className="px-3 py-2.5"><div className="text-[11px] font-semibold text-ink">Original</div><div className="text-[10px] text-ink-2">Your uploaded photo</div></div></div>
            <div className={`overflow-hidden rounded-2xl ring-2 ring-brand ${activeStyle?.frame ?? "bg-background"}`}><img src={currentImage} alt={`Enhanced ${selectedProduct.name}`} width={768} height={960} className={`aspect-[3/4] w-full ${activeStyle?.image ?? "object-cover"}`} /><div className="bg-glass px-3 py-2.5"><div className="flex items-center gap-1 text-[11px] font-semibold text-brand"><Sparkles size={12} /> Enhanced</div><div className="truncate text-[10px] text-ink-2">{selectedStyle}</div></div></div>
          </div>
        </section>
        <section className="rounded-2xl bg-glass p-4 ring-1 ring-line"><div className="flex items-center justify-between"><div className="text-[14px] font-semibold text-ink">Product Match</div><div className="rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">Looks right</div></div><div className="mt-3 grid grid-cols-4 gap-1.5">{["Colour", "Print", "Shape", "Details"].map((check) => <div key={check} className="flex flex-col items-center gap-1.5 rounded-xl bg-cool px-1 py-2.5 text-[9px] font-medium text-ink"><span className="grid size-5 place-items-center rounded-full bg-success-soft text-success"><Check size={12} /></span>{check}</div>)}</div></section>
        <div className="grid grid-cols-2 gap-2.5"><Button type="button" variant="outline" onClick={startGeneration} className="rounded-full bg-glass text-[11px] text-ink">Retry free</Button><Button type="button" variant="outline" onClick={() => setScreen("creation")} className="rounded-full bg-glass text-[11px] text-ink">Try another style</Button></div>
        <div><h2 className="text-[17px] font-semibold text-ink">Use this image</h2><div className="mt-3 space-y-2.5">{[{ label: "Add to Meesho catalogue", note: "Use this photo in your product listing", icon: ShoppingBag }, { label: "Download HD", note: "Save a clear copy to your phone", icon: Download }, { label: "Share on WhatsApp", note: "Send it to a customer or family", icon: Share2 }, { label: "Use on Instagram", note: "Share as a post or story", icon: Instagram }, { label: "Export for other marketplaces", note: "Use this photo anywhere", icon: ArrowRight }].map(({ label, note, icon: ActionIcon }) => <button type="button" key={label} onClick={() => showToast(`${label} is ready for the next step`)} className="flex w-full items-center gap-3 rounded-2xl bg-glass p-3.5 text-left ring-1 ring-line transition hover:ring-brand active:scale-[0.99]"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><ActionIcon size={18} /></span><span className="min-w-0 flex-1"><span className="block text-[13px] font-semibold text-ink">{label}</span><span className="mt-0.5 block text-[11px] text-ink-2">{note}</span></span><ChevronRight size={17} className="text-ink-2" /></button>)}</div></div>
        <button type="button" onClick={() => { showToast("Photo saved to your catalogue"); setScreen("home"); }} className="w-full rounded-full bg-brand py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_16px_30px_-16px_var(--brand)]">Done</button>
      </main>
      <BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>
  );

  const renderBulk = () => (
    <>
      {renderHeader("Create many at once", "Power seller", () => setScreen("home"))}
      <main className="space-y-5 px-5 pb-28"><div className="rounded-2xl bg-sky-soft p-4 ring-1 ring-line"><div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-glass text-sky"><LayoutGrid size={21} /></div><div><div className="text-[14px] font-semibold text-ink">Select your products</div><div className="mt-1 text-[11px] text-ink-2">Make clean photos for many products together</div></div></div></div><section className="space-y-2.5">{products.map((product) => <button type="button" key={product.name} onClick={() => toggleBulk(product.name)} className={`flex w-full items-center gap-3 rounded-2xl bg-glass p-3 text-left ring-1 ${bulkSelection.includes(product.name) ? "ring-brand" : "ring-line"}`}><img src={product.image} alt={product.name} loading="lazy" width={768} height={960} className="size-14 rounded-xl object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-medium text-ink">{product.name}</span><span className="mt-1 block text-[11px] text-ink-2">{product.price}</span></span><span className={`grid size-6 place-items-center rounded-full ring-1 ${bulkSelection.includes(product.name) ? "bg-brand text-primary-foreground ring-brand" : "bg-cool text-ink-2 ring-line"}`}>{bulkSelection.includes(product.name) && <Check size={14} />}</span></button>)}</section><button type="button" disabled={bulkSelection.length === 0} onClick={() => showToast(`${bulkSelection.length} products are ready to create`)} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-[15px] font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"><Sparkles size={18} /> Create {bulkSelection.length} products</button><div className="rounded-2xl bg-glass p-4 ring-1 ring-line"><div className="flex items-center justify-between"><div><div className="text-[13px] font-semibold text-ink">Need more?</div><div className="mt-1 text-[11px] text-ink-2">Add products to your pack</div></div><Plus size={18} className="text-brand" /></div><div className="mt-3 grid grid-cols-3 gap-2">{["10 more products", "100 more products", "Large seller pack"].map((pack) => <button type="button" key={pack} onClick={() => showToast(`${pack} selected`)} className="rounded-xl bg-cool px-2 py-3 text-[10px] font-medium text-ink">{pack}</button>)}</div></div></main><BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} /></>
  );

  const renderPricing = () => {
    const plans = [
      { name: "Free", price: "₹0", detail: "For your first few product photos", features: ["9 product creations", "Style previews", "Standard downloads"], action: "Current plan", featured: false },
      { name: "Starter", price: "₹299", detail: "For a growing catalogue", features: ["30 product creations / month", "All visual styles", "HD downloads"], action: "Choose Starter", featured: false },
      { name: "Growth", price: "₹799", detail: "For sellers creating every week", features: ["100 product creations / month", "Bulk creation", "HD downloads"], action: "Choose Growth", featured: true },
      { name: "Scale", price: "Custom", detail: "For larger teams and catalogues", features: ["Custom creation volume", "Bulk creation", "Team support"], action: "Contact us", featured: false },
    ];
    return <>
      {renderHeader("Plans & pricing", "Seller studio", () => setScreen("home"))}
      <main className="space-y-4 px-5 pb-32"><p className="text-[12px] text-ink-2">Illustrative plans for this preview. No payment is collected.</p>
        {plans.map((plan) => <section key={plan.name} className={`rounded-2xl bg-glass p-5 ring-1 ${plan.featured ? "ring-brand" : "ring-line"}`}>
          <div className="flex items-center justify-between"><h2 className="text-[17px] font-semibold text-ink">{plan.name}</h2>{plan.featured && <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold text-brand">Popular</span>}</div>
          <div className="mt-2 text-[26px] font-semibold text-ink">{plan.price}{plan.price !== "Custom" && <span className="ml-1 text-[12px] font-normal text-ink-2">/ month</span>}</div>
          <p className="mt-1 text-[12px] text-ink-2">{plan.detail}</p><div className="my-4 h-px bg-line" />
          <ul className="space-y-2.5">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-[12px] text-ink"><Check size={15} className="shrink-0 text-success" />{feature}</li>)}</ul>
          <Button type="button" disabled={plan.name === "Free"} onClick={() => showToast(`${plan.name} plan is a preview only`)} className={`mt-5 w-full rounded-full ${plan.featured ? "bg-brand text-primary-foreground hover:bg-brand/90" : "bg-brand-soft text-brand hover:bg-brand-soft/80"}`}>{plan.action}</Button>
        </section>)}
      </main><BottomNav active="studio" onHome={() => setScreen("home")} onStudio={() => setScreen("studio")} />
    </>;
  };

  return <div className="min-h-screen bg-cool font-sans text-ink"><div className="relative mx-auto min-h-screen w-full max-w-[390px] overflow-hidden bg-cool shadow-[0_0_60px_-35px_var(--ink)]">{screen === "home" && renderHome()}{screen === "studio" && renderStudio()}{screen === "creation" && renderCreation()}{screen === "loading" && renderLoading()}{screen === "results" && renderResults()}{screen === "export" && renderExport()}{screen === "bulk" && renderBulk()}{screen === "pricing" && renderPricing()}{screen !== "loading" && <VoiceAssistant listening={listening} open={voiceOpen} onToggle={() => setVoiceOpen((value) => !value)} onListen={() => { setListening((value) => !value); if (!listening) showToast("Voice note ready for later"); }} />}{toast && <div role="status" className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-3 text-[12px] font-medium text-primary-foreground shadow-lg"><Check size={15} className="text-success" />{toast}<Button variant="ghost" size="icon" type="button" onClick={() => setToast("")} aria-label="Close message" className="size-5 text-primary-foreground"><X size={14} /></Button></div>}</div></div>;
}