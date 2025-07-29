import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect specific routes that require authentication
  const protectedRoutes = ['/private', '/mfa']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (
    !user &&
    isProtectedRoute &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Check if user needs MFA challenge (only for users who have MFA enabled)
  if (user && isProtectedRoute && !request.nextUrl.pathname.startsWith('/mfa/challenge')) {
    try {
      // Get user's assurance level
      const { data: assuranceData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      
      // Get user's factors to check if they have MFA enabled
      const { data: factorsData } = await supabase.auth.mfa.listFactors()
      const hasMFAEnabled = [...(factorsData?.totp || []), ...(factorsData?.phone || [])].some(
        factor => factor.status === 'verified'
      )

      // Only redirect to MFA challenge if user has MFA enabled and needs to verify
      if (hasMFAEnabled && assuranceData?.nextLevel === 'aal2' && assuranceData?.currentLevel === 'aal1') {
        const url = request.nextUrl.clone()
        url.pathname = '/mfa/challenge'
        return NextResponse.redirect(url)
      }
    } catch (error) {
      // If there's an error checking MFA status, continue normally
      console.error('Error checking MFA status in middleware:', error)
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object instead of the supabaseResponse object

  return supabaseResponse
}
