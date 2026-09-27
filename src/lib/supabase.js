import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://isqksdpjunlydpnadlud.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcWtzZHBqdW5seWRwbmFkbHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyNDExNDYsImV4cCI6MjEwNDgxNzE0Nn0.r7hIOx7lHYDDxfJED4HY_p2T8bUuzpWy1TKVLoLOUSY'

async function fetchConTiempo(url, options = {}) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 22000)
  try {
    return await fetch(url, { ...options, signal: options.signal || ctrl.signal })
  } finally {
    clearTimeout(t)
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: fetchConTiempo }
})
