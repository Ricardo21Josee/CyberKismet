import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useFamilyPlans } from "@/api/options"; // Hook para obtener opciones de planes familiares / Hook to get family plan options
import { RadioList } from "@/components/radio-list"; // Lista de opciones tipo radio / Radio options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useFamilyPlans(); // Opciones de planes familiares disponibles / Available family plan options
  const [selected, setSelected] = useState(edits?.family_plan || null); // Estado para la opción seleccionada / State for selected option

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        family_plan: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header descriptivo / Descriptive header */}
      <View style={styles.header}>
        <Text style={styles.title}>Family Planning</Text>
        <Text style={styles.subtitle}>Select your family preferences</Text>
      </View>

      {/* Tarjeta de opciones mejorada / Improved options card */}
      <View style={styles.card}>
        <RadioList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Footer con botón interactivo / Footer with interactive button */}
      <View style={styles.footer}>
        <View style={styles.selectionPreview}>
          <Text style={styles.selectionText}>
            {selected ? `Selected: ${selected.name}` : "No selection yet"}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.saveButton, !selected && styles.disabledButton]}
          onPress={handleSave}
          disabled={!selected}
        >
          <Text style={styles.saveButtonText}>
            {selected ? "Confirm Selection" : "Choose Option"}
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
    paddingTop: 25,
  },
  header: {
    marginBottom: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#590D22",
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#A4133C",
    fontFamily: "Poppins-Regular",
    opacity: 0.8,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFB3C1",
    marginBottom: 20,
  },
  footer: {
    paddingBottom: 20,
  },
  selectionPreview: {
    backgroundColor: "#FFE5EC",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF8FA3",
    alignItems: "center",
  },
  selectionText: {
    fontSize: 16,
    color: "#800F2F",
    fontFamily: "Poppins-Medium",
  },
  saveButton: {
    backgroundColor: "#A4133C",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
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
