'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Button } from '@/components/ui/button'
import { DollarSign, Users, Vote, Zap } from 'lucide-react'

interface JoinPanelProps {
  club: ClubWithMembers
}

export function JoinPanel({ club }: JoinPanelProps) {
  const entryCost = 1000 // Mock entry cost
  const tokenAllocation = 100 // Mock token allocation
  const votingPower = 1 // Mock voting power

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Join This Club</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Entry Cost</span>
          <span className="text-white font-semibold">${entryCost.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Token Allocation</span>
          <span className="text-white font-semibold">{tokenAllocation} tokens</span>
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
        <Zap className="h-4 w-4 mr-2" />
        Join Club
      </Button>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>• Access to club resources and tools</p>
        <p>• Participate in governance decisions</p>
        <p>• Collaborate on club projects</p>
      </div>
    </div>
  )
}