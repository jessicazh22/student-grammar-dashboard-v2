"use client"

import { useEffect, useRef } from "react"
import { X, AlertTriangle, Lightbulb } from "lucide-react"
import type { ErrorPattern } from "@/lib/grammar-data"
import { cn } from "@/lib/utils"

export function StudyModal({
  pattern,
  onClose,
}: {
  pattern: ErrorPattern
  onClose: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 backdrop-blur-sm pt-8 pb-8 px-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Study: ${pattern.name}`}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl border-b border-border bg-card px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {pattern.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-8">
          {/* Full explanation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              How it works
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pattern.studyContent.fullExplanation}
            </p>
          </div>

          {/* Rule tables */}
          {pattern.studyContent.tables.map((t, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t.title}
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      {t.table.headers.map((h, i) => (
                        <th
                          key={i}
                          className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.table.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={cn(
                          "border-t border-border",
                          ri % 2 === 0 ? "bg-card" : "bg-muted/20"
                        )}
                      >
                        {row.cells.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-3 py-2.5 text-foreground leading-relaxed"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Decision guide */}
          {pattern.studyContent.decisionGuide && (
            <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Core Decision
                  </span>
                  <p className="text-sm text-foreground mt-1 leading-relaxed">
                    {pattern.studyContent.decisionGuide}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tricky spots */}
          {pattern.studyContent.trickySpots.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                Watch out for
              </h3>
              <ul className="space-y-2">
                {pattern.studyContent.trickySpots.map((spot, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-warning/5 border border-warning/10 px-4 py-3 text-sm text-foreground leading-relaxed"
                  >
                    {spot}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Your examples recap */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Your examples
            </h3>
            <div className="space-y-2">
              {pattern.examples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-muted/20 px-4 py-3"
                >
                  <div className="flex items-start gap-2 flex-wrap">
                    <span className="text-sm line-through text-destructive/80 bg-destructive/5 px-2 py-0.5 rounded">
                      {ex.incorrect}
                    </span>
                    <span className="text-muted-foreground text-sm" aria-hidden="true">
                      {"\u2192"}
                    </span>
                    <span className="text-sm text-accent bg-accent/10 px-2 py-0.5 rounded font-medium">
                      {ex.correct}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {ex.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
