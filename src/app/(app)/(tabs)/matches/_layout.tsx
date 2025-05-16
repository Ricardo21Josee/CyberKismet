import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFF0F3", // Color de fondo del header (rosa claro)
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Color de fondo del contenido
        },
        headerTintColor: "#590D22", // Color de los botones e iconos del header (rojo oscuro)
        headerTitleStyle: {
          color: "#800F2F", // Color para los títulos (rojo vino)
        },
      }}
    />
  );
}
