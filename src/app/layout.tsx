import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Digital Business Solutions",
  description: "100 Digital Businesses - Acquire, qualify, pay and onboard the first 100 Nigerian businesses onto a shared multi-tenant infrastructure platform.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground smooth-scroll antialiased">
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  )
}
