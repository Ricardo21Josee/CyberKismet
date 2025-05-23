import LottieView from "lottie-react-native"; // Componente para animaciones Lottie / Lottie animation component
import { FC } from "react";
import { View } from "react-native";

// Props del componente Loader / Loader component props
interface Props {}

// Componente de cargando con animación Lottie / Loading component with Lottie animation
export const Loader: FC<Props> = () => {
  return (
    // Contenedor principal con fondo blanco / Main container with white background
    <View className="flex-1 bg-white">
      {/* Animación Lottie de carga / Lottie loading animation */}
      <LottieView
        autoPlay
        // @ts-ignore
        className="w-full h-full bg-white mt-12"
        source={require("~/assets/images/loading.json")}
      />
    </View>
  );
};
