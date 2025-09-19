'use client'

import React from 'react'
import { Badge, MapPin, Mail, CheckCircle } from 'lucide-react'

interface ProfileSectionProps {
  user?: {
    name?: string
    avatar?: string
    location?: string
    email?: string
    verified?: boolean
    company?: string
  }
}

export function ProfileSection({ user }: ProfileSectionProps) {
  const defaultUser = {
    name: 'Jenny Klabber',
    avatar: '/images/avatars/default-avatar.jpg',
    location: 'SF, Bay Area',
    email: 'jenny@kteam.com',
    verified: true,
    company: 'KeenThemes'
  }

  const profile = user || defaultUser

  return (
    <div className="relative">
      {/* Profile Header */}
      <div className="text-center py-12">
        {/* Avatar */}
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-1">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {profile.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
          </div>
          {profile.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" fill="currentColor" />
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-white mb-2">
          {profile.name}
        </h1>

        {/* Info */}
        <div className="flex items-center justify-center space-x-6 text-gray-400 text-sm">
          {profile.company && (
            <div className="flex items-center space-x-1">
              <Badge className="w-4 h-4" />
              <span>{profile.company}</span>
            </div>
          )}
          {profile.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'profiles', label: 'Profiles', active: true },
            { id: 'projects', label: 'Projects' },
            { id: 'works', label: 'Works' },
            { id: 'teams', label: 'Teams' },
            { id: 'network', label: 'Network' },
            { id: 'activity', label: 'Activity' },
            { id: 'more', label: 'More' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                tab.active
                  ? 'text-primary-500 border-primary-500'
                  : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}