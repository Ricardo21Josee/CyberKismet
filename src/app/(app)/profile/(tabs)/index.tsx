import { AnswerList } from "@/components/answer-list"; // Lista de respuestas del usuario / User answers list
import { List } from "@/components/list"; // Componente de lista reutilizable / Reusable list component
import { PhotoGrid } from "@/components/photo-grid"; // Cuadrícula de fotos del usuario / User photo grid
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { identity } from "@/utils/identity"; // Datos de identidad / Identity data
import { vitals } from "@/utils/vitals"; // Datos vitales / Vitals data
import { ScrollView, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const { edits, gridActive } = useEdit(); // Estado de edición y control de cuadrícula / Edit state and grid control

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

  // Render principal de la pestaña de perfil / Main render for profile tab
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: 40 }}
      contentContainerStyle={{ paddingBottom: 80, gap: 20 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={!gridActive}
    >
      <View style={{ paddingHorizontal: 20 }}>
        {/* Sección de fotos del usuario / User photos section */}
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            marginBottom: 8,
            color: "#800F2F",
          }}
        >
          My Photos
        </Text>
        <PhotoGrid profile={edits} />
        <View style={{ height: 40 }} />
        {/* Sección de respuestas del usuario / User answers section */}
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            marginBottom: 8,
            color: "#800F2F",
          }}
        >
          My Answers
        </Text>
        <AnswerList profile={edits} />
      </View>
      <View style={{ paddingLeft: 20, gap: 40 }}>
        {/* Lista de datos vitales / Vitals data list */}
        <List title="My Vitals" data={vitals} profile={edits} />
        {/* Lista de identidad / Identity data list */}
        <List title="Identity" data={identity} profile={edits} />
      </View>
    </ScrollView>
  );
}
