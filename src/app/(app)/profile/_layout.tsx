import { useIsMutating } from "@tanstack/react-query"; // Hook para saber si hay mutaciones pendientes / Hook to check if there are pending mutations
import { Stack } from "expo-router"; // Componente de navegación tipo stack / Stack navigation component
import { ActivityIndicator, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Layout() {
  const isPending = useIsMutating({ mutationKey: ["updateProfile"] }); // ¿Hay actualización de perfil pendiente? / Is profile update pending?

  return (
    <>
      {/* Overlay de carga cuando hay una mutación pendiente / Loading overlay when a mutation is pending */}
      {!!isPending && (
        <View className="bg-black/50 flex-1 absolute left-0 top-0 right-0 bottom-0 z-10 items-center justify-center">
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      )}
      {/* Navegación tipo stack para la sección de perfil / Stack navigation for profile section */}
      <Stack></Stack>
    </>
  );
}
