"use server";

import { db } from "@/lib/data/db";
import { galleriesRepository } from "@/lib/data/repositories";
import { supabase } from "@/lib/supabase";
import { generateFileName } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { initialState } from "../forms/csr-forms";
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

  const { data, error } = await supabase.storage
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

  console.log("File uploaded successfully:", data);

  const { data: urlData } = supabase.storage
    .from("learn-nextjs-basics")
    .getPublicUrl(`uploads/${fileName}`);

  await galleriesRepository.create(db, {
    imageUrl: urlData.publicUrl,
    description,
  });

  console.log("Picture saved to database:", {
    imageUrl: urlData.publicUrl,
    description,
  });

  revalidatePath("/gallery");

  redirect("/gallery");
}
