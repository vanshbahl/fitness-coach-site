#!/bin/bash

# 1. vite.config.ts
cat << 'VITE' > frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
VITE

# 2. tsconfig.app.json (and tsconfig.json for absolute imports)
# Add baseUrl and paths to compilerOptions
cat << 'TSCONFIG' > frontend/tsconfig.app.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
TSCONFIG

# 3. src/lib/utils.ts
cat << 'UTILS' > frontend/src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
UTILS

# 4. src/styles/index.css
cat << 'CSS' > frontend/src/styles/index.css
@import "tailwindcss";

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

@layer base {
  :root {
    --background: #ffffff;
    --foreground: #111111;
    --card: #ffffff;
    --card-foreground: #111111;
    --popover: #ffffff;
    --popover-foreground: #111111;
    --primary: #111111;
    --primary-foreground: #ffffff;
    --secondary: #f4f4f5;
    --secondary-foreground: #18181b;
    --muted: #f4f4f5;
    --muted-foreground: #71717a;
    --accent: #f4f4f5;
    --accent-foreground: #18181b;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #e4e4e7;
    --input: #e4e4e7;
    --ring: #18181b;
    --radius: 0.75rem;
  }
  .dark {
    --background: #09090b;
    --foreground: #fafafa;
    --card: #09090b;
    --card-foreground: #fafafa;
    --popover: #09090b;
    --popover-foreground: #fafafa;
    --primary: #fafafa;
    --primary-foreground: #18181b;
    --secondary: #27272a;
    --secondary-foreground: #fafafa;
    --muted: #27272a;
    --muted-foreground: #a1a1aa;
    --accent: #27272a;
    --accent-foreground: #fafafa;
    --destructive: #7f1d1d;
    --destructive-foreground: #fafafa;
    --border: #27272a;
    --input: #27272a;
    --ring: #d4d4d8;
  }
}
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
CSS

# 5. src/main.tsx
cat << 'MAIN' > frontend/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="flex min-h-screen items-center justify-center font-bold text-3xl">Quick Strength UI</div>} />
          {/* Layouts and nested routes will go here */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
MAIN

# 6. components.json
cat << 'COMPONENTS' > frontend/components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/index.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
COMPONENTS

# Cleanup old css
rm -f frontend/src/index.css frontend/src/App.css

npm i -D @types/node

