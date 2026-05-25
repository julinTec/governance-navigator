// Lazy-load the generated Lovable Cloud client only in the browser.
// The generated client touches localStorage at module initialization, which can
// crash production SSR/prerender and leave the published app as a blank screen.
export async function getSupabase() {
  if (typeof window === 'undefined') {
    throw new Error('Cliente do backend indisponível durante a renderização do servidor')
  }

  const { supabase } = await import('@/integrations/supabase/client')
  return supabase
}
