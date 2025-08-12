# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application featuring advanced animations, interactive 3D elements, and multi-language support. The project uses React with TypeScript and includes sophisticated UI components, animations, and visual effects.

## Development Commands

### Core Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Package Management
- Uses npm (package-lock.json present)
- Install dependencies: `npm install`

## Architecture & Key Technologies

### Core Framework
- **Next.js 14.2.16** with App Router
- **React 18** with TypeScript
- **TypeScript** with ES6 target and strict mode

### UI & Styling
- **Tailwind CSS** with custom configuration and CSS variables
- **shadcn/ui** components library (extensive UI component collection)
- **class-variance-authority** for component variants
- **tailwindcss-animate** for animation utilities

### Animation Libraries
- **Framer Motion** for declarative animations
- **GSAP** with ScrollTrigger for advanced scroll-based animations
- **@react-spring/web** for physics-based animations

### 3D Graphics
- **Three.js** (^0.169.0) for WebGL rendering
- **@react-three/fiber** for React integration with Three.js
- **@react-three/drei** for Three.js utilities and helpers

### Additional Features
- **Internationalization**: Custom language context (English/Portuguese)
- **Media Players**: @mux/mux-player-react for video playback
- **Forms**: react-hook-form with zod validation
- **UI Enhancements**: 
  - lucide-react for icons
  - cmdk for command palette
  - sonner for toast notifications
  - react-day-picker for date selection

## Project Structure

### Application Files
- `/app - Copy/` - Next.js App Router pages
  - `layout.tsx` - Root layout with providers
  - `page.tsx` - Main landing page with sections
  - `globals.css` - Global styles and CSS variables
  - `/image-trail-demo/` - Demo page for image trail effect

### Components
- `/components - Copy/` - Reusable React components
  - Animation components: `advanced-text-animation.tsx`, `parallax-section.tsx`
  - Interactive: `magnetic-element.tsx`, `cursor-effect.tsx`, `hover-scramble.tsx`
  - 3D: `interactive-logo-hero.tsx`
  - UI utilities: `language-toggle.tsx`, `smooth-scroll.tsx`
  - `/ui/` - Complete shadcn/ui component library (40+ components)
  - `/fancy/` - Special effect components

### Supporting Directories
- `/contexts - Copy/` - React contexts (language management)
- `/hooks - Copy/` - Custom React hooks
- `/lib - Copy/` - Utility functions and translations
- `/public/` - Static assets (contains forcelogo.glb 3D model)

## Key Implementation Details

### Performance Optimizations
- Client-side rendering for heavy components (`"use client"`)
- Dynamic imports for code splitting
- Error boundaries for graceful degradation
- Frame rate limiting for 3D scenes

### Browser Compatibility
- WebGL detection and fallbacks
- Touch device support
- SSR-safe component implementations
- Progressive enhancement approach

### Code Conventions
- Functional components with TypeScript
- Custom hooks for reusable logic
- Path aliases configured (@/* for root imports)
- Consistent naming conventions (kebab-case for files)

## Build Configuration

### TypeScript Config
- Target: ES6
- Module: ESNext with bundler resolution
- Strict mode enabled
- Path aliases configured

### Tailwind Config
- Custom color scheme with CSS variables
- Extended animations and keyframes
- Responsive breakpoints
- Dark mode support (class-based)

## Special Notes
- Files appear to have " - Copy" suffix in their names
- Extensive use of refs for DOM manipulation
- Complex state management for animations
- Multi-language support built-in (EN/PT)
- Heavy use of animation libraries requiring careful performance consideration