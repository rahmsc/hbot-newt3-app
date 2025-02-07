"use server";

export async function subscribeToNewsletter(formData: FormData) {
  try {
    // Your subscription logic here
    console.log("Subscribing to newsletter, formData:", formData);
    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    return { success: false, message: "Failed to subscribe." };
  }
}
