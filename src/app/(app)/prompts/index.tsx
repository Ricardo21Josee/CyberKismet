import { usePrompts } from "@/api/options"; // Hook para obtener los prompts / Hook to get prompts
import { Prompt } from "@/api/options/types"; // Tipo de dato para un prompt / Prompt data type
import { StackHeaderV2 } from "@/components/stack-header-v2"; // Header personalizado para la pantalla / Custom header for the screen
import { router, useLocalSearchParams } from "expo-router"; // Utilidades de navegación / Navigation utilities
import { FlatList, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { data: prompts } = usePrompts(); // Lista de prompts disponibles / List of available prompts
  const { itemId } = useLocalSearchParams(); // Parámetro local para navegación / Local navigation parameter

  // Maneja la selección de un prompt / Handles prompt selection
  const handlePress = (item: Prompt) => {
    router.dismissTo({
      pathname: "/write-answer",
      params: {
        promptId: item.id,
        itemId,
      },
    });
  };

  return (
    // Contenedor principal de la pantalla de prompts / Main container for prompts screen
    <View className="flex-1 bg-[#FFFFFF]">
      {/* Header de la pantalla de prompts / Prompts screen header */}
      <StackHeaderV2 title="Prompts" />
      {/* Lista de prompts disponibles / List of available prompts */}
      <FlatList
        data={prompts}
        renderItem={({ item }) => {
          return (
            // Elemento individual de la lista de prompts / Single prompt list item
            <TouchableOpacity
              key={item.id}
              className="p-3 py-5"
              onPress={() => handlePress(item)}
            >
              <Text className="text-sm font-poppins-regular text-[#590D22]">
                {item.question}
              </Text>
            </TouchableOpacity>
          );
        }}
        // Separador visual entre elementos / Visual separator between items
        ItemSeparatorComponent={() => <View className="h-px bg-[#FFB3C1]" />}
        // Estilos para el contenido de la lista / Styles for list content
        contentContainerClassName="pl-5 pb-20"
      />
    </View>
  );
}
