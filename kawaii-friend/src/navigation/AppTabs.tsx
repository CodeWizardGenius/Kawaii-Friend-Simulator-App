import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CommunityScreen from "../screens/CommunityScreen";
import SettingsScreen from "../screens/SettingsScreen";

export type TabParamList = {
  Home: undefined;
  Community: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "My Friend" }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ title: "History" }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
