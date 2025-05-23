import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { FC } from "react";
import { View } from "react-native";

// Props del componente VideoBackground / VideoBackground component props
interface Props {
  source: VideoSource; // Fuente del video / Video source
  children?: React.ReactNode; // Elementos hijos a renderizar sobre el video / Child elements to render over the video
}

// Componente para mostrar un video de fondo con contenido superpuesto / Component to display a background video with overlay content
export const VideoBackground: FC<Props> = ({ source, children }) => {
  // Inicializa el reproductor de video y lo configura en loop / Initialize video player and set it to loop
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    // Contenedor principal que ocupa todo el espacio / Main container occupying all space
    <View className="flex-1">
      {/* Capa absoluta para el video y el contenido / Absolute layer for video and content */}
      <View className="absolute top-0 right-0 bottom-0 left-0">
        {/* Video de fondo en modo cover / Background video in cover mode */}
        <VideoView className="flex-1" player={player} contentFit="cover" />
        {/* Capa para superponer los hijos sobre el video / Layer to overlay children over the video */}
        <View className="absolute top-0 right-0 bottom-0 left-0">
          {children}
        </View>
      </View>
    </View>
  );
};
