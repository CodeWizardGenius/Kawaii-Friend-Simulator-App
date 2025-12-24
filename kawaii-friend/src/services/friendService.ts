import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { scheduleInactivityReminders, cancelAllScheduled } from "../lib/notifications";

export type InteractionType = "feed" | "play" | "rest";

/**
 * Applies an interaction (feed, play, rest) and updates Firestore.
 * Also reschedules inactivity reminders if notifications are enabled.
 */
export async function applyInteraction(type: InteractionType): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");

  const userRef = doc(db, "users", uid);

  // Update lastInteraction timestamp
  await updateDoc(userRef, {
    lastInteraction: serverTimestamp(),
    lastInteractionType: type,
  });

  // Check if notifications are enabled before rescheduling
  const userSnap = await getDoc(userRef);
  const enabled = userSnap.exists() ? !!userSnap.data()?.notificationsEnabled : true;

  if (enabled) {
    // User interacted -> cancel old schedules and set new ones
    await cancelAllScheduled();
    await scheduleInactivityReminders();
  }
}
