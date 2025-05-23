import { useUpdateDistance } from "@/api/my-profile"; // Hook para actualizar la distancia máxima / Hook to update max distance
import { StackHeaderV4 } from "@/components/stack-header-v4"; // Header personalizado / Custom header
import { useEdit } from "@/store/edit"; // Hook para editar preferencias / Hook to edit preferences
import { Slider } from "@miblanchard/react-native-slider"; // Componente slider / Slider component
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { Alert, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

const Page = () => {
  const { edits } = useEdit(); // Obtiene valores editados / Gets edited values
  const [distance, setDistance] = useState(edits?.max_distance_km || 160); // Estado para la distancia / State for distance

  const { mutate, reset } = useUpdateDistance(); // Mutación para actualizar distancia / Mutation to update distance

  // Maneja la acción de guardar la distancia / Handles saving the distance
  const handlePress = () => {
    mutate(
      { distance: distance },
      {
        onSuccess: () => {
          router.back(); // Vuelve atrás si es exitoso / Go back if successful
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong, please try again later."); // Muestra error / Show error
          reset();
          router.back();
        },
      }
    );
  };

  // Render principal de la pantalla de distancia / Main render for distance screen
  return (
    <View className="flex-1 px-5 pt-10" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header de la pantalla con botón de volver / Screen header with back button */}
      <StackHeaderV4 title="Maximum distance" onPressBack={handlePress} />

      <View className="flex-1 justify-center">
        <View className="mb-16 px-2">
          {/* Título del slider / Slider title */}
          <Text
            className="text-lg font-semibold mb-6"
            style={{ color: "#590D22" }}
          >
            Set your maximum distance preference:
          </Text>

          {/* Slider para seleccionar la distancia máxima / Slider to select max distance */}
          <Slider
            minimumValue={1}
            maximumValue={160}
            step={1}
            value={distance}
            onValueChange={(value) => setDistance(value[0])}
            minimumTrackTintColor="#FF4D6D"
            maximumTrackTintColor="#FFB3C1"
            thumbTintColor="#C9184A"
            thumbStyle={{
              width: 24,
              height: 24,
              borderRadius: 12,
              shadowColor: "#590D22",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
            }}
            trackStyle={{
              height: 6,
              borderRadius: 3,
            }}
            renderAboveThumbComponent={() => {
              // Etiqueta sobre el pulgar del slider / Label above slider thumb
              return (
                <View className="items-center justify-center w-16 -left-8 mb-2">
                  <View
                    className="bg-white px-2 py-1 rounded-full shadow-sm"
                    style={{ borderColor: "#FFB3C1", borderWidth: 1 }}
                  >
                    <Text
                      className="text-center font-bold"
                      style={{ color: "#590D22" }}
                    >
                      {distance} km
                    </Text>
                  </View>
                </View>
              );
            }}
          />

          {/* Etiquetas de valores mínimo y máximo / Min and max value labels */}
          <View className="flex-row justify-between mt-2 px-1">
            <Text style={{ color: "#A4133C" }}>1 km</Text>
            <Text style={{ color: "#A4133C" }}>160 km</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Page;
