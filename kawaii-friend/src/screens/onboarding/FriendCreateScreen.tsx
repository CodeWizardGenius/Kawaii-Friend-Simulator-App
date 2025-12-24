import React from "react";
import { Text, TextInput, Pressable, View, Alert } from "react-native";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../auth/AuthProvider";
import Screen from "../../ui/Screen";

const DEFAULT_STATE = "happy" as const;

export default function FriendCreateScreen() {
  const [name, setName] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const { refreshHasFriend } = useAuth();

  const onCreate = async () => {
    const u = auth.currentUser;
    if (!u) return;

    if (!name.trim()) {
      Alert.alert("Name required", "Arkadaşına bir isim ver 🙂");
      return;
    }

    try {
      setBusy(true);
      await setDoc(
        doc(db, "users", u.uid),
        {
          email: u.email ?? "",
          friendName: name.trim(),
          friendState: DEFAULT_STATE,
          lastInteraction: serverTimestamp(),
          happinessScore: 50,
          level: 1,
          notificationsEnabled: true,
        },
        { merge: true }
      );

      await refreshHasFriend();
    } catch (e: any) {
      Alert.alert("Failed", e?.message ?? "Unknown error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <Text className="text-3xl font-bold text-center mt-2">
        Meet your friend 🐣
      </Text>

      <View className="bg-white rounded-3xl shadow-sm mt-6 p-6 gap-3">
        <Text className="text-slate-600">Give your kawaii friend a name:</Text>

        <TextInput
          className="bg-slate-100 rounded-2xl px-4 py-3"
          placeholder="e.g. Momo"
          value={name}
          onChangeText={setName}
        />

        <Pressable
          className={`rounded-2xl py-4 items-center ${
            busy ? "bg-indigo-300" : "bg-indigo-600"
          }`}
          onPress={onCreate}
          disabled={busy}
        >
          <Text className="text-white font-semibold">Create</Text>
        </Pressable>
      </View>

      <View className="items-center mt-6">
        <Text className="text-6xl">🌸</Text>
        <Text className="text-slate-500 mt-2">Pastel vibes only</Text>
      </View>
    </Screen>
  );
}
