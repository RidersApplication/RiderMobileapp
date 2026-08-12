import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import BottomTab from "../components/bottom-tab";

import AppHeader from "../components/app-header";

export default function HomeScreen() {
  const router = useRouter();
  const [isHireHovered, setIsHireHovered] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* ================= HEADER ================= */}
      <AppHeader />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ================= LOCATION CARD ================= */}
        <View style={styles.locationCard}>
          <Text style={styles.label}>PICKUP LOCATION</Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.locationInput}>
            <Ionicons name="location-outline" size={22} color="#FF9D42" />
            <Text style={styles.locationText}>123 Innovation Drive, Tech Hub</Text>
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: 18 }]}>DESTINATION</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.destinationInput}
            onPress={() => router.push("/map-home" as any)}
          >
            <Feather name="search" size={21} color="#B8B8B8" />
            <TextInput
              placeholder="Where are you going?"
              placeholderTextColor="#B8B8B8"
              editable={false}
              style={styles.destinationText}
            />
          </TouchableOpacity>
        </View>

        {/* ================= SERVICES ================= */}
        <Text style={styles.serviceTitle}>Our Services</Text>

        <View style={styles.serviceRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.serviceCard, styles.activeCard]}
            onPress={() => router.push("/map-home" as any)}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="car" size={26} color="#FF9D42" />
            </View>

            <Text style={styles.cardTitle}>Book a Ride</Text>
            <Text style={styles.cardSubtitle}>Instant city travel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.serviceCard}
            onPress={() => router.push("/send-package/index" as any)}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={25}
                color="#FF9D42"
              />
            </View>

            <Text style={styles.cardTitle}>Send Package</Text>
            <Text style={styles.cardSubtitle}>Door-to-door delivery</Text>
          </TouchableOpacity>
        </View>

        {/* ================= HIRE VEHICLE ================= */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.hireCard, isHireHovered && styles.hireCardHovered]}
          onPress={() => router.push("/hire-vehicle/register" as any)}
          onPressIn={() => setIsHireHovered(true)}
          onPressOut={() => setIsHireHovered(false)}
          // @ts-ignore - Web hover events
          onMouseEnter={() => setIsHireHovered(true)}
          // @ts-ignore - Web hover events
          onMouseLeave={() => setIsHireHovered(false)}
        >
          <View style={styles.hireLeft}>
            <View style={[styles.iconBox, isHireHovered && { backgroundColor: '#FFEADF' }]}>
              <MaterialCommunityIcons
                name="tow-truck"
                size={26}
                color="#FF9D42"
              />
            </View>

            <View style={{ marginLeft: 15 }}>
              <Text style={[styles.hireTitle, isHireHovered && { color: '#B8521B' }]}>Hire Vehicle</Text>
              <Text style={styles.hireSubtitle}>Heavy duty transport</Text>
            </View>
          </View>

          <View style={[styles.businessBadge, isHireHovered && { backgroundColor: '#B8521B' }]}>
            <Text style={styles.businessText}>BUSINESS</Text>
          </View>
        </TouchableOpacity>

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
    marginBottom: 20,
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    backgroundColor: "#FFEDD6",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarPlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    backgroundColor: "#FFEDD6",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D96C0B",
  },

  avatarInitials: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D96C0B",
  },

  welcomeText: {
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 2,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },

  locationCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18,
    marginTop: 30,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 1,
    marginBottom: 10,
  },

  locationInput: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    marginLeft: 10,
    color: "#202124",
    fontSize: 15,
    flex: 1,
  },

  destinationInput: {
    marginTop: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  destinationText: {
    marginLeft: 10,
    flex: 1,
    color: "#222",
    fontSize: 15,
  },

  serviceTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginHorizontal: 20,
    marginBottom: 15,
  },

  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 18,
  },

  serviceCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  activeCard: {
    borderWidth: 2,
    borderColor: "#FF9D42",
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#FFF4EA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 6,
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#7A7A7A",
    lineHeight: 20,
  },

  hireCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    marginBottom: 95,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  hireCardHovered: {
    backgroundColor: "#FFF0EC",
    borderColor: "#F07D3B",
    shadowColor: "#F07D3B",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },

  hireLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  hireTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  hireSubtitle: {
    marginTop: 5,
    color: "#8A8A8A",
    fontSize: 13,
  },

  businessBadge: {
    backgroundColor: "#FF9D42",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  businessText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
