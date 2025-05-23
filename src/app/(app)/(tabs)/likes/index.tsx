import { useLikes } from "@/api/profiles"; // Hook para obtener la lista de likes / Hook to get the list of likes
import { Empty } from "@/components/empty"; // Componente para mostrar estado vacío / Empty state component
import { LikeCard } from "@/components/like-card"; // Componente para mostrar cada like / Like card component
import { Loader } from "@/components/loader"; // Componente de carga / Loader component
import { useRefreshOnFocus } from "@/hooks/refetch"; // Hook para refrescar datos al enfocar / Refetch on focus hook
import { Image } from "expo-image"; // Componente de imagen optimizada / Optimized image component
import { Link } from "expo-router"; // Componente de navegación por enlaces / Navigation link component
import { FlatList, Pressable, Text, View } from "react-native"; // Componentes de UI de React Native / React Native UI components

export default function Page() {
  const { data = [], isFetching, isError, refetch } = useLikes(); // Obtiene likes y estados de carga/error / Gets likes and loading/error states
  useRefreshOnFocus(refetch); // Refresca los datos al volver a la pantalla / Refetch data on screen focus

  // Renderiza el encabezado de la lista de likes / Renders the header of the likes list
  const renderHeader = () => {
    return (
      <View className="gap-5 bg-[#FFFFFF] pb-4">
        <Text className="text-3xl font-poppins-semibold text-[#590D22] px-5 pt-4">
          Likes You
        </Text>
        {data.length > 0 && (
          <Link href={`/likes/${data[0].id}`} asChild>
            <Pressable className="bg-white mx-5 p-5 rounded-xl border border-[#FFB3C1]">
              <View className="gap-3">
                <Text className="text-lg font-poppins-medium text-[#800F2F]">
                  {data[0].profile.first_name}
                </Text>
                <Text className="text-base font-poppins-regular text-[#A4133C]">
                  {`Liked your ${data[0].photo_url ? "photo" : "answer"}`}
                </Text>
              </View>
              <View className="mt-4">
                <View className="rounded-lg bg-[#FFCCD5] aspect-square w-full overflow-hidden">
                  <Image
                    source={data[0].profile.photos[0]?.photo_url}
                    className="flex-1"
                    contentFit="cover"
                  />
                </View>
              </View>
            </Pressable>
          </Link>
        )}
      </View>
    );
  };

  // Renderiza el estado vacío o errores / Renders empty state or errors
  const renderEmpty = () => {
    if (data.length === 1) return null; // Si solo hay el destacado, no muestra vacío / If only featured, don't show empty

    if (isFetching) return <Loader />; // Muestra loader si está cargando / Show loader if loading

    if (isError) {
      return (
        <Empty
          title="Something went wrong"
          subTitle="We ran into a problem loading your likes, sorry about that!"
          primaryText="Try again"
          onPrimaryPress={refetch}
        />
      );
    }

    return (
      <Empty
        title="No likes yet"
        subTitle="We can help you get your first one sooner."
      />
    );
  };

  return (
    <View className="flex-1 bg-[#FFFFFF]">
      {/* Lista de likes en formato de cuadrícula / Likes list as a grid */}
      <FlatList
        data={data.length > 1 ? data.slice(1) : []}
        renderItem={({ item, index }) => {
          // Tarjeta de like individual / Individual like card
          // Ajuste visual para cuadrícula par / Visual fix for even grid
          return (
            <>
              <LikeCard like={item} />
              {data.length % 2 === 0 && index === data.length - 2 ? (
                <View className="flex-1" />
              ) : null}
            </>
          );
        }}
        numColumns={2} // Dos columnas en la cuadrícula / Two columns in grid
        contentContainerClassName="gap-4 px-5 pb-20"
        columnWrapperClassName="gap-4"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader} // Encabezado personalizado / Custom header
        ListEmptyComponent={renderEmpty} // Estado vacío personalizado / Custom empty state
        keyExtractor={(item) => item.id.toString()} // Clave única por id / Unique key by id
      />
    </View>
  );
}
