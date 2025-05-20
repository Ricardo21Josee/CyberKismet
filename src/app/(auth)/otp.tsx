import { useVerifyOtp } from "@/api/auth";
import { Fab } from "@/components/fab";
import { StackHeader } from "@/components/stack-header";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Page() {
  const [otp, setOtp] = useState("");
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const {
    mutate: verifyOtp,
    isPending,
    isError,
    error,
    reset,
  } = useVerifyOtp();

  const handleOtpChange = (text: string) => {
    if (isError) {
      reset();
    }
    setOtp(text);
  };

  const isValid = useMemo(() => {
    return otp.length === 6;
  }, [otp]);

  const handleSubmit = () => {
    verifyOtp({ phone, token: otp });
  };

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
              Enter verification code
            </Text>
            <Text className="text-[#A4133C] text-base font-poppins-regular">
              We sent a 6-digit code to {phone}
            </Text>
          </View>

          {/* OTP Input */}
          <View className="mb-8">
            <View className="flex-row justify-between gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
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

            <TextInput
              className="absolute h-1 w-1 opacity-0"
              keyboardType="numeric"
              textContentType="oneTimeCode"
              autoFocus={true}
              value={otp}
              onChangeText={handleOtpChange}
              maxLength={6}
            />

            {isError && (
              <Text className="text-[#C9184A] text-sm font-poppins-medium mt-4 text-center">
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
            iconName="checkmark"
            iconClassName="text-white text-2xl"
            loaderClassName="text-white"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
