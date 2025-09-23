'use client'

import { ReactNode, useState } from 'react'
import { Hash, Volume2, Settings, Search, Plus, Users, Crown } from 'lucide-react'
import Image from 'next/image'

interface DiscordLayoutProps {
  children?: ReactNode
  currentClub?: {
    name: string
    id: string
    avatar?: string
    memberCount?: number
  }
  currentChannel?: {
    name: string
    type: 'text' | 'voice'
  }
  members?: Array<{
    id: string
    username: string
    avatar?: string
    status: 'online' | 'idle' | 'dnd' | 'offline'
    role?: 'owner' | 'admin' | 'member'
  }>
}

const mockChannels = {
  discussions: [
    { name: 'Announcements', type: 'text' as const, unread: false },
    { name: 'News', type: 'text' as const, unread: false },
    { name: 'Smoking Area', type: 'text' as const, unread: 2 },
  ],
  rooms: [
    { name: 'General', type: 'text' as const, unread: false },
    { name: 'Sapien Team', type: 'text' as const, unread: 12 },
    { name: 'Sapien Engineering', type: 'text' as const, unread: false },
    { name: 'Updates', type: 'text' as const, unread: false },
    { name: 'Blogs and improvement', type: 'text' as const, unread: 1 },
    { name: 'QA channel', type: 'text' as const, unread: false },
  ]
}

const mockMembers = [
  { id: '1', username: 'Megan Tan', avatar: '👑', status: 'online' as const, role: 'owner' as const },
  { id: '2', username: 'Minnie蘭蘭', avatar: '🌸', status: 'online' as const },
  { id: '3', username: 'Sara', avatar: '🌺', status: 'online' as const },
  { id: '4', username: 'Sissy Zhang', avatar: '🌸', status: 'online' as const },
  { id: '5', username: 'crystal', avatar: '💎', status: 'online' as const },
  { id: '6', username: 'kingfish', avatar: '🐠', status: 'online' as const },
  { id: '7', username: 'Cara', avatar: '🌸', status: 'online' as const },
  { id: '8', username: 'Cecilia', avatar: '🌸', status: 'online' as const },
  { id: '9', username: 'Helen', avatar: '🌸', status: 'online' as const },
  { id: '10', username: 'crystal', avatar: '💎', status: 'online' as const },
]

