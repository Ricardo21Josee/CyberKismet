import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useCovidVaccine } from "@/api/options"; // Hook para obtener opciones de vacuna / Hook to get vaccine options
import { RadioList } from "@/components/radio-list"; // Lista de opciones tipo radio / Radio options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useCovidVaccine(); // Opciones de vacuna disponibles / Available vaccine options
  const [selected, setSelected] = useState(edits?.covid_vaccine || null); // Estado para la opción seleccionada / State for selected option

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        covid_vaccine: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header con título y subtítulo / Header with title and subtitle */}
      <View style={styles.header}>
        <Text style={styles.title}>COVID-19 Vaccination</Text>
        <Text style={styles.subtitle}>Select your vaccine status</Text>
      </View>

      {/* Tarjeta de opciones de vacuna / Vaccine options card */}
      <View style={styles.card}>
        <RadioList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Panel de selección y acción / Selection and action panel */}
      <View style={styles.footer}>
        <View style={[styles.selectionBadge, !selected && styles.emptyBadge]}>
          <Text style={styles.selectionText}>
            {selected ? `✔ ${selected.name}` : "Pending selection"}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, !selected && styles.disabledButton]}
          onPress={handleSave}
          disabled={!selected}
        >
          <Text style={styles.saveButtonText}>
            {selected ? "Save Vaccine Status" : "Select Option"}
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
    paddingTop: 28,
  },
  header: {
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 26,
    color: "#590D22",
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#A4133C",
    fontFamily: "Poppins-Medium",
    opacity: 0.9,
    textAlign: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: "#FFB3C1",
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  selectionBadge: {
    backgroundColor: "#FFE5EC",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FF4D6D",
    marginBottom: 20,
    alignItems: "center",
  },
  emptyBadge: {
    borderColor: "#FFCCD5",
    backgroundColor: "#FFF0F3",
  },
  selectionText: {
    fontSize: 17,
    color: "#800F2F",
    fontFamily: "Poppins-SemiBold",
  },
  saveButton: {
    backgroundColor: "#A4133C",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 5 },
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
