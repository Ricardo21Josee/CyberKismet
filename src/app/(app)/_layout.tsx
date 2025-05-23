import { useAuth } from "@/store/auth";
import { EditProvider } from "@/store/edit";
import { Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Layout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#FFF0F3]">
        <Text className="text-[#590D22]">Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <EditProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#FFFFFF", // Light pink background for all screens
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
        <Stack.Screen
          name="settings"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        <Stack.Screen
          name="write-answer"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        <Stack.Screen
          name="prompts"
          options={{
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
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
