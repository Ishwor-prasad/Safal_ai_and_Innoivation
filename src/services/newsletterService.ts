import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { triggerN8nWebhook } from "./webhookService";

export interface NewsletterInput {
  email: string;
}

export interface ServiceResult {
  success: boolean;
  message: string;
  id?: string;
}

export async function subscribeNewsletter(input: NewsletterInput): Promise<ServiceResult> {
  if (!input.email.trim() || !input.email.includes("@")) {
    return { success: false, message: "Please provide a valid email address." };
  }

  const payload = {
    email: input.email.trim(),
    status: "subscribed",
  };

  if (!isSupabaseConfigured) {
    await triggerN8nWebhook({
      event_type: "newsletter.created",
      data: payload,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Thank you for subscribing to SAFAL AI Research & Innovation updates!",
    };
  }

  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return { success: true, message: "You are already subscribed to SAFAL AI updates!" };
      }
      console.error("[Supabase Error] newsletter_subscribers insert:", error);
      return { success: false, message: "Could not record subscription. Please try again." };
    }

    triggerN8nWebhook({
      event_type: "newsletter.created",
      record_id: data.id,
      data,
      timestamp: new Date().toISOString(),
    }).catch((err) => console.error("[n8n Trigger Error]:", err));

    return {
      success: true,
      id: data.id,
      message: "Thank you for subscribing to SAFAL AI updates!",
    };
  } catch (err: any) {
    console.error("[Service Error] subscribeNewsletter:", err);
    return {
      success: false,
      message: err.message || "An error occurred while subscribing.",
    };
  }
}
