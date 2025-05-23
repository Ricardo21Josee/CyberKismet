import { Stack } from "expo-router"; // Importa el componente Stack para la navegación / Imports Stack component for navigation

export default function Layout() {
  return (
    <Stack
      // Opciones globales para el header y el contenido de las pantallas
      // Global options for the header and screen content
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF", // Color de fondo del header (rosa claro) / Header background color (light pink)
        },
        contentStyle: {
          backgroundColor: "#FFFFFF", // Color de fondo del contenido / Content background color
        },
        headerTintColor: "#590D22", // Color de los botones e iconos del header (rojo oscuro) / Header icon and button color (dark red)
        headerTitleStyle: {
          color: "#800F2F", // Color para los títulos (rojo vino) / Title text color (wine red)
        },
      }}
    />
  );
}
