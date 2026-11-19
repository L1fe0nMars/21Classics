# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

21 Classics (`21classics.com`) is a collector car showcase website. The home page has a hero, a carousel of cars in The Collection, and a Featured Car section. The Collection page is a grid of every car, each car has its own static page with a photo gallery, a YouTube video (if there is one), a list of features, and contact details for inquiries, and the Contact page lists the owner's and developer's contact info and socials. A light/dark theme toggle is stored in the browser.

## Technology Baseline

These are authoritative for this repository:

- **Runtime:** Plain HTML, CSS, and vanilla JavaScript as classic scripts (`<script src>`, not modules), each starting with `'use strict';`. No framework, no TypeScript.
- **Tooling:** None. There is no `package.json`, build step, bundler, linter, or test suite.
- **Third-party library:** Swiper 10, loaded from jsDelivr (`swiper@10/swiper-bundle.min.css` and `.js`) on pages that use carousels. It is the only dependency.
- **State:** The only persisted state is the theme preference in `localStorage`.
- **Navigation:** Separate static HTML pages. No router. Pages live under `/src/pages/` and are linked with root-absolute `.html` URLs (`/src/pages/the-collection.html`). Links to the home page use `/`, never `/index.html`.
- **Styling:** Plain CSS with CSS custom properties for colors. Shared styles are pulled in through `@import` in `header-footer.css`. Font is self-hosted Poppins (`fonts/Poppins/`) with Verdana and sans-serif fallbacks.
- **Analytics:** Google Analytics (gtag.js, `G-2DFKNJYLV0`) on every page
- **Hosting:** Netlify, with deploy previews.

Do not add a framework, build tool, package manager, or third-party library without explicit approval. When unsure how to implement something or whether an API is supported, check MDN (or the Swiper 10 docs for carousel options) rather than relying on recalled knowledge.

## Engineering Authority

When deciding how code should be written, use this order. A higher source wins when sources conflict:

1. Explicit user requirements
2. Security requirements
3. Established patterns in the existing codebase
4. MDN and web platform documentation (Swiper docs for Swiper)
5. General JavaScript and CSS best practices

Do not replace an established project pattern with a different one (for example, adding a framework, a templating or build step, or a CSS preprocessor) unless the change is justified and approved.

## Build and Run Commands

```bash
# Serve the site locally (http://localhost:8000)
python -m http.server 8000
```

Pages load their assets with root-absolute paths (`/src/css/...`, `/images/...`), so they must be served over HTTP from the repo root. Opening a file directly in a browser will not load styles or images. Any static server works.

There are no tests or lint commands. Check changes by loading the affected pages, in both light and dark mode and at mobile, tablet, and desktop widths.

## Architecture

### Project Structure

