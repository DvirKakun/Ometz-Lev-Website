# SEO Full Audit Report — אומץ לב (ometzlev.co.il)

**Date:** 2026-03-31
**Site:** https://ometzlev.co.il
**Business:** אומץ לב — Dog training & therapeutic dog work (Israel)
**Owner:** אלעד שמעונוב (Elad Shimunov)
**Platform:** React 19 SPA · Vite · Netlify · Hebrew/RTL

---

## SEO Health Score: 54 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 52 | 11.4 |
| Content Quality | 23% | 60 | 13.8 |
| On-Page SEO | 20% | 58 | 11.6 |
| Schema / Structured Data | 10% | 62 | 6.2 |
| Performance (CWV) | 10% | 55 | 5.5 |
| AI Search Readiness | 10% | 25 | 2.5 |
| Images | 5% | 55 | 2.75 |
| **Total** | | | **53.75 → 54** |

---

## Executive Summary

The site has solid foundational work — proper redirects, security headers, LocalBusiness schema, Hebrew meta tags — but is held back by **three critical architectural problems** that significantly limit search visibility:

1. **The real homepage lives at `/home`, not `/`** — Google's first crawl target is a JavaScript splash animation.
2. **All SEO signals (meta tags, canonical, schema) are injected by JavaScript** — not present in the static HTML served to crawlers.
3. **No AI-crawler optimization** — no `llms.txt`, and the SPA renders nothing for non-JS bots.

### Top 5 Critical Issues
1. Splash page at root `/` — homepage content at `/home` is not the canonical web root
2. JS-only meta tags, canonical, and schema — invisible on first crawl
3. Both `/` and `/home` in sitemap — sends conflicting signals to Google
4. No `llms.txt` — site is invisible to AI search engines (Perplexity, ChatGPT)
5. Missing CSP (Content-Security-Policy) header

### Top 5 Quick Wins
1. Add static `<link rel="canonical" href="https://ometzlev.co.il/home">` in `index.html`
2. Add static Open Graph meta tags for the root URL in `index.html`
3. Remove `/` from the sitemap (splash page should not be indexed)
4. Create `/public/llms.txt` with business description and key page pointers
5. Add `openingHoursSpecification` and `priceRange` to LocalBusiness schema

---

## 1. Technical SEO (Score: 52/100)

### 1.1 Crawlability

**robots.txt** — ✅ Well configured
```
Location: https://ometzlev.co.il/robots.txt
Sitemap: https://ometzlev.co.il/sitemap.xml
Crawl-delay: 1
```
- Allow/Disallow rules correctly separate indexable vs. private pages
- `Crawl-delay: 1` is reasonable
- ⚠️ No explicit rules for AI crawlers (GPTBot, ClaudeBot, PerplexityBot)

**Sitemap** — ⚠️ Contains conflict
```
Live: https://ometzlev.co.il/sitemap.xml (12 URLs)
```

| URL | In Sitemap | Issue |
|---|---|---|
| `https://ometzlev.co.il/` | ✅ YES (priority 0.5) | ❌ This is the SPLASH PAGE |
| `https://ometzlev.co.il/home` | ✅ YES (priority 1.0) | ✅ Correct canonical homepage |
| `/training`, `/therapy`, `/activities`, `/schools` | ✅ | ✅ |
| `/products` | ✅ | ✅ |
| Library pages | ✅ | ✅ |
| Article pages | Only 1 found | ⚠️ Possible Prismic fetch issue |

**Issue:** The deployed sitemap includes both `/` (splash screen) and `/home` (real homepage). This sends conflicting signals — Google may try to determine which is canonical, and may choose the wrong one.

**Note:** The current local source code (`netlify/functions/sitemap.ts`) no longer includes `/` in static pages, but the deployed version does. The deployed version may be an older build.

### 1.2 Indexability

**CRITICAL — JS-Only Canonical and Meta Tags**

The site is a React SPA. All SEO-critical head tags are injected via `useEffect` in `SEOMeta.tsx`:
- `<link rel="canonical">` — not in static HTML
- `<meta name="description">` — static version exists in `index.html` but points to homepage description for ALL pages
- `<meta property="og:url">` — explicitly noted as "dynamically set" (missing in static HTML)
- All schema (`<script type="application/ld+json">`) — JS-only

