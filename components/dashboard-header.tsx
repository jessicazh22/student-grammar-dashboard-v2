"use client"

import { BookOpen, MessageSquare, AlertCircle, Layers } from "lucide-react"

export function DashboardHeader({
  studentName,
  totalErrors,
  totalConversations,
  totalPatterns,
}: {
  studentName: string
  totalErrors: number
  totalConversations: number
  totalPatterns: number
}) {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            GrammarLens
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          Hi {studentName} -- here are your speaking patterns from{" "}
          {totalConversations} recorded{" "}
          {totalConversations === 1 ? "conversation" : "conversations"}.{" "}
          {totalConversations === 1
            ? "This is an early preview -- explore your transcript and let us know what you think!"
            : "Focus on one pattern at a time."}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3">
        <div className="flex flex-col items-center rounded-xl border border-border bg-card px-3 py-2.5 sm:px-4 sm:py-3 sm:min-w-[80px]">
          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground mb-1" />
          <span className="text-lg sm:text-xl font-bold text-foreground tabular-nums">
            {totalConversations}
          </span>
          <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Analysed
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border bg-card px-3 py-2.5 sm:px-4 sm:py-3 sm:min-w-[80px]">
          <AlertCircle className="h-3.5 w-3.5 text-muted-foreground mb-1" />
          <span className="text-lg sm:text-xl font-bold text-foreground tabular-nums">
            {totalErrors}
          </span>
          <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Errors
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border bg-card px-3 py-2.5 sm:px-4 sm:py-3 sm:min-w-[80px]">
          <Layers className="h-3.5 w-3.5 text-muted-foreground mb-1" />
          <span className="text-lg sm:text-xl font-bold text-foreground tabular-nums">
            {totalPatterns}
          </span>
          <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Patterns
          </span>
        </div>
      </div>
    </header>
  )
}
