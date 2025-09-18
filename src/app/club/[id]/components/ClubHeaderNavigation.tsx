'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Settings, 
  Building2,
  Shield,
  Package
} from 'lucide-react'

interface ClubHeaderNavigationProps {
  club: ClubWithMembers
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ClubHeaderNavigation({ club, activeTab, onTabChange }: ClubHeaderNavigationProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'treasury', label: 'Treasury', icon: TrendingUp },
    { id: 'governance', label: 'Governance', icon: Shield },
    { id: 'resources', label: 'Resources', icon: Package },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="px-6 py-3 bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            {club.member_count} members
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
