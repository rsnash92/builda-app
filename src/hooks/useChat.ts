import { useState, useEffect, useCallback, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { ChatService } from '@/lib/services/chat-service'
import { Channel, Message, SendMessageData, ChatState } from '@/lib/types/chat'

export function useChat(clubId: string, initialChannelId?: string) {
  const { user, authenticated } = usePrivy()
  const [state, setState] = useState<ChatState>({
    messages: [],
    channels: [],
    activeChannelId: initialChannelId,
    isLoading: false,
    hasMore: true,
    error: undefined
  })

  const subscriptionRef = useRef<(() => void) | null>(null)
  const messageOffsetRef = useRef(0)

  // Load channels for the club
  const loadChannels = useCallback(async () => {
    if (!clubId) return

    try {
      setState(prev => ({ ...prev, isLoading: true, error: undefined }))
      const channels = await ChatService.getClubChannels(clubId)

      setState(prev => ({
        ...prev,
        channels,
        isLoading: false,
        // Set active channel to first text channel if none selected
        activeChannelId: prev.activeChannelId || channels.find(c => c.type === 'text')?.id
      }))
    } catch (error) {
      console.error('Error loading channels:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load channels'
      }))
    }
  }, [clubId])

  // Load messages for active channel
  const loadMessages = useCallback(async (channelId: string, offset: number = 0, append: boolean = false) => {
    if (!channelId || !authenticated) return

    try {
      if (!append) {
        setState(prev => ({ ...prev, isLoading: true, error: undefined }))
      }

      const messages = await ChatService.getChannelMessages(channelId, 50, offset)

      setState(prev => ({
        ...prev,
        messages: append ? [...messages, ...prev.messages] : messages,
        isLoading: false,
        hasMore: messages.length === 50 // Has more if we got a full page
      }))

      if (!append) {
        messageOffsetRef.current = messages.length
      } else {
        messageOffsetRef.current += messages.length
      }

    } catch (error) {
      console.error('Error loading messages:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load messages'
      }))
    }
  }, [authenticated])

  // Load more messages (for pagination)
  const loadMoreMessages = useCallback(() => {
    if (!state.activeChannelId || state.isLoading || !state.hasMore) return
    loadMessages(state.activeChannelId, messageOffsetRef.current, true)
  }, [state.activeChannelId, state.isLoading, state.hasMore, loadMessages])

  // Send a message
  const sendMessage = useCallback(async (content: string, replyToId?: string) => {
    if (!state.activeChannelId || !user?.id || !content.trim()) return

    try {
      const messageData: SendMessageData = {
        channel_id: state.activeChannelId,
        content: content.trim(),
        reply_to_id: replyToId
      }

      await ChatService.sendMessage(messageData, user.id)
      // Message will be added via real-time subscription
    } catch (error) {
      console.error('Error sending message:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to send message'
      }))
    }
  }, [state.activeChannelId, user?.id])

  // Edit a message
  const editMessage = useCallback(async (messageId: string, content: string) => {
    if (!content.trim()) return

    try {
      await ChatService.editMessage(messageId, content.trim())
      // Message will be updated via real-time subscription
    } catch (error) {
      console.error('Error editing message:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to edit message'
      }))
    }
  }, [])

  // Delete a message
  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      await ChatService.deleteMessage(messageId)
      // Remove message from local state
      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m.id !== messageId)
      }))
    } catch (error) {
      console.error('Error deleting message:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete message'
      }))
    }
  }, [])

  // Switch to a different channel
  const switchChannel = useCallback((channelId: string) => {
    setState(prev => ({ ...prev, activeChannelId: channelId, messages: [] }))
    messageOffsetRef.current = 0
  }, [])

  // Handle real-time message updates
  const handleNewMessage = useCallback((message: Message) => {
    setState(prev => {
      // Check if message already exists (avoid duplicates)
      if (prev.messages.some(m => m.id === message.id)) {
        // Update existing message
        return {
          ...prev,
          messages: prev.messages.map(m => m.id === message.id ? message : m)
        }
      }

      // Add new message
      return {
        ...prev,
        messages: [...prev.messages, message]
      }
    })
  }, [])

  // Set up real-time subscription when active channel changes
  useEffect(() => {
    if (!state.activeChannelId || !authenticated) return

    // Clean up previous subscription
    if (subscriptionRef.current) {
      subscriptionRef.current()
      subscriptionRef.current = null
    }

    // Load messages for the new channel
    loadMessages(state.activeChannelId)

    // Set up real-time subscription
    subscriptionRef.current = ChatService.subscribeToChannel(
      state.activeChannelId,
      handleNewMessage,
      (error) => {
        console.error('Real-time subscription error:', error)
        setState(prev => ({
          ...prev,
          error: 'Real-time connection lost'
        }))
      }
    )

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current()
        subscriptionRef.current = null
      }
    }
  }, [state.activeChannelId, authenticated, loadMessages, handleNewMessage])

  // Load channels on mount
  useEffect(() => {
    loadChannels()
  }, [loadChannels])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current()
      }
      ChatService.cleanup()
    }
  }, [])

  return {
    // State
    ...state,

    // Actions
    sendMessage,
    editMessage,
    deleteMessage,
    switchChannel,
    loadMoreMessages,
    refreshChannels: loadChannels,

    // Computed values
    activeChannel: state.channels.find(c => c.id === state.activeChannelId),
    messageCount: state.messages.length,

    // Utilities
    clearError: () => setState(prev => ({ ...prev, error: undefined }))
  }
}