**What Google sees on first crawl of https://ometzlev.co.il:**
```html
<title>אומץ לב - אלעד שמעונוב | אילוף כלבים מקצועי וכלבנות טיפולית</title>
<meta name="description" content="...">
<!-- NO canonical tag -->
<!-- NO og:url -->
<!-- NO schema markup -->
<!-- No content — just a JavaScript splash animation -->
```

Google does eventually render JavaScript, but:
- First indexing may miss all content
- Secondary rendered indexing is slower (days/weeks delay)
- Some signals (canonical, OG) are weaker when JS-only
- Facebook/LinkedIn/Twitter crawlers **never** execute JavaScript — all social shares show wrong URL

**CRITICAL — Splash Page at Root**

```
Route: /     → SplashPage (animated welcome screen, no content)
Route: /home → HomePage (real content, services, about)
```

The `SEOMeta` in `HomePage.tsx` explicitly sets:
```tsx
canonicalUrl="https://ometzlev.co.il/home"
```

This means the canonical homepage is `/home`, not `/`. However:
- Google's primary crawl target for any domain is its root URL
- Users sharing `ometzlev.co.il` land on a splash screen with no content
- The 5351 bytes served at `/` is the splash page HTML

**Recommendation:** Either (a) move real homepage content to `/` and redirect `/home` → `/`, or (b) add a server-side redirect from `/` → `/home`.

### 1.3 Security Headers

HTTP response headers for `https://ometzlev.co.il`:

| Header | Status | Value |
|---|---|---|
| `Strict-Transport-Security` | ✅ | `max-age=31536000` |
| `X-Frame-Options` | ✅ | `DENY` |
| `X-Content-Type-Options` | ✅ | `nosniff` |
| `X-XSS-Protection` | ✅ | `1; mode=block` |
| `Referrer-Policy` | ✅ | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | ✅ | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | ❌ MISSING | Not configured |

**Missing CSP:** No Content-Security-Policy header. This is a security gap and increasingly a trust signal for Google.

### 1.4 Redirects

| Test | Result |
|---|---|
| `http://` → `https://` | ✅ 301 redirect |
| `www.ometzlev.co.il` → `ometzlev.co.il` | ✅ 301 redirect |
| Hebrew domain → `ometzlev.co.il` | ✅ 301 redirect |
| Redirect chain depth | ✅ Max 1 hop |

### 1.5 Core Web Vitals (Estimated)

Based on code analysis (no field data available — Google APIs not configured):

| Metric | Concern | Likely Status |
|---|---|---|
| **LCP** | Hero image preloaded as WebP ✅; page-level Framer Motion opacity animation may delay paint | ⚠️ Needs Measurement |
| **INP** | Framer Motion on every page + React 19; lazy loaded chunks | ⚠️ Needs Measurement |
| **CLS** | Framer Motion opacity (no layout shift); font FOUT risk | ✅ Likely Good |
| **TTFB** | Netlify CDN global edge | ✅ Likely Good |

**Notable issue:** `ReactQueryDevtools` is included in the production bundle:
```tsx
// src/App.tsx
<ReactQueryDevtools initialIsOpen={false} />
```
This adds unnecessary JavaScript weight in production.

---

## 2. Content Quality (Score: 60/100)

### 2.1 E-E-A-T Assessment

**Experience:** ✅ Content references real dog training practice, methodology sections exist
**Expertise:** ⚠️ No credentials, certifications, or qualifications mentioned visibly
**Authoritativeness:** ⚠️ No third-party mentions, press coverage, or professional body memberships
**Trustworthiness:** ⚠️ No visible testimonials/reviews with schema markup; contact info present

### 2.2 Content Depth by Page

