"use client"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Define the ChartConfig type
interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

// Define the chartConfig object
const chartConfig: ChartConfig = {
  visitors: {
    label: "Visitors",
  },
  typescript: {
    label: "TypeScript",
    color: "#007acc", // TypeScript color
  },
  javascript: {
    label: "JavaScript",
    color: "#f7df1e", // JavaScript color
  },
  html: {
    label: "HTML",
    color: "#e34f26", // HTML color
  },
  css: {
    label: "CSS",
    color: "#563d7c", // CSS color
  },
  vue: {
    label: "Vue",
    color: "#41b883", // Vue color
  },
  other: {
    label: "Other",
    color: "#aaaaaa", // Default color for others
  },
}

// Define the Props interface
interface Props {
  languages: Record<string, number>
}

export function Component(props: Props) {
  const chartData = Object.keys(props.languages).map((key) => {
    const languageKey = key.toLowerCase() as keyof typeof chartConfig
    return {
      language: key,
      count: props.languages[key],
      fill: chartConfig[languageKey]?.color || "var(--chart-other)"
    }
  })

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{ left: 0 }}
      >
        <YAxis
          dataKey="language"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value.toLowerCase() as keyof typeof chartConfig]?.label || value
          }
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  )
}
