"use client";

import { LoaderPinwheel, XIcon } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { uploadPictureAction } from "../actions";

// Types for the action state
export type GalleryUploadActionState = {
  error?: string;
  success?: boolean;
  message?: string;
  data?: {
    fileName: string;
    description: string;
  };
} | null;

export const initialState: GalleryUploadActionState = {
  error: "",
  success: false,
  message: "",
  data: undefined,
};

export default function UploadPictureForm() {
  const [formState, formAction, isPending] = useActionState(
    uploadPictureAction,
    initialState
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showError, setShowError] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChoosePicture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Clean up previous URL to prevent memory leaks
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Reset error visibility when form state changes
  useEffect(() => {
    if (formState?.error) {
      setShowError(true);
    }
    if (formState?.success) {
      setShowMessage(true);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [formState]);

  const dismissError = () => {
    setShowError(false);
  };

  const dismissMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg">
      <div className="p-4 space-y-4">
        <form ref={formRef} action={formAction} className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            name="picture"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleChoosePicture}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-md py-3 font-medium transition-colors disabled:opacity-50"
            disabled={isPending}
          >
            {isPending
              ? "Uploading..."
              : selectedFile
              ? "Change Picture"
              : "Choose Picture"}
          </button>

          {/* Image Preview */}
          {previewUrl && (
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden relative">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized // Required for blob URLs
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <span className="truncate flex-1">{selectedFile?.name}</span>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="ml-2 text-red-600 hover:text-red-700 hover:cursor-pointer transition-colors"
                  disabled={isPending}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <textarea
            name="description"
            placeholder="Meaningful description..."
            className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent disabled:opacity-50"
            disabled={isPending}
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
              disabled={isPending}
            >
              {isPending && (
                <LoaderPinwheel
                  className="inline mr-2 animate-spin"
                  size={16}
                  strokeWidth={2}
                />
              )}
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </form>

        {/* Display feedback messages */}
        {formState?.error && showError && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md flex items-center justify-between">
            <span>{formState.error}</span>
            <XIcon
              className="inline ml-2 cursor-pointer hover:bg-red-100 hover:rounded-full p-1 transition-colors"
              size={20}
              onClick={dismissError}
            />
          </div>
        )}

        {formState?.success && showMessage && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md flex items-center justify-between">
            <span>{formState.message}</span>
            <XIcon
              className="inline ml-2 cursor-pointer hover:green-100 hover:rounded-full p-1 transition-colors"
              size={20}
              onClick={dismissMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
