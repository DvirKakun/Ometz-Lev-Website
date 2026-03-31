# SEO Action Plan — אומץ לב (ometzlev.co.il)

**Generated:** 2026-03-31
**Health Score:** 54/100
**Target Score:** 78/100 (after Phase 1+2)

---

## PHASE 1 — Critical Fixes (Do Now)

### C1 · Fix the homepage architecture (Biggest Impact)

**Problem:** Real homepage content lives at `/home`, not `/`. Google crawls `/` and finds a JavaScript splash animation with no content.

**Option A (Recommended) — Redirect `/` to `/home`:**
Add to `netlify.toml` before the SPA fallback redirect:

```toml
[[redirects]]
  from = "https://ometzlev.co.il/"
  to = "https://ometzlev.co.il/home"
  status = 301
  force = true
```

**Option B (Better Long-Term) — Move homepage to `/`:**
Restructure routing in `src/App.tsx` so `HomePage` renders at `/` and `SplashPage` renders at `/splash` (or remove splash entirely). Update all canonical URLs.

---

### C2 · Add static SEO tags to `index.html`

**Problem:** The static HTML has no canonical, no og:url, and the meta description is the same for all pages.

**Fix — Add to `index.html` `<head>`:**

```html
<!-- Static canonical for root (update when homepage moves) -->
<link rel="canonical" href="https://ometzlev.co.il/home" />

<!-- og:url for root page -->
<meta property="og:url" content="https://ometzlev.co.il/home" />

<!-- Prerendering hint for social crawlers -->
<meta name="fragment" content="!" />
```

**For long-term fix:** Consider adding Netlify pre-rendering or a lightweight SSR/SSG layer (e.g., render critical HTML server-side for the homepage).

---

### C3 · Fix sitemap article URLs (article.id → article.uid)

**Problem:** `netlify/functions/sitemap.ts` line 90 generates article URLs using `article.id` (an opaque Prismic document ID like `WxTf3RAAACMA`). The app routes articles by `:articleKey` which resolves to `article.uid` (the slug). Every article URL in the sitemap is currently broken.

**Fix in `netlify/functions/sitemap.ts` line 90:**

```ts
// Change:
`${BASE_URL}/${pageType}-articles-library/${article.id}`
// To:
`${BASE_URL}/${pageType}-articles-library/${article.uid}`;
```

Verify that the `useArticles` hook uses `article.uid` for the `articleKey` field. If it uses a different field, match that field here.

---

### C4 · Redeploy to fix old sitemap

**Problem:** Live sitemap may still include `/` (splash page). Current source code already excludes it.

**Fix:** Redeploy the Netlify function after fixing C3 above.

---

### C5 · Create `llms.txt`

**Problem:** No `llms.txt` file — AI search engines can't understand the site.

**Create `/public/llms.txt`:**

```
# אומץ לב — Ometz Lev
> אילוף כלבים מקצועי וכלבנות טיפולית | Professional Dog Training & Therapeutic Dog Work in Israel

## About
אומץ לב is an Israeli dog training and animal-assisted therapy business founded and run by אלעד שמעונוב (Elad Shimunov), based in ראשון לציון (Rishon LeZion). Services are provided across the central Israel region (Gush Dan).

Contact: 052-472-4700 | Eladshi1326@gmail.com

## Services

### Dog Training (אילוף כלבים)
Professional in-home dog training using positive reinforcement methods. Covers obedience training, behavior problem solving, puppy training, and aggression management.
Full details: https://ometzlev.co.il/training

### Therapeutic Dog Work (כלבנות טיפולית)
Animal-assisted therapy using trained therapeutic dogs to help individuals overcome fears, anxiety, depression, and emotional challenges. Programs for children, youth, and adults.
Full details: https://ometzlev.co.il/therapy

### Activities (פעילויות)
Summer camps for children with dogs, weekly clubs, and social enrichment activities.
Full details: https://ometzlev.co.il/activities

### Educational School Programs (יוזמות חינוכיות)
Educational programs in schools combining dog interaction for developing empathy, responsibility, and social skills.
Full details: https://ometzlev.co.il/schools

## Content Library
- Training videos: https://ometzlev.co.il/training-videos-library
- Training articles: https://ometzlev.co.il/training-articles-library
- Therapy videos: https://ometzlev.co.il/therapy-videos-library
- Therapy articles: https://ometzlev.co.il/therapy-articles-library

## Location & Coverage
Based in ראשון לציון. Serves: תל אביב, חולון, בת ים, הרצליה, רמת גן, פתח תקווה, נתניה, and surrounding areas (Gush Dan / Central Israel).

## Social Media
- Facebook: https://www.facebook.com/share/1BZ6LUVmqB/
- Instagram: https://www.instagram.com/eladshimonov_omets_lev
- YouTube: https://youtube.com/@ometzlev
```

