export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Events List Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
