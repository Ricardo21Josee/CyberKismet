import { useMyProfile } from "@/api/my-profile";
import {
  useChildren,
  useCovidVaccine,
  useEthnicities,
  useFamilyPlans,
  useGenders,
  usePets,
  usePrompts,
  usePronouns,
  useSexualities,
  useZodiacSigns,
} from "@/api/options";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function Page() {
  const { isPending, isError } = useMyProfile();

  usePrompts();
  useChildren();
  useCovidVaccine();
  useEthnicities();
  useFamilyPlans();
  useGenders();
  usePets();
  usePronouns();
  useSexualities();
  useZodiacSigns();

  if (isPending) {
    return (
      <View className="flex-1 bg-[#FFF0F3] items-center justify-center">
        <ActivityIndicator size={"small"} color="#A4133C" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-[#FFF0F3] items-center justify-center">
        <Text className="text-[#590D22]">Something went wrong.</Text>
      </View>
    );
  }

  return <Redirect href={"/(app)/(tabs)"} />;
}
