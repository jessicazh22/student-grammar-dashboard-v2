"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { TrendDataPoint, CategoryTrendPoint } from "@/lib/grammar-data"
import { cn } from "@/lib/utils"

const overallChartConfig = {
  errors: {
    label: "Errors",
    color: "var(--chart-4)",
  },
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const categoryChartConfig: ChartConfig = {
  "subject-verb": { label: "Subject-Verb Agreement", color: "var(--chart-1)" },
  articles: { label: "Article Usage", color: "var(--chart-2)" },
  "verb-patterns": { label: "Verb Patterns", color: "var(--chart-3)" },
  tense: { label: "Tense Consistency", color: "var(--chart-4)" },
  "singular-plural": { label: "Singular / Plural", color: "var(--chart-5)" },
  prepositions: { label: "Preposition Choice", color: "var(--chart-1)" },
  "word-form-choice": { label: "Word & Form Mix-Ups", color: "var(--chart-3)" },
}

type ChartView = "overall" | "categories"

export function TrendChart({
  overallData,
  categoryData,
}: {
  overallData: TrendDataPoint[]
  categoryData: CategoryTrendPoint[]
}) {
  const [view, setView] = useState<ChartView>("overall")

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Progress Over Time
            </CardTitle>
          </div>
          <div className="flex rounded-lg bg-muted p-0.5">
            <button
              type="button"
              onClick={() => setView("overall")}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                view === "overall"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Overall
            </button>
            <button
              type="button"
              onClick={() => setView("categories")}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                view === "categories"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              By Pattern
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "overall" ? (
          <ChartContainer
            config={overallChartConfig}
            className="h-[220px] w-full"
          >
            <AreaChart
              data={overallData}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-border"
              />
              <XAxis
                dataKey="conversation"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tickMargin={4}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="score"
                type="monotone"
                fill="url(#scoreGradient)"
                stroke="var(--chart-1)"
                strokeWidth={2}
              />
              <Area
                dataKey="errors"
                type="monotone"
                fill="var(--chart-4)"
                fillOpacity={0.08}
                stroke="var(--chart-4)"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <ChartContainer
            config={categoryChartConfig}
            className="h-[220px] w-full"
          >
            <BarChart
              data={categoryData}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-border"
              />
              <XAxis
                dataKey="conversation"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tickMargin={4}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.keys(categoryChartConfig).map((key, i, arr) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={categoryChartConfig[key].color}
                  radius={
                    i === arr.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]
                  }
                />
              ))}
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
