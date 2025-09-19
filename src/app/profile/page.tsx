'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { useSupabase } from '@/contexts/SupabaseContext'
import {
  User,
  Settings,
  Wallet,
  Trophy,
  Calendar,
  Activity,
  Building2,
  Coins,
  TrendingUp,
  Users,
  Star,
  Flame,
  Edit3,
  Save,
  X,
  Camera,
  Link as LinkIcon,
  Github,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  ExternalLink
} from 'lucide-react'

export default function ProfilePage() {
  const { profile } = useSupabase()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - will be replaced with real data in Phase 2A
  const [profileData, setProfileData] = useState({
    displayName: profile?.display_name || 'Builder',
    username: 'builder123',
    bio: 'Passionate builder in the Web3 space. Love creating tools that empower communities.',
    location: 'San Francisco, CA',
    website: 'https://myportfolio.com',
    twitter: '@builder123',
    github: 'builder123',
    email: 'builder@example.com',
    phone: '',
    company: 'Freelance Developer',
    avatar: null as File | null
  })

  const stats = {
    buidlBalance: 12450,
    stakedAmount: 5000,
    totalEarned: 25750,
    clubsJoined: 3,
    contributions: 1247,
    builderLevel: 7,
    buildingStreak: 15,
    totalValueBuilt: 48500,
    reputation: 92,
    achievements: 12
  }

  const clubs = [
    {
      id: 1,
      name: 'DevDAO',
      role: 'Core Contributor',
      joinedAt: '2024-01-15',
      contributions: 45,
      shareValue: 2400,
      status: 'active'
    },
    {
      id: 2,
      name: 'TradingElite',
      role: 'Member',
      joinedAt: '2024-03-20',
      contributions: 12,
      shareValue: 800,
      status: 'active'
    },
    {
      id: 3,
      name: 'CreativeCollective',
      role: 'Advisor',
      joinedAt: '2024-02-10',
      contributions: 8,
      shareValue: 600,
      status: 'inactive'
    }
  ]

  const achievements = [
    { id: 1, name: 'First Club', description: 'Joined your first club', date: '2024-01-15', icon: '🎯' },
    { id: 2, name: 'Builder Streak', description: '30-day building streak', date: '2024-03-01', icon: '🔥' },
    { id: 3, name: 'Top Contributor', description: 'Top contributor in DevDAO', date: '2024-04-15', icon: '🏆' },
    { id: 4, name: 'Community Builder', description: 'Helped onboard 10+ members', date: '2024-05-01', icon: '👥' },
    { id: 5, name: 'High Earner', description: 'Earned 10,000+ $BUIDL', date: '2024-06-10', icon: '💰' },
    { id: 6, name: 'Governance Participant', description: 'Voted on 25+ proposals', date: '2024-07-20', icon: '🗳️' }
  ]

  const recentActivity = [
    { type: 'contribution', action: 'Shipped new feature for DevDAO trading bot', club: 'DevDAO', time: '2 hours ago', reward: 500 },
    { type: 'vote', action: 'Voted on treasury allocation proposal', club: 'DevDAO', time: '1 day ago', reward: 50 },
    { type: 'streak', action: 'Maintained 15-day building streak', club: '', time: '2 days ago', reward: 100 },
    { type: 'join', action: 'New member joined through your referral', club: 'TradingElite', time: '3 days ago', reward: 200 },
    { type: 'achievement', action: 'Unlocked "High Earner" achievement', club: '', time: '1 week ago', reward: 1000 }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'clubs', name: 'Clubs', icon: Building2 },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const handleSave = () => {
    // TODO: Implement profile update logic
    console.log('Saving profile:', profileData)
    setIsEditing(false)
    alert('Profile updates will be implemented in Phase 2A!')
  }

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Coins className="h-8 w-8 text-orange-500" />
                  <span className="text-sm text-gray-400">Balance</span>
                </div>
                <div className="text-2xl font-bold text-white">{formatBuidl(stats.buidlBalance)}</div>
                <div className="text-sm text-gray-400">$BUIDL</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="h-8 w-8 text-blue-500" />
                  <span className="text-sm text-gray-400">Clubs</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.clubsJoined}</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Flame className="h-8 w-8 text-red-500" />
                  <span className="text-sm text-gray-400">Streak</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.buildingStreak}</div>
                <div className="text-sm text-gray-400">Days</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <span className="text-sm text-gray-400">Level</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.builderLevel}</div>
                <div className="text-sm text-gray-400">Builder</div>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* $BUIDL Overview */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">$BUIDL Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Balance:</span>
                    <span className="text-white font-semibold">{formatBuidl(stats.buidlBalance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Staked (2x multiplier):</span>
                    <span className="text-green-400 font-semibold">{formatBuidl(stats.stakedAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Earned:</span>
                    <span className="text-orange-400 font-semibold">{formatBuidl(stats.totalEarned)}</span>
                  </div>
                  <div className="h-px bg-gray-700 my-3"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available to Stake:</span>
                    <span className="text-white">{formatBuidl(stats.buidlBalance - stats.stakedAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Building Performance */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Building Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Contributions:</span>
                    <span className="text-white font-semibold">{stats.contributions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Value Built:</span>
                    <span className="text-green-400 font-semibold">{formatCurrency(stats.totalValueBuilt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reputation Score:</span>
                    <span className="text-orange-400 font-semibold">{stats.reputation}/100</span>
                  </div>
                  <div className="h-px bg-gray-700 my-3"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Achievements:</span>
                    <span className="text-white">{stats.achievements}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'clubs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Your Clubs</h3>
              <span className="text-gray-400">{clubs.length} clubs</span>
            </div>

            <div className="space-y-4">
              {clubs.map((club) => (
                <div key={club.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {club.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{club.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{club.role}</span>
                          <span>•</span>
                          <span>Joined {new Date(club.joinedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{formatCurrency(club.shareValue)}</div>
                      <div className="text-sm text-gray-400">Share Value</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-white font-semibold">{club.contributions}</div>
                      <div className="text-sm text-gray-400">Contributions</div>
                    </div>
                    <div>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        club.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Enter Club
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Achievements</h3>
              <span className="text-gray-400">{achievements.length} unlocked</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{achievement.name}</h4>
                      <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                      <span className="text-xs text-gray-500">
                        Unlocked {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'activity':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white">{activity.action}</p>
                      {activity.club && (
                        <p className="text-sm text-gray-400">in {activity.club}</p>
                      )}
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    {activity.reward > 0 && (
                      <div className="text-right">
                        <div className="text-orange-400 font-semibold">+{activity.reward} $BUIDL</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Profile Settings</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile Form */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Twitter className="inline h-4 w-4 mr-1" />
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={profileData.twitter}
                    onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                    disabled={!isEditing}
                    placeholder="@username"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Github className="inline h-4 w-4 mr-1" />
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={profileData.github}
                    onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                    disabled={!isEditing}
                    placeholder="username"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AppLayout pageTitle="Profile">
      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {profileData.displayName.charAt(0)}
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{stats.builderLevel}</span>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{profileData.displayName}</h1>
              <p className="text-gray-400 mb-1">@{profileData.username}</p>
              <p className="text-gray-300">{profileData.bio}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                {profileData.location && (
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </span>
                )}
                {profileData.website && (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-500">{formatBuidl(stats.buidlBalance)} $BUIDL</div>
              <div className="text-sm text-gray-400">Total Balance</div>
            </div>
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
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          {renderTabContent()}
        </div>
      </div>
    </AppLayout>
  )
}