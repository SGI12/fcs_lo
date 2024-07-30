import { Roboto } from "next/font/google"
import './globals.css'
export const metadata = {
  title: 'Ленинградское отделение ФКС Россиии',
  description: 'Ленинградское отделение ФКС Россиии',
}
const roboto = Roboto({ subsets: ['cyrillic'], weight: '400' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
