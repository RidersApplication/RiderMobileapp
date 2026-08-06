import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import BottomTab from "../components/bottom-tab";

export default function MapHomeScreen() {
  const router = useRouter();
  const [destination, setDestination] = useState("T Building Wuse 2");

  const goToPriceRange = (selectedDestination: string) => {
    router.push(`/price-range?destination=${encodeURIComponent(selectedDestination)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>

        <View style={styles.userRow}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>OG</Text>
          </View>

          <View>
            <Text style={styles.smallText}>Welcome back</Text>
            <Text style={styles.name}>Hello, Oge</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notification}
          activeOpacity={0.8}
          onPress={() => alert("Notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          <Image
            source={require("../../assets/map.png")}
            style={styles.map}
            resizeMode="cover"
          />

          <View style={styles.arrivalBubble}>
            <Text style={styles.arrivalText}>Arrive by 20:23</Text>
          </View>

          <View style={styles.timeBubble}>
            <Text style={styles.timeNumber}>26</Text>
            <Text style={styles.timeMinute}>min</Text>
          </View>
        </View>

        <View style={styles.locationCard}>
          <Text style={styles.label}>PICKUP LOCATION</Text>

          <View style={styles.inputRow}>
            <Ionicons name="location-outline" color="#FF9D42" size={20} />
            <Text style={styles.locationText}>123 Innovation Drive, Tech Hub</Text>
          </View>

          <Text style={[styles.label, { marginTop: 15 }]}>DESTINATION</Text>

          <View style={styles.inputRow}>
            <Feather name="search" size={18} color="#999" />
            <TextInput
              value={destination}
              onChangeText={setDestination}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={() => goToPriceRange(destination)}>
              <Text style={styles.save}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.suggestionContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.suggestionCard}
            onPress={() => goToPriceRange("Down Town Wuse 2")}
          >
            <Ionicons name="location-outline" size={20} color="#8A8A8A" />
            <Text style={styles.suggestionText}>Down Town Wuse 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.suggestionCard}
            onPress={() => goToPriceRange("T Bone Area 1")}
          >
            <Ionicons name="location-outline" size={20} color="#8A8A8A" />
            <Text style={styles.suggestionText}>T Bone Area 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.suggestionCard}
            onPress={() => goToPriceRange("Tropical Building Kubwa")}
          >
            <Ionicons name="location-outline" size={20} color="#8A8A8A" />
            <Text style={styles.suggestionText}>Tropical Building Kubwa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 180,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 15,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFEDD6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D96C0B",
  },
  smallText: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  notification: {
    width: 46,
    height: 46,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  mapContainer: {
    height: 340,
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,
  },
  map: {
    flex: 1,
    width: "100%",
  },
  arrivalBubble: {
    position: "absolute",
    top: 18,
    left: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  arrivalText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  timeBubble: {
    position: "absolute",
    top: 18,
    right: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  timeNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  timeMinute: {
    fontSize: 13,
    color: "#7A7A7A",
  },
  locationCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 1,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  locationText: {
    flex: 1,
    marginLeft: 10,
    color: "#202124",
    fontSize: 15,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#202124",
    padding: 0,
  },
  save: {
    color: "#FF9D42",
    fontWeight: "700",
  },
  suggestionContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  suggestionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  suggestionText: {
    marginLeft: 12,
    color: "#1A1A1A",
    fontSize: 15,
  },
});