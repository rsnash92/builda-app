import { useState, useEffect, useCallback, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { MockChatService } from '@/lib/services/mock-chat-service'
import { Channel, Message, ChatState } from '@/lib/types/chat'

export function useMockChat(clubId: string, initialChannelId?: string) {
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
      const channels = await MockChatService.getClubChannels(clubId)

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
    if (!channelId) return

    try {
      if (!append) {
        setState(prev => ({ ...prev, isLoading: true, error: undefined }))
      }

      const messages = await MockChatService.getChannelMessages(channelId, 50, offset)

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
  }, [])

  // Send a message
  const sendMessage = useCallback(async (content: string, replyToId?: string) => {
    if (!state.activeChannelId || !user?.id || !content.trim()) return

    try {
      const newMessage = await MockChatService.sendMessage(
        content.trim(),
        state.activeChannelId,
        user.id
      )

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }))
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
    try {
      const updatedMessage = await MockChatService.editMessage(messageId, content)

      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === messageId ? updatedMessage : msg
        )
      }))
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
      await MockChatService.deleteMessage(messageId)

      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== messageId)
      }))
    } catch (error) {
      console.error('Error deleting message:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete message'
      }))
    }
  }, [])

  // Switch channel
  const switchChannel = useCallback((channelId: string) => {
    setState(prev => ({
      ...prev,
      activeChannelId: channelId,
      messages: [],
      hasMore: true
    }))
    messageOffsetRef.current = 0
  }, [])

  // Load more messages (pagination)
  const loadMoreMessages = useCallback(() => {
    if (state.activeChannelId && state.hasMore && !state.isLoading) {
      loadMessages(state.activeChannelId, messageOffsetRef.current, true)
    }
  }, [state.activeChannelId, state.hasMore, state.isLoading, loadMessages])

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: undefined }))
  }, [])

  // Load channels on mount
  useEffect(() => {
    loadChannels()
  }, [loadChannels])

  // Load messages when active channel changes
  useEffect(() => {
    if (state.activeChannelId) {
      loadMessages(state.activeChannelId)
    }
  }, [state.activeChannelId, loadMessages])

  // Set up real-time subscription for active channel
  useEffect(() => {
    if (!state.activeChannelId) return

    // Clean up previous subscription
    if (subscriptionRef.current) {
      subscriptionRef.current()
    }

    // Set up new subscription (mock doesn't actually subscribe)
    subscriptionRef.current = MockChatService.subscribeToChannel(
      state.activeChannelId,
      (newMessage: Message) => {
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, newMessage]
        }))
      },
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
      }
    }
  }, [state.activeChannelId])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      MockChatService.cleanup()
    }
  }, [])

  // Get active channel info
  const activeChannel = state.channels.find(c => c.id === state.activeChannelId)

  return {
    messages: state.messages,
    channels: state.channels,
    activeChannelId: state.activeChannelId,
    activeChannel,
    isLoading: state.isLoading,
    hasMore: state.hasMore,
    error: state.error,
    sendMessage,
    editMessage,
    deleteMessage,
    switchChannel,
    loadMoreMessages,
    clearError
  }
}