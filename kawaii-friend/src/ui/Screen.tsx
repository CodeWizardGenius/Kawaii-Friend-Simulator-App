import React from "react";
import { SafeAreaView, View } from "react-native";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-5 py-4">{children}</View>
    </SafeAreaView>
  );
}
