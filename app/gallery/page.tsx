import UploadPictureForm from "./_components/upload-picture-form";

export default function Page() {
  return (
    <div className="max-w-md mx-auto space-y-6 p-4">
      <UploadPictureForm />
      <div className="border-2 border-gray-300 rounded-lg">
        <div className="p-4 space-y-3">
          {/* Image Placeholder */}
          <div className="w-full h-80 bg-gray-200 rounded-sm flex items-center justify-center">
            <div className="bg-gray-400 rounded-lg p-8 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-1">
            <h3 className="text-gray-700 font-medium text-base">
              Lorem ipsum dolor sit amet et delectus
            </h3>
            <p className="text-gray-500 text-sm italic">
              Monday, 1 January 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
