import { useUpdateLocation } from "@/api/my-profile"; // Hook para actualizar la ubicación / Hook to update location
import { LocationView } from "@/components/location-view"; // Componente para mostrar y seleccionar ubicación / Component to display and select location
import { StackHeaderV4 } from "@/components/stack-header-v4"; // Header personalizado / Custom header
import { useEdit } from "@/store/edit"; // Hook para editar preferencias / Hook to edit preferences
import { LocationData } from "@/types/location"; // Tipo de datos de ubicación / Location data type
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits } = useEdit(); // Obtiene las preferencias editadas / Gets edited preferences
  const [selectedLocation, setSelectedLocation] = useState<LocationData>({
    latitude: edits?.latitude || null,
    longitude: edits?.longitude || null,
    neighborhood: edits?.neighborhood || null,
  }); // Estado para la ubicación seleccionada / State for selected location
  const { mutate, reset } = useUpdateLocation(); // Mutación para actualizar ubicación / Mutation to update location

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
  const handlePress = () => {
    if (
      selectedLocation.latitude !== null &&
      selectedLocation.longitude !== null &&
      selectedLocation.neighborhood !== null
    ) {
      mutate(
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          neighborhood: selectedLocation.neighborhood,
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
          },
        }
      );
    }
    router.back();
  };

  // ¿La ubicación es válida? / Is the location valid?
  const hasValidLocation =
    selectedLocation.latitude !== null &&
    selectedLocation.longitude !== null &&
    selectedLocation.neighborhood !== null;

  // Render principal de la pantalla de ubicación / Main render for location screen
  return (
    <View style={styles.container}>
      <StackHeaderV4 title="Set Your Location" onPressBack={handlePress} />

      <View style={styles.header}>
        <Text style={styles.title}>Your Neighborhood</Text>
        <Text style={styles.subtitle}>
          Only the neighborhood name will appear on your profile
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapBorder}>
          <View style={styles.mapInner}>
            <LocationView
              location={selectedLocation}
              onLocationChange={handleLocationChange}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.locationText}>
          {selectedLocation.neighborhood || "No location selected"}
        </Text>

        <TouchableOpacity
          style={[
            styles.saveButton,
            !hasValidLocation && styles.disabledButton,
          ]}
          onPress={handlePress}
          disabled={!hasValidLocation}
        >
          <Text style={styles.saveButtonText}>
            {hasValidLocation ? "Save Location" : "Select a Location"}
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
    paddingBottom: 12,
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
    lineHeight: 20,
  },
  mapContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mapBorder: {
    flex: 1,
    backgroundColor: "#FFCCD5",
    borderRadius: 16,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFB3C1",
  },
  mapInner: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  footer: {
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#FFCCD5",
    backgroundColor: "#FFF0F3",
    alignItems: "center",
  },
  locationText: {
    fontSize: 18,
    color: "#800F2F",
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#C9184A",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",
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
