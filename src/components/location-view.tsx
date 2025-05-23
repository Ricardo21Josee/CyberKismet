import { LocationData } from "@/types/location";
import { openSettings } from "expo-linking";
import * as Location from "expo-location";
import { FC, useEffect, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import MapView, { Details, Region } from "react-native-maps";

// Delta por defecto para el mapa / Default map delta
const DEFAULT_DELTA = {
  latitudeDelta: 0.025,
  longitudeDelta: 0.0125,
};

// Delta mínimo para permitir selección / Minimum delta to allow selection
const MIN_DELTA = {
  latitudeDelta: 1,
  longitudeDelta: 1,
};

// Props del componente LocationView / LocationView component props
interface Props {
  location: LocationData;
  onLocationChange: (location: LocationData | null) => void;
}

// Componente para mostrar y seleccionar ubicación en el mapa / Component to display and select location on map
export const LocationView: FC<Props> = ({ location, onLocationChange }) => {
  const [region, setRegion] = useState<Region>(); // Estado de la región del mapa / Map region state
  const [neighborhood, setNeighborhood] = useState(""); // Estado del vecindario / Neighborhood state

  useEffect(() => {
    // Inicializa la región y vecindario si hay datos / Initialize region and neighborhood if data exists
    if (location?.latitude && location?.longitude && location?.neighborhood) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        ...DEFAULT_DELTA,
      });
      setNeighborhood(location.neighborhood);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Maneja el cambio de región en el mapa / Handles region change on the map
  const onRegionChangeComplete = async (region: Region, details: Details) => {
    if (Platform.OS === "android" && !details.isGesture) {
      return;
    }

    // Si el usuario hace mucho zoom out, pide acercarse más / If user zooms out too much, asks to zoom in
    if (
      region.latitudeDelta > MIN_DELTA.latitudeDelta ||
      region.longitudeDelta > MIN_DELTA.longitudeDelta
    ) {
      setNeighborhood("Zoom into your neighborhood");
      onLocationChange(null);
      return;
    }

    try {
      // Obtiene la dirección a partir de la latitud y longitud / Gets address from latitude and longitude
      const location = await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });

      const address = location[0];
      let neighborhood = "";

      // Determina el vecindario a mostrar / Determines neighborhood to display
      if (address.city) {
        neighborhood = address.city;
      } else if (address.subregion) {
        neighborhood = address.subregion;
      } else if (address.region) {
        neighborhood = address.region;
      } else {
        neighborhood = "Invalid location";
        setNeighborhood(neighborhood);
        onLocationChange(null);
        return;
      }

      setNeighborhood(neighborhood);
      onLocationChange({
        latitude: region.latitude,
        longitude: region.longitude,
        neighborhood: neighborhood,
      });
    } catch (error: any) {
      // Manejo de errores de geolocalización / Geolocation error handling
      switch (error.code) {
        case "E_RATE_EXCEEDED":
          Alert.alert("Error", "Too many requests. Please try again later;");
          break;
        case "ERR_LOCATION_UNAUTHORIZED":
          getPermissions();
          break;
        default:
          Alert.alert("Error", "Something went wrong. Please try again later;");
          break;
      }
    }
  };

  // Solicita permisos de ubicación al usuario / Requests location permissions from user
  const getPermissions = async () => {
    const { status: existingStatus } =
      await Location.getForegroundPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      finalStatus = status;
    }

    // Si no se otorgan permisos, muestra alerta y opción de ir a configuración / If not granted, show alert and option to go to settings
    if (finalStatus !== "granted") {
      Alert.alert(
        "Allow Location Access",
        "Please enable Location Services so we can introduce you to new people near you.",
        [
          {
            text: "Cancel",
          },
          {
            text: "Settings",
            onPress: () => {
              openSettings();
            },
          },
        ]
      );
      return;
    }
  };

  return (
    // Contenedor principal del mapa y etiqueta de vecindario / Main container for map and neighborhood label
    <View className="w-full h-3/5 justify-center items-center">
      <MapView
        className="w-full h-full"
        initialRegion={region}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View
        className="bg-black absolute py-2 px-4 rounded-md"
        pointerEvents="none"
      >
        {/* Etiqueta con el nombre del vecindario / Label with neighborhood name */}
        <Text className="text-white text-base font-poppins-regular">
          {neighborhood}
        </Text>
      </View>
    </View>
  );
};
