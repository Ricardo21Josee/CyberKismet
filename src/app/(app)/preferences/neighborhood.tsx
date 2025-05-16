import { useUpdateLocation } from "@/api/my-profile";
import { LocationView } from "@/components/location-view";
import { StackHeaderV4 } from "@/components/stack-header-v4";
import { useEdit } from "@/store/edit";
import { LocationData } from "@/types/location";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { edits } = useEdit();
  const [selectedLocation, setSelectedLocation] = useState<LocationData>({
    latitude: edits?.latitude || null,
    longitude: edits?.longitude || null,
    neighborhood: edits?.neighborhood || null,
  });
  const { mutate, reset } = useUpdateLocation();

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
            router.back();
          },
          onError: () => {
            Alert.alert(
              "Error",
              "Something went wrong, please try again later."
            );
            reset();
          },
        }
      );
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <StackHeaderV4 title="Location" onPressBack={handlePress} />
      <Text style={styles.description}>
        Only the neighborhood name will appear on your profile.
      </Text>

      {/* Contenedor rosa fuerte con mapa perfectamente ajustado */}
      <View style={styles.mapBorder}>
        <View style={styles.mapInner}>
          <LocationView
            location={selectedLocation}
            onLocationChange={handleLocationChange}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF0F3",
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    marginBottom: 12,
    color: "#590D22",
  },
  mapBorder: {
    flex: 1,
    backgroundColor: "#FFCCD5", // Rosa fuerte
    borderRadius: 8,
    shadowColor: "#A4133C", // Sombra para profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden", // Crítico para bordes redondeados
  },
  mapInner: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
