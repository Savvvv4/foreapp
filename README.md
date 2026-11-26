# Fore! app prototype

Clickable prototype of the Fore! golf app. A static site: Vercel serves `dist/` with no build step.

- `src/` holds the page and JS, in the order they are joined (`1.html`, then `2.js` to `10.js`). `10.js` is swing review v2: synced voice-over analysis, optional coach demo, per-review pricing.
- `host/` holds what only the hosted iPhone version needs: head tags, full-screen styles, update check, icons, manifest.
- `./build.sh` rebuilds `dist/`. Commit `dist/` too, because Vercel does not build it.

The previous Figma Make prototype is in git history at commit f448458.
