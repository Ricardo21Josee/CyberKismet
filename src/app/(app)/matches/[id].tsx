import { useUnmatch } from "@/api/profiles"; // Hook para deshacer match / Hook to unmatch
import { Ionicons } from "@expo/vector-icons"; // Iconos de Expo / Expo icons
import { useHeaderHeight } from "@react-navigation/elements"; // Altura del header para evitar el teclado / Header height for keyboard avoidance
import { useGroupChannel } from "@sendbird/uikit-chat-hooks"; // Hook para obtener canal de grupo / Hook to get group channel
import {
  createGroupChannelFragment,
  GroupChannelContexts,
  useSendbirdChat,
} from "@sendbird/uikit-react-native"; // Utilidades de Sendbird / Sendbird utilities
import { router, Stack, useLocalSearchParams } from "expo-router"; // Navegación y utilidades de rutas / Navigation and route utilities
import { useContext, useEffect } from "react"; // Hook de contexto de React / React context hook
import { Alert, Pressable, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

// Header personalizado para el canal de chat / Custom header for chat channel
const CustomHeader = () => {
  const { headerTitle } = useContext(GroupChannelContexts.Fragment); // Título del canal / Channel title
  const { mutate } = useUnmatch(); // Función para deshacer match / Unmatch function
  const { id } = useLocalSearchParams<{ id: string }>(); // Obtiene el id del canal / Gets channel id

  return (
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: "#FFFFFF", // Fondo claro del header / Light header background
        },
        headerTitleStyle: {
          color: "#800F2F", // Color del título (rojo vino) / Title color (wine red)
        },
        headerLeft: () => (
          // Botón para volver atrás / Back button
          <View className="flex-row items-center gap-2">
            <Pressable onPressOut={() => router.back()}>
              <Ionicons
                name="chevron-back"
                className="text-2xl"
                color="#590D22" // Color del icono de volver (rojo oscuro) / Back icon color (dark red)
                suppressHighlighting
              />
            </Pressable>
            <Text className="text-lg font-poppins-medium text-800F2F">
              {headerTitle}
            </Text>
          </View>
        ),
        title: "",
        headerRight: () => (
          // Botón para deshacer match / Unmatch button
          <Pressable
            onPressOut={() => {
              Alert.alert(
                "Are you sure?",
                `Unmatching will delete the match for both you and ${headerTitle}`,
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Unmatch",
                    onPress: () => {
                      mutate(id, {
                        onSuccess: () => {
                          router.navigate("/matches/");
                        },
                        onError: () => {
                          Alert.alert(
                            "Error",
                            "Something went wrong, please try again later."
                          );
                        },
                      });
                    },
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            <Ionicons
              name="cut-outline"
              className="text-2xl"
              color="#590D22" // Color del icono de deshacer match / Unmatch icon color
              suppressHighlighting
            />
          </Pressable>
        ),
      }}
    />
  );
};

// Fragmento de canal de grupo con header personalizado / Group channel fragment with custom header
const GroupChannelFragment = createGroupChannelFragment({
  Header: CustomHeader,
});

// Componente principal de la pantalla de chat / Main component for the chat screen
export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>(); // Obtiene el id del canal / Gets channel id
  const height = useHeaderHeight(); // Altura del header para evitar el teclado / Header height for keyboard avoidance

  const { sdk } = useSendbirdChat(); // Instancia de Sendbird SDK / Sendbird SDK instance
  const { channel } = useGroupChannel(sdk, id); // Obtiene el canal de grupo / Gets group channel

  // Forzar join si el usuario está invitado
  useEffect(() => {
    if (
      channel &&
      channel.myMemberState === "invited" &&
      channel.acceptInvitation
    ) {
      channel.acceptInvitation();
    }
  }, [channel]);

  if (!channel) return <Text>Canal no encontrado o no tienes acceso</Text>; // Si no hay canal, muestra mensaje / If no channel, show message

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Fragmento de canal de grupo de Sendbird / Sendbird group channel fragment */}
      <GroupChannelFragment
        channel={channel}
        onChannelDeleted={() => {
          router.navigate("/matches"); // Navega a la lista de matches si se elimina el canal / Go to matches list if channel is deleted
        }}
        onPressHeaderLeft={() => {
          router.back(); // Acción al presionar volver / Action on back press
        }}
        onPressHeaderRight={() => {}} // Acción al presionar el botón derecho (vacío) / Action on right button (empty)
        keyboardAvoidOffset={height} // Offset para evitar el teclado / Offset to avoid keyboard
      />
    </View>
  );
}
