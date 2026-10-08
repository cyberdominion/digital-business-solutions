import crypto from "crypto"
import { env } from "@/lib/env"

export interface PaystackTransaction {
  id: number
  reference: string
  status: string
  amount: number
  currency: string
  customer: {
    email: string
    name: string
  }
  metadata?: Record<string, unknown>
  paidAt: string
  createdAt: string
}

export class PaystackService {
  private secretKey: string
  private publicKey: string
  private webhookSecret: string

  constructor() {
    this.secretKey = env.PAYSTACK_SECRET_KEY ?? ""
    this.publicKey = env.PAYSTACK_PUBLIC_KEY ?? ""
    this.webhookSecret = env.PAYSTACK_WEBHOOK_SECRET ?? ""
  }

  async initializeTransaction(data: {
    email: string
    amount: number
    currency: string
    reference: string
    callbackUrl?: string
    metadata?: Record<string, unknown>
  }): Promise<{ authorizationUrl: string; accessCode: string; reference: string }> {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        amount: data.amount,
        currency: data.currency,
        reference: data.reference,
        callback_url: data.callbackUrl,
        metadata: data.metadata,
      }),
    })

    if (!response.ok) {
      throw new Error(`Paystack initialize failed: ${response.statusText}`)
    }

    const result = await response.json()

    if (!result.status) {
      throw new Error(result.message || "Failed to initialize transaction")
    }

    return {
      authorizationUrl: result.data.authorization_url,
      accessCode: result.data.access_code,
      reference: result.data.reference,
    }
  }

  async verifyTransaction(reference: string): Promise<PaystackTransaction> {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Paystack verify failed: ${response.statusText}`)
    }

    const result = await response.json()

    if (!result.status) {
      throw new Error(result.message || "Failed to verify transaction")
    }

    return {
      id: result.data.id,
      reference: result.data.reference,
      status: result.data.status,
      amount: result.data.amount,
      currency: result.data.currency,
      customer: result.data.customer,
      metadata: result.data.metadata,
      paidAt: result.data.paid_at,
      createdAt: result.data.transaction_date,
    }
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      throw new Error("PAYSTACK_WEBHOOK_SECRET is not configured")
    }

    const expected = crypto
      .createHmac("sha512", this.webhookSecret)
      .update(payload)
      .digest("hex")

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  }

  formatAmount(amount: number): number {
    return Math.round(amount * 100)
  }

  parseAmount(amount: number): number {
    return amount / 100
  }
}

export const paystackService = new PaystackService()
