import { List } from "@/components/list"; // Componente de lista de preferencias / Preferences list component
import { StackHeaderV2 } from "@/components/stack-header-v2"; // Header de la pantalla / Screen header
import { useEdit } from "@/store/edit"; // Hook para editar preferencias / Hook to edit preferences
import { memberPreferences } from "@/utils/preferences"; // Datos de preferencias disponibles / Available preferences data
import { Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits } = useEdit(); // Obtiene las preferencias editadas / Gets edited preferences

  // Si no hay datos de edición, muestra mensaje de error / If no edit data, show error message
  if (!edits) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Text style={{ color: "#590D22" }}>Something went wrong.</Text>
      </View>
    );
  }

  // Render principal de la pantalla de preferencias / Main render for preferences screen
  return (
    <View className="flex-1 p-5" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header de la pantalla de preferencias / Preferences screen header */}
      <StackHeaderV2 title="Dating Preferences" />
      <View style={{ marginTop: 16 }}>
        {/* Lista de preferencias del usuario / User preferences list */}
        <List
          title="Dating Preferences"
          data={memberPreferences}
          profile={edits}
        />
      </View>
    </View>
  );
}
