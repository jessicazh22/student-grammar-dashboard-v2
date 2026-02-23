"use client"

import { useState } from "react"
import { Check, X, Volume2, ArrowRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  PatternExercises,
  FillInBlankQuestion,
} from "@/lib/gloria-data"

/* ── Fill-in-the-blank ─────────────────────────────────── */

function FillInBlank({ exercises }: { exercises: FillInBlankQuestion[] }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const q = exercises[current]
  const isCorrect = selected === q.correctIndex
  const answered = selected !== null

  function handleNext() {
    setSelected(null)
    setCurrent((c) => Math.min(c + 1, exercises.length - 1))
  }

  function handleRestart() {
    setSelected(null)
    setCurrent(0)
  }

  const isLast = current === exercises.length - 1

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-foreground">
          Fill in the blank
        </h4>
        <span className="text-xs text-muted-foreground">
          {current + 1} / {exercises.length}
        </span>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <p className="text-sm text-foreground leading-relaxed mb-4 font-medium">
          {q.sentence}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {q.options.map((opt, i) => {
            let variant = "border-border bg-card text-foreground hover:bg-muted/50"
            if (answered && i === q.correctIndex) {
              variant = "border-accent bg-accent/10 text-accent"
            } else if (answered && i === selected && !isCorrect) {
              variant = "border-destructive bg-destructive/5 text-destructive"
            }

            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                onClick={() => setSelected(i)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  answered ? "cursor-default" : "cursor-pointer",
                  variant
                )}
              >
                <span className="flex items-center gap-1.5">
                  {answered && i === q.correctIndex && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  {answered && i === selected && !isCorrect && i !== q.correctIndex && (
                    <X className="h-3.5 w-3.5" />
                  )}
                  {opt}
                </span>
              </button>
            )
          })}
        </div>

        {answered && (
          <div
            className={cn(
              "rounded-lg px-3 py-2.5 text-sm leading-relaxed",
              isCorrect
                ? "bg-accent/10 text-accent"
                : "bg-destructive/5 text-destructive"
            )}
          >
            {isCorrect ? "Correct! " : "Not quite. "}
            {q.explanation}
          </div>
        )}

        {answered && (
          <div className="flex justify-end mt-3">
            {isLast ? (
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restart
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Speaking: Targeted Correction ─────────────────────── */

function CorrectionPractice({
  exercises,
}: {
  exercises: PatternExercises["corrections"]
}) {
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const item = exercises[current]
  const isLast = current === exercises.length - 1

  function handleNext() {
    setRevealed(false)
    setCurrent((c) => Math.min(c + 1, exercises.length - 1))
  }

  function handleRestart() {
    setRevealed(false)
    setCurrent(0)
  }

  // Parse **bold** markers into spans
  function renderCorrected(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className="font-bold text-accent">
            {part.slice(2, -2)}
          </span>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">
          {current + 1} / {exercises.length}
        </span>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Original (with error)
          </span>
          <p className="text-sm text-destructive/80 leading-relaxed mt-1 line-through">
            {item.original}
          </p>
        </div>

        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors cursor-pointer w-full justify-center"
          >
            <Volume2 className="h-3.5 w-3.5" />
            Say the corrected version, then tap to check
          </button>
        ) : (
          <>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Corrected version
              </span>
              <p className="text-sm text-foreground leading-relaxed mt-1">
                {renderCorrected(item.corrected)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.tip}
            </p>
            <div className="flex justify-end">
              {isLast ? (
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restart
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Speaking: Repeat After Me ─────────────────────────── */

function RepeatPractice({
  exercises,
}: {
  exercises: PatternExercises["repeatAfterMe"]
}) {
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  function toggleDone(i: number) {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3">
        Read each sentence aloud. Focus on getting every verb in its past form.
      </p>
      <div className="space-y-2">
        {exercises.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggleDone(i)}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-left text-sm leading-relaxed transition-colors cursor-pointer",
              completed.has(i)
                ? "border-accent/30 bg-accent/5 text-accent"
                : "border-border bg-card text-foreground hover:bg-muted/30"
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  completed.has(i)
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {completed.has(i) ? (
                  <Check className="h-3 w-3" />
                ) : (
                  i + 1
                )}
              </span>
              {item.sentence}
            </span>
          </button>
        ))}
      </div>
      {completed.size === exercises.length && (
        <p className="text-xs text-accent mt-3 font-medium">
          All done -- nice work!
        </p>
      )}
    </div>
  )
}

/* ── Speaking section with toggle ──────────────────────── */

function SpeakingSection({
  exercises,
}: {
  exercises: PatternExercises
}) {
  const [mode, setMode] = useState<"correct" | "repeat">("correct")

  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-3">
        Speaking practice
      </h4>

      {/* Toggle */}
      <div className="flex rounded-lg border border-border bg-muted/30 p-0.5 mb-4">
        <button
          type="button"
          onClick={() => setMode("correct")}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
            mode === "correct"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Correct It
        </button>
        <button
          type="button"
          onClick={() => setMode("repeat")}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
            mode === "repeat"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Repeat It
        </button>
      </div>

      {mode === "correct" ? (
        <CorrectionPractice exercises={exercises.corrections} />
      ) : (
        <RepeatPractice exercises={exercises.repeatAfterMe} />
      )}
    </div>
  )
}

/* ── Main PracticeExercises ────────────────────────────── */

export function PracticeExercises({
  exercises,
}: {
  exercises: PatternExercises | undefined
}) {
  if (!exercises) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">
          More practice exercises coming soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <FillInBlank exercises={exercises.fillInBlanks} />
      <div className="border-t border-border" />
      <SpeakingSection exercises={exercises} />
    </div>
  )
}
