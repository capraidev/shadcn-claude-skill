# Composition Patterns

## Layout Patterns

### Dashboard with Sidebar

The standard dashboard pattern uses `SidebarProvider` + `SidebarInset`:

```tsx
// app/dashboard/layout.tsx
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

Install required components:
```bash
npx shadcn@latest add sidebar breadcrumb separator
```

### Split Pane with Resizable

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={25} minSize={15}>
    {/* Sidebar / list */}
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={75}>
    {/* Main content */}
  </ResizablePanel>
</ResizablePanelGroup>
```

### Card Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardContent>
  </Card>
  {/* more cards... */}
</div>
```

---

## Server vs Client Components

### Rules for Shadcn + App Router

All Shadcn UI components use Radix UI primitives internally, which require client-side JavaScript. Follow these patterns:

**Pattern 1: Full Client Page**

When the entire page is interactive:

```tsx
// app/settings/page.tsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="general"><Card>...</Card></TabsContent>
      <TabsContent value="security"><Card>...</Card></TabsContent>
    </Tabs>
  )
}
```

**Pattern 2: Server Page + Client Islands**

When the page fetches data but has interactive sections:

```tsx
// app/users/page.tsx (Server Component)
import { UserTable } from "./user-table" // Client Component

async function getUsers() {
  // fetch data on the server
}

export default async function UsersPage() {
  const users = await getUsers()
  return (
    <div>
      <h1 className="text-2xl font-bold">Users</h1>
      <UserTable data={users} /> {/* Client boundary */}
    </div>
  )
}
```

```tsx
// app/users/user-table.tsx
"use client"

import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

export function UserTable({ data }: { data: User[] }) {
  return <DataTable columns={columns} data={data} />
}
```

**Pattern 3: Client Wrapper for Layout Providers**

```tsx
// components/providers.tsx
"use client"

import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}
```

### Which Components Need `"use client"`?

| Always needs client | Can work in server context |
|--------------------|-----------------------------|
| All interactive components (Button with onClick, Dialog, Sheet, Tabs, etc.) | Static display-only (Badge, Separator, Card without interactions) |
| Form components (Form, Input with state, Select) | Typography, Skeleton |
| Components with hooks (useForm, useState) | Avatar (image only) |
| Navigation components with state | Breadcrumb (link-only) |

> **Rule of thumb:** If a component responds to user interaction or manages state, it needs `"use client"`.

---

## Provider Setup

### Required Providers in `layout.tsx`

Place all providers in a single Client Component wrapper:

```tsx
// app/layout.tsx
import { Providers } from "@/components/providers"
import "@/app/globals.css"

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

Common providers and their purpose:

| Provider | Package | Purpose |
|----------|---------|---------|
| `ThemeProvider` | `next-themes` | Dark/light mode switching |
| `TooltipProvider` | `@/components/ui/tooltip` | Required ancestor for all `Tooltip` components |
| `SidebarProvider` | `@/components/ui/sidebar` | Sidebar state management (use in dashboard layout, not root) |
| `Toaster` | `@/components/ui/sonner` | Toast notification container (place after providers) |

---

## Responsive Patterns

### Mobile Drawer + Desktop Sidebar

Use `Sheet` on mobile and `Sidebar` on desktop:

```tsx
"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/ui/sidebar"

export function ResponsiveNav({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <Sidebar>{children}</Sidebar>
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon"><Menu /></Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        {children}
      </SheetContent>
    </Sheet>
  )
}
```

### Responsive Dialog (Dialog on desktop, Drawer on mobile)

```tsx
"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

export function ResponsiveModal({ children, trigger }: { children: React.ReactNode; trigger: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  )
}
```

---

## Common Page Compositions

### Settings Page

```
Tabs (horizontal)
├── TabsTrigger: "Profile"
├── TabsTrigger: "Account"
├── TabsTrigger: "Notifications"
└── TabsContent (each)
    └── Card
        ├── CardHeader (title + description)
        ├── CardContent (Form fields)
        └── CardFooter (Save button)
```

Components: `tabs`, `card`, `form`, `input`, `button`, `separator`, `label`

### Profile Page

```
Card (main)
├── Avatar + name + role
├── Separator
├── Form fields (read-only or editable)
└── Action buttons
```

Components: `card`, `avatar`, `separator`, `button`, `badge`

### Dashboard Overview

```
Grid layout
├── Row 1: Stat cards (4-column grid)
├── Row 2: Chart + Recent activity (2-column)
└── Row 3: Data table (full width)
```

Components: `card`, `chart`, `table`, `badge`, `button`, `avatar`
