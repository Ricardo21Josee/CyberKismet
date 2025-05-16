import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFF0F3", // Fondo rosa claro
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Fondo del contenido
        },
        headerTintColor: "#590D22", // Color de iconos y botones
        headerTitleStyle: {
          color: "#800F2F", // Color de títulos
          fontFamily: "Poppins-Medium", // Manteniendo tu tipografía
        },
        headerShadowVisible: false, // Sin sombra como en tu estilo original
      }}
    />
  );
}
