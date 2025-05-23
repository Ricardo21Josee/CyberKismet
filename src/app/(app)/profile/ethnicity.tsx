import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useEthnicities } from "@/api/options"; // Hook para obtener opciones de etnia / Hook to get ethnicity options
import { CheckboxList } from "@/components/checkbox-list"; // Lista de opciones tipo checkbox / Checkbox options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useEthnicities(); // Opciones de etnia disponibles / Available ethnicity options
  const [selected, setSelected] = useState(edits?.ethnicities || []); // Estado para las etnias seleccionadas / State for selected ethnicities

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        ethnicities: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header decorativo / Decorative header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Ethnicities</Text>
        <Text style={styles.subtitle}>You can choose multiple options</Text>
      </View>

      {/* Contenedor de la lista de etnias / Ethnicity list container */}
      <View style={styles.listContainer}>
        <CheckboxList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Footer con contador y botón de guardar / Footer with counter and save button */}
      <View style={styles.footer}>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{selected.length} selected</Text>
          <View style={styles.counterBadge}>
            <Text style={styles.counterNumber}>{selected.length}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            selected.length === 0 && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={selected.length === 0}
        >
          <Text style={styles.saveButtonText}>
            {selected.length > 0 ? "Save Selections" : "Select Options"}
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    color: "#590D22",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#A4133C",
    fontFamily: "Poppins-Regular",
    opacity: 0.8,
  },
  listContainer: {
    flex: 1, // Ocupa todo el espacio disponible / Takes all available space
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFB3C1",
    marginBottom: 15,
  },
  footer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#FFCCD5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterText: {
    fontSize: 16,
    color: "#800F2F",
    marginRight: 10,
    fontFamily: "Poppins-Medium",
  },
  counterBadge: {
    backgroundColor: "#FF4D6D",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  counterNumber: {
    color: "#FFF0F3",
    fontSize: 14,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#A4133C",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5",
  },
  saveButtonText: {
    color: "#FFF0F3",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
