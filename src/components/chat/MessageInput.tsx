'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Plus, X } from 'lucide-react'
import { Message } from '@/lib/types/chat'

interface MessageInputProps {
  onSendMessage: (content: string, replyToId?: string) => void
  placeholder?: string
  disabled?: boolean
  replyTo?: Message
  onClearReply?: () => void
}

export function MessageInput({
  onSendMessage,
  placeholder = "Send a message...",
  disabled = false,
  replyTo,
  onClearReply
}: MessageInputProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), replyTo?.id)
      setMessage('')
      onClearReply?.()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  return (
    <div className="p-4 bg-[#2f3136]">
      {/* Reply indicator */}
      {replyTo && (
        <div className="mb-2 p-2 bg-[#40444b] rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <span className="text-gray-400">Replying to</span>
            <span className="font-medium">{replyTo.user_profile?.display_name}</span>
            <span className="text-gray-400">
              {replyTo.content.length > 50
                ? `${replyTo.content.slice(0, 50)}...`
                : replyTo.content
              }
            </span>
          </div>
          <button
            onClick={onClearReply}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input area */}
      <div className={`relative bg-[#40444b] rounded-lg ${replyTo ? 'rounded-t-none' : ''}`}>
        <div className="flex items-end">
          {/* Attachment button */}
          <button
            className="p-3 text-gray-400 hover:text-white transition-colors"
            disabled={disabled}
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Text input */}
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none resize-none py-3 pr-3 max-h-[200px] min-h-[44px]"
            rows={1}
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className={`p-3 transition-colors ${
              message.trim() && !disabled
                ? 'text-orange-400 hover:text-orange-300'
                : 'text-gray-600'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Character count (if needed) */}
      {message.length > 1800 && (
        <div className="mt-1 text-right">
          <span className={`text-xs ${message.length > 2000 ? 'text-red-400' : 'text-yellow-400'}`}>
            {message.length}/2000
          </span>
        </div>
      )}
    </div>
  )
}