"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, FileText, Clock, Sparkles } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TranscriptViewer } from "@/components/transcript-viewer"
import { TranscriptList } from "@/components/transcript-list"
import { StudyModal } from "@/components/study-modal"
import { ErrorPatterns } from "@/components/error-patterns"
import { AccuracyScore } from "@/components/score-ring"
import { LearningCards } from "@/components/learning-cards"
import {
  gloriaTranscript,
  gloriaMovieTranscript,
  gloriaTranscriptList,
  gloriaErrorPatterns,
} from "@/lib/gloria-data"
import type { ErrorPattern } from "@/lib/grammar-data"

function ComingSoonOverview() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-5">
          <Clock className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Overview Coming Soon
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
          The overview tab will show your grammar patterns, progress over time,
          and a breakdown of error categories once we have analysed more of your
          conversations. For now, head to the{" "}
          <span className="font-medium text-foreground">
            Transcript Review
          </span>{" "}
          tab to explore your first transcript with inline corrections.
        </p>
        <div className="flex items-center gap-2 rounded-full bg-primary/5 border border-primary/10 px-4 py-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">
            2 transcripts analysed so far -- more coming soon
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

const transcriptsMap: Record<string, typeof gloriaTranscript> = {
  [gloriaTranscript.id]: gloriaTranscript,
  [gloriaMovieTranscript.id]: gloriaMovieTranscript,
}

export default function GloriaDashboard() {
  const [activeTranscriptId, setActiveTranscriptId] = useState(
    gloriaTranscriptList[0].id
  )
  const [studyPattern, setStudyPattern] = useState<ErrorPattern | null>(null)

  const activeTranscript = transcriptsMap[activeTranscriptId] ?? gloriaTranscript
  const totalErrors = gloriaErrorPatterns.reduce((sum, p) => sum + p.count, 0)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader
          studentName="Gloria"
          totalErrors={totalErrors}
          totalConversations={2}
          totalPatterns={gloriaErrorPatterns.length}
        />

        <Tabs defaultValue="transcript" className="mt-8">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview" className="gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="transcript" className="gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Transcript Review
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Coming Soon */}
          <TabsContent value="overview" className="mt-6">
            <ComingSoonOverview />
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-1 space-y-6">
                <TranscriptList
                  transcripts={gloriaTranscriptList}
                  activeId={activeTranscriptId}
                  onSelect={setActiveTranscriptId}
                />
                <AccuracyScore patterns={gloriaErrorPatterns} />
                <LearningCards patterns={gloriaErrorPatterns} />
              </div>
              <div className="lg:col-span-3 space-y-6">
                <TranscriptViewer transcript={activeTranscript} />
                <ErrorPatterns
                  patterns={gloriaErrorPatterns}
                  onStudy={setStudyPattern}
                  layout="horizontal"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Study Modal */}
      {studyPattern && (
        <StudyModal
          pattern={studyPattern}
          onClose={() => setStudyPattern(null)}
        />
      )}
    </main>
  )
}
