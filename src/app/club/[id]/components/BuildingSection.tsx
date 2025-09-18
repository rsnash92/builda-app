'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Code, Package, TrendingUp, CheckCircle } from 'lucide-react'

interface BuildingSectionProps {
  club: ClubWithMembers
}

export function BuildingSection({ club }: BuildingSectionProps) {
  const currentProjects = [
    {
      id: 1,
      name: 'Web3 Platform',
      description: 'Building a decentralized platform for builders',
      progress: 75,
      contributors: 12,
      value: 50000,
      status: 'In Progress',
      timeline: 'Shipping next month'
    },
    {
      id: 2,
      name: 'Trading Bot v2',
      description: 'Advanced trading bot with ML integration',
      progress: 90,
      contributors: 5,
      value: 30000,
      status: 'Shipping next week',
      timeline: 'Final testing phase'
    },
    {
      id: 3,
      name: 'Education Portal',
      description: 'Comprehensive learning platform for Web3',
      progress: 25,
      contributors: 8,
      value: 20000,
      status: 'Just started',
      timeline: 'Need developers!'
    }
  ]

  const shippedItems = [
    {
      id: 1,
      name: 'Builder Tools v1.0',
      description: 'Essential tools for web3 builders',
      value: 15000,
      shipped: '2024-01-15'
    },
    {
      id: 2,
      name: 'Community Dashboard',
      description: 'Dashboard for club management',
      value: 8000,
      shipped: '2024-01-10'
    }
  ]

  const totalValueCreated = shippedItems.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      {/* Current Projects */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Code className="h-5 w-5 mr-2 text-orange-500" />
          What We're Building
        </h3>
        
        <div className="space-y-4">
          {currentProjects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{project.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="text-orange-400 font-medium">{project.status}</span>
                    <span className="text-gray-500">{project.timeline}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-orange-500 font-semibold">${project.value.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">{project.contributors} contributors</p>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipped Items */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Package className="h-5 w-5 mr-2 text-green-500" />
          Recently Shipped
        </h3>
        
        <div className="space-y-3">
          {shippedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                  <p className="text-gray-500 text-xs">Shipped {new Date(item.shipped).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-500 font-semibold">${item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Value Created */}
      <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg p-6 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Total Value Created</h3>
            <p className="text-gray-400">Combined value of all shipped projects</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-500">${totalValueCreated.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">+12.5% this month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
