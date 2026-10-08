# Digital Business Solutions - AGENTS.md

## Project Overview
Digital Business 100 is the acquisition, qualification, payment and onboarding engine for Digital Business Infrastructure (DBI).

## Technology Stack
- Next.js 16.x (App Router)
- React 19.x, TypeScript 5.x
- Tailwind CSS v4, shadcn/ui (base-ui style)
- Prisma ORM, PostgreSQL
- Paystack for payments

## Build Commands
- npm run dev          - Start development server
- npm run build        - Production build
- npm run type-check   - TypeScript check
- npm run lint         - Run ESLint
- npx prisma generate  - Generate Prisma client
- npx prisma db push   - Push schema to database

## Security Requirements
- Admin routes require platform admin role
- All mutations must validate with Zod schemas
- Tenant isolation: queries must include organizationId
- Paystack webhooks require HMAC SHA512 signature verification
- Client state must NEVER determine role, organizationId, payment status
- Rate limiting on auth, application, and payment endpoints

## Environment Variables
See .env.example. Required: DATABASE_URL, AUTH_SECRET, PAYSTACK_*.
