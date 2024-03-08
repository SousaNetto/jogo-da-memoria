import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ogImage from '@/app/opengraph-image.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev memory',
  description:
    'jogo da memória com o tema de programação, desafie seus amigos e divirtam-se',
  metadataBase: new URL('https://jogo-da-memoria-silk.vercel.app/'),
  openGraph: {
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
