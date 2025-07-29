import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from './actions'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to your private page!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Hello {data.user.email}
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            User ID: {data.user.id}
          </p>
          <p className="text-sm text-gray-500">
            Last sign in: {new Date(data.user.last_sign_in_at || '').toLocaleString()}
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
