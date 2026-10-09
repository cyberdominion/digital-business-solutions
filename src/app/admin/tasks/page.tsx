export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import Link from "next/link"
import { Plus, Bot, Sparkles, Zap, Clock, CheckCircle, AlertTriangle, Building2, User, MessageSquare } from "lucide-react"

const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
]

const typeOptions = [
  { value: "ONBOARDING", label: "Onboarding" },
  { value: "TECHNICAL", label: "Technical" },
  { value: "CONTENT", label: "Content" },
  { value: "DESIGN", label: "Design" },
  { value: "REVIEW", label: "Review" },
  { value: "OTHER", label: "Other" },
]

const statusOptions = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "REVIEW", label: "Review" },
  { value: "COMPLETED", label: "Completed" },
]

const priorityColors: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-blue-100 text-blue-800",
  HIGH: "bg-amber-100 text-amber-800",
  URGENT: "bg-red-100 text-red-800",
}

const statusColors: Record<string, string> = {
  TODO: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  REVIEW: "bg-amber-100 text-amber-800",
  COMPLETED: "bg-green-100 text-green-800",
}

export default async function AdminTasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { organization: true, assignee: true },
  })

  const organizations = await prisma.organization.findMany({
    orderBy: { name: "asc" },
  })

  const admins = await prisma.user.findMany({
    where: { role: { in: ["PLATFORM_ADMIN", "PLATFORM_OWNER"] } },
    orderBy: { name: "asc" },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Tasks</h1>
          <p className="text-muted-foreground">Manage internal tasks and onboarding milestones.</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="transition-bounce hover:shadow-glow flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gradient flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Create New Task
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4" action="/api/admin/tasks/create" method="POST">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                  <Input id="title" name="title" placeholder="Enter task title" required />
                </div>
                <div>
                  <Label htmlFor="type" className="text-sm font-medium">Type *</Label>
                  <Select name="type" defaultValue="OTHER" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium">Priority *</Label>
                  <Select name="priority" defaultValue="MEDIUM" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status" className="text-sm font-medium">Status *</Label>
                  <Select name="status" defaultValue="TODO" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="organizationId" className="text-sm font-medium">Organization (Optional)</Label>
                  <Select name="organizationId">
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Organization</SelectItem>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assigneeId" className="text-sm font-medium">Assignee (Optional)</Label>
                  <Select name="assigneeId">
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to admin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {admins.map((admin) => (
                        <SelectItem key={admin.id} value={admin.id}>{admin.name ?? admin.email}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate" className="text-sm font-medium">Due Date</Label>
                  <Input id="dueDate" name="dueDate" type="date" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea id="description" name="description" placeholder="Task details, requirements, notes..." rows={4} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" asChild>
                <DialogClose>Cancel</DialogClose>
              </Button>
                <Button type="submit" className="transition-bounce hover:shadow-glow">
                  Create Task
                </Button>
              </div>
            </form>
            
            {/* AI Task Assignment */}
            <hr className="my-6 border-border/50" />
            <div className="space-y-4 p-4 bg-gradient-to-br from-primary/5 to-accent-purple/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-gradient">AI Task Assignment</h4>
                  <p className="text-sm text-muted-foreground">Let AI analyze workload and suggest optimal task assignments</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full transition-smooth hover:bg-primary/10 hover:text-primary flex items-center justify-center gap-2"
                onClick={() => alert("AI Assignment: Analyzing admin workloads... (integration pending)")}
              >
                <Sparkles className="h-4 w-4" />
                <span>Run AI Assignment Analysis</span>
                <Zap className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">AI will consider: current workload, expertise, priority, due dates, and task type</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-gradient flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                All Tasks
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Organization</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Assignee</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-b border-border/30 text-sm hover:bg-muted/30 transition-smooth">
                    <td className="py-4">
                      <p className="font-medium text-gradient">{t.title}</p>
                      {t.description && <p className="text-xs text-muted-foreground line-clamp-1">{t.description}</p>}
                    </td>
                    <td className="py-4 text-muted-foreground">{t.organization?.name ?? "—"}</td>
                    <td className="py-4">
                      <Badge className="bg-primary/10 text-primary">{t.type}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge className={priorityColors[t.priority] ?? "bg-gray-100 text-gray-800"}>{t.priority}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge className={statusColors[t.status] ?? "bg-gray-100 text-gray-800"}>{t.status}</Badge>
                    </td>
                    <td className="py-4">
                      {t.assignee ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{t.assignee.name ?? t.assignee.email}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {t.dueDate ? (
                        <span className={new Date(t.dueDate) < new Date() && t.status !== "COMPLETED" ? "text-red-500 font-medium" : ""}>
                          {new Date(t.dueDate).toLocaleDateString()}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="py-4 text-right">
                      <Link href={`/admin/tasks/${t.id}`} className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth flex items-center gap-1">
                        View
                        <MessageSquare className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
