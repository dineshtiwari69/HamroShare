import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
const inter = Inter({ subsets: ['latin'] })
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/react';
import JotaiProvider from '@/providers/jotai-provider'

export const metadata: Metadata = {
  title: 'HamroShare - Apply for an ipo through multiple meroshare accounts at once.',
  description: 'Hamroshare\'s  clever hack simplifies the process, letting you apply for IPOs across all your accounts at once.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <JotaiProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Header />
            {children}
          </ThemeProvider>
        </JotaiProvider>

      </body>
    </html>
  )
}
