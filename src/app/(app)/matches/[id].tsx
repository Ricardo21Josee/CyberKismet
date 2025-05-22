import { useUnmatch } from "@/api/profiles";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useGroupChannel } from "@sendbird/uikit-chat-hooks";
import {
  createGroupChannelFragment,
  GroupChannelContexts,
  useSendbirdChat,
} from "@sendbird/uikit-react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Alert, Pressable, Text, View } from "react-native";

const CustomHeader = () => {
  const { headerTitle } = useContext(GroupChannelContexts.Fragment);
  const { mutate } = useUnmatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: "#FFF0F3", // Light pink background
        },
        headerTitleStyle: {
          color: "#800F2F", // Dark red for title
        },
        headerLeft: () => (
          <View className="flex-row items-center gap-2">
            <Pressable onPressOut={() => router.back()}>
              <Ionicons
                name="chevron-back"
                className="text-2xl"
                color="#590D22" // Dark red for back icon
                suppressHighlighting
              />
            </Pressable>

            <Text className="text-lg font-poppins-medium text-800F2F">
              {headerTitle}
            </Text>
          </View>
        ),
        title: "",
        headerRight: () => (
          <Pressable
            onPressOut={() => {
              Alert.alert(
                "Are you sure?",
                `Unmatching will delete the match for both you and ${headerTitle}`,
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Unmatch",
                    onPress: () => {
                      mutate(id, {
                        onSuccess: () => {
                          router.navigate("/matches/");
                        },
                        onError: () => {
                          Alert.alert(
                            "Error",
                            "Something went wrong, please try again later."
                          );
                        },
                      });
                    },
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            <Ionicons
              name="cut-outline"
              className="text-2xl"
              color="#590D22" // Dark red for unmatch icon
              suppressHighlighting
            />
          </Pressable>
        ),
      }}
    />
  );
};

const GroupChannelFragment = createGroupChannelFragment({
  Header: CustomHeader,
});

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const height = useHeaderHeight();

  const { sdk } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, id);
  if (!channel) return <Text>Canal no encontrado o no tienes acceso</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF0F3" }}>
      <GroupChannelFragment
        channel={channel}
        onChannelDeleted={() => {
          router.navigate("/matches");
        }}
        onPressHeaderLeft={() => {
          router.back();
        }}
        onPressHeaderRight={() => {}}
        keyboardAvoidOffset={height}
      />
    </View>
  );
}
