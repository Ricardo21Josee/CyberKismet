import { PrivateProfile } from "@/api/my-profile/types";
import { useSexualities } from "@/api/options";
import { RadioList } from "@/components/radio-list";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const { data } = useSexualities();
  const [selected, setSelected] = useState(edits?.sexuality || null);

  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        sexuality: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <RadioList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, !selected && styles.disabledButton]}
        onPress={handleSave}
        disabled={!selected}
      >
        <Text style={styles.saveButtonText}>
          {selected ? `Save selection` : "Select an option"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fondo rosa claro
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fondo blanco para la lista
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#590D22", // Sombra oscura
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: "#800F2F", // Botón vino oscuro
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#FFB3C1", // Botón deshabilitado rosa medio
  },
  saveButtonText: {
    color: "#FFF0F3", // Texto blanco rosado
    fontSize: 16,
    fontWeight: "600",
  },
});
