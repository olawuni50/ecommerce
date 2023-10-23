import { Suspense } from 'react';
import './globals.css'
import type { Metadata } from 'next'
import {Header, Footer, Cart, Toast, Loader} from '@/components'
import { Providers } from '@/redux/Provider'
import AuthProvider from '@/Components/AuthProvider'
import { ThemeProvider } from './theme-provider';
import { ThemeSwitcher } from '@/Components/ThemeSwitcher';



export const metadata: Metadata = {
  title: 'ShopIT',
  description: 'Shopping Made Easy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toast />
      <Providers>
        <AuthProvider>
      <Cart />      
      <Header />
      {/* <ThemeSwitcher /> */}
      <main>
     
       {children}
       
       </main>
       
       <Footer />

        </AuthProvider>

        </Providers>
        </ThemeProvider>
      

      
      </body>
    </html>
  )
}
