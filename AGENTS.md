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

- The first release is intentionally frontend-only, with demo product assets and local screen state; this keeps the requested prototype clickable without adding integrations before the product flow is validated.
- Uploaded preset binaries are served through Lovable Assets pointers; this keeps original HD photos available without growing the source repository.
