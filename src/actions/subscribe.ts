"use server";

import { createClient } from "~/utils/supabase/server";
import { cookies } from "next/headers";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export type SubscriptionState = {
  success: boolean;
  message: string;
} | null;

export async function subscribeToNewsletter(
  prevState: SubscriptionState,
  formData: FormData,
) {
  const cookieStore = cookies();
  const supabase = await createClient();

  try {
    const email = formData.get("email")?.toString();

    if (!email) {
      return { success: false, message: "Email is required." };
    }

    if (!isValidEmail(email)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    // Check if email already exists in subscribe table
    const { data: existingSubscription } = await supabase
      .from("subscribe")
      .select("*")
      .eq("email", email)
      .single();

    if (existingSubscription) {
      return { 
        success: false, 
        message: "This email is already subscribed to our newsletter." 
      };
    }

    // Get user ID if the email exists in auth.users
    const { data: userData } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    // Insert into subscribe table
    const { error: subscribeError } = await supabase
      .from("subscribe")
      .insert([
        {
          email: email,
          user_id: userData?.id || null, // Will be null if user doesn't exist
        },
      ]);

    if (subscribeError) {
      console.error("Subscription error:", subscribeError);
      return { 
        success: false, 
        message: "Failed to subscribe. Please try again." 
      };
    }

    return { 
      success: true, 
      message: "Successfully subscribed to our newsletter!" 
    };

  } catch (error) {
    console.error("Subscription error:", error);
    return { 
      success: false, 
      message: "An error occurred. Please try again later." 
    };
  }
}
