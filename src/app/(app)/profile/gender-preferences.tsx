import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useGenders } from "@/api/options"; // Hook para obtener opciones de género / Hook to get gender options
import { CheckboxList } from "@/components/checkbox-list"; // Lista de opciones tipo checkbox / Checkbox options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { Button, View } from "react-native"; // Componente de vista básico / Basic view component

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useGenders(); // Opciones de género disponibles / Available gender options
  const [selected, setSelected] = useState(edits?.gender_preferences || []); // Estado para los géneros seleccionados / State for selected genders

  // Maneja el guardado de la selección / Handles saving the selection
  const handlePress = () => {
    if (selected) {
      setEdits({
        ...edits,
        gender_preferences: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF", // Fondo blanco / White background
        padding: 20,
      }}
    >
      {/* Contenedor de la lista de checkboxes / Checkbox list container */}
      <View
        style={{
          backgroundColor: "#FFFFFF", // Fondo blanco / White background
          borderRadius: 10,
          padding: 15,
          shadowColor: "#590D22", // Sombra rojo oscuro / Dark red shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Lista de géneros seleccionables / Selectable gender list */}
        <CheckboxList
          options={data.map((item) => ({
            id: item.id,
            name: item.plural_name || item.name,
          }))}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>
      {/* Botón para guardar la selección / Button to save selection */}
      <Button
        title="Guardar" // Texto del botón / Button text
        onPress={handlePress} // Maneja el evento de presionar el botón / Handles button press event
        disabled={selected.length === 0} // Desactiva el botón si no hay géneros seleccionados / Disables button if no genders are selected
      />
    </View>
  );
}
