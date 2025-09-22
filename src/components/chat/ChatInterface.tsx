'use client'

import { useState, useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useChat } from '@/hooks/useChat'
import { Message } from '@/lib/types/chat'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'
import { ChannelList } from './ChannelList'
import { Hash, Users, ChevronDown, MoreVertical } from 'lucide-react'

interface ChatInterfaceProps {
  clubId: string
  clubName: string
  initialChannelId?: string
}

export function ChatInterface({ clubId, clubName, initialChannelId }: ChatInterfaceProps) {
  const { user, authenticated } = usePrivy()
  const [replyTo, setReplyTo] = useState<Message | undefined>()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    channels,
    activeChannelId,
    activeChannel,
    isLoading,
    hasMore,
    error,
    sendMessage,
    editMessage,
    deleteMessage,
    switchChannel,
    loadMoreMessages,
    clearError
  } = useChat(clubId, initialChannelId)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Check if user is near bottom of messages
  const isNearBottom = () => {
    const container = messagesContainerRef.current
    if (!container) return true

    const threshold = 100
    const position = container.scrollTop + container.clientHeight
    const height = container.scrollHeight

    return height - position <= threshold
  }

  // Auto-scroll when new messages arrive (only if user is near bottom)
  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom()
    }
  }, [messages])

  // Handle scroll to load more messages
  const handleScroll = () => {
    const container = messagesContainerRef.current
    if (!container) return

    if (container.scrollTop === 0 && hasMore && !isLoading) {
      const scrollHeight = container.scrollHeight
      loadMoreMessages()

      // Maintain scroll position after loading
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight - scrollHeight
        }
      }, 100)
    }
  }

  const handleSendMessage = (content: string, replyToId?: string) => {
    sendMessage(content, replyToId)
    setReplyTo(undefined)
  }

  const handleEditMessage = (messageId: string, content: string) => {
    editMessage(messageId, content)
  }

  const handleDeleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageId)
    }
  }

  const handleReply = (message: Message) => {
    setReplyTo(message)
  }

  const shouldShowAvatar = (message: Message, index: number) => {
    if (index === 0) return true

    const prevMessage = messages[index - 1]
    if (!prevMessage) return true

    // Show avatar if different user or more than 5 minutes apart
    const timeDiff = new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime()
    return prevMessage.user_id !== message.user_id || timeDiff > 5 * 60 * 1000
  }

  if (!authenticated) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Please log in to join the conversation
      </div>
    )
  }

  return (
    <div className="h-full flex bg-[#36393f]">
      {/* Channel Sidebar */}
      <div className="w-60 bg-[#2f3136] border-r border-[#202225] flex flex-col">
        {/* Club Header */}
        <div className="p-4 border-b border-[#202225]">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold truncate">{clubName}</h2>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto">
          <ChannelList
            channels={channels}
            activeChannelId={activeChannelId}
            onChannelSelect={switchChannel}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Hash className="w-5 h-5 text-gray-400" />
            <span className="text-white font-semibold">
              {activeChannel?.name || 'Select a channel'}
            </span>
            {activeChannel?.description && (
              <>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400 text-sm">{activeChannel.description}</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-600 text-white px-4 py-2 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto scroll-smooth"
          >
            {/* Loading indicator for pagination */}
            {isLoading && hasMore && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
              </div>
            )}

            {/* Welcome message */}
            {messages.length === 0 && !isLoading && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hash className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Welcome to #{activeChannel?.name}!
                </h3>
                <p className="text-gray-400 text-sm">
                  {activeChannel?.description || 'This is the beginning of the conversation.'}
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="pb-4">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.user_id === user?.id}
                  showAvatar={shouldShowAvatar(message, index)}
                  onEdit={handleEditMessage}
                  onDelete={handleDeleteMessage}
                  onReply={handleReply}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <MessageInput
            onSendMessage={handleSendMessage}
            placeholder={`Message #${activeChannel?.name || 'channel'}`}
            disabled={!activeChannelId || isLoading}
            replyTo={replyTo}
            onClearReply={() => setReplyTo(undefined)}
          />
        </div>
      </div>
    </div>
  )
}