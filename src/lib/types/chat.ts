export interface Channel {
  id: string
  club_id: string
  name: string
  description?: string
  type: 'text' | 'voice' | 'announcement' | 'treasury'
  position: number
  is_private: boolean
  created_at: string
  created_by?: string
}

export interface Message {
  id: string
  channel_id: string
  user_id: string
  content: string
  message_type: 'text' | 'image' | 'file' | 'system'
  reply_to_id?: string
  edited_at?: string
  created_at: string

  // Joined data
  user_profile?: {
    id: string
    display_name?: string
    avatar_url?: string
  }
  reply_to?: Message
  reactions?: MessageReaction[]
}

export interface MessageReaction {
  id: string
  message_id: string
  user_id: string
  emoji: string
  created_at: string
}

export interface ChannelPermission {
  id: string
  channel_id: string
  role: 'owner' | 'admin' | 'member' | 'guest'
  min_tokens: number
  can_read: boolean
  can_write: boolean
  can_manage: boolean
  created_at: string
}

export interface SendMessageData {
  channel_id: string
  content: string
  message_type?: 'text' | 'image' | 'file'
  reply_to_id?: string
}

export interface CreateChannelData {
  club_id: string
  name: string
  description?: string
  type?: 'text' | 'voice' | 'announcement' | 'treasury'
  is_private?: boolean
}

export interface ChatState {
  messages: Message[]
  channels: Channel[]
  activeChannelId?: string
  isLoading: boolean
  hasMore: boolean
  error?: string
}

export interface TypingIndicator {
  user_id: string
  channel_id: string
  user_name: string
  timestamp: number
}