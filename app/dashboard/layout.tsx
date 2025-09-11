'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { authClient } from '@/lib/auth-client'
import { ChevronDownIcon, ClockIcon, HomeIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/">
            <Image 
              src="/images/cnc-logo-dark.png" 
              alt="Calla & Copper" 
              width={100} 
              height={100}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 z-99">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className={`flex items-center px-2 py-2 rounded-sm transition-colors font-medium ${
                pathname === '/dashboard' 
                  ? 'text-black/80 bg-gray-100' 
                  : 'text-black/40 hover:bg-gray-50'
              }`}
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            
            <Link
              href="/dashboard/history"
              className={`flex items-center px-2 py-2 rounded-sm transition-colors font-medium ${
                pathname === '/dashboard/history' 
                  ? 'text-black/80 bg-gray-100' 
                  : 'text-black/40 hover:bg-gray-100'
              }`}
            >
              <ClockIcon className="w-5 h-5 mr-3" />
              History
            </Link>
          </nav>
        </div>

        {/* Create New Design Button */}
        <div className="p-4">
          <Link
            href="/welcome"
            className="flex items-center justify-start px-1 hover:bg-brand-gold/1x0 px-4 py-2 rounded-sm" 
          >
            <PlusIcon className="w-6 h-6 mr-2 bg-brand-gold p-1 rounded-full text-white" />
            <span className="text-base font-medium text-brand-gold">Create new design</span>
          </Link>
        </div>

        {/* User Email Dropdown */}
        <div className="p-6 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">{session?.user?.email || 'user@example.com'}</span>
              <ChevronDownIcon 
                className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}