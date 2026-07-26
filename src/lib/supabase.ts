import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[Supabase Integration] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. " +
    "Form submissions will fallback to simulated persistence mode. " +
    "Add these keys to your .env file to enable live database storage."
  );
}

// Export singleton Supabase client instance (or dummy instance if unconfigured)
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
