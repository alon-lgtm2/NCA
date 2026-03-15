# NCA – Netherlands Catchball Association

Official website for the **Netherlands Catchball Association (NCA)**, the governing body for women's catchball in the Netherlands. Founded December 2019. KVK: 96604751.

## Live URLs

| Environment | Branch    | Host    | URL |
|-------------|-----------|---------|-----|
| Production  | `main`    | Netlify | Deployed via Netlify (`netlify.toml`) |
| Staging     | `staging` | Render  | Deployed via Render (`render.yaml`)  - `noindex` headers enabled |

## Tech Stack

- **Pure HTML / CSS / JS**  - single-page, no build step, no framework
- **Decap CMS** (formerly Netlify CMS)  - content editing at `/admin`
- **Formspree**  - contact form submissions (`https://formspree.io/f/xkoqjege`)
- **Google Fonts**  - Barlow Condensed, Barlow, Heebo (for Hebrew)

## Project Structure

```
.
├── index.html              # Entire site (single-page)
├── netlify.toml            # Netlify build + redirect config (production)
├── render.yaml             # Render static site config (staging)
├── .nojekyll               # Disables GitHub Pages Jekyll processing
├── faviconnca.png          # Favicon (ball icon, raspberry background)
├── oglogonca.png           # Open Graph social sharing image (1200×630)
├── nca-logo-black.svg      # Black logo (used on light backgrounds)
├── nca-logo-color.svg      # Color logo
├── nca-logo-pink.svg       # Pink logo variant
├── ncalogo.png             # Original PNG logo
├── _data/
│   ├── en.json             # English translations
│   ├── he.json             # Hebrew translations (RTL)
│   ├── nl.json             # Dutch translations
│   └── src/
│       └── logowhitetranspbkg.svg   # White logo (nav, hero, footer)
└── admin/
    ├── index.html           # Decap CMS entry point
    └── config.yml           # CMS collection/field definitions
```

## Internationalization (i18n)

The site supports **3 languages** with a top-bar language switcher using country flag icons:

| Language   | File              | Direction | Flag        |
|------------|-------------------|-----------|-------------|
| English    | `_data/en.json`   | LTR       | GB (🇬🇧)    |
| Hebrew     | `_data/he.json`   | RTL       | IL (🇮🇱)    |
| Dutch      | `_data/nl.json`   | LTR       | NL (🇳🇱)    |

**How it works:**
- Translation JSON files are fetched at runtime via `fetch()` and cached
- HTML elements use `data-i18n` (text), `data-i18n-html` (innerHTML), `data-ph` (placeholder), and `data-i18n-select` (select options) attributes
- Language switch updates `dir` and `lang` attributes on `<html>` for RTL support
- Hebrew layout flips the hero section via `[dir=rtl] .hi { flex-direction: row-reverse; }`

### Adding/editing translations

1. Edit the JSON files in `_data/` directly, **or**
2. Use Decap CMS at `/admin` (requires Netlify Identity setup)

Each JSON key maps to a `data-i18n` attribute in `index.html`. All three files must have the same keys.

## Site Sections

| Section     | ID           | Description |
|-------------|--------------|-------------|
| Top Bar     | `#top-bar`   | Fixed coral bar with language switcher |
| Navigation  | `#nav`       | Fixed dark navbar with logo + links (About, Contact) |
| Hero        | `#hero`      | Full-viewport coral section with logo, title "PLAY.CONNECT.BELONG.", subtitle, CTAs |
| Stats       | `#stats`     | 3-column grid: Founded (2019), Members (119+), Nationwide (NL) |
| About       | `#about`     | Two-column: text + branded card with KVK number |
| Catchball   | `#catchball` | Sport explanation + 4 feature cards + "How to Play" rules section with 6 rule cards |
| Join        | `#join`      | Dark CTA section with contact + Facebook buttons, girls league note |
| Contact     | `#contact`   | Contact form (Formspree) with subject dropdown, phone prefix, WhatsApp + contact info (KVK, Facebook, girls league) |
| Footer      | `footer`     | Logo, nav links, social (Facebook), copyright |
| Cookie      | `#cookie-banner` | GDPR cookie consent banner (3 languages), localStorage-based |

