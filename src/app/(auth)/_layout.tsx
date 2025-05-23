import { useAuth } from "@/store/auth"; // Hook para autenticación / Auth hook
import { Redirect, Stack } from "expo-router"; // Componentes de navegación y redirección / Navigation and redirect components

export default function Layout() {
  const { session } = useAuth(); // Obtiene el estado de la sesión / Gets session state

  if (session) {
    // Si hay sesión activa, redirige a la app principal / If session is active, redirect to main app
    return <Redirect href={"/(app)/(tabs)"} />;
  }

  return (
    // Navegación tipo stack para el flujo de autenticación / Stack navigation for authentication flow
    <Stack>
      {/* Pantalla de inicio de sesión / Sign-in screen */}
      <Stack.Screen name="sign-in" />
      {/* Pantalla para ingresar teléfono / Phone input screen */}
      <Stack.Screen name="phone" />
      {/* Pantalla para ingresar código OTP / OTP input screen */}
      <Stack.Screen name="otp" />
    </Stack>
  );
}
