import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function RegistrationSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../../assets/Successmark (1).png")} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>Registration Successful</Text>
        <Text style={styles.subtitle}>Your account is ready. You can now sign in and continue.</Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => router.replace("/auth/login")}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { marginLeft:30, marginRight:30, padding: 40,flex: 1, backgroundColor: "#f1efefeb",  justifyContent: "space-between" },
  content: { marginTop: 100, flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 10 },
  icon: { width: 90, height: 90, marginBottom: 22 },
  title: { fontSize: 26, fontWeight: "700", color: "#202124", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 15, color: "#6B7280", textAlign: "center", lineHeight: 22, paddingHorizontal: 12, marginBottom: 28 },
  button: { marginBottom: 200,width: "100%", height: 58, borderRadius: 12, backgroundColor: "#FF9D42", justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 18 },
});
