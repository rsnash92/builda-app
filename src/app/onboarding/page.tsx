'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Building2,
  Users,
  Coins,
  Zap,
  Target,
  Code,
  Palette,
  BookOpen,
  Gamepad2,
  TrendingUp,
  Globe,
  Wallet,
  Mail,
  User,
  MapPin,
  Briefcase,
  Star,
  Gift,
  ChevronRight
} from 'lucide-react'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [experience, setExperience] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    location: '',
    website: '',
    skills: [] as string[]
  })

  const totalSteps = 6

  const userTypes = [
    {
      id: 'builder',
      title: 'Builder & Creator',
      description: 'I want to build projects and create value with others',
      icon: Code,
      benefits: ['Earn $BUIDL for contributions', 'Join exclusive builder communities', 'Access to premium tools']
    },
    {
      id: 'investor',
      title: 'Investor & Supporter',
      description: 'I want to invest in communities and support builders',
      icon: TrendingUp,
      benefits: ['Early access to promising clubs', 'Governance voting rights', 'Treasury growth participation']
    },
    {
      id: 'learner',
      title: 'Learner & Explorer',
      description: 'I want to learn new skills and explore Web3',
      icon: BookOpen,
      benefits: ['Access learning communities', 'Mentorship opportunities', 'Skill-building rewards']
    },
    {
      id: 'leader',
      title: 'Community Leader',
      description: 'I want to start and lead my own community club',
      icon: Users,
      benefits: ['Club creation tools', 'Leadership support', 'Community growth resources']
    }
  ]

  const interestOptions = [
    { id: 'development', label: 'Software Development', icon: Code },
    { id: 'trading', label: 'Trading & DeFi', icon: TrendingUp },
    { id: 'design', label: 'Design & Creative', icon: Palette },
    { id: 'education', label: 'Learning & Teaching', icon: BookOpen },
    { id: 'gaming', label: 'Gaming & Esports', icon: Gamepad2 },
    { id: 'business', label: 'Business & Entrepreneurship', icon: Briefcase },
    { id: 'community', label: 'Community Building', icon: Users },
    { id: 'content', label: 'Content Creation', icon: Star }
  ]

  const experienceOptions = [
    { id: 'beginner', label: 'New to Web3', description: 'Just getting started with crypto and blockchain' },
    { id: 'intermediate', label: 'Some Experience', description: 'Familiar with basic concepts, want to learn more' },
    { id: 'advanced', label: 'Web3 Native', description: 'Deep experience with DeFi, DAOs, and building' },
    { id: 'expert', label: 'Builder/Expert', description: 'Building in Web3, contributing to ecosystem' }
  ]

  const goalOptions = [
    { id: 'earn', label: 'Earn $BUIDL tokens', icon: Coins },
    { id: 'network', label: 'Build my network', icon: Users },
    { id: 'skills', label: 'Learn new skills', icon: BookOpen },
    { id: 'create', label: 'Create something valuable', icon: Building2 },
    { id: 'invest', label: 'Grow my investments', icon: TrendingUp },
    { id: 'community', label: 'Find my community', icon: Globe }
  ]

  const skillOptions = [
    'JavaScript', 'Python', 'Solidity', 'React', 'Node.js', 'Blockchain',
    'Smart Contracts', 'DeFi', 'UI/UX Design', 'Product Management',
    'Marketing', 'Community Management', 'Trading', 'Data Analysis'
  ]

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleInterestToggle = (interestId: string) => {
    setInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleGoalToggle = (goalId: string) => {
    setGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleSkillToggle = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const completeOnboarding = () => {
    // TODO: Save onboarding data and redirect to dashboard
    console.log('Onboarding completed:', {
      userType,
      interests,
      experience,
      goals,
      profile
    })
    alert('Onboarding will be implemented in Phase 2A!')
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <Sparkles className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to builda.club!</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Let's get you set up so you can start building, earning, and owning your piece of the future.
                This will take just a few minutes.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-6 border border-orange-500/30 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">What you'll get:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-300">Earn $BUIDL tokens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Join builder clubs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-300">Own what you build</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">What brings you here?</h2>
              <p className="text-gray-400">
                Choose the option that best describes your goals. This helps us personalize your experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div
                    key={type.id}
                    className={`p-6 border rounded-lg cursor-pointer transition-all ${
                      userType === type.id
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => setUserType(type.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <Icon className="h-8 w-8 text-orange-500 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{type.description}</p>
                        <ul className="space-y-1">
                          {type.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {userType === type.id && (
                        <Check className="h-6 w-6 text-orange-500" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">What are you interested in?</h2>
              <p className="text-gray-400">
                Select all that apply. We'll suggest relevant clubs and opportunities.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interestOptions.map((interest) => {
                const Icon = interest.icon
                return (
                  <div
                    key={interest.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all text-center ${
                      interests.includes(interest.id)
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => handleInterestToggle(interest.id)}
                  >
                    <Icon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <h3 className="text-sm font-medium text-white">{interest.label}</h3>
                    {interests.includes(interest.id) && (
                      <Check className="h-4 w-4 text-orange-500 mx-auto mt-2" />
                    )}
                  </div>
                )
              })}
            </div>

            <p className="text-center text-sm text-gray-500">
              Selected {interests.length} interests
            </p>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">What's your Web3 experience?</h2>
              <p className="text-gray-400">
                This helps us recommend the right clubs and learning paths for you.
              </p>
            </div>

            <div className="space-y-4">
              {experienceOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    experience === option.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                  onClick={() => setExperience(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{option.label}</h3>
                      <p className="text-gray-400 text-sm">{option.description}</p>
                    </div>
                    {experience === option.id && (
                      <Check className="h-6 w-6 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">What are your goals?</h2>
              <p className="text-gray-400">
                Select what you hope to achieve on builda.club.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalOptions.map((goal) => {
                const Icon = goal.icon
                return (
                  <div
                    key={goal.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      goals.includes(goal.id)
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-orange-500" />
                      <span className="text-white font-medium">{goal.label}</span>
                      {goals.includes(goal.id) && (
                        <Check className="h-5 w-5 text-orange-500 ml-auto" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Complete your profile</h2>
              <p className="text-gray-400">
                Help others discover what you bring to the community.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder="How should we call you?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about yourself and what you're building..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Location & Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website/Portfolio
                  </label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Skills & Expertise
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        profile.skills.includes(skill)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected {profile.skills.length} skills
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return true
      case 2: return userType !== ''
      case 3: return interests.length > 0
      case 4: return experience !== ''
      case 5: return goals.length > 0
      case 6: return profile.displayName !== ''
      default: return false
    }
  }

  return (
    <AppLayout pageTitle="Welcome">
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Getting Started</h1>
            <span className="text-gray-400">Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8 min-h-[500px]">
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

          {step < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={completeOnboarding}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors"
            >
              <Gift className="h-4 w-4" />
              <span>Complete Setup</span>
            </button>
          )}
        </div>

        {/* Final Step Bonus */}
        {step === totalSteps && (
          <div className="mt-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-6 border border-green-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <Gift className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Welcome Bonus!</h3>
            </div>
            <p className="text-green-200 text-sm">
              Complete your setup to receive 1,000 $BUIDL tokens and access to our exclusive onboarding club!
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}