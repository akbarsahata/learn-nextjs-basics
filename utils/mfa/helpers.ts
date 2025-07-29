import { createClient } from '@/utils/supabase/server'

export async function getMFAStatus() {
  const supabase = await createClient()
  
  try {
    // Get user's assurance level
    const { data: assuranceData, error: assuranceError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (assuranceError) throw assuranceError

    // Get user's MFA factors
    const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors()
    if (factorsError) throw factorsError

    const hasMFAEnabled = [...factorsData.totp, ...factorsData.phone].some(
      factor => factor.status === 'verified'
    )

    return {
      currentLevel: assuranceData.currentLevel,
      nextLevel: assuranceData.nextLevel,
      hasMFAEnabled,
      needsMFAChallenge: assuranceData.nextLevel === 'aal2' && assuranceData.currentLevel === 'aal1',
      factors: factorsData
    }
  } catch (error) {
    console.error('Error getting MFA status:', error)
    return {
      currentLevel: 'aal1',
      nextLevel: 'aal1',
      hasMFAEnabled: false,
      needsMFAChallenge: false,
      factors: { totp: [], phone: [] }
    }
  }
}

export function createDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
