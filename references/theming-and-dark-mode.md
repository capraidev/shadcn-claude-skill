# Theming & Dark Mode

## CSS Variables System

Shadcn UI uses CSS custom properties (variables) in `globals.css` for all color tokens. Modern versions use the **oklch** color format for wider gamut support.

### Complete Variable List

```css
:root {
  /* Page */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* Cards & Popovers */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* Semantic Colors */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);

  /* Borders & Input */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Charts */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  /* Sidebar */
  --sidebar-background: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  /* Geometry */
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);

  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);

  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);

  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);

  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);

  --sidebar-background: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}
```

### oklch Format

`oklch(L C H)` where:
- **L** (Lightness): 0 (black) to 1 (white)
- **C** (Chroma): 0 (gray) to ~0.4 (vivid)
- **H** (Hue): 0-360 degrees (0=red, 120=green, 240=blue)

Advantages over HSL: perceptually uniform, wider gamut support, better for generating accessible color palettes.

### Using Colors in Components

Colors are referenced via Tailwind classes that map to CSS variables:

```tsx
{/* Semantic usage (preferred) */}
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="bg-destructive text-destructive-foreground" />
<div className="border-border" />

{/* Chart colors */}
<div className="text-[var(--chart-1)]" />
```

---

## Dark Mode Setup with `next-themes`

### 1. Install

```bash
npm install next-themes
```

### 2. Create ThemeProvider

```tsx
// components/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 3. Add to Layout

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Key props:
- `attribute="class"` — Adds `.dark` class to `<html>` (required for Tailwind dark mode)
- `defaultTheme="system"` — Follows OS preference by default
- `enableSystem` — Enables system theme detection
- `disableTransitionOnChange` — Prevents flash during theme switch
- `suppressHydrationWarning` on `<html>` — Required to avoid hydration mismatch

### 4. Create Mode Toggle

```tsx
// components/mode-toggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

Install required components:
```bash
npx shadcn@latest add button dropdown-menu
npm install lucide-react
```

---

## TweakCN Theme Editor

**Editor:** https://tweakcn.com/editor/theme

TweakCN is a visual theme editor for Shadcn UI.

### Workflow

1. Open the [TweakCN Editor](https://tweakcn.com/editor/theme)
2. Adjust settings:
   - **Colors**: Pick base colors or fine-tune individual tokens (primary, secondary, accent, muted, etc.) for both light and dark modes
   - **Fonts**: Select Google Fonts for sans, serif, mono stacks
   - **Misc**: Adjust border radius, shadow intensity, scaling
3. Preview changes in real-time on Shadcn components
4. Click "Copy" or "Export" to get the CSS
5. Paste the generated code into `globals.css`, replacing the existing `:root` and `.dark` blocks

---

## Adding Custom Colors

### Define the variable

```css
/* globals.css */
:root {
  --warning: oklch(0.82 0.189 84.429);
  --warning-foreground: oklch(0.32 0.07 50);
}

.dark {
  --warning: oklch(0.828 0.189 84.429);
  --warning-foreground: oklch(0.145 0.05 50);
}
```

### Register with Tailwind (v4+)

For Tailwind CSS v4 with the `@theme` directive:

```css
/* globals.css */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

For Tailwind CSS v3 with `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        warning: "oklch(var(--warning) / <alpha-value>)",
        "warning-foreground": "oklch(var(--warning-foreground) / <alpha-value>)",
      },
    },
  },
}
```

### Use in components

```tsx
<div className="bg-warning text-warning-foreground rounded-md p-4">
  Warning message
</div>
```

---

## Sidebar Theming

The sidebar has its own set of color tokens for independent theming:

| Token | Purpose |
|-------|---------|
| `--sidebar-background` | Sidebar background |
| `--sidebar-foreground` | Sidebar text color |
| `--sidebar-primary` | Active/highlighted item |
| `--sidebar-primary-foreground` | Text on active item |
| `--sidebar-accent` | Hover state background |
| `--sidebar-accent-foreground` | Hover state text |
| `--sidebar-border` | Sidebar borders |
| `--sidebar-ring` | Focus ring color |

This allows creating sidebars with different color schemes (e.g., dark sidebar on light theme).

---

## Base Color Scales

Available base colors during `shadcn init`:

| Name | Character |
|------|-----------|
| Neutral | Pure grays |
| Slate | Cool grays (blue tint) |
| Stone | Warm grays (brown tint) |
| Zinc | Industrial grays |
| Gray | Standard gray |
