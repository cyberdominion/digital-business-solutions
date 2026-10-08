export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default async function AdminOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams
  const where: Record<string, unknown> = {}
  if (search) {
    where.OR = [{ application: { businessName: { contains: search, mode: "insensitive" } } }]
  }

  const projects = await prisma.onboardingProject.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { application: true, organization: true, steps: true, tasks: true },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <p className="text-muted-foreground">Track onboarding progress for all businesses.</p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-10" name="search" defaultValue={search} />
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{project.application?.businessName ?? "Unknown"}</CardTitle>
                <Badge>{project.status}</Badge>
              </div>
              <CardTitle className="text-sm font-medium">
                {project.organization?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    Steps: {project.steps.filter((s) => s.status === "COMPLETED").length}/{project.steps.length}
                  </div>
                  <div>
                    Tasks: {project.tasks.filter((t) => t.status !== "COMPLETED").length} pending
                  </div>
                </div>
                {project.startedAt && (
                  <p className="text-xs text-muted-foreground">
                    Started: {new Date(project.startedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
