"use server";

import { Resend } from "resend";
import { createClient } from "~/utils/supabase/server";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
) {
  const cookieStore = cookies();
  const supabase = await createClient();

  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return { success: false, message: "All fields are required." };
    }

    if (!isValidEmail(email)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    // Insert contact request into database
    const { error: contactError } = await supabase
      .from("contact_requests")
      .insert([
        {
          name,
          email,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (contactError) {
      console.error("Contact submission error:", contactError);
      return {
        success: false,
        message: "Failed to submit contact form. Please try again.",
      };
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: "breathebetter@hyperbarichq.com",
        to: "breathebetter@hyperbarichq.com",
        subject: `New Contact Form Submission from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Message: ${message}
        `,
      });

      // Send confirmation email to the user
      await resend.emails.send({
        from: "breathebetter@hyperbarichq.com",
        to: email,
        subject: "We received your message - HBOT HQ",
        text: `
Hello ${name},

Thank you for contacting HBOT HQ. We've received your message and will get back to you shortly.

Your message:
${message}

Best regards,
HBOT HQ Team
        `,
      });
    } catch (emailError) {
      console.error("Resend Error Details:", {
        error: emailError,
      });

      // Still return success even if email sending fails
      return {
        success: true,
        message:
          "Your message has been submitted! Our team will contact you soon.",
      };
    }

    return {
      success: true,
      message:
        "Your message has been submitted! Our team will contact you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
