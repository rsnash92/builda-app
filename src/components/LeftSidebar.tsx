'use client'

import React from 'react'
import { Clock, Code, Palette, Video } from 'lucide-react'

export function LeftSidebar() {
  const badges = [
    { icon: Clock, color: 'bg-blue-600' },
    { icon: Code, color: 'bg-orange-600' },
    { icon: Palette, color: 'bg-green-600' },
    { icon: Video, color: 'bg-purple-600' }
  ]

  const userInfo = {
    age: 32,
    city: 'Amsterdam',
    state: 'North Holland',
    country: 'Netherlands',
    postcode: '1092 NL',
    phone: '+31 6 1234 56 78',
    email: 'jenny@ktstudio.com'
  }

  return (
    <div className="space-y-6">
      {/* Community Badges */}
      <div className="bg-dark-900 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Community Badges</h3>
        <div className="flex space-x-3">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div
                key={index}
                className={`w-12 h-12 ${badge.color} rounded-lg flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            )
          })}
        </div>
      </div>

      {/* About */}
      <div className="bg-dark-900 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">About</h3>
        <div className="space-y-3 text-sm">
          {Object.entries(userInfo).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span className="text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-dark-900 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Work Experience</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">KT</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Senior Designer</h4>
              <p className="text-gray-400 text-sm">KeenThemes</p>
              <p className="text-gray-500 text-xs">2019 - Present</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}