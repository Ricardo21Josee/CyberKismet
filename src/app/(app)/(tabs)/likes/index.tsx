import { useLikes } from "@/api/profiles";
import { Empty } from "@/components/empty";
import { LikeCard } from "@/components/like-card";
import { Loader } from "@/components/loader";
import { useRefreshOnFocus } from "@/hooks/refetch";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Page() {
  const { data = [], isFetching, isError, refetch } = useLikes();
  useRefreshOnFocus(refetch);

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

  const renderEmpty = () => {
    if (data.length === 1) return null;

    if (isFetching) return <Loader />;

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
      <FlatList
        data={data.length > 1 ? data.slice(1) : []}
        renderItem={({ item, index }) => (
          <>
            <LikeCard like={item} />
            {data.length % 2 === 0 && index === data.length - 2 && (
              <View className="flex-1" />
            )}
          </>
        )}
        numColumns={2}
        contentContainerClassName="gap-4 px-5 pb-20"
        columnWrapperClassName="gap-4"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
