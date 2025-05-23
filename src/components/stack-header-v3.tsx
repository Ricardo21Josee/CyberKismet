import { Stack } from "expo-router";
import { FC } from "react";
import { Pressable, Text } from "react-native";

// Props del componente StackHeaderV3 / StackHeaderV3 component props
interface Props {
  title?: string; // Título del header / Header title
  onPressCancel?: () => void; // Acción al presionar Cancelar / Action when pressing Cancel
  onPressDone?: () => void; // Acción al presionar Done / Action when pressing Done
}

// Header de stack personalizado con botones Cancel y Done / Custom stack header with Cancel and Done buttons
export const StackHeaderV3: FC<Props> = ({
  title,
  onPressCancel,
  onPressDone,
}) => {
  return (
    // Configuración de la pantalla del stack / Stack screen configuration
    <Stack.Screen
      options={{
        headerShown: true, // Muestra el header / Show header
        title: title, // Título centrado / Centered title
        headerTitleAlign: "center",
        headerLeft: () => (
          // Botón Cancelar en la esquina izquierda / Cancel button on the left corner
          <Pressable onPressOut={onPressCancel}>
            <Text className="font-semibold text-fuchsia-900">Cancel</Text>
          </Pressable>
        ),
        headerRight: () => (
          // Botón Done en la esquina derecha / Done button on the right corner
          <Pressable onPressOut={onPressDone}>
            <Text className="font-semibold text-fuchsia-900">Done</Text>
          </Pressable>
        ),
        headerShadowVisible: false, // Oculta la sombra del header / Hide header shadow
      }}
    />
  );
};
