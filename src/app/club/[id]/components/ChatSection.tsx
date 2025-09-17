'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { MessageSquare, Send, Hash, Users, Settings } from 'lucide-react'
import { useState } from 'react'

interface ChatSectionProps {
  club: ClubWithMembers
}

export function ChatSection({ club }: ChatSectionProps) {
  const [message, setMessage] = useState('')
  
  // Mock data for channels
  const channels = [
    { id: 'general', name: 'general', unread: 0 },
    { id: 'development', name: 'development', unread: 3 },
    { id: 'design', name: 'design', unread: 1 },
    { id: 'governance', name: 'governance', unread: 0 }
  ]
  
  const [activeChannel, setActiveChannel] = useState('general')
  
  // Mock data for messages
  const messages = [
    {
      id: 1,
      user: 'Alice Johnson',
      avatar: 'AJ',
      message: 'Hey everyone! Just finished the voting system UI. What do you think?',
      time: '2:30 PM',
      isOwn: false
    },
    {
      id: 2,
      user: 'Bob Smith',
      avatar: 'BS',
      message: 'Looks great! The design is clean and intuitive.',
      time: '2:32 PM',
      isOwn: false
    },
    {
      id: 3,
      user: 'You',
      avatar: 'Y',
      message: 'I agree, the UX is much better than the previous version.',
      time: '2:35 PM',
      isOwn: true
    }
  ]
  
  // Mock data for online members
  const onlineMembers = [
    { id: 1, name: 'Alice Johnson', avatar: 'AJ', status: 'online' },
    { id: 2, name: 'Bob Smith', avatar: 'BS', status: 'online' },
    { id: 3, name: 'Carol Davis', avatar: 'CD', status: 'away' },
    { id: 4, name: 'David Wilson', avatar: 'DW', status: 'online' }
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="h-full bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Channels */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Channels
          </h3>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  activeChannel === channel.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4" />
                  <span>{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Online Members */}
        <div className="p-4 border-t border-gray-800">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Online Members
          </h3>
          <div className="space-y-2">
            {onlineMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <span className="text-white text-sm">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hash className="h-5 w-5 text-gray-400" />
              <h2 className="text-xl font-bold text-white">#{activeChannel}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <Users className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex space-x-3 ${msg.isOwn ? 'justify-end' : ''}`}>
              {!msg.isOwn && (
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {msg.avatar}
                </div>
              )}
              <div className={`flex-1 max-w-xs ${msg.isOwn ? 'order-first' : ''}`}>
                {!msg.isOwn && (
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white font-semibold text-sm">{msg.user}</span>
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>
                )}
                <div className={`rounded-lg px-4 py-2 ${
                  msg.isOwn 
                    ? 'bg-orange-500 text-white ml-auto' 
                    : 'bg-gray-800 text-white'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="bg-gray-900 border-t border-gray-800 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${activeChannel}`}
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}