'use client'

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { ChatService } from '@/lib/services/chat-service'
import { Lock, Coins } from 'lucide-react'

interface TokenGatedAccessProps {
  channelId: string
  channelName: string
  children: React.ReactNode
}

export function TokenGatedAccess({ channelId, channelName, children }: TokenGatedAccessProps) {
  const { user, authenticated } = usePrivy()
  const [permissions, setPermissions] = useState({
    canRead: false,
    canWrite: false,
    canManage: false
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkPermissions = async () => {
      if (!authenticated || !user?.id || !channelId) {
        setPermissions({ canRead: false, canWrite: false, canManage: false })
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const perms = await ChatService.canUserAccessChannel(channelId, user.id)
        setPermissions(perms)
      } catch (err) {
        console.error('Error checking permissions:', err)
        setError('Failed to check channel permissions')
        // Default to allowing access if permission check fails
        setPermissions({ canRead: true, canWrite: true, canManage: false })
      } finally {
        setLoading(false)
      }
    }

    checkPermissions()
  }, [channelId, user?.id, authenticated])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
        <Lock className="w-16 h-16" />
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Authentication Required</h3>
          <p>Please log in to access #{channelName}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Permission Check Failed</h3>
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!permissions.canRead) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
        <div className="flex items-center space-x-4">
          <Lock className="w-16 h-16" />
          <Coins className="w-16 h-16" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Insufficient Tokens</h3>
          <p>You need more club tokens to access #{channelName}</p>
          <div className="mt-4 p-4 bg-[#2f3136] rounded-lg">
            <p className="text-sm text-gray-300">
              Contribute to the club treasury to earn tokens and unlock premium channels
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Wrap children with permission context
  return (
    <div className="h-full" data-can-write={permissions.canWrite} data-can-manage={permissions.canManage}>
      {children}
    </div>
  )
}