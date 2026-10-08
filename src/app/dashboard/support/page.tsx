"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function SupportPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="text-muted-foreground">Contact support.</p>
      <Card>
        <CardHeader><CardTitle>Create Support Ticket</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue" />
          </div>
          <Button disabled={!subject || !message}>Submit</Button>
        </CardContent>
      </Card>
    </div>
  )
}