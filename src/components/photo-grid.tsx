import { Photo, PrivateProfile } from "@/api/my-profile/types"; // Tipos de foto y perfil privado / Photo and private profile types
import { useEdit } from "@/store/edit"; // Hook para editar el perfil / Hook to edit profile
import * as Crypto from "expo-crypto"; // Utilidad para generar UUID / Utility to generate UUID
import { Image } from "expo-image"; // Componente de imagen optimizada / Optimized image component
import * as ImagePicker from "expo-image-picker"; // Utilidad para seleccionar imágenes / Utility to pick images
import { FC, useEffect, useState } from "react";
import { Dimensions, View } from "react-native"; // Componentes básicos de UI / Basic UI components
import { DraggableGrid } from "react-native-draggable-grid"; // Grid arrastrable para ordenar fotos / Draggable grid for photo ordering

// Tipo de ítem para el grid de fotos / Item type for photo grid
type Item = {
  key: string;
  photo: Photo;
  disabledDrag?: boolean;
  disabledReSorted?: boolean;
};

// Props del componente PhotoGrid / PhotoGrid component props
interface Props {
  profile: PrivateProfile;
  margin?: number;
  columns?: number;
  spacing?: number;
  slots?: number;
}

// Componente para mostrar y editar una cuadrícula de fotos / Component to display and edit a photo grid
export const PhotoGrid: FC<Props> = ({
  profile,
  margin = 10,
  columns = 3,
  spacing = 10,
  slots = 6,
}) => {
  // Calcula el ancho del contenedor y el tamaño de cada ítem / Calculates container width and item size
  const containerWidth = Dimensions.get("window").width - margin * 2;
  const itemSize = containerWidth / columns - spacing;

  const [data, setData] = useState<Item[]>([]); // Estado para los ítems del grid / State for grid items
  const { setEdits, setGridActive } = useEdit(); // Funciones para editar perfil y activar grid / Functions to edit profile and activate grid

  // Inicializa los datos del grid al montar el componente / Initializes grid data on mount
  useEffect(() => {
    const initialData: Item[] = Array(slots)
      .fill(null)
      .map((_, index) => {
        const photo = profile?.photos?.[index] || null;
        return {
          key: index.toString(),
          photo,
          disabledDrag: photo === null,
          disabledReSorted: photo === null,
        };
      });
    setData(initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderiza cada celda del grid de fotos / Renders each cell of the photo grid
  const rendertem = (item: Item) => {
    return (
      <View
        key={item.key}
        style={{
          height: itemSize,
          width: itemSize,
        }}
      >
        {item.photo?.photo_url ? (
          // Celda con foto / Cell with photo
          <View className="flex-1 rounded-md overflow-hidden">
            <Image
              source={item.photo?.photo_url}
              className="flex-1 bg-neutral-200"
            />
          </View>
        ) : (
          // Celda vacía para agregar foto / Empty cell to add photo
          <View className="flex-1 border border-red-600 border-dashed rounded-md" />
        )}
      </View>
    );
  };

  // Maneja el evento al soltar una foto tras arrastrar / Handles event when a photo is dropped after dragging
  const onDragRelease = (data: Item[]) => {
    const photos = data
      .map((item, index) => {
        return {
          ...item.photo,
          photo_order: index,
        };
      })
      .filter((item) => item.photo_order !== undefined);
    setData(data);
    setEdits({
      ...profile,
      photos,
    });
    setGridActive(false);
  };

  // Activa el modo de grid arrastrable / Activates draggable grid mode
  const onDragItemActive = () => {
    setGridActive(true);
  };

  // Maneja el click en una celda / Handles click on a cell
  const onItemPress = (item: Item) => {
    if (!item.photo) {
      pickPhoto();
    } else {
      replacePhoto(item);
    }
  };

  // Permite seleccionar nuevas fotos desde la galería / Allows picking new photos from gallery
  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: slots - data.filter((item) => item.photo).length,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedData = data.map((item, index) => {
        if (!item.photo && result.assets?.length) {
          const currentAsset = result.assets.shift();

          if (currentAsset) {
            return {
              ...item,
              photo: {
                id: "temp_" + Crypto.randomUUID(),
                photo_url: currentAsset.uri,
                photo_order: index,
              },
              disabledDrag: false,
              disabledReSorted: false,
            };
          }
        }
        return item;
      });

      const updatedPhotos = updatedData
        .map((item, index) => {
          return {
            ...item?.photo,
            photo_order: index,
          } as Photo;
        })
        .filter((item) => item.photo_url);

      setData(updatedData as Item[]);
      setEdits({
        ...profile,
        photos: updatedPhotos,
      });
    }
  };

  // Permite reemplazar una foto existente / Allows replacing an existing photo
  const replacePhoto = async (item: Item) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedData = data.map((i, index) => {
        if (item.key === i.key && result.assets?.length) {
          const currentAsset = result.assets.shift();

          if (currentAsset) {
            return {
              ...i,
              photo: {
                ...i.photo,
                photo_url: currentAsset.uri,
              },
              disabledDrag: false,
              disabledReSorted: false,
            };
          }
        }
        return i;
      });

      const updatedPhotos = updatedData
        .map((item, index) => {
          return {
            ...item?.photo,
            photo_order: index,
          } as Photo;
        })
        .filter((item) => item.photo_url);

      setData(updatedData as Item[]);
      setEdits({
        ...profile,
        photos: updatedPhotos,
      });
    }
  };

  return (
    // Contenedor principal del grid de fotos / Main container for photo grid
    <View
      style={{
        width: containerWidth,
        alignSelf: "center",
      }}
    >
      {/* Grid arrastrable de fotos / Draggable photo grid */}
      <DraggableGrid
        numColumns={3}
        renderItem={rendertem}
        data={data}
        onDragRelease={onDragRelease}
        onDragItemActive={onDragItemActive}
        onItemPress={onItemPress}
      />
    </View>
  );
};
