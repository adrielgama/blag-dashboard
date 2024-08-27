import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'

import type { Metadata } from 'next'

import './globals.css'
import ClientSessionProvider from '@/components/client-session-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blag Dashboard',
  description:
    'If you are looking for an API with authentication and that provides a dashboard for your blog, this is the best choice.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientSessionProvider>{children}</ClientSessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
