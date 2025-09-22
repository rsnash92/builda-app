'use client'

import { useState, useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useMockChat } from '@/hooks/useMockChat'
import { Message } from '@/lib/types/chat'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'
import { Hash, Users, Bell, Pin, Search, Inbox, HelpCircle, AtSign } from 'lucide-react'

interface DiscordChatAreaProps {
  clubId: string
  clubName: string
  activeChannelId?: string
}

export function DiscordChatArea({ clubId, clubName, activeChannelId }: DiscordChatAreaProps) {
  const { user, authenticated } = usePrivy()
  const [replyTo, setReplyTo] = useState<Message | undefined>()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    channels,
    activeChannelId: currentChannelId,
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
  } = useMockChat(clubId, activeChannelId)

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

  return (
    <div className="flex-1 flex flex-col">
      {/* Channel Header */}
      <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <Hash className="w-6 h-6 text-gray-400" />
          <span className="text-white font-semibold">
            {activeChannel?.name || 'general'}
          </span>
          {activeChannel?.description && (
            <>
              <div className="w-px h-6 bg-gray-600"></div>
              <span className="text-gray-400 text-sm">{activeChannel.description}</span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
          <Pin className="w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
          <Users className="w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer" />

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-36 h-6 bg-[#202225] border-none rounded text-sm text-gray-300 pl-8 pr-2 focus:outline-none focus:w-60 transition-all"
            />
          </div>

          <Inbox className="w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
          <HelpCircle className="w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
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
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#5865f2]"></div>
            </div>
          )}

          {/* Welcome message */}
          {messages.length === 0 && !isLoading && (
            <div className="p-4 pt-8">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-[#5865f2] rounded-full flex items-center justify-center mr-4 mt-1">
                  <Hash className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2">
                    Welcome to #{activeChannel?.name || 'general'}!
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {activeChannel?.description || 'This is the beginning of the conversation in this channel.'}
                  </p>
                </div>
              </div>
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
        <div className="p-4">
          <MessageInput
            onSendMessage={handleSendMessage}
            placeholder={`Message #${activeChannel?.name || 'channel'}`}
            disabled={!currentChannelId || isLoading}
            replyTo={replyTo}
            onClearReply={() => setReplyTo(undefined)}
          />
        </div>
      </div>
    </div>
  )
}