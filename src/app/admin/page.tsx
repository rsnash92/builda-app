'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import {
  Shield,
  Users,
  Building2,
  Coins,
  Activity,
  AlertTriangle,
  Settings,
  BarChart3,
  FileText,
  Ban,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Clock,
  DollarSign
} from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')

  // Mock admin data - will be replaced with real data in Phase 2A
  const adminStats = {
    totalUsers: 12847,
    activeUsers: 8924,
    totalClubs: 247,
    activeClubs: 189,
    totalTreasury: 2847000,
    buidlStaked: 45000000,
    pendingReports: 12,
    systemHealth: 98.5
  }

  const recentActivity = [
    { type: 'club_created', user: 'alice.sol', action: 'Created "AI Builders DAO"', time: '2 hours ago', severity: 'info' },
    { type: 'large_transaction', user: 'whale_trader', action: 'Deposited $50,000 to TradingElite', time: '4 hours ago', severity: 'warning' },
    { type: 'user_reported', user: 'System', action: 'User "scammer123" reported for spam', time: '6 hours ago', severity: 'alert' },
    { type: 'system_alert', user: 'System', action: 'High server load detected', time: '8 hours ago', severity: 'alert' },
    { type: 'milestone', user: 'System', action: 'Platform reached 10,000 users', time: '1 day ago', severity: 'success' }
  ]

  const clubsData = [
    { id: 1, name: 'DevDAO', members: 247, treasury: 87500, status: 'active', reports: 0, created: '2024-01-15' },
    { id: 2, name: 'TradingElite', members: 89, treasury: 125000, status: 'active', reports: 1, created: '2024-02-20' },
    { id: 3, name: 'ScamClub', members: 5, treasury: 1000, status: 'suspended', reports: 15, created: '2024-08-01' },
    { id: 4, name: 'CreativeCollective', members: 156, treasury: 45000, status: 'active', reports: 0, created: '2024-03-10' },
    { id: 5, name: 'CryptoLearners', members: 312, treasury: 62400, status: 'active', reports: 2, created: '2024-01-05' }
  ]

  const usersData = [
    { id: 1, username: 'alice.sol', email: 'alice@example.com', clubs: 3, totalContributed: 5000, status: 'active', joined: '2024-01-10' },
    { id: 2, username: 'builder_master', email: 'builder@example.com', clubs: 5, totalContributed: 15000, status: 'active', joined: '2024-01-15' },
    { id: 3, username: 'scammer123', email: 'spam@fake.com', clubs: 1, totalContributed: 100, status: 'banned', joined: '2024-08-01' },
    { id: 4, username: 'crypto_dev', email: 'dev@crypto.com', clubs: 2, totalContributed: 8000, status: 'active', joined: '2024-02-01' }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'clubs', name: 'Clubs', icon: Building2 },
    { id: 'treasury', name: 'Treasury', icon: DollarSign },
    { id: 'reports', name: 'Reports', icon: AlertTriangle },
    { id: 'system', name: 'System', icon: Settings }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatBuidl = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      suspended: 'bg-red-500/20 text-red-400 border-red-500/30',
      banned: 'bg-red-500/20 text-red-400 border-red-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const getSeverityColor = (severity: string) => {
    const colors = {
      info: 'text-blue-400',
      success: 'text-green-400',
      warning: 'text-yellow-400',
      alert: 'text-red-400'
    }
    return colors[severity as keyof typeof colors] || colors.info
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-400">+12% this week</p>
                  </div>
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Clubs</p>
                    <p className="text-2xl font-bold text-white">{adminStats.activeClubs}</p>
                    <p className="text-sm text-green-400">+8% this week</p>
                  </div>
                  <Building2 className="h-10 w-10 text-purple-500" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Treasury</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(adminStats.totalTreasury)}</p>
                    <p className="text-sm text-green-400">+25% this week</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-green-500" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">$BUIDL Staked</p>
                    <p className="text-2xl font-bold text-white">{formatBuidl(adminStats.buidlStaked)}</p>
                    <p className="text-sm text-green-400">+15% this week</p>
                  </div>
                  <Coins className="h-10 w-10 text-orange-500" />
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Overall Health</span>
                    <span className="text-green-400 font-semibold">{adminStats.systemHealth}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${adminStats.systemHealth}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">API Response Time:</span>
                      <span className="text-green-400 ml-2">145ms</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Database Load:</span>
                      <span className="text-yellow-400 ml-2">68%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Pending Actions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-white">User Reports</span>
                    </div>
                    <span className="text-red-400 font-semibold">{adminStats.pendingReports}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">Pending Approvals</span>
                    </div>
                    <span className="text-yellow-400 font-semibold">5</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-400" />
                      <span className="text-white">System Updates</span>
                    </div>
                    <span className="text-blue-400 font-semibold">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Platform Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${getSeverityColor(activity.severity)}`}></div>
                    <div className="flex-1">
                      <p className="text-white">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">User Management</h3>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Clubs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contributed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {usersData.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{user.username}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {user.clubs}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {formatCurrency(user.totalContributed)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(user.joined).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <Ban className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'clubs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Club Management</h3>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Club</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Treasury</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reports</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {clubsData.map((club) => (
                      <tr key={club.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{club.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {club.members}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {formatCurrency(club.treasury)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm ${club.reports > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {club.reports}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(club.status)}`}>
                            {club.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(club.created).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <Ban className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400">This admin section will be implemented in Phase 2A.</p>
          </div>
        )
    }
  }

  return (
    <AppLayout pageTitle="Admin Dashboard">
      {/* Admin Access Warning */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-400" />
          <span className="text-red-400 font-semibold">Admin Access Required</span>
        </div>
        <p className="text-red-200 text-sm mt-1">
          This interface is for platform administrators only. All actions are logged and monitored.
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">
            Platform administration and monitoring tools for builda.club
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1 border border-gray-800">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </AppLayout>
  )
}