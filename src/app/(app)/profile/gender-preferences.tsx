import { PrivateProfile } from "@/api/my-profile/types";
import { useGenders } from "@/api/options";
import { CheckboxList } from "@/components/checkbox-list";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const { data } = useGenders();
  const [selected, setSelected] = useState(edits?.gender_preferences || []);

  const handlePress = () => {
    if (selected) {
      setEdits({
        ...edits,
        gender_preferences: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF", // Fondo rosa claro
        padding: 20,
      }}
    >
      {/* Contenedor de la lista de checkboxes */}
      <View
        style={{
          backgroundColor: "#FFFFFF", // Fondo blanco
          borderRadius: 10,
          padding: 15,
          shadowColor: "#590D22", // Sombra rojo oscuro
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <CheckboxList
          options={data.map((item) => ({
            id: item.id,
            name: item.plural_name || item.name,
          }))}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>
    </View>
  );
}
