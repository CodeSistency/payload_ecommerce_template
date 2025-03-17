"use client"

import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './styles.css'
import Layout from '@/components/Layouts/MainLayout';

// export const metadata = {
//   description: 'A blank template using Payload in a Next.js app.',
//   title: 'Payload Blank Template',
// }

const queryClient = new QueryClient();


export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
          <body>
            <Layout>
              <main className='min-h-screen w-full'>{children}</main>
            </Layout>
          </body>
      </QueryClientProvider>
    </html>
  )
}
