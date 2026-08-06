import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert("Missing email", "Please enter your email address.");
      return;
    }

    router.push('/auth/otp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter your email and we will send you a verification code.</Text>

      <TextInput
        placeholder="Email address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Send Code</Text>
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
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
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
