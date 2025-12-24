import React from "react";
import { Text, View } from "react-native";
import Screen from "../ui/Screen";

export default function CommunityScreen() {
  return (
    <Screen>
      <Text className="text-3xl font-bold text-center mt-2">History</Text>
      <View className="bg-white rounded-3xl shadow-sm mt-6 p-6">
        <Text className="text-slate-600">
          Son etkileşimler burada listelenecek.
        </Text>
      </View>
    </Screen>
  );
}
