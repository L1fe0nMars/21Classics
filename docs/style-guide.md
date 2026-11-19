# 21 Classics Style Guide

The visual rules for 21classics.com. Follow this guide when adding or changing styles, so new work matches the rest of the site without picking values by eye.

## Principles

- **The car is the hero.** Photos are large and uncropped where possible, and the UI around them is quiet: neutral surfaces, one accent color.
- **One accent per context.** Site-wide UI uses `--blue-nav`. On a car page and its cards, the car's own color replaces it through `--car-color`.
- **Soft and rounded.** Large radii, light shadows, no hard borders around content.
- **Same component, same values.** A component looks the same on every page. Sizes may step up at the tablet and PC breakpoints, but each step is shared by every instance.
- **Use the scale.** Every radius, space, font size, and shadow comes from the scales below. If nothing fits, add a step to the scale here first rather than using a one-off value.

## Colors

All colors are CSS custom properties on `:root` in `global-style.css`, written as hex (8-digit hex for transparency, never `rgb()`/`rgba()`). Dark mode overwrites the variables listed in `THEME_COLORS` in `header-footer.js` (index 0 light, 1 dark).

### Neutrals

| Variable | Light | Dark | Use |
| --- | --- | --- | --- |
| `--off-white` | `#f5f5f5` | `#1c1c1c` | Page background, inset panels on cards |
| `--white` | `white` | `#262626` | Card and panel surface |
| `--dark-mode` | `#1c1c1c` | `#f5f5f5` | Main text, headings, outlines |
| `--muted-text` | `#555555` | `#bdbdbd` | Supporting text (`.muted`) |
| `--divider` | `#d4d4d4` | `#3d3d3d` | Rules between list items and footer rows |
| `--off-white-ignore` | `#f5f5f5` | same | Light text or fills that must not flip (on photos, on color fills) |
| `--dark-mode-ignore` | `#1c1c1c` | same | Dark text that must not flip (on light car colors, on white gallery buttons) |

Despite the names, `--white` is the surface color and `--dark-mode` is the text color. Use them by role, not by name.

### Accents

| Variable | Value | Use |
| --- | --- | --- |
| `--blue-nav` | `#4073ff` | Site accent: primary buttons, focus outline, default eyebrow bar |
| `--youtube-red` | `#cc0000` | Anything that links to YouTube |
| `--golden-color` | `#ebae2a` | The "Add your car" section only |

### Car colors

