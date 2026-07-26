import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { triggerN8nWebhook } from "./webhookService";

export interface ContactInquiryInput {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
}

export interface ServiceResult {
  success: boolean;
  message: string;
  id?: string;
}

export async function submitContactInquiry(input: ContactInquiryInput): Promise<ServiceResult> {
  if (!input.name.trim()) {
    return { success: false, message: "Please enter your full name." };
  }
  if (!input.email.trim() || !input.email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (!input.message.trim()) {
    return { success: false, message: "Please provide your message." };
  }

  const payload = {
    full_name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    organization: input.organization?.trim() || null,
    message: input.message.trim(),
    status: "new",
    automation_status: "pending",
  };

  if (!isSupabaseConfigured) {
    await triggerN8nWebhook({
      event_type: "contact.created",
      data: payload,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: `Thank you, ${input.name}. Your inquiry has been securely received by SAFAL AI. Our team will contact you shortly.`,
    };
  }

  try {
    const { data, error } = await supabase
      .from("contact_inquiries")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("[Supabase Error] contact_inquiries insert:", error);
      return {
        success: false,
        message: "Could not save inquiry to database. Please try again.",
      };
    }

    triggerN8nWebhook({
      event_type: "contact.created",
      record_id: data.id,
      data,
      timestamp: new Date().toISOString(),
    }).catch((err) => console.error("[n8n Trigger Error]:", err));

    return {
      success: true,
      id: data.id,
      message: `Thank you, ${input.name}. Your message has been saved into our system. Our response coordinators will contact you shortly.`,
    };
  } catch (err: any) {
    console.error("[Service Error] submitContactInquiry:", err);
    return {
      success: false,
      message: err.message || "An unexpected error occurred while sending your message.",
    };
  }
}
