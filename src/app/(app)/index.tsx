import { useMyProfile } from "@/api/my-profile"; // Hook para obtener el perfil del usuario / Hook to get user profile
import {
  useChildren,
  useCovidVaccine,
  useEthnicities,
  useFamilyPlans,
  useGenders,
  usePets,
  usePrompts,
  usePronouns,
  useSexualities,
  useZodiacSigns,
} from "@/api/options"; // Hooks para cargar datos de opciones / Hooks to load options data
import { Redirect } from "expo-router"; // Componente para redirección / Redirect component
import { ActivityIndicator, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { isPending, isError } = useMyProfile(); // Estado de carga y error del perfil / Profile loading and error state

  // Precarga de datos de opciones para la app / Preload options data for the app
  usePrompts();
  useChildren();
  useCovidVaccine();
  useEthnicities();
  useFamilyPlans();
  useGenders();
  usePets();
  usePronouns();
  useSexualities();
  useZodiacSigns();

  if (isPending) {
    // Pantalla de carga mientras se obtiene el perfil / Loading screen while fetching profile
    return (
      <View className="flex-1 bg-[#FFFFFF] items-center justify-center">
        <ActivityIndicator size={"small"} color="#A4133C" />
      </View>
    );
  }

  if (isError) {
    // Mensaje de error si falla la carga del perfil / Error message if profile loading fails
    return (
      <View className="flex-1 bg-[#FFFFFF] items-center justify-center">
        <Text className="text-[#590D22]">Something went wrong.</Text>
      </View>
    );
  }

  // Redirección a la pantalla principal de tabs / Redirect to main tabs screen
  return <Redirect href={"/(app)/(tabs)"} />;
}
