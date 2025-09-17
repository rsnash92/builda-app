'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Users, TrendingUp, Award, Clock } from 'lucide-react'

interface BuildersSectionProps {
  club: ClubWithMembers
}

export function BuildersSection({ club }: BuildersSectionProps) {
  // Mock data for top contributors
  const topContributors = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Lead Developer",
      contributions: 45,
      value: 25000,
      avatar: "AJ"
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Designer",
      contributions: 32,
      value: 18000,
      avatar: "BS"
    },
    {
      id: 3,
      name: "Carol Davis",
      role: "Community Manager",
      contributions: 28,
      value: 15000,
      avatar: "CD"
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Developer",
      contributions: 22,
      value: 12000,
      avatar: "DW"
    }
  ]

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      user: "Alice Johnson",
      action: "completed",
      item: "Voting System UI",
      time: "2 hours ago",
      value: 5000
    },
    {
      id: 2,
      user: "Bob Smith",
      action: "shipped",
      item: "Club Logo Design",
      time: "4 hours ago",
      value: 2000
    },
    {
      id: 3,
      user: "Carol Davis",
      action: "proposed",
      item: "New Member Onboarding",
      time: "6 hours ago",
      value: 0
    },
    {
      id: 4,
      user: "David Wilson",
      action: "completed",
      item: "API Integration",
      time: "1 day ago",
      value: 3000
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold text-white">Top Builders</h2>
      </div>
      
      {/* Top Contributors */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Top Contributors</h3>
        <div className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={contributor.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {contributor.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{contributor.name}</div>
                  <div className="text-gray-400 text-sm">{contributor.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">{contributor.contributions}</div>
                <div className="text-gray-400 text-sm">contributions</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {activity.user} {activity.action} {activity.item}
                  </div>
                  <div className="text-gray-400 text-sm">{activity.time}</div>
                </div>
              </div>
              {activity.value > 0 && (
                <div className="text-right">
                  <div className="text-green-500 font-semibold">+${activity.value.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">value</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{club.member_count}</div>
          <div className="text-gray-400 text-sm">Active Members</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">127</div>
          <div className="text-gray-400 text-sm">Total Contributions</div>
        </div>
      </div>
    </div>
  )
}