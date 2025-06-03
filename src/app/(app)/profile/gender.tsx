import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useGenders } from "@/api/options"; // Hook para obtener opciones de género / Hook to get gender options
import { RadioList } from "@/components/radio-list"; // Lista de opciones tipo radio / Radio options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { Button, View } from "react-native"; // Componente de vista básico / Basic view component

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useGenders(); // Opciones de género disponibles / Available gender options
  const [selected, setSelected] = useState(edits?.gender || null); // Estado para el género seleccionado / State for selected gender

  // Maneja el guardado de la selección / Handles saving the selection
  const handlePress = () => {
    if (selected) {
      setEdits({
        ...edits,
        gender: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF", // Fondo blanco / White background
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      {/* Contenedor de opciones de género / Gender options container */}
      <View
        style={{
          marginTop: 24,
          backgroundColor: "#FFFFFF", // Fondo blanco / White background
          borderRadius: 12,
          paddingVertical: 16,
          paddingHorizontal: 18,
          shadowColor: "#590D22", // Sombra rosada / Pink shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          borderWidth: 1,
          borderColor: "#FFCCD5", // Borde sutil / Subtle border
        }}
      >
        {/* Lista de selección de género / Gender selection list */}
        <RadioList
          options={data.map((item) => ({ id: item.id, name: item.name }))}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>
      {/* Botón para guardar la selección / Button to save selection */}
      <Button
        title="Guardar" // Save
        onPress={handlePress}
        disabled={!selected}
      />
    </View>
  );
}
