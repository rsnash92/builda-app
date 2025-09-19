'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import {
  Coins,
  TrendingUp,
  Lock,
  Unlock,
  Calendar,
  Zap,
  Award,
  Info,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Activity,
  Clock,
  Target,
  Flame,
  Gift,
  Settings,
  ExternalLink,
  BarChart3,
  Wallet
} from 'lucide-react'

export default function StakingPage() {
  const [activeTab, setActiveTab] = useState('stake')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [selectedPool, setSelectedPool] = useState('flexible')

  // Mock data - will be replaced with real data in Phase 2A
  const buidlStats = {
    totalBalance: 12450,
    availableBalance: 7450,
    stakedBalance: 5000,
    totalEarned: 25750,
    pendingRewards: 245,
    stakingAPY: 12.5,
    multiplier: 2.0,
    stakingPower: 10000, // staked amount * multiplier
    globalStaked: 45000000, // total $BUIDL staked globally
    globalSupply: 150000000, // total $BUIDL in circulation
    rank: 247 // user's staking rank
  }

  const stakingPools = [
    {
      id: 'flexible',
      name: 'Flexible Staking',
      apy: 8.5,
      multiplier: 1.5,
      lockPeriod: 'None',
      minStake: 100,
      description: 'Unstake anytime, lower rewards but maximum flexibility',
      benefits: ['Unstake anytime', '1.5x $BUIDL earning multiplier', 'Daily reward claims'],
      recommended: false
    },
    {
      id: 'fixed30',
      name: '30-Day Lock',
      apy: 12.5,
      multiplier: 2.0,
      lockPeriod: '30 days',
      minStake: 500,
      description: 'Lock for 30 days, earn higher rewards and multiplier',
      benefits: ['2x $BUIDL earning multiplier', 'Higher APY', 'Priority governance voting'],
      recommended: true
    },
    {
      id: 'fixed90',
      name: '90-Day Lock',
      apy: 18.0,
      multiplier: 3.0,
      lockPeriod: '90 days',
      minStake: 1000,
      description: 'Maximum rewards for serious long-term builders',
      benefits: ['3x $BUIDL earning multiplier', 'Maximum APY', 'Exclusive builder perks'],
      recommended: false
    }
  ]

  const recentTransactions = [
    { type: 'stake', amount: 1000, pool: '30-Day Lock', time: '2 hours ago', status: 'completed' },
    { type: 'reward', amount: 125, pool: 'Flexible', time: '1 day ago', status: 'completed' },
    { type: 'unstake', amount: 500, pool: 'Flexible', time: '3 days ago', status: 'completed' },
    { type: 'stake', amount: 2000, pool: '30-Day Lock', time: '1 week ago', status: 'completed' }
  ]

  const achievements = [
    { name: 'First Stake', description: 'Staked your first $BUIDL', unlocked: true, reward: 100 },
    { name: 'Diamond Hands', description: 'Staked for 30+ days', unlocked: true, reward: 500 },
    { name: 'Whale Staker', description: 'Stake 10,000+ $BUIDL', unlocked: false, reward: 1000 },
    { name: 'Long Term Builder', description: 'Stake for 90+ days', unlocked: false, reward: 2000 }
  ]

  const leaderboard = [
    { rank: 1, user: 'builder_master', amount: 125000, multiplier: 3.0, earnings: 15600 },
    { rank: 2, user: 'crypto_dev', amount: 98000, multiplier: 2.0, earnings: 12200 },
    { rank: 3, user: 'trade_queen', amount: 87500, multiplier: 3.0, earnings: 13800 },
    { rank: 247, user: 'You', amount: 5000, multiplier: 2.0, earnings: 650 },
  ]

  const formatBuidl = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleStake = () => {
    const amount = parseInt(stakeAmount)
    if (amount > 0 && amount <= buidlStats.availableBalance) {
      // TODO: Implement staking logic
      console.log(`Staking ${amount} $BUIDL in ${selectedPool} pool`)
      alert('Staking will be implemented in Phase 2C!')
      setStakeAmount('')
    }
  }

  const handleUnstake = () => {
    const amount = parseInt(unstakeAmount)
    if (amount > 0 && amount <= buidlStats.stakedBalance) {
      // TODO: Implement unstaking logic
      console.log(`Unstaking ${amount} $BUIDL`)
      alert('Unstaking will be implemented in Phase 2C!')
      setUnstakeAmount('')
    }
  }

  const handleClaimRewards = () => {
    // TODO: Implement reward claiming
    console.log('Claiming rewards:', buidlStats.pendingRewards)
    alert('Reward claiming will be implemented in Phase 2C!')
  }

  const tabs = [
    { id: 'stake', name: 'Stake & Earn', icon: Lock },
    { id: 'unstake', name: 'Unstake', icon: Unlock },
    { id: 'rewards', name: 'Rewards', icon: Gift },
    { id: 'leaderboard', name: 'Leaderboard', icon: Award },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stake':
        return (
          <div className="space-y-6">
            {/* Staking Pools */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Choose Staking Pool</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {stakingPools.map((pool) => (
                  <div
                    key={pool.id}
                    className={`p-6 border rounded-lg cursor-pointer transition-all ${
                      selectedPool === pool.id
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    } ${pool.recommended ? 'ring-2 ring-orange-500/50' : ''}`}
                    onClick={() => setSelectedPool(pool.id)}
                  >
                    {pool.recommended && (
                      <div className="mb-3">
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                          Recommended
                        </span>
                      </div>
                    )}

                    <h4 className="text-lg font-semibold text-white mb-2">{pool.name}</h4>
                    <p className="text-sm text-gray-400 mb-4">{pool.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">APY:</span>
                        <span className="text-green-400 font-semibold">{pool.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Multiplier:</span>
                        <span className="text-orange-400 font-semibold">{pool.multiplier}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lock Period:</span>
                        <span className="text-white">{pool.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Stake:</span>
                        <span className="text-white">{formatBuidl(pool.minStake)} $BUIDL</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {pool.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stake Form */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Stake $BUIDL</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount to Stake
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount"
                      max={buidlStats.availableBalance}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setStakeAmount(buidlStats.availableBalance.toString())}
                      className="absolute right-3 top-3 text-orange-400 hover:text-orange-300 text-sm font-medium"
                    >
                      MAX
                    </button>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Available: {formatBuidl(buidlStats.availableBalance)} $BUIDL</span>
                    <span>
                      Min: {formatBuidl(stakingPools.find(p => p.id === selectedPool)?.minStake || 0)} $BUIDL
                    </span>
                  </div>
                </div>

                {/* Projected Earnings */}
                {stakeAmount && parseInt(stakeAmount) > 0 && (
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3">Projected Earnings</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Daily Rewards:</span>
                        <div className="text-white font-semibold">
                          +{formatBuidl(Math.floor(parseInt(stakeAmount) * (stakingPools.find(p => p.id === selectedPool)?.apy || 0) / 365 / 100))} $BUIDL
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Earning Multiplier:</span>
                        <div className="text-orange-400 font-semibold">
                          {stakingPools.find(p => p.id === selectedPool)?.multiplier}x
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleStake}
                  disabled={!stakeAmount || parseInt(stakeAmount) <= 0 || parseInt(stakeAmount) > buidlStats.availableBalance}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors font-medium"
                >
                  Stake {stakeAmount && formatBuidl(parseInt(stakeAmount))} $BUIDL
                </button>
              </div>
            </div>
          </div>
        )

      case 'unstake':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Unstake $BUIDL</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount to Unstake
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      placeholder="Enter amount"
                      max={buidlStats.stakedBalance}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setUnstakeAmount(buidlStats.stakedBalance.toString())}
                      className="absolute right-3 top-3 text-orange-400 hover:text-orange-300 text-sm font-medium"
                    >
                      MAX
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">
                    Staked: {formatBuidl(buidlStats.stakedBalance)} $BUIDL
                  </span>
                </div>

                {/* Warning */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-500 font-medium mb-1">Important Notice</h4>
                      <p className="text-yellow-200 text-sm">
                        Unstaking will remove your earning multiplier and may affect locked pools.
                        Make sure you understand the implications before proceeding.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleUnstake}
                  disabled={!unstakeAmount || parseInt(unstakeAmount) <= 0 || parseInt(unstakeAmount) > buidlStats.stakedBalance}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors font-medium"
                >
                  Unstake {unstakeAmount && formatBuidl(parseInt(unstakeAmount))} $BUIDL
                </button>
              </div>
            </div>

            {/* Current Stakes */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Your Current Stakes</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">30-Day Lock Pool</h4>
                    <p className="text-sm text-gray-400">Unlocks in 18 days</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{formatBuidl(3000)} $BUIDL</div>
                    <div className="text-sm text-gray-400">2x multiplier</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Flexible Pool</h4>
                    <p className="text-sm text-gray-400">Available to unstake anytime</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{formatBuidl(2000)} $BUIDL</div>
                    <div className="text-sm text-gray-400">1.5x multiplier</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'rewards':
        return (
          <div className="space-y-6">
            {/* Pending Rewards */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-6 border border-orange-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Pending Rewards</h3>
                  <p className="text-gray-300">Ready to claim</p>
                </div>
                <Gift className="h-8 w-8 text-orange-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-orange-500">
                  +{formatBuidl(buidlStats.pendingRewards)} $BUIDL
                </div>
                <button
                  onClick={handleClaimRewards}
                  disabled={buidlStats.pendingRewards === 0}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Claim Rewards
                </button>
              </div>
            </div>

            {/* Reward Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                  <span className="text-sm text-gray-400">Total Earned</span>
                </div>
                <div className="text-2xl font-bold text-white">{formatBuidl(buidlStats.totalEarned)}</div>
                <div className="text-sm text-gray-400">$BUIDL</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="h-8 w-8 text-orange-500" />
                  <span className="text-sm text-gray-400">Current APY</span>
                </div>
                <div className="text-2xl font-bold text-white">{buidlStats.stakingAPY}%</div>
                <div className="text-sm text-gray-400">Annual Percentage Yield</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-8 w-8 text-purple-500" />
                  <span className="text-sm text-gray-400">Multiplier</span>
                </div>
                <div className="text-2xl font-bold text-white">{buidlStats.multiplier}x</div>
                <div className="text-sm text-gray-400">Earning boost</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Staking Achievements</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked
                        ? 'border-green-500/30 bg-green-500/10'
                        : 'border-gray-700 bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-medium ${achievement.unlocked ? 'text-green-400' : 'text-gray-400'}`}>
                        {achievement.name}
                      </h4>
                      {achievement.unlocked && <Award className="h-5 w-5 text-green-400" />}
                    </div>
                    <p className={`text-sm mb-2 ${achievement.unlocked ? 'text-green-200' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    <div className={`text-sm font-semibold ${achievement.unlocked ? 'text-green-400' : 'text-gray-400'}`}>
                      Reward: +{formatBuidl(achievement.reward)} $BUIDL
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'leaderboard':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Top Stakers</h3>

              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      entry.user === 'You'
                        ? 'bg-orange-500/10 border border-orange-500/30'
                        : 'bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        entry.rank === 1 ? 'bg-yellow-500 text-black' :
                        entry.rank === 2 ? 'bg-gray-400 text-black' :
                        entry.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <div className={`font-semibold ${entry.user === 'You' ? 'text-orange-400' : 'text-white'}`}>
                          {entry.user}
                        </div>
                        <div className="text-sm text-gray-400">{entry.multiplier}x multiplier</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-white font-semibold">{formatBuidl(entry.amount)} $BUIDL</div>
                      <div className="text-sm text-gray-400">+{formatBuidl(entry.earnings)} earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Stats */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Your Ranking</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">#{buidlStats.rank}</div>
                  <div className="text-sm text-gray-400">Global Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{formatBuidl(buidlStats.stakingPower)}</div>
                  <div className="text-sm text-gray-400">Staking Power</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {((buidlStats.stakedBalance / buidlStats.globalStaked) * 100).toFixed(3)}%
                  </div>
                  <div className="text-sm text-gray-400">Network Share</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Lock className="h-8 w-8 text-orange-500" />
                  <span className="text-sm text-gray-400">Total Staked</span>
                </div>
                <div className="text-2xl font-bold text-white">{formatBuidl(buidlStats.globalStaked)}</div>
                <div className="text-sm text-gray-400">$BUIDL locked</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Coins className="h-8 w-8 text-blue-500" />
                  <span className="text-sm text-gray-400">Circulating</span>
                </div>
                <div className="text-2xl font-bold text-white">{formatBuidl(buidlStats.globalSupply)}</div>
                <div className="text-sm text-gray-400">Total supply</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="h-8 w-8 text-green-500" />
                  <span className="text-sm text-gray-400">Staking Ratio</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {((buidlStats.globalStaked / buidlStats.globalSupply) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">of total supply</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-purple-500" />
                  <span className="text-sm text-gray-400">Avg APY</span>
                </div>
                <div className="text-2xl font-bold text-white">14.2%</div>
                <div className="text-sm text-gray-400">Network average</div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>

              <div className="space-y-3">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'stake' ? 'bg-green-500/20 text-green-400' :
                        tx.type === 'unstake' ? 'bg-red-500/20 text-red-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {tx.type === 'stake' ? <Lock className="h-4 w-4" /> :
                         tx.type === 'unstake' ? <Unlock className="h-4 w-4" /> :
                         <Gift className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="text-white font-medium capitalize">{tx.type}</div>
                        <div className="text-sm text-gray-400">{tx.pool} • {tx.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        tx.type === 'stake' ? 'text-green-400' :
                        tx.type === 'unstake' ? 'text-red-400' :
                        'text-orange-400'
                      }`}>
                        {tx.type === 'unstake' ? '-' : '+'}{formatBuidl(tx.amount)} $BUIDL
                      </div>
                      <div className={`text-xs ${
                        tx.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AppLayout pageTitle="$BUIDL Staking">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">$BUIDL Staking</h1>
          <p className="text-gray-400">
            Stake your $BUIDL tokens to earn rewards and unlock higher earning multipliers across all clubs.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="h-8 w-8 text-blue-500" />
              <span className="text-sm text-gray-400">Available</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatBuidl(buidlStats.availableBalance)}</div>
            <div className="text-sm text-gray-400">$BUIDL</div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Lock className="h-8 w-8 text-orange-500" />
              <span className="text-sm text-gray-400">Staked</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatBuidl(buidlStats.stakedBalance)}</div>
            <div className="text-sm text-gray-400">$BUIDL</div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-8 w-8 text-purple-500" />
              <span className="text-sm text-gray-400">Multiplier</span>
            </div>
            <div className="text-2xl font-bold text-white">{buidlStats.multiplier}x</div>
            <div className="text-sm text-gray-400">Earning boost</div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Gift className="h-8 w-8 text-green-500" />
              <span className="text-sm text-gray-400">Pending</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatBuidl(buidlStats.pendingRewards)}</div>
            <div className="text-sm text-gray-400">Rewards</div>
          </div>
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