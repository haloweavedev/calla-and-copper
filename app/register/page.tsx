import Link from 'next/link'
import Image from 'next/image'
import { RegisterForm } from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full gap-12">
      <div className="w-96 p-8 space-y-6 bg-white flex items-center justify-center flex-col border border-gray-200 rounded-lg shadow-md relative overflow-hidden">
        <Link href="/" className=""> 
          <Image src="/images/cnc-logo-dark.png" alt="Calla & Copper" width={150} height={150} /> 
        </Link>
        
        <RegisterForm />
        
        <div className="w-full flex items-center justify-center gap-4 text-sm text-gray-600">
          <span>Already have an account?</span>
          <Link href="/login" className="text-brand-dark-brown hover:text-brand-gold font-medium">
            Sign in
          </Link>
        </div>
        
        <div className='w-full flex items-center justify-center gap-4'>
          <hr className="w-full border-gray-200" />
          <span className="text-sm text-gray-500">Or</span>
          <hr className="w-full border-gray-200" />
        </div>
        <div className='w-full flex items-center justify-center gap-4'>
          <button className='w-full px-4 py-2 font-medium text-black border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold flex items-center justify-center gap-2 cursor-pointer'>
            <Image src="/images/google.png" alt="Google" width={20} height={20} />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}