export function DiscordLayout({
  children,
  currentClub = { name: 'Le Dominatorz', id: '1', memberCount: 136 },
  currentChannel = { name: 'General', type: 'text' },
  members = mockMembers
}: DiscordLayoutProps) {
  const [selectedChannel, setSelectedChannel] = useState('General')

  return (
    <div className="h-screen flex bg-[#36393f] text-white overflow-hidden">
      {/* Server List - Very narrow left bar */}
      <div className="w-[72px] bg-[#202225] flex flex-col items-center py-3 space-y-2">
        {/* Home Server */}
        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer group relative">
          <div className="w-7 h-7 text-white font-bold">🏠</div>
          <div className="absolute left-14 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Home
          </div>
        </div>

        {/* Separator */}
        <div className="w-8 h-[2px] bg-[#36393f] rounded-full"></div>

        {/* Current Server */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer group relative">
          <Image
            src="/builda-logo.webp"
            alt={currentClub.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <div className="absolute left-14 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {currentClub.name}
          </div>
          {/* Active indicator */}
          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
        </div>

        {/* Add Server */}
        <div className="w-12 h-12 bg-[#36393f] hover:bg-[#3ba55c] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer group relative">
          <Plus className="w-6 h-6 text-[#3ba55c] group-hover:text-white transition-colors" />
          <div className="absolute left-14 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Add a Server
          </div>
        </div>
      </div>

      {/* Channels Sidebar */}
      <div className="w-60 bg-[#2f3136] flex flex-col">
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#202225] shadow-sm">
          <h1 className="font-semibold text-white text-[15px] truncate">{currentClub.name}</h1>
          <span className="text-[#b9bbbe] text-xs">{currentClub.memberCount} members</span>
        </div>

        {/* Search Bar */}
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#72767d]" />
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#202225] border-none rounded text-sm text-white placeholder-[#72767d] focus:outline-none"
            />
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto">
          {/* Discussions Section */}
          <div className="px-2 py-1">
            <div className="flex items-center justify-between py-1 px-2">
              <h3 className="text-xs font-semibold text-[#8e9297] uppercase tracking-wide">Discussions</h3>
            </div>
            <div className="space-y-0.5">
              {mockChannels.discussions.map((channel) => (
                <div
                  key={channel.name}
                  onClick={() => setSelectedChannel(channel.name)}
                  className={`flex items-center px-2 py-1 mx-2 rounded cursor-pointer group ${
                    selectedChannel === channel.name
                      ? 'bg-[#404249] text-white'
                      : 'text-[#8e9297] hover:bg-[#34373c] hover:text-[#dcddde]'
                  }`}
                >
                  <Hash className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span className="text-sm truncate">{channel.name}</span>
                  {channel.unread && (
                    <div className="ml-auto w-4 h-4 bg-[#f23f42] rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{channel.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rooms Section */}
          <div className="px-2 py-1">
            <div className="flex items-center justify-between py-1 px-2">
              <h3 className="text-xs font-semibold text-[#8e9297] uppercase tracking-wide">Rooms</h3>
              <Plus className="w-4 h-4 text-[#8e9297] hover:text-[#dcddde] cursor-pointer" />
            </div>
            <div className="space-y-0.5">
              {mockChannels.rooms.map((channel) => (
                <div
                  key={channel.name}
                  onClick={() => setSelectedChannel(channel.name)}
                  className={`flex items-center px-2 py-1 mx-2 rounded cursor-pointer group ${
                    selectedChannel === channel.name
                      ? 'bg-[#404249] text-white'
                      : 'text-[#8e9297] hover:bg-[#34373c] hover:text-[#dcddde]'
                  }`}
                >
                  {channel.type === 'text' ? (
                    <Hash className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  ) : (
                    <Volume2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  )}
                  <span className="text-sm truncate">{channel.name}</span>
                  {channel.unread && (
                    <div className="ml-auto w-4 h-4 bg-[#f23f42] rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{channel.unread}</span>
                    </div>
                  )}
                  <Settings className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-[#b9bbbe] hover:text-white cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Area at Bottom */}
        <div className="p-2 bg-[#292b2f]">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">R</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#292b2f] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Rob</div>
              <div className="text-xs text-[#b9bbbe] truncate">Online</div>
            </div>
            <Settings className="w-4 h-4 text-[#b9bbbe] hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#36393f]">
        {/* Channel Header */}
        <div className="h-12 px-4 flex items-center border-b border-[#202225] bg-[#36393f]">
          <Hash className="w-5 h-5 text-[#8e9297] mr-2" />
          <span className="font-semibold text-white">{selectedChannel}</span>
          <div className="ml-3 text-[#72767d] text-sm">
            {selectedChannel === 'General' && 'Welcome to the community!'}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {children || (
            <div className="flex flex-col items-center justify-center h-full">
              {/* Welcome Message */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/builda-logo.webp"
                    alt={currentClub.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to {currentClub.name}</h2>
                <p className="text-[#b9bbbe]">This is the beginning of the #{selectedChannel} channel.</p>
              </div>

              {/* Sample Messages */}
              <div className="w-full max-w-4xl space-y-4">
                {/* Bot Message */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">🤖</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-[#5865f2]">Le Dominatorz bot</span>
                      <span className="text-xs bg-[#5865f2] px-1 py-0.5 rounded text-white font-medium">BOT</span>
                      <span className="text-xs text-[#72767d]">21:13</span>
                    </div>
                    <div className="text-[#dcddde] text-sm leading-relaxed">
                      <p className="mb-2">Heya! We're excited to have you in the Midjourney Beta.</p>
                      <p className="mb-2">
                        To expand the community sustainably, we're giving everyone a limited trial (around 25 queries), and then several options to
                        buy a full membership. Full memberships include: unlimited generations (or limited w/ a cheap tier), and generous commercial
                        terms.
                      </p>
                      <p className="mb-2">
                        <strong>DIRECTIONS (PLEASE READ)</strong> To create images: - Go to one of the "newbie" bot channels. See attached screenshot: https://
                        s.mj.run/newbie - Type /imagine and then whatever you want - The bot will send you 4 images in ~60 seconds - Click numbered
                        buttons underneath to get upscales (U) or variations (V)
                      </p>
                      <p className="mb-2">
                        For a visual guide on how to get started, visit <a href="#" className="text-[#00b0f4] hover:underline">https://midjourney.gitbook.io/docs/#create-your-first-image</a> To see trending
                        images from the community visit: <a href="#" className="text-[#00b0f4] hover:underline">https://s.mj.run/feed</a>
                      </p>
                      <p className="mb-2">
                        Once your trial has ended, you can subscribe by typing /subscribe or going to https://www.midjourney.com/account
                      </p>
                      <p>
                        To see all your creations: https://midjourney.com/ Need help? Join our support server at discord.gg/midjourney and ask in trial-
                        support. use /info to see account details, /settings to see your current settings and /help to see an overview
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Join Message */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#747f8d] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white">You</span>
                      <span className="text-xs text-[#72767d]">21:13</span>
                    </div>
                    <div className="text-[#dcddde] text-sm">joined party</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-[#36393f]">
          <div className="flex items-center bg-[#40444b] rounded-lg px-4 py-3">
            <input
              type="text"
              placeholder={`Message #${selectedChannel.toLowerCase()}`}
              className="flex-1 bg-transparent text-white placeholder-[#72767d] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Members Sidebar */}
      <div className="w-60 bg-[#2f3136] flex flex-col">
        {/* Members Header */}
        <div className="p-4 border-b border-[#202225]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-[#8e9297] uppercase tracking-wide">
              Members
            </h3>
            <button className="px-3 py-1 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-medium rounded transition-colors">
              INVITE
            </button>
          </div>
          <p className="text-xs text-[#72767d] mt-1">{members.length} members</p>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 px-2 py-1 rounded hover:bg-[#34373c] cursor-pointer group"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{member.avatar}</span>
                  </div>
                  {/* Status indicator */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-[#2f3136] rounded-full ${
                    member.status === 'online' ? 'bg-[#3ba55c]' :
                    member.status === 'idle' ? 'bg-[#faa61a]' :
                    member.status === 'dnd' ? 'bg-[#f23f42]' : 'bg-[#747f8d]'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-white truncate">{member.username}</span>
                    {member.role === 'owner' && <Crown className="w-3 h-3 text-yellow-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}