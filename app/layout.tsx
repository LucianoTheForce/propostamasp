import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "SWOOSH BANANA NIKE | Proposta — Protótipo de Produção Branded",
  description: "Revolutionary agricultural innovation proposal for naturally branded produce through 3D molding technology",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/faviconV2.png', sizes: '32x32', type: 'image/png' },
      { url: '/faviconV2.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/faviconV2.png',
    apple: '/faviconV2.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
