import { useUpdateEthnicityPreferences } from "@/api/my-profile";
import { Option, PrivateProfile } from "@/api/my-profile/types";
import { useEthnicities } from "@/api/options";
import { CheckboxList } from "@/components/checkbox-list";
import { StackHeaderV4 } from "@/components/stack-header-v4";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

const Page = () => {
  const { edits, setEdits } = useEdit();
  const { data } = useEthnicities();
  const [selected, setSelected] = useState<Option[]>(
    edits?.ethnicity_preferences || []
  );

  const { mutate, reset } = useUpdateEthnicityPreferences();

  const handlePress = () => {
    setEdits({ ...edits, ethnicity_preferences: selected } as PrivateProfile);
    mutate(
      { ethnicities: selected.map((i) => i.id) },
      {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          Alert.alert("Error", "Something went wrong, please try again later.");
          reset();
          router.back();
        },
      }
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#FFF0F3", // Fondo rosa claro
      }}
    >
      {/* Header - El texto "Ethnicity" se maneja dentro de StackHeaderV4 */}
      <StackHeaderV4 title="Ethnicity" onPressBack={handlePress} />

      {/* Lista - Los estilos de checkbox se manejan dentro de CheckboxList */}
      <View style={{ marginTop: 16 }}>
        <CheckboxList
          options={data}
          initialSelection={selected}
          onChange={setSelected}
        />
      </View>
    </View>
  );
};

export default Page;
