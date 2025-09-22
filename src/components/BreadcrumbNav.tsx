'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbNavProps {
  username?: string
  clubName?: string
  clubId?: string
  userAvatar?: string
}

export function BreadcrumbNav({ username, clubName, clubId, userAvatar }: BreadcrumbNavProps) {
  if (!username) return null

  return (
    <div className="flex items-center space-x-2 text-gray-300">
      {/* User Avatar and Name */}
      <div className="flex items-center space-x-2">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={username}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">{username[0].toUpperCase()}</span>
          </div>
        )}
        <Link
          href="/dashboard"
          className="text-white hover:text-orange-400 transition-colors font-medium"
        >
          {username}
        </Link>
      </div>

      {/* Separator and Club */}
      {clubName && clubId && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <Link
            href={`/club/${clubId}`}
            className="text-white hover:text-orange-400 transition-colors font-medium"
          >
            {clubName}
          </Link>
        </>
      )}
    </div>
  )
}