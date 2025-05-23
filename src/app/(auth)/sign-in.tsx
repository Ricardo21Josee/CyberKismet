import { VideoBackground } from "@/components/video-background"; // Componente para fondo de video / Video background component
import { Link, Stack } from "expo-router"; // Navegación y stack de pantallas / Navigation and screen stack
import { Pressable, StatusBar, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components
import { SafeAreaView } from "react-native-safe-area-context"; // Vista segura para evitar notch/barras / Safe area view for avoiding notch/bars

export default function Page() {
  return (
    // Contenedor principal de la pantalla de inicio de sesión / Main container for sign-in screen
    <View className="flex-1">
      {/* Oculta el header superior / Hide top header */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* Barra de estado con texto claro / Status bar with light text */}
      <StatusBar barStyle={"light-content"} />
      {/* Fondo de video animado / Animated video background */}
      <VideoBackground source={require("~/assets/images/background.mp4")}>
        {/* Área segura para el contenido / Safe area for content */}
        <SafeAreaView className="flex-1 p-10">
          {/* Sección superior con mensaje / Top section with message */}
          <View className="flex-1 items-center pt-14">
            <View className="h-4" />
            <Text className="text-[#800F2F] text-xl font-poppins-semibold">
              Swipe, connect, and fall in love with...
            </Text>
          </View>
          {/* Botón para iniciar sesión con teléfono / Button to sign in with phone */}
          <Link href={"/phone"} asChild>
            <Pressable className="bg-[#590D22] h-16 items-center justify-center rounded-full">
              <Text className="text-white text-lg font-poppins-semibold">
                Sign in with Phone Number
              </Text>
            </Pressable>
          </Link>
        </SafeAreaView>
      </VideoBackground>
    </View>
  );
}
