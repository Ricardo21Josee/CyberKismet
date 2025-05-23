import { Stack } from "expo-router"; // Importa el componente Stack para navegación / Imports Stack component for navigation

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF", // Fondo rosa claro del header / Light pink header background
        },
        contentStyle: {
          backgroundColor: "#FFFFFF", // Fondo del contenido / Content background
        },
        headerTintColor: "#590D22", // Color de iconos y botones del header / Header icon and button color
        headerTitleStyle: {
          color: "#800F2F", // Color de títulos del header / Header title color
          fontFamily: "Poppins-Medium", // Manteniendo tu tipografía / Keeping your font family
        },
        headerShadowVisible: false, // Sin sombra en el header / No header shadow
      }}
    />
  );
}
