'use client'

import { useState } from 'react'
import { DiscordChatArea } from '@/components/chat/DiscordChatArea'
import { ClubWithMembers } from '@/lib/database/types'
import { Hash, Volume2, Megaphone, Crown, Users, Minus, Square, X } from 'lucide-react'
import Image from 'next/image'

// Mock club data
const mockClub: ClubWithMembers = {
  id: 'buidlers-united',
  name: 'BUIDLers United',
  description: 'A community of builders creating the future of Web3',
  category: 'Developer',
  token_symbol: 'BUIDL',
  treasury_balance: 148900,
  token_address: '0x1234567890abcdef',
  treasury_address: '0xabcdef1234567890',
  thumbnail_url: undefined,
  likes: 1247,
  is_hot: true,
  is_lord_of_dev: false,
  progress: 75,
  market_cap: 148900,
  market_cap_change: 12.5,
  volume: 25000,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  created_by: 'demo-user',
  members: [],
  member_count: 287
}

// Mock channels with thumbnails (simulating Discord-style server icons)
const mockChannels = [
  { id: 'lofi', name: 'Lofi Hip Hop', type: 'text' as const, icon: '🎵', color: 'from-purple-500 to-pink-500' },
  { id: 'jdoodle', name: 'JDoodle', type: 'text' as const, icon: 'JD', color: 'from-blue-500 to-cyan-500' },
  { id: 'next', name: 'Next.js', type: 'text' as const, icon: '▲', color: 'from-black to-gray-800' },
  { id: 'omitheworld', name: 'OmiTheWorld', type: 'text' as const, icon: '🌍', color: 'from-green-500 to-teal-500' },
  { id: 'cyber', name: 'Cyberpunk', type: 'text' as const, icon: '🤖', color: 'from-yellow-500 to-orange-500' },
  { id: 'nvy', name: 'NVY', type: 'text' as const, icon: 'N', color: 'from-indigo-500 to-purple-500' },
  { id: 'bkly', name: 'Brooklyn', type: 'text' as const, icon: 'B', color: 'from-cyan-500 to-blue-500' },
  { id: 'mosaic', name: 'Mosaic', type: 'text' as const, icon: '🎨', color: 'from-orange-500 to-red-500' },
  { id: 'google', name: 'Google', type: 'text' as const, icon: 'G', color: 'from-red-500 to-yellow-500' }
]

export default function DiscordClubPage() {
  const [activeChannel, setActiveChannel] = useState('lofi')

  return (
    <div className="h-screen bg-[#2f3136] flex flex-col">
      {/* Discord-style header bar */}
      <div className="bg-[#202225] h-8 flex items-center justify-between px-2 border-b border-[#1e2124]">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <span className="text-white text-sm font-medium">Discord</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="w-8 h-6 flex items-center justify-center hover:bg-[#36393f] rounded">
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button className="w-8 h-6 flex items-center justify-center hover:bg-[#36393f] rounded">
            <Square className="w-3 h-3 text-white" />
          </button>
          <button className="w-8 h-6 flex items-center justify-center hover:bg-red-500 rounded">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Channel thumbnails header */}
      <div className="bg-[#2f3136] px-4 py-3 border-b border-[#202225]">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {mockChannels.map((channel) => {
            const isActive = channel.id === activeChannel

            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`flex-shrink-0 relative group ${isActive ? '' : 'hover:scale-105'} transition-transform`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${channel.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                  isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-[#2f3136]' : ''
                }`}>
                  {channel.icon}
                </div>

                {/* Server name tooltip */}
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {channel.name}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r"></div>
                )}
              </button>
            )
          })}

          {/* Add server button */}
          <button className="flex-shrink-0 w-12 h-12 bg-[#36393f] hover:bg-[#3ba55c] rounded-full flex items-center justify-center transition-colors group">
            <span className="text-[#3ba55c] group-hover:text-white text-xl font-bold">+</span>
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 bg-[#36393f]">
        <DiscordChatArea
          clubId={mockClub.id}
          clubName={mockChannels.find(c => c.id === activeChannel)?.name || 'Channel'}
          activeChannelId={activeChannel}
        />
      </div>
    </div>
  )
}