- **index.html** - Home page: hero (`#section-1`), The Collection carousel (`#section-2`), a commented-out "Add your car" section (`#section-3`), and the Featured Car (`#section-4`)
- **src/pages/the-collection.html** - Grid of every car (`ul#car-gallery` of `li.card`). Sold cars are listed with `class="card sold hidden"`. The Collection / Sold Cars tabs (`#sort-options`) are commented out, so sold cars are currently hidden.
- **src/pages/contact.html** - Split card with a photo beside the inquiry panel ("For Inquiries" eyebrow, `h1`, call and email buttons, location) in `#section-1`, and a YouTube banner ("Socials" `.eyebrow.youtube` and `h2`) in `#section-2`
- **src/pages/cars/<year>-<make>-<model>.html** - One static page per car, available and sold alike. A car keeps the same URL when it sells.
- **src/js/header-footer.js** - Loaded on every page: mobile menu, light/dark theme toggle, and the footer year. Defines the shared `ROOT` and `BODY` constants that `car-page.js` also uses, so it must load before `car-page.js`.
- **src/js/main-swiper.js** - The card carousel (`.slide-content`, with `#carousel-prev`/`#carousel-next`) used on the home page and the "More Cars" section of car pages
- **src/js/car-page.js** - Car page gallery: main swiper (`.swiperContainer`, with `#gallery-prev`/`#gallery-next` arrows), thumbnail swiper (`.bottomSwiper`, with `#thumb-prev`/`#thumb-next`), and the full-screen image modal (`#modal`, `.modalSwiper` with pinch and double-tap zoom and `#modal-prev`/`#modal-next` arrows, opened by clicking the photo or `#gallery-fullscreen`, closed with `#close` or Escape)
- **src/js/the-collection.js** - Sold/unsold tab filtering by toggling `.hidden` on `.card` elements. Not currently loaded because the tabs are commented out.
- **src/css/global-style.css** - Color variables on `:root`, `@font-face` rules, resets, base `button`/`.button` styles, heading sizes, `.eyebrow` (and `.eyebrow.youtube`), and the `.section-heading` row
- **src/css/header-footer.css** - Imports `global-style.css`; header, desktop nav, mobile menu, theme toggle, and footer. Every page links this first.
- **src/css/main-swiper.css** - Card carousel styles, including the per-car `.card:hover .<car-class>` name colors
- **src/css/pages/*.css** - One stylesheet per page type (`home`, `the-collection`, `contact`, `car-page`, and an unused `add-your-car`)
- **src/css/pages/cars/<short-name>.css** - Per-car accent color overrides for car pages
- **_redirects** - Netlify 301 redirects from the old `/src/pages/cars/sold/` URLs to the current car pages
- **images/<yy>-<short-name>/** - Photos for each car. `cover.jpg` is the card and first gallery image; others are named by view (`front-angle`, `rear-angle`, `side`, `interior`, `engine`, `dash`, ...) with a number suffix for extras (`interior1.jpg`). Also `images/logo.png` (logo and favicon), `images/cover-pic.webp` (home hero), and `images/collections/`.
- **fonts/Poppins/** - Self-hosted Poppins font files and license

### Key Architectural Patterns

**Static, duplicated markup:**
- Every page repeats the same `<head>` boilerplate, header (logo, `#mobile-menu`, `#mobile-menu-open`, and `#desktop-nav`, with the nav and theme toggle duplicated for mobile and desktop), footer, and Google Analytics snippet. Keep them identical across pages when changing one.
- The nav link for the current page gets `class="active"` in both the mobile and desktop nav.
- Car cards are hand-written HTML in three places: the home carousel, The Collection grid, and the "More Cars" carousel on each car page (which lists the other available cars). Car names in cards are `h3` (carousels) or `h2` (The Collection) with `class="name <car-class>"` and `aria-hidden="true"`, since the image `alt` already names the car.

**Section headings:**
- Section titles use `.section-heading`: `.section-heading-text` on the left (a `p.eyebrow`, the `h1`/`h2`, and optional `p.muted`) and the section's actions on the right, bottom-aligned, wrapping below on narrow screens. Used by the home Collection section, The Collection page header, and "More Cars" on car pages.
- The name goes in the heading and the eyebrow only adds context: "The Collection" and "More Cars" are the headings, never the eyebrow text.
- The eyebrow bar uses `--car-color`, falling back to `--blue-nav`. `.carousel-heading` (in `main-swiper.css`) lines a heading row up with the carousel cards below it.
- The eyebrow also labels headings outside a `.section-heading` row (the contact page, the car page info and video cards). `.eyebrow.youtube` gives it a YouTube red bar.

**Car accent colors:**
- Each car has a color variable on `:root` in `global-style.css` (`--tiger-color`) and a short class (`tiger`) used on its card name.
- Cards are a full-bleed photo with a dark gradient and a white name. A short accent bar above the name (`.name::before`) takes the car's color through a `.<car-class> { --car-color: ... }` rule, which exists in both `main-swiper.css` and `the-collection.css`. The bar widens on hover and focus.
- The card overlay is dark in both themes, so a car whose color is too dark to see on it gets a `--<short-name>-bar-color` variable in `global-style.css` (its dark-mode color) for its card rule.
- The car's page stylesheet applies its color to `.background-color` (the gallery band), the active thumbnail border, and the "More Cars" swiper navigation, and sets `--car-color` on `#section-2, #section-3` for the eyebrow bars, info card, status panel, and their buttons, including the "More Cars" `#collection-btn`.
- That same rule also takes `--car-text-color` (text on `--car-color` fills, default `--off-white-ignore`) and `--car-icon-color` (email button outline and panel icons, default `--car-color`). A light car color (Corvette, Sunliner, Oldsmobile 442, Nova, Jaguar) sets `--car-text-color: var(--dark-mode-ignore)` and `--car-icon-color: var(--dark-mode)`. A color that flips between dark and light with the theme (Silver Cloud, '71 442) sets `--car-text-color: var(--off-white)`.
- Dark mode works by overwriting `:root` variables from `THEME_COLORS` in `header-footer.js` (index 0 is light, 1 is dark). A car color that is unreadable on the dark background needs an entry there.

**Arrow buttons:**
- Every carousel and gallery arrow is a `<button>` with an SVG chevron and an `aria-label`, never Swiper's default `.swiper-button-next`/`-prev` icons. They share `.icon-btn` (`global-style.css`) and add one variant: `.gallery-btn` (white rounded square on a photo: the main gallery, fullscreen, and modal buttons), `.thumb-btn` (smaller square on the thumbnails), or `.carousel-btn` (outlined rounded square in `--car-icon-color`, falling back to `--car-color` and then `--blue-nav`, that fills on hover like `#email-btn`).
- Carousel arrows (`#carousel-prev`, `#carousel-next`) sit in the heading row, not on the carousel: `.carousel-actions` holds the two arrows and then `#collection-btn`, and stretches the arrows to the button's height.
- Pass the button elements to Swiper's `navigation` option, not class selectors. Swiper's `.swiper-button-disabled` fades a button and `.swiper-button-lock` hides it.

**Theme:**
- `localStorage` key `darkMode` is `'enabled'` or `'disabled'`. With no stored value, `detectTheme` follows `prefers-color-scheme`.
- `toggleDarkMode(toggled)` sets every `THEME_COLORS` variable and swaps the sun and moon icons with inline transforms.

**Car pages:**
- Copy an existing car page and its stylesheet as the template (`1965-sunbeam-tiger.html` for available cars, `1949-cadillac-convertible.html` for sold cars).
- `<head>`: meta description listing the car's features, a `preload` for the cover image, then `header-footer.css`, `main-swiper.css`, `car-page.css`, the car's stylesheet, and the Swiper CSS. Title format: `<Year Make Model> | 21 Classics`.
- `#section-1`: the gallery. `#gallery-band.background-color` (the colored band behind the middle of the photo), then `#gallery-main` (`.swiperContainer` with a `.main-img` per slide, and the `#gallery-prev`, `#gallery-next`, and `#gallery-fullscreen` buttons), then the `.bottomSwiper` thumbnails (with `#thumb-prev` and `#thumb-next`), all in `.container`, with `#modal` after it (the `#close`, `#modal-prev`, and `#modal-next` buttons, then `.modalSwiper`, whose images are each wrapped in a `.swiper-zoom-container` for zooming). The same image list appears three times, in order: `.swiperContainer`, `.bottomSwiper`, and `.modalSwiper`. Keep all three in sync. Only the first main image is not lazy-loaded.
- The main photo is sized from the screen height (`--gallery-reserve` in `car-page.css` is the room left for the header, thumbnails, and gaps) so the photo and thumbnails fit on the first screen, and is kept 4:3, the shape of the photos. Photos of another shape are cropped to fill it, so add new photos as 4:3.
- `#section-2`: `#car-title` (a `.section-heading-text` with an "Available" or "Sold" `.eyebrow` and the `h1` car name, the width of `#info-card`), then `#info-card` and `#video-card`.
- `#info-card` holds `#info-details` (a "Details" `.eyebrow`, then an `h2` "Features" with `ul.feature-list`, or "About this car" with `p.description`) and `#status-panel`. The features or description match the meta description. A list with 9 or more items splits into two columns from tablet width up.
- `#status-panel` on available pages: "For Inquiries" eyebrow, `h2`, `.muted` text naming the car, `#inquiry-buttons` (`#call-btn`, `#email-btn`), and `.location`. On sold pages: "Sold" eyebrow, `h2`, `.muted` text, and `#sold-btn` linking to The Collection.
- `#video-card`: the YouTube `iframe` in `#video-embed`, and `#video-text` with a `.eyebrow.youtube`, `h2`, `.muted` text, and `#youtube-btn` linking to that video on YouTube. Omit `#video-card` from the markup when the car has no video; don't hide it with CSS.
- `#section-3`: a `.section-heading.carousel-heading` ("The Collection" eyebrow, `h2` "More Cars", and `.carousel-actions` with `#collection-btn` back to The Collection and the carousel arrows), then the "More Cars" carousel.
- Scripts at the end of `<body>`: Swiper JS, `header-footer.js`, `car-page.js`, `main-swiper.js`.

**Checklist when adding a car:**
1. Add photos to `images/<yy>-<short-name>/` with a `cover.jpg`
2. Add `--<short-name>-color` to `:root` in `global-style.css` (and to `THEME_COLORS` if it needs a dark-mode value, plus `--<short-name>-bar-color` if it's too dark for the card overlay)
3. Add a `.<short-name> { --car-color: ... }` rule to `main-swiper.css` and `the-collection.css`
4. Create the page in `src/pages/cars/` and its stylesheet in `src/css/pages/cars/` from the template
5. Add a card to The Collection grid, the home carousel (available cars), and the "More Cars" carousel on the other available car pages
6. When marking a car as sold, keep its page and stylesheet where they are (the URL must not change): change the `#car-title` eyebrow to "Sold", replace the inquiry content of `#status-panel` with the sold content (copy it from a sold page), change its card in The Collection to `class="card sold hidden"` and move it to the sold cards, and remove it from the home and "More Cars" carousels

### Known Inconsistencies

These exist in the current code. Fix them only when asked or when touching the same lines:

- Pages have no canonical URL, Open Graph tags, structured data, `robots.txt`, or `sitemap.xml`.

## Collaboration Rules

- **Always propose changes and get explicit user approval before making any edits to files.** Present the full plan (what files will change and how), then wait for confirmation before calling any agent or editing any file.
- Use subagents for isolated or parallel work (security passes, audits, research spanning several areas). Handle small, focused edits directly.
- When spawning agents, delegate research/planning separately from implementation, and only invoke an implementation agent after the user has approved the plan.
- Approval is gated by the main session only. A subagent given an approved task implements it directly without asking for its own confirmation. If it finds necessary work outside that scope (new dependencies, new architectural patterns, changes to URLs of existing pages), it stops and reports back instead of doing it.
- Keep explanations clear and concise. Lead with the answer, use plain language, and skip preamble and restatements of the request.
- Do not use em dashes in responses, code comments, commit messages, or documentation. Use a hyphen (-), comma, colon, parentheses, or a separate sentence instead.

## Code Conventions

- Classic scripts with `'use strict';` at the top. No `import`/`export`.
- Named `function` declarations for top-level functions; arrow functions for event listener callbacks
- JSDoc block above each named function (description, `@param {type} name`, `@return {type}`)
- 4-space indentation, semicolons, single quotes in JS
- `else` and `else if` start on a new line after the closing brace. Long conditions are split across lines with the operator (`&&`, `||`) leading each continuation line.
- DOM elements and other constants looked up once at the top of the file in `UPPER_SNAKE_CASE`; variables and functions in `camelCase`
- Element IDs and CSS class names in `kebab-case` (Swiper's own class names such as `swiperContainer` and `bottomSwiper` are the exception)
- Use CSS custom properties from `:root` for colors rather than hard-coded values. Write colors as hex, not `rgb()`.
- CSS media query comments label the breakpoints: `/* MOBILE */` (`max-width: 480px`), `/* TABLETS */` (`481px` to `1024px`), `/* PC */` (`min-width: 1025px`). The mobile menu switches at `875px`.
- Images: `decoding="async"`, `loading="lazy"` for anything below the fold, descriptive `alt`, and `draggable="false"` on logos and decorative links. Preload the above-the-fold image.
- External links use `target="_blank"` with `rel="noopener"`. Add `noreferrer` only when the destination shouldn't know the visitor came from 21 Classics. Don't put `<button>` elements inside `<a>`; style the link with `.button` instead.
- One `h1` per page with headings in order.
- Commit messages: capitalized past-tense verb prefix (Added, Fixed, Updated, Removed, Changed). Multiple changes in one commit are separated by commas or semicolons.
- Comments: use for non-obvious logic (hidden constraints, workarounds, or behavior that would surprise a reader). Don't explain what the code does; well-named identifiers do that.
- No vertical alignment: do not pad spaces to align `=`, `:`, object keys, or anything else across lines.

## Data and Persistence

- The only persisted state is `localStorage` key `darkMode` (`'enabled'` or `'disabled'`), read and written only in `header-footer.js`.
- Renaming or moving a page changes its public URL and breaks links and search results. Treat URL changes as needing approval.

## Simplicity and Efficiency

- Before adding a function, check `header-footer.js` and `car-page.js` for an existing one and reuse it.
- When the same multi-line logic appears in two places, extract it into a shared function. Don't extract one-liners.
- Keep car-specific styling in that car's stylesheet and its `:root` color variable rather than adding car-specific rules to shared stylesheets (the card `--car-color` rules are the exception).

## Configuration

- The Google Analytics measurement ID is in the gtag snippet on every page.
- Contact details (email and phone) are hard-coded in the footer of every page, on the contact page, and in `#inquiry-buttons` on each available car page.
- Swiper options (slides per view, breakpoints, looping) are set in `main-swiper.js` and `car-page.js`.
