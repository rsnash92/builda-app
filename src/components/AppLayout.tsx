'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NotificationCenter } from './Notifications'
import {
  LayoutDashboard,
  Plane,
  Play,
  Box,
  Search,
  Calendar,
  Users,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  Home,
  Trophy,
  DollarSign,
  Newspaper,
  Zap,
  Flame,
  Gamepad2,
  Brain,
  Wrench,
  MessageCircle,
  PartyPopper,
  Building2,
  Gem,
  BookOpen,
  Plus,
  Coins,
  Settings,
  Shield,
  User,
  Sparkles
} from 'lucide-react'

interface AppLayoutProps {
  children: ReactNode
  pageTitle?: string
  additionalHeaderContent?: ReactNode
}

const navigationItems = [
  { id: 'dashboard', icon: Home, href: '/', label: 'Dashboard' },
  { id: 'profile-dashboard', icon: LayoutDashboard, href: '/dashboard', label: 'Profile Dashboard' },
  { id: 'browse', icon: Search, href: '/browse', label: 'Browse Clubs' },
  { id: 'create', icon: Plus, href: '/create-club', label: 'Create Club' },
  { id: 'staking', icon: Coins, href: '/staking', label: '$BUIDL Staking' },
  { id: 'profile', icon: User, href: '/profile', label: 'Profile' },
]

const categories = [
  { 
    id: 'crypto', 
    name: 'Crypto', 
    count: 24, 
    icon: Zap,
    color: 'from-pink-500 to-blue-500',
    thumbnail: '₿'
  },
  { 
    id: 'gaming', 
    name: 'Gaming', 
    count: 22, 
    icon: Gamepad2,
    color: 'from-green-500 to-purple-500',
    thumbnail: '🎮'
  },
  { 
    id: 'ai', 
    name: 'AI', 
    count: 6, 
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    thumbnail: '🤖'
  },
  { 
    id: 'utility', 
    name: 'Utility', 
    count: 8, 
    icon: Wrench,
    color: 'from-orange-500 to-red-500',
    thumbnail: '🔧'
  },
  { 
    id: 'social', 
    name: 'Social', 
    count: 1, 
    icon: MessageCircle,
    color: 'from-purple-500 to-pink-500',
    thumbnail: '💬'
  },
  { 
    id: 'fun', 
    name: 'Fun', 
    count: 8, 
    icon: PartyPopper,
    color: 'from-yellow-500 to-orange-500',
    thumbnail: '🎉'
  },
]

export function AppLayout({ children, pageTitle = "builda.club", additionalHeaderContent }: AppLayoutProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="h-screen bg-dark-950 flex">
      {/* Collapsible Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-dark-900 border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Header with Logo and Menu */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <img 
                src="/images/logo/builda-logo.webp"
                alt="builda.club"
                className="w-8 h-8"
              />
              <span className="text-white font-bold text-lg">builda</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.id === 'home' && pathname === '/')
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Additional Tools Section */}
          {!sidebarCollapsed && (
            <div className="mt-8 px-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TOOLS</h3>
              </div>
              <div className="space-y-1">
                <Link
                  href="/onboarding"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Sparkles className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 text-sm font-medium">Get Started</span>
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Shield className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 text-sm font-medium">Admin</span>
                </Link>
              </div>
            </div>
          )}

          {/* Categories Section */}
          {!sidebarCollapsed && (
            <div className="mt-8 px-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CATEGORIES</h3>
              </div>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.id}
                      className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-sm font-bold">{category.thumbnail}</span>
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-white">
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {category.count} Clubs
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Collapsed Categories - Show only icons */}
          {sidebarCollapsed && (
            <div className="mt-8 px-2">
              <div className="space-y-2">
                {categories.slice(0, 4).map((category) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.id}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform`}
                      title={category.name}
                    >
                      <span className="text-white text-sm font-bold">{category.thumbnail}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Card */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <Link href="/create-club">
              <div className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-center transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <p className="text-white text-sm font-medium mb-1">Start building!</p>
                <p className="text-gray-400 text-xs">Create your first club</p>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-dark-950">
        {/* Top Header Bar */}
        <header className="bg-dark-900 border-b border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors">
                  Get Started
                </button>
                <button className="p-2 text-gray-400 hover:text-white">
                  <Search className="h-5 w-5" />
                </button>
                <NotificationCenter />
                <span className="text-gray-300 text-sm">Jan 20, 2025 - Feb 09, 2025</span>
                <Link
                  href="/profile"
                  className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="text-white text-sm font-bold">B</span>
                </Link>
              </div>
            </div>
          </div>
          {/* Additional Header Content */}
          {additionalHeaderContent && (
            <div className="border-t border-gray-700">
              {additionalHeaderContent}
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
