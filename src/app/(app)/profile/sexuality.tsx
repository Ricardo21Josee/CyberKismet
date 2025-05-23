import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useSexualities } from "@/api/options"; // Hook para obtener opciones de sexualidad / Hook to get sexuality options
import { RadioList } from "@/components/radio-list"; // Lista de opciones tipo radio / Radio options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useSexualities(); // Opciones de sexualidad disponibles / Available sexuality options
  const [selected, setSelected] = useState(edits?.sexuality || null); // Estado para la sexualidad seleccionada / State for selected sexuality

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        sexuality: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Contenedor de la lista de sexualidad / Sexuality list container */}
      <View style={styles.listContainer}>
        <RadioList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Botón para guardar la selección / Button to save selection */}
      <TouchableOpacity
        style={[styles.saveButton, !selected && styles.disabledButton]}
        onPress={handleSave}
        disabled={!selected}
      >
        <Text style={styles.saveButtonText}>
          {selected ? `Save selection` : "Select an option"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para los componentes de la pantalla / Styles for screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fondo blanco / White background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fondo blanco para la lista / White background for the list
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#590D22", // Sombra oscura / Dark shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: "#800F2F", // Botón vino oscuro / Dark wine button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#FFB3C1", // Botón deshabilitado rosa medio / Disabled medium pink button
  },
  saveButtonText: {
    color: "#FFF0F3", // Texto blanco rosado / Pinkish white text
    fontSize: 16,
    fontWeight: "600",
  },
});
