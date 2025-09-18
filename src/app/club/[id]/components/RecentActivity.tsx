'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { GitBranch, MessageSquare, Vote, DollarSign, Users, Zap } from 'lucide-react'

interface RecentActivityProps {
  club: ClubWithMembers
}

export function RecentActivity({ club }: RecentActivityProps) {
  const activities = [
    {
      id: 1,
      type: 'ship',
      user: 'alice.sol',
      action: 'just shipped PR #234',
      details: 'Added new trading algorithm',
      time: '2 hours ago',
      icon: GitBranch,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'proposal',
      user: 'bob.eth',
      action: 'created new proposal',
      details: 'Add AWS credits to budget',
      time: '4 hours ago',
      icon: Vote,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'earn',
      user: 'charlie.eth',
      action: 'earned 500 $BUIDL',
      details: 'For completing UI redesign',
      time: '6 hours ago',
      icon: DollarSign,
      color: 'text-orange-400'
    },
    {
      id: 4,
      type: 'join',
      user: 'diana.sol',
      action: 'joined the club',
      details: 'Welcome to the team!',
      time: '1 day ago',
      icon: Users,
      color: 'text-purple-400'
    },
    {
      id: 5,
      type: 'milestone',
      user: 'System',
      action: 'Treasury milestone reached',
      details: 'Club hit $100K treasury',
      time: '2 days ago',
      icon: Zap,
      color: 'text-yellow-400'
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-800 ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-white">{activity.user}</span> {activity.action}
                </p>
                <p className="text-gray-500 text-xs">{activity.details}</p>
                <p className="text-gray-600 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-800">
        <button className="w-full text-center text-orange-400 hover:text-orange-300 text-sm font-medium">
          View All Activity
        </button>
      </div>
    </div>
  )
}
