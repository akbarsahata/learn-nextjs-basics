'use client'

import { useState } from 'react'
import { enrollMFA, verifyMFAEnrollment } from '../actions'
import { createDataUrl } from '@/utils/mfa/helpers'

interface EnrollMFAProps {
  onEnrolled: () => void
  onCancelled: () => void
}

export function EnrollMFA({ onEnrolled, onCancelled }: EnrollMFAProps) {
  const [factorId, setFactorId] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)

  const handleStartEnrollment = async () => {
    setError('')
    setIsEnrolling(true)
    setLoading(true)

    try {
      const result = await enrollMFA()
      
      if (result.success) {
        setFactorId(result.factorId!)
        setQrCode(createDataUrl(result.qrCode!))
        setSecret(result.secret!)
      } else {
        setError(result.error || 'Failed to start MFA enrollment')
      }
    } catch {
      setError('Failed to start MFA enrollment')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!verifyCode.trim()) {
      setError('Please enter the verification code')
      return
    }

    setError('')
    setLoading(true)

    try {
      const result = await verifyMFAEnrollment(factorId, verifyCode)
      
      if (result.success) {
        onEnrolled()
      } else {
        setError(result.error || 'Failed to verify MFA code')
      }
    } catch {
      setError('Failed to verify MFA code')
    } finally {
      setLoading(false)
    }
  }

  if (!isEnrolling) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Enable Two-Factor Authentication</h3>
        <p className="text-gray-600">
          Add an extra layer of security to your account by enabling 2FA with an authenticator app.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStartEnrollment}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Setting up...' : 'Set up 2FA'}
          </button>
          <button
            onClick={onCancelled}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Set up Two-Factor Authentication</h3>
      
      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Step 1:</strong> Install an authenticator app on your phone (like Google Authenticator, Authy, or 1Password).</p>
        <p><strong>Step 2:</strong> Scan the QR code below or manually enter the secret key.</p>
        <p><strong>Step 3:</strong> Enter the 6-digit code from your authenticator app.</p>
      </div>

      {qrCode && (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCode} alt="QR Code for 2FA setup" className="border rounded-lg" />
          </div>
          
          <div className="text-sm">
            <p className="font-medium">Can&apos;t scan the QR code?</p>
            <p className="text-gray-600">Manual entry key:</p>
            <div className="bg-gray-100 p-2 rounded font-mono text-xs break-all">
              {secret}
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value.trim())}
              placeholder="Enter 6-digit code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-mono"
              maxLength={6}
            />
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleVerifyCode}
                disabled={loading || !verifyCode.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Enable 2FA'}
              </button>
              <button
                onClick={onCancelled}
                disabled={loading}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
