import { useUpdateDistance } from "@/api/my-profile";
import { StackHeaderV4 } from "@/components/stack-header-v4";
import { useEdit } from "@/store/edit";
import { Slider } from "@miblanchard/react-native-slider";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const Page = () => {
  const { edits } = useEdit();
  const [distance, setDistance] = useState(edits?.max_distance_km || 160);

  const { mutate, reset } = useUpdateDistance();

  const handlePress = () => {
    mutate(
      { distance: distance },
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
    <View className="flex-1 px-5 pt-10" style={{ backgroundColor: "#FFF0F3" }}>
      <StackHeaderV4 title="Maximum distance" onPressBack={handlePress} />

      <View className="flex-1 justify-center">
        <View className="mb-16 px-2">
          <Text
            className="text-lg font-semibold mb-6"
            style={{ color: "#590D22" }}
          >
            Set your maximum distance preference:
          </Text>

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
