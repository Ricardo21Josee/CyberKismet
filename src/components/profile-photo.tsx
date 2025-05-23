import { Photo } from "@/types/profile";
import { Image } from "expo-image";
import { FC } from "react";
import { View } from "react-native";

// Props del componente ProfilePhoto / ProfilePhoto component props
interface Props {
  photo: Photo; // Foto a mostrar / Photo to display
}

// Componente para mostrar una foto de perfil / Component to display a profile photo
export const ProfilePhoto: FC<Props> = ({ photo }) => {
  return (
    // Contenedor principal cuadrado y redondeado para la foto / Main square and rounded container for the photo
    <View className="w-full aspect-square rounded-md overflow-hidden ">
      {/* Imagen de perfil optimizada / Optimized profile image */}
      <Image
        source={photo.photo_url}
        className="flex-1 w-full bg-neutral-200"
      />
    </View>
  );
};
