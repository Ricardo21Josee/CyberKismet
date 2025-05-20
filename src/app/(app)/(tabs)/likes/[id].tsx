import { useLikes, useMatch, useRemoveLike } from "@/api/profiles";
import { ProfileView } from "@/components/profile-view";
import { transformPublicProfile } from "@/utils/profile";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams();
  const { mutate: remove, isPending: removePending } = useRemoveLike();
  const { mutate: match, isPending: matchPending } = useMatch();

  const { data } = useLikes();
  const like = data.find((like) => like.id === id);
  let profile;

  const handleRemove = () => {
    if (like) {
      remove(like.id, {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong, please try again later");
        },
      });
    }
  };

  const handleMatch = () => {
    if (like) {
      match(like.id, {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong, please try again later");
        },
      });
    }
  };

  if (!like) {
    return <Redirect href={"/likes"} />;
  }

  profile = transformPublicProfile(like.profile);

  return (
    <View className="flex-1 bg-FFF0F3">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPressOut={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text
                className="text-base font-poppins-medium text-590D22"
                suppressHighlighting
              >
                All
              </Text>
            </Pressable>
          ),
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#FFF0F3",
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-5 mt-6">
          <ProfileView profile={profile} />
        </View>
      </ScrollView>

      {/* Botones de acción simplificados */}
      <View className="absolute bottom-5 left-0 right-0 px-5 flex-row justify-between">
        {/* Botón de Rechazar */}
        <Pressable
          onPress={handleRemove}
          disabled={removePending || matchPending}
          className={`h-16 w-16 rounded-full items-center justify-center ${
            removePending || matchPending ? "bg-[#FFB3C1]" : "bg-[#FF4D6D]"
          } shadow-md`}
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          {removePending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons name="close" size={32} color="white" />
          )}
        </Pressable>

        {/* Botón de Chat */}
        <Pressable
          onPress={handleMatch}
          disabled={removePending || matchPending}
          className={`h-16 w-16 rounded-full items-center justify-center ${
            removePending || matchPending ? "bg-[#FFB3C1]" : "bg-[#FF4D6D]"
          } shadow-md`}
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          {matchPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons name="chatbubble-outline" size={28} color="white" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Page;
