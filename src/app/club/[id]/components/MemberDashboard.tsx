'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { User, Award, TrendingUp, Calendar, Star, Target, Zap } from 'lucide-react'

interface MemberDashboardProps {
  club: ClubWithMembers
}

export function MemberDashboard({ club }: MemberDashboardProps) {
  // Mock data for user stats
  const userStats = {
    contributions: 23,
    valueCreated: 15000,
    rank: 3,
    level: 'Builder',
    joinDate: '2024-01-01',
    streak: 12
  }

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      name: 'First Contribution',
      description: 'Made your first contribution to the club',
      icon: '🎯',
      earned: true,
      date: '2024-01-02'
    },
    {
      id: 2,
      name: 'Week Warrior',
      description: 'Contributed for 7 consecutive days',
      icon: '🔥',
      earned: true,
      date: '2024-01-08'
    },
    {
      id: 3,
      name: 'Value Creator',
      description: 'Created $10,000+ in value for the club',
      icon: '💰',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 4,
      name: 'Governance Master',
      description: 'Participated in 10+ governance decisions',
      icon: '🏛️',
      earned: false,
      date: null
    },
    {
      id: 5,
      name: 'Community Builder',
      description: 'Helped onboard 5+ new members',
      icon: '🤝',
      earned: false,
      date: null
    }
  ]

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      action: 'completed',
      item: 'Voting System UI',
      value: 5000,
      date: '2024-01-20',
      type: 'contribution'
    },
    {
      id: 2,
      action: 'voted',
      item: 'Development Budget Proposal',
      value: 0,
      date: '2024-01-19',
      type: 'governance'
    },
    {
      id: 3,
      action: 'shipped',
      item: 'Club Logo Design',
      value: 2000,
      date: '2024-01-18',
      type: 'contribution'
    },
    {
      id: 4,
      action: 'proposed',
      item: 'New Member Onboarding',
      value: 0,
      date: '2024-01-17',
      type: 'governance'
    }
  ]

  // Mock data for goals
  const goals = [
    {
      id: 1,
      title: 'Complete 50 Contributions',
      progress: 46,
      target: 50,
      deadline: '2024-02-01'
    },
    {
      id: 2,
      title: 'Create $25,000 in Value',
      progress: 15000,
      target: 25000,
      deadline: '2024-03-01'
    },
    {
      id: 3,
      title: 'Participate in 20 Governance Decisions',
      progress: 12,
      target: 20,
      deadline: '2024-02-15'
    }
  ]

  return (
    <div className="h-full bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Member Dashboard</h1>
          <p className="text-gray-400">Track your contributions and achievements in {club.name}</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contributions</p>
                <p className="text-2xl font-bold text-white">{userStats.contributions}</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Value Created</p>
                <p className="text-2xl font-bold text-green-500">${userStats.valueCreated.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rank</p>
                <p className="text-2xl font-bold text-white">#{userStats.rank}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Streak</p>
                <p className="text-2xl font-bold text-orange-500">{userStats.streak} days</p>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Goals and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Goals */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Current Goals</h2>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{goal.title}</h3>
                    <span className="text-gray-400 text-sm">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">
                      {typeof goal.progress === 'number' && typeof goal.target === 'number' 
                        ? `${goal.progress}/${goal.target}`
                        : `$${goal.progress.toLocaleString()}/$${goal.target.toLocaleString()}`
                      }
                    </span>
                    <span className="text-white">
                      {Math.round((goal.progress / goal.target) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-800'
                }`}>
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.earned ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                    {achievement.earned && achievement.date && (
                      <p className="text-green-400 text-xs">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {achievement.earned && (
                    <Star className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'contribution' ? 'bg-orange-500/20' : 'bg-blue-500/20'
                  }`}>
                    {activity.type === 'contribution' ? (
                      <Target className="h-5 w-5 text-orange-500" />
                    ) : (
                      <Award className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {activity.action} {activity.item}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
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
      </div>
    </div>
  )
}