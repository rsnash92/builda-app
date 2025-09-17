'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Package, Plus, Download, Share2, Trash2, Edit } from 'lucide-react'

interface ResourcesSectionProps {
  club: ClubWithMembers
}

export function ResourcesSection({ club }: ResourcesSectionProps) {
  // Mock data for shared resources
  const sharedResources = [
    {
      id: 1,
      name: 'Design System',
      description: 'Complete design system with components, colors, and typography',
      type: 'Design',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      downloads: 45,
      icon: '🎨'
    },
    {
      id: 2,
      name: 'API Documentation',
      description: 'Comprehensive API documentation for club services',
      type: 'Documentation',
      size: '1.8 MB',
      uploadDate: '2024-01-12',
      downloads: 32,
      icon: '📚'
    },
    {
      id: 3,
      name: 'Smart Contracts',
      description: 'Deployed smart contracts for governance and token management',
      type: 'Code',
      size: '5.2 MB',
      uploadDate: '2024-01-10',
      downloads: 28,
      icon: '⚡'
    },
    {
      id: 4,
      name: 'Brand Assets',
      description: 'Logo files, brand guidelines, and marketing materials',
      type: 'Assets',
      size: '12.3 MB',
      uploadDate: '2024-01-08',
      downloads: 67,
      icon: '🖼️'
    }
  ]

  // Mock data for tools and services
  const toolsAndServices = [
    {
      id: 1,
      name: 'GitHub Repository',
      description: 'Main code repository for club projects',
      status: 'active',
      cost: 0,
      seats: { used: 12, total: 15 },
      icon: '🐙'
    },
    {
      id: 2,
      name: 'Figma Workspace',
      description: 'Design collaboration and prototyping',
      status: 'active',
      cost: 15,
      seats: { used: 8, total: 10 },
      icon: '🎨'
    },
    {
      id: 3,
      name: 'Vercel Pro',
      description: 'Hosting and deployment platform',
      status: 'active',
      cost: 20,
      seats: { used: 5, total: 5 },
      icon: '▲'
    },
    {
      id: 4,
      name: 'Notion Workspace',
      description: 'Documentation and project management',
      status: 'active',
      cost: 8,
      seats: { used: 15, total: 20 },
      icon: '📝'
    }
  ]

  return (
    <div className="h-full bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Resources & Vault</h1>
          <p className="text-gray-400">Shared tools, assets, and resources for the club</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-lg transition-colors flex items-center space-x-3">
            <Plus className="h-6 w-6" />
            <span className="text-lg font-semibold">Upload Resource</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors flex items-center space-x-3">
            <Package className="h-6 w-6" />
            <span className="text-lg font-semibold">Add Tool</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg transition-colors flex items-center space-x-3">
            <Share2 className="h-6 w-6" />
            <span className="text-lg font-semibold">Share Access</span>
          </button>
        </div>

        {/* Shared Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Shared Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedResources.map((resource) => (
              <div key={resource.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{resource.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold">{resource.name}</h3>
                      <p className="text-gray-400 text-sm">{resource.type}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Services */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Tools & Services</h2>
          <div className="space-y-4">
            {toolsAndServices.map((tool) => (
              <div key={tool.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{tool.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold">{tool.name}</h3>
                      <p className="text-gray-400 text-sm">{tool.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-white font-semibold">${tool.cost}/month</div>
                      <div className="text-gray-400 text-sm">Cost</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {tool.seats.used}/{tool.seats.total}
                      </div>
                      <div className="text-gray-400 text-sm">Seats</div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold ${
                        tool.status === 'active' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {tool.status}
                      </div>
                      <div className="text-gray-400 text-sm">Status</div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
