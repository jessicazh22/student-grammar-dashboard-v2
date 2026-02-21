"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"
import type { ErrorPattern } from "@/lib/grammar-data"

/* Compact sidebar card showing total errors + per-pattern counts */
export function AccuracyScore({
  patterns,
}: {
  patterns: ErrorPattern[]
}) {
  const totalErrors = patterns.reduce((sum, p) => sum + p.count, 0)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Accuracy Score
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-3xl font-bold text-foreground tabular-nums mb-1">
          {totalErrors}
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          total errors across {patterns.length} patterns
        </p>
        <div className="space-y-1.5">
          {patterns.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate pr-2">{p.name}</span>
              <span className="text-foreground font-medium tabular-nums shrink-0">{p.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/* Full-width card with progress bars for the main content area */
export function PatternBreakdown({
  patterns,
}: {
  patterns: ErrorPattern[]
}) {
  const totalErrors = patterns.reduce((sum, p) => sum + p.count, 0)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Pattern Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-5">
        {patterns.map((p) => {
          const pct = Math.round((p.count / totalErrors) * 100)
          return (
            <div key={p.id}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-foreground font-medium truncate pr-2">
                  {p.name}
                </span>
                <span className="text-muted-foreground tabular-nums shrink-0">
                  {p.count} ({pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
