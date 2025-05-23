import { Answer, Photo } from "@/types/profile";
import { FC, ReactNode } from "react";
import { View } from "react-native";
import { Fab } from "./fab";

// Props del componente ProfileItem / ProfileItem component props
interface Props {
  children: ReactNode; // Elementos hijos a renderizar / Child elements to render
  item: Photo | Answer; // Foto o respuesta a mostrar / Photo or answer to display
  type: "photo" | "answer"; // Tipo de ítem / Item type
  onLike?: (id: string, type: "photo" | "answer") => void; // Acción al dar like / Action when liking
}

// Componente para mostrar un ítem de perfil con opción de like / Component to display a profile item with like option
export const ProfileItem: FC<Props> = ({ children, item, type, onLike }) => {
  return (
    // Contenedor principal del ítem de perfil / Main container for profile item
    <View>
      {children}
      {/* Botón de like si se proporciona la función onLike / Like button if onLike function is provided */}
      {onLike && (
        <Fab
          className="absolute bottom-5 right-5 bg-white shadow-sm"
          iconName="heart-outline"
          iconClassName="text-fuchsia-900 text-4xl"
          onPress={() => onLike(item.id, type)}
        />
      )}
    </View>
  );
};
