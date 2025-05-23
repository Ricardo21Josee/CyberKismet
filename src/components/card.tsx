import React, { FC, ReactNode, forwardRef } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

// Props del componente Card / Card component props
interface Props extends PressableProps {
  icon: ReactNode; // Icono a mostrar en la tarjeta / Icon to display in the card
  title: string; // Título de la tarjeta / Card title
  subtitle: string; // Subtítulo de la tarjeta / Card subtitle
}

// Componente de tarjeta reutilizable / Reusable card component
export const Card: FC<Props> = forwardRef<View, Props>(
  ({ icon, title, subtitle, ...rest }, ref) => {
    return (
      // Tarjeta presionable con icono, título y subtítulo / Pressable card with icon, title, and subtitle
      <Pressable
        ref={ref}
        {...rest}
        className="flex-row items-center gap-4 border border-neutral-300 rounded-md p-3"
      >
        {/* Contenedor del icono / Icon container */}
        <View className="bg-zinc-300 h-12 aspect-square rounded-full items-center justify-center">
          {icon}
        </View>
        {/* Contenedor de texto / Text container */}
        <View>
          <Text className="text-base font-poppins-medium">{title}</Text>
          <Text className="text-sm font-poppins-light">{subtitle}</Text>
        </View>
      </Pressable>
    );
  }
);

Card.displayName = "Card"; // Nombre de display para el componente / Display name for the component
