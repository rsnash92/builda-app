'use client'

import React from 'react'
import { MoreHorizontal, TrendingUp, BarChart3 } from 'lucide-react'

export function RightContent() {
  return (
    <div className="space-y-6">
      {/* Blog Partnership Card */}
      <div className="bg-dark-900 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full transform translate-x-8 -translate-y-8"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Unlock Creative</h3>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <h4 className="text-white font-bold text-lg mb-3">Partnerships on Our Blog</h4>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Explore exciting collaboration opportunities with our blog. We're open to partnerships, guest posts, and more. Join us to share your insights and grow your audience.
          </p>
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors">
            Get Started
          </button>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30">
          <img
            src="/images/illustrations/collaboration.svg"
            alt="Collaboration"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      </div>

      {/* Media Uploads Chart */}
      <div className="bg-dark-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Media Uploads</h3>
          <button className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Chart Area */}
        <div className="relative h-48 mb-4">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4A90E2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,150 C50,120 100,100 150,80 C200,60 250,70 300,50 C350,40 400,45 400,45 L400,200 L0,200 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M0,150 C50,120 100,100 150,80 C200,60 250,70 300,50 C350,40 400,45 400,45"
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
            />
            <circle cx="150" cy="80" r="4" fill="#4A90E2" />
            <circle cx="150" cy="80" r="8" fill="#4A90E2" fillOpacity="0.3" />
          </svg>

          {/* Hover indicator */}
          <div className="absolute top-12 left-36 bg-dark-800 rounded-lg p-3 border border-gray-700">
            <div className="text-white text-sm font-medium">Mar, 2024 Sales</div>
            <div className="text-primary-500 text-xl font-bold">$65,000.00</div>
            <div className="text-green-400 text-xs flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +24%
            </div>
          </div>
        </div>

        {/* Chart Labels */}
        <div className="flex justify-between text-xs text-gray-400 mb-4">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>

        {/* Chart Values */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>$0K</span>
          <span>$20K</span>
          <span>$40K</span>
          <span>$60K</span>
          <span>$80K</span>
          <span>$100K</span>
        </div>
      </div>
    </div>
  )
}