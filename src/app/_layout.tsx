import { fonts } from "@/constants/fonts"; // Fuentes personalizadas / Custom fonts
import { platformServices } from "@/lib/sendbird"; // Servicios de plataforma para Sendbird / Platform services for Sendbird
import { AuthProvider } from "@/store/auth"; // Proveedor de autenticación / Auth provider
import { Ionicons } from "@expo/vector-icons"; // Iconos de Ionicons / Ionicons icons
import AsyncStorage from "@react-native-async-storage/async-storage"; // Almacenamiento local / Local storage
import { SendbirdUIKitContainer } from "@sendbird/uikit-react-native"; // Contenedor de Sendbird / Sendbird container
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Cliente y proveedor de React Query / React Query client and provider
import Checkbox from "expo-checkbox"; // Componente de checkbox / Checkbox component
import { useFonts } from "expo-font"; // Hook para cargar fuentes / Hook to load fonts
import { Image } from "expo-image"; // Componente de imagen optimizada / Optimized image component
import { SplashScreen, Stack } from "expo-router"; // Pantalla de carga y navegación stack / Splash screen and stack navigation
import { VideoView } from "expo-video"; // Componente para videos / Video component
import LottieView from "lottie-react-native"; // Animaciones Lottie / Lottie animations
import { cssInterop } from "nativewind"; // Interoperabilidad de estilos / Style interop
import { useEffect } from "react"; // Hook de efecto de React / React effect hook
import MapView from "react-native-maps"; // Componente de mapas / Map component
import "../../global.css"; // Estilos globales / Global styles

// Configuración de interoperabilidad de estilos para componentes de terceros / Style interop setup for third-party components
cssInterop(VideoView, { className: { target: "style" } });
cssInterop(Ionicons, { className: { target: "style" } });
cssInterop(Image, { className: { target: "style" } });
cssInterop(MapView, { className: { target: "style" } });
cssInterop(Checkbox, { className: { target: "style" } });
cssInterop(LottieView, { className: { target: "style" } });

// Previene que la pantalla de splash se oculte automáticamente / Prevents splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient(); // Instancia de QueryClient para React Query / QueryClient instance for React Query

export default function Layout() {
  const [loaded, error] = useFonts(fonts); // Carga de fuentes personalizadas / Custom fonts loading

  useEffect(() => {
    // Oculta la pantalla de splash cuando las fuentes están listas o hay error / Hide splash screen when fonts are ready or error
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    // No renderiza nada hasta que las fuentes estén listas / Render nothing until fonts are ready
    return null;
  }

  return (
    // Contenedor principal de la app con proveedores de contexto / Main app container with context providers
    <SendbirdUIKitContainer
      appId={process.env.EXPO_PUBLIC_SENDBIRD_APP_ID!}
      chatOptions={{ localCacheStorage: AsyncStorage }}
      platformServices={platformServices}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* Navegación principal de la app / Main app navigation */}
          <Stack
            screenOptions={{
              headerShown: false, // Oculta el header por defecto / Hide header by default
            }}
          >
            {/* Stack para la app principal / Stack for main app */}
            <Stack.Screen
              name="(app)"
              options={{
                animation: "none",
              }}
            />
            {/* Stack para el flujo de autenticación / Stack for auth flow */}
            <Stack.Screen
              name="(auth)"
              options={{
                animation: "none",
              }}
            />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </SendbirdUIKitContainer>
  );
}
