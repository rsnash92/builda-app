'use client'

import { useState, useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useMockChat } from '@/hooks/useMockChat'
import { Message } from '@/lib/types/chat'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'

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

  // Mock members data
  const mockMembers = {
    'Moderators': [
      { id: '1', name: 'alice', status: 'online', activity: 'Building smart contracts' },
      { id: '2', name: 'bob', status: 'online', activity: 'Code Review' },
    ],
    'Alumni': [
      { id: '3', name: 'carol', status: 'away', activity: 'Designing UI' },
      { id: '4', name: 'david', status: 'online', activity: 'DeFi Research' },
    ],
    'Members': [
      { id: '5', name: 'eve', status: 'online', activity: 'Community Management' },
      { id: '6', name: 'frank', status: 'idle', activity: null },
      { id: '7', name: 'grace', status: 'online', activity: 'Testing Features' },
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'idle': return 'bg-yellow-600'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

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
    <div className="flex-1 flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
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
                    <span className="text-white text-2xl font-bold">#</span>
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

      {/* Members Sidebar */}
      <div className="w-60 bg-[#2f3136] border-l border-[#202225] overflow-y-auto">
        <div className="p-4">
          {Object.entries(mockMembers).map(([role, members]) => (
            <div key={role} className="mb-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                {role} — {members.filter(m => m.status !== 'offline').length}
              </div>

              <div className="space-y-1">
                {members.filter(m => m.status !== 'offline').map((member) => (
                  <div key={member.id} className="flex items-center px-2 py-1 rounded hover:bg-[#34373c] cursor-pointer group">
                    <div className="relative mr-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{member.name[0].toUpperCase()}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-[#2f3136]`}></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-300 truncate">
                        {member.name}
                      </div>
                      {member.activity && (
                        <div className="text-xs text-gray-400 truncate">
                          {member.activity}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}