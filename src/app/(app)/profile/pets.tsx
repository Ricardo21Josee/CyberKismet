import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { usePets } from "@/api/options"; // Hook para obtener opciones de mascotas / Hook to get pet options
import { CheckboxList } from "@/components/checkbox-list"; // Lista de opciones tipo checkbox / Checkbox options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = usePets(); // Opciones de mascotas disponibles / Available pet options
  const [selected, setSelected] = useState(edits?.pets || []); // Estado para las mascotas seleccionadas / State for selected pets

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        pets: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header con icono de mascotas / Header with pet icon */}
      <View style={styles.header}>
        <Text style={styles.title}>Pet Preferences</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>
      </View>

      {/* Tarjeta de selección premium / Premium selection card */}
      <View style={styles.listContainer}>
        <CheckboxList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Panel de selección interactivo / Interactive selection panel */}
      <View style={styles.footer}>
        <View style={styles.selectionSummary}>
          <Text style={styles.selectionText}>
            {selected.length > 0
              ? `${selected.length} pet${selected.length !== 1 ? "s" : ""} selected`
              : "No pets selected"}
          </Text>
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>{selected.length}</Text>
          </View>
        </View>

        {/* Botón para guardar selección / Button to save selection */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            selected.length === 0 && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={selected.length === 0}
        >
          <Text style={styles.saveButtonText}>
            {selected.length > 0 ? "Save Preferences" : "Make Selection"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos para los componentes de la pantalla / Styles for screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingTop: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  headerIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
    tintColor: "#A4133C",
  },
  title: {
    fontSize: 26,
    color: "#590D22",
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#800F2F",
    fontFamily: "Poppins-Regular",
    opacity: 0.9,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#FFB3C1",
  },
  footer: {
    paddingBottom: 20,
  },
  selectionSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFE5EC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#FF8FA3",
  },
  selectionText: {
    fontSize: 16,
    color: "#590D22",
    fontFamily: "Poppins-Medium",
  },
  counterBadge: {
    backgroundColor: "#FF4D6D",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    color: "#FFF0F3",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#A4133C",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5",
  },
  saveButtonText: {
    color: "#FFF0F3",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
