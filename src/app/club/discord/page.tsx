'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { DiscordChatArea } from '@/components/chat/DiscordChatArea'
import { ClubWithMembers } from '@/lib/database/types'
import { Hash, Volume2, Megaphone, Crown, Users } from 'lucide-react'
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

// Mock channels data
const mockChannels = [
  { id: 'general', name: 'general', type: 'text' as const, icon: Hash, unread: 0 },
  { id: 'announcements', name: 'announcements', type: 'announcement' as const, icon: Megaphone, unread: 2 },
  { id: 'treasury', name: 'treasury', type: 'special' as const, icon: Crown, unread: 0 },
  { id: 'building', name: 'building', type: 'text' as const, icon: Hash, unread: 1 },
  { id: 'voice-general', name: 'General Voice', type: 'voice' as const, icon: Volume2, unread: 0 }
]

export default function DiscordClubPage() {
  const [activeChannel, setActiveChannel] = useState('general')

  // Create the horizontal channel tabs header
  const channelTabsHeader = (
    <div className="bg-[#36393f] border-b border-[#202225] px-4 py-3">
      <div className="flex items-center space-x-6">
        {/* Builda Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/builda-logo.webp"
            alt="builda.club"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
            priority
          />
          <span className="text-white font-semibold text-lg">{mockClub.name}</span>
        </div>

        {/* Channel tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {mockChannels.map((channel) => {
            const Icon = channel.icon
            const isActive = channel.id === activeChannel

            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded transition-colors whitespace-nowrap relative ${
                  isActive
                    ? 'bg-[#404249] text-white'
                    : 'text-gray-300 hover:bg-[#404249] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{channel.name}</span>
                {channel.unread > 0 && (
                  <div className="w-4 h-4 bg-[#f23f42] rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{channel.unread}</span>
                  </div>
                )}
                {channel.type === 'voice' && (
                  <Users className="w-3 h-3 text-gray-400" />
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <AppLayout
      pageTitle="Discord-Style Club Chat"
      currentClubId={mockClub.id}
      isLoggedIn={true}
      user={{ username: 'alice', avatar: undefined }}
      currentClub={{ name: mockClub.name, id: mockClub.id }}
      additionalHeaderContent={channelTabsHeader}
    >
      <div className="h-full bg-[#36393f]">
        <DiscordChatArea
          clubId={mockClub.id}
          clubName={mockClub.name}
          activeChannelId={activeChannel}
        />
      </div>
    </AppLayout>
  )
}
