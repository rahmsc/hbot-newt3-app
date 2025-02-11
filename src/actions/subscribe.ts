"use server";

export type SubscriptionState = {
  success: boolean;
  message: string;
} | null;

export async function subscribeToNewsletter(
  prevState: SubscriptionState,
  formData: FormData,
) {
  try {
    const email = formData.get("email")?.toString();

    if (!email) {
      return { success: false, message: "Email is required." };
    }

    // Your subscription logic here
    console.log("Subscribing to newsletter, email:", email);
    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    return { success: false, message: "Failed to subscribe." };
  }
}
