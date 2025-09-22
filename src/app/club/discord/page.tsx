'use client'

import { useState } from 'react'
import { ClubWithMembers } from '@/lib/database/types'
import {
  Hash, Volume2, Megaphone, Crown, Users, Minus, Square, X,
  Settings, Mic, Headphones, ChevronDown, Plus, Search,
  Bell, Pin, UserPlus, Inbox, HelpCircle, Gift
} from 'lucide-react'
import Image from 'next/image'

// Mock club data
const mockClub: ClubWithMembers = {
  id: 'buidlers-united',
  name: 'BUIDLers United',
  description: 'A community of builders creating the future of Web3',
  category: 'Developer',
  token_symbol: 'BUIDL',
  treasury_balance: 148900,
  token_address: '0x1234567890abcdef',
  treasury_address: '0xabcdef1234567890',
  thumbnail_url: undefined,
  likes: 1247,
  is_hot: true,
  is_lord_of_dev: false,
  progress: 75,
  market_cap: 148900,
  market_cap_change: 12.5,
  volume: 25000,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  created_by: 'demo-user',
  members: [],
  member_count: 287
}

// Mock servers
const mockServers = [
  { id: 'lofi', name: 'Lofi Hip Hop', icon: '🎵', color: 'from-purple-500 to-pink-500', hasNotification: false },
  { id: 'jdoodle', name: 'JDoodle', icon: 'JD', color: 'from-blue-500 to-cyan-500', hasNotification: false },
  { id: 'next', name: 'Next.js', icon: '▲', color: 'from-black to-gray-800', hasNotification: true },
  { id: 'concept', name: 'Concept Central', icon: '∞', color: 'from-blue-600 to-purple-600', hasNotification: false, isActive: true },
  { id: 'cyber', name: 'Cyberpunk', icon: '🤖', color: 'from-yellow-500 to-orange-500', hasNotification: false },
  { id: 'nvy', name: 'NVY', icon: 'N', color: 'from-indigo-500 to-purple-500', hasNotification: false },
  { id: 'bkly', name: 'Brooklyn', icon: 'B', color: 'from-cyan-500 to-blue-500', hasNotification: false },
  { id: 'mosaic', name: 'Mosaic', icon: '🎨', color: 'from-orange-500 to-red-500', hasNotification: false },
  { id: 'google', name: 'Google', icon: 'G', color: 'from-red-500 to-yellow-500', hasNotification: false }
]

// Mock channels for the active server
const mockChannels = {
  'SERVER': [
    { id: 'server-rules', name: 'server-rules', type: 'text', hasNotification: false },
    { id: 'announcements', name: 'announcements', type: 'announcement', hasNotification: false },
    { id: 'random-things', name: 'random-things', type: 'text', hasNotification: false },
    { id: 'faq', name: 'faq', type: 'text', hasNotification: false },
    { id: 'vote', name: 'vote', type: 'text', hasNotification: false },
    { id: 'notifications', name: 'notifications', type: 'text', hasNotification: false }
  ]
}

// Mock messages
const mockMessages = [
  {
    id: '1',
    user: { name: 'Concept Central', avatar: '∞', color: 'from-blue-600 to-purple-600' },
    content: 'What do you all think of the Nothing Phone(1)?',
    timestamp: 'Today at 9:41 PM'
  },
  {
    id: '2',
    user: { name: 'nance', avatar: 'N', color: 'from-gray-500 to-gray-700' },
    content: 'I think it\'s over hyped.',
    timestamp: 'Today at 9:41 PM',
    isReply: true,
    replyTo: 'What do you all think of the Nothing Phone(1)?'
  },
  {
    id: '3',
    user: { name: 'heya!', avatar: 'H', color: 'from-purple-500 to-pink-500' },
    content: 'Definitely.',
    timestamp: 'Today at 9:42 PM'
  },
  {
    id: '4',
    user: { name: 'nance', avatar: 'N', color: 'from-gray-500 to-gray-700' },
    content: 'It\'s just a phone with a fancy back and blinking LEDs.',
    timestamp: 'Today at 9:43 PM'
  }
]

// Mock members
const mockMembers = {
  'Server Owner': [
    { id: '1', name: 'nance', status: 'online', activity: null, avatar: 'N' }
  ],
  'Moderators': [
    { id: '2', name: 'Ekmand', status: 'online', activity: null, avatar: 'E' },
    { id: '3', name: 'heya!', status: 'online', activity: 'Playing Figma', avatar: 'H' },
    { id: '4', name: 'james', status: 'online', activity: 'Playing Procrastination Simulator', avatar: 'J' },
    { id: '5', name: 'daFoxy', status: 'online', activity: 'Playing Blender', avatar: 'D' },
    { id: '6', name: 'Sticks', status: 'online', activity: null, avatar: 'S' }
  ],
  'Members': [
    { id: '7', name: 'Mockup', status: 'online', activity: 'Playing Powerpoint', avatar: 'M' }
  ]
}

