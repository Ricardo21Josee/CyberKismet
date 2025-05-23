import { Answer } from "@/api/my-profile/types"; // Tipo de respuesta / Answer type
import { usePrompts } from "@/api/options"; // Hook para obtener prompts / Hook to get prompts
import { Prompt } from "@/api/options/types"; // Tipo de prompt / Prompt type
import { StackHeaderV3 } from "@/components/stack-header-v3"; // Header personalizado para la pantalla / Custom header for the screen
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import * as Crypto from "expo-crypto"; // Utilidad para generar UUID / Utility to generate UUID
import { Link, router, useLocalSearchParams } from "expo-router"; // Utilidades de navegación / Navigation utilities
import { useEffect, useState } from "react"; // Hooks de React / React hooks
import { Pressable, Text, TextInput, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { data: prompts } = usePrompts(); // Lista de prompts disponibles / List of available prompts
  const { promptId, itemId } = useLocalSearchParams(); // Parámetros de navegación / Navigation parameters

  const [prompt, setPrompt] = useState<Prompt | null>(null); // Estado para el prompt actual / State for current prompt
  const [text, setText] = useState(""); // Estado para el texto de la respuesta / State for answer text

  const { edits, setEdits } = useEdit(); // Obtiene y actualiza los datos editados / Gets and sets edited data

  // Efecto para cargar el prompt y la respuesta existente / Effect to load prompt and existing answer
  useEffect(() => {
    const prompt = prompts.find((item) => item.id.toString() === promptId);
    setPrompt(prompt || null);

    if (itemId) {
      const answer = edits?.answers?.find((item: Answer) => item.id === itemId);
      setText(answer?.answer_text || "");
    }
  }, [prompts, promptId, itemId, edits]);

  // Maneja la acción de cancelar / Handles cancel action
  const handlePressCancel = () => {
    router.dismissTo("/(app)/profile/(tabs)");
  };

  // Maneja la acción de guardar la respuesta / Handles saving the answer
  const handlePressDone = () => {
    if (!edits) return;

    if (itemId) {
      // Actualiza una respuesta existente / Update existing answer
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
      // Agrega una nueva respuesta / Add new answer
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
    // Contenedor principal de la pantalla de respuesta / Main container for answer screen
    <View className="flex-1 bg-[#FFFFFF] p-5">
      {/* Header con acciones de cancelar y guardar / Header with cancel and save actions */}
      <StackHeaderV3
        title="Write answer"
        onPressCancel={handlePressCancel}
        onPressDone={handlePressDone}
      />
      <View className="gap-5">
        {/* Enlace para cambiar el prompt / Link to change prompt */}
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
          <Pressable className="border border-[#FFB3C1] rounded-md px-5 py-6 bg-[#FFFFFF]">
            <Text className="text-base text-[#590D22]">{prompt?.question}</Text>
          </Pressable>
        </Link>
        {/* Campo de texto para la respuesta / Text field for the answer */}
        <TextInput
          className="border border-[#FFB3C1] rounded-md p-5 h-36 bg-[#FFFFFF] text-[#590D22]"
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
