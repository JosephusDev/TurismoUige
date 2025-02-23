'use client'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseKey =
  (process.env.SUPABASE_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJia3pkeGNjcXhhc3FhcXJsaHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDMyNTUsImV4cCI6MjA1NTgxOTI1NX0.v1LJE2PDw7f32BjZY_TpmvwGR_dE8ZhYKwrpp1bdDko'
const supabaseUrl =
  (process.env.SUPABASE_URL as string) ||
  'https://rbkzdxccqxasqaqrlhum.supabase.co'

export const supabase = createClient(supabaseUrl, supabaseKey)
