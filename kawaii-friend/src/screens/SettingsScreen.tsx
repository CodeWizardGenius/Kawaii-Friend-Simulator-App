import React from "react";
import { Text, View, Switch } from "react-native";
import Screen from "../ui/Screen";

export default function SettingsScreen() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <Screen>
      <Text className="text-3xl font-bold text-center mt-2">Settings</Text>

      <View className="bg-white rounded-3xl shadow-sm mt-6 p-6 flex-row items-center justify-between">
        <View>
          <Text className="text-base font-semibold">🔔 Notifications</Text>
          <Text className="text-slate-500 mt-1">Aç / Kapat</Text>
        </View>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </Screen>
  );
}
