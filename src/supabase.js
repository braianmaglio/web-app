// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gwhnhettllgurfhvsjrp.supabase.co'
const supabaseKey = 'Fr@nchu1304'

export const supabase = createClient(supabaseUrl, supabaseKey)
