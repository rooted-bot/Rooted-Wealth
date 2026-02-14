import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flip Deal Analyzer',
  description: 'Real estate flip deal sourcing and analysis tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}