### Catchball Section Detail

The `#catchball` section contains two sub-sections:

1. **Sport Overview**  - intro text + 4 feature cards:
   - Easy to Learn (`cb.c1t`/`cb.c1p`)
   - Team Sport (`cb.c2t`/`cb.c2p`)
   - For Every Woman (`cb.c3t`/`cb.c3p`)
   - Social & Fun (`cb.c4t`/`cb.c4p`)

2. **How to Play** (rules)  - intro text + 6 numbered rule cards:
   - 01 The Court & Setup (`cb.r1t`/`cb.r1p`)
   - 02 Gameplay (`cb.r2t`/`cb.r2p`)
   - 03 Scoring (`cb.r3t`/`cb.r3p`)
   - 04 Match Format (`cb.r4t`/`cb.r4p`)
   - 05 Equipment (`cb.r5t`/`cb.r5p`)
   - 06 Origins (`cb.r6t`/`cb.r6p`)

Rule cards use a left-border accent (flipped to right-border in RTL) with faded numbering.

## Design System

### Color Palette  - "Warm Raspberry"

| Variable        | Value     | Usage |
|-----------------|-----------|-------|
| `--coral`       | `#c4194a` | Primary brand color, hero bg, accents |
| `--coral2`      | `#e0305f` | Hover states |
| `--coral-dark`  | `#a0103a` | Dark accent |
| `--coral-light` | `#fff0f4` | Light tint |
| `--black`       | `#0a0a0a` | Join section bg |
| `--dark`        | `#141414` | Footer bg |
| `--off`         | `#f6f6f6` | Catchball section bg |

### Typography

- **Headings:** Barlow Condensed (900 weight, uppercase)
- **Body:** Barlow (300–700)
- **Hebrew:** Heebo (automatically applied via `[dir=rtl]` selector)

### Key Visual Effects

- Hero grain texture (SVG noise filter overlay)
- Diagonal accent stripe
- Angled bottom edge (`clip-path`)
- Scroll-triggered fade-in animations (`IntersectionObserver`)
- Navbar shadow on scroll

## Social / OG Meta

The site includes Open Graph and Twitter Card meta tags for rich link previews:

- **OG Image:** `oglogonca.png` (player silhouette logo, 1200×630)
- **Title:** "Netherlands Catchball Association  - Play. Connect. Belong."
- **Description:** "Join the fastest-growing women's sport in the Netherlands..."
- **Twitter Card:** `summary_large_image` with alt text

## Cookie Consent (GDPR)

- Banner slides up from bottom after 900ms if no prior choice stored
- "Accept" → `localStorage.nca_cookie = '1'`
- "Decline" → `localStorage.nca_cookie = '0'`
- Fully translated in all 3 languages
- RTL layout support for Hebrew

## Responsive Breakpoints

| Breakpoint  | Changes |
|-------------|---------|
| ≤ 960px     | Nav links hidden, grids collapse to single column, padding reduced |
| ≤ 768px     | Hero goes vertical (column layout), centered text |
| ≤ 600px     | Feature cards and stats stack to single column |

## Deployment

### Production (Netlify)

- Branch: `main`
- Config: `netlify.toml`
- Publish directory: `.` (root)
- SPA redirect: `/* → /index.html` (status 200)

### Staging (Render)

- Branch: `staging`
- Config: `render.yaml`
- `X-Robots-Tag: noindex, nofollow` header prevents search engine indexing
- `Cache-Control: no-cache` for always-fresh previews

## Git Workflow

```
staging  ──(develop & preview)──►  main  ──(auto-deploy)──►  Production
```

- All development happens on `staging`
- Staging deploys to Render for preview
- When ready, merge `staging → main` to deploy to production via Netlify

## External Services

| Service        | Purpose |
|----------------|---------|
| **Netlify**    | Production hosting + Netlify Identity (for CMS auth) |
| **Render**     | Staging hosting |
| **Formspree**  | Contact form backend |
| **Facebook**   | Community group: `facebook.com/groups/2706988312693402` |
| **flagcdn.com**| Country flag SVGs for language switcher |
| **Google Fonts**| Barlow Condensed, Barlow, Heebo |
