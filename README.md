# Shadcn UI Skill for Claude Code

A **Claude Code skill** that teaches Claude how to build Next.js applications using [Shadcn UI](https://ui.shadcn.com), Radix UI primitives, and Tailwind CSS.

## What Is This?

This is a skill (a structured knowledge pack) designed for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — Anthropic's command-line coding agent. When installed, it gives Claude deep, up-to-date knowledge of the Shadcn UI ecosystem, so it can scaffold, build, and customize Shadcn-based interfaces accurately and idiomatically.

Instead of relying on Claude's training data (which may be outdated), this skill provides curated reference material, code examples, and best-practice patterns that Claude reads at task time.

## What Does It Cover?

The skill covers the full Shadcn UI workflow for Next.js App Router projects:

- **CLI & Configuration** — `npx shadcn@latest init/add`, `components.json` schema, path aliases, package manager support
- **Component Catalog** — Every Shadcn component categorized by type, with install commands, imports, and variant documentation
- **Composition Patterns** — Server vs. Client Components, provider setup, layout patterns, responsive design
- **Forms** — React Hook Form + Zod validation + Shadcn Form components, including advanced patterns (dynamic arrays, Server Actions)
- **Data Tables** — TanStack Table integration with the 3-file architecture (columns, data-table, page), sorting, filtering, pagination
- **Charts** — Recharts integration via Shadcn's `ChartContainer`, `ChartConfig` objects, tooltips, and legends
- **Theming & Dark Mode** — CSS variables with `oklch` color format, `next-themes` setup, TweakCN editor workflow
- **Blocks** — Pre-built full-page compositions (dashboards, login pages, sidebars) with dependency management
- **Accessibility** — Built-in Radix a11y features and developer responsibilities

## Repository Structure

```
shadcn-ui/
├── SKILL.md                              # Main skill file (entry point for Claude)
├── references/
│   ├── cli-and-configuration.md          # CLI commands, components.json schema
│   ├── components.md                     # Full component catalog
│   ├── composition-patterns.md           # Layout, Server/Client components, providers
│   ├── forms.md                          # React Hook Form + Zod patterns
│   ├── data-tables.md                    # TanStack Table integration
│   ├── charts.md                         # Recharts integration, chart types
│   ├── blocks.md                         # Block catalog, sidebar system
│   ├── theming-and-dark-mode.md          # CSS variables, oklch, next-themes
│   └── accessibility.md                  # Radix a11y, ARIA patterns
└── examples/
    ├── form-with-validation.tsx          # Complete form with Zod + multiple fields
    ├── data-table-example.tsx            # Table with columns, sorting, pagination
    ├── dashboard-layout.tsx              # Dashboard with sidebar, header, content
    └── chart-config-example.tsx          # Bar chart with ChartConfig and tooltip
```

## How to Install

### Option 1 — Copy into your project

Place the `shadcn-ui/` folder inside your project's `.claude/skills/` directory:

```
your-project/
└── .claude/
    └── skills/
        └── shadcn-ui/
            ├── SKILL.md
            ├── references/
            └── examples/
```

Claude Code will automatically detect the skill and use it when you ask it to work with Shadcn UI.

### Option 2 — Global installation

Place the folder in your home directory's Claude skills location:

```
~/.claude/skills/shadcn-ui/
```

This makes the skill available across all your projects.

## Usage Examples

Once installed, just ask Claude Code to work with Shadcn UI naturally:

- *"Add a shadcn data table to display my users"*
- *"Create a login page with shadcn"*
- *"Set up dark mode with shadcn in my Next.js app"*
- *"Build a dashboard with a sidebar using shadcn blocks"*
- *"Add a form with email and password validation"*
- *"Create a chart showing monthly revenue"*

Claude will read the skill's references and examples to produce accurate, idiomatic code.

## Requirements

This skill is designed for projects using:

- **Next.js** (App Router)
- **Tailwind CSS** v3+
- **TypeScript** (recommended)

Shadcn UI itself requires no npm package — the CLI copies component source code directly into your project at `components/ui/`.

## Version

Current skill version: **2.0.0**

## License

This skill is provided as-is for use with Claude Code. Shadcn UI itself is open source — see the [official repository](https://github.com/shadcn-ui/ui) for its license.
