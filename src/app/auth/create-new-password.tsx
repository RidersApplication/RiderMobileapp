import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CreateNewPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    router.replace("/auth/registration-success");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
        <Ionicons name="chevron-back" size={25} color="#202124" />
      </TouchableOpacity>

      <Text style={styles.title}>Create new password</Text>
      <Text style={styles.subtitle}>
        Your new password must be unique from tho
        previously used.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
  
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 38,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#202124",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#7C8AA5",
    lineHeight: 24,
    marginBottom: 35,
  },

  inputContainer: {
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9EDF3",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 18,
    justifyContent: "center",
    marginBottom: 18,
  },

  input: {
    fontSize: 16,
    color: "#202124",
  },

  button: {
    height: 58,
    borderRadius: 12,
    backgroundColor: "#FF9D42",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
