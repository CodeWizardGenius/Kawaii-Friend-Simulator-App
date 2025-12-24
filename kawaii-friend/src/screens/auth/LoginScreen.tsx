import React from "react";
import { Text, TextInput, Pressable, View, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { auth } from "../../lib/firebase";
import Screen from "../../ui/Screen";

type Props = NativeStackScreenProps<any>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const onLogin = async () => {
    try {
      setBusy(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      Alert.alert("Login failed", e?.message ?? "Unknown error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <Text className="text-3xl font-bold text-center mt-2">Welcome ✨</Text>

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
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          className={`rounded-2xl py-4 items-center ${
            busy ? "bg-indigo-300" : "bg-indigo-600"
          }`}
          onPress={onLogin}
          disabled={busy}
        >
          <Text className="text-white font-semibold">Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text className="text-center text-slate-600">
            No account? <Text className="font-semibold">Register</Text>
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
