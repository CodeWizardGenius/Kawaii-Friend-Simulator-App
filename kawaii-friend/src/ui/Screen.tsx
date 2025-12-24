import React from "react";
import { SafeAreaView, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function Screen({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();
  const bg = mode === "dark" ? "bg-slate-950" : "bg-slate-50";
  return (
    <SafeAreaView className={`flex-1 ${bg}`}>
      <View className="flex-1 px-5 py-4">{children}</View>
    </SafeAreaView>
  );
}
