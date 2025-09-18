'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Home,
  Trophy,
  DollarSign,
  Newspaper,
  Plus,
  Settings,
  Users,
  ChevronRight,
  ChevronLeft,
  Zap,
  MessageSquare,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Hash,
  Megaphone,
  Wrench,
  Gem,
  Vote,
  BarChart3,
  Hammer,
  Crown,
  Star,
  Bell
} from 'lucide-react'

interface DiscordLayoutProps {
  children: ReactNode
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

export function DiscordLayout({ 
  children, 
  currentClub,
  channels = [],
  onlineMembers = [],
  clubStats,
  topBuilders = []
}: DiscordLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const pathname = usePathname()

  // Mock clubs data
  const clubs = [
    { id: 'buidlers', name: 'BUIDLers United', icon: 'B', isActive: true },
    { id: 'trading', name: 'TradingElite', icon: 'T', isActive: false },
    { id: 'devdao', name: 'DevDAO', icon: 'D', isActive: false },
  ]

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

  const platformNav = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
    { id: 'earn', icon: DollarSign, label: 'Earn', href: '/earn' },
    { id: 'news', icon: Newspaper, label: 'News', href: '/news' },
  ]

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'text': return Hash
      case 'voice': return Mic
      case 'announcement': return Megaphone
      case 'special':
        return (props: any) => {
          const iconMap: { [key: string]: any } = {
            'treasury': Gem,
            'governance': Vote,
            'resources': Wrench,
            'analytics': BarChart3
          }
          const Icon = iconMap[props.name] || Hash
          return <Icon {...props} />
        }
      default: return Hash
    }
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Main Header */}
      <div className="h-16 bg-black border-b border-gray-600 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">builda.club</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
            <span className="text-orange-400 font-semibold">Your $BUIDL: 12,450</span>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
              Daily Claim Available
            </button>
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-1">
      {/* Left Sidebar - Discord-Style Club Switcher */}
      <div className="w-16 bg-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Your Clubs */}
        <div className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {clubs.map((club) => (
              <div
                key={club.id}
                className={`relative group cursor-pointer ${
                  club.isActive ? 'bg-orange-500' : 'hover:bg-gray-700'
                } rounded-lg p-2 transition-colors`}
                title={club.name}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                  club.isActive ? 'bg-white' : 'bg-gray-600'
                }`}>
                  {club.icon}
                </div>
                
                {/* Hover Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {club.name}
                  {club.isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-2 border-b-2 border-r-2 border-transparent border-r-gray-900"></div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Create/Join Club */}
            <div className="mt-2">
              <div 
                className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center justify-center cursor-pointer transition-colors group"
                title="Create/Join Club"
              >
                <Plus className="h-5 w-5 text-gray-300" />
                
                {/* Hover Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Create/Join Club
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center group cursor-pointer" title="Your Profile - Level 7 Builder">
            <span className="text-white font-bold text-sm">Y</span>
            
            {/* Hover Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              <div>Your Name</div>
              <div className="text-gray-400 text-xs">Level 7 Builder</div>
            </div>
          </div>
        </div>
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
              {rightPanelCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
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
                  const Icon = getChannelIcon(channel.type)
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
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Top Bar */}
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
    </div>
  )
}
