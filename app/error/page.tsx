export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Authentication Error</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, there was an error with your authentication request.
        </p>
        <a
          href="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}
