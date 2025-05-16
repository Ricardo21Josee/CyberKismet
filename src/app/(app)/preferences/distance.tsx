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
    <View className="flex-1 px-5 py-20" style={{ backgroundColor: "#FFF0F3" }}>
      <StackHeaderV4
        title="Maximum distance"
        onPressBack={handlePress}
        // El color del título deberás configurarlo dentro del componente StackHeaderV4
      />
      <Slider
        minimumValue={1}
        maximumValue={160}
        step={1}
        value={distance}
        onValueChange={(value) => setDistance(value[0])}
        minimumTrackTintColor="#FF4D6D"
        maximumTrackTintColor="#FFB3C1"
        thumbTintColor="#C9184A"
        renderAboveThumbComponent={() => {
          return (
            <View className="items-center justify-center w-16 -left-8">
              <Text className="text-center" style={{ color: "#590D22" }}>
                {distance} km
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Page;
