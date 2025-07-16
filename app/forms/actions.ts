"use server";

import { supabase } from "@/lib/supabase";
import { generateFileName } from "@/lib/utils";

export async function handleFormSubmission(formData: FormData) {
  const exampleInput = formData.get("example");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate processing the form data
  console.log("Form submitted with input:", exampleInput);
}

export async function actionWithAdditionalArgument(
  userId: string,
  userCode: string,
  formData: FormData
) {
  const exampleInput = formData.get("example");

  // Simulate processing the form data with additional arguments
  console.log("User ID:", userId);
  console.log("User Code:", userCode);
  console.log("Form submitted with input:", exampleInput);
}

export async function actionWithSimulatedDelay(
  initialState: {
    example: string;
    message?: string;
  },
  formData: FormData
) {
  const exampleInput = formData.get("example");

  // Simulate a delay to mimic server processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Form submitted with input after delay:", exampleInput);

  return {
    ...initialState,
    example: exampleInput as string,
    message: "Form processed successfully!",
  };
}

export async function actionWithFileUpload(
  initialState: {
    message: {
      error: string;
      success: string;
    };
    url?: string;
  },
  formData: FormData
) {
  const file = formData.get("file") as File;

  const fileName = generateFileName(file);

  if (file) {
    console.log("File uploaded:", file.name);
    // Here you can add logic to handle the file upload, e.g., saving it to a server or cloud storage
    const { data, error } = await supabase.storage
      .from("learn-nextjs-basics")
      .upload(`uploads/${fileName}`, file);

    const { data: urlData } = supabase.storage
      .from("learn-nextjs-basics")
      .getPublicUrl(`uploads/${fileName}`);

    if (error) {
      console.error("Error uploading file:", error.message);
      return {
        ...initialState,
        message: { error: "File upload failed.", success: "" },
      };
    } else {
      console.log("File uploaded successfully:", data);
      return {
        ...initialState,
        message: { success: "File uploaded successfully!", error: "" },
        url: urlData.publicUrl,
      };
    }
  } else {
    console.error("No file uploaded.");

    return {
      ...initialState,
      message: { error: "No file uploaded.", success: "" },
    };
  }
}
