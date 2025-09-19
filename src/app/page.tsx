'use client'

import { useSupabase } from '../contexts/SupabaseContext'
import { useState, useEffect } from 'react'
import { ClubWithMembers } from '../lib/database/types'
import { ClubService } from '../lib/services/club-service'
import Link from 'next/link'
import { 
  Plus, 
  Users, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  Calendar,
  DollarSign,
  Flame,
  Zap,
  Trophy,
  Target,
  BookOpen,
  Gem,
  Bell,
  Clock,
  Star,
  ChevronRight,
  Hammer,
  Coins,
  TrendingDown,
  Award,
  Sparkles,
  Activity,
  GitBranch,
  MessageSquare,
  Vote,
  Wallet,
  Lock,
  Unlock
} from 'lucide-react'
import { AppLayout } from '../components/AppLayout'

export default function AppDashboard() {
  const { profile } = useSupabase()
  const [clubs, setClubs] = useState<ClubWithMembers[]>([])
  const [loading, setLoading] = useState(true)
  const [buildingStreak, setBuildingStreak] = useState(7)
  const [buidlBalance, setBuidlBalance] = useState(12450)
  const [stakedAmount, setStakedAmount] = useState(5000)
  const [monthlyEarnings, setMonthlyEarnings] = useState(3450)
  const [builderLevel, setBuilderLevel] = useState(7)
  const [contributions, setContributions] = useState(1247)

  useEffect(() => {
    const fetchUserClubs = async () => {
      try {
        // TODO: Implement user's clubs fetching
        // For now, we'll show a placeholder
        setClubs([])
      } catch (error) {
        console.error('Failed to fetch user clubs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserClubs()
  }, [])

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

  // Mock data for building activities
  const buildingActivities = [
    { id: 1, type: 'ship', user: 'alice.sol', action: 'shipped new trading bot', club: 'BUIDLers United', time: '2 hours ago', icon: '🚀' },
    { id: 2, type: 'proposal', user: 'System', action: 'New proposal: Add GitHub Enterprise to DevDAO', club: 'DevDAO', time: '4 hours ago', icon: '📊' },
    { id: 3, type: 'milestone', user: 'System', action: 'Treasury milestone: CryptoBuilders hit $100K', club: 'CryptoBuilders', time: '6 hours ago', icon: '💰' },
    { id: 4, type: 'streak', user: 'You', action: "You're on a 7-day build streak!", club: '', time: 'Just now', icon: '🔥' },
  ]

  // Mock data for hot clubs
  const hotClubs = [
    { name: 'DevDAO', activity: 'Shipping v2 of scanner', builders: 12, category: 'Developer' },
    { name: 'TradingElite', activity: 'New strategy backtest', builders: 8, category: 'Trading' },
    { name: 'CreativeCollective', activity: 'Launching NFT series', builders: 23, category: 'Creative' },
  ]

  // Mock data for contribution opportunities
  const contributionOpportunities = [
    { skill: 'React Development', clubs: 3, bounty: 2500, icon: '⚛️' },
    { skill: 'Smart Contracts', clubs: 2, bounty: 5000, icon: '🔗' },
    { skill: 'UI/UX Design', clubs: 4, bounty: 1800, icon: '🎨' },
  ]

  return (
    <AppLayout pageTitle="Dashboard">
      <div className="p-6">
        {/* Welcome Header with Builder Level */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Ready to BUIDL, {profile?.display_name || 'Builder'}? 🔨
              </h1>
              <p className="text-gray-400">
                Level {builderLevel} Builder • {contributions.toLocaleString()} contributions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-500">{formatBuidl(buidlBalance)} $BUIDL</div>
                <div className="text-sm text-gray-400">Your Balance</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Building-Focused Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Clubs You're Building In</p>
                <p className="text-2xl font-bold text-white">{clubs.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Your Share Value</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(clubs.reduce((sum, club) => sum + (club.treasury_balance * 0.0084), 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Builders in Your Network</p>
                <p className="text-2xl font-bold text-white">
                  {clubs.reduce((sum, club) => sum + club.member_count, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">$BUIDL Earned This Month</p>
                <p className="text-2xl font-bold text-white">+{formatBuidl(monthlyEarnings)}</p>
              </div>
              <Coins className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Building Streak & $BUIDL Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Building Streak */}
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-6 border border-orange-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-bold text-white">Building Streak</h3>
              </div>
              <div className="text-orange-500 font-bold">{buildingStreak} days</div>
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: `${(buildingStreak / 30) * 100}%`}}></div>
                </div>
                <span className="text-sm text-gray-400">{buildingStreak}/30</span>
              </div>
              <p className="text-sm text-gray-300">Don't break it! Unlock 1.5x multiplier at 30 days</p>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors">
              Continue Building
            </button>
          </div>

          {/* $BUIDL Stats */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">$BUIDL Stats</h3>
              <Coins className="h-6 w-6 text-orange-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Balance:</span>
                <span className="text-white font-semibold">{formatBuidl(buidlBalance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Staked:</span>
                <span className="text-green-400 font-semibold">{formatBuidl(stakedAmount)} (2x multiplier)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">This Month:</span>
                <span className="text-green-400 font-semibold">+{formatBuidl(monthlyEarnings)}</span>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors mt-4">
                Claim Daily Reward
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Clubs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Your Clubs</h2>
              <Link
                href="/create-club"
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Club</span>
              </Link>
            </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : clubs.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
              <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No clubs yet</h3>
              <p className="text-gray-400 mb-6">
                Join your first club or create one to start building together.
              </p>
              <div className="flex space-x-4 justify-center">
                <Link
                  href="/create-club"
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Club</span>
                </Link>
              <Link
                href="/club/demo"
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <span>View Demo Club</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/club/discord"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <span>Discord-Style Interface</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {clubs.map((club) => (
                <div key={club.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-orange-500 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {club.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{club.name}</h3>
                        <p className="text-gray-400 text-sm">{club.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {formatCurrency(club.treasury_balance)}
                      </p>
                      <p className="text-gray-400 text-sm">{club.member_count} members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-gray-400">Your Share: </span>
                        <span className="text-green-400 font-semibold">{formatCurrency(club.treasury_balance * 0.0084)} (0.84%)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-orange-400">
                        <Hammer className="h-4 w-4" />
                        <span>12 building now</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      Last contribution: 2 hours ago
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/club/${club.id}`}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded-lg transition-colors"
                    >
                      Enter Club
                    </Link>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                      Quick Contribute
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Building Activities & Discovery */}
        <div className="space-y-6">
          {/* Building Activities */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Building Activities</h3>
            <div className="space-y-3">
              {buildingActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="text-lg">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-white">{activity.user}</span> {activity.action}
                      {activity.club && (
                        <span className="text-orange-400"> in {activity.club}</span>
                      )}
                    </p>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Clubs Building Now */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">🔥 Hot Clubs Building Now</h3>
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div className="space-y-3">
              {hotClubs.map((club, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <div>
                    <div className="font-semibold text-white text-sm">{club.name}</div>
                    <div className="text-gray-400 text-xs">{club.activity}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-orange-400 text-xs">
                      <Hammer className="h-3 w-3" />
                      <span>{club.builders}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Opportunities */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Contribution Opportunities</h3>
            <div className="space-y-3">
              {contributionOpportunities.map((opp, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">{opp.icon}</div>
                    <div>
                      <div className="font-semibold text-white text-sm">{opp.skill}</div>
                      <div className="text-gray-400 text-xs">{opp.clubs} clubs need help</div>
                    </div>
                  </div>
                  <div className="text-orange-400 font-semibold text-sm">
                    {formatBuidl(opp.bounty)} $BUIDL
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                <Flame className="h-5 w-5 text-white" />
                <span className="text-white font-semibold">Continue Building</span>
              </button>
              <Link
                href="/browse"
                className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Gem className="h-5 w-5 text-blue-500" />
                <span className="text-white">Browse Clubs</span>
              </Link>
              <Link
                href="/staking"
                className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Vote className="h-5 w-5 text-purple-500" />
                <span className="text-white">Manage $BUIDL Staking</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </AppLayout>
  )
}
