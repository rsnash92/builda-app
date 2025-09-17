'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Building2, Package, TrendingUp, Calendar } from 'lucide-react'

interface BuildingSectionProps {
  club: ClubWithMembers
}

export function BuildingSection({ club }: BuildingSectionProps) {
  // Mock data for current projects
  const currentProjects = [
    {
      id: 1,
      name: "Decentralized Voting System",
      description: "Building a transparent governance mechanism for club decisions",
      progress: 75,
      value: 50000,
      deadline: "2024-02-15"
    },
    {
      id: 2,
      name: "NFT Marketplace Integration",
      description: "Creating a marketplace for club-created digital assets",
      progress: 45,
      value: 30000,
      deadline: "2024-03-01"
    }
  ]

  // Mock data for shipped items
  const shippedItems = [
    {
      id: 1,
      name: "Club Website",
      description: "Modern, responsive website for the club",
      value: 15000,
      shippedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Token Contract",
      description: "Smart contract for club governance tokens",
      value: 25000,
      shippedDate: "2024-01-20"
    }
  ]

  const totalValueCreated = shippedItems.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center space-x-2 mb-6">
        <Building2 className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold text-white">What We're Building</h2>
      </div>
      
      {/* Current Projects */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Current Projects</h3>
        <div className="space-y-4">
          {currentProjects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">{project.name}</h4>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">${project.value.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Value</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Shipped Items */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recently Shipped</h3>
        <div className="space-y-3">
          {shippedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-white font-medium">{item.name}</div>
                  <div className="text-gray-400 text-sm">{item.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">${item.value.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">
                  {new Date(item.shippedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Total Value Created */}
      <div className="mt-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <span className="text-white font-semibold">Total Value Created</span>
          </div>
          <div className="text-2xl font-bold text-orange-500">
            ${totalValueCreated.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}
