'use client'

import React, { ReactNode } from 'react'
import { ProfileSection } from './ProfileSection'

interface DashboardLayoutProps {
  children: ReactNode
  leftSidebar?: ReactNode
  rightContent?: ReactNode
  user?: {
    name?: string
    avatar?: string
    location?: string
    email?: string
    verified?: boolean
    company?: string
  }
}

export function DashboardLayout({ children, leftSidebar, rightContent, user }: DashboardLayoutProps) {
  return (
    <div className="h-full bg-dark-950">
      {/* Profile Header Section */}
      <ProfileSection user={user} />

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6">
        {/* Left Sidebar */}
        {leftSidebar && (
          <div className="col-span-3">
            {leftSidebar}
          </div>
        )}

        {/* Main Content */}
        <div className={`${leftSidebar && rightContent ? 'col-span-6' : leftSidebar || rightContent ? 'col-span-9' : 'col-span-12'}`}>
          {children}
        </div>

        {/* Right Content */}
        {rightContent && (
          <div className="col-span-3">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  )
}