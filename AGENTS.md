<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Product prototype architecture

- Keep screen state local but route photo editing through a server-only image gateway module; this protects the credential and supports streamed HD edits.
- Uploaded preset binaries are served through Lovable Assets pointers; this keeps original HD photos available without growing the source repository.
- Keep the catalogue demo local and default offline; neither mode calls the image gateway for catalogue creation, so testing does not spend credits.
- Category understanding lives in src/lib/category-inference.ts (inferProduct returns a hard-coded ProductInsight); swap it for a real model without touching the UI.
- Catalogue sets are deterministic demo previews from local preset/product imagery; do not present simulated shots or fidelity as verified generation.
