import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../auth/AuthProvider";
import AppTabs from "./AppTabs";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import FriendCreateScreen from "../screens/onboarding/FriendCreateScreen";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  FriendCreate: undefined;
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, loading, hasFriend } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
      </Stack.Navigator>
    );
  }

  if (!hasFriend) {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="FriendCreate"
          component={FriendCreateScreen}
          options={{ title: "Create Your Friend", headerBackVisible: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
    </Stack.Navigator>
  );
}
