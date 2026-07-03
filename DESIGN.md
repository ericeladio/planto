# Planto Design System

> Dark forest-inspired theme for an indoor plants & botanical shop.

## Stack

- React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Vite 8
- Font: **Inter** (`font-[Inter,sans-serif]`)

---

## Colors

### Core Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0d1a0d` | Page background, cart panel, solid buttons text |
| `--surface` | `#1a3a1a` | Dropdown menus, overlays |
| `--card` | `#1e2e1a` | Review cards |
| `--accent` | `#55B000` | Brand green, success states, gradients, badges |
| `--accent-dark` | `#50790B` | Gradient end stop in decorative SVGs |

### White Opacity Scale

Used for text, borders, and surfaces. No other colors — hierarchy is created through opacity.

| Opacity | Role |
|---|---|
| `white` | Primary text, interactive borders, solid buttons |
| `white/75` | Secondary text, body copy |
| `white/60` | Tertiary text, labels |
| `white/50` | Muted text, disabled states |
| `white/40` | Placeholders, dates |
| `white/27` | ProductPill card borders |
| `white/20` | Standard input/card borders |
| `white/12` | Footer border, dividers |
| `white/10` | Light borders, hover backgrounds |
| `white/8` | Ghost button hover |
| `white/5` | Card/surface backgrounds, skeleton base |
| `white/3` | Inner glow on ProductPill |

### Semantic

| Color | Role |
|---|---|
| `#FFF84E` | Star rating fill |
| `red-400` | Errors |
| `red-400/10` | Error background |
| `black/50` | Modal overlay |

---

## Typography

### Responsive (clamp-based)

| Pattern | Use |
|---|---|
| `clamp(52px, 7.5vw, 118px)` | Hero heading |
| `clamp(32px, 3.4vw, 55px)` | Section headings |
| `clamp(28px, 3vw, 48px)` | Page h1 |
| `clamp(22px, 2.4vw, 38px)` | Card titles, prices |
| `clamp(20px, 1.8vw, 28px)` | Footer headings |
| `clamp(16px, 1.4vw, 24px)` | Body text, nav links |
| `clamp(14px, 1.2vw, 20px)` | Card descriptions |
| `clamp(13px, 1.1vw, 20px)` | Small descriptions |

### Fixed

| Class | Use |
|---|---|
| `text-3xl` | Auth page headings |
| `text-2xl` | Navbar brand, cart heading |
| `text-base` | Body, form buttons |
| `text-sm` | Labels, errors, meta |
| `text-xs` | Badges, field errors |

### Weights

| Class | Use |
|---|---|
| `font-black` | Brand "Planto." |
| `font-extrabold` | Footer headings |
| `font-bold` | Reviewer names, button text, totals |
| `font-semibold` | Page headings, form buttons, product names |
| `font-medium` | Nav links, body, descriptions |
| `font-normal` | Card descriptions, hero text |

---

## Spacing

### Page Padding
- Desktop: `px-[7.5vw]`
- Mobile: `max-sm:px-5`

### Page Offset (below fixed navbar)
- `pt-[150px] max-sm:pt-[120px]`

### Common Gaps

| Gap | Use |
|---|---|
| `gap-2` | Form fields, carousel dots |
| `gap-3` / `gap-3.5` | Card inner content |
| `gap-4` | Cart items, pagination |
| `gap-5` | Section headers, form fields |
| `gap-7` | Review cards |
| `gap-8` | Hero CTA buttons |
| `gap-10` / `gap-14` | Section spacing |

---

## Border Radius

| Value | Use |
|---|---|
| `rounded-[151px]` | ProductPill (desktop) — pill shape |
| `rounded-[92px]` | BestO2Section carousel |
| `rounded-[40px]` | Plant cards, review cards, ProductPill (mobile) |
| `rounded-3xl` (24px) | Auth forms, market/blog cards |
| `rounded-2xl` (16px) | Cart items |
| `rounded-xl` (12px) | Buttons, inputs, messages |
| `rounded-lg` (8px) | Newsletter form, pagination |
| `rounded-full` | Avatars, badges, spinner |

