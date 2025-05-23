import { useSignOut } from "@/api/auth";
import { StackHeaderV2 } from "@/components/stack-header-v2";
import { Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { mutate } = useSignOut();

  return (
    <View className="flex-1 bg-[#FFFFFF] p-5">
      <StackHeaderV2 title="Settings" />
      <TouchableOpacity
        className="p-3 border-y border-[#FFB3C1]"
        onPress={async () => mutate()}
      >
        <Text className="text-base text-center font-poppins-regular text-[#590D22]">
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
