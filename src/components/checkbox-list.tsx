import { Option } from "@/api/my-profile/types"; // Tipo de opción para la lista / Option type for the list
import Checkbox from "expo-checkbox"; // Componente de checkbox / Checkbox component
import { FC, useState } from "react"; // Funciones y hooks de React / React functions and hooks
import { FlatList, Pressable, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components
import colors from "tailwindcss/colors"; // Paleta de colores de Tailwind / Tailwind color palette

// Props del componente CheckboxList / CheckboxList component props
interface Props {
  options: Option[]; // Opciones disponibles / Available options
  initialSelection: Option[]; // Selección inicial / Initial selection
  onChange: (selected: Option[]) => void; // Callback al cambiar selección / Callback when selection changes
}

// Lista de opciones con checkbox / Checkbox options list
export const CheckboxList: FC<Props> = ({
  options,
  initialSelection,
  onChange,
}) => {
  const [selected, setSelected] = useState<Option[]>(initialSelection); // Estado de selección / Selection state

  // Alterna la selección de una opción / Toggle selection of an option
  const toggleSelection = (option: Option) => {
    const updatedSelection = selected.some((item) => item.id === option.id)
      ? selected.filter((item) => item.id !== option.id)
      : [...selected, option];
    setSelected(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    // Lista de opciones con checkbox / List of options with checkbox
    <FlatList
      data={options}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View className="h-px  bg-neutral-200" />}
      renderItem={({ item }) => {
        const isChecked = selected.some((s) => s.id === item.id);
        return (
          // Opción individual con checkbox / Single option with checkbox
          <Pressable
            className="flex-row justify-between py-5"
            onPress={() => toggleSelection(item)}
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
