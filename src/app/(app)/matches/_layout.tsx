import { Stack } from "expo-router"; // Importa el componente Stack para navegación / Imports Stack component for navigation

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF", // Fondo del header (rosa claro) / Header background (light pink)
        },
        contentStyle: {
          backgroundColor: "#FFFFFF", // Fondo del contenido (rosa claro) / Content background (light pink)
        },
        headerTintColor: "#590D22", // Color de iconos/botones del header (rojo oscuro) / Header icon/button color (dark red)
        headerTitleStyle: {
          color: "#800F2F", // Color del título del header (rojo vino) / Header title color (wine red)
        },
        headerShadowVisible: false, // Sin sombra en el header / No header shadow
      }}
    />
  );
}
