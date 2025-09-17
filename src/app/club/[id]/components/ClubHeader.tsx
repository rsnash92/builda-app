'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { TrendingUp, Users, Calendar, ExternalLink } from 'lucide-react'

interface ClubHeaderProps {
  club: ClubWithMembers
}

export function ClubHeader({ club }: ClubHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 border border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {club.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{club.name}</h1>
            <p className="text-gray-300 text-lg mb-4">{club.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>{club.category}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Founded {new Date(club.created_at).toLocaleDateString()}</span>
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          <ExternalLink className="h-4 w-4" />
          <span>Visit Club</span>
        </button>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Treasury Balance</p>
              <p className="text-2xl font-bold text-white">${club.treasury_balance.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Members</p>
              <p className="text-2xl font-bold text-white">{club.member_count}</p>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Current Project</p>
              <p className="text-lg font-semibold text-white">Web3 Platform</p>
            </div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">W3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
