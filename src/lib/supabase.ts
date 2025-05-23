import { Database } from "@/types/database.types"; // Tipos de la base de datos de Supabase / Supabase database types
import AsyncStorage from "@react-native-async-storage/async-storage"; // Almacenamiento local para sesiones / Local storage for sessions
import { createClient } from "@supabase/supabase-js"; // Cliente de Supabase / Supabase client
import "react-native-url-polyfill/auto"; // Polyfill para URLs en React Native / URL polyfill for React Native

// URL y clave anónima de Supabase desde variables de entorno / Supabase URL and anon key from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Instancia del cliente de Supabase configurada para React Native / Supabase client instance configured for React Native
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Usa AsyncStorage para guardar la sesión / Use AsyncStorage to store session
    autoRefreshToken: true, // Refresca el token automáticamente / Automatically refresh token
    persistSession: true, // Persiste la sesión entre reinicios / Persist session across reloads
    detectSessionInUrl: false, // No detecta sesión en la URL (no web) / Do not detect session in URL (not web)
  },
});
