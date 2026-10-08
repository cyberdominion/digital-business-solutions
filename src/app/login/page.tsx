"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validation"
import { useState } from "react"
import { Loader2, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginInput) {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json().catch(() => null)

      if (!result) {
        setError("Server error. Please try again later or contact support.")
      } else if (!result.success) {
        setError(result.error?.message ?? "Login failed. Please check your credentials.")
      } else {
        window.location.href = "/dashboard"
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              Back to Home
            </Link>
          </div>

        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Enter your email to sign in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    disabled={isLoading}
                    className="pl-10 transition-smooth focus:shadow-glow"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="pl-10 transition-smooth focus:shadow-glow"
                    {...form.register("password")}
                  />
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full shadow-medium hover:shadow-strong transition-bounce hover-lift"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-smooth">
                Create Account
              </Link>
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="h-px bg-border flex-1"></span>
                <span>Or continue with</span>
                <span className="h-px bg-border flex-1"></span>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm" asChild>
                <Link href="/campaign">
                  Browse Campaign
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  )
}
