import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function initializeSupabase() {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not configured. Running in mock mode.')
      return false
    }

    // Test connection
    const { error } = await supabase.auth.getSession()
    if (error) {
      console.warn('Supabase connection test failed:', error)
      return false
    }

    console.log('Supabase initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
    return false
  }
}
