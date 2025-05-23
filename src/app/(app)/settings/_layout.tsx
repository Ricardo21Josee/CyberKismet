import { Stack } from "expo-router"; // Componente de navegación tipo stack / Stack navigation component

export default function Layout() {
  return (
    // Navegación tipo stack para la sección de configuración / Stack navigation for settings section
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF", // Color de iconos y texto del header / Header icon and text color
        headerTitleStyle: {
          color: "#FFF0F3", // Color del título del header / Header title color
        },
        headerStyle: {
          backgroundColor: "#800F2F", // Fondo del header / Header background color
        },
        contentStyle: {
          backgroundColor: "#FFF0F3", // Fondo de pantalla / Screen background color
        },
      }}
    />
  );
}
