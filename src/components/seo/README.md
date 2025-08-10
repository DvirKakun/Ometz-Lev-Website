# SEO Components

This directory contains components for improving search engine optimization (SEO) through structured data and meta tags.

## FaqSchema Component

The `FaqSchema` component automatically generates JSON-LD structured data for FAQ sections to help Google understand and display your FAQ content in search results.

### Features

- ✅ **Automatic JSON-LD Generation**: Creates proper FAQ structured data
- ✅ **Google Rich Snippets**: Helps your FAQ appear as rich snippets in Google search
- ✅ **Dynamic Content**: Automatically pulls FAQ data from your existing data layer
- ✅ **Clean Mounting/Unmounting**: Properly manages script tags in document head
- ✅ **TypeScript Support**: Fully typed with existing FAQ interfaces

### Usage

```tsx
import FaqSchema from "../components/seo/FaqSchema";

// Add to any page that has FAQ content
<FaqSchema pageType="therapy" />
```

### Supported Page Types

- `therapy` - FAQ for therapy services
- `training` - FAQ for dog training services  
- `activities` - FAQ for activities and summer camps
- `schools` - FAQ for school programs

### How It Works

1. **Data Source**: Pulls FAQ data from `src/data/faq.ts` using `getFAQsByPageType()`
2. **Schema Generation**: Creates Schema.org FAQPage markup
3. **DOM Injection**: Adds JSON-LD script to document head
4. **Cleanup**: Removes script when component unmounts

### Generated Schema Example

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question", 
      "name": "מה זה כלבנות טיפולית?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "כלבנות טיפולית היא שיטת טיפול המשלבת כלבים מאומנים..."
      }
    }
  ]
}
```

### SEO Benefits

- **Rich Snippets**: FAQ content may appear directly in Google search results
- **Improved CTR**: Rich snippets can increase click-through rates
- **Better Indexing**: Helps Google understand your content structure
- **Voice Search**: FAQ markup helps with voice search optimization

### Implementation Status

Currently implemented on:
- ✅ TherapyPage (`/therapy`)
- ✅ TrainingPage (`/training`) 
- ✅ ActivitiesPage (`/activities`)
- ✅ SchoolsPage (`/schools`)

### Best Practices

1. **Match Content**: Ensure FAQ schema matches exactly what's displayed on the page
2. **Hebrew Content**: Works seamlessly with Hebrew text and RTL layout
3. **Unique IDs**: Each page type gets a unique script ID to prevent conflicts
4. **Data Sync**: FAQ schema automatically updates when FAQ data changes