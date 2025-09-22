import { Channel, Message } from '@/lib/types/chat'

// Mock data that matches our seed data
const mockUsers = [
  { id: '550e8400-e29b-41d4-a716-446655440001', display_name: 'alice', avatar_url: undefined },
  { id: '550e8400-e29b-41d4-a716-446655440002', display_name: 'bob', avatar_url: undefined },
  { id: '550e8400-e29b-41d4-a716-446655440003', display_name: 'carol', avatar_url: undefined },
  { id: '550e8400-e29b-41d4-a716-446655440004', display_name: 'david', avatar_url: undefined },
  { id: '550e8400-e29b-41d4-a716-446655440005', display_name: 'eve', avatar_url: undefined }
]

const mockChannels: Channel[] = [
  {
    id: 'channel-1',
    club_id: 'buidlers-united',
    name: 'general',
    description: 'General discussion for club members',
    type: 'text',
    position: 0,
    is_private: false,
    created_at: new Date().toISOString(),
    created_by: mockUsers[0].id
  },
  {
    id: 'channel-2',
    club_id: 'buidlers-united',
    name: 'announcements',
    description: 'Important club announcements',
    type: 'announcement',
    position: 1,
    is_private: false,
    created_at: new Date().toISOString(),
    created_by: mockUsers[0].id
  },
  {
    id: 'channel-3',
    club_id: 'buidlers-united',
    name: 'treasury',
    description: 'Treasury updates and financial discussions',
    type: 'treasury',
    position: 2,
    is_private: false,
    created_at: new Date().toISOString(),
    created_by: mockUsers[0].id
  },
  {
    id: 'channel-4',
    club_id: 'buidlers-united',
    name: 'building',
    description: 'Development updates and tech discussions',
    type: 'text',
    position: 3,
    is_private: false,
    created_at: new Date().toISOString(),
    created_by: mockUsers[0].id
  }
]

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    channel_id: 'channel-1',
    user_id: mockUsers[0].id,
    content: "Welcome to BUIDLers United! 🚀 Let's build the future together!",
    message_type: 'text',
    reply_to_id: undefined,
    edited_at: undefined,
    created_at: new Date(Date.now() - 8 * 60000).toISOString(),
    user_profile: mockUsers[0]
  },
  {
    id: 'msg-2',
    channel_id: 'channel-1',
    user_id: mockUsers[1].id,
    content: "Hey everyone! Just pushed a new smart contract to testnet. Anyone want to help with testing?",
    message_type: 'text',
    reply_to_id: undefined,
    edited_at: undefined,
    created_at: new Date(Date.now() - 7 * 60000).toISOString(),
    user_profile: mockUsers[1]
  },
  {
    id: 'msg-3',
    channel_id: 'channel-1',
    user_id: mockUsers[2].id,
    content: "Working on the new UI mockups for our treasury dashboard. Will share designs soon! 🎨",
    message_type: 'text',
    reply_to_id: undefined,
    edited_at: undefined,
    created_at: new Date(Date.now() - 6 * 60000).toISOString(),
    user_profile: mockUsers[2]
  },
  {
    id: 'msg-4',
    channel_id: 'channel-1',
    user_id: mockUsers[3].id,
    content: "Found a potential optimization in our liquidity pool contract. Reviewing the math now 📊",
    message_type: 'text',
    reply_to_id: undefined,
    edited_at: undefined,
    created_at: new Date(Date.now() - 5 * 60000).toISOString(),
    user_profile: mockUsers[3]
  },
  {
    id: 'msg-5',
    channel_id: 'channel-1',
    user_id: mockUsers[4].id,
    content: "Great to see so much activity! Our community is really growing 💪",
    message_type: 'text',
    reply_to_id: undefined,
    edited_at: undefined,
    created_at: new Date(Date.now() - 4 * 60000).toISOString(),
    user_profile: mockUsers[4]
  },
  {
    id: 'msg-6',
    channel_id: 'channel-1',
    user_id: mockUsers[0].id,
    content: "@bob I'd love to help test! What specific scenarios should we focus on?",
    message_type: 'text',
    reply_to_id: 'msg-2',
    edited_at: undefined,
    created_at: new Date(Date.now() - 3 * 60000).toISOString(),
    user_profile: mockUsers[0],
    reply_to: {
      id: 'msg-2',
      channel_id: 'channel-1',
      user_id: mockUsers[1].id,
      content: "Hey everyone! Just pushed a new smart contract to testnet. Anyone want to help with testing?",
      message_type: 'text',
      created_at: new Date(Date.now() - 7 * 60000).toISOString(),
      user_profile: {
        id: mockUsers[1].id,
        display_name: mockUsers[1].display_name,
        avatar_url: mockUsers[1].avatar_url
      }
    }
  },
  {
    id: 'msg-7',
    channel_id: 'channel-3',
    user_id: mockUsers[3].id,
    content: "The treasury is looking healthy! 💰 Current balance: 148,900 USDC",
    message_type: 'text',
    reply_to_id: undefined,
    edited_at: undefined,
    created_at: new Date(Date.now() - 2 * 60000).toISOString(),
    user_profile: mockUsers[3]
  },
  {
    id: 'msg-8',
    channel_id: 'channel-1',
    user_id: mockUsers[1].id,
    content: "Ship it! 🚢 Just deployed the latest version to mainnet",
    message_type: 'text',
    reply_to_id: undefined,
    edited_at: undefined,
    created_at: new Date(Date.now() - 1 * 60000).toISOString(),
    user_profile: mockUsers[1]
  }
]

