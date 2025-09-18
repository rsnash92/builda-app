'use client'

import { useState } from 'react'
import { DiscordLayout } from '@/components/DiscordLayout'
import { ChatInterface } from '../[id]/components/ChatInterface'
import { SpecialChannelView } from '../[id]/components/SpecialChannelView'
import { ClubWithMembers } from '@/lib/database/types'

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

export default function DiscordClubPage() {
  const [currentChannel, setCurrentChannel] = useState('general')
  const [channelType, setChannelType] = useState<'text' | 'voice' | 'announcement' | 'special'>('text')

  // Mock data
  const onlineMembers = [
    { id: '1', name: 'alice', isBuilding: true, activity: 'shipping PR #234' },
    { id: '2', name: 'bob', isBuilding: true, activity: 'working on strategy' },
    { id: '3', name: 'carol', isBuilding: false },
    { id: '4', name: 'david', isBuilding: false },
    { id: '5', name: 'eve', isBuilding: true, activity: 'designing UI' },
    { id: '6', name: 'frank', isBuilding: false },
    { id: '7', name: 'grace', isBuilding: true, activity: 'testing features' },
    { id: '8', name: 'henry', isBuilding: false },
    { id: '9', name: 'ivy', isBuilding: true, activity: 'writing docs' },
    { id: '10', name: 'jack', isBuilding: false },
    { id: '11', name: 'kate', isBuilding: true, activity: 'code review' },
    { id: '12', name: 'leo', isBuilding: false }
  ]

  const clubStats = {
    treasury: 148900,
    yourShare: 0.34,
    activity: 'High' as const,
    todaysBuilds: 12,
    buildStreak: 7,
    buidlDistributed: 5234
  }

  const topBuilders = [
    { id: '1', name: 'alice', earnings: 3450, rank: 1, built: 'Shipped trading bot v2' },
    { id: '2', name: 'bob', earnings: 2890, rank: 2, built: 'Fixed 5 critical bugs' },
    { id: '3', name: 'carol', earnings: 2100, rank: 3, built: 'UI redesign complete' },
    { id: '4', name: 'david', earnings: 1850, rank: 4, built: 'Database optimization' },
    { id: '5', name: 'eve', earnings: 1650, rank: 5, built: 'API documentation' }
  ]

  const handleChannelSelect = (channelId: string, type: 'text' | 'voice' | 'announcement' | 'special') => {
    setCurrentChannel(channelId)
    setChannelType(type)
  }

  const renderMainContent = () => {
    if (channelType === 'special') {
      return <SpecialChannelView channelType={currentChannel as any} club={mockClub} />
    }
    
    return <ChatInterface channelName={currentChannel} channelType={channelType} />
  }

  return (
    <DiscordLayout
      currentClub={{
        id: mockClub.id,
        name: mockClub.name,
        icon: 'B',
        isActive: true
      }}
      onlineMembers={onlineMembers}
      clubStats={clubStats}
      topBuilders={topBuilders}
    >
      {renderMainContent()}
    </DiscordLayout>
  )
}