| Page | Content Depth | Issues |
|---|---|---|
| `/home` | Medium — hero, services grid, about section | Missing FAQ, no testimonials section |
| `/training` | Good — services, method, videos, articles, FAQ | H1 is `sr-only` (visually hidden) |
| `/therapy` | Good — similar structure to training | Same H1 issue |
| `/activities` | Unknown — Prismic-driven content | Activities have empty fallback offerings |
| `/schools` | Unknown — Prismic-driven | Schools have empty fallback offerings |
| `/products` | Unknown — needs verification | Products page structure unclear |
| Library pages | Dynamic/thin | Dependent on Prismic content volume |

**H1 hidden on service pages:**
```tsx
// src/pages/training_page/TrainingPage.tsx:87-89
<h1 className="sr-only">
  אילוף כלבים מקצועי ואישי - אלעד שמעונוב | מאמן כלבים פרטי בבית הלקוח | אומץ לב
</h1>
```
The H1 is visually hidden. While it's technically accessible, having the primary heading invisible to users is a UX concern and creates a disconnect between what users see and what search engines read.

### 2.3 Keyword Strategy Assessment

The site has a well-structured keyword strategy in `src/data/seo-keywords.ts`:

**Strengths:**
- Comprehensive primary/secondary/long-tail/local keyword breakdown per page
- Hebrew + English variations covered
- Local geo keywords for major Israeli cities

**Gaps:**
- `keywords` meta tag includes intentional misspellings — these are invisible to Google (deprecated tag) but harmless
- No content targeting competitive Hebrew queries like "מאמן כלבים מומלץ" or "איך לאלף כלב"
- Library page keywords not defined for video/article library pages

### 2.4 Missing Content Opportunities

- **Testimonials/Reviews page** — no visible customer testimonials with schema markup
- **About/Bio page** — Elad's background, credentials, and experience not in a dedicated page
- **FAQ page** — FAQ exists as section in service pages but not as standalone page
- **Blog/Articles** — articles exist in library but aren't integrated into main navigation SEO strategy
- **City landing pages** — no location-specific pages (e.g., `/training/tel-aviv`)

---

## 3. On-Page SEO (Score: 58/100)

### 3.1 Title Tags

| Page | Title | Length | Issues |
|---|---|---|---|
| `/home` | "אומץ לב - אלעד שמעונוב \| אילוף כלבים מקצועי וכלבנות טיפולית" | ~63 chars | ✅ Good |
| `/training` | "אילוף כלבים מקצועי \| אלעד שמעונוב - מאמן כלבים פרטי \| אומץ לב" | ~64 chars | ✅ Good |
| `/` (splash) | Same as homepage title | — | ⚠️ Splash page shares homepage title |

### 3.2 Meta Descriptions

| Page | Description | Length | Issues |
|---|---|---|---|
| Static (all pages) | "אומץ לב - אלעד שמעונוב מאמן כלבים מקצועי..." | ~155 chars | ⚠️ Same for all pages before JS renders |
| `/home` (JS) | "...אומץ לב - ייעוץ ראשון חינם!" | ✅ Good | JS-only |
| `/training` (JS) | "...שיטות מתקדמות ותוצאות מובטחות. ייעוץ חינם!" | ✅ Good | JS-only |

**Issue:** The static HTML served for ALL pages (before JS) has the same homepage meta description. This means all pages look identical to non-JS crawlers and social media bots.

### 3.3 Heading Structure

**TrainingPage.tsx:**
```
H1: (sr-only) "אילוף כלבים מקצועי ואישי..."
H2: (from CollapsibleFeatures component)
H3: (service items)
```

**Concern:** The H1 is hidden with `sr-only`. Visually there's no H1 visible to users.

### 3.4 Open Graph Tags

