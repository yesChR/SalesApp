import { createBrowserClient } from "@supabase/ssr";

// Cliente para componentes 'use client' (corre en el navegador).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
