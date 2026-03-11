"use client"

import { useState } from "react"
import { Check, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TranscriptError, ErrorCategory } from "@/lib/grammar-data"

interface ComparisonExample {
  correct?: string
  incorrect?: string
  note: string
}

interface DiverseExample {
  incorrect: string
  correct: string
}

const COMPARISON_DATA: Record<ErrorCategory, {
  comparisons: ComparisonExample[]
  diverseExamples: DiverseExample[]
}> = {
  "articles": {
    comparisons: [
      {
        correct: "I went to THE market",
        note: "(a specific market you both know about)",
      },
      {
        correct: "I went to A market",
        note: "(any market, introducing it for the first time)",
      },
      {
        incorrect: "I went to market",
        note: "(missing article - sounds incomplete)",
      },
    ],
    diverseExamples: [
      { incorrect: "She is nurse at the hospital", correct: "She is a nurse at the hospital" },
      { incorrect: "My brother wants to become doctor", correct: "My brother wants to become a doctor" },
      { incorrect: "Can you pass me salt?", correct: "Can you pass me the salt?" },
      { incorrect: "I think the happiness is important", correct: "I think happiness is important" },
    ],
  },
  "subject-verb": {
    comparisons: [
      {
        correct: "she PRACTICES every day",
        note: "(one person = add -s)",
      },
      {
        correct: "they PRACTICE every day",
        note: "(multiple people = no -s)",
      },
      {
        incorrect: "she PRACTICE every day",
        note: "(missing -s - sounds wrong)",
      },
    ],
    diverseExamples: [
      { incorrect: "He want to travel abroad", correct: "He wants to travel abroad" },
      { incorrect: "The weather change quickly here", correct: "The weather changes quickly here" },
      { incorrect: "Everyone think she is talented", correct: "Everyone thinks she is talented" },
      { incorrect: "The dog bark whenever someone passes by", correct: "The dog barks whenever someone passes by" },
    ],
  },
  "tense": {
    comparisons: [
      {
        correct: "there was a time we HUNG out",
        note: "(past tense matches the story time)",
      },
      {
        correct: "nowadays we HANG out often",
        note: "(present tense for current habits)",
      },
      {
        incorrect: "there was a time we HANG out",
        note: "(mixing past and present - confusing)",
      },
    ],
    diverseExamples: [
      { incorrect: "When I was young, I decide to study hard", correct: "When I was young, I decided to study hard" },
      { incorrect: "Last year she want to change her major", correct: "Last year she wanted to change her major" },
      { incorrect: "He looked tired because he don't sleep well", correct: "He looked tired because he didn't sleep well" },
      { incorrect: "Yesterday I can finish all my homework", correct: "Yesterday I could finish all my homework" },
    ],
  },
  "verb-patterns": {
    comparisons: [
      {
        correct: "habit OF reading",
        note: "(preposition + verb = always -ing)",
      },
      {
        correct: "I'm here TO answer",
        note: "(purpose = to + verb)",
      },
      {
        incorrect: "habit TO read",
        note: "(missing -ing after preposition)",
      },
    ],
    diverseExamples: [
      { incorrect: "I'm good at speak English", correct: "I'm good at speaking English" },
      { incorrect: "She went to the store for buying milk", correct: "She went to the store to buy milk" },
      { incorrect: "Let them to try", correct: "Let them try" },
      { incorrect: "I enjoy to read books", correct: "I enjoy reading books" },
    ],
  },
  "singular-plural": {
    comparisons: [
      {
        correct: "DOGS are loyal",
        note: "(general statement = plural)",
      },
      {
        correct: "the DOG is barking",
        note: "(one specific dog = singular)",
      },
      {
        incorrect: "DOG are loyal",
        note: "(missing plural form)",
      },
    ],
    diverseExamples: [
      { incorrect: "I have many friend", correct: "I have many friends" },
      { incorrect: "She has two brother", correct: "She has two brothers" },
      { incorrect: "These book are interesting", correct: "These books are interesting" },
      { incorrect: "I like to eat apple", correct: "I like to eat apples" },
    ],
  },
  "prepositions": {
    comparisons: [
      {
        correct: "You look TIRED",
        note: "(look + adjective, no 'like')",
      },
      {
        correct: "It looks LIKE a palace",
        note: "(look like + noun)",
      },
      {
        incorrect: "You look LIKE tired",
        note: "(extra 'like' with adjective)",
      },
    ],
    diverseExamples: [
      { incorrect: "I arrive at Monday", correct: "I arrive on Monday" },
      { incorrect: "She is good in math", correct: "She is good at math" },
      { incorrect: "I'm interested for learning", correct: "I'm interested in learning" },
      { incorrect: "He lives in London Street", correct: "He lives on London Street" },
    ],
  },
  "word-form-choice": {
    comparisons: [
      {
        correct: "I was HESITANT",
        note: "(adjective after 'was')",
      },
      {
        correct: "I HESITATED before answering",
        note: "(past tense verb, different structure)",
      },
      {
        incorrect: "I was HESITATED",
        note: "(wrong form after 'was')",
      },
    ],
    diverseExamples: [
      { incorrect: "I was very exciting about the trip", correct: "I was very excited about the trip" },
      { incorrect: "The movie was very bored", correct: "The movie was very boring" },
      { incorrect: "She is very confusing", correct: "She is very confused" },
      { incorrect: "This book is very interested", correct: "This book is very interesting" },
    ],
  },
  "style": {
    comparisons: [
      {
        correct: "friendship matters",
        note: "(clearer, more direct)",
      },
      {
        correct: "friendship is important",
        note: "(also correct, slightly wordier)",
      },
    ],
    diverseExamples: [
      { incorrect: "I think that maybe it could be possible", correct: "It might be possible" },
      { incorrect: "Due to the fact that", correct: "Because" },
      { incorrect: "In spite of the fact that", correct: "Although" },
      { incorrect: "At this point in time", correct: "Now" },
    ],
  },
}

