import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { usePronouns } from "@/api/options"; // Hook para obtener opciones de pronombres / Hook to get pronoun options
import { CheckboxList } from "@/components/checkbox-list"; // Lista de opciones tipo checkbox / Checkbox options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = usePronouns(); // Opciones de pronombres disponibles / Available pronoun options
  const [selected, setSelected] = useState(edits?.pronouns || []); // Estado para los pronombres seleccionados / State for selected pronouns

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        pronouns: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Contenedor de la lista de pronombres / Pronouns list container */}
      <View style={styles.listContainer}>
        <CheckboxList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Botón para guardar la selección / Button to save selection */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          selected.length === 0 && styles.disabledButton,
        ]}
        onPress={handleSave}
        disabled={selected.length === 0}
      >
        <Text style={styles.saveButtonText}>
          {selected.length > 0
            ? `Save ${selected.length} pronoun${selected.length > 1 ? "s" : ""}`
            : "Select pronouns"}
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
    backgroundColor: "#A4133C", // Botón vino oscuro / Dark wine button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5", // Botón deshabilitado rosa claro / Disabled light pink button
  },
  saveButtonText: {
    color: "#FFF0F3", // Texto blanco rosado / Pinkish white text
    fontSize: 16,
    fontWeight: "600",
  },
});
