import { useVerifyOtp } from "@/api/auth"; // Hook para verificar el OTP / Hook to verify OTP
import { Fab } from "@/components/fab"; // Botón flotante de acción / Floating action button
import { StackHeader } from "@/components/stack-header"; // Header personalizado / Custom header
import { useLocalSearchParams } from "expo-router"; // Hook para parámetros de navegación / Hook for navigation params
import { useMemo, useState } from "react"; // Hooks de React / React hooks
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const [otp, setOtp] = useState(""); // Estado para el código OTP / State for OTP code
  const { phone } = useLocalSearchParams<{ phone: string }>(); // Obtiene el teléfono de los parámetros / Gets phone from params
  const {
    mutate: verifyOtp,
    isPending,
    isError,
    error,
    reset,
  } = useVerifyOtp(); // Hook para verificar OTP / Hook to verify OTP

  // Maneja el cambio en el input OTP / Handles OTP input change
  const handleOtpChange = (text: string) => {
    if (isError) {
      reset();
    }
    setOtp(text);
  };

  // Valida si el OTP tiene 6 dígitos / Validates if OTP has 6 digits
  const isValid = useMemo(() => {
    return otp.length === 6;
  }, [otp]);

  // Envía el OTP para verificación / Submits OTP for verification
  const handleSubmit = () => {
    verifyOtp({ phone, token: otp });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#FFFFFF]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View className="flex-1 px-6">
        <StackHeader />

        {/* Contenido principal de la pantalla OTP / Main content for OTP screen */}
        <View className="flex-1 justify-center">
          <View className="mb-10">
            {/* Título y subtítulo / Title and subtitle */}
            <Text className="text-[#590D22] text-3xl font-playfair-semibold mb-2">
              Enter verification code
            </Text>
            <Text className="text-[#A4133C] text-base font-poppins-regular">
              We sent a 6-digit code to {phone}
            </Text>
          </View>

          {/* Entrada visual del OTP / Visual OTP input */}
          <View className="mb-8">
            <View className="flex-row justify-between gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                // Casilla individual para cada dígito / Individual box for each digit
                <View
                  key={index}
                  className={`flex-1 aspect-square items-center justify-center rounded-lg border-2 ${
                    otp[index] ? "border-[#C9184A]" : "border-[#FFB3C1]"
                  } bg-white`}
                >
                  <Text className="text-[#590D22] text-3xl font-poppins-semibold">
                    {otp[index] || ""}
                  </Text>
                </View>
              ))}
            </View>

            {/* Input invisible para capturar el OTP / Hidden input to capture OTP */}
            <TextInput
              className="absolute h-1 w-1 opacity-0"
              keyboardType="numeric"
              textContentType="oneTimeCode"
              autoFocus={true}
              value={otp}
              onChangeText={handleOtpChange}
              maxLength={6}
            />

            {/* Mensaje de error si el OTP es incorrecto / Error message if OTP is incorrect */}
            {isError && (
              <Text className="text-[#C9184A] text-sm font-poppins-medium mt-4 text-center">
                {error.message}
              </Text>
            )}
          </View>
        </View>

        {/* Botón de acción para enviar el OTP / Action button to submit OTP */}
        <View className="pb-8 items-center">
          <Fab
            disabled={!isValid || isPending}
            onPress={handleSubmit}
            loading={isPending}
            className={`w-full py-4 rounded-full ${isValid ? "bg-[#C9184A]" : "bg-[#FFB3C1]"}`}
            iconName="checkmark"
            iconClassName="text-white text-2xl"
            loaderClassName="text-white"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
