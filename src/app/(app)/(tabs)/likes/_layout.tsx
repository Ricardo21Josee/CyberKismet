import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF", // Fondo del header (rosa claro)
        },
        headerTitleStyle: {
          color: "#590D22", // Color del texto del título
        },
        contentStyle: {
          backgroundColor: "#FFFFFF", // Fondo del contenido
        },
        headerTintColor: "#A4133C", // Color de iconos/botones
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          animation: "none",
          headerTintColor: "#590D22", // Color de elementos del header
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          animation: "none",
          headerTitle: "Detalles",
          headerTintColor: "#590D22",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
