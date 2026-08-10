import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

type TabRoute = "/home" | "/wallet" | "/activity" | "/rides" | "/profile";

type TabItem =
  | {
      key: "home" | "wallet" | "activity" | "profile";
      label: string;
      route: Exclude<TabRoute, "/rides">;
      icon: IoniconName;
      type: "ion";
    }
  | {
      key: "rides";
      label: string;
      route: "/rides";
      icon: MaterialCommunityIconName;
      type: "material";
    };

const tabs: TabItem[] = [
  { key: "home", label: "Home", route: "/home", icon: "home-outline", type: "ion" },
  { key: "wallet", label: "Wallet", route: "/wallet", icon: "wallet-outline", type: "ion" },
  { key: "activity", label: "Activity", route: "/activity", icon: "time-outline", type: "ion" },
  { key: "rides", label: "Rides", route: "/rides", icon: "car-clock", type: "material" },
  { key: "profile", label: "Profile", route: "/profile", icon: "person-outline", type: "ion" },
];

export default function BottomTab() {
  const router = useRouter();
  const pathname = usePathname() ?? "";

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        const color = isActive ? "#FF9D42" : "#A6A6A6";

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            style={styles.tabItem}
            onPress={() => router.push(tab.route as "/home" | "/wallet" | "/activity" | "/rides" | "/profile")}
          >
            {tab.type === "material" ? (
              <MaterialCommunityIcons name={tab.icon} size={24} color={color} />
            ) : (
              <Ionicons name={tab.icon} size={24} color={color} />
            )}
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
    paddingVertical: 15,
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
    marginTop: 5,
    fontSize: 12,
    color: "#A6A6A6",
  },
  activeTabText: {
    color: "#FF9D42",
    fontWeight: "700",
  },
});
