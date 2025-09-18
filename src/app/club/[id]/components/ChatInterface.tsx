'use client'

import { useState } from 'react'
import { Send, Smile, Paperclip, AtSign, Hash, Mic, Megaphone, Gem, Hammer, BarChart3, Package } from 'lucide-react'

interface Message {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: string
  isBuilding?: boolean
  isSystem?: boolean
}

interface ChatInterfaceProps {
  channelName: string
  channelType: 'text' | 'voice' | 'announcement' | 'special'
}

export function ChatInterface({ channelName, channelType }: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [messages] = useState<Message[]>([
    {
      id: '1',
      user: 'alice.sol',
      avatar: 'A',
      content: 'Just shipped PR #234! 🚀 The new trading algorithm is working perfectly.',
      timestamp: '2:30 PM',
      isBuilding: true
    },
    {
      id: '2',
      user: 'bob.eth',
      avatar: 'B',
      content: 'Nice work! The backtesting results look great. When do you think we can deploy to mainnet?',
      timestamp: '2:32 PM'
    },
    {
      id: '3',
      user: 'charlie.eth',
      avatar: 'C',
      content: 'I can help with the deployment process. I have experience with the infrastructure setup.',
      timestamp: '2:35 PM',
      isBuilding: true
    },
    {
      id: '4',
      user: 'System',
      avatar: 'S',
      content: '━━━━━━━━━━━━━━━━━━━━━━\n🎉 TREASURY MILESTONE REACHED! \nClub hit $100K treasury value\n━━━━━━━━━━━━━━━━━━━━━━',
      timestamp: '2:40 PM',
      isSystem: true
    },
    {
      id: '5',
      user: 'diana.sol',
      avatar: 'D',
      content: 'Amazing! This means we can allocate more resources to the next phase of development.',
      timestamp: '2:42 PM'
    }
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const getChannelIcon = () => {
    switch (channelType) {
      case 'text': return <Hash className="h-4 w-4" />
      case 'voice': return <Mic className="h-4 w-4" />
      case 'announcement': return <Megaphone className="h-4 w-4" />
      case 'special': return <Gem className="h-4 w-4" />
      default: return <Hash className="h-4 w-4" />
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex space-x-3 ${msg.isSystem ? 'justify-center' : ''}`}>
            {!msg.isSystem && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{msg.avatar}</span>
                </div>
              </div>
            )}
            
            <div className={`flex-1 min-w-0 ${msg.isSystem ? 'text-center' : ''}`}>
              {!msg.isSystem && (
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-semibold text-sm">{msg.user}</span>
                  {msg.isBuilding && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-400 text-xs">building</span>
                    </div>
                  )}
                  <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                </div>
              )}
              
              {msg.isSystem && msg.content.includes('━━━━━━━━━━━━━━━━━━━━━━') ? (
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4 text-center">
                  <div className="text-orange-400 font-bold text-lg mb-2">🎉 TREASURY MILESTONE REACHED!</div>
                  <div className="text-white text-sm">Club hit $100K treasury value</div>
                </div>
              ) : (
                <p className={`text-gray-300 text-sm ${msg.isSystem ? 'text-gray-400 italic' : ''}`}>
                  {msg.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
            <Hammer className="h-4 w-4" />
            <span>Update Status</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
            <BarChart3 className="h-4 w-4" />
            <span>Create Proposal</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
            <Gem className="h-4 w-4" />
            <span>View Treasury</span>
          </button>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What are you building?"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button type="button" className="text-gray-400 hover:text-white transition-colors">
                <AtSign className="h-4 w-4" />
              </button>
              <button type="button" className="text-gray-400 hover:text-white transition-colors">
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="flex items-center space-x-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Package className="h-4 w-4" />
            <span className="text-sm">Ship Update</span>
          </button>
          <button
            type="submit"
            className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
