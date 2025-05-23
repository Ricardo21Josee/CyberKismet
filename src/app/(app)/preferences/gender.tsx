import { useUpdateGenderPreferences } from "@/api/my-profile"; // Hook para actualizar preferencias de género / Hook to update gender preferences
import { useGenders } from "@/api/options"; // Hook para obtener opciones de género / Hook to get gender options
import { StackHeaderV4 } from "@/components/stack-header-v4"; // Header personalizado / Custom header
import { useEdit } from "@/store/edit"; // Hook para editar preferencias / Hook to edit preferences
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits } = useEdit(); // Obtiene las preferencias editadas / Gets edited preferences
  const { data } = useGenders(); // Opciones de género disponibles / Available gender options
  const [selected, setSelected] = useState(edits?.gender_preferences || []); // Estado de géneros seleccionados / Selected genders state
  const { mutate, reset } = useUpdateGenderPreferences(); // Mutación para guardar preferencias / Mutation to save preferences

  // Maneja el guardado de preferencias / Handles saving preferences
  const handlePress = () => {
    if (selected) {
      mutate(
        {
          genders: selected.map((i) => i.id),
        },
        {
          onSuccess: () => {
            router.back(); // Vuelve atrás si es exitoso / Go back if successful
          },
          onError: () => {
            Alert.alert(
              "Error",
              "Something went wrong, please try again later."
            ); // Muestra error / Show error
            reset();
            router.back();
          },
        }
      );
    }
  };

  // Función para manejar la selección/deselección / Handles selection/deselection
  const toggleSelection = (item) => {
    setSelected((prev) => {
      const isSelected = prev.some((i) => i.id === item.id);
      if (isSelected) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Render principal de la pantalla de preferencias de género / Main render for gender preferences screen
  return (
    <View style={styles.container}>
      <StackHeaderV4 title="I'm interested in" onPressBack={handlePress} />

      <View style={styles.header}>
        <Text style={styles.title}>Select Genders You're Interested In</Text>
        <Text style={styles.subtitle}>Choose all that apply</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {/* Lista de opciones de género / Gender options list */}
          {data?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checkboxItem}
              onPress={() => toggleSelection(item)}
            >
              <Text style={styles.checkboxText}>
                {item.plural_name || item.name}
              </Text>
              <View
                style={[
                  styles.checkbox,
                  selected.some((i) => i.id === item.id) &&
                    styles.checkboxSelected,
                ]}
              >
                {selected.some((i) => i.id === item.id) && (
                  <Text style={styles.checkboxIcon}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer con contador y botón de guardar / Footer with counter and save button */}
      <View style={styles.footer}>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {selected.length} {selected.length === 1 ? "option" : "options"}{" "}
            selected
          </Text>
          <View style={styles.counterBadge}>
            <Text style={styles.counterNumber}>{selected.length}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            selected.length === 0 && styles.disabledButton,
          ]}
          onPress={handlePress}
          disabled={selected.length === 0}
        >
          <Text style={styles.saveButtonText}>
            {selected.length > 0 ? "Save Preferences" : "Select Options"}
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
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    color: "#590D22",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#A4133C",
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FFCCD5",
  },
  checkboxItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE5EC",
  },
  checkboxText: {
    fontSize: 16,
    color: "#590D22",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFB3C1",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#C9184A",
    borderColor: "#C9184A",
  },
  checkboxIcon: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#FFCCD5",
    backgroundColor: "#FFF0F3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterText: {
    fontSize: 15,
    color: "#800F2F",
    marginRight: 10,
  },
  counterBadge: {
    backgroundColor: "#FF4D6D",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  counterNumber: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#C9184A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#FFB3C1",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
