import { useSignInWithOtp } from "@/api/auth"; // Hook para iniciar sesión con OTP / Hook to sign in with OTP
import { Fab } from "@/components/fab"; // Botón flotante de acción / Floating action button
import { StackHeader } from "@/components/stack-header"; // Header personalizado / Custom header
import { router, useFocusEffect } from "expo-router"; // Utilidades de navegación y enfoque / Navigation and focus utilities
import { useMemo, useRef, useState } from "react"; // Hooks de React / React hooks
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native"; // Componentes básicos de UI / Basic UI components

export default function Page() {
  const [phone, setPhone] = useState(""); // Estado para el número de teléfono / State for phone number
  const phoneRef = useRef<TextInput>(null); // Referencia al input de teléfono / Ref for phone input
  const {
    mutate: signInWithOtp,
    isPending,
    isError,
    error,
    reset,
  } = useSignInWithOtp(); // Hook para manejar el envío del OTP / Hook to handle OTP submission

  // Maneja el cambio en el input de teléfono / Handles phone input change
  const handlePhoneChange = (text: string) => {
    if (isError) {
      reset();
    }
    setPhone(text);
  };

  // Valida el formato del teléfono internacional / Validates international phone format
  const isValid = useMemo(() => {
    return /^\+[1-9]\d{1,14}$/.test(phone);
  }, [phone]);

  // Envía el número para recibir el OTP / Submits phone to receive OTP
  const handleSubmit = () => {
    signInWithOtp(phone, {
      onSuccess: () =>
        router.push({
          pathname: "/otp",
          params: { phone },
        }),
    });
  };

  // Enfoca el input al entrar a la pantalla / Focuses input on screen entry
  useFocusEffect(() => {
    phoneRef.current?.focus();
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#FFFFFF]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View className="flex-1 px-6">
        <StackHeader />

        {/* Contenido principal de la pantalla / Main content of the screen */}
        <View className="flex-1 justify-center">
          <View className="mb-10">
            {/* Título y subtítulo / Title and subtitle */}
            <Text className="text-[#590D22] text-3xl font-playfair-semibold mb-2">
              What's your phone number?
            </Text>
            <Text className="text-[#A4133C] text-base font-poppins-regular mb-1">
              Please enter your phone number with country code
            </Text>
          </View>

          {/* Campo de entrada para el teléfono / Phone input field */}
          <View className="mb-8">
            <TextInput
              className="bg-white rounded-lg p-4 text-xl font-poppins-medium border border-[#FFB3C1]"
              placeholder="+1 234 567 8901"
              placeholderTextColor="#FFB3C1"
              selectionColor="#C9184A"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              autoFocus={true}
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={16}
              ref={phoneRef}
            />
            {/* Mensaje de error si el teléfono es inválido / Error message if phone is invalid */}
            {isError && (
              <Text className="text-[#C9184A] text-sm font-poppins-medium mt-2">
                {error.message}
              </Text>
            )}
          </View>
        </View>

        {/* Botón de acción para continuar / Action button to continue */}
        <View className="pb-8 items-center">
          <Fab
            disabled={!isValid || isPending}
            onPress={handleSubmit}
            loading={isPending}
            className={`w-full py-4 rounded-full ${isValid ? "bg-[#C9184A]" : "bg-[#FFB3C1]"}`}
            iconName="arrow-forward"
            iconClassName="text-white text-2xl"
            loaderClassName="text-white"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
