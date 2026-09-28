# Category inference layer + similar presets (demo-only)

Everything below is hard-coded for the demo. No live AI calls are added; offline mode stays the default.

## 1. "Understanding your product" step (new, between photo pick and presets)
After a seller picks a photo, a short animated card appears (about 2 seconds) that "reads" the product and shows:
- Detected SKU, category and subcategory (e.g. Women Ethnic > Kurtis > Anarkali)
- Informed overview: fabric, colour, price band, key details a buyer needs to see
- Shot plan chips: what this catalogue must show (e.g. Front, Side, Embroidery detail, Flare, Lifestyle)
- "Recommended looks" that the next screen then shows first

## 2. More demo categories
Add sample products beyond kurtis so the scaling story is visible: Shoes, Handbag, Cookware (plus existing kurtis). Each has a hard-coded profile:

```text
Kurti     -> front, side, embroidery detail, flare, lifestyle
Shoes     -> front, side, sole, on-foot, close-up
Handbag   -> front, inside, hardware close-up, scale-on-person, lifestyle
Cookware  -> front, size reference, interior, in-use, feature close-up
```
Presets are grouped into preset families per category (e.g. Studio, Lifestyle, Festive, Detail). Non-kurti samples use illustrative images I generate for the demo.

## 3. Canva-style "Similar looks"
When a preset is tapped, a "More like this" row slides in under it with variations:
- Simpler background
- Daytime / Night-time
- Warmer / Festive light
Tapping a variation updates the preview (demo uses the same sample with a visual treatment and label).

## 4. Final screen shows the shot plan
Step 4 shows a small "Catalogue set" strip with the planned shots ticked, plus a "Fidelity checked" badge (colour, pattern, shape, policy) — all mocked.

## 5. "How it scales" architecture
- In-app: a new "How it scales" section on the start screen (below How it works) with the vertical flow:
  SKU image + Meesho metadata -> Category understanding -> What must this catalogue communicate? -> Category shot plan -> Preset families -> Generation -> Fidelity check -> Complete catalogue, with the four category examples.
- Deck: a ready-to-drop architecture slide (PowerPoint, one slide in Meesho colours) saved to your Files.

## Technical details
- New local module with a `categoryProfiles` map (category, subcategory, attributes, shotPlan, presetFamilies, variations) and a `inferProduct(product)` function that returns a deterministic profile keyed by the demo product id — the swap-in point for a real model later.
- New screen state `understanding` in `src/routes/index.tsx`; bulk flow also shows the detected category per product.
- Variations are CSS filter/overlay treatments on existing preset images; no gateway calls.
- New product images via image generation into `src/assets`.
- Slide built with python-pptx into /mnt/documents.
- Verify at 390px with Playwright; update roadmap.md and AGENTS.md (inference layer rule).
