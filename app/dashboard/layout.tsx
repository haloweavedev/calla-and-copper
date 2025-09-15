'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { authClient } from '@/lib/auth-client'
import { ChevronDownIcon, ClockIcon, HomeIcon, PlusIcon, CubeIcon, Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className="hidden lg:flex w-64 bg-white shadow-lg flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard">
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
            Home
          </Link>
          
          <Link
            href="/dashboard/products"
            className={`flex items-center px-2 py-2 rounded-sm transition-colors font-medium ${
              pathname === '/dashboard/products' 
                ? 'text-black/80 bg-gray-100' 
                : 'text-black/40 hover:bg-gray-50'
            }`}
          >
            <CubeIcon className="w-5 h-5 mr-3" />
            Products
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
  )

  // Mobile Top Navigation Component
  const MobileTopNav = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 py-2 px-4 z-50 shadow-lg bg-white border-b">
      <div className="flex flex-row justify-between items-center">
        {/* Logo */}
        <Link href="/dashboard">
          <Image 
            src="/images/cnc-logo-dark.png" 
            alt="Calla & Copper" 
            width={60} 
            height={60}
            className="mx-auto"
          />
        </Link>

        {/* Burger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2">
            {/* Navigation Links */}
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center px-3 py-2 rounded-md transition-colors font-medium ${
                  pathname === '/dashboard' 
                    ? 'text-black/80 bg-gray-100' 
                    : 'text-black/40 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                Home
              </Link>
              
              <Link
                href="/dashboard/products"
                className={`flex items-center px-3 py-2 rounded-md transition-colors font-medium ${
                  pathname === '/dashboard/products' 
                    ? 'text-black/80 bg-gray-100' 
                    : 'text-black/40 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CubeIcon className="w-5 h-5 mr-3" />
                Products
              </Link>
              
              <Link
                href="/dashboard/history"
                className={`flex items-center px-3 py-2 rounded-md transition-colors font-medium ${
                  pathname === '/dashboard/history' 
                    ? 'text-black/80 bg-gray-100' 
                    : 'text-black/40 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ClockIcon className="w-5 h-5 mr-3" />
                History
              </Link>
            </nav>

            {/* Create New Design Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/welcome"
                className="flex items-center px-3 py-2 rounded-md hover:bg-brand-gold/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PlusIcon className="w-5 h-5 mr-3 bg-brand-gold p-1 rounded-full text-white" />
                <span className="font-medium text-brand-gold">Create new design</span>
              </Link>
            </div>

            {/* User Info & Logout */}
            <div className="mt-4 py-4 border-t border-gray-200">
              <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full p-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="truncate font-semibold text-black/60">{session?.user?.email || 'user@example.com'}</span>
                    <ChevronDownIcon 
                      className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2 text-red-500/80" />
                      <span className='text-sm text-red-500/80 font-medium'>Logout</span>
                    </button>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  )
  // Mobile Bottom Navigation Component
  const MobileBottomNav = () => (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 py-2 px-4 z-99 shadow-sm bg-white border-t">
      <nav className="space-y-2 flex flex-row justify-between items-center">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center px-2 py-2 rounded-sm transition-colors font-medium ${
            pathname === '/dashboard' 
              ? 'text-black/80 bg-gray-100' 
              : 'text-black/40 hover:bg-gray-50'
          }`}
        >
          <HomeIcon className="w-8 h-8" />
          <span className='text-xs'>Home</span>
        </Link>
        
        <Link
          href="/dashboard/products"
          className={`flex flex-col items-center px-2 py-2 rounded-sm transition-colors font-medium ${
            pathname === '/dashboard/products' 
              ? 'text-black/80 bg-gray-100' 
              : 'text-black/40 hover:bg-gray-50'
          }`}
        >
          <CubeIcon className="w-8 h-8" />
          <span className='text-xs'>Products</span>
        </Link>
        
        <Link
          href="/dashboard/history"
          className={`flex flex-col items-center px-2 py-2 rounded-sm transition-colors font-medium ${
            pathname === '/dashboard/history' 
              ? 'text-black/80 bg-gray-100' 
              : 'text-black/40 hover:bg-gray-100'
          }`}
        >
          <ClockIcon className="w-8 h-8" />
          <span className='text-xs'>History</span>
        </Link>
      </nav>
    </div>
  )

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      {/* Mobile Top Navigation */}
      <MobileTopNav />
      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-16 pb-16 lg:pt-0 lg:pb-0">
        {children}
      </div>
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}