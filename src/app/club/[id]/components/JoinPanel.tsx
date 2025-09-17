'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Shield, TrendingUp } from 'lucide-react'

interface JoinPanelProps {
  club: ClubWithMembers
}

export function JoinPanel({ club }: JoinPanelProps) {
  const entryCost = 100 // Mock entry cost
  const tokenAllocation = 1000 // Mock token allocation
  const votingPower = 1 // Mock voting power

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Join {club.name}</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Entry Cost</span>
          <span className="text-white font-semibold">${entryCost}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Token Allocation</span>
          <span className="text-white font-semibold">{tokenAllocation.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Treasury Value</span>
          <span className="text-white font-semibold">${club.treasury_balance.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Voting Power</span>
          <span className="text-white font-semibold">{votingPower} vote</span>
        </div>
      </div>
      
      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
        Join Club
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Users className="h-4 w-4" />
          <span>{club.member_count} members</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Shield className="h-4 w-4" />
          <span>Governance enabled</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <TrendingUp className="h-4 w-4" />
          <span>Growing treasury</span>
        </div>
      </div>
    </div>
  )
}
