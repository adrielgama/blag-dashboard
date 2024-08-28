import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import {
  ThemeProvider,
  ClientSessionProvider,
  QueryClientProvider,
} from '@/providers'

import type { Metadata } from 'next'

import './globals.css'

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
        <ThemeProvider>
          <QueryClientProvider>
            <ClientSessionProvider>{children}</ClientSessionProvider>
            <Toaster richColors />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
