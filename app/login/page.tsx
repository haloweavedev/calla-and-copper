import Link from 'next/link'
import { login, signup } from './actions'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full gap-12">
      <div className="w-96 p-8 space-y-6 bg-white flex items-center justify-center flex-col border border-gray-200 rounded-lg shadow-md relative overflow-hidden">
      <Link href="/" className=""> 
        <Image src="/images/cnc-logo-dark.png" alt="Calla & Copper" width={150} height={150} /> 
      </Link>
      
        <form className="space-y-6 w-full">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              formAction={login}
              className="w-full px-4 py-2 font-medium text-white bg-brand-forest rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="w-full px-4 py-2 font-medium text-brand-forest bg-white border border-brand-forest rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className='w-full flex items-center justify-center gap-4'>
          <hr className="w-full border-gray-200" />
          <span className="text-sm text-gray-500">Or</span>
          <hr className="w-full border-gray-200" />
        </div>
        <div className='w-full flex items-center justify-center gap-4'>
          <button className='w-full px-4 py-2 font-medium text-black border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2'>
            <Image src="/images/google.png" alt="Google" width={20} height={20} />
            <span>Log in with Google</span>
          </button>
        </div>
      </div>
      {/* <div className='rounded-lg w-1/2'>
        <Image src="/images/products/vintage-console.png" alt="Calla & Copper" width={500} height={500} className='' />
      </div> */}

    </div>
  )
} 