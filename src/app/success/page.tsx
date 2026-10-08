import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Application Submitted</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your application. Our team will review it within 48 hours.
          You will receive an email confirmation shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/campaign">Back to Campaign</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