export function ErrorPopoverComparison({
  error,
  onAccept,
  onDismiss,
}: {
  error: TranscriptError
  onAccept: (id: string) => void
  onDismiss: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const isSuggestion = error.kind === "suggestion"
  const data = COMPARISON_DATA[error.category]

  if (!data) {
    return null
  }

  return (
    <div className="w-[320px] sm:w-[360px]">
      <div className="space-y-3 px-1">
        {/* Comparison section - ALWAYS visible */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
            <div className="h-px flex-1 bg-muted-foreground/20" />
            COMPARE THESE
            <div className="h-px flex-1 bg-muted-foreground/20" />
          </div>

          {data.comparisons.map((comp, idx) => (
            <div key={idx} className="flex items-start gap-2 py-1">
              <div className="shrink-0 mt-0.5">
                {comp.incorrect ? (
                  <X className="h-4 w-4 text-destructive" />
                ) : (
                  <Check className="h-4 w-4 text-success" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium leading-tight",
                  comp.incorrect ? "text-destructive" : "text-foreground"
                )}>
                  {comp.correct || comp.incorrect}
                </p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                  {comp.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Diverse examples - only when expanded */}
        {expanded && data.diverseExamples.length > 0 && (
          <div className="space-y-1.5 pt-1 animate-in slide-in-from-top-2 fade-in-0 duration-200">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
              <div className="h-px flex-1 bg-muted-foreground/20" />
              MORE EXAMPLES
              <div className="h-px flex-1 bg-muted-foreground/20" />
            </div>

            {data.diverseExamples.map((ex, idx) => (
              <div key={idx} className="space-y-0.5 py-1">
                <div className="flex items-start gap-2">
                  <X className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive leading-tight">{ex.incorrect}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground font-medium leading-tight">{ex.correct}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toggle button */}
        {data.diverseExamples.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            {expanded ? (
              <>
                Hide examples
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Show more examples
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Action buttons - PROMINENT */}
      <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border">
        <button
          type="button"
          onClick={() => onAccept(error.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer shadow-sm",
            isSuggestion
              ? "bg-suggestion text-suggestion-foreground hover:bg-suggestion/90 hover:shadow-md"
              : "bg-success text-success-foreground hover:bg-success/90 hover:shadow-md"
          )}
        >
          <Check className="h-4 w-4" />
          {isSuggestion ? "Got it" : "Accept"}
        </button>
        <button
          type="button"
          onClick={() => onDismiss(error.id)}
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <X className="h-4 w-4" />
          Dismiss
        </button>
      </div>
    </div>
  )
}
