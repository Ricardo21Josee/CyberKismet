import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF", // Color del texto e iconos del header
        headerStyle: {
          backgroundColor: "#A4133C", // Color de fondo del header
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Color de fondo del contenido
        },
      }}
    />
  );
}