---

### C6 · Fix invalid SearchAction in WebSite schema

**Problem:** `potentialAction` points to `/search?q=` but there's no search route.

**Fix in `src/components/seo/SEOJsonLD.tsx` — remove the `potentialAction` block (lines 107-114):**
The site has no internal search. Remove this or implement site search first.

```tsx
// REMOVE these lines from websiteSchema:
potentialAction: {
  "@type": "SearchAction",
  target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/search?q={search_term_string}` },
  "query-input": "required name=search_term_string",
},
```

---

## PHASE 2 — High Impact (Within 1 Week)

### H1 · Add Content-Security-Policy header

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://connect.facebook.net https://cdn.enable.co.il; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self'; connect-src 'self' https://*.supabase.co https://prismic.io https://*.prismic.io; frame-src 'none';"
```

**Note:** Test thoroughly — a misconfigured CSP can break the site. Use `Content-Security-Policy-Report-Only` first.

---

### H2 · Create dedicated OG/social images per page

**Problem:** All pages use the logo as social sharing image. Social previews show a logo, not an appealing preview.

**Action:**

1. Create 1200×630px social preview images for: homepage, training, therapy, activities, schools
2. Update `imageUrl` in each page's `seoConfig` to use dedicated OG images
3. Store in `/public/assets/og/`

---

### H3 · Remove ReactQueryDevtools from production

**Fix in `src/App.tsx`:**

```tsx
// Replace:
<ReactQueryDevtools initialIsOpen={false} />;

// With:
{
  import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />;
}
```

---

### H4 · Fix Article publisher schema type

**Fix in `src/components/seo/SEOJsonLD.tsx` (lines ~285-293):**

```tsx
// Change:
publisher: {
  "@type": "Person",
  name: "אלעד שמעונוב - אומץ לב",

// To:
publisher: {
  "@type": "Organization",
  name: "אומץ לב",
  url: baseUrl,
```

---

### H5 · Make H1 visible on service pages

**Problem:** `<h1 className="sr-only">` hides the H1 from users.

**Fix in `TrainingPage.tsx` (and `TherapyPage.tsx`):**
Remove `sr-only` class and style the H1 visibly as part of the page header — or integrate it into the `CollapsibleFeatures` component's visual hero area.

---

### H6 · Fix ICBM coordinates in SEOMeta

**Fix in `src/components/seo/SEOMeta.tsx` (line 155):**

```tsx
// Change (Jerusalem → Rishon LeZion):
updateMetaTag("ICBM", "31.9730,34.7925");
// Also update geo.placename from "Israel" to "Rishon LeZion, Israel"
// And geo.region from "IL" to "IL-M" (Central District ISO code)
```

---

### H7 · Fix Google Fonts render-blocking chain

**Problem:** `src/index.css` uses `@import url("https://fonts.googleapis.com")` which creates a 2-hop render-blocking chain adding 300–600ms to FCP.

