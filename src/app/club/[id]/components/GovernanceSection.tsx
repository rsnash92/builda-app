'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Shield, Vote, Clock, CheckCircle, XCircle } from 'lucide-react'

interface GovernanceSectionProps {
  club: ClubWithMembers
}

export function GovernanceSection({ club }: GovernanceSectionProps) {
  // Mock data for recent decisions
  const recentDecisions = [
    {
      id: 1,
      title: "Increase Development Budget",
      description: "Proposal to allocate additional $10,000 for development tools and resources",
      status: "passed",
      votes: { for: 15, against: 3 },
      endDate: "2024-01-20"
    },
    {
      id: 2,
      title: "New Member Onboarding Process",
      description: "Implement structured onboarding for new club members",
      status: "active",
      votes: { for: 8, against: 2 },
      endDate: "2024-01-25"
    },
    {
      id: 3,
      title: "Partnership with TechCorp",
      description: "Form strategic partnership with TechCorp for joint projects",
      status: "rejected",
      votes: { for: 5, against: 12 },
      endDate: "2024-01-18"
    }
  ]

  // Mock data for active proposals
  const activeProposals = [
    {
      id: 4,
      title: "Treasury Investment Strategy",
      description: "Diversify treasury holdings across different asset classes",
      proposer: "Alice Johnson",
      votes: { for: 12, against: 4 },
      endDate: "2024-01-30"
    },
    {
      id: 5,
      title: "Club Event Planning",
      description: "Organize monthly virtual meetups for members",
      proposer: "Bob Smith",
      votes: { for: 18, against: 1 },
      endDate: "2024-02-01"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'active':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-500'
      case 'rejected':
        return 'text-red-500'
      case 'active':
        return 'text-yellow-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold text-white">Governance</h2>
      </div>
      
      {/* Active Proposals */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Active Proposals</h3>
        <div className="space-y-4">
          {activeProposals.map((proposal) => (
            <div key={proposal.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold">{proposal.title}</h4>
                  <p className="text-gray-400 text-sm">{proposal.description}</p>
                  <p className="text-gray-500 text-xs mt-1">Proposed by {proposal.proposer}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-yellow-500 text-sm">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 text-sm">{proposal.votes.for} for</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-red-500 text-sm">{proposal.votes.against} against</span>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">
                  Ends: {new Date(proposal.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Decisions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Decisions</h3>
        <div className="space-y-3">
          {recentDecisions.map((decision) => (
            <div key={decision.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">{decision.title}</h4>
                  <p className="text-gray-400 text-sm">{decision.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(decision.status)}
                  <span className={`text-sm ${getStatusColor(decision.status)}`}>
                    {decision.status.charAt(0).toUpperCase() + decision.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">{decision.votes.for} for</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">{decision.votes.against} against</span>
                  </div>
                </div>
                <div className="text-gray-400">
                  {new Date(decision.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <Vote className="h-4 w-4" />
          <span>Create Proposal</span>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>View All</span>
        </button>
      </div>
    </div>
  )
}
