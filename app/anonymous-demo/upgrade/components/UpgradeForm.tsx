'use client'

import { useState } from 'react'
import { upgradeToEmailPassword, linkExistingAccount } from '../actions'

export function UpgradeForm() {
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleUpgrade = async (formData: FormData) => {
    setLoading(true)
    setMessage(null)

    try {
      const result = await upgradeToEmailPassword(formData)
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to upgrade account' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLink = async (formData: FormData) => {
    setLoading(true)
    setMessage(null)

    try {
      const result = await linkExistingAccount(formData)
      
      if (!result.success) {
        setMessage({ type: 'error', text: result.message })
      }
      // If successful, the action handles redirect
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to link accounts' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-2 px-4 text-center font-medium text-sm border-b-2 ${
            activeTab === 'new'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Create New Account
        </button>
        <button
          onClick={() => setActiveTab('existing')}
          className={`flex-1 py-2 px-4 text-center font-medium text-sm border-b-2 ${
            activeTab === 'existing'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Link to Existing Account
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* New Account Form */}
      {activeTab === 'new' && (
        <form action={handleUpgrade} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
            <p className="text-xs text-gray-500 mt-1">
              We&apos;ll send you a verification email
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a secure password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Permanent Account'}
          </button>
        </form>
      )}

      {/* Existing Account Form */}
      {activeTab === 'existing' && (
        <div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-yellow-800 mb-2">Account Linking</h3>
            <p className="text-sm text-yellow-700">
              If you already have an account, sign in below. Your anonymous data (cart items and notes) 
              will be merged with your existing account.
            </p>
          </div>

          <form action={handleLink} className="space-y-4">
            <div>
              <label htmlFor="existing-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="existing-email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your existing email"
              />
            </div>

            <div>
              <label htmlFor="existing-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="existing-password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Linking Accounts...' : 'Link to Existing Account'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
