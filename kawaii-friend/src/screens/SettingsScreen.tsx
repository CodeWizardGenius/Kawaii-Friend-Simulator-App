import React from "react";
import { Text, View, Switch, Alert, Pressable } from "react-native";
import Screen from "../ui/Screen";
import { auth, db } from "../lib/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  requestNotificationPermission,
  scheduleInactivityReminders,
  cancelAllScheduled,
} from "../lib/notifications";
import { resetFriend } from "../services/resetService";
import { useTheme } from "../theme/ThemeProvider";

type UserSettingsDoc = {
  notificationsEnabled?: boolean;
};

export default function SettingsScreen() {
  const { mode, toggle } = useTheme();

  const [enabled, setEnabled] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [busyReset, setBusyReset] = React.useState(false);

  React.useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const ref = doc(db, "users", uid);
    const unsub = onSnapshot(ref, (snap) => {
      const data = (snap.data() ?? {}) as UserSettingsDoc;
      setEnabled(data.notificationsEnabled ?? true);
      setLoading(false);
    });

    return unsub;
  }, []);

  const setFirestoreEnabled = async (value: boolean) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    await updateDoc(doc(db, "users", uid), {
      notificationsEnabled: value,
      settingsUpdatedAt: serverTimestamp(),
    });
  };

  const onToggleNotifications = async (value: boolean) => {
    try {
      setEnabled(value);

      if (value) {
        const ok = await requestNotificationPermission();
        if (!ok) {
          setEnabled(false);
          await setFirestoreEnabled(false);
          Alert.alert(
            "İzin gerekli",
            "Bildirim izni verilmediği için açamadım."
          );
          return;
        }

        await cancelAllScheduled();
        await scheduleInactivityReminders();
        await setFirestoreEnabled(true);
        Alert.alert("Açıldı", "Test için 2-4 dk içinde bildirim gelecek.");
      } else {
        await cancelAllScheduled();
        await setFirestoreEnabled(false);
        Alert.alert("Kapatıldı", "Planlı bildirimler iptal edildi.");
      }
    } catch (e: any) {
      Alert.alert("Hata", e?.message ?? "Unknown error");
    }
  };

  const onReset = async () => {
    Alert.alert(
      "Reset Friend",
      "Arkadaşını sıfırlamak istiyor musun? (State/score/level sıfırlanır)",
      [
        { text: "Vazgeç", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              setBusyReset(true);
              await resetFriend({ clearHistory: true });
              Alert.alert("Tamamlandı", "Arkadaşın sıfırlandı ✅");
            } catch (e: any) {
              Alert.alert("Hata", e?.message ?? "Unknown error");
            } finally {
              setBusyReset(false);
            }
          },
        },
      ]
    );
  };

  const onTestNow = async () => {
    try {
      const ok = await requestNotificationPermission();
      if (!ok) {
        Alert.alert("İzin gerekli", "Bildirim izni yok.");
        return;
      }
      await cancelAllScheduled();
      await scheduleInactivityReminders();
      Alert.alert(
        "Test planlandı",
        "2 dk ve 4 dk sonra örnek bildirimler gelecek."
      );
    } catch (e: any) {
      Alert.alert("Hata", e?.message ?? "Unknown error");
    }
  };

  const cardBg = mode === "dark" ? "bg-slate-900" : "bg-white";
  const textMain = mode === "dark" ? "text-slate-100" : "text-slate-900";
  const textSub = mode === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <Screen>
      <Text className={`text-3xl font-bold text-center mt-2 ${textMain}`}>
        Settings
      </Text>

      {/* Notifications */}
      <View
        className={`${cardBg} rounded-3xl shadow-sm mt-6 p-6 flex-row items-center justify-between`}
      >
        <View className="flex-1 pr-4">
          <Text className={`text-base font-semibold ${textMain}`}>
            🔔 Push Notifications
          </Text>
          <Text className={`${textSub} mt-1`}>
            {loading ? "Loading..." : enabled ? "Açık" : "Kapalı"}
          </Text>
        </View>
        <Switch value={enabled} onValueChange={onToggleNotifications} />
      </View>

      {/* Theme */}
      <View
        className={`${cardBg} rounded-3xl shadow-sm mt-4 p-6 flex-row items-center justify-between`}
      >
        <View className="flex-1 pr-4">
          <Text className={`text-base font-semibold ${textMain}`}>
            🌗 Theme
          </Text>
          <Text className={`${textSub} mt-1`}>
            {mode === "dark" ? "Dark" : "Light"}
          </Text>
        </View>
        <Switch value={mode === "dark"} onValueChange={toggle} />
      </View>

      {/* Reset */}
      <Pressable
        className={`rounded-2xl py-4 items-center mt-4 ${
          busyReset ? "bg-rose-300" : "bg-rose-600"
        }`}
        onPress={onReset}
        disabled={busyReset}
      >
        <Text className="text-white font-semibold">🔄 Reset Friend</Text>
      </Pressable>

      <Text className={`${textSub} text-center mt-4`}>
        Reset: state/score/level ve (opsiyonel) history temizlenir.
      </Text>

      <Pressable
        className="bg-indigo-600 rounded-2xl py-4 items-center mt-4"
        onPress={onTestNow}
      >
        <Text className="text-white font-semibold">Send Test Reminders</Text>
      </Pressable>

      <View className="mt-4">
        <Text className="text-slate-500 text-center">
          Not: Local notification ile test edilir. Fiziksel cihazda daha stabil
          çalışır.
        </Text>
      </View>
    </Screen>
  );
}
