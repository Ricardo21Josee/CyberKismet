import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFF0F3", // Text and icons color
        headerTitleStyle: {
          color: "#FFF0F3", // Title text color
        },
        headerStyle: {
          backgroundColor: "#800F2F", // Header background
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Screen background
        },
      }}
    />
  );
}
