import { supabase } from "@/lib/supabase";
import { useConnection } from "@sendbird/uikit-react-native";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Tipo para el contexto de autenticación / Auth context type
type AuthContextType = {
  session: Session | null; // Sesión actual / Current session
  isLoading: boolean; // Estado de carga / Loading state
};

// Contexto de autenticación con valores por defecto / Auth context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
});

// Proveedor de autenticación que gestiona la sesión y el estado de carga / Auth provider managing session and loading state
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null); // Estado de la sesión / Session state
  const [isLoading, setIsLoading] = useState(true); // Estado de carga / Loading state
  const { disconnect } = useConnection(); // Función para desconectar Sendbird / Function to disconnect Sendbird

  useEffect(() => {
    // Obtiene la sesión actual al montar el componente / Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Escucha cambios en el estado de autenticación / Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        disconnect(); // Desconecta Sendbird si no hay sesión / Disconnect Sendbird if no session
      }
      setSession(session);
    });
  }, [disconnect]);

  return (
    // Proveedor del contexto de autenticación / Auth context provider
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto de autenticación / Hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
