import { auth, db } from "../lib/firebase";
import { doc, updateDoc, serverTimestamp, collection, getDocs, deleteDoc } from "firebase/firestore";

function requireUid() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("User not authenticated");
  return uid;
}

export async function resetFriend(opts?: { clearHistory?: boolean }) {
  const uid = requireUid();

  await updateDoc(doc(db, "users", uid), {
    friendState: "hungry",
    happinessScore: 50,
    level: 1,
    lastInteraction: serverTimestamp(),
    resetAt: serverTimestamp(),
  });

  if (opts?.clearHistory) {
    const histRef = collection(db, "users", uid, "history");
    const snap = await getDocs(histRef);
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  }
}
