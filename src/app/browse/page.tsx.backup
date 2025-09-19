'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  Building2,
  Star,
  Clock,
  ArrowRight,
  Code,
  Palette,
  BookOpen,
  Gamepad2,
  Globe,
  Flame,
  Activity,
  Eye,
  ChevronDown,
  X,
  SortAsc,
  SortDesc
} from 'lucide-react'

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [sizeFilter, setSizeFilter] = useState('all')

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'developer', name: 'Developer', icon: Code },
    { id: 'trading', name: 'Trading', icon: TrendingUp },
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'learning', name: 'Learning', icon: BookOpen },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 }
  ]

  const sortOptions = [
    { id: 'trending', name: 'Trending', icon: Flame },
    { id: 'newest', name: 'Newest', icon: Clock },
    { id: 'members', name: 'Most Members', icon: Users },
    { id: 'treasury', name: 'Highest Treasury', icon: DollarSign },
    { id: 'activity', name: 'Most Active', icon: Activity }
  ]

  // Mock data - will be replaced with real data in Phase 2A
  const clubs = [
    {
      id: 1,
      name: 'DevDAO',
      description: 'Building the future of Web3 development tools and infrastructure together.',
      category: 'developer',
      entryFee: 500,
      members: 247,
      treasuryBalance: 87500,
      isActive: true,
      isHot: true,
      dailyActivity: 45,
      joinedThisWeek: 12,
      avgMemberEarnings: 850,
      logo: null,
      tags: ['Web3', 'DeFi', 'Smart Contracts'],
      governance: 'Democratic',
      founded: '2024-01-15',
      lastActivity: '2 minutes ago'
    },
    {
      id: 2,
      name: 'TradingElite',
      description: 'Sophisticated trading strategies and market analysis for serious traders.',
      category: 'trading',
      entryFee: 1000,
      members: 89,
      treasuryBalance: 125000,
      isActive: true,
      isHot: true,
      dailyActivity: 23,
      joinedThisWeek: 8,
      avgMemberEarnings: 1200,
      logo: null,
      tags: ['DeFi', 'Yield Farming', 'Analytics'],
      governance: 'Council',
      founded: '2024-02-20',
      lastActivity: '15 minutes ago'
    },
    {
      id: 3,
      name: 'CreativeCollective',
      description: 'Artists, designers, and creators building amazing digital experiences.',
      category: 'creative',
      entryFee: 300,
      members: 156,
      treasuryBalance: 45000,
      isActive: true,
      isHot: false,
      dailyActivity: 18,
      joinedThisWeek: 5,
      avgMemberEarnings: 420,
      logo: null,
      tags: ['NFTs', 'Design', 'Branding'],
      governance: 'Democratic',
      founded: '2024-03-10',
      lastActivity: '1 hour ago'
    },
    {
      id: 4,
      name: 'CryptoLearners',
      description: 'Learn about blockchain, DeFi, and Web3 technologies with experts.',
      category: 'learning',
      entryFee: 200,
      members: 312,
      treasuryBalance: 62400,
      isActive: true,
      isHot: false,
      dailyActivity: 35,
      joinedThisWeek: 18,
      avgMemberEarnings: 180,
      logo: null,
      tags: ['Education', 'DeFi', 'Tutorials'],
      governance: 'Founder-led',
      founded: '2024-01-05',
      lastActivity: '30 minutes ago'
    },
    {
      id: 5,
      name: 'GameBuilders',
      description: 'Building the next generation of Web3 games and gaming infrastructure.',
      category: 'gaming',
      entryFee: 750,
      members: 78,
      treasuryBalance: 98000,
      isActive: true,
      isHot: false,
      dailyActivity: 15,
      joinedThisWeek: 3,
      avgMemberEarnings: 650,
      logo: null,
      tags: ['Gaming', 'NFTs', 'Metaverse'],
      governance: 'Democratic',
      founded: '2024-04-01',
      lastActivity: '2 hours ago'
    },
    {
      id: 6,
      name: 'DataScience DAO',
      description: 'Leveraging data science and AI for better trading and investment decisions.',
      category: 'developer',
      entryFee: 800,
      members: 92,
      treasuryBalance: 110000,
      isActive: false,
      isHot: false,
      dailyActivity: 8,
      joinedThisWeek: 1,
      avgMemberEarnings: 720,
      logo: null,
      tags: ['AI', 'Data Science', 'Analytics'],
      governance: 'Council',
      founded: '2024-02-14',
      lastActivity: '1 day ago'
    }
  ]

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory

    const matchesPrice = club.entryFee >= priceRange.min && club.entryFee <= priceRange.max

    const matchesSize = sizeFilter === 'all' ||
                       (sizeFilter === 'small' && club.members < 100) ||
                       (sizeFilter === 'medium' && club.members >= 100 && club.members < 300) ||
                       (sizeFilter === 'large' && club.members >= 300)

    return matchesSearch && matchesCategory && matchesPrice && matchesSize
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.founded).getTime() - new Date(a.founded).getTime()
      case 'members':
        return b.members - a.members
      case 'treasury':
        return b.treasuryBalance - a.treasuryBalance
      case 'activity':
        return b.dailyActivity - a.dailyActivity
      default: // trending
        return (b.isHot ? 1000 : 0) + b.joinedThisWeek - ((a.isHot ? 1000 : 0) + a.joinedThisWeek)
    }
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSortBy('trending')
    setPriceRange({ min: 0, max: 10000 })
    setSizeFilter('all')
  }

  return (
    <AppLayout pageTitle="Browse Clubs">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Discover Builder Clubs</h1>
          <p className="text-gray-400">
            Find communities building amazing things together. Join, contribute, and own a piece of what gets built.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search clubs, descriptions, or tags..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                showFilters
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Entry Fee Range
                  </label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        placeholder="Min"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                        placeholder="Max"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Club Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Club Size
                  </label>
                  <select
                    value={sizeFilter}
                    onChange={(e) => setSizeFilter(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Sizes</option>
                    <option value="small">Small (< 100 members)</option>
                    <option value="medium">Medium (100-300 members)</option>
                    <option value="large">Large (300+ members)</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear All Filters</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-400">
            {filteredClubs.length} clubs found
          </span>
          {(searchQuery || selectedCategory !== 'all' || showFilters) && (
            <button
              onClick={clearFilters}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No clubs found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or browse all categories.
            </p>
            <button
              onClick={clearFilters}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div
                key={club.id}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-orange-500 transition-colors"
              >
                {/* Club Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {club.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-white">{club.name}</h3>
                        {club.isHot && (
                          <Flame className="h-4 w-4 text-orange-500" title="Hot Club" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <span className="capitalize">{club.category}</span>
                        <span>•</span>
                        <span>{club.governance}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    club.isActive
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {club.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {club.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {club.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm mb-1">
                      <Users className="h-4 w-4" />
                      <span>Members</span>
                    </div>
                    <div className="text-white font-semibold">{club.members.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span>Treasury</span>
                    </div>
                    <div className="text-white font-semibold">{formatCurrency(club.treasuryBalance)}</div>
                  </div>
                </div>

                {/* Activity */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{club.dailyActivity} active builders today</span>
                  <span>Last activity: {club.lastActivity}</span>
                </div>

                {/* Entry Fee & Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400">Entry Fee</div>
                    <div className="text-xl font-bold text-orange-500">
                      {formatCurrency(club.entryFee)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                      <span>Join</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}