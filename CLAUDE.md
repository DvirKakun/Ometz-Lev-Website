# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compilation and Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React 19 + TypeScript + Vite dog training website with the following architecture:

### Routing Structure
- **Splash Page**: Welcome screen at root path `/`  
- **Main Site**: All other pages use Layout component with header/footer
- **React Router**: Uses createBrowserRouter with nested routes under Layout

### Component Architecture
- **Layout System**: `components/layout/` - Header, Footer with nested components
- **Page Components**: `pages/` - Full page components (HomePage, ActivitiesPage, etc.)
- **Section Components**: `components/sections/` - Reusable page sections (hero, about, contact, services)
- **UI Components**: `components/ui/` - Radix UI-based components (accordion, button, card, dialog)
- **Common Components**: `components/common/` - Shared utilities (social buttons, countdown timer)

### Technology Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom RTL support
- **UI Library**: Radix UI components
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v7

### Key Patterns
- Uses Outlet pattern for nested routing
- Hebrew/RTL language support throughout
- Accessibility-first approach with skip links and proper ARIA attributes
- Component-based architecture with clear separation of concerns
- Custom hooks in `hooks/` for state management (countdown, localStorage, media queries)
- Type definitions organized in `types/` directory
- Utility functions in `utils/` and `lib/`

### File Organization
- `src/components/` - All React components organized by type
- `src/pages/` - Page-level components
- `src/data/` - Static data (FAQ, services, gallery)
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions and constants

## ⚠️ Critical: CSP Hash for Facebook Pixel

The `Content-Security-Policy` in `netlify.toml` uses a SHA-256 hash instead of `'unsafe-inline'` for `script-src`:

```
'sha256-Z6wG901mJehG8RneT0u7V2mnlgo7eOnqI9czXZ/XhYU='
```

This hash is computed from the **exact content** of the inline Facebook Pixel `<script>` block in `index.html` (including whitespace).

**If you ever modify the Facebook Pixel script in `index.html`, you MUST recompute the hash and update `netlify.toml`, otherwise the pixel will be silently blocked by the browser.**

To recompute the hash after any change to the pixel script:
```bash
python3 -c "
import hashlib, base64, re
with open('index.html', 'r') as f:
    content = f.read()
match = re.search(r'<!-- Facebook Pixel[^>]*-->\s*<script>(.*?)</script>', content, re.DOTALL)
script_content = match.group(1)
digest = hashlib.sha256(script_content.encode('utf-8')).digest()
print('sha256-' + base64.b64encode(digest).decode())
"
```
Then replace the hash value in the `Content-Security-Policy` line in `netlify.toml`.