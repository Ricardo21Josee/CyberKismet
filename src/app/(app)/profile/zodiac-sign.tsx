import { PrivateProfile } from "@/api/my-profile/types";
import { useZodiacSigns } from "@/api/options";
import { RadioList } from "@/components/radio-list";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { edits, setEdits } = useEdit();
  const { data } = useZodiacSigns();
  const [selected, setSelected] = useState(edits?.zodiac_sign || null);

  const handleSave = () => {
    if (selected) {
      setEdits({
        ...edits,
        zodiac_sign: selected,
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
          {selected ? `Save ${selected.name}` : "Select your zodiac sign"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Light pink background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White list background
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#590D22", // Dark shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: "#A4133C", // Dark wine red button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#FFCCD5", // Light pink disabled button
  },
  saveButtonText: {
    color: "#FFF0F3", // White-pink text
    fontSize: 16,
    fontWeight: "600",
  },
});
