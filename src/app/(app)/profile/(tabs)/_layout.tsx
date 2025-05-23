import { useMyProfile, useUpdateProfile } from "@/api/my-profile"; // Hooks para obtener y actualizar el perfil / Hooks to get and update profile
import { StackHeaderV3 } from "@/components/stack-header-v3"; // Header personalizado para la edición / Custom header for editing
import { MaterialTopTabs } from "@/layouts/material-top-tabs"; // Navegación de pestañas superiores / Top tabs navigation
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router, Stack } from "expo-router"; // Utilidades de navegación / Navigation utilities
import { isEqual } from "lodash"; // Utilidad para comparar objetos / Utility to compare objects
import { Alert } from "react-native"; // Componente de alerta / Alert component

export default function Layout() {
  const { data: profile } = useMyProfile(); // Perfil original del usuario / User's original profile
  const { edits, setEdits, gridActive } = useEdit(); // Estado de edición y control de grid / Edit state and grid control
  const { mutate } = useUpdateProfile(); // Mutación para actualizar perfil / Mutation to update profile

  // Maneja la acción de cancelar edición / Handles cancel edit action
  const handlePressCancel = async () => {
    if (isEqual(profile, edits)) {
      router.dismiss();
      return;
    }

    Alert.alert(
      "Discard Changes",
      "Are you sure you want to discard your changes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Discard",
          onPress: () => {
            setEdits(profile);
            router.dismiss();
          },
        },
      ]
    );
  };

  // Maneja la acción de guardar cambios / Handles save changes action
  const handlePresDone = async () => {
    if (!edits) {
      Alert.alert("Error", "Something went wrong, please try again later");
      return;
    }

    if (isEqual(profile, edits)) {
      router.dismiss();
      return;
    }

    mutate(edits, {
      onSuccess: () => {
        router.dismiss();
      },
      onError: () => {
        Alert.alert("Error", "Something went wrong, please try again later");
      },
    });
  };

  // Render principal del layout de edición de perfil / Main render for profile edit layout
  return (
    <>
      {/* Header de la pantalla de edición de perfil / Profile edit screen header */}
      <StackHeaderV3
        title={edits?.first_name || ""}
        onPressCancel={handlePressCancel}
        onPressDone={handlePresDone}
      />
      {/* Navegación por pestañas superiores para editar/ver / Top tabs navigation for edit/view */}
      <MaterialTopTabs
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#C9184A", // Cambiado a rosa oscuro de tu paleta / Changed to dark pink from your palette
          },
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: 13,
          },
          tabBarActiveTintColor: "#C9184A", // Rosa oscuro / Dark pink
          tabBarInactiveTintColor: "#FFB3C1", // Rosa claro / Light pink
          swipeEnabled: !gridActive, // Deshabilita swipe si grid está activo / Disable swipe if grid is active
        }}
      >
        {/* Pestaña de edición / Edit tab */}
        <Stack.Screen
          name="index"
          options={{
            title: "Edit",
          }}
        />
        {/* Pestaña de vista / View tab */}
        <Stack.Screen
          name="view"
          options={{
            title: "View",
          }}
        />
      </MaterialTopTabs>
    </>
  );
}