export default function DiscordClubPage() {
  const [activeServer, setActiveServer] = useState('concept')
  const [activeChannel, setActiveChannel] = useState('general')

  return (
    <div className="h-screen bg-[#36393f] flex">
      {/* Server List (Left Sidebar) */}
      <div className="w-[72px] bg-[#202225] flex flex-col items-center py-3 space-y-2 border-r border-[#1e2124]">
        {/* Home button */}
        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center cursor-pointer hover:rounded-xl transition-all duration-200">
          <Image src="/builda-logo.webp" alt="Discord" width={28} height={28} className="rounded-full" />
        </div>

        <div className="w-8 h-0.5 bg-[#36393f] rounded"></div>

        {/* Servers */}
        {mockServers.map((server) => (
          <div key={server.id} className="relative group">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${server.color} ${server.isActive ? 'rounded-xl' : 'rounded-3xl'} flex items-center justify-center cursor-pointer hover:rounded-xl transition-all duration-200 relative`}
              onClick={() => setActiveServer(server.id)}
            >
              <span className="text-white font-bold text-sm">{server.icon}</span>
              {server.hasNotification && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#f23f42] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              )}
              {server.isActive && (
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r"></div>
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {server.name}
            </div>
          </div>
        ))}

        {/* Add Server */}
        <div className="w-12 h-12 bg-[#36393f] rounded-3xl flex items-center justify-center cursor-pointer hover:rounded-xl hover:bg-[#3ba55c] transition-all duration-200 group">
          <Plus className="w-6 h-6 text-[#3ba55c] group-hover:text-white" />
        </div>

        {/* Discover */}
        <div className="w-12 h-12 bg-[#36393f] rounded-3xl flex items-center justify-center cursor-pointer hover:rounded-xl hover:bg-[#3ba55c] transition-all duration-200 group">
          <Search className="w-6 h-6 text-[#3ba55c] group-hover:text-white" />
        </div>
      </div>

      {/* Channel Sidebar */}
      <div className="w-60 bg-[#2f3136] flex flex-col border-r border-[#202225]">
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] shadow-sm">
          <h1 className="text-white font-semibold">Concept Central</h1>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Server Info */}
        <div className="px-4 py-3 border-b border-[#202225]">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">∞</span>
            </div>
            <div>
              <h3 className="text-white font-medium">Re-imagining the</h3>
              <h3 className="text-white font-medium">Digital Experience</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-green-400 font-medium">LVL 3</span>
                <div className="flex-1 h-2 bg-[#202225] rounded-full">
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{width: '75%'}}></div>
                </div>
                <span className="text-xs text-gray-400">19 Boosts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto pt-4">
          {Object.entries(mockChannels).map(([category, channels]) => (
            <div key={category} className="mb-4">
              <div className="px-2 mb-1 flex items-center justify-between">
                <div className="flex items-center">
                  <ChevronDown className="w-3 h-3 text-gray-400 mr-1" />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{category}</span>
                </div>
                <Plus className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
              </div>

              <div className="space-y-0.5">
                {channels.map((channel) => {
                  const isActive = channel.id === activeChannel
                  return (
                    <div
                      key={channel.id}
                      className={`mx-2 px-2 py-1 rounded flex items-center justify-between cursor-pointer group ${
                        isActive ? 'bg-[#393c43] text-white' : 'text-gray-300 hover:bg-[#34373c] hover:text-gray-200'
                      }`}
                      onClick={() => setActiveChannel(channel.id)}
                    >
                      <div className="flex items-center">
                        {channel.type === 'announcement' ? (
                          <Megaphone className="w-5 h-5 mr-1.5 text-gray-400" />
                        ) : (
                          <Hash className="w-5 h-5 mr-1.5 text-gray-400" />
                        )}
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      <Settings className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Area */}
        <div className="h-14 bg-[#292b2f] px-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div>
              <span className="text-white text-sm font-medium">user</span>
              <span className="text-xs text-gray-400">#1234</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Mic className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
            <Headphones className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
            <Settings className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Hash className="w-6 h-6 text-gray-400" />
            <span className="text-white font-semibold">general</span>
          </div>

          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
            <Pin className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
            <UserPlus className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />

            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-36 h-6 bg-[#202225] border-none rounded text-sm text-gray-300 pl-8 pr-2 focus:outline-none focus:w-60 transition-all"
              />
            </div>

            <Inbox className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
            <HelpCircle className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {mockMessages.map((message) => (
            <div key={message.id} className="mb-4 hover:bg-[#32353b] rounded p-2 -m-2">
              {message.isReply && (
                <div className="mb-2 ml-14 text-xs text-gray-400 flex items-center">
                  <div className="w-4 h-4 mr-1">↳</div>
                  <span className="font-medium text-gray-300">@Concept Central</span>
                  <span className="ml-1">{message.replyTo}</span>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${message.user.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{message.user.avatar}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white font-medium">{message.user.name}</span>
                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="bg-[#40444b] rounded-lg">
            <input
              type="text"
              placeholder="Message #general"
              className="w-full bg-transparent border-none text-gray-300 placeholder-gray-500 px-4 py-3 focus:outline-none"
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
                {role} — {members.length}
              </div>

              <div className="space-y-1">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center px-2 py-1 rounded hover:bg-[#34373c] cursor-pointer group">
                    <div className="relative mr-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{member.avatar}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2f3136]"></div>
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
