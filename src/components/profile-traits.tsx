import { Profile } from "@/types/profile";
import { cn } from "@/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { ScrollView, Text, View } from "react-native";

// Props del componente ProfileTraits / ProfileTraits component props
interface Props {
  profile: Profile;
}

// Componente para mostrar los rasgos del perfil / Component to display profile traits
export const ProfileTraits: FC<Props> = ({ profile }) => {
  return (
    // Contenedor principal con fondo blanco y bordes redondeados / Main container with white background and rounded borders
    <View className="bg-white border border-neutral-200 rounded-lg">
      {/* Scroll horizontal para los rasgos / Horizontal scroll for traits */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {profile?.traits.map(({ key, icon, label }, index) => {
          if (!label) return null;
          return (
            // Contenedor de cada rasgo / Container for each trait
            <View key={key} className="py-2">
              <View
                className={cn(
                  "flex-row items-center gap-2 px-5 py-2  border-gray-300",
                  { "border-r-[0.25px]": index !== profile.traits.length - 1 }
                )}
              >
                {/* Icono del rasgo / Trait icon */}
                <Ionicons
                  name={icon as keyof typeof Ionicons.glyphMap}
                  className="text-2xl"
                />
                {/* Etiqueta del rasgo / Trait label */}
                <Text>{label}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
