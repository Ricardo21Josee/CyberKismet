import { PrivateProfile } from "@/api/my-profile/types";
import { useEthnicities } from "@/api/options";
import { CheckboxList } from "@/components/checkbox-list";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const { data } = useEthnicities();
  const [selected, setSelected] = useState(edits?.ethnicities || []);

  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        ethnicities: selected,
      } as PrivateProfile);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header decorativo */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Ethnicities</Text>
        <Text style={styles.subtitle}>You can choose multiple options</Text>
      </View>

      {/* Contenedor de la lista - SIN SCROLLVIEW */}
      <View style={styles.listContainer}>
        <CheckboxList
          options={data}
          onChange={setSelected}
          initialSelection={selected}
        />
      </View>

      {/* Footer con botón y contador */}
      <View style={styles.footer}>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{selected.length} selected</Text>
          <View style={styles.counterBadge}>
            <Text style={styles.counterNumber}>{selected.length}</Text>
          </View>
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
            {selected.length > 0 ? "Save Selections" : "Select Options"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F3",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    color: "#590D22",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#A4133C",
    fontFamily: "Poppins-Regular",
    opacity: 0.8,
  },
  listContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#590D22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFB3C1",
    marginBottom: 15,
  },
  footer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#FFCCD5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterText: {
    fontSize: 16,
    color: "#800F2F",
    marginRight: 10,
    fontFamily: "Poppins-Medium",
  },
  counterBadge: {
    backgroundColor: "#FF4D6D",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  counterNumber: {
    color: "#FFF0F3",
    fontSize: 14,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#A4133C",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5",
  },
  saveButtonText: {
    color: "#FFF0F3",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
