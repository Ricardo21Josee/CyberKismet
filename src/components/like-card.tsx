import { Like } from "@/api/profiles/types"; // Tipo de dato para "Like" / "Like" data type
import { BlurView } from "expo-blur"; // Componente para desenfoque / Blur effect component
import { Image } from "expo-image"; // Componente de imagen optimizada / Optimized image component
import { FC } from "react";
import { Text, View } from "react-native";

// Props del componente LikeCard / LikeCard component props
interface Props {
  like: Like; // Objeto de tipo Like / Like object
}

// Componente para mostrar una tarjeta de "like" recibido / Component to display a received "like" card
export const LikeCard: FC<Props> = ({ like: { photo_url, profile } }) => {
  return (
    // Contenedor principal de la tarjeta / Main card container
    <View className="bg-white flex-1 rounded-lg overflow-hidden border border-neutral-200">
      {/* Sección superior con mensaje y nombre / Top section with message and name */}
      <View className="p-4 gap-5">
        <Text className="text-base font-poppins-light">{`Liked your ${
          photo_url ? "photo" : "answer"
        }`}</Text>
        <Text className="text-xl font-poppins-medium">
          {profile.first_name}
        </Text>
      </View>
      {/* Imagen de perfil con efecto de desenfoque / Profile image with blur effect */}
      <View className="flex-1 bg-neutral-200 aspect-square w-full">
        <Image source={profile.photos[0].photo_url} className="flex-1" />
        <BlurView
          className="absolute top-0 right-0 bottom-0 left-0"
          intensity={30}
          tint="light"
        ></BlurView>
      </View>
    </View>
  );
};
