import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { triggerN8nWebhook } from "./webhookService";

export interface ConsultationBookingInput {
  name: string;
  email: string;
  phone: string;
  organization: string;
  sector: string;
  message?: string;
}

export interface ServiceResult {
  success: boolean;
  message: string;
  id?: string;
}

export async function submitConsultationBooking(input: ConsultationBookingInput): Promise<ServiceResult> {
  // Input Validation
  if (!input.name.trim()) {
    return { success: false, message: "Please provide your full name." };
  }
  if (!input.email.trim() || !input.email.includes("@")) {
    return { success: false, message: "Please provide a valid email address." };
  }
  if (!input.organization.trim()) {
    return { success: false, message: "Please specify your organization name." };
  }

  const payload = {
    full_name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim() || null,
    organization: input.organization.trim(),
    sector: input.sector || "Education",
    message: input.message?.trim() || null,
    status: "pending",
    automation_status: "pending",
  };

  if (!isSupabaseConfigured) {
    // Fallback simulation mode
    await triggerN8nWebhook({
      event_type: "consultation.created",
      data: payload,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: `Namaste, ${input.name}! Your consultation request regarding '${input.sector}' for ${input.organization} has been registered. Our AI Innovation team will respond within 24 business hours.`,
    };
  }

  try {
    const { data, error } = await supabase
      .from("consultation_bookings")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("[Supabase Error] consultation_bookings insert:", error);
      return {
        success: false,
        message: "Failed to store booking in database. Please check connection and try again.",
      };
    }

    // Trigger n8n Automation Webhook
    triggerN8nWebhook({
      event_type: "consultation.created",
      record_id: data.id,
      data,
      timestamp: new Date().toISOString(),
    }).catch((err) => console.error("[n8n Trigger Error]:", err));

    return {
      success: true,
      id: data.id,
      message: `Namaste, ${input.name}! Your consultation request regarding '${input.sector}' for ${input.organization} has been securely saved to our database. Our team will contact you shortly.`,
    };
  } catch (err: any) {
    console.error("[Service Error] submitConsultationBooking:", err);
    return {
      success: false,
      message: err.message || "An unexpected network error occurred while submitting your consultation.",
    };
  }
}
