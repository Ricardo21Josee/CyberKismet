import { useFocusEffect } from "@react-navigation/native";
import React from "react";

// Hook personalizado para refrescar datos al enfocar la pantalla / Custom hook to refetch data when screen is focused
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true); // Referencia para saber si es la primera vez / Ref to check if it's the first time

  useFocusEffect(
    React.useCallback(() => {
      // Evita el refetch la primera vez que se monta / Avoid refetch on first mount
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // Refresca los datos al enfocar la pantalla / Refetch data when screen is focused
      refetch();
    }, [refetch])
  );
}
