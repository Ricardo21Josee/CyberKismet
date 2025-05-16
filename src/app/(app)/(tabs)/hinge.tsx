import { useMyProfile } from "@/api/my-profile";
import { Card } from "@/components/card";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HingeLogo from "~/assets/images/hinge-logo.svg";

export default function Page() {
  const { data: profile } = useMyProfile();
  return (
    <SafeAreaView className="flex-1 bg-[#FFF0F3]">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="px-5 border-b border-[#FFB3C1]">
        <View className="flex-row items-center justify-between">
          <HingeLogo width={64} />
          <View className="flex-row items-center gap-4">
            <Link href={"/preferences"} suppressHighlighting>
              <Ionicons name="options-outline" size={24} color="#800F2F" />
            </Link>
            <Link href={"/settings"} suppressHighlighting>
              <Ionicons name="settings-outline" size={24} color="#800F2F" />
            </Link>
          </View>
        </View>
        <View className="items-center gap-2 my-12">
          <Pressable
            className="h-32 aspect-square rounded-full border-4 border-[#C9184A] p-1"
            onPress={() => router.push("/profile")}
          >
            <Image
              source={profile?.avatar_url}
              className="flex-1 rounded-full bg-[#FFCCD5]"
            />
          </Pressable>
          <Text className="text-2xl font-poppins-semibold text-[#590D22]">
            {profile?.first_name}
          </Text>
        </View>
      </View>
      <View className="flex-1 p-5 gap-4">
        <Card
          key={"help"}
          icon={<Ionicons name="help" size={24} color="#800F2F" />}
          title="Help Center"
          subtitle="Safety, Security, and more"
        />
        <Card
          key={"what-works"}
          icon={<Ionicons name="bulb-outline" size={24} color="#800F2F" />}
          title="What Works"
          subtitle="Check out our expert dating tips"
        />
      </View>
    </SafeAreaView>
  );
}
