"use client"

import { FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TranscriptItem {
  id: string
  title: string
  date: string
  score: number
}

function scoreColor(score: number) {
  if (score >= 80) return "text-success"
  if (score >= 65) return "text-warning-foreground"
  return "text-destructive"
}

function scoreBg(score: number) {
  if (score >= 80) return "bg-success/10"
  if (score >= 65) return "bg-warning/10"
  return "bg-destructive/10"
}

export function TranscriptList({
  transcripts,
  activeId,
  onSelect,
}: {
  transcripts: TranscriptItem[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Recent Transcripts
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Select a transcript to review inline
        </p>
      </CardHeader>
      <CardContent className="space-y-1">
        {transcripts.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer",
              activeId === t.id
                ? "bg-primary/5 border border-primary/20"
                : "hover:bg-muted border border-transparent"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                activeId === t.id ? "bg-primary/10" : "bg-muted"
              )}
            >
              <FileText className={cn(
                "h-4 w-4",
                activeId === t.id ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium truncate",
                activeId === t.id ? "text-foreground" : "text-foreground"
              )}>
                {t.title}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {new Date(t.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold tabular-nums",
                scoreBg(t.score),
                scoreColor(t.score)
              )}
            >
              {t.score}
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
