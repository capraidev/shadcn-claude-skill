# Blocks Reference

**Documentation:** https://ui.shadcn.com/blocks

Blocks are pre-built, full-page or section-level compositions. Copy block source code into the project and install all required components.

## Block Catalog

### Sidebar Blocks (sidebar-01 through sidebar-15)

Various sidebar configurations: collapsible, icon-only, floating, inset, with submenus, grouped navigation.

**Required components:**
```bash
npx shadcn@latest add sidebar breadcrumb separator
```

**File structure for sidebar blocks:**
```
components/
  app-sidebar.tsx              # Main sidebar component
  nav-main.tsx                 # Primary navigation group
  nav-secondary.tsx            # Secondary/footer navigation
  nav-user.tsx                 # User menu in sidebar footer
  team-switcher.tsx            # Team/workspace switcher
app/
  dashboard/
    layout.tsx                 # SidebarProvider + SidebarInset layout
    page.tsx                   # Dashboard content
```

### Login Blocks (login-01 through login-04)

Authentication page layouts: centered card, split-screen with image, minimal form.

**Required components:**
```bash
npx shadcn@latest add card input label button
```

**File structure:**
```
app/
  login/
    page.tsx                   # Login page
  register/
    page.tsx                   # Registration page
```

### Dashboard Blocks (dashboard-01 through dashboard-07)

Complete dashboard layouts with stat cards, charts, recent activity, data tables.

**Required components:**
```bash
npx shadcn@latest add sidebar card chart table tabs badge avatar separator breadcrumb
```

---

## Sidebar System

The sidebar is Shadcn's most complex component. It provides a collapsible, responsive navigation system.

### Component Hierarchy

```
SidebarProvider                           # State management (required ancestor)
├── Sidebar                               # The sidebar itself
│   ├── SidebarHeader                     # Top area (logo, team switcher)
│   ├── SidebarContent                    # Scrollable navigation area
│   │   └── SidebarGroup                  # Navigation section
│   │       ├── SidebarGroupLabel         # Section label
│   │       └── SidebarMenu              # Menu container
│   │           └── SidebarMenuItem       # Single menu item
│   │               └── SidebarMenuButton # Clickable button/link
│   │                   └── SidebarMenuSub        # Submenu (collapsible)
│   │                       └── SidebarMenuSubItem
│   │                           └── SidebarMenuSubButton
│   └── SidebarFooter                     # Bottom area (user menu)
├── SidebarInset                          # Main content area next to sidebar
│   ├── header                            # Page header with SidebarTrigger
│   └── main                              # Page content
└── SidebarRail                           # Thin rail for collapsed state (optional)
```

### Basic Sidebar Setup

```tsx
// components/app-sidebar.tsx
"use client"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import { Home, Settings, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="text-lg font-semibold">My App</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* User menu, settings, etc. */}
      </SidebarFooter>
    </Sidebar>
  )
}
```

### Sidebar with Collapsible Submenus

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import {
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"

const navWithSubs = [
  {
    title: "Products",
    icon: Package,
    items: [
      { title: "All Products", url: "/products" },
      { title: "Categories", url: "/products/categories" },
      { title: "Inventory", url: "/products/inventory" },
    ],
  },
]

// Inside SidebarMenu:
{navWithSubs.map((item) => (
  <Collapsible key={item.title} asChild className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton>
          <item.icon />
          <span>{item.title}</span>
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items.map((sub) => (
            <SidebarMenuSubItem key={sub.title}>
              <SidebarMenuSubButton asChild>
                <Link href={sub.url}>{sub.title}</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
))}
```

### Dashboard Layout with Sidebar

```tsx
// app/dashboard/layout.tsx
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Sidebar Variants

| Variant | Prop | Behavior |
|---------|------|----------|
| Default | (none) | Fixed sidebar, content shifts |
| Floating | `variant="floating"` | Sidebar floats over content with shadow |
| Inset | `variant="inset"` | Sidebar inset within the page |
| Icon-only | `collapsible="icon"` | Collapses to icons only |
| Offcanvas | `collapsible="offcanvas"` | Slides off-screen when collapsed |
| No collapse | `collapsible="none"` | Always visible, no toggle |

```tsx
<Sidebar variant="floating" collapsible="icon">
  {/* content */}
</Sidebar>
```

### Controlling Sidebar State

```tsx
"use client"
import { useSidebar } from "@/components/ui/sidebar"

export function MyComponent() {
  const { state, open, setOpen, toggleSidebar, isMobile } = useSidebar()
  // state: "expanded" | "collapsed"
  // open: boolean
  // isMobile: boolean
}
```

---

## Login Page Pattern

### Centered Card Login

```tsx
// app/login/page.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Split-Screen Login

```tsx
export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-sm">
          {/* Form content */}
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        {/* Image or brand content */}
      </div>
    </div>
  )
}
```
