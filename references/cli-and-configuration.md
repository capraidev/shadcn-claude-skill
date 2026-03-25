# CLI & Configuration Reference

## CLI Commands

### `init` — Initialize Shadcn UI

Set up Shadcn UI in an existing Next.js project. Creates `components.json` and configures paths.

```bash
npx shadcn@latest init
```

Interactive prompts during init:
1. **Style** — `new-york` or `default`
2. **Base color** — `slate`, `zinc`, `neutral`, `stone`, `gray`
3. **CSS variables** — `yes` (recommended) or `no`

Flags:
- `--defaults` — Skip prompts, use default configuration
- `--force` — Overwrite existing configuration
- `-y` — Accept all defaults

Package manager alternatives:
```bash
pnpm dlx shadcn@latest init
yarn dlx shadcn@latest init
bunx shadcn@latest init
```

### `add` — Add Components

Install one or more components into the project:

```bash
npx shadcn@latest add [component...]
```

Examples:
```bash
npx shadcn@latest add button                    # Single component
npx shadcn@latest add button card dialog input   # Multiple components
npx shadcn@latest add form                       # Installs form + react-hook-form + zod dependencies
```

Flags:
- `--overwrite` — Overwrite existing component files
- `--all` — Add all available components
- `-y` — Skip confirmation prompt
- `--path <path>` — Custom installation path (overrides `components.json`)

### `diff` — Show Component Changes

Compare local components against the registry to see upstream changes:

```bash
npx shadcn@latest diff                  # List all components with changes
npx shadcn@latest diff button           # Show diff for specific component
```

### `build` — Build Registry

Build a custom component registry from local components:

```bash
npx shadcn@latest build
```

---

## `components.json` Schema

The `components.json` file configures how Shadcn UI works in the project. Located at the project root.

```jsonc
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
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
```

### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `style` | `"new-york"` \| `"default"` | Component style variant |
| `rsc` | `boolean` | Enable React Server Components support |
| `tsx` | `boolean` | Use TypeScript (`.tsx`) or JavaScript (`.jsx`) |
| `tailwind.css` | `string` | Path to global CSS file |
| `tailwind.baseColor` | `string` | Base color scale (`zinc`, `slate`, `neutral`, `stone`, `gray`) |
| `tailwind.cssVariables` | `boolean` | Use CSS variables for colors (recommended: `true`) |
| `tailwind.prefix` | `string` | Tailwind CSS prefix (e.g., `"tw-"`) for avoiding conflicts |
| `aliases.components` | `string` | Import alias for components directory |
| `aliases.utils` | `string` | Import alias for `cn()` utility |
| `aliases.ui` | `string` | Import alias for UI components directory |
| `aliases.lib` | `string` | Import alias for lib directory |
| `aliases.hooks` | `string` | Import alias for hooks directory |
| `iconLibrary` | `"lucide"` \| `"radix"` | Icon library to use |

### The `cn()` Utility

Installed automatically at the `aliases.utils` path (default `@/lib/utils`). Combines `clsx` and `tailwind-merge` for conditional class merging:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("p-4 rounded", isActive && "bg-primary text-primary-foreground")} />
```

---

## Project Structure

After initialization, the typical file structure:

```
project/
├── app/
│   ├── globals.css          # CSS variables (theme tokens)
│   ├── layout.tsx           # Root layout
│   └── page.tsx
├── components/
│   └── ui/                  # Shadcn components (owned by you)
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/
│   └── utils.ts             # cn() utility
├── hooks/                   # Custom hooks
├── components.json          # Shadcn configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

---

## Monorepo Notes

For monorepo setups, configure `components.json` aliases to point to the correct package paths. Use workspace-relative paths in aliases:

```jsonc
{
  "aliases": {
    "components": "@repo/ui/components",
    "utils": "@repo/ui/lib/utils",
    "ui": "@repo/ui/components/ui"
  }
}
```

Run the CLI from the package directory where components should be installed.
