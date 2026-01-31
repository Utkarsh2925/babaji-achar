# Deployment Guide for Babaji Achar

## Build & Deploy

This project uses Vite, React, TypeScript, and TailwindCSS.

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```
The output will be in the `dist/` directory.

### 3. Verification Checklist
- [x] Project Structure (match required layout)
- [x] Dependencies (`npm install` success)
- [x] Build (`npm run build` success)
- [x] All Legacy Functions Preserved in `App.tsx`
- [x] Image Resolver Implemented (`src/utils/imageResolver.ts`)

## Vercel / Netlify Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
