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
  title: 'Blag Dashboard - Manage Your Articles with Ease',
  description:
    'Discover the best dashboard for managing your blog articles. Create, publish, and track your top-performing content with our API-integrated platform.',
  keywords:
    'blog, dashboard, article management, API, content creation, SEO, analytics',
  openGraph: {
    title: 'Blog Dashboard - Manage Your Articles with Ease',
    description:
      'Create, publish, and track your articles with the best blog dashboard.',
    url: 'https://blag.adrielgama.dev',
    siteName: 'Blog Dashboard',
    images: [
      {
        url: 'https://blag.adrielgama.dev/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Blog Dashboard',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Dashboard - Manage Your Articles with Ease',
    description:
      'Create, publish, and track your articles with the best blog dashboard.',
    images: ['https://blag.adrielgama.dev/images/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  authors: [{ name: 'Adriel Gama', url: 'https://adrielgama.dev' }],
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
