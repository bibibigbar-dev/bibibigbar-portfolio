# BIBIBIGBAR — Creative Portfolio

BIBIBIGBAR's creative portfolio with dynamic typography and colorful animations,
inspired by [Daniel Spatzek](https://www.spatzek.com/)'s bold typographic style.

## Tech Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for a vibrant, colorful design system
- **Framer Motion** + **GSAP** (ScrollTrigger) for smooth, scroll-driven animations
- **Vercel Analytics**
- Static export (`next export`), deployed to **GitHub Pages**

## Content

All copy and project data are sample/placeholder values in [`data/content.ts`](./data/content.ts).
Update that file to replace it with real content later — no database required.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build & Static Export

```bash
npm run build
```

This produces a static site in the `out/` directory (via `output: "export"` in
`next.config.mjs`), ready to be hosted on GitHub Pages.

## Deployment

Pushing to `main` triggers the `.github/workflows/deploy.yml` GitHub Actions
workflow, which builds the site and publishes the `out/` directory to GitHub
Pages. Make sure GitHub Pages is set to the "GitHub Actions" source in the
repository settings.
