import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { UpgradeForm } from './components/UpgradeForm'

export default async function UpgradePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (!user.is_anonymous) {
    redirect('/private')
  }

  // Get user's current data
  const cart = user.user_metadata?.cart || []
  const notes = user.user_metadata?.notes || []

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🔐 Upgrade Your Account
            </h1>
            <p className="text-gray-600">
              Convert your anonymous session to a permanent account to keep your data safe.
            </p>
          </div>

          {/* Current Data Summary */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Your Current Data</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">Cart Items:</span>
                <span className="ml-2 text-blue-700">{cart.length} items</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Notes:</span>
                <span className="ml-2 text-blue-700">{notes.length} notes</span>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-3">
              ✨ This data will be preserved when you upgrade your account
            </p>
          </div>

          <UpgradeForm />

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">What happens when you upgrade?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Your cart and notes will be permanently saved</li>
              <li>✅ You can access your data from any device</li>
              <li>✅ Your data won&apos;t expire or get lost</li>
              <li>✅ You can enable two-factor authentication</li>
              <li>✅ Full access to all premium features</li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/anonymous-demo"
              className="text-gray-600 hover:text-gray-500 text-sm"
            >
              ← Back to Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
