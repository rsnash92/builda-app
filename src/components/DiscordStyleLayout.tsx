'use client'

import { ReactNode, useState } from 'react'
import {
  Hash,
  Volume2,
  Megaphone,
  Settings,
  Crown,
  Hammer,
  UserCheck,
  Users,
  ChevronDown,
  Plus,
  Mic,
  Headphones,
  Settings as SettingsIcon
} from 'lucide-react'

interface DiscordStyleLayoutProps {
  children: ReactNode
  currentServer?: {
    id: string
    name: string
    icon: string
  }
}

// Mock servers data
const mockServers = [
  { id: 'buidlers', name: 'BUIDLers United', icon: 'B', isActive: true },
  { id: 'defi', name: 'DeFi Builders', icon: 'D', isActive: false },
  { id: 'nft', name: 'NFT Creators', icon: 'N', isActive: false },
  { id: 'dao', name: 'DAO Masters', icon: 'Ð', isActive: false },
]

// Mock channels data organized by categories
const mockChannels = {
  'Text Channels': [
    { id: 'general', name: 'general', type: 'text' as const, unread: 0 },
    { id: 'random', name: 'random', type: 'text' as const, unread: 0 },
    { id: 'announcements', name: 'announcements', type: 'announcement' as const, unread: 2 },
  ],
  'Voice Channels': [
    { id: 'general-voice', name: 'General', type: 'voice' as const, users: [] },
    { id: 'building-room', name: 'Building Room', type: 'voice' as const, users: ['alice', 'bob'] },
  ],
  'Club Channels': [
    { id: 'treasury', name: 'treasury', type: 'special' as const, unread: 0 },
    { id: 'governance', name: 'governance', type: 'special' as const, unread: 1 },
    { id: 'building', name: 'building', type: 'special' as const, unread: 0 },
  ]
}

// Mock members data
const mockMembers = {
  'Moderators': [
    { id: '1', name: 'alice', status: 'online', activity: 'Building smart contracts' },
    { id: '2', name: 'bob', status: 'online', activity: 'Code Review' },
  ],
  'Alumni': [
    { id: '3', name: 'carol', status: 'away', activity: 'Designing UI' },
    { id: '4', name: 'david', status: 'online', activity: 'DeFi Research' },
  ],
  'Members': [
    { id: '5', name: 'eve', status: 'online', activity: 'Community Management' },
    { id: '6', name: 'frank', status: 'idle', activity: null },
    { id: '7', name: 'grace', status: 'online', activity: 'Testing Features' },
    { id: '8', name: 'henry', status: 'offline', activity: null },
  ]
}

const getChannelIcon = (type: string) => {
  switch (type) {
    case 'voice': return Volume2
    case 'announcement': return Megaphone
    case 'special': return Crown
    default: return Hash
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500'
    case 'away': return 'bg-yellow-500'
    case 'idle': return 'bg-yellow-600'
    case 'offline': return 'bg-gray-500'
    default: return 'bg-gray-500'
  }
}

export function DiscordStyleLayout({ children, currentServer }: DiscordStyleLayoutProps) {
  const [activeChannel, setActiveChannel] = useState('general')
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories)
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category)
    } else {
      newCollapsed.add(category)
    }
    setCollapsedCategories(newCollapsed)
  }

  return (
    <div className="h-screen bg-[#36393f] flex overflow-hidden">
      {/* Server List */}
      <div className="w-[72px] bg-[#202225] flex flex-col items-center py-3 space-y-2">
        {/* Home/Direct Messages */}
        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center cursor-pointer hover:rounded-xl transition-all duration-200">
          <span className="text-white font-bold">D</span>
        </div>

        <div className="w-8 h-0.5 bg-[#36393f] rounded"></div>

        {/* Servers */}
        {mockServers.map((server) => (
          <div key={server.id} className="relative group">
            <div className={`w-12 h-12 bg-[#36393f] ${server.isActive ? 'rounded-xl' : 'rounded-3xl'} flex items-center justify-center cursor-pointer hover:rounded-xl transition-all duration-200 hover:bg-[#5865f2] group relative`}>
              <span className="text-white font-bold">{server.icon}</span>
              {server.isActive && (
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r"></div>
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {server.name}
            </div>
          </div>
        ))}

        {/* Add Server */}
        <div className="w-12 h-12 bg-[#36393f] rounded-3xl flex items-center justify-center cursor-pointer hover:rounded-xl hover:bg-[#3ba55c] transition-all duration-200 group">
          <Plus className="w-6 h-6 text-[#3ba55c] group-hover:text-white" />
        </div>
      </div>

      {/* Channel Sidebar */}
      <div className="w-60 bg-[#2f3136] flex flex-col">
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] shadow-sm">
          <h1 className="text-white font-semibold">{currentServer?.name || 'BUIDLers United'}</h1>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto pt-4">
          {Object.entries(mockChannels).map(([category, channels]) => (
            <div key={category} className="mb-4">
              {/* Category Header */}
              <div
                className="px-2 mb-1 flex items-center justify-between cursor-pointer hover:text-gray-300"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center">
                  <ChevronDown className={`w-3 h-3 text-gray-400 mr-1 transition-transform ${collapsedCategories.has(category) ? '-rotate-90' : ''}`} />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{category}</span>
                </div>
                <Plus className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
              </div>

              {/* Channels List */}
              {!collapsedCategories.has(category) && (
                <div className="space-y-0.5">
                  {channels.map((channel) => {
                    const Icon = getChannelIcon(channel.type)
                    const isActive = channel.id === activeChannel
                    const hasUnread = 'unread' in channel && channel.unread > 0

                    return (
                      <div
                        key={channel.id}
                        className={`mx-2 px-2 py-1 rounded flex items-center justify-between cursor-pointer group ${
                          isActive ? 'bg-[#393c43] text-white' : 'text-gray-300 hover:bg-[#34373c] hover:text-gray-200'
                        }`}
                        onClick={() => setActiveChannel(channel.id)}
                      >
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 mr-1.5 text-gray-400" />
                          <span className="text-sm">{channel.name}</span>
                          {'users' in channel && channel.users.length > 0 && (
                            <span className="ml-1 text-xs text-gray-400">({channel.users.length})</span>
                          )}
                        </div>

                        <div className="flex items-center">
                          {hasUnread && (
                            <div className="w-4 h-4 bg-[#f23f42] rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-medium">{channel.unread}</span>
                            </div>
                          )}
                          <Settings className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 ml-1" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Area */}
        <div className="h-14 bg-[#292b2f] px-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">alice</span>
              <span className="text-xs text-gray-400">#1234</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Mic className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
            <Headphones className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
            <SettingsIcon className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>

      {/* Members Sidebar */}
      <div className="w-60 bg-[#2f3136] border-l border-[#202225] overflow-y-auto">
        <div className="p-4">
          {Object.entries(mockMembers).map(([role, members]) => (
            <div key={role} className="mb-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                {role} — {members.filter(m => m.status !== 'offline').length}
              </div>

              <div className="space-y-1">
                {members.filter(m => m.status !== 'offline').map((member) => (
                  <div key={member.id} className="flex items-center px-2 py-1 rounded hover:bg-[#34373c] cursor-pointer group">
                    <div className="relative mr-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{member.name[0].toUpperCase()}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-[#2f3136]`}></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-300 truncate">
                        {member.name}
                      </div>
                      {member.activity && (
                        <div className="text-xs text-gray-400 truncate">
                          {member.activity}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}