import { PrivateProfile } from "@/api/my-profile/types";
import { usePronouns } from "@/api/options";
import { CheckboxList } from "@/components/checkbox-list";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const { data } = usePronouns();
  const [selected, setSelected] = useState(edits?.pronouns || []);

  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        pronouns: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <CheckboxList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          selected.length === 0 && styles.disabledButton,
        ]}
        onPress={handleSave}
        disabled={selected.length === 0}
      >
        <Text style={styles.saveButtonText}>
          {selected.length > 0
            ? `Save ${selected.length} pronoun${selected.length > 1 ? "s" : ""}`
            : "Select pronouns"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F3", // Fondo rosa claro
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
    backgroundColor: "#A4133C", // Botón vino oscuro
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5", // Botón deshabilitado rosa claro
  },
  saveButtonText: {
    color: "#FFF0F3", // Texto blanco rosado
    fontSize: 16,
    fontWeight: "600",
  },
});
