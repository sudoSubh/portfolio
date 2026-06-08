import type React from "react"
import type { Metadata } from "next/types"
import "./globals.css"
import Script from "next/script"

import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import SmoothScroll from "@/components/SmoothScroll"
import { Suspense } from "react"

import { ScrollProgress } from "@/components/magicui/scroll-progress";

import { Analytics } from "@vercel/analytics/next"
import ClientLayout from "@/components/ClientLayout"

export const metadata: Metadata = {
  title: "Subhasish Behera - Full-Stack & AI/ML Engineer",
  description: "Portfolio website of Subhasish Behera, a Full-Stack & AI/ML Engineer",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Analytics />
       
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <ClientLayout>
              <Suspense fallback={null}>
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {children}
                </main>
                <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Subhasish Behera. All rights reserved.
                </footer>
              </Suspense>
            </ClientLayout>
          </SmoothScroll>
        </ThemeProvider>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "94f28722be6043ddafb53fea8cec6f4e"}'></script>
      </body>
    </html>
  )
}