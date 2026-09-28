import { createFileRoute } from "@tanstack/react-router";
import { editImage, imageSettings } from "@/lib/image-gateway.server";

const looks: Record<string, string> = {
  "Safed Shaan": "a clean bright white catalogue studio, soft even light, crisp fabric texture and an elegant neutral backdrop",
  "Shaadi Shringar": "a festive Indian celebration setting with warm decorative lights and rich joyful colours",
  "Ghoomar Glow": "a graceful editorial fashion photograph with natural flowing movement and warm light",
  "Bazaar Bold": "a vivid contemporary Indian market-inspired fashion campaign with striking contrast",
  "3D Jadoo": "a dimensional premium product display with subtle depth, realistic shadows and studio lighting",
  "Chalte Chalte": "a candid on-the-move lifestyle fashion photograph in a lively Indian street setting",
  "Kaali Raat": "a dramatic dark editorial studio with refined highlights and deep contrast",
};

export const Route = createFileRoute("/api/edit-product-photo")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Photo generation is not configured yet.", { status: 503 });
        const input = await request.formData();
        const photo = input.get("image");
        const reference = input.get("reference");
        const preset = input.get("preset");
        const look = typeof preset === "string" ? looks[preset] : undefined;
        if (!(photo instanceof File) || !(reference instanceof File) || !look ||
            !["image/jpeg", "image/png", "image/webp"].includes(photo.type) ||
            !["image/jpeg", "image/png", "image/webp"].includes(reference.type) ||
            photo.size === 0 || reference.size === 0 || photo.size > 15_000_000 || reference.size > 15_000_000) {
          return new Response("Choose a JPG, PNG or WebP photo under 15 MB and a valid preset.", { status: 400 });
        }
        const form = new FormData();
        form.append("image[]", photo, "product." + photo.type.split("/")[1]);
        form.append("image[]", reference, "preset." + reference.type.split("/")[1]);
        form.set("prompt", `Create one photorealistic high-definition product image. Image 1 is the seller's actual product: preserve its exact garment, colour, pattern, stitching, shape, branding and other identifiable details. Image 2 is a visual style reference only: borrow its composition, background, lighting and overall presentation, but never copy its garment or replace the seller's product. Apply this look: ${look}. Keep the product prominent and clearly visible, with believable textures and no added text, logo, watermark or extra product.`);
        form.set("size", "1024x1536");
        form.set("quality", "high");
        form.set("stream", input.get("stream") === "false" ? "false" : "true");
        const upstream = await editImage({ ...imageSettings, apiKey }, form);
        return new Response(upstream.body, {
          status: upstream.status,
          headers: {
            "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
            "Cache-Control": "no-store",
            ...Object.fromEntries([...upstream.headers].filter(([key]) => key.toLowerCase().startsWith("x-lovable-aig-"))),
          },
        });
      },
    },
  },
});