import { createGroupChannelListFragment } from "@sendbird/uikit-react-native"; // Importa el fragmento de lista de canales de grupo de Sendbird / Imports navigation utilities
import { router, Stack } from "expo-router"; // Importa utilidades de navegación / Imports navigation utilities
import { Text, View } from "react-native"; // Importa componentes básicos de UI / Imports basic UI components

// Componente de header personalizado para la pantalla / Custom header component for the screen
const CustomHeader = () => {
  return (
    <Stack.Screen
      options={{
        headerTitle: "", // Sin título en el header / No title in the header
        headerShadowVisible: false, // Sin sombra en el header / No header shadow
        headerStyle: {
          backgroundColor: "#FFFFFF", // Fondo blanco del header / White header background
        },
      }}
    />
  );
};

// Crea el fragmento de lista de canales de grupo con header personalizado
// Creates the group channel list fragment with custom header
const GroupChannelListFragment = createGroupChannelListFragment({
  Header: CustomHeader,
});

// Componente principal de la pantalla de matches / Main component for the matches screen
export default function Page() {
  return (
    <View className="flex-1 bg-[#FFFFFF]">
      {/* Título de la pantalla de matches / Matches screen title */}
      <View className="px-5 pb-5">
        <Text className="text-3xl font-poppins-semibold text-[#590D22]">
          Matches
        </Text>
      </View>
      {/* Lista de canales de grupo (chats) de Sendbird / Sendbird group channel (chat) list */}
      <GroupChannelListFragment
        channelListQueryParams={{
          includeEmpty: true, // Incluir canales vacíos en la lista / Include empty channels in the list
        }}
        onPressCreateChannel={() => {}} // Acción al crear canal (vacío aquí) / Action on create channel (empty here)
        onPressChannel={(channel) => {
          router.navigate(`/matches/${channel.url}`); // Navega al chat seleccionado / Navigate to selected chat
        }}
      />
    </View>
  );
}
