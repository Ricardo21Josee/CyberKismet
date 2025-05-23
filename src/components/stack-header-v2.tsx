import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";

// Props del componente StackHeaderV2 / StackHeaderV2 component props
interface Props {
  title: string; // Título del header / Header title
}

// Header de stack personalizado con botón de cerrar / Custom stack header with close button
export const StackHeaderV2: FC<Props> = ({ title }) => {
  return (
    // Configuración de la pantalla del stack / Stack screen configuration
    <Stack.Screen
      options={{
        title, // Título centrado / Centered title
        headerTitleAlign: "center",
        headerBackVisible: false, // Oculta el botón de retroceso / Hide back button
        headerRight: () => (
          // Botón de cerrar en la esquina derecha / Close button on the right corner
          <Pressable onPressOut={router.back}>
            <Ionicons name="close" className="text-2xl" suppressHighlighting />
          </Pressable>
        ),
      }}
    />
  );
};
