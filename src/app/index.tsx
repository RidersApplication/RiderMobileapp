import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#FF9D42",
  white: "#FFFFFF",
  black: "#1F2937",
};

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/img (1).png")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => router.push('/admin/login' as any)}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/Layer_1 (1).png")}
              resizeMode="contain"
              style={styles.logo}
            />
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginButton}
              onPress={() => router.push("/auth/login")}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.registerButton}
              onPress={() => router.push("/auth/register")}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/driver" as any)}
            >
              <Text style={styles.driverText}>Want to be a driver?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.32,
    height: width * 0.32,
    marginTop: 300,
    marginLeft: 10,
  },
  
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButton: {
    width: 320,
    height: 58,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 18,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  registerButton: {
    width: 320,
    height: 58,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 28,
  },
  registerText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "600",
  },
  driverText: {
    color: COLORS.white,
    fontSize: 17,
    textAlign: "center",
    fontWeight: "500",
  },
});
