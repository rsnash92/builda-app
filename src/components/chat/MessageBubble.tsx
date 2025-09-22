'use client'

import { useState, useRef, useEffect } from 'react'
import { Message } from '@/lib/types/chat'
import { formatDistanceToNow } from 'date-fns'
import { MoreHorizontal, Edit2, Trash2, Reply } from 'lucide-react'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  showAvatar: boolean
  onEdit?: (messageId: string, content: string) => void
  onDelete?: (messageId: string) => void
  onReply?: (message: Message) => void
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar,
  onEdit,
  onDelete,
  onReply
}: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)
  const editInputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    if (onEdit && editContent.trim() !== message.content) {
      onEdit(message.id, editContent.trim())
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditContent(message.content)
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [isEditing])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getUserInitials = (name?: string) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div
      className={`group flex items-start space-x-3 px-4 py-1 hover:bg-[#32353b] transition-colors ${
        showAvatar ? 'mt-4' : 'mt-0.5'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 ${showAvatar ? 'mt-0' : 'mt-0'}`}>
        {showAvatar ? (
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {getUserInitials(message.user_profile?.display_name)}
            </span>
          </div>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-gray-500">
              {formatTime(message.created_at)}
            </span>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header (only show for first message in group) */}
        {showAvatar && (
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="font-medium text-white text-sm">
              {message.user_profile?.display_name || 'Unknown User'}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(message.created_at)}
            </span>
            {message.edited_at && (
              <span className="text-xs text-gray-500">(edited)</span>
            )}
          </div>
        )}

        {/* Reply indicator */}
        {message.reply_to && (
          <div className="flex items-center space-x-1 mb-1 text-xs text-gray-400">
            <Reply className="w-3 h-3" />
            <span>
              Replying to {message.reply_to.user_profile?.display_name}:
              {message.reply_to.content.length > 50
                ? `${message.reply_to.content.slice(0, 50)}...`
                : message.reply_to.content
              }
            </span>
          </div>
        )}

        {/* Message content */}
        <div className="relative">
          {isEditing ? (
            <input
              ref={editInputRef}
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="w-full bg-[#40444b] text-white px-2 py-1 rounded text-sm border-none outline-none"
            />
          ) : (
            <div className="text-sm text-gray-300 whitespace-pre-wrap break-words">
              {message.content}
            </div>
          )}

          {/* Message actions */}
          {showActions && !isEditing && (
            <div className="absolute -top-4 right-0 bg-[#2f3136] border border-[#40444b] rounded shadow-lg flex items-center">
              {onReply && (
                <button
                  onClick={() => onReply(message)}
                  className="p-1 hover:bg-[#40444b] text-gray-400 hover:text-white transition-colors"
                  title="Reply"
                >
                  <Reply className="w-4 h-4" />
                </button>
              )}

              {isOwn && onEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-[#40444b] text-gray-400 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}

              {isOwn && onDelete && (
                <button
                  onClick={() => onDelete(message.id)}
                  className="p-1 hover:bg-[#40444b] text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                className="p-1 hover:bg-[#40444b] text-gray-400 hover:text-white transition-colors"
                title="More"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}