export class MockChatService {
  // Get channels for a club
  static async getClubChannels(clubId: string): Promise<Channel[]> {
    await new Promise(resolve => setTimeout(resolve, 100)) // Simulate network delay
    return mockChannels.filter(channel => channel.club_id === clubId)
  }

  // Get messages for a channel
  static async getChannelMessages(
    channelId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    await new Promise(resolve => setTimeout(resolve, 200)) // Simulate network delay
    const channelMessages = mockMessages
      .filter(message => message.channel_id === channelId)
      .slice(offset, offset + limit)

    return channelMessages
  }

  // Send a message
  static async sendMessage(content: string, channelId: string, userId: string): Promise<Message> {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate network delay

    const user = mockUsers.find(u => u.id === userId) || mockUsers[0]
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      channel_id: channelId,
      user_id: userId,
      content,
      message_type: 'text',
      reply_to_id: undefined,
      edited_at: undefined,
      created_at: new Date().toISOString(),
      user_profile: user
    }

    // Add to mock data
    mockMessages.push(newMessage)

    return newMessage
  }

  // Edit a message
  static async editMessage(messageId: string, content: string): Promise<Message> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const messageIndex = mockMessages.findIndex(m => m.id === messageId)
    if (messageIndex === -1) {
      throw new Error('Message not found')
    }

    mockMessages[messageIndex] = {
      ...mockMessages[messageIndex],
      content,
      edited_at: new Date().toISOString()
    }

    return mockMessages[messageIndex]
  }

  // Delete a message
  static async deleteMessage(messageId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const messageIndex = mockMessages.findIndex(m => m.id === messageId)
    if (messageIndex !== -1) {
      mockMessages.splice(messageIndex, 1)
    }
  }

  // Check permissions (mock - always allow)
  static async canUserAccessChannel(channelId: string, userId: string): Promise<{
    canRead: boolean
    canWrite: boolean
    canManage: boolean
  }> {
    await new Promise(resolve => setTimeout(resolve, 100))

    // Mock user always has access for testing
    return {
      canRead: true,
      canWrite: true,
      canManage: userId === mockUsers[0].id // Alice is the owner
    }
  }

  // Mock subscription (doesn't actually subscribe but provides callback structure)
  static subscribeToChannel(
    channelId: string,
    onMessage: (message: Message) => void,
    onError?: (error: any) => void
  ): () => void {
    // In a real implementation, this would set up real-time subscriptions
    // For now, just return a cleanup function
    return () => {}
  }

  // Get channel by ID
  static async getChannelById(channelId: string): Promise<Channel | null> {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockChannels.find(channel => channel.id === channelId) || null
  }

  // Cleanup (no-op for mock)
  static cleanup(): void {
    // No cleanup needed for mock service
  }
}