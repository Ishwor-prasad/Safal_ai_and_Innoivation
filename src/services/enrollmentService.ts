import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { triggerN8nWebhook } from "./webhookService";

export interface CourseEnrollmentInput {
  name: string;
  email: string;
  phone?: string;
  courseId: string;
  courseTitle: string;
  selectedBatchId?: string;
  preferredSchedule?: string;
}

export interface ServiceResult {
  success: boolean;
  message: string;
  id?: string;
}

export async function submitCourseEnrollment(input: CourseEnrollmentInput): Promise<ServiceResult> {
  if (!input.name.trim()) {
    return { success: false, message: "Full name is required." };
  }
  if (!input.email.trim() || !input.email.includes("@")) {
    return { success: false, message: "Valid email is required." };
  }

  const payload = {
    full_name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    course_id: input.courseId,
    course_title: input.courseTitle,
    selected_batch_id: input.selectedBatchId || null,
    preferred_schedule: input.preferredSchedule || null,
    status: "enrolled",
    automation_status: "pending",
  };

  if (!isSupabaseConfigured) {
    await triggerN8nWebhook({
      event_type: "enrollment.created",
      data: payload,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: `Congratulations ${input.name}! You are registered for '${input.courseTitle}'. Intake details will be sent to ${input.email}.`,
    };
  }

  try {
    const { data, error } = await supabase
      .from("course_enrollments")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("[Supabase Error] course_enrollments insert:", error);
      return {
        success: false,
        message: "Failed to record enrollment. Please try again.",
      };
    }

    triggerN8nWebhook({
      event_type: "enrollment.created",
      record_id: data.id,
      data,
      timestamp: new Date().toISOString(),
    }).catch((err) => console.error("[n8n Trigger Error]:", err));

    return {
      success: true,
      id: data.id,
      message: `Congratulations ${input.name}! Your seat for '${input.courseTitle}' has been recorded. Confirmation will be sent to ${input.email}.`,
    };
  } catch (err: any) {
    console.error("[Service Error] submitCourseEnrollment:", err);
    return {
      success: false,
      message: err.message || "An unexpected error occurred during course registration.",
    };
  }
}
