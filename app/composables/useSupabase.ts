import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

let client: SupabaseClient | null = null

export const useSupabase = () => {
  if (!client) {
    const config = useRuntimeConfig()
    client = createClient(
      config.public.supabaseUrl as string,
      config.public.supabaseAnonKey as string
    )
  }
  return client as SupabaseClient
}