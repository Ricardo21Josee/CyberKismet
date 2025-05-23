import { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Props del componente Empty / Empty component props
interface Props {
  title: string; // Título principal / Main title
  subTitle: string; // Subtítulo / Subtitle
  primaryText?: string; // Texto del botón primario / Primary button text
  secondaryText?: string; // Texto del botón secundario / Secondary button text
  onPrimaryPress?: () => void; // Acción al presionar el botón primario / Action on primary button press
  onSecondaryPress?: () => void; // Acción al presionar el botón secundario / Action on secondary button press
}

// Componente para mostrar estados vacíos o sin datos / Component to show empty or no-data states
export const Empty: FC<Props> = ({
  title,
  subTitle,
  onPrimaryPress,
  onSecondaryPress,
  primaryText,
  secondaryText,
}) => {
  return (
    // Contenedor principal seguro y centrado / Main safe and centered container
    <SafeAreaView className="flex-1 p-5 bg-white justify-center gap-8">
      <View className="gap-2">
        {/* Título principal centrado / Centered main title */}
        <Text className="text-2xl font-playfair-semibold text-center">
          {title}
        </Text>
        {/* Subtítulo centrado / Centered subtitle */}
        <Text className="text-base font-poppins-light text-center">
          {subTitle}
        </Text>
      </View>
      <View className="gap-2 px-5">
        {/* Botón primario si existe texto / Primary button if text exists */}
        {primaryText && (
          <Pressable
            className="h-14 bg-black items-center justify-center rounded-full w-full"
            onPress={onPrimaryPress}
          >
            <Text className="text-white text-base font-poppins-medium">
              {primaryText}
            </Text>
          </Pressable>
        )}
        {/* Botón secundario si existe texto / Secondary button if text exists */}
        {secondaryText && (
          <Pressable
            className="h-14 bg-white items-center justify-center rounded-full border border-neutral-400"
            onPress={onSecondaryPress}
          >
            <Text className="text-black text-base font-poppins-medium ">
              {secondaryText}
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};
