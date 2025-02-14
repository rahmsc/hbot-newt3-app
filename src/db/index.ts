import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL ?? '', { 
  prepare: false // Important for Supabase's "Transaction" pool mode
})

export const db = drizzle(client, { schema }) 