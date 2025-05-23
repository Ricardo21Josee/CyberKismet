import { useAuth } from "@/store/auth"; // Hook para autenticación / Auth hook
import { EditProvider } from "@/store/edit"; // Proveedor de contexto para edición / Edit context provider
import { Redirect, Stack } from "expo-router"; // Componentes de navegación y redirección / Navigation and redirect components
import { Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Layout() {
  const { session, isLoading } = useAuth(); // Estado de sesión y carga / Session and loading state

  if (isLoading) {
    // Pantalla de carga mientras se verifica la sesión / Loading screen while checking session
    return (
      <View className="flex-1 items-center justify-center bg-[#FFF0F3]">
        <Text className="text-[#590D22]">Loading...</Text>
      </View>
    );
  }

  if (!session) {
    // Redirección si no hay sesión activa / Redirect if no active session
    return <Redirect href={"/sign-in"} />;
  }

  return (
    // Proveedor de edición para todo el stack / Edit provider for the whole stack
    <EditProvider>
      {/* Navegación principal de la app / Main app navigation */}
      <Stack
        screenOptions={{
          headerShown: false, // Oculta el header por defecto / Hide header by default
          contentStyle: {
            backgroundColor: "#FFFFFF", // Fondo blanco para todas las pantallas / White background for all screens
          },
        }}
      >
        {/* Pantalla principal de tabs / Main tabs screen */}
        <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
        {/* Pantalla de configuración / Settings screen */}
        <Stack.Screen
          name="settings"
          options={{
            animation: "slide_from_bottom", // Animación de entrada / Slide in animation
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        {/* Pantalla de perfil / Profile screen */}
        <Stack.Screen
          name="profile"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        {/* Pantalla para escribir respuestas / Write-answer screen */}
        <Stack.Screen
          name="write-answer"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        {/* Pantalla de prompts / Prompts screen */}
        <Stack.Screen
          name="prompts"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        {/* Pantalla de preferencias / Preferences screen */}
        <Stack.Screen
          name="preferences"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
      </Stack>
    </EditProvider>
  );
}
