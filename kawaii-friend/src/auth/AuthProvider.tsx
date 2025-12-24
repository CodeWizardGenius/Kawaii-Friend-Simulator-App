import React from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  hasFriend: boolean;
  refreshHasFriend: () => Promise<void>;
};

const AuthContext = React.createContext<AuthCtx | undefined>(undefined);

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [hasFriend, setHasFriend] = React.useState(false);

  const checkHasFriend = React.useCallback(async (uid: string) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    setHasFriend(snap.exists() && !!snap.data()?.friendName);
  }, []);

  const refreshHasFriend = React.useCallback(async () => {
    if (!auth.currentUser) return;
    await checkHasFriend(auth.currentUser.uid);
  }, [checkHasFriend]);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u: User | null) => {
      setUser(u);
      if (u) await checkHasFriend(u.uid);
      else setHasFriend(false);
      setLoading(false);
    });
    return unsub;
  }, [checkHasFriend]);

  return (
    <AuthContext.Provider
      value={{ user, loading, hasFriend, refreshHasFriend }}
    >
      {children}
    </AuthContext.Provider>
  );
}