**Quick fix (immediate) — Add preconnects to `index.html` `<head>`:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Better fix — Self-host Heebo font:**

```bash
npm install @fontsource/heebo
```

In `src/main.tsx` or `src/index.css`, replace the Google Fonts import with:

```ts
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/600.css";
import "@fontsource/heebo/700.css";
```

Remove `@import url("https://fonts.googleapis.com/...")` from `src/index.css`. The font becomes part of the Vite build, served from Netlify CDN with immutable caching. Also consider dropping weights 300 and 500 if not visually needed — each weight is a separate download.

---

### H8 · Reduce splash screen delay

**Problem:** `SplashPage.tsx` line 41 waits 2 full seconds before navigating to `/home`. This is a hard floor on LCP for every new visitor.

**Fix options (choose one):**

```tsx
// Option A — Reduce to near-zero delay (keep splash for visual branding):
}, 400); // was 2000

// Option B — Use sessionStorage to skip on return visits:
const hasVisited = sessionStorage.getItem('splashShown');
if (hasVisited) { navigate('/home', { replace: true }); return; }
sessionStorage.setItem('splashShown', '1');
setTimeout(() => navigate('/home', { replace: true }), 1500);
```

---

### H9 · Fix content year discrepancy

**Problem:** `src/data/training_method_config.ts` line 12 says 7 years experience; `AboutContent.tsx` says 9 years. Self-contradictory claims reduce E-E-A-T credibility.

**Fix:** Update `training_method_config.ts` to match the accurate figure used elsewhere. Pick the single correct value and apply it everywhere.

---

### H10 · Fix spelling errors in method configs

**Fix in `src/data/therapy_method_config.ts`:**

- Step 1: remove double space after `"היכרות  שמאפשרת"` → `"היכרות שמאפשרת"`
- Step 3: `"ליוי"` → `"ליווי"`

**Fix in `src/data/training_method_config.ts`:**

- Step 3: `"ליוי השמור"` — review and correct (likely `"ליווי כדי להבטיח"` or equivalent)

---

## PHASE 3 — Medium Improvements (Within 1 Month)

### M1 · Fix LocalBusiness schema subtype and add `@id`

**Fix in `src/components/seo/SEOJsonLD.tsx` (line 127):**

```tsx
// Change:
"@type": "LocalBusiness",
// To:
"@type": "ProfessionalService",
"@id": "https://ometzlev.co.il/#business",
```

This enables cross-block entity linking between `LocalBusiness`, `WebSite`, and `WebPage` schemas. Also update `websiteSchema.publisher` to reference `{"@type": "LocalBusiness", "@id": "https://ometzlev.co.il/#business"}` instead of an inline `Organization`.

---

### M2 · Normalize business name in schema

The schema `name` field is keyword-stuffed: `"אומץ לב - אילוף כלבים מקצועי, כלבנות טיפולית ופעילויות חברתיות"`. Google requires schema `name` to match the GBP listing exactly.

**Fix:** Change to `"אומץ לב"` or at most `"אומץ לב - אלעד שמעונוב"`.

---

### M3 · Add openingHoursSpecification to LocalBusiness schema

Add to `organizationSchema` in `SEOJsonLD.tsx`:

```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Friday"],
    "opens": "08:00",
    "closes": "15:00"
  }
]
```

Data already exists in `FooterWorkingHours.tsx` — just copy it to schema.

---

### M4 · Add priceRange to LocalBusiness schema

Add to `organizationSchema`:

```json
"priceRange": "₪₪"
```

---

### M5 · Add TikTok to sameAs

Add to the `sameAs` array in `SEOJsonLD.tsx`:

```json
"https://www.tiktok.com/@ometz.lev1"
```

(Verify exact handle from footer `SocialLinks.tsx`)

---

### M6 · Fix phone `tel:` href to international format

**Fix in `src/components/layout/footer/FooterContact.tsx`:**

