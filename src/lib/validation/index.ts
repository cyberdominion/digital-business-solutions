import { z } from "zod"

export const businessInfoSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  legalName: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  yearsOperating: z.number().min(0).max(100).optional(),
  registrationStatus: z.string().optional(),
  businessModel: z.string().optional(),
})

export const contactSchema = z.object({
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  whatsapp: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "whatsapp"]).optional(),
})

export const digitalPresenceSchema = z.object({
  website: z.string().url().optional().or(z.literal("")),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  googleBusiness: z.string().optional(),
  existingDomain: z.string().optional(),
  businessEmail: z.string().email().optional().or(z.literal("")),
})

export const goalsSchema = z.object({
  goals: z.array(z.string()).min(1, "At least one goal is required"),
})

export const requirementsSchema = z.object({
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
})

export const applicationSchema = businessInfoSchema
  .merge(contactSchema)
  .merge(digitalPresenceSchema)
  .merge(goalsSchema)
  .merge(requirementsSchema)
  .extend({
    source: z.string().optional(),
    referralCode: z.string().optional(),
  })

export const paymentInitiationSchema = z.object({
  applicationId: z.string().min(1),
})

export const campaignSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(1),
  price: z.number().positive(),
  currency: z.string().length(3).default("NGN"),
  capacity: z.number().int().positive(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  inclusions: z.array(z.string()).optional(),
  eligibilityRules: z.record(z.unknown()).optional(),
  terms: z.string().optional(),
})

export const organizationSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(3).max(50),
  legalName: z.string().optional(),
  industry: z.string().optional(),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Valid email is required"),
})

export const businessProfileSchema = z.object({
  name: z.string().min(2),
  legalName: z.string().optional(),
  industry: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  yearsOperating: z.number().optional(),
})

export const brandSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fonts: z.record(z.string()).optional(),
  tagline: z.string().optional(),
})

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
})

export const serviceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  duration: z.number().optional(),
  category: z.string().optional(),
})

export type BusinessInfoInput = z.infer<typeof businessInfoSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type DigitalPresenceInput = z.infer<typeof digitalPresenceSchema>
export type GoalsInput = z.infer<typeof goalsSchema>
export type RequirementsInput = z.infer<typeof requirementsSchema>
export type ApplicationInput = z.infer<typeof applicationSchema>
export type PaymentInitiationInput = z.infer<typeof paymentInitiationSchema>
export type CampaignInput = z.infer<typeof campaignSchema>
export type OrganizationInput = z.infer<typeof organizationSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type BusinessProfileInput = z.infer<typeof businessProfileSchema>
export type BrandInput = z.infer<typeof brandSchema>
export type ProductInput = z.infer<typeof productSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
