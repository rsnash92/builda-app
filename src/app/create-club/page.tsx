'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import {
  Building2,
  Users,
  DollarSign,
  Settings,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  Shield,
  Coins,
  Globe,
  Code,
  Palette,
  TrendingUp,
  BookOpen,
  Gamepad2
} from 'lucide-react'

export default function CreateClubPage() {
  const [step, setStep] = useState(1)
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    category: '',
    economicModel: 'fixed',
    entryFee: 500,
    tokenName: '',
    maxMembers: 100,
    governanceModel: 'democratic',
    resources: [] as string[],
    isPrivate: false,
    requireApproval: false,
    logo: null as File | null
  })

  const categories = [
    { id: 'developer', name: 'Developer', icon: Code, description: 'Build software and tools together' },
    { id: 'trading', name: 'Trading', icon: TrendingUp, description: 'Share strategies and grow wealth' },
    { id: 'creative', name: 'Creative', icon: Palette, description: 'Create art, content, and media' },
    { id: 'learning', name: 'Learning', icon: BookOpen, description: 'Learn and teach together' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, description: 'Build esports teams and compete' },
    { id: 'general', name: 'General', icon: Globe, description: 'General purpose community' }
  ]

  const economicModels = [
    {
      id: 'fixed',
      name: 'Fixed Entry Fee',
      description: 'One-time payment, lifetime membership',
      icon: Coins,
      recommended: true
    },
    {
      id: 'subscription',
      name: 'Subscription',
      description: 'Monthly/yearly recurring payments',
      icon: Zap,
      recommended: false
    },
    {
      id: 'tiered',
      name: 'Tiered System',
      description: 'Multiple levels from free to premium',
      icon: Shield,
      recommended: false
    }
  ]

  const governanceModels = [
    {
      id: 'democratic',
      name: 'Democratic',
      description: 'All members vote on decisions'
    },
    {
      id: 'council',
      name: 'Council',
      description: 'Elected council makes decisions'
    },
    {
      id: 'founder',
      name: 'Founder-led',
      description: 'Founder maintains control'
    }
  ]

  const availableResources = [
    'GitHub Organization',
    'AWS Credits',
    'Design Tools (Figma Pro)',
    'Analytics Tools',
    'Communication Tools',
    'Learning Platforms',
    'Trading Tools',
    'Development Environments'
  ]

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    // TODO: Implement club creation logic
    console.log('Creating club:', clubData)
    alert('Club creation will be implemented in Phase 2A!')
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
              <p className="text-gray-400">Tell us about your club and what you're building together.</p>
            </div>

            {/* Club Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Club Name *
              </label>
              <input
                type="text"
                value={clubData.name}
                onChange={(e) => setClubData({ ...clubData, name: e.target.value })}
                placeholder="e.g., DevDAO, Trading Elite, Creative Collective"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={clubData.description}
                onChange={(e) => setClubData({ ...clubData, description: e.target.value })}
                placeholder="What is your club about? What will you build together?"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Category *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        clubData.category === category.id
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => setClubData({ ...clubData, category: category.id })}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="h-6 w-6 text-orange-500" />
                        <h3 className="font-semibold text-white">{category.name}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Economic Model</h2>
              <p className="text-gray-400">Choose how members contribute to your club treasury.</p>
            </div>

            {/* Economic Model Selection */}
            <div className="space-y-4">
              {economicModels.map((model) => {
                const Icon = model.icon
                return (
                  <div
                    key={model.id}
                    className={`p-6 border rounded-lg cursor-pointer transition-colors ${
                      clubData.economicModel === model.id
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => setClubData({ ...clubData, economicModel: model.id })}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Icon className="h-8 w-8 text-orange-500" />
                        <div>
                          <h3 className="font-semibold text-white flex items-center space-x-2">
                            <span>{model.name}</span>
                            {model.recommended && (
                              <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                                Recommended
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-400">{model.description}</p>
                        </div>
                      </div>
                      {clubData.economicModel === model.id && (
                        <Check className="h-6 w-6 text-orange-500" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Entry Fee */}
            {clubData.economicModel === 'fixed' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Entry Fee (USDC)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={clubData.entryFee}
                    onChange={(e) => setClubData({ ...clubData, entryFee: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Recommended: $500-1000 for serious builders
                </p>
              </div>
            )}

            {/* Token Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Club Token Name
              </label>
              <input
                type="text"
                value={clubData.tokenName}
                onChange={(e) => setClubData({ ...clubData, tokenName: e.target.value })}
                placeholder="e.g., DEVDAO, TRADE, CREATE"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-400 mt-2">
                This will be your non-tradeable club token symbol
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Governance & Settings</h2>
              <p className="text-gray-400">Configure how your club will be managed and operate.</p>
            </div>

            {/* Governance Model */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Governance Model
              </label>
              <div className="space-y-3">
                {governanceModels.map((model) => (
                  <div
                    key={model.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      clubData.governanceModel === model.id
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => setClubData({ ...clubData, governanceModel: model.id })}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{model.name}</h3>
                        <p className="text-sm text-gray-400">{model.description}</p>
                      </div>
                      {clubData.governanceModel === model.id && (
                        <Check className="h-6 w-6 text-orange-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Max Members */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Maximum Members
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={clubData.maxMembers}
                  onChange={(e) => setClubData({ ...clubData, maxMembers: parseInt(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div>
                  <h3 className="font-medium text-white">Private Club</h3>
                  <p className="text-sm text-gray-400">Club won't appear in public discovery</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clubData.isPrivate}
                    onChange={(e) => setClubData({ ...clubData, isPrivate: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div>
                  <h3 className="font-medium text-white">Require Approval</h3>
                  <p className="text-sm text-gray-400">Manually approve new members</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clubData.requireApproval}
                    onChange={(e) => setClubData({ ...clubData, requireApproval: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Resources & Launch</h2>
              <p className="text-gray-400">Select shared resources and review your club setup.</p>
            </div>

            {/* Available Resources */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Shared Resources (Optional)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableResources.map((resource) => (
                  <div
                    key={resource}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      clubData.resources.includes(resource)
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => {
                      const newResources = clubData.resources.includes(resource)
                        ? clubData.resources.filter(r => r !== resource)
                        : [...clubData.resources, resource]
                      setClubData({ ...clubData, resources: newResources })
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{resource}</span>
                      {clubData.resources.includes(resource) && (
                        <Check className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Club Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{clubData.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{categories.find(c => c.id === clubData.category)?.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Economic Model:</span>
                  <span className="text-white">{economicModels.find(m => m.id === clubData.economicModel)?.name}</span>
                </div>
                {clubData.economicModel === 'fixed' && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entry Fee:</span>
                    <span className="text-white">${clubData.entryFee} USDC</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Members:</span>
                  <span className="text-white">{clubData.maxMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Resources:</span>
                  <span className="text-white">{clubData.resources.length} selected</span>
                </div>
              </div>
            </div>

            {/* Creation Cost */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Coins className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-white">Creation Cost</h3>
                  <p className="text-sm text-gray-300">1,000 $BUIDL tokens required to create club</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AppLayout pageTitle="Create Club">
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">Create Your Club</h1>
            <span className="text-gray-400">Step {step} of 4</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              step === 1
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {step < 4 ? (
            <button
              onClick={nextStep}
              disabled={
                (step === 1 && (!clubData.name || !clubData.description || !clubData.category)) ||
                (step === 2 && clubData.economicModel === 'fixed' && !clubData.entryFee)
              }
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!clubData.name || !clubData.description || !clubData.category}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors"
            >
              <Building2 className="h-4 w-4" />
              <span>Create Club</span>
            </button>
          )}
        </div>
      </div>
    </AppLayout>
  )
}