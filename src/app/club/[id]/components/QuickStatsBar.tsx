'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { TrendingUp, Vote, Coins, Flame, Hammer } from 'lucide-react'

interface QuickStatsBarProps {
  club: ClubWithMembers
}

export function QuickStatsBar({ club }: QuickStatsBarProps) {
  const stats = [
    {
      label: 'Treasury Growth',
      value: '+12% this month',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      label: 'Active Proposals',
      value: '2',
      icon: Vote,
      color: 'text-blue-400'
    },
    {
      label: 'Your $BUIDL',
      value: '1,234',
      icon: Coins,
      color: 'text-orange-400'
    },
    {
      label: 'Building Streak',
      value: '7 days',
      icon: Flame,
      color: 'text-red-400'
    },
    {
      label: 'Building Now',
      value: '12',
      icon: Hammer,
      color: 'text-yellow-400'
    }
  ]

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="flex items-center space-x-2">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <span className="text-gray-400 text-sm">{stat.label}:</span>
                  <span className={`ml-1 font-semibold ${stat.color}`}>{stat.value}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>
    </div>
  )
}
