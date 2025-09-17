'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TreasuryChartProps {
  club: ClubWithMembers
  activeTimeRange: string
  onTimeRangeChange: (range: string) => void
}

export function TreasuryChart({ club, activeTimeRange, onTimeRangeChange }: TreasuryChartProps) {
  // Mock data for the chart
  const generateMockData = (range: string) => {
    const data = []
    const now = new Date()
    let days = 7
    
    switch (range) {
      case '1D':
        days = 1
        break
      case '7D':
        days = 7
        break
      case '30D':
        days = 30
        break
      case '90D':
        days = 90
        break
    }
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      // Generate realistic growth data
      const baseValue = club.treasury_balance * 0.7
      const growth = (days - i) / days * 0.3
      const randomVariation = (Math.random() - 0.5) * 0.1
      const value = baseValue * (1 + growth + randomVariation)
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.round(value),
        growth: Math.round((growth + randomVariation) * 100) / 100
      })
    }
    
    return data
  }

  const data = generateMockData(activeTimeRange)
  const timeRanges = ['1D', '7D', '30D', '90D']

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Treasury Growth</h2>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTimeRange === range
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Treasury Value']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-400">
          Current Value: <span className="text-white font-semibold">${club.treasury_balance.toLocaleString()}</span>
        </div>
        <div className="text-green-500 font-semibold">
          +{data[data.length - 1]?.growth * 100 || 0}% this period
        </div>
      </div>
    </div>
  )
}
