"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Lightbulb, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ErrorPattern } from "@/lib/grammar-data"
import { cn } from "@/lib/utils"

export function LearningCards({ patterns }: { patterns: ErrorPattern[] }) {
  // Flatten all examples from top patterns into flash cards
  const flashCards = patterns.slice(0, 4).flatMap((p) =>
    p.examples.map((ex) => ({
      patternName: p.name,
      incorrect: ex.incorrect,
      correct: ex.correct,
      context: ex.context,
      tip: p.quickTip,
    }))
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const current = flashCards[currentIndex]
  if (!current) return null

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Quick Review
          </CardTitle>
          <span className="text-xs text-muted-foreground tabular-nums">
            {currentIndex + 1} / {flashCards.length}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Flash cards from your real examples -- tap to flip
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <button
          type="button"
          onClick={() => setFlipped(!flipped)}
          className="group relative w-full cursor-pointer"
          aria-label={flipped ? "Show question" : "Show answer"}
        >
          <div
            className={cn(
              "rounded-xl border p-5 text-center min-h-[140px] flex flex-col items-center justify-center transition-all duration-300",
              flipped
                ? "bg-success/5 border-success/20"
                : "bg-primary/5 border-primary/10"
            )}
          >
            {!flipped ? (
              <>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {current.patternName}
                </span>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">
                  What should this be?
                </span>
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  &ldquo;...{current.incorrect}...&rdquo;
                </p>
                <span className="text-[10px] text-muted-foreground mt-3 group-hover:text-foreground transition-colors">
                  Tap to reveal
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] font-semibold text-success uppercase tracking-wider mb-2">
                  Correction
                </span>
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  &ldquo;...{current.correct}...&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-xs">
                  {current.context}
                </p>
              </>
            )}
          </div>
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setFlipped(false)
              setCurrentIndex((prev) =>
                prev > 0 ? prev - 1 : flashCards.length - 1
              )
            }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </button>
          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Reset card"
          >
            <RotateCcw className="h-3 w-3" />
            Flip
          </button>
          <button
            type="button"
            onClick={() => {
              setFlipped(false)
              setCurrentIndex((prev) =>
                prev < flashCards.length - 1 ? prev + 1 : 0
              )
            }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Next card"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
