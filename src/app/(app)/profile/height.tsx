import { PrivateProfile } from "@/api/my-profile/types";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { range } from "lodash";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const [selectedHeight, setSelectedHeight] = useState(
    edits?.height_cm || null
  );
  const heights = range(140, 201); // Rango de 140cm a 200cm

  const saveAndGoBack = () => {
    if (selectedHeight) {
      setEdits({
        ...edits,
        height_cm: selectedHeight,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Título decorativo */}
      <Text style={styles.title}>Select Your Height</Text>

      {/* Selector de altura vertical */}
      <View style={styles.heightContainer}>
        {/* Línea guía central */}
        <View style={styles.guideLine} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          snapToInterval={80}
          decelerationRate="fast"
        >
          {heights.map((height) => (
            <TouchableOpacity
              key={height}
              style={[
                styles.heightOption,
                selectedHeight === height && styles.selectedHeightOption,
              ]}
              onPress={() => setSelectedHeight(height)}
            >
              <Text
                style={[
                  styles.heightText,
                  selectedHeight === height && styles.selectedHeightText,
                ]}
              >
                {height}
              </Text>
              <Text style={styles.cmText}>cm</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Indicador visual mejorado */}
      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicatorLine, styles.leftLine]} />
          <Text style={styles.selectedHeightDisplay}>
            {selectedHeight ? `${selectedHeight} cm` : "Select your height"}
          </Text>
          <View style={[styles.indicatorLine, styles.rightLine]} />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, !selectedHeight && styles.disabledButton]}
          onPress={saveAndGoBack}
        >
          <Text style={styles.saveButtonText}>
            {selectedHeight ? `Save ${selectedHeight} cm` : "Select height"}
          </Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 22,
    color: "#590D22",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Poppins-Medium",
  },
  heightContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  guideLine: {
    position: "absolute",
    height: "100%",
    width: 2,
    backgroundColor: "#FF758F",
    zIndex: -1,
  },
  scrollContainer: {
    paddingVertical: 110,
  },
  heightOption: {
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#FFCCD5",
    borderWidth: 1,
    borderColor: "#FF8FA3",
  },
  selectedHeightOption: {
    backgroundColor: "#FF4D6D",
    transform: [{ scale: 1.1 }],
    borderColor: "#C9184A",
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  heightText: {
    fontSize: 24,
    color: "#800F2F",
    fontWeight: "500",
  },
  selectedHeightText: {
    color: "#FFF0F3",
    fontSize: 28,
    fontWeight: "bold",
  },
  cmText: {
    fontSize: 14,
    color: "#A4133C",
    marginTop: 4,
    fontWeight: "500",
  },
  bottomContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  indicatorLine: {
    height: 1,
    backgroundColor: "#FF758F",
    flex: 1,
  },
  leftLine: {
    marginRight: 15,
  },
  rightLine: {
    marginLeft: 15,
  },
  selectedHeightDisplay: {
    fontSize: 24,
    color: "#590D22",
    fontWeight: "600",
    minWidth: 150,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#A4133C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "80%",
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
    color: "#FFF0F3",
    fontSize: 18,
    fontWeight: "600",
  },
});
