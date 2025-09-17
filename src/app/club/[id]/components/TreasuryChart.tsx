'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TreasuryChartProps {
  club: ClubWithMembers
}

export function TreasuryChart({ club }: TreasuryChartProps) {
  // Mock data for treasury growth
  const treasuryData = [
    { month: 'Jan', amount: 50000 },
    { month: 'Feb', amount: 65000 },
    { month: 'Mar', amount: 72000 },
    { month: 'Apr', amount: 68000 },
    { month: 'May', amount: 85000 },
    { month: 'Jun', amount: club.treasury_balance },
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Treasury Growth</h3>
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
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Treasury']}
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
    </div>
  )
}