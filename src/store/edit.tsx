import { useMyProfile } from "@/api/my-profile";
import { PrivateProfile } from "@/api/my-profile/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Tipo para el contexto de edición / Edit context type
type EditContextType = {
  edits: PrivateProfile | null; // Perfil editado actual / Current edited profile
  setEdits: (profile: PrivateProfile | null) => void; // Función para actualizar el perfil editado / Function to update edited profile
  gridActive: boolean; // Estado del grid activo / Grid active state
  setGridActive: (active: boolean) => void; // Función para activar/desactivar el grid / Function to activate/deactivate grid
};

// Contexto de edición con valores por defecto / Edit context with default values
const EditContext = createContext<EditContextType>({
  edits: null,
  setEdits: () => {},
  gridActive: false,
  setGridActive: () => {},
});

// Proveedor del contexto de edición / Edit context provider
export const EditProvider = ({ children }: PropsWithChildren) => {
  const { data: myProfile } = useMyProfile(); // Obtiene el perfil del usuario / Gets user profile
  const [edits, setEdits] = useState<PrivateProfile | null>(myProfile); // Estado del perfil editado / Edited profile state
  const [gridActive, setGridActive] = useState(false); // Estado del grid activo / Grid active state

  useEffect(() => {
    setEdits(myProfile); // Actualiza el perfil editado cuando cambia el perfil original / Update edited profile when original changes
  }, [myProfile]);

  return (
    // Proveedor del contexto de edición con valores actuales / Edit context provider with current values
    <EditContext.Provider
      value={{
        edits: edits,
        setEdits: setEdits,
        gridActive,
        setGridActive,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

// Hook para acceder al contexto de edición / Hook to access edit context
export const useEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEdit must be used within a EditProvider");
  }
  return context;
};
