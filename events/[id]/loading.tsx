export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Navigation Skeleton */}
        <div className="mb-6">
          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Event Details Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
          
          <div className="mb-6">
            <div className="h-6 w-48 bg-gray-300 rounded-full"></div>
          </div>

          <div>
            <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Event Metadata Skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-36 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="mt-6 flex gap-4">
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
