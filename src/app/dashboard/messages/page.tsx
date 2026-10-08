export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function MessagesPage() {
  const messages = await prisma.supportTicket.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      <p className="text-muted-foreground">Your conversations and support tickets.</p>
      <Card>
        <CardHeader><CardTitle>Messages</CardTitle></CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="border rounded-lg p-4">
                  <h3 className="font-medium">{m.subject}</h3>
                  <p className="text-sm text-muted-foreground">{m.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
          <Button className="mt-4">New Message</Button>
        </CardContent>
      </Card>
    </div>
  )
}