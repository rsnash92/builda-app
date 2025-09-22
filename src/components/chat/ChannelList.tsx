'use client'

import { Channel } from '@/lib/types/chat'
import { Hash, Volume2, Megaphone, DollarSign, Lock } from 'lucide-react'

interface ChannelListProps {
  channels: Channel[]
  activeChannelId?: string
  onChannelSelect: (channelId: string) => void
}

export function ChannelList({ channels, activeChannelId, onChannelSelect }: ChannelListProps) {
  const getChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'voice':
        return Volume2
      case 'announcement':
        return Megaphone
      case 'treasury':
        return DollarSign
      default:
        return Hash
    }
  }

  const getChannelsByType = (type: Channel['type']) => {
    return channels.filter(channel => channel.type === type).sort((a, b) => a.position - b.position)
  }

  const textChannels = getChannelsByType('text')
  const voiceChannels = getChannelsByType('voice')
  const announcementChannels = getChannelsByType('announcement')
  const treasuryChannels = getChannelsByType('treasury')

  const ChannelItem = ({ channel }: { channel: Channel }) => {
    const Icon = getChannelIcon(channel.type)
    const isActive = channel.id === activeChannelId

    return (
      <button
        key={channel.id}
        onClick={() => onChannelSelect(channel.id)}
        className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded transition-colors text-left ${
          isActive
            ? 'bg-[#404249] text-white'
            : 'text-gray-400 hover:bg-[#35373c] hover:text-gray-300'
        }`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium truncate">{channel.name}</span>
        {channel.is_private && (
          <Lock className="w-3 h-3 flex-shrink-0 text-gray-500" />
        )}
      </button>
    )
  }

  const ChannelSection = ({ title, channels }: { title: string; channels: Channel[] }) => {
    if (channels.length === 0) return null

    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <div className="space-y-1">
          {channels.map(channel => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 space-y-1">
      <ChannelSection title="Text Channels" channels={textChannels} />
      <ChannelSection title="Announcements" channels={announcementChannels} />
      <ChannelSection title="Treasury" channels={treasuryChannels} />
      <ChannelSection title="Voice Channels" channels={voiceChannels} />
    </div>
  )
}