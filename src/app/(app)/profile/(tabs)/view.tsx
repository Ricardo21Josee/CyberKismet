import { ProfileView } from "@/components/profile-view"; // Vista de perfil reutilizable / Reusable profile view
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { transformPrivateProfile } from "@/utils/profile"; // Transforma datos privados de perfil / Transform private profile data
import { Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits } = useEdit(); // Obtiene los datos editados del perfil / Gets edited profile data

  // Si no hay datos de edición, muestra mensaje de error / If no edit data, show error message
  if (!edits) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "#FFFFFF" }} // Fondo blanco / White background
      >
        <Text style={{ color: "#590D22" }}>Something went wrong.</Text>
      </View>
    );
  }

  // Render principal de la vista de perfil / Main render for profile view
  return (
    <View
      className="flex-1 px-5"
      style={{ backgroundColor: "#FFFFFF" }} // Fondo blanco / White background
    >
      {/* Vista de perfil en modo solo lectura / Read-only profile view */}
      <ProfileView profile={transformPrivateProfile(edits)} myProfile />
    </View>
  );
}
