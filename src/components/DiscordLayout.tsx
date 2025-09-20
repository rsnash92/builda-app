'use client'

import { ReactNode, useState } from 'react'
import { AppLayout } from './AppLayout'
import {
  Hash,
  Volume2,
  Megaphone,
  Vote,
  BarChart3,
  Hammer,
  Crown
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
  pageTitle = "builda.club",
  currentClub,
  onlineMembers = [],
  clubStats,
  topBuilders = []
}: DiscordLayoutProps) {
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  // Mock channels data
  const channels = [
    { id: 'general', name: 'general', type: 'text' as const, isActive: true },
    { id: 'random', name: 'random', type: 'text' as const },
    { id: 'announcements', name: 'announcements', type: 'announcement' as const },
    { id: 'voice-general', name: 'General', type: 'voice' as const },
    { id: 'treasury', name: 'treasury', type: 'special' as const },
    { id: 'governance', name: 'governance', type: 'special' as const },
    { id: 'building', name: 'building', type: 'special' as const },
  ]

  const getChannelIcon = (type: string, name?: string) => {
    switch (type) {
      case 'voice': return Volume2
      case 'announcement': return Megaphone
      case 'special':
        if (name === 'treasury') return Crown
        if (name === 'governance') return Vote
        if (name === 'building') return Hammer
        return BarChart3
      default: return Hash
    }
  }

  return (
    <AppLayout pageTitle={pageTitle}>
      <div className="h-full bg-[#15161a] flex">
        {/* Discord Channels Sidebar */}
        <div className="w-64 bg-[#202128] border-r border-[#24252a] flex flex-col">
          {/* Club Header */}
          <div className="p-4 border-b border-[#24252a]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{currentClub?.icon || 'C'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {currentClub?.name || 'Select Club'}
                </div>
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Text Channels
              </div>
              <div className="space-y-1">
                {channels.filter(c => c.type === 'text').map((channel) => {
                  const Icon = getChannelIcon(channel.type, channel.name)
                  return (
                    <div
                      key={channel.id}
                      className={`flex items-center space-x-2 px-2 py-1.5 cursor-pointer transition-colors rounded ${
                        channel.isActive
                          ? 'bg-[#15161a] text-white'
                          : 'text-gray-400 hover:bg-[#15161a] hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                  )
                })}
              </div>

              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">
                Voice Channels
              </div>
              <div className="space-y-1">
                {channels.filter(c => c.type === 'voice').map((channel) => {
                  const Icon = getChannelIcon(channel.type, channel.name)
                  return (
                    <div
                      key={channel.id}
                      className="flex items-center space-x-2 px-2 py-1.5 cursor-pointer transition-colors rounded text-gray-400 hover:bg-[#15161a] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                  )
                })}
              </div>

              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">
                Club Tools
              </div>
              <div className="space-y-1">
                {channels.filter(c => c.type === 'special' || c.type === 'announcement').map((channel) => {
                  const Icon = getChannelIcon(channel.type, channel.name)
                  return (
                    <div
                      key={channel.id}
                      className="flex items-center space-x-2 px-2 py-1.5 cursor-pointer transition-colors rounded text-gray-400 hover:bg-[#15161a] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Discord Channel Header */}
          <div className="h-12 bg-[#202128] border-b border-[#24252a] flex items-center px-4">
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
          <div className="w-80 bg-[#202128] border-l border-[#24252a] flex flex-col">
            {/* Online Members */}
            <div className="p-4 border-b border-[#24252a]">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Online — {onlineMembers.length}
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {onlineMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{member.name[0].toUpperCase()}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#202128] ${
                        member.isBuilding ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
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

            {/* Club Stats */}
            {clubStats && (
              <div className="p-4 border-b border-[#24252a]">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Club Stats
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Treasury</span>
                    <span className="text-sm font-semibold text-white">${clubStats.treasury.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Your Share</span>
                    <span className="text-sm font-semibold text-white">{clubStats.yourShare}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Activity</span>
                    <span className={`text-sm font-semibold ${
                      clubStats.activity === 'High' ? 'text-green-400' :
                      clubStats.activity === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {clubStats.activity}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Top Builders */}
            {topBuilders.length > 0 && (
              <div className="p-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Top Builders
                </div>
                <div className="space-y-3">
                  {topBuilders.map((builder) => (
                    <div key={builder.id} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-400">#{builder.rank}</span>
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{builder.name[0].toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          {builder.name}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {builder.built}
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-orange-400">
                        +{builder.earnings}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}