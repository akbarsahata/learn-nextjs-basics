import { db } from "@/lib/data/db";
import { galleriesRepository } from "@/lib/data/repositories";
import { match } from "ts-pattern";
import GalleryItem from "./_components/gallery-item";
import UploadPictureForm from "./_components/upload-picture-form";
import { Toaster } from '@/components/ui/sonner';

export const dynamic = "force-dynamic";

export default async function Page() {
  const pictures = await galleriesRepository.getAll(db);

  return (
    <div className="max-w-md mx-auto space-y-6 p-4">
      <UploadPictureForm />
      {match(pictures)
        .with([], () => (
          <div className="text-center text-gray-500">
            No pictures found. Please upload a picture to get started.
          </div>
        ))
        .otherwise((pictures) =>
          pictures.map((picture) => (
            <GalleryItem
              key={`${process.env.SUPABASE_URL}${picture.imageUrl}`}
              pictureUrl={picture.imageUrl}
              description={picture.description!}
              updatedDate={new Date(picture.updatedAt!)}
            />
          ))
        )}
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
