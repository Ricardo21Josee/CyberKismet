import { useSignInWithOtp } from "@/api/auth";
import { Fab } from "@/components/fab";
import { StackHeader } from "@/components/stack-header";
import { router, useFocusEffect } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Page() {
  const [phone, setPhone] = useState("");
  const phoneRef = useRef<TextInput>(null);
  const {
    mutate: signInWithOtp,
    isPending,
    isError,
    error,
    reset,
  } = useSignInWithOtp();

  const handlePhoneChange = (text: string) => {
    if (isError) {
      reset();
    }
    setPhone(text);
  };

  const isValid = useMemo(() => {
    return /^\+[1-9]\d{1,14}$/.test(phone);
  }, [phone]);

  const handleSubmit = () => {
    signInWithOtp(phone, {
      onSuccess: () =>
        router.push({
          pathname: "/otp",
          params: { phone },
        }),
    });
  };

  useFocusEffect(() => {
    phoneRef.current?.focus();
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#FFF0F3]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <StatusBar backgroundColor="#FFF0F3" barStyle="dark-content" />
      <View className="flex-1 px-6">
        <StackHeader />

        {/* Contenido principal */}
        <View className="flex-1 justify-center">
          <View className="mb-10">
            <Text className="text-[#590D22] text-3xl font-playfair-semibold mb-2">
              What's your phone number?
            </Text>
            <Text className="text-[#A4133C] text-base font-poppins-regular mb-1">
              Please enter your phone number with country code
            </Text>
          </View>

          {/* Input field */}
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
            {isError && (
              <Text className="text-[#C9184A] text-sm font-poppins-medium mt-2">
                {error.message}
              </Text>
            )}
          </View>
        </View>

        {/* Botón de acción */}
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
