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

## Platform architecture
- Keep all seven primary platform sections as distinct TanStack content routes with shared navigation in the root shell, so each section is directly addressable.
- Keep demonstration datasets browser-safe and explicit; do not represent simulated monitoring as a live connected service.
- Initialize ECharts through a browser-side dynamic import, replace complete options with notMerge, and resize/dispose per container lifecycle to prevent SSR and stale-series errors.
- Define platform appearance through semantic CSS tokens and shared platform widgets so visual changes remain consistent across sections.
