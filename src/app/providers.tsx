'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { SupabaseProvider } from '../contexts/SupabaseContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  // If Privy is not configured, render children without Privy provider
  if (!privyAppId) {
    console.warn('Privy not configured, rendering without authentication')
    return (
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
    )
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'discord'],
        appearance: {
          theme: 'dark',
          accentColor: '#f97316', // Orange theme
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false
        }
      }}
    >
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
    </PrivyProvider>
  )
}
