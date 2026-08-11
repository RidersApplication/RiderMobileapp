import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../context/user-context";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}
