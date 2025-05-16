import { List } from "@/components/list";
import { StackHeaderV2 } from "@/components/stack-header-v2";
import { useEdit } from "@/store/edit";
import { memberPreferences } from "@/utils/preferences";
import { Text, View } from "react-native";

export default function Page() {
  const { edits } = useEdit();

  if (!edits) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "#FFF0F3" }}
      >
        <Text style={{ color: "#590D22" }}>Something went wrong.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5" style={{ backgroundColor: "#FFF0F3" }}>
      <StackHeaderV2 title="Dating Preferences" />
      <View style={{ marginTop: 16 }}>
        <List
          title="Dating Preferences"
          data={memberPreferences}
          profile={edits}
        />
      </View>
    </View>
  );
}
