"use server";

import { supabase } from "@/lib/supabase";

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

function generateFileName(file: File) {
  const timestamp = new Date().getTime();
  const fileExtension = file.name.split(".").pop();
  if (!fileExtension) {
    throw new Error("File does not have an extension");
  }
  // Generate a unique file name using timestamp and original file name
  let fileName = Buffer.from(file.name).toString("base64");
  if (fileName.length > 50) {
    fileName = fileName.slice(0, 50);
  }
  fileName = fileName.replace(/[^a-zA-Z0-9]/g, "-");
  if (fileName.length > 50) {
    fileName = fileName.slice(0, 50);
  }
  fileName = `${fileName}-${timestamp}.${fileExtension}`;

  return `${timestamp}-${fileName}`;
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
