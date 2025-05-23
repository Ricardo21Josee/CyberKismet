import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";

// Props vacías para el header / Empty props for the header
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}

// Header de stack personalizado con botón de cerrar / Custom stack header with close button
export const StackHeader: FC<Props> = () => {
  return (
    // Configuración de la pantalla del stack / Stack screen configuration
    <Stack.Screen
      options={{
        headerBackVisible: false, // Oculta el botón de retroceso / Hide back button
        title: "", // Sin título en el header / No title in header
        headerRight: () => (
          // Botón de cerrar en la esquina derecha / Close button on the right corner
          <Pressable onPress={router.back}>
            <Ionicons name="close" className="text-2xl" suppressHighlighting />
          </Pressable>
        ),
        headerShadowVisible: false, // Oculta la sombra del header / Hide header shadow
      }}
    />
  );
};
