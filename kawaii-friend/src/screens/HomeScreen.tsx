import React from "react";
import { Text, View, Pressable } from "react-native";
import Screen from "../ui/Screen";

export default function HomeScreen() {
  return (
    <Screen>
      <Text className="text-3xl font-bold text-center mt-2">My Friend</Text>

      <View className="bg-white rounded-3xl shadow-sm mt-6 p-6 items-center justify-center flex-1">
        <Text className="text-6xl">🐣</Text>
        <Text className="text-xl font-semibold mt-3">Momo</Text>
        <Text className="text-base mt-1 text-slate-500">State: happy</Text>
      </View>

      <View className="flex-row gap-3 mt-5">
        <Pressable className="flex-1 bg-indigo-600 rounded-2xl py-4 items-center">
          <Text className="text-white font-semibold">🍎 Feed</Text>
        </Pressable>
        <Pressable className="flex-1 bg-indigo-600 rounded-2xl py-4 items-center">
          <Text className="text-white font-semibold">🎮 Play</Text>
        </Pressable>
        <Pressable className="flex-1 bg-indigo-600 rounded-2xl py-4 items-center">
          <Text className="text-white font-semibold">💤 Rest</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
