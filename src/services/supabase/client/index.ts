'use client'
import { Database } from '@/services/supabase/types/db'
import { createClient } from '@supabase/supabase-js'

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJia3pkeGNjcXhhc3FhcXJsaHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDMyNTUsImV4cCI6MjA1NTgxOTI1NX0.v1LJE2PDw7f32BjZY_TpmvwGR_dE8ZhYKwrpp1bdDko'
const supabaseUrl = 'https://rbkzdxccqxasqaqrlhum.supabase.co'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
