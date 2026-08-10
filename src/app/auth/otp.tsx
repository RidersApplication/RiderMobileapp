import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function OtpScreen() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (code.length < 4) {
      Alert.alert("Incomplete code", "Please enter the 4-digit code.");
      return;
    }

    router.replace('/auth/create-new-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>Enter the 4-digit code sent to your email.</Text>

      <TextInput
        placeholder="Enter OTP"
        style={styles.input}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    padding: 40,
    flex: 1,
    backgroundColor: "#f4f4f4",
    
    paddingTop: 24,
    paddingBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2e3237",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    marginBottom: 24,
  },
  input: {
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#d96c0b",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
