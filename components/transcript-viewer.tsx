"use client"

import { useState, useMemo, Fragment } from "react"
import {
  ArrowRight,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Filter,
  Lightbulb,
  GitFork,
  MessageSquareText,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Transcript, TranscriptError, ErrorCategory } from "@/lib/grammar-data"
import { categoryMeta } from "@/lib/grammar-data"
import { cn } from "@/lib/utils"

function ErrorPopover({
  error,
  onAccept,
  onDismiss,
}: {
  error: TranscriptError
  onAccept: (id: string) => void
  onDismiss: (id: string) => void
}) {
  const meta = categoryMeta[error.category] ?? { label: error.category, color: "var(--chart-1)" }
  const isSuggestion = error.kind === "suggestion"
  const hasAlternatives = error.alternatives && error.alternatives.length > 0

  return (
    <div className="w-[320px] space-y-3">
      {/* Header badge */}
      <div className="flex items-center gap-2">
        {isSuggestion ? (
          <Badge
            variant="outline"
            className="text-[10px] uppercase tracking-wider font-semibold border-suggestion/40 text-suggestion bg-suggestion/5"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            {meta.label}
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-[10px] uppercase tracking-wider font-semibold"
          >
            {meta.label}
          </Badge>
        )}
      </div>

      {/* Original text */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            "text-sm px-1.5 py-0.5 rounded",
            isSuggestion
              ? "text-suggestion bg-suggestion/5 border border-dashed border-suggestion/30"
              : "line-through text-destructive/80 bg-destructive/5"
          )}
        >
          {error.original}
        </span>
        {!hasAlternatives && (
          <>
            <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
            <span className="text-sm text-success bg-success/5 px-1.5 py-0.5 rounded font-medium">
              {error.correction}
            </span>
          </>
        )}
      </div>

      {/* Explanation */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        {error.explanation}
      </p>

      {/* Branching alternatives */}
      {hasAlternatives && (
        <div className="relative space-y-0 pt-0.5">
          {/* Branch connector line */}
          <div className="flex items-center gap-2 pb-2">
            <GitFork className={cn(
              "h-3.5 w-3.5 rotate-180",
              isSuggestion ? "text-suggestion" : "text-success"
            )} />
            <span className={cn(
              "text-[10px] font-semibold uppercase tracking-wider",
              isSuggestion ? "text-suggestion" : "text-success"
            )}>
              {isSuggestion ? "Try either" : "Two ways to fix"}
            </span>
          </div>
          <div className="space-y-2 ml-1 border-l-2 border-dashed border-muted-foreground/20 pl-3">
            {error.alternatives!.map((alt, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg border px-3 py-2.5 space-y-1",
                  isSuggestion
                    ? "border-suggestion/20 bg-suggestion/5"
                    : "border-success/20 bg-success/5"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "inline-flex items-center justify-center h-4 w-4 rounded-full text-[9px] font-bold shrink-0",
                    isSuggestion
                      ? "bg-suggestion/15 text-suggestion"
                      : "bg-success/15 text-success"
                  )}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {alt.label}
                  </span>
                </div>
                <p className={cn(
                  "text-sm font-medium",
                  isSuggestion ? "text-suggestion" : "text-success"
                )}>
                  {alt.correction}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {alt.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rule box */}
      <div className={cn(
        "rounded-md px-2.5 py-2 border",
        isSuggestion
          ? "bg-suggestion/5 border-suggestion/10"
          : "bg-primary/5 border-primary/10"
      )}>
        <span className={cn(
          "text-[10px] font-semibold uppercase tracking-wider",
          isSuggestion ? "text-suggestion" : "text-primary"
        )}>
          {isSuggestion ? "Tip" : "Rule"}
        </span>
        <p className="text-xs text-foreground mt-0.5 leading-relaxed">
          {error.rule}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => onAccept(error.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
            isSuggestion
              ? "bg-suggestion text-suggestion-foreground hover:bg-suggestion/90"
              : "bg-success text-success-foreground hover:bg-success/90"
          )}
        >
          <Check className="h-3.5 w-3.5" />
          {isSuggestion ? "Got it" : "Accept"}
        </button>
        <button
          type="button"
          onClick={() => onDismiss(error.id)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
          Dismiss
        </button>
      </div>
    </div>
  )
}

interface AnnotatedSegment {
  type: "text" | "error"
  content: string
  error?: TranscriptError
}

function buildAnnotatedSegments(
  content: string,
  errors: TranscriptError[]
): AnnotatedSegment[] {
  // Sort errors by startIndex to process them in order
  const sorted = [...errors].sort((a, b) => a.startIndex - b.startIndex)
  const segments: AnnotatedSegment[] = []
  let cursor = 0

  for (const error of sorted) {
    // Find the error text in the content near the expected position
    const searchStart = Math.max(0, error.startIndex - 20)
    const searchEnd = Math.min(content.length, error.endIndex + 20)
    const searchRegion = content.substring(searchStart, searchEnd)
    const idx = searchRegion.indexOf(error.original)
    
    let actualStart: number
    let actualEnd: number
    
    if (idx !== -1) {
      actualStart = searchStart + idx
      actualEnd = actualStart + error.original.length
    } else {
      // Fallback to provided indices
      actualStart = error.startIndex
      actualEnd = error.endIndex
    }

    if (actualStart < cursor) continue
    
    // Add text before this error
    if (actualStart > cursor) {
      segments.push({
        type: "text",
        content: content.substring(cursor, actualStart),
      })
    }

    // Add the error segment
    segments.push({
      type: "error",
      content: content.substring(actualStart, actualEnd),
      error,
    })

    cursor = actualEnd
  }

  // Add remaining text
  if (cursor < content.length) {
    segments.push({
      type: "text",
      content: content.substring(cursor),
    })
  }

  return segments
}

export function TranscriptViewer({
  transcript,
}: {
  transcript: Transcript
}) {
  const [accepted, setAccepted] = useState<Set<string>>(new Set())
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<ErrorCategory | "all">("all")
  const [activeErrorIndex, setActiveErrorIndex] = useState(0)

  const activeErrors = useMemo(() => {
    return transcript.errors.filter(
      (e) => !accepted.has(e.id) && !dismissed.has(e.id)
    )
  }, [transcript.errors, accepted, dismissed])

  const filteredErrors = useMemo(() => {
    if (activeFilter === "all") return activeErrors
    return activeErrors.filter((e) => e.category === activeFilter)
  }, [activeErrors, activeFilter])

  const visibleErrors = useMemo(() => {
    if (activeFilter === "all") return transcript.errors.filter(e => !accepted.has(e.id) && !dismissed.has(e.id))
    return transcript.errors.filter(e => !accepted.has(e.id) && !dismissed.has(e.id) && e.category === activeFilter)
  }, [transcript.errors, accepted, dismissed, activeFilter])

  const segments = useMemo(
    () => buildAnnotatedSegments(transcript.content, visibleErrors),
    [transcript.content, visibleErrors]
  )

  const handleAccept = (id: string) => {
    setAccepted((prev) => new Set(prev).add(id))
  }

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id))
  }

  const errorCategories = useMemo(() => {
    const cats = new Map<ErrorCategory, number>()
    for (const e of activeErrors) {
      cats.set(e.category, (cats.get(e.category) || 0) + 1)
    }
    return cats
  }, [activeErrors])

  const totalResolved = accepted.size + dismissed.size
  const totalOriginal = transcript.errors.length

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              {transcript.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(transcript.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              {activeErrors.filter(e => e.kind !== "suggestion").length} errors
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-full bg-suggestion/60" />
              {activeErrors.filter(e => e.kind === "suggestion").length} suggestions
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
              {totalResolved} resolved
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="text-xs font-medium text-foreground tabular-nums">
              {totalOriginal > 0
                ? Math.round((totalResolved / totalOriginal) * 100)
                : 100}
              % done
            </div>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer",
              activeFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All ({activeErrors.length})
          </button>
          {Array.from(errorCategories.entries()).map(([cat, count]) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer",
                activeFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {(categoryMeta[cat] ?? { label: cat }).label} ({count})
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Navigation bar for errors */}
        {filteredErrors.length > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
            <button
              type="button"
              onClick={() =>
                setActiveErrorIndex((prev) =>
                  prev > 0 ? prev - 1 : filteredErrors.length - 1
                )
              }
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Previous error"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
            </button>
            <span className="text-xs font-medium text-foreground tabular-nums">
              Error {Math.min(activeErrorIndex + 1, filteredErrors.length)} of{" "}
              {filteredErrors.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setActiveErrorIndex((prev) =>
                  prev < filteredErrors.length - 1 ? prev + 1 : 0
                )
              }
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Next error"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Collapsible prompt card */}
        {transcript.prompt && (
          <Collapsible defaultOpen={false} className="mb-4">
            <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <MessageSquareText className="h-4 w-4 text-primary shrink-0" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    Speaking Prompt
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line mt-2.5 ml-6.5">
                  {transcript.prompt}
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* Annotated transcript */}
        <div className="rounded-xl border border-border bg-muted/20 p-5 text-sm leading-7 text-foreground font-sans whitespace-pre-wrap">
          {segments.map((segment, i) => {
            if (segment.type === "text") {
              return <Fragment key={i}>{segment.content}</Fragment>
            }

            const error = segment.error!
            const isSuggestion = error.kind === "suggestion"

            return (
              <Tooltip key={error.id}>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      "relative cursor-pointer rounded px-0.5 transition-all",
                      isSuggestion
                        ? "bg-suggestion/10 text-suggestion border-b-2 border-dashed border-suggestion/40 hover:bg-suggestion/20 hover:border-suggestion/60"
                        : "bg-destructive/10 text-destructive border-b-2 border-destructive/40 hover:bg-destructive/20 hover:border-destructive/60"
                    )}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      isSuggestion
                        ? `Style suggestion: ${error.original}. Consider: ${error.correction}`
                        : `Grammar error: ${error.original}. Suggested correction: ${error.correction}`
                    }
                  >
                    {segment.content}
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-card text-card-foreground border border-border p-4 shadow-lg"
                >
                  <ErrorPopover
                    error={error}
                    onAccept={handleAccept}
                    onDismiss={handleDismiss}
                  />
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {activeErrors.length === 0 && (
          <div className="mt-4 flex items-center justify-center rounded-lg border border-success/20 bg-success/5 p-4">
            <div className="text-center">
              <Check className="mx-auto h-8 w-8 text-success mb-2" />
              <p className="text-sm font-medium text-foreground">
                All errors reviewed!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Great job working through this transcript.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
