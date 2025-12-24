import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/auth/AuthProvider";
import RootNavigator from "./src/navigation/RootNavigator";
import { configureNotificationHandler } from "./src/lib/notifications";
import ThemeProvider from "./src/theme/ThemeProvider";

export default function App() {
  React.useEffect(() => {
    configureNotificationHandler();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
