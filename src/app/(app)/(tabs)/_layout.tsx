import { useMyProfile } from "@/api/my-profile";
import { cn } from "@/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { useConnection } from "@sendbird/uikit-react-native";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Layout() {
  const { data: profile } = useMyProfile();
  const { connect } = useConnection();

  useEffect(() => {
    if (profile) {
      connect(profile.id, { nickname: profile.first_name || undefined });
    }
  }, [profile, connect]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#590D22", // Color más oscuro de la paleta para la barra
        },
        tabBarActiveTintColor: "#FFF0F3", // Color claro para íconos activos
        tabBarInactiveTintColor: "#FFB3C1", // Rosa claro para íconos inactivos
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#FFF0F3", // Fondo claro para el header
          },
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="hinge"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            profile && profile.avatar_url ? (
              <View
                style={{
                  width: size,
                  height: size,
                }}
                className={cn(
                  focused && "border border-[#FFF0F3] rounded-full p-0.5" // Borde claro cuando está enfocado
                )}
              >
                <Image
                  source={profile.avatar_url}
                  className="flex-1 aspect-square rounded-full bg-[#FFCCD5]" // Fondo rosa pastel para la imagen
                />
              </View>
            ) : (
              <Ionicons name="person-circle" color={color} size={size} />
            ),
        }}
      />
    </Tabs>
  );
}
