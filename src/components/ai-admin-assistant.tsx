"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, X, Send, Sparkles, Zap, Loader2, MessageSquare, Trash2, Copy } from "lucide-react"
import { cn } from "cn"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const AI_PROMPTS = [
  "Show me pending applications",
  "Summarize this week's payments",
  "Create onboarding tasks for new approvals",
  "Check overdue onboarding milestones",
  "Generate weekly admin report",
  "Find applications stuck in review",
]

export function AIAdminAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Admin Assistant. I can help you with application reviews, payment tracking, task management, onboarding oversight, and generating reports. What would you like to do?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500))

    const responses: Record<string, string> = {
      "pending applications": "Found 3 applications pending review: 'TechStart Lagos' (submitted 2h ago), 'Green Gardens' (submitted 1 day ago), 'Urban Eats' (submitted 3 days ago). Would you like me to create review tasks for these?",
      "payments": "This week: 12 successful payments (₦600,000), 3 pending, 1 failed. Total revenue: ₦2,400,000 this month. The failed payment was for 'Bella Fashion' - insufficient funds.",
      "onboarding tasks": "Created 5 onboarding tasks for newly approved businesses. Assigned to admin team based on workload. Tasks include: domain setup, content collection, design review, and launch prep.",
      "overdue": "2 onboarding milestones overdue: 'Style Hub' (domain setup, 3 days late), 'Foodie Delight' (content submission, 1 day late). Auto-reminders sent.",
      "weekly report": "Weekly Admin Report (Week 41):\n- Applications: 8 new, 3 approved, 1 rejected\n- Payments: ₦400,000 collected\n- Onboarding: 5 started, 2 completed\n- Live sites: 1 launched\n- Avg response time: 18h",
      "stuck in review": "4 applications in review > 5 days: 'City Motors' (8 days), 'Beauty Box' (6 days), 'TechFix' (6 days), 'Green Thumb' (5 days). Recommended: escalate to senior reviewer.",
    }

    const lowerInput = userInput.toLowerCase()
    let response = "I can help with: application reviews, payment summaries, task creation, onboarding tracking, reports, and finding stuck items. Try asking: 'Show pending applications' or 'Generate weekly report'."

    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        response = value
        break
      }
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsLoading(false)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI Admin Assistant. I can help you with application reviews, payment tracking, task management, onboarding oversight, and generating reports. What would you like to do?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button 
          variant="outline" 
          className="transition-smooth hover:bg-primary/10 hover:text-primary flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[70vh]">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-gradient flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Admin Assistant
          </DialogTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            className="text-muted-foreground hover:text-destructive"
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <ScrollArea className="h-[50vh] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "rounded-2xl px-4 py-3 max-w-[75%]",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted/50 text-foreground rounded-bl-md border border-border/50"
                )}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className={cn("text-xs mt-1", msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-muted/50 rounded-2xl p-4 max-w-[75%] border border-border/50">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t pt-4">
          <div className="flex gap-2 mb-3">
            {AI_PROMPTS.slice(0, 3).map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                size="sm"
                className="text-xs h-auto px-3 py-1.5 transition-smooth hover:bg-primary/10 hover:text-primary"
                onClick={() => {
                  setInput(prompt)
                  handleSend()
                }}
              >
                {prompt}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask about applications, payments, tasks, onboarding..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="transition-bounce hover:shadow-glow">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}