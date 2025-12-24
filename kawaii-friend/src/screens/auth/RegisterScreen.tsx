import React from "react";
import { Text, TextInput, Pressable, View, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Screen from "../../ui/Screen";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const onRegister = async () => {
    try {
      setBusy(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      Alert.alert("Register failed", e?.message ?? "Unknown error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <Text className="text-3xl font-bold text-center mt-2">
        Create Account 🌸
      </Text>

      <View className="bg-white rounded-3xl shadow-sm mt-6 p-6 gap-3">
        <TextInput
          className="bg-slate-100 rounded-2xl px-4 py-3"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="bg-slate-100 rounded-2xl px-4 py-3"
          placeholder="Password (min 6)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          className={`rounded-2xl py-4 items-center ${
            busy ? "bg-indigo-300" : "bg-indigo-600"
          }`}
          onPress={onRegister}
          disabled={busy}
        >
          <Text className="text-white font-semibold">Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()}>
          <Text className="text-center text-slate-600">Back to Login</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
