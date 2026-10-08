export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AdminTasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { organization: true },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tasks</h1>
      <p className="text-muted-foreground">Manage internal tasks and onboarding milestones.</p>
      <Card>
        <CardHeader><CardTitle>All Tasks</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Title</th>
                <th className="pb-3">Organization</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-b text-sm">
                  <td className="py-3">{t.title}</td>
                  <td className="py-3">{t.organization?.name ?? "—"}</td>
                  <td className="py-3">{t.type}</td>
                  <td className="py-3">
                    <Badge variant={t.priority === "URGENT" ? "destructive" : "secondary"}>{t.priority}</Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant={t.status === "COMPLETED" ? "default" : "secondary"}>{t.status}</Badge>
                  </td>
                  <td className="py-3">
                    {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
