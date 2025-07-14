"use client";

export default function UploadPictureForm() {
  return (
    <div className="border-2 border-gray-300 rounded-lg">
      <div className="p-4 space-y-4">
        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-md py-3 font-medium transition-colors">
          Choose Picture
        </button>

        <textarea
          placeholder="Meaningful description..."
          className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />

        <div className="flex justify-end">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
