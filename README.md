# Kawaii Friend Simulator (Expo + React Native)

Virtual companion (Tamagotchi/Tomodachi benzeri) mobil uygulama.
Amaç: Expo ekosisteminde state yönetimi, Firebase Auth/Firestore ve Expo Notifications pratik etmek.

## Tech Stack

- Expo (managed workflow)
- React Native + TypeScript
- NativeWind (Tailwind)
- Firebase Authentication (Email/Password)
- Firebase Firestore
- Expo Notifications (local notifications for test)

## Features

- ✅ Auth: Email/Password Login/Register
- ✅ Guard: Login olmadan uygulama açılmaz
- ✅ İlk girişte Friend Create akışı
- ✅ Friend State: hungry/tired/happy/bored (Firestore)
- ✅ Interactions: Feed / Play / Rest (state update + Firestore sync)
- ✅ History (opsiyonel): etkileşim logları
- ✅ Notifications: izin alma + Settings'ten aç/kapat + test edilebilir senaryo
- ✅ Settings: Reset Friend + (Bonus) Light/Dark theme

## Setup

### 1) Install

```bash
npm install
```

### 2) Firebase config

Firebase Console -> Project Settings -> Add Web App -> verilen config'i al.

`src/lib/firebase.ts` içindeki `firebaseConfig` alanını doldur:

```ts
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

### 3) Firebase Console Ayarları

**Authentication**

- Sign-in method -> Email/Password -> Enable

**Firestore**

- Firestore Database -> Create database
- Önerilen rule (user bazlı):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /history/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### 4) Run

```bash
npx expo start
```

## Screenshots

Aşağıdaki ekran görüntüleri repo'ya eklendi:

- `./screenshots/home.png`
- `./screenshots/history.png`
- `./screenshots/settings.png`

## Push Notification Proof

Settings ekranında Notifications ON yapıldıktan sonra "Send Test Reminders" ile:

- 2 dk sonra: "Arkadaşın seni özledi 🥺"
- 4 dk sonra: "Beslenmeye ihtiyacı var 🍎"

Kanıt:

- `./screenshots/notification.png` (veya kısa video linki)

## Notes

- Bildirimler backend olmadan local notifications ile test edilir.
- Fiziksel cihazda daha stabil sonuç verir.

---

## Acceptance Checklist

- [x] Expo + TypeScript
- [x] Firebase Auth (Email/Password)
- [x] Firestore data model + kayıt
- [x] Min 3 interaction (Feed/Play/Rest)
- [x] UI state Firestore ile senkron
- [x] Push permission + toggle + test senaryosu
- [x] Bottom Tab Navigation (3 tab)
- [x] NativeWind UI
