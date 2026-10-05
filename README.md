# Meesho Seller Studio

**A mobile-first prototype for creating product catalogues without a studio shoot or prompt-writing.** Built by **Team Adjusted EBITDA, IIT Kanpur** (Aayushman Kumar, Satyansh Sharma and Shagun Chaudhary) for the **Meesho Season 3 DICE Challenge**.

Seller Studio explores a guided way for a Meesho seller to start with a real product photo, browse culturally relevant catalogue looks, choose the shots they need and review the resulting set. The idea is to make professional-looking, consistent product content more accessible while keeping the original product as the source of truth. This repository is an interactive **concept prototype**, not an official Meesho product or a production catalogue pipeline.

## Try the prototype

[Open the live preview](https://id-preview--9a2ca507-64d1-4469-afd8-8ddf254b958f.lovable.app) on a phone or in a narrow browser window. It is designed around a 390px-wide seller experience.

## Screenshots

Captured from the working prototype in its default offline demo mode. Catalogue photos shown here are sample previews, not generated edits.

| Start | Choose a photo | Browse looks |
| :---: | :---: | :---: |
| <img src="docs/screenshots/01-home.webp" width="220" alt="Seller Studio start screen with original and studio-look photos" /> | <img src="docs/screenshots/02-choose-photo.webp" width="220" alt="Select a sample product photo or add a photo" /> | <img src="docs/screenshots/03-presets.webp" width="220" alt="Browse free and premium catalogue looks" /> |

| Preview a catalogue | Select shots | Review |
| :---: | :---: | :---: |
| <img src="docs/screenshots/04-gallery.webp" width="220" alt="Swipeable Shaadi Shringar catalogue preview" /> | <img src="docs/screenshots/05-select-shots.webp" width="220" alt="Select photos from a six-shot catalogue" /> | <img src="docs/screenshots/06-review.webp" width="220" alt="Review original photo beside selected catalogue photos" /> |

| Save or share | Create many | Plans |
| :---: | :---: | :---: |
| <img src="docs/screenshots/07-save.webp" width="220" alt="Download or share selected demo photos" /> | <img src="docs/screenshots/08-bulk-modes.webp" width="220" alt="One-to-one, many-to-one and many-to-many bulk styling choices" /> | <img src="docs/screenshots/09-pricing.webp" width="220" alt="One-time illustrative catalogue packs" /> |

1. Tap **Start with a photo** and choose a sample product or upload a photo.
2. Watch the brief product-understanding pop-up, then browse presets and swipe through each preset's catalogue preview.
3. Choose a preset, tick the shots you want and tap **Generate**.
4. Review the before-and-after catalogue selection, then download or share the selected photos.

You can also try **Create many** for one look per product, one look across several products, or multiple looks across several products. The floating voice assistant demonstrates a scripted Hindi/Hinglish request that navigates the screens automatically. The first screen includes an English/Hindi switch for its introductory content and a demo-mode switch.

## What the prototype shows

- **Category-aware journey:** hard-coded sample profiles for kurtis, shoes, handbags and cookware suggest category-specific shot plans and relevant preset families.
- **Catalogue-first browsing:** seven named kurti looks use supplied front, side, close-up, back, sleeve and dimensions photos; sellers preview a set before selecting individual shots.
- **Bulk styling:** one-to-one, many-to-one and many-to-many look assignments with visual relation diagrams and before/after results.
- **Voice walkthrough:** a scripted request for a festive blue-kurti photo visibly selects the product, opens Shaadi Shringar and browses all six photos before reaching shot selection.
- **Illustrative one-time packs:** Trial ₹1 (4 images / 1 catalogue), Starter ₹49 (20 / 5), Growth ₹149 (80 / 20) and Pro ₹549 (320 / 80). Selecting a pack changes the demo's catalogue-at-a-time limit; premium looks are unavailable on Trial. No payment is collected.

## Prototype boundaries

**Offline is the default.** The catalogue flow displays local sample imagery rather than generating a new catalogue, and switching the demo to online does not turn catalogue creation into live generation. Non-kurti previews use illustrative treatments of sample images. The product-understanding profiles, voice actions and fidelity indicators are simulated; they are **not** live category detection, speech recognition or verified product-fidelity checks. Downloads contain the selected demo images, not newly generated edits of an uploaded product.

The repository also contains a separate server-side experimental image-edit endpoint, but the guided catalogue flow does not invoke it. The deck's proposed automated inference, fidelity gate and production integrations are a **vision for further validation**, not capabilities delivered by this prototype.

## Run locally

Requires a current Node.js runtime and [Bun](https://bun.sh/). From a local checkout:

```sh
bun install
bun run dev
```

Open the local address printed by Vite. The default offline walkthrough uses the included sample assets; any experimental image-edit endpoint requires its own server-side gateway configuration.

## Technology

React 19, TypeScript, TanStack Start, Vite and Tailwind CSS. The interface and demo state are local to the app; category profiles live in a deterministic inference module, and sample photos are served as project assets.
