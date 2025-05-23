import { PrivateProfile } from "@/api/my-profile/types";
import { StackHeaderV4 } from "@/components/stack-header-v4";
import { useEdit } from "@/store/edit";
import { age } from "@/utils/age";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { subYears } from "date-fns";
import { router } from "expo-router";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const [date, setDate] = useState(edits?.dob || subYears(new Date(), 18));
  const [show, setShow] = useState(false);

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

  const handlePress = () => {
    if (date) {
      setEdits({
        ...edits,
        dob: date as string,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <StackHeaderV4 title="Age" onPressBack={handlePress} />

      {/* Selector de fecha mejorado */}
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
              textColor="#590D22" // Color del texto del picker
            />
          </View>
        )}

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

      {/* Botón para Android */}
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
