import { Stack } from "expo-router"; // Componente de navegación tipo stack / Stack navigation component

export default function Layout() {
  return (
    // Navegación tipo stack para la sección de prompts / Stack navigation for prompts section
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF", // Color del texto e iconos del header / Header text and icon color
        headerStyle: {
          backgroundColor: "#A4133C", // Color de fondo del header / Header background color
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Color de fondo del contenido / Content background color
        },
      }}
    />
  );
}
