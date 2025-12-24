import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export function configureNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  // Simulator'da kısıtlı olabilir, ama yine de deneyelim
  if (Platform.OS === "web") return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function cancelAllScheduled() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Test edilebilir senaryo: kullanıcı etkileşim yapmazsa 2 dk sonra "özledi" bildirimi.
 * Ayrıca "beslenmeye ihtiyacı var" gibi ikinci bir örnek daha planlıyoruz.
 */
export async function scheduleInactivityReminders() {
  // 1) "özledi"
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Arkadaşın seni özledi 🥺",
      body: "Hadi bir selam ver, birlikte takılın!",
    },
    trigger: { seconds: 120, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
  });

  // 2) "beslenmeye ihtiyacı var"
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Beslenmeye ihtiyacı var 🍎",
      body: "Biraz mama iyi gelir!",
    },
    trigger: { seconds: 240, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
  });
}
