export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default async function OnboardingPage() {
  const project = await prisma.onboardingProject.findFirst({
    include: { steps: true, tasks: true, application: true },
  })

  if (!project) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Onboarding</h1>
        <p className="text-muted-foreground">No onboarding project found.</p>
      </div>
    )
  }

  const totalSteps = project.steps.length
  const completedSteps = project.steps.filter((s) => s.status === "COMPLETED").length
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <p className="text-muted-foreground">Complete your onboarding to get your website built.</p>

      <Card>
        <CardHeader>
          <CardTitle>{project.application?.businessName}</CardTitle>
          <CardDescription>Onboarding Progress: {completedSteps}/{totalSteps}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-4 mb-4" />
          <p className="text-sm text-muted-foreground mb-4">{Math.round(progress)}% complete</p>
          <div className="space-y-4">
            {project.steps.map((step) => (
              <div key={step.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{step.label}</h3>
                  <p className="text-sm text-muted-foreground">Status: {step.status}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/onboarding/${step.key}`}>
                    {step.status === "COMPLETED" ? "Review" : "Start"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
