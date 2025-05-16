import { AnswerList } from "@/components/answer-list";
import { List } from "@/components/list";
import { PhotoGrid } from "@/components/photo-grid";
import { useEdit } from "@/store/edit";
import { identity } from "@/utils/identity";
import { vitals } from "@/utils/vitals";
import { ScrollView, Text, View } from "react-native";

export default function Page() {
  const { edits, gridActive } = useEdit();

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
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFF0F3", paddingTop: 40 }}
      contentContainerStyle={{ paddingBottom: 80, gap: 20 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={!gridActive}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            marginBottom: 8,
            color: "#800F2F",
          }}
        >
          My Photos
        </Text>
        <PhotoGrid profile={edits} />
        <View style={{ height: 40 }} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            marginBottom: 8,
            color: "#800F2F",
          }}
        >
          My Answers
        </Text>
        <AnswerList profile={edits} />
      </View>
      <View style={{ paddingLeft: 20, gap: 40 }}>
        <List title="My Vitals" data={vitals} profile={edits} />
        <List title="Identity" data={identity} profile={edits} />
      </View>
    </ScrollView>
  );
}
