import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useZodiacSigns } from "@/api/options"; // Hook para obtener signos zodiacales / Hook to get zodiac signs
import { RadioList } from "@/components/radio-list"; // Lista de opciones tipo radio / Radio options list
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const { data } = useZodiacSigns(); // Opciones de signos zodiacales disponibles / Available zodiac sign options
  const [selected, setSelected] = useState(edits?.zodiac_sign || null); // Estado para el signo seleccionado / State for selected sign

  // Maneja el guardado de la selección / Handles saving the selection
  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        zodiac_sign: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Contenedor de la lista de signos zodiacales / Zodiac sign list container */}
      <View style={styles.listContainer}>
        <RadioList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Botón para guardar el signo seleccionado / Button to save selected sign */}
      <TouchableOpacity
        style={[styles.saveButton, !selected && styles.disabledButton]}
        onPress={handleSave}
        disabled={!selected}
      >
        <Text style={styles.saveButtonText}>
          {selected ? `Save ${selected.name}` : "Select your zodiac sign"}
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
    backgroundColor: "#A4133C", // Botón vino oscuro / Dark wine red button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5", // Botón deshabilitado rosa claro / Light pink disabled button
  },
  saveButtonText: {
    color: "#FFF0F3", // Texto blanco rosado / White-pink text
    fontSize: 16,
    fontWeight: "600",
  },
});
