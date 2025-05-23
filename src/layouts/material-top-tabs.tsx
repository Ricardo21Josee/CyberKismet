import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

// Crea el componente Navigator para tabs superiores / Create Navigator component for top tabs
const { Navigator } = createMaterialTopTabNavigator();

// Exporta el layout de tabs superiores personalizado para Expo Router / Export custom top tabs layout for Expo Router
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);
