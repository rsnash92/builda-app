'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { DollarSign, TrendingUp, Shield, PieChart } from 'lucide-react'

interface TreasurySectionProps {
  club: ClubWithMembers
}

export function TreasurySection({ club }: TreasurySectionProps) {
  // Mock data for treasury allocation
  const treasuryAllocation = [
    { category: 'Development', amount: 40000, percentage: 40, color: 'bg-blue-500' },
    { category: 'Marketing', amount: 20000, percentage: 20, color: 'bg-green-500' },
    { category: 'Operations', amount: 15000, percentage: 15, color: 'bg-purple-500' },
    { category: 'Reserves', amount: 15000, percentage: 15, color: 'bg-yellow-500' },
    { category: 'Governance', amount: 10000, percentage: 10, color: 'bg-red-500' }
  ]

  // Mock data for shared resources
  const sharedResources = [
    {
      name: 'Development Tools',
      description: 'GitHub Pro, Figma, Vercel Pro',
      cost: 500,
      users: 12
    },
    {
      name: 'Design Assets',
      description: 'Stock photos, icons, templates',
      cost: 200,
      users: 8
    },
    {
      name: 'Cloud Services',
      description: 'AWS, Supabase, Vercel',
      cost: 800,
      users: 15
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold text-white">Treasury & Resources</h2>
      </div>
      
      {/* Treasury Overview */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Treasury Allocation</h3>
        <div className="space-y-3">
          {treasuryAllocation.map((item) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-white font-medium">{item.category}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-white font-semibold">${item.amount.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Total Treasury</span>
            <span className="text-2xl font-bold text-white">${club.treasury_balance.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Shared Resources */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Shared Resources</h3>
        <div className="space-y-3">
          {sharedResources.map((resource, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-white font-semibold">{resource.name}</h4>
                  <p className="text-gray-400 text-sm">{resource.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">${resource.cost}/month</div>
                  <div className="text-gray-400 text-sm">{resource.users} users</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span>View Analytics</span>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Manage Access</span>
        </button>
      </div>
    </div>
  )
}