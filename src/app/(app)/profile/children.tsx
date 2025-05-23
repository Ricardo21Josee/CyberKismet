import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useChildren } from "@/api/options"; // Hook para obtener opciones de hijos / Hook to get children options
import { RadioList } from "@/components/radio-list"; // Lista de opciones tipo radio / Radio options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useChildren(); // Opciones de hijos disponibles / Available children options
  const [selected, setSelected] = useState(edits?.children || null); // Estado para la opción seleccionada / State for selected option

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        children: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header simplificado sin icono / Simplified header without icon */}
      <View style={styles.header}>
        <Text style={styles.title}>Family Preferences</Text>
        <Text style={styles.subtitle}>Select your ideal family size</Text>
      </View>

      {/* Contenedor principal con mejor diseño / Main card container with improved design */}
      <View style={styles.card}>
        <RadioList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Sección inferior con vista previa y botón / Footer with preview and button */}
      <View style={styles.footer}>
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionLabel}>Your selection:</Text>
          <View style={styles.selectionPreview}>
            <Text style={styles.selectionText}>
              {selected ? selected.name : "Not selected yet"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, !selected && styles.disabledButton]}
          onPress={handleSave}
          disabled={!selected}
        >
          <Text style={styles.saveButtonText}>
            {selected ? "Confirm Selection" : "Select an Option"}
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
    paddingTop: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    color: "#590D22",
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#A4133C",
    fontFamily: "Poppins-Regular",
    opacity: 0.9,
    textAlign: "center",
  },
  card: {
    height: 170, // Altura de la tarjeta principal / Main card height
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFB3C1",
    marginBottom: 20,
  },
  footer: {
    paddingVertical: 250,
  },
  selectionContainer: {
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 16,
    color: "#800F2F",
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
  },
  selectionPreview: {
    backgroundColor: "#FFE5EC",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF8FA3",
  },
  selectionText: {
    fontSize: 18,
    color: "#C9184A",
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#A4133C",
    paddingVertical: 16,
    borderRadius: 12,
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
