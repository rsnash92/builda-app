'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import { PieChart, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TreasuryDashboardProps {
  club: ClubWithMembers
}

export function TreasuryDashboard({ club }: TreasuryDashboardProps) {
  // Mock data for treasury allocation
  const allocationData = [
    { name: 'Development', value: 40000, color: '#3B82F6' },
    { name: 'Marketing', value: 20000, color: '#10B981' },
    { name: 'Operations', value: 15000, color: '#8B5CF6' },
    { name: 'Reserves', value: 15000, color: '#F59E0B' },
    { name: 'Governance', value: 10000, color: '#EF4444' }
  ]

  // Mock data for monthly spending
  const spendingData = [
    { month: 'Jan', amount: 12000 },
    { month: 'Feb', amount: 15000 },
    { month: 'Mar', amount: 18000 },
    { month: 'Apr', amount: 14000 },
    { month: 'May', amount: 16000 },
    { month: 'Jun', amount: 20000 }
  ]

  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      description: 'Development Tools Subscription',
      amount: -500,
      category: 'Development',
      date: '2024-01-20',
      type: 'expense'
    },
    {
      id: 2,
      description: 'Club Revenue - NFT Sales',
      amount: 2500,
      category: 'Revenue',
      date: '2024-01-19',
      type: 'income'
    },
    {
      id: 3,
      description: 'Marketing Campaign',
      amount: -2000,
      category: 'Marketing',
      date: '2024-01-18',
      type: 'expense'
    },
    {
      id: 4,
      description: 'Member Contributions',
      amount: 5000,
      category: 'Contributions',
      date: '2024-01-17',
      type: 'income'
    }
  ]

  const totalIncome = recentTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = recentTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <div className="h-full bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Treasury Dashboard</h1>
          <p className="text-gray-400">Manage and monitor your club's financial resources</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Treasury</p>
                <p className="text-2xl font-bold text-white">${club.treasury_balance.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month Income</p>
                <p className="text-2xl font-bold text-green-500">${totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month Expenses</p>
                <p className="text-2xl font-bold text-red-500">${totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Net Growth</p>
                <p className="text-2xl font-bold text-white">+12.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Allocation Chart */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Treasury Allocation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending Chart */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Spending</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData}>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-gray-400 text-sm">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}