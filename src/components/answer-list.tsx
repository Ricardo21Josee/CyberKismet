import { Answer, PrivateProfile } from "@/api/my-profile/types"; // Tipos de respuesta y perfil privado / Answer and private profile types
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import { router } from "expo-router"; // Utilidad de navegación / Navigation utility
import { FC, useEffect, useState } from "react"; // Componentes y hooks de React / React components and hooks
import { Dimensions, Text, View } from "react-native"; // Componentes básicos de UI / Basic UI components
import { DraggableGrid } from "react-native-draggable-grid"; // Grid arrastrable para ordenar respuestas / Draggable grid for ordering answers

type Item = {
  key: string;
  answer: Answer;
  disabledDrag?: boolean;
  disabledReSorted?: boolean;
};

interface Props {
  profile: PrivateProfile;
  columns?: number;
  spacing?: number;
  margin?: number;
  height?: number;
  slots?: number;
}

export const AnswerList: FC<Props> = ({
  profile,
  columns = 1,
  spacing = 10,
  margin = 10,
  height = 120,
  slots = 3,
}) => {
  // Calcula el ancho y tamaño de cada celda / Calculates width and size for each cell
  const width = Dimensions.get("window").width - margin * 2;
  const size = width / columns - spacing;

  const [data, setData] = useState<Item[]>([]); // Estado para los ítems del grid / State for grid items
  const { setEdits: setMyProfileChanges, setGridActive } = useEdit(); // Funciones para editar perfil y activar grid / Functions to edit profile and activate grid

  // Inicializa o actualiza los datos del grid cuando cambia el perfil / Initializes or updates grid data when profile changes
  useEffect(() => {
    if (!data.length) {
      const initialData: Item[] = Array(slots)
        .fill(null)
        .map((_, index) => {
          const answer = profile?.answers[index] || null;
          return {
            key: index.toString(),
            answer: answer,
            disabledDrag: answer === null,
            disabledReSorted: answer === null,
          };
        });
      setData(initialData);
    } else {
      const newData = data.map((item, index) => {
        const answer = profile?.answers[index] || null;
        return {
          ...item,
          answer: answer,
          disabledDrag: answer === null,
          disabledReSorted: answer === null,
        };
      });
      setData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // Renderiza cada celda del grid / Renders each grid cell
  const renderItem = (item: Item) => {
    return (
      <View
        style={{
          width: size,
          height: height,
          paddingVertical: spacing / 2,
        }}
        key={item.key}
      >
        {item.answer ? (
          // Celda con respuesta / Cell with answer
          <View className="flex-1 rounded-md overflow-hidden border border-neutral-200 p-5">
            <Text className="text-base font-poppins-regular">
              {item.answer.question}
            </Text>
            <Text
              className="text-base font-poppins-regular text-neutral-400"
              numberOfLines={3}
            >
              {item.answer.answer_text}
            </Text>
          </View>
        ) : (
          // Celda vacía para agregar respuesta / Empty cell to add answer
          <View className="flex-1 rounded-md border border-red-600 border-dashed" />
        )}
      </View>
    );
  };

  // Maneja el evento al soltar un ítem tras arrastrar / Handles event when an item is dropped after dragging
  const onDragRelease = (data: Item[]) => {
    const answers = data
      .map((item, index) => {
        return {
          ...item.answer,
          answer_order: index,
        };
      })
      .filter((item) => item.answer_text != null);

    setMyProfileChanges({
      ...profile,
      answers,
    });
    setData(data);
    setGridActive(false);
  };

  // Activa el modo de grid arrastrable / Activates draggable grid mode
  const onDragItemActive = () => {
    setGridActive(true);
  };

  // Maneja el click en una celda / Handles click on a cell
  const onItemPress = (item: Item) => {
    if (item.answer) {
      // Si hay respuesta, navega a editarla / If answer exists, navigate to edit
      router.push({
        pathname: "/(app)/write-answer",
        params: {
          itemId: item.answer.id,
          promptId: item.answer.prompt_id,
        },
      });
    } else {
      // Si está vacía, navega a prompts / If empty, navigate to prompts
      router.push("/(app)/prompts");
    }
    return;
  };

  return (
    <View>
      <View
        style={{
          width: width,
          alignSelf: "center",
        }}
      >
        {/* Grid arrastrable de respuestas / Draggable grid of answers */}
        <DraggableGrid
          numColumns={1}
          renderItem={renderItem}
          data={data}
          onDragRelease={onDragRelease}
          onDragItemActive={onDragItemActive}
          onItemPress={onItemPress}
          itemHeight={120}
        />
      </View>
    </View>
  );
};
