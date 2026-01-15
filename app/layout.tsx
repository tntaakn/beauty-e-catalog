import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ComparisonBar } from "@/components/comparison-bar"
import { Toaster } from "@/components/ui/toaster"

// Updated fonts for elegant beauty catalog - serif for headings, sans for body
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Beauty Catalog - Đồng hành cùng bạn tìm ra vẻ đẹp của bản thân",
  description: "Khám phá bộ sưu tập sản phẩm làm đẹp cao cấp, giúp bạn tìm ra vẻ đẹp riêng của mình",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <ComparisonBar />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
