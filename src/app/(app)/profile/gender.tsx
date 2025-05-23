import { PrivateProfile } from "@/api/my-profile/types";
import { useGenders } from "@/api/options";
import { RadioList } from "@/components/radio-list";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const { data } = useGenders();
  const [selected, setSelected] = useState(edits?.gender || null);

  const handlePress = () => {
    if (selected) {
      setEdits({
        ...edits,
        gender: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF", // Fondo rosa claro
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      {/* Contenedor de opciones */}
      <View
        style={{
          marginTop: 24,
          backgroundColor: "#FFFFFF", // Fondo blanco
          borderRadius: 12,
          paddingVertical: 16,
          paddingHorizontal: 18,
          shadowColor: "#590D22", // Sombra rosada
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          borderWidth: 1,
          borderColor: "#FFCCD5", // Borde sutil
        }}
      >
        <RadioList
          options={data.map((item) => ({ id: item.id, name: item.name }))}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>
    </View>
  );
}
