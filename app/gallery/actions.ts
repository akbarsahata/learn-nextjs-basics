"use server";

import { db } from "@/lib/data/db";
import { galleriesRepository } from "@/lib/data/repositories";
import { supabase } from "@/lib/supabase";
import { generateFileName } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { initialState } from '../forms/csr-forms';
import { GalleryUploadActionState } from "./_components/upload-picture-form";

// Mock action function - replace with your actual server action
export async function uploadPictureAction(
  prevState: GalleryUploadActionState,
  formData: FormData
): Promise<GalleryUploadActionState> {
  const file = formData.get("picture") as File;
  const description = formData.get("description") as string;

  if (!file || file.size === 0) {
    return { error: "Please select a picture", success: false };
  }

  if (!description.trim()) {
    return { error: "Please provide a description", success: false };
  }

  const fileName = generateFileName(file);

  const { error } = await supabase.storage
    .from("learn-nextjs-basics")
    .upload(`uploads/${fileName}`, file);

  if (error) {
    console.error("Error uploading file:", error.message);
    return {
      ...initialState,
      success: false,
      error: `File upload failed: ${error.message}`,
    };
  }

  const { data: urlData } = supabase.storage
    .from("learn-nextjs-basics")
    .getPublicUrl(`uploads/${fileName}`);

  await galleriesRepository.create(db, {
    imageUrl: urlData.publicUrl,
    description,
  });

  revalidatePath("/gallery");

  return {
    ...initialState,
    success: true,
    message: "File uploaded successfully!",
    data: { fileName: file.name, description },
  };
}

export async function deletePictureAction(
  prevState: { success: boolean; message: string },
  data: FormData
): Promise<{ success: boolean; message: string }> {
  const pictureUrl = data.get("pictureUrl") as string;
  if (!pictureUrl) {
    return { success: false, message: "Picture URL is required." };
  }

  const [folder, fileName] = pictureUrl.split("/").slice(-2);

  const { error } = await supabase.storage
    .from("learn-nextjs-basics")
    .remove([`${folder}/${fileName}`]);

  if (error) {
    console.error("Error deleting file:", error.message);
    return {
      success: false,
      message: `File deletion failed: ${error.message}`,
    };
  }

  const galleryItem = await galleriesRepository.getByImageUrl(db, pictureUrl);
  if (!galleryItem) {
    return { success: false, message: "Gallery item not found." };
  }

  await galleriesRepository.delete(db, galleryItem.id);

  revalidatePath("/gallery");

  return { success: true, message: "File deleted successfully!" };
}
