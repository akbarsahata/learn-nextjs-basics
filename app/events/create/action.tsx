
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/data/db";
import { eventsRepository } from "@/lib/data/repositories";

export const saveEvent = async (formData: FormData) => {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const dateString = formData.get("date") as string;

    // Validate required fields
    if (!name?.trim() || !description?.trim() || !dateString) {
      throw new Error("All fields are required");
    }

    // Validate date format
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date format");
    }

    // Convert date to ISO format for database
    const date = dateObj.toISOString();

    // Create event data
    const eventData = {
      name: name.trim(),
      description: description.trim(),
      date,
    };

    // Save to database
    await eventsRepository.create(db, eventData);

    // Revalidate the events page cache
    revalidatePath("/events");
    
    // Redirect to events list page
    redirect("/events");
  } catch (error) {
    console.error("Error saving event:", error);
    // In a real application, you might want to handle errors more gracefully
    // For now, we'll re-throw to let Next.js handle it
    throw error;
  }
};