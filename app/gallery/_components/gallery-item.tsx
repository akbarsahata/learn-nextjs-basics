"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import Image from "next/image";
import { Suspense, useState } from "react";

// Placeholder component for loading/fallback
function LoadingOrFallback() {
  return (
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
  );
}

interface GalleryItemProps {
  pictureUrl: string;
  description: string;
  updatedDate: Date;
}

export default function GalleryItem(props: GalleryItemProps) {
  const { pictureUrl, description, updatedDate } = props;

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className="border-2 border-gray-300 rounded-lg">
      <div className="p-4 space-y-3">
        <div
          onClick={() => setOpenDialog(true)}
          className="w-full h-80 bg-gray-200 rounded-sm flex items-center justify-center overflow-hidden hover:opacity-85 transition-opacity duration-300 hover:cursor-pointer"
        >
          <Suspense fallback={<LoadingOrFallback />}>
            <Image
              src={pictureUrl}
              alt={description}
              height={320}
              width={320}
              className="object-cover w-full h-80 rounded-sm"
              loading="lazy"
            />
          </Suspense>
        </div>

        <div className="space-y-1">
          <h3 className="text-gray-700 font-medium text-base">{description}</h3>
          <p>{format(updatedDate, "EEEE, d MMMM yyyy")}</p>
        </div>
      </div>
      <DialogDemo
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        pictureUrl={pictureUrl}
        description={description}
      />
    </div>
  );
}

interface DialogDemoProps {
  open: boolean;
  onClose: () => void;
  pictureUrl: string;
  description: string;
}

export function DialogDemo(props: DialogDemoProps) {
  const { open, onClose, pictureUrl, description } = props;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{description}</DialogTitle>
          </DialogHeader>
          <Suspense fallback={<LoadingOrFallback />}>
            <Image
              src={pictureUrl}
              alt={description}
              height={800}
              width={800}
              unoptimized
              loading="lazy"
            />
          </Suspense>
        </DialogContent>
      </form>
    </Dialog>
  );
}
