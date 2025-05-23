import { useSignOut } from "@/api/auth"; // Hook para cerrar sesión / Hook to sign out
import { StackHeaderV2 } from "@/components/stack-header-v2"; // Header personalizado para la pantalla / Custom header for the screen
import { Text, TouchableOpacity, View } from "react-native"; // Componentes básicos de UI / Basic UI components

const Page = () => {
  const { mutate } = useSignOut(); // Función para ejecutar el cierre de sesión / Function to execute sign out

  return (
    // Contenedor principal de la pantalla de configuración / Main container for settings screen
    <View className="flex-1 bg-[#FFFFFF] p-5">
      {/* Header de la pantalla de configuración / Settings screen header */}
      <StackHeaderV2 title="Settings" />
      {/* Botón para cerrar sesión / Log out button */}
      <TouchableOpacity
        className="p-3 border-y border-[#FFB3C1]"
        onPress={async () => mutate()}
      >
        <Text className="text-base text-center font-poppins-regular text-[#590D22]">
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
