'use client'

import { DiscordStyleLayout } from '@/components/DiscordStyleLayout'
import { DiscordChatArea } from '@/components/chat/DiscordChatArea'
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

  return (
    <DiscordStyleLayout
      currentServer={{
        id: mockClub.id,
        name: mockClub.name,
        icon: 'B'
      }}
    >
      <DiscordChatArea
        clubId={mockClub.id}
        clubName={mockClub.name}
        activeChannelId="general"
      />
    </DiscordStyleLayout>
  )
}
