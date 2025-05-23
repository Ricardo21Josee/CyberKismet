import { Option } from "@/api/my-profile/types"; // Tipo de opción para la lista / Option type for the list
import Checkbox from "expo-checkbox"; // Componente de checkbox (usado como radio) / Checkbox component (used as radio)
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components
import colors from "tailwindcss/colors"; // Paleta de colores de Tailwind / Tailwind color palette

// Props del componente RadioList / RadioList component props
interface Props {
  options: Option[]; // Opciones disponibles / Available options
  initialSelection: Option | null; // Selección inicial / Initial selection
  onChange: (selected: Option | null) => void; // Callback al cambiar selección / Callback when selection changes
}

// Componente de lista de selección única (radio) / Single selection (radio) list component
export const RadioList: React.FC<Props> = ({
  options,
  initialSelection,
  onChange,
}) => {
  const [selected, setSelected] = useState<Option | null>(initialSelection); // Estado de selección / Selection state

  // Maneja la selección de una opción / Handles selection of an option
  const handleSelection = (item: Option) => {
    const updatedSelection = selected?.id === item.id ? null : item;

    setSelected(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    // Lista de opciones con selección única / List of options with single selection
    <FlatList
      data={options}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View className="h-px bg-neutral-200" />}
      renderItem={({ item }) => {
        const isChecked = selected?.id === item.id;

        return (
          // Opción individual con "radio" (checkbox) / Single option with "radio" (checkbox)
          <Pressable
            className="py-5 flex-row justify-between"
            onPress={() => handleSelection(item)}
          >
            <Text className="text-base font-poppins-regular">{item.name}</Text>
            <Checkbox
              value={isChecked}
              color={isChecked ? colors.fuchsia[950] : colors.neutral[400]}
              className="h-5 w-5"
              pointerEvents="none"
            />
          </Pressable>
        );
      }}
    />
  );
};
