import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface DriverBottomTabProps {
  activeTab?: string;
}

export default function DriverBottomTab({ activeTab }: DriverBottomTabProps = {}) {
  const router = useRouter();
  const pathname = usePathname() ?? "";

  const tabs = [
    { key: "dashboard", label: "Dashboard", route: "/driver/dashboard", icon: "speedometer-outline" },
    { key: "earnings", label: "Earnings", route: "/driver/earnings", icon: "wallet-outline" },
    { key: "rides", label: "My Trips", route: "/driver/trips", icon: "car-outline" },
    { key: "profile", label: "Profile", route: "/driver/profile", icon: "person-outline" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab ? activeTab === tab.key : pathname === tab.route;
        const color = isActive ? "#F07D3B" : "#A6A6A6";

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            style={styles.tabItem}
            onPress={() => {
              if (tab.route === "/driver/dashboard") {
                router.push("/driver/dashboard" as any);
              } else {
                router.push(tab.route as any);
              }
            }}
          >
            <Ionicons name={tab.icon as any} size={24} color={color} />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    zIndex: 20,
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    marginTop: 4,
    fontSize: 11,
    color: "#A6A6A6",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#F07D3B",
    fontWeight: "800",
  },
});
