import { useUpdateAgeRange } from "@/api/my-profile"; // Hook para actualizar el rango de edad / Hook to update age range
import { StackHeaderV4 } from "@/components/stack-header-v4"; // Header personalizado / Custom header
import { useEdit } from "@/store/edit"; // Hook para editar preferencias / Hook to edit preferences
import { Slider } from "@miblanchard/react-native-slider"; // Componente slider de rango / Range slider component
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import { Alert, StyleSheet, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

const Page = () => {
  const { edits } = useEdit(); // Obtiene los valores editados / Gets edited values
  const [ageRange, setAgeRange] = useState([
    edits?.min_age || 18,
    edits?.max_age || 100,
  ]); // Estado para el rango de edad / State for age range

  const { mutate, reset } = useUpdateAgeRange(); // Mutación para actualizar rango / Mutation to update range

  // Maneja la acción de guardar el rango de edad / Handles saving the age range
  const handlePress = () => {
    mutate(
      { min_age: ageRange[0], max_age: ageRange[1] },
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

  // Render principal de la pantalla de rango de edad / Main render for age range screen
  return (
    <View style={styles.container}>
      <StackHeaderV4
        title="Age Range"
        titleStyle={styles.headerTitle}
        onPressBack={handlePress}
      />

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Select age range</Text>

        {/* Slider para seleccionar el rango de edad / Slider to select age range */}
        <Slider
          minimumValue={18}
          maximumValue={100}
          step={1}
          value={ageRange}
          onValueChange={(value) => setAgeRange(value)}
          minimumTrackTintColor="#FF4D6D"
          maximumTrackTintColor="#FFB3C1"
          thumbTintColor="#C9184A"
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
          renderAboveThumbComponent={(index, value) => (
            <View style={styles.thumbLabel}>
              <Text style={styles.thumbText}>{value}</Text>
            </View>
          )}
        />

        {/* Muestra los valores mínimo y máximo seleccionados / Shows selected min and max values */}
        <View style={styles.rangeContainer}>
          <View style={styles.rangeValue}>
            <Text style={styles.rangeLabel}>Min age</Text>
            <Text style={styles.rangeNumber}>{ageRange[0]}</Text>
          </View>
          <View style={styles.rangeValue}>
            <Text style={styles.rangeLabel}>Max age</Text>
            <Text style={styles.rangeNumber}>{ageRange[1]}</Text>
          </View>
        </View>
      </View>

      {/* Descripción de la función del slider / Slider description */}
      <Text style={styles.description}>
        Adjust the sliders to set your preferred age range for matches
      </Text>
    </View>
  );
};

// Estilos para los componentes de la pantalla / Styles for screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: "#800F2F",
    fontSize: 22,
    fontWeight: "bold",
  },
  sliderContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginTop: 30,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sliderTitle: {
    color: "#590D22",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFF0F3",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  thumbLabel: {
    position: "absolute",
    bottom: 30,
    width: 40,
    left: -20,
    alignItems: "center",
    backgroundColor: "#C9184A",
    borderRadius: 12,
    paddingVertical: 4,
  },
  thumbText: {
    color: "white",
    fontWeight: "bold",
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  rangeValue: {
    alignItems: "center",
  },
  rangeLabel: {
    color: "#590D22",
    fontSize: 14,
  },
  rangeNumber: {
    color: "#800F2F",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
  description: {
    color: "#590D22",
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
});

export default Page;