---

## Components

### Glass Card Recipe
```html
<div class="bg-white/5 border border-white/10 backdrop-blur-[12px] rounded-3xl">
```

Used on: auth forms, market cards, blog cards, plant detail, navbar (scrolled).

### ProductPill Glass
```html
<div class="bg-white/5 border-2 border-white/27 backdrop-blur-[20px] rounded-[151px]">
```

### Input Field
```html
<input class="h-12 px-4 rounded-xl bg-white/5 border border-white/20
  text-white placeholder-white/40 outline-none
  focus:border-white/40 transition-colors font-[inherit]" />
```

### Primary Button (Solid)
```html
<button class="bg-white text-[#0d1a0d] font-semibold rounded-xl
  border-none hover:opacity-90 transition-opacity" />
```

### Ghost Button (Outline)
```html
<button class="border-2 border-white rounded-xl bg-transparent text-white
  transition-[background] hover:bg-white/8" />
```

### Add-to-Bag Button
```html
<button class="border-2 border-white/75 rounded-xl bg-transparent
  transition-[background] hover:bg-white/10" />
```

### Cart Quantity Buttons
```html
<button class="w-8 h-8 rounded-lg border border-white/20 bg-transparent
  text-white text-lg hover:bg-white/10 transition-colors" />
```

### Review Card
```html
<div class="bg-[#1e2e1a] rounded-[40px] p-[clamp(24px,3vw,44px)]">
  <div class="w-[72px] h-[72px] rounded-full border-2 border-white/20" />
</div>
```

---

## Responsive Breakpoints

| Pattern | Example |
|---|---|
| `max-sm:*` | Mobile overrides (< 640px) |
| `max-lg:*` | Tablet overrides (< 1024px) |
| `sm:*` | Mobile-first min-width (640px) |
| `lg:*` | Desktop min-width (1024px) |

### Common Grid Patterns
- `grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1` — card grids
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — market page
- `grid-cols-[1fr_1fr_1.4fr] max-lg:grid-cols-1` — footer

### Common Responsive Changes
- Padding: `px-[7.5vw] max-sm:px-5`
- Card shape: `rounded-[151px] max-lg:rounded-[40px]`
- Flex direction: `flex max-lg:flex-col`
- Font size: `text-[clamp(32px,3.4vw,55px)] max-sm:text-[28px]`

---

## Transitions

| Pattern | Duration | Use |
|---|---|---|
| `transition-all duration-300` | 300ms | Navbar scroll, card hover |
| `transition-transform duration-300 ease-out` | 300ms | Cart panel slide |
| `transition-transform duration-500` | 500ms | Image scale on hover |
| `transition-opacity` | default | Button/icon hover |
| `transition-colors` | default | Links, inputs, pagination |

### Hover Effects
- Cards: `hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`
- Images: `group-hover:scale-110`
- Buttons: `hover:opacity-90` (solid) / `hover:bg-white/8` (ghost)

---

## Decorative SVG Gradients

Used in section header corner brackets:

```svg
<stop offset="0%"   stop-color="#55B000" />
<stop offset="50%"  stop-color="white" stop-opacity="0.16" />
<stop offset="100%" stop-color="#50790B" />
```

---

## Ambient Glow Effects

ProductPill pseudo-elements:

```
tree:  radial-gradient(ellipse 60% 80%, rgba(30,80,20,0.6), transparent 70%) blur-[40px]
glow:  radial-gradient(ellipse 50% 90%, rgba(60,160,40,0.45), rgba(30,80,20,0.2) 50%, transparent 80%) blur-[48px]
```

---

## Loading States

All data sections have skeleton components using:
```html
<div class="bg-white/5 border border-white/10 rounded-[40px] animate-pulse" />
```

Skeletons: `PlantCardSkeleton`, `ProductPillSkeleton`, `ReviewCardSkeleton`, `GlassCardSkeleton`.

---

## Brand

- **Name**: Planto
- **Tagline**: "Where leaves whisper and roots take hold"
- **Domain**: planto.com
- **Currency**: Rs.
- **Auth token**: `planto_token`
