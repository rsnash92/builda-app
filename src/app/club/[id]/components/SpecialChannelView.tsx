'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { TreasuryChart } from './TreasuryChart'
import { TreasurySection } from './TreasurySection'
import { GovernanceSection } from './GovernanceSection'
import { ResourcesSection } from './ResourcesSection'
import { BarChart3, TrendingUp, Users, Activity, Gem, Vote, Wrench } from 'lucide-react'

interface SpecialChannelViewProps {
  channelType: 'treasury' | 'governance' | 'resources' | 'analytics'
  club: ClubWithMembers
}

export function SpecialChannelView({ channelType, club }: SpecialChannelViewProps) {
  const getChannelContent = () => {
    switch (channelType) {
      case 'treasury':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Gem className="h-6 w-6 text-orange-500" />
              <h1 className="text-2xl font-bold text-white">Treasury Dashboard</h1>
            </div>
            <TreasuryChart club={club} />
            <TreasurySection club={club} />
          </div>
        )
      
      case 'governance':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Vote className="h-6 w-6 text-blue-500" />
              <h1 className="text-2xl font-bold text-white">Governance Center</h1>
            </div>
            <GovernanceSection club={club} />
          </div>
        )
      
      case 'resources':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Wrench className="h-6 w-6 text-purple-500" />
              <h1 className="text-2xl font-bold text-white">Club Resources</h1>
            </div>
            <ResourcesSection club={club} />
          </div>
        )
      
      case 'analytics':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-6 w-6 text-green-500" />
              <h1 className="text-2xl font-bold text-white">Club Analytics</h1>
            </div>
            
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Contributors</p>
                    <p className="text-2xl font-bold text-white">24</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">This Week's Activity</p>
                    <p className="text-2xl font-bold text-white">+47%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Building Streak</p>
                    <p className="text-2xl font-bold text-white">12 days</p>
                  </div>
                  <Activity className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            </div>
            
            {/* Additional analytics content */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contribution Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Code Contributions</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-white text-sm">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Design Work</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-white text-sm">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Strategy & Planning</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-white text-sm">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white">Channel Not Found</h1>
          </div>
        )
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-900">
      {getChannelContent()}
    </div>
  )
}
