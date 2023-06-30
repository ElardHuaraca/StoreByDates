import Script from 'next/script'
import Header from './components/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inicio',
  description: 'Generar reporte por store y fecha',
  icons: 'favicon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <Header />
        {children}
        <Script src="/js/flowbite.min.js" strategy="beforeInteractive"></Script>
      </body>
    </html>
  )
}
