'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowLeftStartOnRectangleIcon, ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useSession } from '@/lib/auth-client'

export function Header() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, isPending } = useSession()
  const pathname = usePathname()

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
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
    <nav className="px-4 sm:px-8 py-4 flex justify-between items-center w-full relative shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-gray-800" onClick={closeMenu}>
        <Image src="/images/cnc-logo-dark.png" alt="Calla & Copper" width={80} height={80} />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        {pathname === '/' && (
          <>
            <Link href="/#how-it-works" className="text-md text-gray-600 px-4 hover:text-gray-800 transition-colors">
              How it works
            </Link>
            <Link href="/#faq" className="text-md text-gray-600 px-4 hover:text-gray-800 transition-colors">
              FAQ
            </Link>
          </>
        )}
        {isPending ? (
          <div className="flex items-center gap-2">
            {pathname === '/' && (
              <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
            )}
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        ) : session ? (
          <>
            <Link
              href="/dashboard"
              className="text-md font-medium text-black/80 hover:text-black/60 transition-colors mx-4 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-150 transition-colors"
            >
              Dashboard
            </Link>
            <div className="relative">
              <UserCircleIcon 
                onClick={toggleUserDropdown}
                className="w-6 h-6 text-black/80 cursor-pointer hover:text-black/60 transition-colors" 
              />
             {/* Dropdown Menu */}
             {isUserDropdownOpen && (
               <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                 <button
                   onClick={handleLogout}
                   className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
                 >
                   <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2 text-red-500/80" />
                   Logout
                 </button>
               </div>
             )}
            </div>
          </>
          

        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-md font-medium text-black hover:text-gray-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-md font-medium text-white bg-brand-gold rounded-full hover:bg-brand-dark-brown transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-40" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Close button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={closeMenu}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu items */}
          <div className="flex flex-col space-y-4">
            {pathname === '/' && (
              <>
                <Link
                  href="/#how-it-works"
                  className="text-lg text-gray-800 hover:text-[#2D5016] transition-colors py-2"
                  onClick={closeMenu}
                >
                  How it works
                </Link>
                <Link
                  href="/#faq"
                  className="text-lg text-gray-800 hover:text-[#2D5016] transition-colors py-2"
                  onClick={closeMenu}
                >
                  FAQ
                </Link>
              </>
            )}
            
            {isPending ? (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="w-full h-10 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="w-full h-10 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            ) : session ? (

              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/dashboard"
                  className="block w-full px-4 py-2 text-center text-md font-medium text-white bg-brand-gold rounded-full hover:bg-brand-dark-brown transition-colors"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <div className="mt-4 py-4 border-t border-gray-200">
              <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center justify-between w-full p-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="truncate font-semibold text-black/60">{session?.user?.email || 'user@example.com'}</span>
                    <ChevronDownIcon 
                      className={`w-4 h-4 ml-2 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                      onClick={handleLogout}
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
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2 text-center text-md font-medium text-black hover:text-gray-700 transition-colors"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full px-4 py-2 text-center text-md font-medium text-white bg-brand-gold rounded-full hover:bg-brand-dark-brown transition-colors"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 