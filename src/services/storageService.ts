import { supabase, isSupabaseConfigured } from "../lib/supabase";

export interface UploadResult {
  success: boolean;
  publicUrl?: string;
  path?: string;
  error?: string;
}

/**
 * Upload a document or image file to a Supabase Storage bucket.
 * Bucket defaults to 'documents' or 'certificates'.
 */
export async function uploadFileToSupabase(
  file: File,
  bucketName = "documents",
  customFolder = "submissions"
): Promise<UploadResult> {
  if (!isSupabaseConfigured) {
    console.warn("[Supabase Storage] Unconfigured. Simulating file upload URL.");
    return {
      success: true,
      publicUrl: `https://placeholder-storage.supabase.co/${bucketName}/${file.name}`,
      path: `${customFolder}/${file.name}`,
    };
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${customFolder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("[Supabase Storage Error]:", uploadError);
      return { success: false, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return {
      success: true,
      path: filePath,
      publicUrl: publicUrlData.publicUrl,
    };
  } catch (err: any) {
    console.error("[Storage Service Error]:", err);
    return { success: false, error: err.message || "File upload failed." };
  }
}
