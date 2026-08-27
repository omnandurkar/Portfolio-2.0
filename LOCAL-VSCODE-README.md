# Om Nandurkar Portfolio — Self-Contained VS Code Package

This ZIP is complete for local development. The application source, data modules, CSS files, and all 34 portfolio images are included.

## Start it locally

Open this extracted folder in VS Code, then run:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Vite will print a local address, usually `http://localhost:3000`.

The images now live in `client/public/assets/` and the source uses local `/assets/...` paths. It does not depend on `/manus-storage` paths.

## Put it on GitHub

Create a new empty GitHub repository, open this folder in VS Code, and run:

```bash
git init
git add .
git commit -m "Initial portfolio export"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Deploy with Vercel

In Vercel, choose **Add New → Project**, import the GitHub repository, then deploy. The included `vercel.json` uses `pnpm run build`, publishes `dist/public`, and rewrites direct portfolio routes such as `/work/shopvista` to the application entry point.

You can also deploy from the command line after installing the Vercel CLI:

```bash
pnpm dlx vercel
```

## Included checks

- `client/src/data/portfolio.ts` is included.
- `client/src/pages/FieldGuideDiscovery.css` is included.
- 34 original image files are included under `client/public/assets/`.
- The source uses no remaining `/manus-storage/` paths.
- The export includes a Vercel SPA route fallback.
