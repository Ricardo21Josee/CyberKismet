import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF", // Lightest pink for header background
        },
        contentStyle: {
          backgroundColor: "#FFFFFF", // Lightest pink for content background
        },
        headerTintColor: "#590D22", // Darkest red for back buttons/icons
        headerTitleStyle: {
          color: "#800F2F", // Dark red for titles
        },
        headerShadowVisible: false, // Maintains your original style preference
      }}
    />
  );
}
