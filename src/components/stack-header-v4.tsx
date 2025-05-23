import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";

// Props del componente StackHeaderV4 / StackHeaderV4 component props
interface Props {
  title: string; // Título del header / Header title
  onPressBack?: () => void; // Acción al presionar atrás / Action when pressing back
}

// Header de stack personalizado con botón de retroceso / Custom stack header with back button
export const StackHeaderV4: FC<Props> = ({ title, onPressBack }) => {
  return (
    // Configuración de la pantalla del stack / Stack screen configuration
    <Stack.Screen
      options={{
        title, // Título centrado / Centered title
        headerTitleAlign: "center",
        headerLeft: () => (
          // Botón de retroceso en la esquina izquierda / Back button on the left corner
          <Pressable onPressOut={onPressBack}>
            <Ionicons
              name="chevron-back"
              className="text-2xl"
              suppressHighlighting
            />
          </Pressable>
        ),
      }}
    />
  );
};
