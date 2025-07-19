import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Drive.log - Simple. Fast. GPS Logger App',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/icons/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/icons/favicon.ico',
    apple: '/icons/app-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
