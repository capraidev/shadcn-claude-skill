# Charts Reference

**Documentation:** https://ui.shadcn.com/charts

Shadcn Charts wrap **Recharts** with themed, accessible components.

## Setup

```bash
npx shadcn@latest add chart
npm install recharts
```

This installs `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent` to `components/ui/chart.tsx`.

## Core Concepts

### ChartConfig

Every chart requires a `ChartConfig` object that maps data keys to labels and theme colors:

```tsx
import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

Color tokens `--chart-1` through `--chart-5` are defined in `globals.css` and automatically adapt to light/dark mode.

### ChartContainer

Wraps the Recharts component. Handles responsive sizing, applies theme colors, and provides accessibility:

```tsx
import { ChartContainer } from "@/components/ui/chart"

<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart data={data}>
    {/* Recharts children */}
  </BarChart>
</ChartContainer>
```

Key props:
- `config` — The `ChartConfig` object (required)
- `className` — Control sizing (e.g., `min-h-[300px]`, `aspect-video`)

### ChartTooltip

Custom themed tooltip replacing the default Recharts tooltip:

```tsx
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

<ChartTooltip content={<ChartTooltipContent />} />
```

`ChartTooltipContent` props:
- `indicator` — `"line"` | `"dot"` | `"dashed"` (default: `"dot"`)
- `hideLabel` — Hide the tooltip label
- `hideIndicator` — Hide the color indicator
- `nameKey` — Override the name key for data lookup

### ChartLegend

Themed legend component:

```tsx
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

<ChartLegend content={<ChartLegendContent />} />
```

---

## Chart Types

### Bar Chart

```tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

export function BarChartExample() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

Variants:
- **Stacked:** Add `stackId="a"` to each `<Bar>`
- **Horizontal:** Use `<BarChart layout="vertical">` with `<YAxis>` for categories
- **Grouped:** Default (no `stackId`)

### Line Chart

```tsx
import { Line, LineChart, CartesianGrid, XAxis } from "recharts"

<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
  <LineChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
    <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>
```

### Area Chart

```tsx
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
  <AreaChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area type="monotone" dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.4}
      stroke="var(--color-desktop)" stackId="a" />
    <Area type="monotone" dataKey="mobile" fill="var(--color-mobile)" fillOpacity={0.4}
      stroke="var(--color-mobile)" stackId="a" />
  </AreaChart>
</ChartContainer>
```

### Pie Chart

```tsx
import { Pie, PieChart } from "recharts"

const pieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
]

const pieConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
} satisfies ChartConfig

<ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-[250px]">
  <PieChart>
    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
    <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} />
  </PieChart>
</ChartContainer>
```

- **Donut:** Set `innerRadius` prop
- **Full pie:** Omit `innerRadius`

### Radar Chart

```tsx
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
  <RadarChart data={chartData}>
    <ChartTooltip content={<ChartTooltipContent />} />
    <PolarAngleAxis dataKey="month" />
    <PolarGrid />
    <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
  </RadarChart>
</ChartContainer>
```

### Radial Chart

```tsx
import { RadialBar, RadialBarChart } from "recharts"

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
  <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
    <ChartTooltip content={<ChartTooltipContent nameKey="browser" hideLabel />} />
    <RadialBar dataKey="visitors" background />
  </RadialBarChart>
</ChartContainer>
```

---

## Color System

Colors in charts follow this flow:

1. `ChartConfig` defines `color: "var(--chart-N)"` per data key
2. `ChartContainer` injects CSS custom properties: `--color-{key}: var(--chart-N)`
3. Recharts components reference `fill="var(--color-{key})"` or `stroke="var(--color-{key})"`

Theme tokens in `globals.css`:
```css
:root {
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}
```

To use custom colors instead of theme tokens:
```tsx
const chartConfig = {
  revenue: { label: "Revenue", color: "oklch(0.7 0.15 150)" },
} satisfies ChartConfig
```

---

## Responsive Sizing

Control chart dimensions with the container:

```tsx
{/* Fixed aspect ratio */}
<ChartContainer config={config} className="aspect-video w-full">

{/* Minimum height */}
<ChartContainer config={config} className="min-h-[300px] w-full">

{/* Max size for square charts (pie, radar) */}
<ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
```
