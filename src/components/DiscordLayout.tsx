'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
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
  MessageSquare,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Hash,
  Megaphone,
  Vote,
  BarChart3,
  Hammer,
  Crown,
  Star
} from 'lucide-react'

interface DiscordLayoutProps {
  children: ReactNode
  pageTitle?: string
  currentClub?: {
    id: string
    name: string
    icon: string
    isActive: boolean
  }
  channels?: Array<{
    id: string
    name: string
    type: 'text' | 'voice' | 'announcement' | 'special'
    category?: string
    unread?: number
    isActive?: boolean
  }>
  onlineMembers?: Array<{
    id: string
    name: string
    isBuilding: boolean
    activity?: string
  }>
  clubStats?: {
    treasury: number
    yourShare: number
    activity: 'High' | 'Medium' | 'Low'
    todaysBuilds: number
    buildStreak: number
    buidlDistributed: number
  }
  topBuilders?: Array<{
    id: string
    name: string
    earnings: number
    rank: number
    built: string
  }>
}

const navigationItems = [
  { id: 'home', icon: Home, href: '/', label: 'Home' },
  { id: 'clubs', icon: LayoutDashboard, href: '/', label: 'Clubs' },
  { id: 'build', icon: Building2, href: '/build', label: 'Build' },
  { id: 'vaults', icon: Gem, href: '/vaults', label: 'Vaults' },
  { id: 'learn', icon: BookOpen, href: '/learn', label: 'Learn' },
  { id: 'leaderboard', icon: Trophy, href: '/leaderboard', label: 'Leaderboard' },
  { id: 'earn', icon: DollarSign, href: '/earn', label: 'Earn' },
  { id: 'news', icon: Newspaper, href: '/news', label: 'News' },
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

export function DiscordLayout({ 
  children, 
  pageTitle = "builda.club",
  currentClub,
  channels = [],
  onlineMembers = [],
  clubStats,
  topBuilders = []
}: DiscordLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const pathname = usePathname()

  // Mock channels data
  const defaultChannels = [
    { id: 'announcements', name: 'announcements', type: 'announcement', category: 'ANNOUNCEMENTS', unread: 33 },
    { id: 'wins', name: 'wins', type: 'announcement', category: 'ANNOUNCEMENTS' },
    { id: 'general', name: 'general', type: 'text', category: 'DISCUSSION' },
    { id: 'building-chat', name: 'building-chat', type: 'text', category: 'DISCUSSION' },
    { id: 'random', name: 'random', type: 'text', category: 'DISCUSSION' },
    { id: 'dev-talk', name: 'dev-talk', type: 'text', category: 'BUILDING', buildActivity: '3 PRs today' },
    { id: 'strategy', name: 'strategy-discussion', type: 'text', category: 'BUILDING', buildActivity: '2 new' },
    { id: 'show-work', name: 'show-your-work', type: 'text', category: 'BUILDING' },
    { id: 'builders-lounge', name: "Builder's Lounge", type: 'voice', category: 'VOICE', isActive: true },
    { id: 'focus-room', name: 'Focus Room', type: 'voice', category: 'VOICE' },
    { id: 'treasury', name: 'treasury', type: 'special', category: 'CLUB TOOLS', buildActivity: 'Vote active!' },
    { id: 'governance', name: 'governance', type: 'special', category: 'CLUB TOOLS' },
    { id: 'resources', name: 'resources', type: 'special', category: 'CLUB TOOLS' },
    { id: 'analytics', name: 'analytics', type: 'special', category: 'CLUB TOOLS' },
  ]

  const getChannelIcon = (type: string, name?: string) => {
    if (type === 'special' && name) {
      const iconMap: { [key: string]: any } = {
        'treasury': Gem,
        'governance': Vote,
        'resources': Wrench,
        'analytics': BarChart3
      }
      return iconMap[name] || Hash
    }
    
    switch (type) {
      case 'text': return Hash
      case 'voice': return Mic
      case 'announcement': return Megaphone
      default: return Hash
    }
  }

  return (
    <div className="h-screen bg-black flex">
      {/* Main App Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-black border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Header with Logo and Menu */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
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
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <p className="text-white text-sm font-medium mb-1">Start building!</p>
              <p className="text-gray-400 text-xs">Create your first club</p>
            </div>
          </div>
        )}
      </div>

      {/* Second Panel - Channel List */}
      <div className="w-60 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Club Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg">{currentClub?.name || 'Select a Club'}</h2>
            <button
              onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              {rightPanelCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto py-4">
          {Object.entries(
            defaultChannels.reduce((acc, channel) => {
              if (!acc[channel.category!]) {
                acc[channel.category!] = []
              }
              acc[channel.category!].push(channel)
              return acc
            }, {} as { [key: string]: any[] })
          ).map(([category, categoryChannels]) => (
            <div key={category} className="mb-6">
              <div className="px-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{category}</h3>
              </div>
              <div className="space-y-1">
                {categoryChannels.map((channel) => {
                  const Icon = getChannelIcon(channel.type, channel.name)
                  return (
                    <div
                      key={channel.id}
                      className={`flex items-center space-x-2 px-4 py-1.5 cursor-pointer transition-colors ${
                        channel.isActive
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{channel.name}</span>
                      <div className="ml-auto flex items-center space-x-1">
                        {channel.buildActivity && (
                          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {channel.buildActivity}
                          </span>
                        )}
                        {channel.unread && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {channel.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-black">
        {/* Main App Header */}
        <header className="bg-black border-b border-gray-600">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
                {currentClub && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span>•</span>
                    <span className="text-sm">{currentClub.name}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white">
                  <Sun className="h-5 w-5" />
                </button>
                <button className="p-2 text-white">
                  <Moon className="h-5 w-5" />
                </button>
                <span className="text-gray-300 text-sm">EN</span>
                <button className="p-2 text-gray-400 hover:text-white">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">Y</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Discord Channel Header */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
          <div className="flex items-center space-x-2">
            <Hash className="h-5 w-5 text-gray-400" />
            <span className="text-white font-semibold">general</span>
          </div>
          <div className="ml-4 text-gray-400 text-sm">
            Welcome to the general channel. Say hi!
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>

      {/* Right Panel - Members & Stats */}
      {!rightPanelCollapsed && (
        <div className="w-60 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Online Members */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold text-sm mb-3">ONLINE — {onlineMembers.length}</h3>
            <div className="space-y-2">
              {onlineMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {member.isBuilding && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                        <Hammer className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{member.name}</p>
                    {member.isBuilding ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-orange-400 text-xs">🔨</span>
                        <p className="text-orange-400 text-xs truncate">{member.activity}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-xs">(idle)</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Club Stats */}
          {clubStats && (
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold text-sm mb-3">CLUB STATS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Treasury:</span>
                  <span className="text-white text-sm font-semibold">${clubStats.treasury.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Your Share:</span>
                  <span className="text-green-400 text-sm font-semibold">{clubStats.yourShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Today's Builds:</span>
                  <span className="text-blue-400 text-sm font-semibold">{clubStats.todaysBuilds} PRs shipped</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Build Streak:</span>
                  <span className="text-orange-400 text-sm font-semibold">🔥 {clubStats.buildStreak} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">$BUIDL Distributed:</span>
                  <span className="text-yellow-400 text-sm font-semibold">{clubStats.buidlDistributed.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Top Builders */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-sm mb-3">TOP BUILDERS</h3>
            <div className="space-y-3">
              {topBuilders.map((builder) => (
                <div key={builder.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {builder.rank === 1 && <Crown className="h-3 w-3 text-yellow-400" />}
                      {builder.rank === 2 && <Star className="h-3 w-3 text-gray-400" />}
                      {builder.rank === 3 && <Star className="h-3 w-3 text-orange-400" />}
                      <span className="text-gray-400 text-xs w-4">{builder.rank}.</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{builder.name}</p>
                      <p className="text-orange-400 text-xs">{builder.earnings.toLocaleString()} $BUIDL</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs ml-6 italic">"{builder.built}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}