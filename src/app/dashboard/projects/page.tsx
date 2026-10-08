export const dynamic = "force-dynamic"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const projects = [
    {
      id: "1",
      name: "Website Development",
      organization: "Patience Sewing",
      status: "development",
      progress: 62,
    },
    {
      id: "2",
      name: "Website Development",
      organization: "Local Kitchen",
      status: "content-ready",
      progress: 25,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="text-muted-foreground">Your website development projects.</p>
      <div className="space-y-4">
        {projects.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{p.organization}</p>
              </CardContent>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress: {p.progress}%</span>
                  <Badge>{p.status}</Badge>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}