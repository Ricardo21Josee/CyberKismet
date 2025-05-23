import { Profile } from "@/types/profile";
import { FC } from "react";
import { ScrollView, Text } from "react-native";
import { ProfileAnswer } from "./profile-answer";
import { ProfileItem } from "./profile-item";
import { ProfilePhoto } from "./profile-photo";
import { ProfileTraits } from "./profile-traits";

// Props del componente ProfileView / ProfileView component props
interface Props {
  profile: Profile; // Perfil a mostrar / Profile to display
  myProfile?: boolean; // Indica si es el perfil propio / Indicates if it's own profile
  onLike?: (id: string, type: "answer" | "photo") => void; // Acción al dar like / Action when liking
}

// Componente para mostrar el perfil completo de un usuario / Component to display a user's full profile
export const ProfileView: FC<Props> = ({ profile, myProfile, onLike }) => {
  // Genera los elementos del perfil según el layout / Generates profile elements according to layout
  const generateProfile = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    // Layout de presentación: orden de fotos, respuestas y rasgos / Presentation layout: order of photos, answers, and traits
    const layout: ("photo" | "answer" | "traits")[] = [
      "photo",
      "answer",
      "traits",
      "photo",
      "photo",
      "answer",
      "photo",
      "answer",
      "photo",
      "photo",
    ];

    const { photos, answers } = profile;
    let photoIndex = 0;
    let answerIndex = 0;

    layout.forEach((item, _) => {
      if (item === "traits") {
        // Inserta los rasgos del perfil / Insert profile traits
        elements.push(<ProfileTraits key={item} profile={profile} />);
      }
      if (item === "photo" && photoIndex < photos.length) {
        // Inserta una foto de perfil / Insert a profile photo
        const item = photos[photoIndex++];
        elements.push(
          <ProfileItem
            key={`p${item.id}`}
            onLike={onLike}
            item={item}
            type="photo"
          >
            <ProfilePhoto photo={item} />
          </ProfileItem>
        );
      }
      if (item === "answer" && answerIndex < answers.length) {
        // Inserta una respuesta de perfil / Insert a profile answer
        const item = answers[answerIndex++];
        elements.push(
          <ProfileItem
            key={`a${item.id}`}
            onLike={onLike}
            item={item}
            type="answer"
          >
            <ProfileAnswer answer={item} />
          </ProfileItem>
        );
      }
    });

    return elements;
  };

  return (
    // Scroll principal del perfil / Main profile scroll
    <ScrollView
      className="flex-1"
      contentContainerClassName="pt-5 pb-28 gap-5"
      showsVerticalScrollIndicator={false}
    >
      {/* Nombre del usuario si no es el propio perfil / User name if not own profile */}
      {!myProfile && (
        <Text className="text-3xl  font-poppins-semibold">
          {profile.first_name}
        </Text>
      )}
      {/* Elementos generados del perfil / Generated profile elements */}
      {generateProfile()}
    </ScrollView>
  );
};
