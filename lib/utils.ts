import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFileName(file: File) {
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
