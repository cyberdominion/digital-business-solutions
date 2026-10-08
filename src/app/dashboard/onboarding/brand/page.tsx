"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OnboardingBrandPage() {
  const [color, setColor] = useState("#0ea5e9")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Brand Identity</h1>
      <Card>
        <CardHeader><CardTitle>Brand Colors</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Primary Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-8 rounded cursor-pointer"
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>
          <Button onClick={() => alert("Brand saved")}>Save</Button>
        </CardContent>
      </Card>
    </div>
  )
}