import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import OrdersScreen from '@/components/Views/Orders/OrdersScreen'

export default async function page() {
      const headers = await getHeaders()
      const payloadConfig = await config
      const payload = await getPayload({ config: payloadConfig })
      const { user } = await payload.auth({ headers })

      // Fetch orders for the authenticated user
    const ordersResponse = await payload.find({
        collection: 'orders',
        where: {
          user: {
            equals: user?.id,
          },
        },
      });
  return (
    <OrdersScreen user={user} orders={ordersResponse.docs}  />
  )
}

