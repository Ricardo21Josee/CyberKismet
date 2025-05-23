import { cn } from "@/utils/cn"; // Utilidad para combinar clases / Utility to combine classes
import { Ionicons } from "@expo/vector-icons"; // Iconos de Ionicons / Ionicons icons
import React, { FC } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

// Props del botón flotante de acción (FAB) / Floating Action Button (FAB) props
interface Props {
  disabled?: boolean; // Si el botón está deshabilitado / If the button is disabled
  onPress?: () => void; // Acción al presionar / Action on press
  loading?: boolean; // Si muestra indicador de carga / If shows loading indicator
  iconName?: keyof typeof Ionicons.glyphMap; // Nombre del icono / Icon name
  className?: string; // Clases adicionales para el botón / Extra classes for the button
  iconClassName?: string; // Clases para el icono / Classes for the icon
  loaderClassName?: string; // Clases para el loader / Classes for the loader
}

// Componente de botón flotante de acción / Floating Action Button component
export const Fab: FC<Props> = ({
  disabled = false,
  onPress,
  loading = false,
  iconName = "chevron-forward",
  className,
  iconClassName,
  loaderClassName,
}) => {
  return (
    // Botón presionable circular / Circular pressable button
    <Pressable
      className={cn(
        "h-16 aspect-square rounded-full justify-center items-center bg-fuchsia-900",
        {
          "bg-neutral-200": disabled && !loading, // Color cuando está deshabilitado / Color when disabled
          "opacity-50": disabled, // Opacidad cuando está deshabilitado / Opacity when disabled
        },
        className
      )}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        // Indicador de carga si está cargando / Loader indicator if loading
        <ActivityIndicator className={cn(" text-white", loaderClassName)} />
      ) : (
        // Icono dentro del botón / Icon inside the button
        <View
          className={cn(
            "text-white",
            { "text-neutral-400": disabled },
            iconClassName
          )}
        >
          <Ionicons
            name={iconName}
            className={cn(
              "text-2xl text-white",
              { "text-neutral-400": disabled },
              iconClassName
            )}
          />
        </View>
      )}
    </Pressable>
  );
};
