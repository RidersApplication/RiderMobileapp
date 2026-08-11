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
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import BottomTab from "../components/bottom-tab";

import AppHeader from "../components/app-header";

export default function PriceRangeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const destination = Array.isArray(params.destination)
    ? params.destination[0]
    : params.destination || "T Building, Wuse 2";

  const MIN_PRICE = 1500;
  const MAX_PRICE = 7000;
  const STEP = 100;
  const [prices, setPrices] = useState<[number, number]>([2500, 4500]);

  const updatePrice = (index: 0 | 1, delta: number) => {
    setPrices(([min, max]) => {
      if (index === 0) {
        const nextMin = Math.min(Math.max(min + delta, MIN_PRICE), max - 1500);
        return [nextMin, max];
      }
      const nextMax = Math.max(Math.min(max + delta, MAX_PRICE), min + 1500);
      return [min, nextMax];
    });
  };

  const trackRange = MAX_PRICE - MIN_PRICE;
  const filledLeft = ((prices[0] - MIN_PRICE) / trackRange) * 100;
  const filledWidth = ((prices[1] - prices[0]) / trackRange) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <AppHeader showBackButton />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.locationCard}>
          <Text style={styles.label}>PICKUP LOCATION</Text>
          <View style={styles.inputRow}>
            <Ionicons name="location-outline" size={20} color="#FF9D42" />
            <Text style={styles.locationText}>123 Innovation Drive, Tech Hub</Text>
          </View>

          <Text style={[styles.label, { marginTop: 18 }]}>DESTINATION</Text>
          <View style={styles.inputRow}>
            <Feather name="search" size={18} color="#999" />
            <TextInput
              value={destination}
              editable={false}
              style={styles.destinationInput}
            />
          </View>
        </View>

        <View style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <View>
              <Text style={styles.priceTitle}>Set Your Price Range</Text>
              <Text style={styles.subtitle}>
                Drivers will bid within this range
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>BIDDING ACTIVE</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceCardEntry}>
              <Text style={styles.priceLabel}>Base Price (Min)</Text>
              <View style={styles.priceBox}>
                <Text style={styles.amount}>₦ {prices[0]}</Text>
              </View>
              <View style={styles.adjustRow}>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => updatePrice(0, -STEP)}
                >
                  <Text style={styles.adjustText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => updatePrice(0, STEP)}
                >
                  <Text style={styles.adjustText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.priceCardEntry}>
              <Text style={styles.priceLabel}>Max Price</Text>
              <View style={styles.priceBox}>
                <Text style={styles.amount}>₦ {prices[1]}</Text>
              </View>
              <View style={styles.adjustRow}>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => updatePrice(1, -STEP)}
                >
                  <Text style={styles.adjustText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => updatePrice(1, STEP)}
                >
                  <Text style={styles.adjustText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFilled,
                  { left: `${filledLeft}%`, width: `${filledWidth}%` },
                ]}
              />
              <View style={[styles.thumb, { left: `${filledLeft}%` }]} />
              <View style={[styles.thumb, { left: `${filledLeft + filledWidth}%` }]} />
            </View>
          </View>

          <View style={styles.recommendCard}>
            <Ionicons name="bulb" size={18} color="#FF9D42" />
            <Text style={styles.recommendText}>
              Recommended: ₦2,500 - ₦4,000
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="alert-circle-outline" size={16} color="#EF4444" />
            <Text style={styles.infoText}>
              Price range must have at least ₦1500 difference to attract
              drivers and improve matching.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Ionicons name="time-outline" size={18} color="#444" />
            <Text style={styles.footerText}>PICKUP IN 4 MINS</Text>
          </View>
          <View style={styles.footerItem}>
            <Ionicons name="location-outline" size={18} color="#444" />
            <Text style={styles.footerText}>12.4 KM</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => router.push("/driversoffer")}
        >
          <Text style={styles.buttonText}>Find Drivers</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>


      <BottomTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    backgroundColor: "#FFEDD6",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D96C0B",
  },
  smallText: {
    fontSize: 14,
    color: "#8C8C8C",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#202124",
    marginTop: 2,
  },
  locationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 30,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  label: {
    fontSize: 11,
    color: "#9C9C9C",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  inputRow: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#202124",
    flex: 1,
  },
  destinationInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "#202124",
  },
  priceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    marginBottom: 18,
  },
  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 22,
  },
  priceTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#202124",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  badge: {
    backgroundColor: "#FFE8D2",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },
  badgeText: {
    color: "#A65B11",
    fontSize: 10,
    fontWeight: "700",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  priceCardEntry: {
    width: "48%",
  },
  adjustRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  adjustButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFF2EF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  adjustText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF9D42",
  },
  priceLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceBox: {
    width: 120,
    height: 56,
    backgroundColor: "#FFF2EF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: 26,
    fontWeight: "700",
    color: "#202124",
  },
  sliderContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  sliderTrack: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E8DCDC",
    position: "relative",
  },
  sliderFilled: {
    position: "absolute",
    top: 0,
    height: "100%",
    backgroundColor: "#FF9D42",
  },
  thumb: {
    position: "absolute",
    top: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#FF9D42",
  },
  recommendCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F2",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFD5AD",
    padding: 14,
    marginBottom: 18,
  },
  recommendText: {
    marginLeft: 10,
    color: "#F28A24",
    fontWeight: "600",
    fontSize: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
    color: "#777",
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
  },
  button: {
    height: 58,
    backgroundColor: "#FF9D42",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 25,
    shadowColor: "#FF9D42",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 5,
  },
});
