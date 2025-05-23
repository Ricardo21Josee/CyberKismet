import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { LocationView } from "@/components/location-view"; // Componente para mostrar y seleccionar ubicación / Component to display and select location
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { LocationData } from "@/types/location"; // Tipo de datos de ubicación / Location data type
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const [selectedLocation, setSelectedLocation] = useState<LocationData>({
    latitude: edits?.latitude || null,
    longitude: edits?.longitude || null,
    neighborhood: edits?.neighborhood || null,
  }); // Estado para la ubicación seleccionada / State for selected location

  // Maneja el cambio de ubicación seleccionada / Handles selected location change
  const handleLocationChange = (location: LocationData | null) => {
    if (location) {
      setSelectedLocation(location);
    } else {
      setSelectedLocation({
        latitude: null,
        longitude: null,
        neighborhood: "",
      });
    }
  };

  // Maneja el guardado de la ubicación / Handles saving the location
  const handleSave = () => {
    if (
      selectedLocation.latitude !== null &&
      selectedLocation.longitude !== null &&
      selectedLocation.neighborhood !== null
    ) {
      setEdits({
        ...edits,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        neighborhood: selectedLocation.neighborhood,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Subtítulo informativo / Informative subtitle */}
      <Text style={styles.subtitle}>
        Only the neighborhood name will appear on your profile.
      </Text>

      {/* Vista de selección de ubicación / Location selection view */}
      <LocationView
        location={selectedLocation}
        onLocationChange={handleLocationChange}
      />

      {/* Botón para guardar la ubicación / Button to save location */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          !selectedLocation.neighborhood && styles.disabledButton,
        ]}
        onPress={handleSave}
        disabled={!selectedLocation.neighborhood}
      >
        <Text style={styles.saveButtonText}>
          {selectedLocation.neighborhood
            ? `Save ${selectedLocation.neighborhood}`
            : "Select a location"}
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#590D22",
    marginBottom: 15,
    fontFamily: "Poppins-Light",
    textAlign: "center",
  },
  saveButton: {
    marginTop: 50,
    backgroundColor: "#C9184A",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
