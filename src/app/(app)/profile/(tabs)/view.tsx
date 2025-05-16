import { ProfileView } from "@/components/profile-view";
import { useEdit } from "@/store/edit";
import { transformPrivateProfile } from "@/utils/profile";
import { Text, View } from "react-native";

export default function Page() {
  const { edits } = useEdit();

  if (!edits) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "#FFF0F3" }} // Fondo rosa claro
      >
        <Text style={{ color: "#590D22" }}>Something went wrong.</Text>{" "}
        {/* Texto rojo oscuro */}
      </View>
    );
  }

  return (
    <View
      className="flex-1 px-5"
      style={{ backgroundColor: "#FFF0F3" }} // Fondo rosa claro
    >
      <ProfileView
        profile={transformPrivateProfile(edits)}
        myProfile
        // Los colores internos deben manejarse dentro del componente ProfileView
      />
    </View>
  );
}
