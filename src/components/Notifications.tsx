'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Users,
  Coins,
  Building2,
  Vote,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'reward' | 'club' | 'governance'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionText?: string
  icon?: React.ReactNode
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Mock notifications - will be replaced with real data in Phase 2A
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'reward',
        title: 'Daily Rewards Available',
        message: 'Claim your 100 $BUIDL daily reward for maintaining your building streak!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        actionUrl: '/staking',
        actionText: 'Claim Now',
        icon: <Coins className="h-5 w-5 text-orange-500" />
      },
      {
        id: '2',
        type: 'club',
        title: 'New Club Member',
        message: 'alice.sol joined DevDAO through your referral. You earned 500 $BUIDL!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        actionUrl: '/club/devdao',
        actionText: 'View Club',
        icon: <Users className="h-5 w-5 text-blue-500" />
      },
      {
        id: '3',
        type: 'governance',
        title: 'Governance Proposal',
        message: 'Vote on "Add GitHub Enterprise to DevDAO treasury" - voting ends in 2 days.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true,
        actionUrl: '/governance',
        actionText: 'Vote Now',
        icon: <Vote className="h-5 w-5 text-purple-500" />
      },
      {
        id: '4',
        type: 'success',
        title: 'Staking Successful',
        message: 'Successfully staked 1,000 $BUIDL in the 30-day lock pool. Earning 2x multiplier!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        read: true,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      },
      {
        id: '5',
        type: 'info',
        title: 'Building Streak',
        message: 'You\'re on a 15-day building streak! Keep it up to unlock the 30-day achievement.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      case 'reward':
        return <Zap className="h-5 w-5 text-orange-500" />
      case 'club':
        return <Building2 className="h-5 w-5 text-purple-500" />
      case 'governance':
        return <Vote className="h-5 w-5 text-indigo-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-orange-400 hover:text-orange-300 text-sm transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-800 transition-colors ${
                        !notification.read ? 'bg-gray-800/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {notification.icon || getTypeIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`text-sm font-medium ${
                                !notification.read ? 'text-white' : 'text-gray-300'
                              }`}>
                                {notification.title}
                                {!notification.read && (
                                  <span className="ml-2 w-2 h-2 bg-orange-500 rounded-full inline-block" />
                                )}
                              </h4>
                              <p className="text-sm text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                {notification.actionUrl && (
                                  <a
                                    href={notification.actionUrl}
                                    className="text-orange-400 hover:text-orange-300 text-xs flex items-center space-x-1 transition-colors"
                                    onClick={() => {
                                      markAsRead(notification.id)
                                      setIsOpen(false)
                                    }}
                                  >
                                    <span>{notification.actionText}</span>
                                    <ArrowRight className="h-3 w-3" />
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-500 hover:text-gray-300 transition-colors ml-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-800 bg-gray-800/50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-orange-400 hover:text-orange-300 text-sm transition-colors"
                >
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// Toast notification component for temporary alerts
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
    duration?: number
  }>>([])

  const addToast = (toast: Omit<typeof toasts[0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 5000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}

export function ToastContainer({ toasts, removeToast }: {
  toasts: ReturnType<typeof useToast>['toasts']
  removeToast: (id: string) => void
}) {
  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getToastBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30'
      case 'error':
        return 'bg-red-500/10 border-red-500/30'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30'
      default:
        return 'bg-blue-500/10 border-blue-500/30'
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm bg-gray-900 border rounded-lg p-4 shadow-lg ${getToastBg(toast.type)}`}
        >
          <div className="flex items-start space-x-3">
            {getToastIcon(toast.type)}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white">{toast.title}</h4>
              {toast.message && (
                <p className="text-sm text-gray-300 mt-1">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}