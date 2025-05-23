import { PrivateProfile } from "@/api/my-profile/types"; // Tipo de perfil privado / Private profile type
import { cn } from "@/utils/cn"; // Utilidad para combinar clases / Utility to combine classes
import { Ionicons } from "@expo/vector-icons"; // Iconos de Ionicons / Ionicons icons
import { Href, Link } from "expo-router"; // Navegación y enlaces / Navigation and links
import { FC } from "react";
import { FlatList, Pressable, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

// Props del componente List / List component props
interface Props {
  data: {
    title: string; // Título del campo / Field title
    getValue: (profile: PrivateProfile) => string; // Función para obtener el valor / Function to get value
    route: string; // Ruta de navegación / Navigation route
  }[];
  title: string; // Título de la lista / List title
  profile: PrivateProfile; // Perfil del usuario / User profile
}

// Componente de lista de campos editables / Editable fields list component
export const List: FC<Props> = ({ title, data, profile }) => {
  return (
    // Lista plana de campos / Flat list of fields
    <FlatList
      scrollEnabled={false}
      data={data}
      keyExtractor={(item) => item.title}
      ListHeaderComponent={() => {
        return (
          // Encabezado de la lista / List header
          <Text className="text-base font-poppins-semibold mb-2">{title}</Text>
        );
      }}
      renderItem={({ item }) => {
        return (
          // Enlace a la pantalla de edición del campo / Link to field edit screen
          <Link href={item.route as Href} asChild>
            <Pressable className="flex-row items-center justify-between pr-5 border-b border-neutral-200 py-3">
              <View>
                {/* Título del campo / Field title */}
                <Text
                  className={cn("text-base font-poppins-regular", {
                    "text-red-700":
                      ["Name", "Age", "Location", "Gender"].includes(
                        item.title
                      ) && item.getValue(profile) === "None",
                  })}
                >
                  {item.title}
                </Text>
                {/* Valor del campo / Field value */}
                <Text
                  className={cn("text-base font-poppins-light", {
                    "text-red-700":
                      ["Name", "Age", "Location", "Gender"].includes(
                        item.title
                      ) && item.getValue(profile) === "None",
                  })}
                >
                  {item.getValue(profile!)}
                </Text>
              </View>
              {/* Icono de flecha para navegación / Chevron icon for navigation */}
              <Ionicons name="chevron-forward" className="text-base  " />
            </Pressable>
          </Link>
        );
      }}
    />
  );
};
