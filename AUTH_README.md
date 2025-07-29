# Supabase Authentication Setup

This project has been configured with Supabase server-side authentication for Next.js.

## Features Implemented

- ✅ Server-side authentication with Supabase
- ✅ Middleware for session management
- ✅ Login/Signup pages
- ✅ Protected routes
- ✅ Email confirmation flow
- ✅ Logout functionality

## File Structure

```
utils/supabase/
├── client.ts          # Browser client for client components
├── server.ts          # Server client for server components
└── middleware.ts      # Session management utility

app/
├── login/
│   ├── page.tsx      # Login/signup form
│   └── actions.ts    # Server actions for auth
├── private/
│   ├── page.tsx      # Protected page example
│   └── actions.ts    # Logout action
├── auth/
│   ├── confirm/
│   │   └── route.ts  # Email confirmation handler
│   └── signout/
│       └── route.ts  # Logout route handler
└── error/
    └── page.tsx      # Error page for auth failures

middleware.ts          # Next.js middleware for route protection
```

## Environment Variables

The following environment variables are configured in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for admin operations)
- `DATABASE_CONNECTION_STRING` - Direct database connection

## Usage

### Testing Authentication

1. Visit the home page at `http://localhost:3000`
2. Click "Authentication (Login)" to access the login page
3. Try signing up with a new email and password
4. After successful signup, you'll be redirected to the private page
5. Test the logout functionality using the "Sign out" button

### Protected Routes

- `/private` - Requires authentication
- Add more protected routes by updating the `protectedRoutes` array in `utils/supabase/middleware.ts`

### Email Confirmation

If you have email confirmation enabled in Supabase:

1. Users will receive a confirmation email after signup
2. The email template should use: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
3. Update this in your Supabase dashboard under Auth > Templates

## Implementation Notes

- Uses `@supabase/ssr` for server-side rendering compatibility
- Middleware handles automatic token refresh
- Server Actions are used for form submissions
- Protected routes redirect to `/login` if user is not authenticated
- All server-side auth uses `supabase.auth.getUser()` for security

## Next Steps

You can now:
- Add more protected pages
- Implement user profiles
- Add social login providers
- Set up row-level security (RLS) in your database
- Add password reset functionality
