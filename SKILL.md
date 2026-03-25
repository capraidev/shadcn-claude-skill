---
name: shadcn-ui
description: >
  This skill should be used when the user asks to "add a shadcn component",
  "create a form with shadcn", "build a dashboard with shadcn", "add a data table",
  "configure shadcn ui", "set up dark mode with shadcn", "create a chart with shadcn",
  "use shadcn blocks", "theme a next.js app with shadcn", "install shadcn ui",
  "add a sidebar", "create a login page with shadcn", or when building any
  Next.js application that uses Shadcn UI components, Radix UI primitives,
  or Tailwind CSS-based component patterns.
allowed-tools: Read, Bash, Glob, Grep
metadata:
  version: 2.0.0
---

# Shadcn UI for Next.js

## Overview

Shadcn UI is a collection of re-usable components built on Radix UI and Tailwind CSS. It is **not an npm package** — instead, a CLI copies component source code directly into the project at `components/ui/`. This gives full ownership and control over every component. All components are accessible by default (via Radix), styled with Tailwind CSS, and composable.

**Official docs:** https://ui.shadcn.com

## Quick Start

Initialize Shadcn UI in an existing Next.js project:

```bash
npx shadcn@latest init
```

Add components as needed:

```bash
npx shadcn@latest add button card dialog
```

Import and use:

```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button variant="outline">Click me</Button>
}
```

> For the full CLI reference (all commands, flags, `components.json` schema), see **`references/cli-and-configuration.md`**.

## Core Workflow

Follow this standard process when building with Shadcn UI:

1. **Initialize** — Run `npx shadcn@latest init` to generate `components.json` and set up paths
2. **Add components** — Run `npx shadcn@latest add [name]` for each component needed
3. **Compose UI** — Combine components in pages and layouts, wrap interactive ones with `"use client"`
4. **Theme** — Configure CSS variables in `globals.css` for light/dark mode
5. **Customize** — Edit component source directly in `components/ui/` when needed

## Component Import Convention

All Shadcn components install to `components/ui/` and use the `@/` path alias:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
```

Every Shadcn component is a **Client Component** internally (uses Radix UI hooks). When using them in Next.js App Router:
- Import them in files that have `"use client"` at the top, OR
- Import them inside a Client Component wrapper

> For the full component catalog (categorized, with install commands, imports, and variants), see **`references/components.md`**.

## Next.js App Router Integration

### Server vs Client Components

Shadcn components use Radix UI primitives (hooks, refs, event handlers), so they require the client runtime. Apply these rules:

| Scenario | Approach |
|----------|----------|
| Page with only Shadcn components | Add `"use client"` to the page file |
| Page mixing data fetching + UI | Keep page as Server Component; extract interactive parts into a Client Component |
| Layout with providers | Add providers in a `"use client"` wrapper component |

### Provider Setup in `layout.tsx`

Place global providers in a dedicated Client Component:

```tsx
// app/providers.tsx
"use client"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}
```

```tsx
// app/layout.tsx (Server Component)
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

> For layout patterns, responsive design, and component composition, see **`references/composition-patterns.md`**.

## Form Building

Shadcn forms use **React Hook Form** + **Zod** for validation + Shadcn Form components for UI:

```bash
npx shadcn@latest add form input label
npm install zod
```

Core pattern:

```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export function MyForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", name: "" },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    // handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

> For advanced form patterns (select, checkbox, date picker, dynamic arrays, Server Actions), see **`references/forms.md`** and **`examples/form-with-validation.tsx`**.

## Data Tables

Shadcn data tables use **TanStack Table** with a 3-file architecture:

```bash
npx shadcn@latest add table
npm install @tanstack/react-table
```

| File | Purpose |
|------|---------|
| `columns.tsx` | Define `ColumnDef[]` with accessors, headers, cell renderers |
| `data-table.tsx` | Reusable `<DataTable>` component with `useReactTable` |
| `page.tsx` | Fetch data (Server Component) and pass to `<DataTable>` |

> For column definitions, sorting, filtering, pagination, and row selection patterns, see **`references/data-tables.md`** and **`examples/data-table-example.tsx`**.

## Theming

Shadcn UI uses **CSS variables** in `globals.css` for all color tokens. Modern Shadcn uses the `oklch` color format:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

Enable dark mode with `next-themes`:

```bash
npm install next-themes
```

> For the complete variable list, dark mode toggle component, TweakCN editor workflow, sidebar tokens, and custom colors, see **`references/theming-and-dark-mode.md`**.

## Charts

Shadcn Charts wrap **Recharts** with themed components:

```bash
npx shadcn@latest add chart
npm install recharts
```

Core pattern: define a `ChartConfig` object mapping data keys to labels and colors, wrap Recharts components in `<ChartContainer>`:

```tsx
const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig
```

> For all chart types, tooltip/legend configuration, and responsive patterns, see **`references/charts.md`** and **`examples/chart-config-example.tsx`**.

## Blocks

Blocks are pre-built, full-page or section-level compositions (dashboards, login pages, sidebars). Copy the block source into the project and install required components.

> For the block catalog, file structures, dependencies, and the sidebar system, see **`references/blocks.md`** and **`examples/dashboard-layout.tsx`**.

## Key Rules

| Do | Don't |
|----|-------|
| Use `npx shadcn@latest add` to install components | Install components via npm |
| Import from `@/components/ui/...` | Import from `shadcn` or `@shadcn/ui` |
| Use CSS variables for theming (`oklch`) | Hardcode color values in components |
| Add `"use client"` when using interactive components | Use Shadcn components in Server Components without a client wrapper |
| Edit component source in `components/ui/` to customize | Create wrapper components for simple style changes |
| Install all dependencies for blocks | Copy block code without its required components |

## Reference Files

### Detailed Guides
- **`references/cli-and-configuration.md`** — CLI commands, `components.json` schema, aliases, package managers
- **`references/components.md`** — Full component catalog categorized by type with variants and imports
- **`references/composition-patterns.md`** — Layout patterns, Server/Client components, providers, responsive design
- **`references/forms.md`** — React Hook Form + Zod + Shadcn Form component patterns
- **`references/data-tables.md`** — TanStack Table integration, columns, sorting, filtering, pagination
- **`references/charts.md`** — Recharts integration, ChartConfig, all chart types, tooltips
- **`references/blocks.md`** — Block catalog, sidebar system, dashboard patterns, dependencies
- **`references/theming-and-dark-mode.md`** — CSS variables, oklch, next-themes, TweakCN, custom colors
- **`references/accessibility.md`** — Built-in Radix a11y, developer responsibilities, ARIA patterns

### Code Examples
- **`examples/form-with-validation.tsx`** — Complete form with Zod schema, multiple field types, submit handler
- **`examples/data-table-example.tsx`** — Data table with columns, sorting, and pagination
- **`examples/dashboard-layout.tsx`** — Dashboard layout with sidebar, header, and content area
- **`examples/chart-config-example.tsx`** — Bar chart with full ChartConfig, tooltip, and legend
