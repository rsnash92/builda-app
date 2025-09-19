'use client'

import React from 'react'
import { AppLayout } from '../../components/AppLayout'
import { DashboardLayout } from '../../components/DashboardLayout'
import { LeftSidebar } from '../../components/LeftSidebar'
import { RightContent } from '../../components/RightContent'
import { useSupabase } from '../../contexts/SupabaseContext'

export default function DashboardPage() {
  const { profile } = useSupabase()

  // Mock user data - in a real app this would come from the database
  const userData = {
    name: profile?.display_name || 'Jenny Klabber',
    avatar: profile?.avatar_url || undefined,
    location: 'SF, Bay Area',
    email: profile?.email || 'jenny@kteam.com',
    verified: true,
    company: 'KeenThemes'
  }

  return (
    <AppLayout pageTitle="Metronic Team">
      <DashboardLayout
        user={userData}
        leftSidebar={<LeftSidebar />}
        rightContent={<RightContent />}
      >
        {/* Main Content Area - this matches the center content from the screenshot */}
        <div className="space-y-6">
          {/* Default section from breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <span>Public Profile</span>
            <span>›</span>
            <span>Profiles</span>
            <span>›</span>
            <span className="text-white">Default</span>
            <div className="ml-auto">
              <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2">
                <span>Connect</span>
              </button>
            </div>
          </div>

          {/* Empty state for now - this would be populated with actual profile/project content */}
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Profile Content</h3>
              <p className="text-gray-400">This area would contain profile projects, activities, and other content.</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}