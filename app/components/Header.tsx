'use client'

import Link from 'next/link'
import { logout } from './actions'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from '@/lib/auth-client'
import type { User } from '@/lib/auth'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, isPending } = useSession()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  if (isPending) {
    return (
      <nav className="px-4 sm:px-8 py-4 flex justify-between items-center w-full">
        <div className="w-12 h-12 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
      </nav>
    )
  }

  return (
    <nav className="px-4 sm:px-8 py-4 flex justify-between items-center w-full relative">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-gray-800" onClick={closeMenu}>
        <Image src="/images/cnc-logo-dark.png" alt="Calla & Copper" width={100} height={100} />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/#how-it-works" className="text-md text-gray-600 px-4 hover:text-gray-800 transition-colors">
          How it works
        </Link>
        <Link href="/#faq" className="text-md text-gray-600 px-4 hover:text-gray-800 transition-colors">
          FAQ
        </Link>
        {session ? (
          <Link
            href="/dashboard"
            className="px-4 py-2 text-md font-medium text-white bg-brand-gold rounded-full hover:bg-brand-dark-brown transition-colors"
          >
            Dashboard
          </Link>
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
            
            {session ? (
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/dashboard"
                  className="block w-full px-4 py-2 text-center text-md font-medium text-white bg-brand-gold rounded-full hover:bg-brand-dark-brown transition-colors"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
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