import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ben-portfolio UI/UX',
  description: 'UI/UX portfolio',
  generator: 'v0.dev',
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
