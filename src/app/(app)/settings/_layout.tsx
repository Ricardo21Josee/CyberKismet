import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF", // Color de iconos y texto
        headerTitleStyle: {
          color: "#FFF0F3", // Color del título
        },
        headerStyle: {
          backgroundColor: "#800F2F", // Fondo del header
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Fondo de pantalla
        },
      }}
    />
  );
}
