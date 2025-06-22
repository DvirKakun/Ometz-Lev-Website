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