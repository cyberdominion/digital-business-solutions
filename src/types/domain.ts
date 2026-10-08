// Core domain types shared across the application

import { Prisma } from "@prisma/client"

export type User = Prisma.UserGetPayload<{
  include: { memberships: { include: { organization: true } } }
}>

export type Organization = Prisma.OrganizationGetPayload<{
  include: {
    members: { include: { user: true } }
  }
}>

export type Application = Prisma.ApplicationGetPayload<{
  include: {
    campaign: true
    organization: true
    user: true
    answers: true
  }
}>

export type Campaign = Prisma.CampaignGetPayload<{
  include: {
    applications: true
  }
}>

export type Payment = Prisma.PaymentGetPayload<{
  include: {
    organization: true
    application: true
  }
}>

export type OnboardingProject = Prisma.OnboardingProjectGetPayload<{
  include: {
    steps: true
    tasks: true
  }
}>

export type AuditLog = Prisma.AuditLogGetPayload<{
  include: { user: true }
}>

export type Asset = Prisma.AssetGetPayload<{
  include: { organization: true }
}>

export type Task = Prisma.TaskGetPayload<{
  include: { organization: true }
}>

export type Referral = Prisma.ReferralGetPayload<{
  include: { conversionsList: true }
}>

export type Notification = Prisma.NotificationGetPayload<Record<string, never>>

export type SupportTicket = Prisma.SupportTicketGetPayload<{
  include: { organization: true }
}>

// Enums

export enum ApplicationStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  PAID = "PAID",
  ONBOARDING = "ONBOARDING",
  DEVELOPMENT = "DEVELOPMENT",
  REVIEW = "REVIEW",
  CHANGES_REQUESTED = "CHANGES_REQUESTED",
  LIVE = "LIVE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum FulfillmentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  FULFILLED = "FULFILLED",
  FAILED = "FAILED",
}

export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  CLOSED = "CLOSED",
}

export enum OrganizationStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  ARCHIVED = "ARCHIVED",
}

export enum TaskStatus {
  PENDING = "PENDING",
  ASSIGNED = "ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum AssetType {
  LOGO = "logo",
  PRODUCT_IMAGE = "product_image",
  SERVICE_IMAGE = "service_image",
  TEAM_PHOTO = "team_photo",
  BRAND_ASSET = "brand_asset",
  DOCUMENT = "document",
  VIDEO = "video",
  OTHER = "other",
}

