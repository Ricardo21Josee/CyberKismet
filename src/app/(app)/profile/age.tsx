import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { StackHeaderV4 } from "@/components/stack-header-v4"; // Header personalizado / Custom header
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { age } from "@/utils/age"; // Utilidad para calcular edad / Utility to calculate age
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"; // Selector de fecha / Date picker
import { subYears } from "date-fns"; // Utilidad para restar años / Utility to subtract years
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { useState } from "react"; // Hook de estado de React / React state hook
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data
  const [date, setDate] = useState(edits?.dob || subYears(new Date(), 18)); // Estado para la fecha de nacimiento / State for birth date
  const [show, setShow] = useState(false); // Estado para mostrar el picker / State to show picker

  // Maneja el cambio de fecha / Handles date change
  const onChange = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    if (Platform.OS === "android") {
      setShow(false);
    }
  };

  // Maneja el guardado de la fecha / Handles saving the date
  const handlePress = () => {
    if (date) {
      setEdits({
        ...edits,
        dob: date as string,
      } as PrivateProfile);
    }
    router.back();
  };

  // Render principal de la pantalla de edad / Main render for age screen
  return (
    <View style={styles.container}>
      <StackHeaderV4 title="Age" onPressBack={handlePress} />

      {/* Selector de fecha mejorado / Enhanced date selector */}
      <View style={styles.selectorContainer}>
        {(show || Platform.OS === "ios") && (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(date)}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
              display="spinner"
              maximumDate={subYears(new Date(), 18)}
              minimumDate={subYears(new Date(), 100)}
              themeVariant="light"
              textColor="#590D22" // Color del texto del picker / Picker text color
            />
          </View>
        )}

        {/* Muestra la edad calculada / Shows calculated age */}
        <TouchableOpacity
          style={styles.ageDisplay}
          onPress={() => setShow(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.ageLabel}>Your Age</Text>
          <Text style={styles.ageValue}>{age(date.toString())}</Text>
          <Text style={styles.ageSubtext}>years</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para Android para cambiar la fecha / Android button to change date */}
      {Platform.OS === "android" && !show && (
        <TouchableOpacity
          style={styles.androidButton}
          onPress={() => setShow(true)}
        >
          <Text style={styles.androidButtonText}>Change Date</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Estilos para los componentes de la pantalla / Styles for screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  selectorContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFB3C1",
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  ageDisplay: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFB3C1",
    marginHorizontal: 20,
  },
  ageLabel: {
    fontSize: 16,
    color: "#800F2F",
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  ageValue: {
    fontSize: 48,
    color: "#C9184A",
    fontFamily: "Poppins-Bold",
    lineHeight: 52,
  },
  ageSubtext: {
    fontSize: 16,
    color: "#A4133C",
    fontFamily: "Poppins-Light",
  },
  androidButton: {
    backgroundColor: "#A4133C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  androidButtonText: {
    color: "#FFF0F3",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
