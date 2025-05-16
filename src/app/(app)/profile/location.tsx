import { PrivateProfile } from "@/api/my-profile/types";
import { LocationView } from "@/components/location-view";
import { useEdit } from "@/store/edit";
import { LocationData } from "@/types/location";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const [selectedLocation, setSelectedLocation] = useState<LocationData>({
    latitude: edits?.latitude || null,
    longitude: edits?.longitude || null,
    neighborhood: edits?.neighborhood || null,
  });

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
      <Text style={styles.subtitle}>
        Only the neighborhood name will appear on your profile.
      </Text>

      {/* Contenedor del mapa que ocupa todo el espacio disponible */}

      <LocationView
        location={selectedLocation}
        onLocationChange={handleLocationChange}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F3",
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
