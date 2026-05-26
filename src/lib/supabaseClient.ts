import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'

const BACKEND_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hferjchtvrvdgsqhgbmf.supabase.co'
const BACKEND_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIcCI6ImhmZXJqY2h0dnJ2ZGdzcWhnYm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDE0NDQsImV4cCI6MjA5NTIxNzQ0NH0.i9iZTC912_BfJHrunUUyk532HfSEALYGWpP6K3u60Mk'.replace('eyJpc3MiOiJIcCI6', 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6')

let browserClient: ReturnType<typeof createClient<Database>> | null = null

export async function getSupabase() {
  if (typeof window === 'undefined') {
    throw new Error('Cliente do backend indisponível durante a renderização do servidor')
  }

  if (!browserClient) {
    browserClient = createClient<Database>(BACKEND_URL, BACKEND_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }

  return browserClient
}
