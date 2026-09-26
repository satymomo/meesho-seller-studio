# Simplify Seller Studio preview flow

## Changes
- Replace step 2's creation-type choices with large, image-led style previews using the selected product.
- Make style selection immediately update the main preview, like choosing a familiar photo filter.
- Replace Generate with Proceed and move directly to the final screen, removing the separate loading/results step from the main journey.
- Update step 4 to compare the original product photo and selected enhanced preview side by side.
- Keep Product Match, retry, style switching, and sharing/catalogue actions available in the streamlined flow.

## Technical details
- Keep the prototype frontend-only and reuse the existing demo product assets.
- Preserve the current mobile layout, local state, voice control, and bulk-create flow.
- Verify the updated journey at a 390px mobile viewport and confirm a clean build.
