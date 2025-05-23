import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const [firstName, setFirstName] = useState(edits?.first_name || ""); // Estado para el primer nombre / State for first name
  const [lastName, setLastName] = useState(edits?.last_name || ""); // Estado para el apellido / State for last name

  // Maneja el guardado del nombre / Handles saving the name
  const handleSave = () => {
    if (firstName) {
      setEdits({
        ...edits,
        first_name: firstName,
        last_name: lastName,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Contenedor del campo de primer nombre / First name input container */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          selectionColor="#590D22"
          cursorColor="#A4133C"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          placeholderTextColor="#FFB3C1"
        />
      </View>

      {/* Contenedor del campo de apellido / Last name input container */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          selectionColor="#590D22"
          cursorColor="#A4133C"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          placeholderTextColor="#FFB3C1"
        />
      </View>

      {/* Botón para guardar el nombre / Button to save the name */}
      <TouchableOpacity
        style={[styles.saveButton, !firstName && styles.disabledButton]}
        onPress={handleSave}
        disabled={!firstName}
      >
        <Text style={styles.saveButtonText}>
          {firstName ? `Save ${firstName} ${lastName}` : "Enter your name"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para los componentes de la pantalla / Styles for screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    color: "#800F2F",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
  },
  input: {
    height: 50,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    borderBottomWidth: 2,
    borderBottomColor: "#FF758F",
    color: "#590D22",
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: "#C9184A",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5",
  },
  saveButtonText: {
    color: "#FFF0F3",
    fontSize: 16,
    fontWeight: "600",
  },
});
