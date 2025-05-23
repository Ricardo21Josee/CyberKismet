import {
  useLikeProfile, // Hook para dar like a un perfil / Hook to like a profile
  useProfiles, // Hook para obtener perfiles / Hook to get profiles
  useReviewProfiles, // Hook para revisar perfiles saltados / Hook to review skipped profiles
  useSkipProfile, // Hook para saltar un perfil / Hook to skip a profile
} from "@/api/profiles";
import { Empty } from "@/components/empty"; // Componente para mostrar estado vacío o error / Empty or error state component
import { Fab } from "@/components/fab"; // Botón flotante de acción / Floating action button
import { Loader } from "@/components/loader"; // Componente de carga / Loader component
import { ProfileView } from "@/components/profile-view"; // Vista de perfil de usuario / User profile view
import { useRefreshOnFocus } from "@/hooks/refetch"; // Refresca datos al enfocar pantalla / Refetch data on screen focus
import { transformPublicProfile } from "@/utils/profile"; // Transforma datos de perfil público / Transform public profile data
import { Ionicons } from "@expo/vector-icons"; // Iconos de Expo / Expo icons
import { useQueryClient } from "@tanstack/react-query"; // Cliente de queries para cache / Query client for cache
import { Link, router } from "expo-router"; // Navegación y enlaces / Navigation and links
import { useState } from "react"; // Estado de React / React state
import { Alert, ScrollView, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { data, isFetching, error, refetch } = useProfiles(); // Obtiene perfiles y estados de carga/error / Gets profiles and loading/error states
  useRefreshOnFocus(refetch); // Refresca los datos al volver a la pantalla / Refetch data on screen focus

  const [currentIndex, setCurrentIndex] = useState(0); // Índice del perfil actual / Current profile index
  const { mutate: skip, isPending: skipPending } = useSkipProfile(); // Hook para saltar perfil / Skip profile hook
  const { mutate: review, isPending: reviewPending } = useReviewProfiles(); // Hook para revisar perfiles saltados / Review skipped profiles hook
  const { mutate: like, isPending: likePending } = useLikeProfile(); // Hook para dar like / Like profile hook
  const queryClient = useQueryClient(); // Cliente de queries para refrescar datos / Query client to refresh data

  const hasProfiles = data && data.length > 0; // ¿Hay perfiles disponibles? / Are there profiles available?

  const profile = hasProfiles
    ? transformPublicProfile(data[currentIndex]) // Perfil actual transformado / Current transformed profile
    : null;

  // Función para saltar perfil / Function to skip profile
  const handleSkip = () => {
    if (profile) {
      skip(profile?.id, {
        onSuccess: () => {
          if (hasProfiles && currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1); // Avanza al siguiente perfil / Go to next profile
          } else if (hasProfiles) {
            queryClient.invalidateQueries({
              queryKey: ["profiles"],
            });
            setCurrentIndex(0); // Reinicia el índice / Reset index
          }
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong, please try again later");
        },
      });
    }
  };

  // Función para revisar perfiles saltados / Function to review skipped profiles
  const handleReview = () => {
    review(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["profiles"],
        });
      },
      onError: () => {
        Alert.alert("Error", "Something went wrong, please try again later");
      },
    });
  };

  // Función para dar like a una respuesta o foto / Function to like an answer or photo
  const handleLike = (id: string, type: "answer" | "photo") => {
    if (profile) {
      like(
        {
          profile: profile?.id,
          answer: type === "answer" ? id : undefined,
          photo: type === "photo" ? id : undefined,
        },
        {
          onSuccess: () => {
            if (hasProfiles && currentIndex < data.length - 1) {
              setCurrentIndex(currentIndex + 1); // Avanza al siguiente perfil / Go to next profile
            } else if (hasProfiles) {
              queryClient.invalidateQueries({
                queryKey: ["profiles"],
              });
              setCurrentIndex(0); // Reinicia el índice / Reset index
            }
          },
          onError: () => {
            Alert.alert(
              "Error",
              "Something went wrong, please try again later"
            );
          },
        }
      );
    }
  };

  // Muestra loader si está cargando o pendiente / Show loader if loading or pending
  if (isFetching || skipPending || reviewPending || likePending) {
    return <Loader />;
  }

  // Muestra error si hay error / Show error if there is an error
  if (error) {
    return (
      <Empty
        title="Something went wrong"
        subTitle="We ran into a problem loading new people, sorry about that!"
        onPrimaryPress={refetch}
        primaryText="Try again"
      />
    );
  }

  // Muestra mensaje si no hay perfiles / Show message if no profiles
  if (!hasProfiles) {
    return (
      <Empty
        title="You've seen everyone for now"
        subTitle="Try changing your filters so more people match your criteria - or check back later!"
        primaryText="Change filters"
        secondaryText="Review skipped profiles"
        onPrimaryPress={() => router.push("/preferences")}
        onSecondaryPress={handleReview}
      />
    );
  }

  // Render principal de la pantalla de perfiles / Main render of the profiles screen
  return (
    <View className="flex-1 bg-[#FFFFFF]">
      <ScrollView className="flex-1 px-5">
        {/* Botón para ir a preferencias / Button to go to preferences */}
        <Link href={"/preferences"} suppressHighlighting>
          <Ionicons name="options-outline" size={32} color="#800F2F" />
        </Link>
        {/* Vista del perfil actual / Current profile view */}
        {profile && <ProfileView profile={profile} onLike={handleLike} />}
      </ScrollView>
      {/* Botón flotante para saltar perfil / Floating button to skip profile */}
      <Fab
        onPress={handleSkip}
        iconName="close"
        className="bg-[#FF758F] shadow-sm active:h-[4.75rem] h-20 absolute bottom-5 left-5"
        iconClassName="text-[#FFFFFF] text-4xl"
        loaderClassName="text-[#FFFFFF]"
      />
    </View>
  );
}
