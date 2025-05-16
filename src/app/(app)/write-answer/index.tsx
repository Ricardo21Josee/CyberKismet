import { Answer } from "@/api/my-profile/types";
import { usePrompts } from "@/api/options";
import { Prompt } from "@/api/options/types";
import { StackHeaderV3 } from "@/components/stack-header-v3";
import { useEdit } from "@/store/edit";
import * as Crypto from "expo-crypto";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Page() {
  const { data: prompts } = usePrompts();
  const { promptId, itemId } = useLocalSearchParams();

  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [text, setText] = useState("");

  const { edits, setEdits } = useEdit();

  useEffect(() => {
    const prompt = prompts.find((item) => item.id.toString() === promptId);
    setPrompt(prompt || null);

    if (itemId) {
      const answer = edits?.answers?.find((item: Answer) => item.id === itemId);
      setText(answer?.answer_text || "");
    }
  }, [prompts, promptId, itemId, edits]);

  const handlePressCancel = () => {
    router.dismissTo("/(app)/profile/(tabs)");
  };

  const handlePressDone = () => {
    if (!edits) return;

    if (itemId) {
      if (text) {
        const updatedAnswers = edits?.answers?.map((item: Answer) => {
          if (item.id === itemId) {
            return {
              ...item,
              answer_text: text,
              prompt_id: prompt?.id,
              question: prompt?.question,
            } as Answer;
          }
          return item;
        });
        setEdits({
          ...edits,
          answers: updatedAnswers,
        });
      }
    } else {
      const updatedAnswers = [
        ...edits.answers,
        {
          id: "temp_" + Crypto.randomUUID(),
          answer_text: text,
          answer_order: edits.answers.length || 0,
          prompt_id: prompt?.id,
          question: prompt?.question,
        } as Answer,
      ].filter((item) => item.answer_text);

      setEdits({
        ...edits,
        answers: updatedAnswers,
      });
    }

    router.dismissTo("/(app)/profile/(tabs)");
  };

  return (
    <View className="flex-1 bg-[#FFF0F3] p-5">
      <StackHeaderV3
        title="Write answer"
        onPressCancel={handlePressCancel}
        onPressDone={handlePressDone}
      />
      <View className="gap-5">
        <Link
          href={{
            pathname: "/prompts",
            params: {
              itemId,
            },
          }}
          asChild
          suppressHighlighting
        >
          <Pressable className="border border-[#FFB3C1] rounded-md px-5 py-6 bg-[#FFF0F3]">
            <Text className="text-base text-[#590D22]">{prompt?.question}</Text>
          </Pressable>
        </Link>
        <TextInput
          className="border border-[#FFB3C1] rounded-md p-5 h-36 bg-[#FFF0F3] text-[#590D22]"
          multiline={true}
          numberOfLines={6}
          maxLength={255}
          selectionColor="#A4133C"
          placeholderTextColor="#FF8FA3"
          value={text}
          onChangeText={setText}
        />
      </View>
    </View>
  );
}
