"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { ErrorPattern, Priority } from "@/lib/grammar-data"
import { cn } from "@/lib/utils"

const priorityConfig: Record<
  Priority,
  { label: string; className: string }
> = {
  HIGH: {
    label: "HIGH",
    className:
      "border-destructive/30 bg-destructive/5 text-destructive",
  },
  MEDIUM: {
    label: "MEDIUM",
    className:
      "border-warning/40 bg-warning/5 text-warning-foreground",
  },
  LOW: {
    label: "LOW",
    className:
      "border-muted-foreground/20 bg-muted text-muted-foreground",
  },
}

function ErrorPatternRow({
  pattern,
  totalErrors,
  isFirst,
  onStudy,
}: {
  pattern: ErrorPattern
  totalErrors: number
  isFirst: boolean
  onStudy: (pattern: ErrorPattern) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const pct = Math.round((pattern.count / totalErrors) * 100)
  const priority = priorityConfig[pattern.priority]

  return (
    <div className="group rounded-xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm tabular-nums">
          {pattern.count}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground">
              {pattern.name}
            </h3>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] uppercase tracking-wider font-semibold border px-1.5 py-0",
                priority.className
              )}
            >
              {priority.label}
            </Badge>
            {isFirst && (
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-wider font-semibold border border-primary/30 bg-primary/5 text-primary gap-1"
              >
                <Sparkles className="h-2.5 w-2.5" />
                Start here
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <Progress value={pct} className="h-1.5 flex-1" />
            <span className="text-[10px] font-medium text-muted-foreground tabular-nums w-8 text-right">
              {pct}%
            </span>
          </div>
        </div>
        <div className="text-muted-foreground shrink-0">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-3 sm:px-4 pb-3 pt-2.5 space-y-3 animate-in slide-in-from-top-1 fade-in-0 duration-200">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {pattern.shortExplanation}
          </p>

          {/* Quick Tip */}
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Quick Tip
                </span>
                <p className="text-sm text-foreground mt-1 leading-relaxed">
                  {pattern.quickTip}
                </p>
              </div>
            </div>
          </div>

          {/* All examples */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Your examples
            </span>
            {pattern.examples.map((ex, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5"
              >
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-xs sm:text-sm line-through text-destructive/80 bg-destructive/5 px-2 py-0.5 rounded break-all">
                    {ex.incorrect}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1 sm:mt-0" />
                  <span className="text-xs sm:text-sm text-accent bg-accent/10 px-2 py-0.5 rounded font-medium break-all">
                    {ex.correct}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ex.context}
                </p>
              </div>
            ))}
          </div>

          {/* Study This Pattern button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onStudy(pattern)
            }}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer",
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Study this pattern
          </button>
        </div>
      )}
    </div>
  )
}

export function ErrorPatterns({
  patterns,
  onStudy,
  layout = "vertical",
}: {
  patterns: ErrorPattern[]
  onStudy: (pattern: ErrorPattern) => void
  layout?: "vertical" | "horizontal"
}) {
  const totalErrors = patterns.reduce((sum, p) => sum + p.count, 0)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Pattern Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {patterns.map((pattern, i) => (
          <ErrorPatternRow
            key={pattern.id}
            pattern={pattern}
            totalErrors={totalErrors}
            isFirst={i === 0}
            onStudy={onStudy}
          />
        ))}
      </CardContent>
    </Card>
  )
}
