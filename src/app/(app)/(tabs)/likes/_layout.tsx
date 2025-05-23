import { Stack } from "expo-router";

// Componente de layout para la navegación de la sección de "likes"
// Layout component for the "likes" section navigation
export default function Layout() {
  return (
    <Stack
      // Opciones globales para el header y el contenido de las pantallas
      // Global options for the header and screen content
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF", // Fondo del header (rosa claro) / Header background color (light pink)
        },
        headerTitleStyle: {
          color: "#590D22", // Color del texto del título / Title text color
        },
        contentStyle: {
          backgroundColor: "#FFFFFF", // Fondo del contenido / Content background color
        },
        headerTintColor: "#A4133C", // Color de iconos/botones / Icon and button color
      }}
    >
      {/* Pantalla principal de la sección de likes */}
      {/* Main screen of the likes section */}
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "", // Sin título en el header / No title in the header
          headerShadowVisible: false, // Sin sombra en el header / No header shadow
          animation: "none", // Sin animación de transición / No transition animation
          headerTintColor: "#590D22", // Color de elementos del header / Header elements color
        }}
      />
      {/* Pantalla de detalle de un like específico */}
      {/* Detail screen for a specific like */}
      <Stack.Screen
        name="[id]"
        options={{
          animation: "none", // Sin animación de transición / No transition animation
          headerTitle: "Detalles", // Título del header / Header title
          headerTintColor: "#590D22", // Color de elementos del header / Header elements color
          headerTitleAlign: "center", // Centrar el título / Center the title
        }}
      />
    </Stack>
  );
}
