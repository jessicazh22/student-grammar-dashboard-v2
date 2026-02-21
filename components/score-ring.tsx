"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ErrorPattern } from "@/lib/grammar-data"

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
          Accuracy Score
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
