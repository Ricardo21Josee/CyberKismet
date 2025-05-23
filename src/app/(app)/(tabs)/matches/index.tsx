import { createGroupChannelListFragment } from "@sendbird/uikit-react-native";
import { router, Stack } from "expo-router";
import { Text, View } from "react-native";

const CustomHeader = () => {
  return (
    <Stack.Screen
      options={{
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    />
  );
};

const GroupChannelListFragment = createGroupChannelListFragment({
  Header: CustomHeader,
});

export default function Page() {
  return (
    <View className="flex-1 bg-[#FFFFFF]">
      <View className="px-5 pb-5">
        <Text className="text-3xl font-poppins-semibold text-[#590D22]">
          Matches
        </Text>
      </View>
      <GroupChannelListFragment
        channelListQueryParams={{
          includeEmpty: true,
        }}
        onPressCreateChannel={() => {}}
        onPressChannel={(channel) => {
          router.navigate(`/matches/${channel.url}`);
        }}
      />
    </View>
  );
}
