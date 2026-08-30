# The Game Observer

The Game Observer is a global football analysis publication focused on tactical, technical and analytical insight. Coverage spans match analysis, tactical topics, competitions, teams and players from across world football.

This repository contains the source code for the site. It is built with [Next.js](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/), and [Contentlayer](https://www.contentlayer.dev/) for MDX content.

## Site Sections

- `/` — homepage with featured analysis and discovery links
- `/blog` — analysis articles (shown as "Analysis" in the navigation)
- `/competitions`, `/teams`, `/players`, `/tactical-topics` — taxonomy pages generated from article frontmatter
- `/tags` — tag pages generated from article tags
- `/about` — about page
- `/api/newsletter` — newsletter signup endpoint (the newsletter form is currently disabled)

## Getting Started

Install dependencies (Yarn 3, see `packageManager` in `package.json`):

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Edit pages in `app/` and content in `data/` — pages auto-update as you edit them.

## Available Scripts

- `yarn dev` — start the development server
- `yarn build` — production build; also regenerates the search index (`public/search.json`), the tag counts (`app/tag-data.json`), and the RSS feed
- `yarn serve` — serve the production build
- `yarn lint` — run ESLint
- `yarn analyze` — run a production build with the bundle analyzer enabled

## Project Structure

- `app/` — routes: home, blog, competitions, teams, players, tactical-topics, tags, about, and the newsletter API
- `components/` — UI components (header, navigation, cards, article components, metadata display)
- `layouts/` — page and post layouts
- `data/` — site configuration and content:
  - `siteMetadata.js` — site-wide configuration (URL, analytics, search, newsletter, comments)
  - `headerNavLinks.ts` — header navigation links
  - `categoriesData.ts` — homepage discovery cards
  - `authors/` — author profiles
  - `blog/` — articles (MDX)
- `public/static/` — images and favicons
- `css/` — Tailwind stylesheet and code-block highlighting styles
- `contentlayer.config.ts` — content schema, MDX plugins, search index and tag count generation
- `next.config.js` — Next.js configuration, security headers, and image settings
- `scripts/` — RSS generation and post-build tasks

## Writing Articles

Articles are MDX files in `data/blog`. Frontmatter follows the schema defined in `contentlayer.config.ts`. Core fields:

```
title (required)
date (required)
tags (optional)
lastmod (optional)
draft (optional)
summary (optional)
images (optional)
authors (optional; corresponds to files in `data/authors`, uses `default` if omitted)
featured (optional)
layout (optional)
canonicalUrl (optional)
bibliography (optional)
```

Football metadata fields (all optional) power the match hero, the article metadata cards, and the taxonomy pages:

```
category
competition
season
stage
homeTeam
awayTeam
score
formations
managerHome
managerAway
players
tacticalTopics
analysisType
```

A new article automatically appears in `/blog` and in search; taxonomy pages (competitions, teams, players, tactical topics, tags) are derived from its frontmatter.

## Site Configuration

`data/siteMetadata.js` contains the site-wide settings: title, description, `siteUrl`, analytics providers, search, newsletter, and comments. Newsletter and comments are intentionally disabled for V1 — see the comments in that file for how to enable them.

Other configuration:

- `data/headerNavLinks.ts` — header navigation links
- `data/categoriesData.ts` — homepage "Explore Football" discovery cards
- `next.config.js` — Content Security Policy and security headers; update the CSP if you add external services

## Deployment

### GitHub Pages

A `pages.yml` workflow is provided in `.github/workflows`. Select "GitHub Actions" in: Settings > Pages > Build and deployment > Source.

### Vercel

Deploy the repository on [Vercel](https://vercel.com). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Static export

```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
```

Deploy the generated `out` folder. With a URL base path, add `BASE_PATH=/myblog` to the build command.

## License

[MIT](./LICENSE). Built on the open-source [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template.
