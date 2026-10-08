import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AdminModulesPage() {
  const modules = [
    { id: "1", name: "Fashion", status: "active" },
    { id: "2", name: "Food", status: "active" },
    { id: "3", name: "Real Estate", status: "planned" },
    { id: "4", name: "CRM", status: "planned" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Modules</h1>
        <Button>Add Module</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Industry Modules</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Name</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.id} className="border-b text-sm">
                  <td className="py-3">{m.name}</td>
                  <td className="py-3">{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