```tsx
// Change:
href = "tel:0524724700";
// To:
href = "tel:+97252472470";
```

---

### M7 · Add postalCode to LocalBusiness address

```json
"address": {
  "@type": "PostalAddress",
  "addressCountry": "IL",
  "addressRegion": "מרכז",
  "addressLocality": "ראשון לציון",
  "postalCode": "7528400"
}
```

---

### M8 · Move Facebook Pixel to non-blocking position

**Fix in `index.html`:**
Move Facebook Pixel script from `<head>` to just before `</body>`, or wrap with `window.addEventListener('load', ...)` to prevent render-blocking.

---

### M9 · Add visual breadcrumb navigation

Add a visible breadcrumb component to service pages. Currently breadcrumbs only exist in JSON-LD schema.

---

### M10 · Convert logo images to WebP

```bash
# Convert logo images
convert /public/assets/icons/Ometz-Lev-Large-Logo.png -quality 85 /public/assets/icons/Ometz-Lev-Large-Logo.webp
convert /public/assets/icons/Ometz-Lev-Dogs-Logo.png -quality 85 /public/assets/icons/Ometz-Lev-Dogs-Logo.webp
```

---

### M11 · Add AggregateRating schema (when reviews are available)

If you collect reviews (Google, Facebook, or direct), add:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "47",
  "bestRating": "5",
  "worstRating": "1"
}
```

Only add if you have verifiable review sources.

---

## PHASE 4 — Strategic Growth (Backlog)

### Strategic recommendations in priority order:

1. **Claim and optimize Google Business Profile** — The single highest-impact action for local search. Without a verified GBP, the site cannot appear in the local pack for "מאמן כלבים ראשון לציון". Set primary category to "Dog Trainer," add all service areas, upload 10+ photos, enable reviews. Then add the GBP URL to `sameAs` in `SEOJsonLD.tsx`.

2. **Server-Side Rendering or Pre-rendering** — The biggest technical SEO opportunity. Add `vite-plugin-ssg` (lowest effort) or migrate to Next.js to serve static HTML per route. This resolves the JS-only canonical/meta/schema issue and AI crawler invisibility simultaneously.

3. **City-specific landing pages** — Create pages like `/training/rishon-lezion`, `/training/tel-aviv` targeting local search. These are high-intent, lower-competition queries (Whitespark #1 SAB ranking factor).

4. **Testimonials/Reviews page** — Add a dedicated page with real customer testimonials, photos, and schema markup. Critical for E-E-A-T. Start an active review acquisition program (WhatsApp message to clients with direct Google review link).

5. **About/Bio page for Elad** — Dedicate a page to Elad's credentials, experience, certifications with issuing bodies named. Add `Person` schema with `knowsAbout`, `hasCredential`, and `worksFor` properties.

6. **`Person` schema for Elad Shimunov** — Standalone entity with `@id: "https://ometzlev.co.il/#elad-shimunov"` enables Knowledge Panel disambiguation and AI citation by name.

7. **`Service` schema per service page** — Replace the current `Article` schema on service pages with `Service` schema. Add `HowTo` schema for the numbered method steps.

8. **Event schema for summer camps** — Add `Event` schema with dates when camps open for registration. Enables Google calendar rich results.

9. **VideoObject schema** — Add structured data for video library entries (video rich results in Google).

10. **Google Search Console + CrUX** — Set up Google API credentials to get real Core Web Vitals field data and indexation status.

---

## Expected Score Improvement

| Phase         | Actions                                    | Estimated Score |
| ------------- | ------------------------------------------ | --------------- |
| Baseline      | Current state                              | 54              |
| After Phase 1 | C1-C6 fixed                                | 63              |
| After Phase 2 | + H1-H10 fixed                             | 72              |
| After Phase 3 | + M1-M11 fixed                             | 79              |
| After Phase 4 | + Strategic items (GBP + SSG + city pages) | 87+             |
