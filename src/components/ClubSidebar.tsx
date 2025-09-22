'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Users } from 'lucide-react'

interface Club {
  id: string
  name: string
  icon: string
  memberCount: number
  isActive?: boolean
  hasNotifications?: boolean
}

interface ClubSidebarProps {
  currentClubId?: string
}

export function ClubSidebar({ currentClubId }: ClubSidebarProps) {
  const [clubs] = useState<Club[]>([
    {
      id: 'demo',
      name: 'Demo Club',
      icon: 'D',
      memberCount: 42,
      isActive: currentClubId === 'demo',
      hasNotifications: true
    },
    {
      id: 'builders',
      name: 'Builders Hub',
      icon: 'B',
      memberCount: 128,
      isActive: currentClubId === 'builders'
    },
    {
      id: 'creators',
      name: 'Creators United',
      icon: 'C',
      memberCount: 86,
      isActive: currentClubId === 'creators',
      hasNotifications: true
    },
    {
      id: 'startups',
      name: 'Startup Founders',
      icon: 'S',
      memberCount: 203,
      isActive: currentClubId === 'startups'
    },
    {
      id: 'design',
      name: 'Design Collective',
      icon: '🎨',
      memberCount: 156,
      isActive: currentClubId === 'design'
    }
  ])

  return (
    <div className="w-20 bg-[#15161a] border-l border-[#24252a] flex flex-col items-center py-4 space-y-3 h-full overflow-y-auto flex-shrink-0">
      {/* Home Button */}
      <Link
        href="/dashboard"
        className="w-12 h-12 bg-[#202128] hover:bg-orange-600 rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center group relative"
        title="Dashboard"
      >
        <Users className="w-6 h-6 text-gray-400 group-hover:text-white" />
      </Link>

      {/* Separator */}
      <div className="w-8 h-px bg-[#24252a]"></div>

      {/* Club Icons */}
      {clubs.map((club) => (
        <div key={club.id} className="relative">
          <Link
            href={`/club/${club.id}`}
            className={`w-12 h-12 rounded-2xl transition-all duration-200 flex items-center justify-center text-white font-bold text-sm relative group ${
              club.isActive
                ? 'bg-orange-600 rounded-xl'
                : 'bg-[#202128] hover:bg-[#404249] hover:rounded-xl'
            }`}
            title={`${club.name} (${club.memberCount} members)`}
          >
            {club.icon}

            {/* Active indicator */}
            {club.isActive && (
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
            )}

            {/* Notification indicator */}
            {club.hasNotifications && !club.isActive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#15161a]"></div>
            )}
          </Link>
        </div>
      ))}

      {/* Add Club Button */}
      <button
        className="w-12 h-12 bg-[#202128] hover:bg-green-600 rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center group"
        title="Create Club"
      >
        <Plus className="w-6 h-6 text-green-400 group-hover:text-white" />
      </button>
    </div>
  )
}