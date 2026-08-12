import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Missing details", "Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password should be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Please confirm your password correctly.");
      return;
    }

    router.push('/auth/otp');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Hello! Register to get{"\n"}started</Text>

      <TextInput placeholder="Username" style={styles.input}
        placeholderTextColor="#000000" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#000000" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} placeholderTextColor="#000000" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Confirm password" style={styles.input} placeholderTextColor="#000000" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.or}>Or Register with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="facebook" size={20} color="#1877F2" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="google" size={20} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="apple" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.loginNow}> Login Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    padding: 24,
    paddingTop: 60,
  },
  contentContainer: {
    flexGrow: 1,
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
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2e3237",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#e9edf0",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    color: "#2e3237",
  },
  registerBtn: {
    backgroundColor: "#d96c0b",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  registerText: {
    color: "#fff",
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  or: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#777",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  socialBtn: {
    flex: 1,
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomText: {
    color: "#555",
  },
  loginNow: {
    color: "#2f9eb3",
    fontWeight: "600",
  },
});