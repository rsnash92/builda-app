'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Building2, Users, TrendingUp, Calendar } from 'lucide-react'

interface ClubHeaderProps {
  club: ClubWithMembers
}

export function ClubHeader({ club }: ClubHeaderProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{club.name}</h1>
            <p className="text-gray-400 text-sm">{club.category}</p>
            <p className="text-gray-300 mt-2 max-w-2xl">{club.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">${club.treasury_balance.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Treasury Value</div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-500" />
            <span className="text-gray-400 text-sm">Members</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{club.member_count}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-gray-400 text-sm">Growth</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">+12.5%</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-gray-400 text-sm">Founded</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            {new Date(club.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  )
}
