import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import {
  Channel,
  Message,
  SendMessageData,
  CreateChannelData,
  ChannelPermission
} from '@/lib/types/chat'
import type { RealtimeChannel } from '@supabase/supabase-js'

export class ChatService {
  private static get supabase() {
    return getSupabaseClient()
  }
  private static subscriptions: Map<string, RealtimeChannel> = new Map()

  // Get channels for a club
  static async getClubChannels(clubId: string): Promise<Channel[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty channels array')
      return []
    }

    const { data, error } = await this.supabase
      .from('channels')
      .select('*')
      .eq('club_id', clubId)
      .order('position', { ascending: true })

    if (error) {
      console.error('Error fetching channels:', error)
      throw error
    }

    return data || []
  }

  // Get messages for a channel with pagination
  static async getChannelMessages(
    channelId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty messages array')
      return []
    }

    const { data, error } = await this.supabase
      .from('messages')
      .select(`
        *,
        user_profile:user_profiles(id, display_name, avatar_url),
        reply_to:reply_to_id(
          id, content, user_id,
          user_profile:user_profiles(display_name)
        )
      `)
      .eq('channel_id', channelId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching messages:', error)
      throw error
    }

    // Reverse to show oldest first
    return (data || []).reverse()
  }

  // Send a message
  static async sendMessage(messageData: SendMessageData, userId: string): Promise<Message> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await this.supabase
      .from('messages')
      .insert([{
        ...messageData,
        user_id: userId,
        message_type: messageData.message_type || 'text'
      }])
      .select(`
        *,
        user_profile:user_profiles(id, display_name, avatar_url)
      `)
      .single()

    if (error) {
      console.error('Error sending message:', error)
      throw error
    }

    return data
  }

  // Edit a message
  static async editMessage(messageId: string, content: string): Promise<Message> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await this.supabase
      .from('messages')
      .update({
        content,
        edited_at: new Date().toISOString()
      })
      .eq('id', messageId)
      .select(`
        *,
        user_profile:user_profiles(id, display_name, avatar_url)
      `)
      .single()

    if (error) {
      console.error('Error editing message:', error)
      throw error
    }

    return data
  }

  // Delete a message
  static async deleteMessage(messageId: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const { error } = await this.supabase
      .from('messages')
      .delete()
      .eq('id', messageId)

    if (error) {
      console.error('Error deleting message:', error)
      throw error
    }
  }

  // Create a new channel
  static async createChannel(channelData: CreateChannelData, userId: string): Promise<Channel> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    // Get the highest position for ordering
    const { data: existingChannels } = await this.supabase
      .from('channels')
      .select('position')
      .eq('club_id', channelData.club_id)
      .order('position', { ascending: false })
      .limit(1)

    const nextPosition = existingChannels?.[0]?.position ? existingChannels[0].position + 1 : 0

    const { data, error } = await this.supabase
      .from('channels')
      .insert([{
        ...channelData,
        created_by: userId,
        position: nextPosition,
        type: channelData.type || 'text',
        is_private: channelData.is_private || false
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating channel:', error)
      throw error
    }

    return data
  }

  // Subscribe to real-time messages in a channel
  static subscribeToChannel(
    channelId: string,
    onMessage: (message: Message) => void,
    onError?: (error: any) => void
  ): () => void {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, real-time disabled')
      return () => {}
    }

    const channelName = `messages:${channelId}`

    // Clean up existing subscription
    if (this.subscriptions.has(channelName)) {
      this.subscriptions.get(channelName)?.unsubscribe()
    }

    const subscription = this.supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        async (payload) => {
          try {
            // Fetch the complete message with user profile
            const { data, error } = await this.supabase
              .from('messages')
              .select(`
                *,
                user_profile:user_profiles(id, display_name, avatar_url)
              `)
              .eq('id', payload.new.id)
              .single()

            if (error) throw error
            onMessage(data)
          } catch (error) {
            console.error('Error fetching new message:', error)
            onError?.(error)
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        async (payload) => {
          try {
            // Fetch the updated message
            const { data, error } = await this.supabase
              .from('messages')
              .select(`
                *,
                user_profile:user_profiles(id, display_name, avatar_url)
              `)
              .eq('id', payload.new.id)
              .single()

            if (error) throw error
            onMessage(data)
          } catch (error) {
            console.error('Error fetching updated message:', error)
            onError?.(error)
          }
        }
      )
      .subscribe()

    this.subscriptions.set(channelName, subscription)

    // Return cleanup function
    return () => {
      subscription.unsubscribe()
      this.subscriptions.delete(channelName)
    }
  }

  // Subscribe to typing indicators (for future implementation)
  static subscribeToTyping(
    channelId: string,
    onTyping: (userId: string, userName: string) => void
  ): () => void {
    // For now, return empty cleanup function
    // Will implement with presence feature later
    return () => {}
  }

  // Check if user can access channel (token-gated)
  static async canUserAccessChannel(channelId: string, userId: string): Promise<{
    canRead: boolean
    canWrite: boolean
    canManage: boolean
  }> {
    if (!isSupabaseConfigured()) {
      return { canRead: false, canWrite: false, canManage: false }
    }

    try {
      // Get user's membership info
      const { data: memberData } = await this.supabase
        .from('members')
        .select('token_balance, role, club_id')
        .eq('user_id', userId)
        .single()

      if (!memberData) {
        return { canRead: false, canWrite: false, canManage: false }
      }

      // Get channel permissions
      const { data: permissions } = await this.supabase
        .from('channel_permissions')
        .select('*')
        .eq('channel_id', channelId)
        .eq('role', memberData.role)
        .single()

      if (!permissions) {
        // Default permissions for members
        return { canRead: true, canWrite: true, canManage: false }
      }

      // Check if user has enough tokens
      const hasEnoughTokens = memberData.token_balance >= permissions.min_tokens

      return {
        canRead: permissions.can_read && hasEnoughTokens,
        canWrite: permissions.can_write && hasEnoughTokens,
        canManage: permissions.can_manage && hasEnoughTokens
      }

    } catch (error) {
      console.error('Error checking channel permissions:', error)
      return { canRead: false, canWrite: false, canManage: false }
    }
  }

  // Get channel info
  static async getChannelById(channelId: string): Promise<Channel | null> {
    if (!isSupabaseConfigured()) {
      return null
    }

    const { data, error } = await this.supabase
      .from('channels')
      .select('*')
      .eq('id', channelId)
      .single()

    if (error) {
      console.error('Error fetching channel:', error)
      return null
    }

    return data
  }

  // Clean up all subscriptions
  static cleanup(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe()
    })
    this.subscriptions.clear()
  }
}