| Tag | Static HTML | JS (after render) |
|---|---|---|
| `og:title` | ✅ Present | ✅ Updated per page |
| `og:description` | ✅ Present | ✅ Updated per page |
| `og:type` | ✅ `website` | ✅ Updated per page |
| `og:url` | ❌ MISSING | ✅ Added by SEOMeta |
| `og:image` | ✅ `/assets/icons/Ometz-Lev-Large-Logo.png` | ⚠️ Logo, not OG image |
| `og:image:width/height` | ❌ MISSING | ✅ Added as 1200×630 (but logo isn't this size) |

**Issue:** The OG image is set to `1200×630` dimensions in the meta tag, but the actual image is the logo (different dimensions). This may cause social previews to show a cropped/distorted logo.

### 3.5 Internal Linking

- Navigation links to all main pages ✅
- Footer links present ✅
- No breadcrumb navigation visible (breadcrumb is in schema only) ⚠️
- Service pages don't cross-link to each other ⚠️
- Articles not linked from homepage ⚠️

---

## 4. Schema / Structured Data (Score: 62/100)

### 4.1 Implemented Schema

| Schema Type | Location | Status |
|---|---|---|
| `LocalBusiness` | `SEOJsonLD` (all pages, JS-only) | ✅ Present but JS-only |
| `WebSite` with SearchAction | `SEOJsonLD` (homepage, JS-only) | ⚠️ Invalid SearchAction target |
| `WebPage` | `SEOJsonLD` (all pages, JS-only) | ✅ Present but JS-only |
| `BreadcrumbList` | `SEOJsonLD` (non-homepage, JS-only) | ✅ Present but JS-only |
| `FAQPage` | `FaqSchema` (training/therapy, JS-only) | ✅ Present but JS-only |
| `Article` | `SEOJsonLD` (content pages, JS-only) | ✅ Present but JS-only |

### 4.2 Schema Issues

**Issue 1 — Invalid SearchAction URL:**
```json
"potentialAction": {
  "@type": "SearchAction",
  "target": {
    "urlTemplate": "https://ometzlev.co.il/search?q={search_term_string}"
  }
}
```
There is no `/search` route in the app. This will fail Google's Rich Results Test.

**Issue 2 — Article Publisher Type:**
```json
"publisher": {
  "@type": "Person",
  "name": "אלעד שמעונוב - אומץ לב"
}
```
Google expects `"@type": "Organization"` for Article publisher (required for article rich results).

**Issue 3 — Missing `openingHoursSpecification`:**
The `FooterWorkingHours.tsx` component exists but hours are not added to the `LocalBusiness` schema.

**Issue 4 — Missing `priceRange`:**
No price range indicator in LocalBusiness schema (missed Google Business Panel signal).

**Issue 5 — Missing `AggregateRating`:**
No review/rating schema despite local business context.

**Issue 6 — ICBM coordinate mismatch:**
```tsx
// SEOMeta.tsx
updateMetaTag("ICBM", "31.7767,35.2345"); // Jerusalem coordinates
// But LocalBusiness schema has:
"latitude": 31.9730, "longitude": 34.7925 // Rishon LeZion (correct)
```

**Issue 7 — TikTok missing from sameAs:**
Instagram, Facebook, and YouTube are in `sameAs` but TikTok is not (it's linked from footer).

### 4.3 Missing Schema Opportunities

| Schema Type | Opportunity |
|---|---|
| `Service` schema per service page | Rich results for service pages |
| `Event` schema for summer camps | Rich calendar results |
| `Person` schema for Elad Shimunov | Knowledge Panel support |
| `Review` / `AggregateRating` | Star ratings in search results |
| `VideoObject` for video library | Video rich results in Google |
| `HowTo` for training guides | Featured snippet opportunity |

---

## 5. Performance (Score: 55/100)

### 5.1 Resource Loading

**Positives:**
- Hero image preloaded: `<link rel="preload" as="image" href="/assets/hero/hero_image.webp">`
- Code splitting via React lazy loading
- Static assets cached 1 year (immutable): `/assets/*`
- Netlify CDN global edge (low TTFB)
- WebP format for hero image

**Concerns:**
- Framer Motion (~50KB gzipped) loaded on every page — heavy animation library for the value provided
- Multiple heavy dependencies: MUI, Framer Motion, React Spring, react-xarrows, pdfjs-dist
- `pdfjs-dist` (~2MB) loaded for PDF viewer — should be lazy-loaded with dynamic import
- `ReactQueryDevtools` included in production bundle
- Facebook Pixel loads synchronously in `<head>` — render-blocking potential
- `cdn.enable.co.il` accessibility widget is a third-party script (deferred but adds requests)

### 5.2 Third-Party Impact

| Script | Load Type | Impact |
|---|---|---|
| Facebook Pixel | Synchronous in `<head>` | ⚠️ Render-blocking potential |
| enable.co.il accessibility | `defer` | ✅ Non-blocking |
| Prismic images | CDN | ✅ Fast |
| Supabase | On-demand | ✅ |

### 5.3 Image Optimization

| Asset | Format | Issue |
|---|---|---|
| `/assets/hero/hero_image.webp` | WebP ✅ | Preloaded ✅ |
| `/assets/hero/hero_image.png` | PNG ⚠️ | Duplicate of WebP (delete/don't serve) |
| `/assets/icons/Ometz-Lev-Large-Logo.png` | PNG | Used as OG image — no WebP version |
| `/assets/icons/Ometz-Lev-Dogs-Logo.png` | PNG | No WebP alternative |

---

## 6. AI Search Readiness (Score: 25/100)

### 6.1 llms.txt

```
GET https://ometzlev.co.il/llms.txt → 200 (returns SPA HTML — file doesn't exist)
```

The Netlify SPA fallback (`/*` → `index.html`) means any non-existent path returns the SPA HTML. `llms.txt` does not exist as a real file.

**Impact:** AI search engines (Perplexity, ChatGPT, Claude) use `llms.txt` to understand site structure and content. Without it, they rely entirely on crawling rendered HTML — which they can't do for a JavaScript SPA.

### 6.2 AI Crawler Access

From `robots.txt`:
```
User-agent: *
Allow: /
```
All crawlers allowed, but AI-specific bots (GPTBot, ClaudeBot, PerplexityBot) are not explicitly addressed. While the catch-all `*` permits them, AI-specific rules could optimize their crawling.

### 6.3 Content Citability

**SPA Problem:** AI crawlers generally do not execute JavaScript. The site renders nothing without JS. An AI crawler visiting `https://ometzlev.co.il/training` gets:
```html
<div id="root"></div>
```
...and nothing else. All content is invisible.

**Schema citability:** LocalBusiness, FAQ, and Article schema are present but JS-only — invisible to non-JS AI crawlers.

### 6.4 Passage-Level Citability

No semantic HTML sections that would allow AI systems to extract specific passages. All content is wrapped in CSS-class-heavy React components.

---

## 7. Images (Score: 55/100)

### 7.1 OG Image Issues

The OG image across all pages is:
```
https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png
```

- This is a brand logo, not a social sharing image
- Declared as `1200×630` in OG meta tags, but the logo is likely not that ratio
- Facebook, WhatsApp, LinkedIn shares will show a distorted/cropped logo
- No dedicated social sharing images per page

### 7.2 Alt Text

Alt text is set dynamically via `imageAlt` prop in SEOMeta — good. But:
- Default alt is the page title (which is long — not ideal for image alt)
- No alt text audit was possible on rendered images (SPA-rendered)

### 7.3 Image Formats

| Image | WebP? | Lazy? | Size Known? |
|---|---|---|---|
| Hero image | ✅ WebP | ✅ Preloaded (eager) | Unknown |
| Logo images | ❌ PNG only | Unknown | Unknown |
| Prismic images | CDN-delivered | Unknown | Unknown |

---

## 8. Local SEO (Score: 65/100)

### 8.1 NAP Consistency

| Element | Footer | Schema | Alignment |
|---|---|---|---|
| Name | "אומץ לב" | "אומץ לב - אילוף כלבים מקצועי..." | ⚠️ Minor variation |
| Phone | 052-472-4700 | +972-52-472-4700 | ✅ Equivalent |
| City | ראשון לציון, ישראל | ראשון לציון | ✅ |

### 8.2 LocalBusiness Schema Quality

Present and detailed. Includes:
- ✅ `telephone`, `address`, `geo` coordinates
- ✅ `areaServed` with cities and regions (TA, Rishon, Gush Dan, etc.)
- ✅ `hasOfferCatalog` with 3 service offers
- ✅ `sameAs` with social links
- ❌ Missing `openingHoursSpecification`
- ❌ Missing `priceRange`
- ❌ Missing `postalCode` in address

### 8.3 Service Area Coverage

The service pages target all major Israeli cities via `seo-keywords.ts` local arrays. However:
- No dedicated city/location landing pages
- No service area map or list on the site
- Service area mentioned only in schema, not in page content

---

## 9. Additional Findings from Deep Analysis

### 9.1 Performance — Google Fonts Render-Blocking Chain

`src/index.css` line 6:
```css
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap");
```

This CSS `@import` creates a **2-hop render-blocking chain** for the Heebo font used on every text element:
1. Download main CSS bundle
2. Parse `@import` → new request to `fonts.googleapis.com`
3. `fonts.googleapis.com` returns CSS → new request to `fonts.gstatic.com`
4. Download actual font files
5. Text renders

On slow connections this adds 300–600ms to FCP. The `display=swap` causes FOUT (flash of unstyled text), contributing to CLS.

**No font preconnect hints exist in `index.html`** — no `<link rel="preconnect" href="https://fonts.googleapis.com">` or `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`.

### 9.2 Performance — Splash Page 2-Second LCP Floor

`SplashPage.tsx` line 41: `setTimeout(() => navigate('/home', {replace:true}), 2000)`.

Every new visitor arriving at `ometzlev.co.il` waits **2 full seconds** before the real homepage begins loading. The hero image preload in `index.html` is present and correct, but the preload fires during the splash window — when the hero is not yet visible. The 2-second delay is a hard floor on LCP for any user arriving via the root domain.

### 9.3 Sitemap — Article URLs Use Wrong Prismic Field

`netlify/functions/sitemap.ts` line 90:
```ts
`${BASE_URL}/${pageType}-articles-library/${article.id}`
```

Prismic document IDs are opaque strings like `WxTf3RAAACMA...`. The app routes articles via `:articleKey`, which matches `article.uid` (the human-readable slug). The sitemap submits URLs that return "article not found" inside the viewer. Google indexes non-200 effective URLs from the sitemap.

**Fix:** Change `article.id` to `article.uid` (or whichever field the `useArticles` hook maps to `articleKey`).

### 9.4 Content — Year Discrepancy

`src/data/training_method_config.ts` states **"7 שנות ניסיון"** (7 years).
`src/components/sections/home_page/about/AboutContent.tsx` states **"למעלה מ-9 שנים"** (9 years).

A factual inconsistency within the same site is a direct E-E-A-T credibility hit. Google's quality raters flag self-contradictory claims.

### 9.5 Content — Spelling Errors in Method Configs

- `src/data/therapy_method_config.ts` step 3: `"ליוי"` should be `"ליווי"` (double vav)
- `src/data/training_method_config.ts` step 3: `"ליוי השמור"` is garbled — likely `"ליווי כדי להבטיח"`
- `src/data/therapy_method_config.ts` step 1: double space after `"היכרות  שמאפשרת"`

Spelling errors in service content undermine perceived expertise.

### 9.6 Schema — LocalBusiness Missing `@id` and Wrong Subtype

`SEOJsonLD.tsx` line 127: `"@type": "LocalBusiness"` — too generic.
The correct schema.org subtype for a professional dog trainer is `"ProfessionalService"`.

The `LocalBusiness` block also lacks `"@id": "https://ometzlev.co.il/#business"`, which prevents cross-block entity linking between `LocalBusiness`, `WebSite`, and `WebPage` schemas.

### 9.7 Local SEO — Phone Format Inconsistency

Footer renders `052-472-4700` (local IL format); `tel:` href uses `tel:0524724700` (no country code); schema uses `+972-52-472-4700` (E.164). Google cross-references these across sources. The `tel:` href should use `tel:+97252472470` to match the schema.

### 9.8 Local SEO — No Google Business Profile Connected

No `sameAs` entry points to a Google Maps / GBP URL (`maps.app.goo.gl/...` or `g.page/...`). For a SAB in Gush Dan competing on "מאמן כלבים ראשון לציון", the GBP listing is the single most important ranking factor. Without a verified GBP, the site cannot appear in the local pack.

---

## Appendix: Summary of All Issues

### Critical (Fix Immediately)

| # | Issue | Location |
|---|---|---|
| C1 | Root `/` is splash page, not homepage — canonical conflict with `/home` | `src/App.tsx` routing |
| C2 | All meta tags / canonical / schema are JS-only — invisible on first crawl | `SEOMeta.tsx`, `SEOJsonLD.tsx` |
| C3 | Sitemap article URLs use Prismic document ID instead of slug | `sitemap.ts:90` |
| C4 | No `llms.txt` — invisible to AI search engines | Missing public file |
| C5 | `SearchAction` in WebSite schema points to non-existent `/search` route | `SEOJsonLD.tsx:108-114` |

### High (Fix Within 1 Week)

| # | Issue | Location |
|---|---|---|
| H1 | Missing `Content-Security-Policy` header | `netlify.toml` |
| H2 | `og:url` not in static HTML head | `index.html` |
| H3 | No dedicated OG/social sharing images — using logo for all pages | |
| H4 | `ReactQueryDevtools` in production bundle | `src/App.tsx:335` |
| H5 | H1 on service pages is `sr-only` (visually hidden) | `TrainingPage.tsx:87` |
| H6 | Google Fonts CSS `@import` — 2-hop render-blocking chain on every page | `src/index.css:6` |
| H7 | 2-second splash screen delay — hard LCP floor for root domain visitors | `SplashPage.tsx:41` |
| H8 | Article publisher schema uses `Person` instead of `Organization` | `SEOJsonLD.tsx:285-293` |
| H9 | No Google Business Profile claimed or linked | Off-site action |

### Medium (Fix Within 1 Month)

| # | Issue | Location |
|---|---|---|
| M1 | ICBM coordinates point to Jerusalem, not Rishon LeZion | `SEOMeta.tsx:155` |
| M2 | Missing `openingHoursSpecification` in LocalBusiness schema | `SEOJsonLD.tsx` |
| M3 | `LocalBusiness` @type should be `ProfessionalService` | `SEOJsonLD.tsx:127` |
| M4 | Missing `@id` on LocalBusiness entity | `SEOJsonLD.tsx` |
| M5 | Year discrepancy — 7 years in method config vs 9 years in about | `training_method_config.ts:12` |
| M6 | Spelling errors in therapy and training method configs | `*_method_config.ts` |
| M7 | TikTok missing from schema `sameAs` array | `SEOJsonLD.tsx:169-173` |
| M8 | Phone `tel:` href missing international format | `FooterContact.tsx` |
| M9 | Missing `priceRange` in LocalBusiness schema | `SEOJsonLD.tsx` |
| M10 | No breadcrumb navigation visible (only in schema) | Component needed |
| M11 | Logo PNG has no WebP alternative | `public/assets/icons/` |
| M12 | No `AggregateRating` schema for local business | `SEOJsonLD.tsx` |
| M13 | Facebook Pixel loads synchronously in `<head>` | `index.html:79-92` |
| M14 | Missing font preconnect hints | `index.html` |

### Low (Backlog)

| # | Issue | |
|---|---|---|
| L1 | `keywords` meta tag (deprecated — Google ignores it) | `SEOMeta.tsx` |
| L2 | `og:image` declared as 1200×630 but logo is different ratio | `SEOMeta.tsx` |
| L3 | No `Event` schema for summer camps | |
| L4 | No `VideoObject` schema for video library | |
| L5 | No city-specific landing pages for local SEO | |
| L6 | No `Person` schema for Elad Shimunov | |
| L7 | Hero PNG duplicate of WebP (unnecessary file) | `public/assets/hero/` |
| L8 | Sitemap `lastmod` hardcoded to single date for all static pages | `sitemap.ts:10-19` |
| L9 | `pageType` fallback silently misroutes articles to wrong library | `sitemap.ts:84-85` |
| L10 | `Article` schema type used on service pages (should be `Service`) | `SEOJsonLD.tsx` |
| L11 | Splash page `/` should have `noindex={true}` | `SplashPage.tsx:59` |
| L12 | No testimonials, reviews, or social proof on any page | Content gap |
