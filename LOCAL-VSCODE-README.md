# Om Nandurkar Portfolio — Self-Contained VS Code Package

This ZIP is complete for local development. The application source, data modules, CSS files, and all 22 portfolio images are included.

## Start it locally

Open this extracted folder in VS Code, then run:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Vite will print a local address, usually `http://localhost:3000`.

The images now live in `client/public/assets/` and the source uses local `/assets/...` paths. It does not depend on `/manus-storage` paths.

## Included checks

- `client/src/data/portfolio.ts` is included.
- `client/src/pages/FieldGuideDiscovery.css` is included.
- 22 original image files are included under `client/public/assets/`.
- The source uses no remaining `/manus-storage/` paths.
