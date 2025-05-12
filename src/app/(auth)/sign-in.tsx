import { VideoBackground } from "@/components/video-background";
import { Link, Stack } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <VideoBackground source={require("~/assets/images/background.mp4")}>
        <SafeAreaView className="flex-1 p-10">
          <View className="flex-1 items-center pt-14">
            <View className="h-4" />
            <Text className="text-[#800F2F] text-xl font-poppins-semibold">
              Swipe, connect, and fall in love with...
            </Text>
          </View>
          <Link href={"/phone"} asChild>
            <Pressable className="bg-[#590D22] h-16 items-center justify-center rounded-full">
              <Text className="text-white text-lg font-poppins-semibold">
                Sign in with Phone Number
              </Text>
            </Pressable>
          </Link>
        </SafeAreaView>
      </VideoBackground>
    </View>
  );
}
