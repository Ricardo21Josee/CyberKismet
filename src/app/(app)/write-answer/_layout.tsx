import { Stack } from "expo-router"; // Componente de navegación tipo stack / Stack navigation component

export default function Layout() {
  return (
    // Navegación tipo stack para la sección de respuestas / Stack navigation for write-answer section
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF", // Color del texto e iconos del header / Header text and icon color
        headerTitleStyle: {
          color: "#FFF0F3", // Color del título del header / Header title color
        },
        headerStyle: {
          backgroundColor: "#800F2F", // Fondo del header / Header background
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Fondo de la pantalla / Screen background
        },
      }}
    />
  );
}
