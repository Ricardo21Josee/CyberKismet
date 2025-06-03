import {
  useCreateChannel, // Hook para crear un canal en Sendbird / Hook to create a channel in Sendbird
  useLikes, // Hook para obtener la lista de likes / Hook to get the list of likes
  useMatch, // Hook para gestionar el estado de match / Hook to manage match state
  useRemoveLike, // Hook para eliminar un like / Hook to remove a like
} from "@/api/profiles";
import { ProfileView } from "@/components/profile-view"; // Componente para mostrar el perfil / Profile display component

import { supabase } from "@/lib/supabase"; // Cliente de Supabase / Supabase client
import { transformPublicProfile } from "@/utils/profile"; // Utilidad para transformar el perfil / Utility to transform profile
import { Ionicons } from "@expo/vector-icons"; // Iconos de Expo / Expo icons
import { useConnection } from "@sendbird/uikit-react-native";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router"; // Navegación y utilidades de rutas / Navigation and route utilities
import {
  ActivityIndicator, // Indicador de carga / Loading indicator
  Alert, // Alertas nativas / Native alerts
  Pressable, // Botón presionable / Pressable button
  ScrollView, // Scroll vertical / Vertical scroll
  Text, // Texto / Text
  View, // Contenedor de vista / View container
} from "react-native";

// Componente principal de la pantalla de detalle de un like
// Main component for the like detail screen
const Page = () => {
  const { id } = useLocalSearchParams(); // Obtiene el id del like desde la URL / Gets the like id from the URL
  const { mutate: remove, isPending: removePending } = useRemoveLike(); // Hook para eliminar like / Hook to remove like
  const { isPending: matchPending } = useMatch(); // Estado de match en proceso / Match pending state
  const { mutateAsync: createChannel } = useCreateChannel(); // Hook para crear canal / Hook to create channel
  const { connect } = useConnection();

  const { data, refetch } = useLikes(); // Obtiene y refresca la lista de likes / Gets and refreshes likes list
  const like = data.find((like) => like.id === id); // Busca el like actual por id / Finds the current like by id
  let profile;

  // Función para eliminar el like (rechazar)
  // Function to remove (reject) the like
  const handleRemove = () => {
    if (like) {
      remove(like.id, {
        onSuccess: () => {
          router.back(); // Vuelve a la pantalla anterior / Go back to previous screen
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong, please try again later"); // Alerta de error / Error alert
        },
      });
    }
  };

  // Función para aceptar el match y crear el canal de chat
  // Function to accept the match and create the chat channel
  const handleMatch = async () => {
    if (!like) return;
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) {
      Alert.alert("Error", "No se pudo obtener el usuario autenticado");
      return;
    }

    // Obtener el perfil del usuario actual usando el user_id de Auth
    const { data: myProfile, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (error || !myProfile) {
      Alert.alert("Error", "No se pudo obtener tu perfil");
      return;
    }

    const user1 = myProfile.id;
    const user2 = like.profile.id;
    const channel = `channel_${user1}_${user2}`;
    const channelData = await createChannel({ user1, user2, channel });

    try {
      if (!channelData?.channel_url) {
        Alert.alert("Error", "No se pudo crear el canal de chat");
        return;
      }

      // AUTENTICA AL USUARIO EN SENDBIRD
      await connect(user1);

      // Elimina el like después de crear el canal
      await remove(like.id);

      // Refresca la lista de likes y sugerencias
      await refetch();

      // Redirige al chat
      router.push(`/matches/${channelData.channel_url}`);
    } catch (e: any) {
      Alert.alert(
        "Error",
        e?.message || "No se pudo crear el chat, intenta más tarde"
      );
      console.log("Error al crear canal:", e);
    }
  };

  // Si no existe el like, redirige a la lista de likes
  // If like does not exist, redirect to likes list
  if (!like) {
    return <Redirect href={"/likes"} />;
  }

  profile = transformPublicProfile(like.profile); // Transforma el perfil para mostrarlo / Transform profile for display

  return (
    <View className="flex-1 bg-FFF0F3">
      {/* Configuración del header de la pantalla */}
      {/* Screen header configuration */}
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPressOut={() => router.back()} // Botón para volver atrás / Back button
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text
                className="text-base font-poppins-medium text-590D22"
                suppressHighlighting
              >
                All
              </Text>
            </Pressable>
          ),
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      {/* Perfil del usuario que dio like */}
      {/* Profile of the user who liked */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-5 mt-6">
          <ProfileView profile={profile} />
        </View>
      </ScrollView>

      {/* Botones de acción: rechazar y chatear */}
      {/* Action buttons: reject and chat */}
      <View className="absolute bottom-5 left-0 right-0 px-5 flex-row justify-between">
        {/* Botón de Rechazar / Reject button */}
        <Pressable
          onPress={handleRemove}
          disabled={removePending || matchPending}
          className={`h-16 w-16 rounded-full items-center justify-center ${
            removePending || matchPending ? "bg-[#FFB3C1]" : "bg-[#FF4D6D]"
          } shadow-md`}
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          {removePending ? (
            <ActivityIndicator color="white" /> // Indicador de carga / Loading indicator
          ) : (
            <Ionicons name="close" size={32} color="white" /> // Icono de cerrar / Close icon
          )}
        </Pressable>

        {/* Botón de Chat / Chat button */}
        <Pressable
          onPress={handleMatch}
          disabled={removePending || matchPending}
          className={`h-16 w-16 rounded-full items-center justify-center ${
            removePending || matchPending ? "bg-[#FFB3C1]" : "bg-[#FF4D6D]"
          } shadow-md`}
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          {matchPending ? (
            <ActivityIndicator color="white" /> // Indicador de carga / Loading indicator
          ) : (
            <Ionicons name="chatbubble-outline" size={28} color="white" /> // Icono de chat / Chat icon
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Page; // Exporta el componente principal / Export main component
