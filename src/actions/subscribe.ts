"use server";

import { Resend } from 'resend';
import { WelcomeEmail } from '~/components/emails/templates/welcome-email';
import { createClient } from "~/utils/supabase/server";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Check if email already exists
    const { data: existingSubscription, error: checkError } = await supabase
      .from("subscribe")
      .select("id")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error("Check error:", checkError);
      return { 
        success: false, 
        message: "Error checking subscription status." 
      };
    }

    if (existingSubscription) {
      return { 
        success: false, 
        message: "This email is already subscribed to our newsletter." 
      };
    }

    // Get user_id if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    // Insert new subscription
    const { error: subscribeError } = await supabase
      .from("subscribe")
      .insert([
        {
          email,
          user_id: user?.id ?? null,
        }
      ]);

    if (subscribeError) {
      console.error("Subscription error:", subscribeError);
      return { 
        success: false, 
        message: "Failed to subscribe. Please try again." 
      };
    }

    // Send welcome email after successful subscription
    try {

      
      const emailResponse = await resend.emails.send({
        from: 'breathebetter@hyperbarichq.com', // Replace with your verified domain
        to: email,
        subject: 'Welcome to HQ Insider!',
        react: WelcomeEmail({ email }),
      });
      

      
    } catch (emailError) {
      // Detailed error logging
      console.error('Resend Error Details:', {
        error: emailError
      });
      
      return { 
        success: true, 
        message: "Successfully subscribed! (Welcome email delivery delayed)" 
      };
    }

    return { 
      success: true, 
      message: "Successfully subscribed! Please check your email for confirmation." 
    };

  } catch (error) {
    console.error("Subscription error:", error);
    return { 
      success: false, 
      message: "An error occurred. Please try again later." 
    };
  }
}
