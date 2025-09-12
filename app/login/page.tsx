import Link from 'next/link'
import Image from 'next/image'
import { LoginForm } from './components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full gap-12">
      <div className="w-96 p-8 space-y-6 bg-white flex items-center justify-center flex-col border border-gray-200 rounded-lg shadow-md relative overflow-hidden">
        <Link href="/" className=""> 
          <Image src="/images/cnc-logo-dark.png" alt="Calla & Copper" width={150} height={150} /> 
        </Link>
        
        <LoginForm />
        
        <div className="w-full flex items-center justify-center gap-4 text-sm text-gray-600">
          <span>Don&apos;t have an account?</span>
          <Link href="/register" className="text-brand-dark-brown hover:text-brand-gold font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
} 