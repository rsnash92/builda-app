'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TreasuryChartProps {
  club: ClubWithMembers
}

export function TreasuryChart({ club }: TreasuryChartProps) {
  // Mock data for treasury growth with events
  const treasuryData = [
    { month: 'Jan', amount: 50000, event: 'Platform Launch' },
    { month: 'Feb', amount: 65000, event: 'First Feature Shipped' },
    { month: 'Mar', amount: 72000, event: '50 Members Joined' },
    { month: 'Apr', amount: 68000, event: 'Market Dip' },
    { month: 'May', amount: 85000, event: 'Major Partnership' },
    { month: 'Jun', amount: club.treasury_balance, event: 'Current' },
  ]

  const nextMilestone = 200000
  const currentAmount = club.treasury_balance
  const progressToMilestone = (currentAmount / nextMilestone) * 100

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Treasury Growth</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-500">${currentAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-400">+12% this month</div>
        </div>
      </div>
      
      {/* Next Milestone Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Next milestone: ${nextMilestone.toLocaleString()}</span>
          <span>{Math.round(progressToMilestone)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressToMilestone, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={treasuryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value: number, name, props) => [
                `$${value.toLocaleString()}`, 
                'Treasury',
                props.payload.event ? `Event: ${props.payload.event}` : ''
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#F97316" 
              strokeWidth={3}
              dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Recent Events */}
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-semibold text-gray-400">Recent Events</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Major Partnership - May 2024</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>50 Members Joined - Mar 2024</span>
          </div>
        </div>
      </div>
    </div>
  )
}
