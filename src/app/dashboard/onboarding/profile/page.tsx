"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { businessProfileSchema } from "@/lib/validation"

export default function OnboardingProfilePage() {
  const form = useForm({
    resolver: zodResolver(businessProfileSchema),
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Business Profile</h1>
      <p className="text-muted-foreground">Complete your business profile.</p>
      <Card>
        <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit((data: any) => console.log(data))} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input {...form.register("name")} />
              </div>
              <div>
                <Label>Legal Name</Label>
                <Input {...form.register("legalName")} />
              </div>
            </div>
            <div>
              <Label>Industry</Label>
              <Input {...form.register("industry")} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea {...form.register("description")} />
            </div>
            <div>
              <Label>Location</Label>
              <Input {...form.register("location")} />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
