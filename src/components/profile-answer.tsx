import { Answer } from "@/types/profile";
import { FC } from "react";
import { Text, View } from "react-native";

// Props del componente ProfileAnswer / ProfileAnswer component props
interface Props {
  answer: Answer; // Respuesta a mostrar / Answer to display
}

// Componente para mostrar una respuesta de perfil / Component to display a profile answer
export const ProfileAnswer: FC<Props> = ({ answer }) => {
  return (
    // Contenedor principal estilizado para la respuesta / Main styled container for the answer
    <View className="bg-white rounded-md px-5 pt-14 pb-20 gap-5 border border-neutral-200">
      {/* Pregunta asociada a la respuesta / Question associated with the answer */}
      <Text className="text-base font-poppins-medium">{answer?.question}</Text>
      {/* Texto de la respuesta en grande / Large answer text */}
      <Text className="text-3xl font-playfair-semibold">
        {answer?.answer_text}
      </Text>
    </View>
  );
};
