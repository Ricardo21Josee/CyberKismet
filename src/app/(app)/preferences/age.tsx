import { useUpdateAgeRange } from "@/api/my-profile";
import { StackHeaderV4 } from "@/components/stack-header-v4";
import { useEdit } from "@/store/edit";
import { Slider } from "@miblanchard/react-native-slider";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const Page = () => {
  const { edits } = useEdit();
  const [ageRange, setAgeRange] = useState([
    edits?.min_age || 18,
    edits?.max_age || 100,
  ]);

  const { mutate, reset } = useUpdateAgeRange();

  const handlePress = () => {
    mutate(
      { min_age: ageRange[0], max_age: ageRange[1] },
      {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong, please try again later.");
          reset();
          router.back();
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <StackHeaderV4
        title="Age Range"
        titleStyle={styles.headerTitle}
        onPressBack={handlePress}
      />

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Select age range</Text>

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

      <Text style={styles.description}>
        Adjust the sliders to set your preferred age range for matches
      </Text>
    </View>
  );
};

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
