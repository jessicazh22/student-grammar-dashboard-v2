"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ErrorPatterns } from "@/components/error-patterns"
import { TrendChart } from "@/components/trend-chart"
import { TranscriptViewer } from "@/components/transcript-viewer"
import { TranscriptList } from "@/components/transcript-list"
import { PatternBreakdown } from "@/components/score-ring"
import { LearningCards } from "@/components/learning-cards"
import { StudyModal } from "@/components/study-modal"
import {
  errorPatterns,
  sampleTranscript,
  transcriptList,
  overallTrend,
  categoryTrend,
} from "@/lib/grammar-data"
import type { ErrorPattern } from "@/lib/grammar-data"

export default function GrammarDashboard() {
  const [activeTranscript, setActiveTranscript] = useState(sampleTranscript.id)
  const [studyPattern, setStudyPattern] = useState<ErrorPattern | null>(null)

  const totalErrors = errorPatterns.reduce((sum, p) => sum + p.count, 0)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader
          studentName="Rina"
          totalErrors={totalErrors}
          totalConversations={9}
          totalPatterns={errorPatterns.length}
        />

        <Tabs defaultValue="overview" className="mt-8">
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

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left column - Patterns */}
              <div className="lg:col-span-2 space-y-6">
                <ErrorPatterns
                  patterns={errorPatterns}
                  onStudy={setStudyPattern}
                />
                <TrendChart
                  overallData={overallTrend}
                  categoryData={categoryTrend}
                />
              </div>
              {/* Right column - Breakdown + Learning */}
              <div className="space-y-6">
                <PatternBreakdown patterns={errorPatterns} />
                <LearningCards patterns={errorPatterns} />
              </div>
            </div>
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <TranscriptList
                  transcripts={transcriptList}
                  activeId={activeTranscript}
                  onSelect={setActiveTranscript}
                />
              </div>
              <div className="lg:col-span-3">
                <TranscriptViewer transcript={sampleTranscript} />
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
