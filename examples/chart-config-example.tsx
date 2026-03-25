// Chart example with ChartConfig, ChartContainer, tooltip, and legend
// Install: npx shadcn@latest add chart card
// Install: npm install recharts

"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

// 1. Define chart data
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

// 2. Define chart configuration (maps data keys to labels and colors)
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

// 3. Chart component wrapped in a Card
export function BarChartExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Visitors</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={4}
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// ============================================================
// Alternative: Line Chart example
// ============================================================

// import { Line, LineChart, CartesianGrid, XAxis } from "recharts"
//
// export function LineChartExample() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Trends</CardTitle>
//         <CardDescription>Desktop vs Mobile traffic</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
//           <LineChart accessibilityLayer data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip content={<ChartTooltipContent />} />
//             <ChartLegend content={<ChartLegendContent />} />
//             <Line
//               type="monotone"
//               dataKey="desktop"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={false}
//             />
//             <Line
//               type="monotone"
//               dataKey="mobile"
//               stroke="var(--color-mobile)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