Each car has `--<short-name>-color` on `:root`, applied through `--car-color` (see [Car accent colors](#car-accent-colors)). A car color is used for accents only: the eyebrow bar, buttons, icons, the gallery band, the active thumbnail. Never for body text or large text blocks.

## Typography

Poppins, self-hosted, with Verdana and sans-serif fallbacks. Only three weights are loaded, so use only these: **400** (body), **700** (buttons, labels, card names), **800** (headings).

Font sizes use `rem`, or `clamp()` with `rem` and `vw` for headings. The exceptions are the header (logo text, nav, and mobile menu stay in `px`/`em`, because the header switches layout at a fixed `875px` and must not grow past it) and the base `button` size (`1.25em`, which the theme toggle relies on inside the nav).

### Type scale

| Role | Size | Weight | Line height | Notes |
| --- | --- | --- | --- | --- |
| Display (`#hero-text h1`, `#contact-text h1`) | `clamp(2.75rem, 1.6rem + 4vw, 4.75rem)` | 800 | 1 | `letter-spacing: -0.02em` |
| Section heading (`h1`, `h2`) | `clamp(1.75rem, 1.2rem + 2.5vw, 3rem)` | 800 | 1.1 | Default for `h1`/`h2` |
| Card title (`h2`/`h3` in a panel card) | `clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)` | 800 | 1.15 | `#featured-info h3`, `#video-card h2`, `#youtube-text h2` |
| Card name (`.name`) | `1.25rem` (PC `1.375rem`) | 700 | 1.25 | White on the photo overlay |
| Lead (`.muted`) | `1.0625rem` | 400 | 1.6 | `max-width` about 36em. The hero lead steps `1rem`, `1.125rem`, `1.1875rem`. |
| Body (feature lists, descriptions) | `1rem`, tablet `1.0625rem`, PC `1.125rem` | 400 | 1.4 lists, 1.75 paragraphs | Paragraphs `max-width: 65ch` |
| Eyebrow (`.eyebrow`) | `0.875rem` | 700 | | Uppercase, `letter-spacing: 0.18em` |
| Small (footer bottom) | `0.875rem` | 400 or 700 | | |

Button sizes are under [Buttons](#buttons). Headings use `text-wrap: balance`.

## Spacing

Spacing (padding, margin, gap) is written in `em`, from this scale: `0.25`, `0.5`, `0.75`, `1`, `1.25`, `1.5`, `1.75`, `2`, `2.5`, `3`, `4`, `5`.

`em` is relative to the element's own font size, so `1em` padding on a `20px` button is `20px`, not `16px`. Check the computed value when copying spacing between elements with different text sizes. Button heights and horizontal button padding are the exception: they're in `rem` so every button lines up regardless of its text size.

Common uses:

- **Icon to text** inside a button or link: `0.5em` to `0.625em`
- **Between buttons** in a group: `0.75em`
- **Inside a heading block** (eyebrow, heading, muted text): `0.75em`
- **Between blocks inside a card**: `1.25em`
- **Panel card padding**: `0.75em` mobile, `1em` tablet, `1.25em` PC. Cards with a side-by-side PC layout use `1.25em 3em 1.25em 1.25em`, so the text has room on the right.
- **Text block inside a stacked panel card**: `0.5em 0.5em 1em 0.5em`, so text sits further in than the photo above it
- **Between sections**: `3em` to `5em`

## Shape

### Radius tokens

Defined on `:root` in `global-style.css`. The card and inner radii step up from tablet width (`481px`) in one place, so every card changes together.

| Token | Mobile | Tablet and PC | Use |
| --- | --- | --- | --- |
| `--radius-card` | `24px` | `30px` | Panel cards: `#featured-card`, `#info-card`, `#video-card`, `#youtube-card` |
| `--radius-inner` | `20px` | `24px` | Photos and inset panels inside a panel card: `#featured-photo`, `#youtube-thumb`, `#status-panel` |
| `--radius-control` | `16px` | `16px` | Buttons, `.gallery-btn`, `.carousel-btn`, `.footer-youtube`, `.play-badge` |

### Fixed radii

| Value | Use |
| --- | --- |
| `30px` | Photo cards (`.card`), at every size |
| `20px`, tablet `24px` | The main car gallery photo (`.swiperContainer`) |
| `20px`, tablet `24px`, PC `28px` | Hero and contact photos |
| `24px`, tablet `32px`, PC `40px` | The colored bands behind the hero and contact photos (inner side only) |
| `16px` | The YouTube `iframe`. Kept below `--radius-inner` because a larger radius clips the player's corner controls. |
| `12px` | Thumbnails (`.bottomSwiper`) |
| `10px` | Thumbnail arrows (`.thumb-btn`), sized to the smaller button |
| `4px` | Feature list bullets |
| `2px` or `30px` | Thin bars (eyebrow bar, card name bar, header and footer rules, menu icon bars). Both render as fully rounded ends. |

### Nesting

An element inside a rounded card has a radius 4 to 6px smaller than the card's (`24px` card, `20px` photo; `30px` card, `24px` photo), using `--radius-card` and `--radius-inner`. Don't subtract the full padding: that makes inner corners noticeably sharper than the rest of the site.

## Elevation

| Token | Value | Use |
| --- | --- | --- |
| `--shadow-panel` | `0 2px 7px 0 #14142b0f` | White panel cards on the page background |
| `--shadow-card` | `0 6px 12px -2px #00000040, 0 3px 7px -3px #0000004d` | Photo cards (`.card`) |

No other shadows. Inset panels (`#status-panel`) and buttons have none.

## Motion

- Hover and focus transitions: `0.25s ease-out`.
- Larger movements (mobile menu, theme icon): `0.3s` to `0.5s`.
- Photo hover: the image scales up slightly (`scale(1.04)`) inside its rounded frame.
- `prefers-reduced-motion` is handled globally in `global-style.css`. Don't add motion that only works with transitions on.

## Focus

- Default: `outline: 3px solid var(--blue-nav); outline-offset: 3px` (global `:focus-visible`).
- On photos (gallery and thumbnail buttons): `--off-white-ignore` outline with `2px` offset, so it shows against the image.
- Every hover style also applies on `:focus-visible`.

## Layout

| Breakpoint | Range | CSS comment |
| --- | --- | --- |
| Mobile | `max-width: 480px` | `/* MOBILE */` |
| Tablet | `481px` to `1024px` | `/* TABLETS */` |
| PC | `min-width: 1025px` | `/* PC */` |

- `/* PC + TABLETS */` labels `min-width: 481px` rules shared by both.
- The header switches to the mobile menu at `875px`.
- Content containers: `max-width: 85em`, centered. The hero and contact split layouts are `82em` below PC width.
- Side gutters: `1em` on mobile, `2em` on tablet.
- Car photos are 4:3. Videos and video thumbnails are 16:9.
- Below tablet width, layouts stack to one column. Side-by-side splits (photo beside text, info beside status) start at tablet or PC width.

## Components

### Buttons

Buttons are `<button>` or `a.button`, never a `<button>` inside an `<a>`. All use `--radius-control`, 700 weight, and `0 1.75rem` horizontal padding (`0 1.375rem` when the button has a leading icon and long text).

| Size | `min-height` | Font size | Use |
| --- | --- | --- | --- |
| Compact | `2.75rem` | base (`1.25em`) | Heading row actions (`#collection-btn`, carousel arrows), `.footer-youtube` |
| Standard | `3.5rem` | `1.0625rem` | Card and panel actions: `#featured-btn`, `#youtube-btn`, `#sold-btn`, `#inquiry-buttons` |
| Hero | `3.75rem` | `1.125rem` | `#hero-actions` |
| Contact | `4.5rem` | `1.25rem` | Contact page call and email buttons. The car page `#inquiry-buttons` grow to `4rem` / `1.1875rem` on PC. |

- **Filled:** background `--car-color` (or `--blue-nav`, or `--youtube-red` for YouTube), text `--car-text-color` (default `--off-white-ignore`). Hover: `filter: brightness(0.85)`.
- **Outline:** `2px` border and text in `--car-icon-color` (falling back to `--car-color`, then `--dark-mode` for neutral buttons). Hover fills with the border color and switches the text to `--car-text-color`.
- One filled button per group. A second action is an outline button.

### Icon buttons (arrows)

Every carousel and gallery arrow is a `<button>` with an SVG chevron and an `aria-label`, never Swiper's default `.swiper-button-next`/`-prev` icons. They share `.icon-btn` (`global-style.css`) and add one variant:

- **`.gallery-btn`:** `--off-white-ignore` rounded square on a photo, `2.75rem` (tablet and PC `3.25rem`), `--radius-control`. Main gallery, fullscreen, and modal buttons.
- **`.thumb-btn`:** the same, smaller (`2rem`, `10px` radius), on the thumbnails.
- **`.carousel-btn`:** outlined rounded square in `--car-icon-color`, falling back to `--car-color` and then `--blue-nav`, that fills on hover like an outline button.

Carousel arrows (`#carousel-prev`, `#carousel-next`) sit in the heading row, not on the carousel: `.carousel-actions` holds the two arrows and then `#collection-btn`, and stretches the arrows to the button's height.

Pass the button elements to Swiper's `navigation` option, not class selectors. Swiper's `.swiper-button-disabled` fades a button and `.swiper-button-lock` hides it.

### Eyebrow

A small uppercase label with a short colored bar before it (`.eyebrow`). It labels a heading; it never replaces one. The bar uses `--car-color`, falling back to `--blue-nav`. `.eyebrow.youtube` gives it a YouTube red bar.

The name goes in the heading and the eyebrow only adds context: "The Collection" and "More Cars" are headings, never eyebrow text.

### Section headings

Section titles use `.section-heading`: `.section-heading-text` on the left (a `p.eyebrow`, the `h1`/`h2`, and optional `p.muted`) and the section's actions on the right, bottom-aligned, wrapping below on narrow screens. Used by the home Collection section, The Collection page header, and "More Cars" on car pages. `.carousel-heading` (in `main-swiper.css`) lines a heading row up with the carousel cards below it.

Headings outside a `.section-heading` row (contact page, car page info and video cards) still get an eyebrow above them.

### Photo cards (`.card`)

The car cards in carousels and The Collection grid. The rules exist in both `main-swiper.css` and `the-collection.css` (The Collection page doesn't load `main-swiper.css`), so change both together.

- A full-bleed photo, `30px` radius, `--shadow-card`.
- A dark gradient from the bottom (`#000000c7` to transparent) under a white `.name`, dark in both themes.
- A short accent bar above the name (`.name::before`) in the car's color, which widens on hover and focus.
- Names are `h3` (carousels) or `h2` (The Collection) with `class="name <car-class>"` and `aria-hidden="true"`, since the image `alt` already names the car.

### Panel cards

White content cards: `#featured-card`, `#info-card`, `#video-card`, `#youtube-card`.

- Background `--white`, text `--dark-mode`, `--radius-card`, `--shadow-panel`.
- Padding from [Spacing](#spacing). Photos inside use `--radius-inner`, except the video `iframe` (see [Fixed radii](#fixed-radii)).
- The title uses the card title size.
- An inset panel inside a card (`#status-panel`) uses `--off-white`, `--radius-inner`, and no shadow.

### Feature lists

`ul.feature-list`: each item has a small rounded square bullet (`12px`, `4px` radius) in `--car-color`, a `--divider` rule between items, and `0.75em` vertical padding. A list with 9 or more items splits into two columns from tablet width up.

## Car accent colors

How a car's color reaches its page and cards:

- Each car has a color variable on `:root` in `global-style.css` (`--tiger-color`) and a short class (`tiger`) used on its card name.
- A `.<car-class> { --car-color: ... }` rule exists in both `main-swiper.css` and `the-collection.css` for the card accent bar.
- The card overlay is dark in both themes, so a car whose color is too dark to see on it gets a `--<short-name>-bar-color` variable (its dark-mode color) for its card rule.
- The car's page stylesheet applies its color to `.background-color` (the gallery band), the active thumbnail border, and the "More Cars" swiper navigation, and sets `--car-color` on `#section-2, #section-3` for the eyebrow bars, info card, status panel, and their buttons, including `#collection-btn`.
- That same rule also takes `--car-text-color` (text on `--car-color` fills, default `--off-white-ignore`) and `--car-icon-color` (outline button borders and panel icons, default `--car-color`).
- A light car color (Corvette, Sunliner, Oldsmobile 442, Nova, Jaguar) sets `--car-text-color: var(--dark-mode-ignore)` and `--car-icon-color: var(--dark-mode)`.
- A color that flips between dark and light with the theme (Silver Cloud, '71 442) sets `--car-text-color: var(--off-white)`.
- A car color that is unreadable on the dark background needs an entry in `THEME_COLORS`.

When choosing a new car's color, take it from the car's paint, then check it as a fill behind white text, as an outline on `--white` in both themes, and as the bar on the dark card overlay. Add the overrides above for any check it fails.

## Checklist for style changes

1. Values come from the scales above, or the scale is updated here first.
2. Colors and shadows are `:root` variables, never hard-coded in a rule.
3. A component changed on one page is changed everywhere it appears.
4. Hover styles also apply on `:focus-visible`.
5. Checked in light and dark mode, and at mobile, tablet, and PC widths.
