"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Check, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import {
  businessInfoSchema,
  contactSchema,
  digitalPresenceSchema,
  goalsSchema,
  requirementsSchema,
  applicationSchema,
  type BusinessInfoInput,
  type ContactInput,
  type DigitalPresenceInput,
  type GoalsInput,
  type RequirementsInput,
} from "@/lib/validation"

type Step = "business" | "contact" | "digital-presence" | "goals" | "requirements" | "review" | "submit"

const steps: { id: Step; title: string; description: string }[] = [
  { id: "business", title: "Business Info", description: "About your business" },
  { id: "contact", title: "Contact", description: "How to reach you" },
  { id: "digital-presence", title: "Digital Presence", description: "Existing online presence" },
  { id: "goals", title: "Goals", description: "What you want to achieve" },
  { id: "requirements", title: "Requirements", description: "What you need" },
  { id: "review", title: "Review", description: "Confirm your details" },
  { id: "submit", title: "Submitted", description: "Application sent" },
]

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState<Step>("business")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const businessForm = useForm<BusinessInfoInput>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      location: "",
    },
  })

  const contactForm = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
    },
  })

  const digitalPresenceForm = useForm<DigitalPresenceInput>({
    resolver: zodResolver(digitalPresenceSchema),
  })

  const goalsForm = useForm<GoalsInput>({
    resolver: zodResolver(goalsSchema),
  })

  const requirementsForm = useForm<RequirementsInput>({
    resolver: zodResolver(requirementsSchema),
  })

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  function nextStep() {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    }
  }

  function prevStep() {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  async function submitApplication() {
    setIsSubmitting(true)

    try {
      const formData = {
        campaignId: "dbi100",
        businessName: businessForm.getValues("businessName"),
        legalName: businessForm.getValues("legalName"),
        industry: businessForm.getValues("industry"),
        description: businessForm.getValues("description"),
        location: businessForm.getValues("location"),
        yearsOperating: businessForm.getValues("yearsOperating"),
        registrationStatus: businessForm.getValues("registrationStatus"),
        businessModel: businessForm.getValues("businessModel"),
        ownerName: contactForm.getValues("ownerName"),
        email: contactForm.getValues("email"),
        phone: contactForm.getValues("phone"),
        whatsapp: contactForm.getValues("whatsapp"),
        preferredContact: contactForm.getValues("preferredContact"),
        website: digitalPresenceForm.getValues("website"),
        instagram: digitalPresenceForm.getValues("instagram"),
        facebook: digitalPresenceForm.getValues("facebook"),
        tiktok: digitalPresenceForm.getValues("tiktok"),
        googleBusiness: digitalPresenceForm.getValues("googleBusiness"),
        existingDomain: digitalPresenceForm.getValues("existingDomain"),
        businessEmail: digitalPresenceForm.getValues("businessEmail"),
        goals: goalsForm.getValues("goals") ?? [],
        requirements: requirementsForm.getValues("requirements") ?? [],
        source: "organic",
      }

      const res = await fetch("/api/v1/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!result.success) {
        alert(result.error?.message ?? "Submission failed")
        return
      }

      setIsSuccess(true)
      setCurrentStep("submit")
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 flex-1 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {currentStepIndex > 0 && currentStep !== "submit" && (
              <Button variant="ghost" size="sm" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        {currentStep === "business" && (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Tell us about your business.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  businessForm.trigger().then((isValid) => {
                    if (isValid) nextStep()
                  })
                }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Patience Sewing"
                      {...businessForm.register("businessName")}
                    />
                    {businessForm.formState.errors.businessName && (
                      <p className="text-xs text-destructive">{businessForm.formState.errors.businessName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legalName">Legal Name</Label>
                    <Input id="legalName" placeholder="Legal name (optional)" {...businessForm.register("legalName")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    onValueChange={(val: string | null) => businessForm.setValue("industry", val ?? "")}
                    defaultValue={businessForm.watch("industry")}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                      <SelectItem value="food">Food & Restaurant</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="creative">Creative Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {businessForm.formState.errors.industry && (
                    <p className="text-xs text-destructive">{businessForm.formState.errors.industry.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location / Service Area *</Label>
                  <Input id="location" placeholder="Lagos, Nigeria" {...businessForm.register("location")} />
                  {businessForm.formState.errors.location && (
                    <p className="text-xs text-destructive">{businessForm.formState.errors.location.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="yearsOperating">Years Operating</Label>
                    <Input
                      id="yearsOperating"
                      type="number"
                      min="0"
                      placeholder="e.g., 3"
                      {...businessForm.register("yearsOperating", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationStatus">Registration Status</Label>
                    <Input id="registrationStatus" placeholder="e.g., Registered" {...businessForm.register("registrationStatus")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Input id="businessModel" placeholder="Retail, Service, B2B, B2C..." {...businessForm.register("businessModel")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your business, products or services..."
                    rows={3}
                    {...businessForm.register("description")}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === "contact" && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How should we contact you?</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  contactForm.trigger().then((isValid) => {
                    if (isValid) nextStep()
                  })
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input id="ownerName" placeholder="John Doe" {...contactForm.register("ownerName")} />
                  {contactForm.formState.errors.ownerName && (
                    <p className="text-xs text-destructive">{contactForm.formState.errors.ownerName.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="you@company.com" {...contactForm.register("email")} />
                    {contactForm.formState.errors.email && (
                      <p className="text-xs text-destructive">{contactForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="+234 XXX XXX XXXX" {...contactForm.register("phone")} />
                    {contactForm.formState.errors.phone && (
                      <p className="text-xs text-destructive">{contactForm.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" type="tel" placeholder="+234 XXX XXX XXXX" {...contactForm.register("whatsapp")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                  <Select
                    onValueChange={(val: string | null) => contactForm.setValue("preferredContact", val as any)}
                    defaultValue={contactForm.watch("preferredContact")}
                  >
                    <SelectTrigger id="preferredContact">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === "digital-presence" && (
          <Card>
            <CardHeader>
              <CardTitle>Digital Presence</CardTitle>
              <CardDescription>Your existing online presence (optional fields).</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  nextStep()
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" placeholder="https://example.com" {...digitalPresenceForm.register("website")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" placeholder="@yourbusiness" {...digitalPresenceForm.register("instagram")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" placeholder="facebook.com/yourbusiness" {...digitalPresenceForm.register("facebook")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input id="tiktok" placeholder="@yourbusiness" {...digitalPresenceForm.register("tiktok")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="googleBusiness">Google Business Profile</Label>
                  <Input id="googleBusiness" placeholder="Link to your GMB" {...digitalPresenceForm.register("googleBusiness")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="existingDomain">Existing Domain</Label>
                  <Input id="existingDomain" placeholder="yourbusiness.com" {...digitalPresenceForm.register("existingDomain")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input id="businessEmail" type="email" placeholder="info@yourbusiness.com" {...digitalPresenceForm.register("businessEmail")} />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === "goals" && (
          <Card>
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
              <CardDescription>What do you want to achieve with your digital presence?</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  goalsForm.trigger().then((isValid) => {
                    if (isValid) nextStep()
                  })
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Select your goals (at least one)</Label>
                  <div className="space-y-2">
                    {["Get more customers", "Sell online", "Receive orders", "Capture leads", "Automate follow-up", "Manage customers", "Accept payments", "Improve credibility", "Improve customer service"].map((goal) => (
                      <label key={goal} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          onChange={(e) => {
                            const current = goalsForm.getValues("goals") ?? []
                            if (e.target.checked) {
                              goalsForm.setValue("goals", [...current, goal] as any)
                            } else {
                              goalsForm.setValue("goals", current.filter((g) => g !== goal) as any)
                            }
                          }}
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                  {goalsForm.formState.errors.goals && (
                    <p className="text-xs text-destructive">{goalsForm.formState.errors.goals.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === "requirements" && (
          <Card>
            <CardHeader>
              <CardTitle>Your Requirements</CardTitle>
              <CardDescription>What features do you need?</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  requirementsForm.trigger().then((isValid) => {
                    if (isValid) nextStep()
                  })
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Select your requirements (at least one)</Label>
                  <div className="space-y-2">
                    {["Products", "Services", "Online orders", "Delivery", "Booking", "Appointments", "Wholesale", "Bespoke/custom work", "CRM", "WhatsApp integration", "Payments"].map((req) => (
                      <label key={req} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          onChange={(e) => {
                            const current = requirementsForm.getValues("requirements") ?? []
                            if (e.target.checked) {
                              requirementsForm.setValue("requirements", [...current, req] as any)
                            } else {
                              requirementsForm.setValue("requirements", current.filter((r) => r !== req) as any)
                            }
                          }}
                        />
                        <span className="text-sm">{req}</span>
                      </label>
                    ))}
                  </div>
                  {requirementsForm.formState.errors.requirements && (
                    <p className="text-xs text-destructive">{requirementsForm.formState.errors.requirements.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === "review" && (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Application</CardTitle>
              <CardDescription>Please review your information before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Business Information</h3>
                <p className="text-sm text-muted-foreground">
                  {businessForm.getValues("businessName")} · {businessForm.getValues("industry")} · {businessForm.getValues("location")}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Contact</h3>
                <p className="text-sm text-muted-foreground">
                  {contactForm.getValues("ownerName")} · {contactForm.getValues("email")} · {contactForm.getValues("phone")}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Goals</h3>
                <p className="text-sm text-muted-foreground">
                  {(goalsForm.getValues("goals") ?? []).join(", ")}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  {(requirementsForm.getValues("requirements") ?? []).join(", ")}
                </p>
              </div>

              <div className="flex items-start space-x-3 pt-4 border-t">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 rounded"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I have read and agree to the <Link href="/terms" className="text-primary hover:text-primary/80 font-medium" target="_blank">Terms and Conditions</Link> and <Link href="/privacy" className="text-primary hover:text-primary/80 font-medium" target="_blank">Privacy Policy</Link>. I understand that by submitting this application, I have accepted these terms.
                </label>
              </div>

              <Button
                onClick={submitApplication}
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "submit" && (
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-center">Application Submitted</CardTitle>
              <CardDescription className="text-center">
                Your application has been submitted successfully. Our team will review it within 48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/success">
                <Button variant="link">View confirmation</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <WhatsAppButton />
    </div>
  )
}

