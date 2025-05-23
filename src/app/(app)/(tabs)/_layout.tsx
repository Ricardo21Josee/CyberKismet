import { useMyProfile } from "@/api/my-profile"; // Hook para obtener el perfil del usuario / Hook to get user profile
import { cn } from "@/utils/cn"; // Utilidad para clases condicionales / Utility for conditional classes
import { Ionicons } from "@expo/vector-icons"; // Iconos de Expo / Expo icons
import { useConnection } from "@sendbird/uikit-react-native"; // Hook para conexión con Sendbird / Hook for Sendbird connection
import { Image } from "expo-image"; // Componente de imagen optimizada / Optimized image component
import { Tabs } from "expo-router"; // Componente de navegación por pestañas / Tabs navigation component
import { useEffect } from "react"; // Hook de efectos de React / React effect hook
import { View } from "react-native"; // Componente de vista de React Native / React Native view component

export default function Layout() {
  const { data: profile } = useMyProfile(); // Obtiene el perfil del usuario / Gets user profile
  const { connect } = useConnection(); // Función para conectar a Sendbird / Function to connect to Sendbird

  useEffect(() => {
    if (profile) {
      connect(profile.id, { nickname: profile.first_name || undefined }); // Conecta a Sendbird con el id y nickname / Connects to Sendbird with id and nickname
    }
  }, [profile, connect]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#590D22", // Color de fondo de la barra de pestañas / Tab bar background color
        },
        tabBarActiveTintColor: "#FFFFFF", // Color de icono activo / Active icon color
        tabBarInactiveTintColor: "#FFB3C1", // Color de icono inactivo / Inactive icon color
        tabBarShowLabel: false, // Oculta los textos de las pestañas / Hide tab labels
      }}
    >
      {/* Pantalla principal (Home) / Main screen (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#FFFFFF", // Fondo claro para el header / Light header background
          },
        }}
      />
      {/* Pantalla de likes / Likes screen */}
      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      {/* Pantalla de matches (chats) / Matches (chats) screen */}
      <Tabs.Screen
        name="matches"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      {/* Pantalla de perfil (hinge) / Profile (hinge) screen */}
      <Tabs.Screen
        name="hinge"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            profile && profile.avatar_url ? (
              // Si el usuario tiene avatar, muestra la imagen / If user has avatar, show image
              <View
                style={{
                  width: size,
                  height: size,
                }}
                className={cn(
                  focused && "border border-[#FFF0F3] rounded-full p-0.5" // Borde claro cuando está enfocado / Light border when focused
                )}
              >
                <Image
                  source={profile.avatar_url}
                  className="flex-1 aspect-square rounded-full bg-[#FFCCD5]" // Fondo rosa pastel para la imagen / Pastel pink background for image
                />
              </View>
            ) : (
              // Si no hay avatar, muestra icono por defecto / If no avatar, show default icon
              <Ionicons name="person-circle" color={color} size={size} />
            ),
        }}
      />
    </Tabs>
  );
}
