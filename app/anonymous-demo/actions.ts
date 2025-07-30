"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface Note {
  id: number;
  content: string;
  timestamp: string;
}

export async function addToCart(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const item = {
    name: formData.get("item") as string,
    price: parseFloat(formData.get("price") as string),
    quantity: parseInt(formData.get("quantity") as string) || 1,
  };

  // Store in user metadata for demo purposes
  const existingMetadata = user.user_metadata || {};
  const cart: CartItem[] = existingMetadata.cart || [];

  // Check if item already exists
  const existingIndex = cart.findIndex(
    (cartItem: CartItem) => cartItem.name === item.name
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  const { error } = await supabase.auth.updateUser({
    data: { cart },
  });

  if (error) {
    throw new Error("Failed to add item to cart");
  }

  revalidatePath("/anonymous-demo");
}

export async function removeFromCart(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const itemName = formData.get("item") as string;
  const existingMetadata = user.user_metadata || {};
  const cart: CartItem[] = existingMetadata.cart || [];

  const updatedCart = cart.filter((item: CartItem) => item.name !== itemName);

  const { error } = await supabase.auth.updateUser({
    data: { cart: updatedCart },
  });

  if (error) {
    throw new Error("Failed to remove item from cart");
  }

  revalidatePath("/anonymous-demo");
}

export async function saveNote(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const note = formData.get("note") as string;
  const existingMetadata = user.user_metadata || {};
  const notes: Note[] = existingMetadata.notes || [];

  notes.push({
    id: Date.now(),
    content: note,
    timestamp: new Date().toISOString(),
  });

  const { error } = await supabase.auth.updateUser({
    data: { notes },
  });

  if (error) {
    throw new Error("Failed to save note");
  }

  revalidatePath("/anonymous-demo");
}

export async function clearData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.auth.updateUser({
    data: { cart: [], notes: [], preferences: {} },
  });

  if (error) {
    throw new Error("Failed to clear data");
  }

  revalidatePath("/anonymous-demo");
}
