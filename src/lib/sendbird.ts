import {
  createExpoClipboardService,
  createExpoFileService,
  createExpoMediaService,
  createExpoNotificationService,
  createExpoPlayerService,
  createExpoRecorderService,
  SendbirdUIKitContainerProps,
} from "@sendbird/uikit-react-native";

import * as ExpoAV from "expo-av"; // Módulo para audio y video / Audio and video module
import * as ExpoClipboard from "expo-clipboard"; // Módulo para portapapeles / Clipboard module
import * as ExpoDocumentPicker from "expo-document-picker"; // Módulo para seleccionar documentos / Document picker module
import * as ExpoFS from "expo-file-system"; // Módulo para sistema de archivos / File system module
import * as ExpoImageManipulator from "expo-image-manipulator"; // Módulo para manipular imágenes / Image manipulation module
import * as ExpoImagePicker from "expo-image-picker"; // Módulo para seleccionar imágenes / Image picker module
import * as ExpoMediaLibrary from "expo-media-library"; // Módulo para la galería multimedia / Media library module
import * as ExpoNotifications from "expo-notifications"; // Módulo para notificaciones / Notifications module
import * as ExpoVideoThumbnail from "expo-video-thumbnails"; // Módulo para miniaturas de video / Video thumbnail module

// Objeto con los servicios de plataforma para Sendbird UIKit / Platform services object for Sendbird UIKit
export const platformServices: SendbirdUIKitContainerProps["platformServices"] =
  {
    clipboard: createExpoClipboardService(ExpoClipboard), // Servicio de portapapeles / Clipboard service
    notification: createExpoNotificationService(ExpoNotifications), // Servicio de notificaciones / Notification service
    file: createExpoFileService({
      fsModule: ExpoFS, // Sistema de archivos / File system
      imagePickerModule: ExpoImagePicker, // Selector de imágenes / Image picker
      mediaLibraryModule: ExpoMediaLibrary, // Galería multimedia / Media library
      documentPickerModule: ExpoDocumentPicker, // Selector de documentos / Document picker
    }),
    media: createExpoMediaService({
      avModule: ExpoAV, // Audio y video / Audio and video
      thumbnailModule: ExpoVideoThumbnail, // Miniaturas de video / Video thumbnails
      imageManipulator: ExpoImageManipulator, // Manipulación de imágenes / Image manipulation
      fsModule: ExpoFS, // Sistema de archivos / File system
    }),
    player: createExpoPlayerService({
      avModule: ExpoAV, // Reproductor de audio/video / Audio/video player
    }),
    recorder: createExpoRecorderService({
      avModule: ExpoAV, // Grabador de audio/video / Audio/video recorder
    }),
  };
