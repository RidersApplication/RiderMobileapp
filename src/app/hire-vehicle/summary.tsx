import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PricingSummaryScreen() {
  const router = useRouter();

  const handleProceedToConfirmation = () => {
    router.push('/hire-vehicle/confirmed' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pricing Summary</Text>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={20} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Vehicle Header Card */}
        <View style={styles.vehicleHeaderCard}>
          <View style={styles.vehicleImageWrap}>
            <Image
              source={require('../../../assets/map.png')}
              style={styles.vehicleImage}
              resizeMode="cover"
            />
            <View style={styles.premiumChoiceBadge}>
              <Text style={styles.premiumChoiceText}>PREMIUM CHOICE</Text>
            </View>
          </View>

          <View style={styles.vehicleHeaderBody}>
            <Text style={styles.heavyFleetTag}>HEAVY DUTY FLEET</Text>
            <Text style={styles.vehicleName}>Toyota Hilux 2023</Text>
            <View style={styles.capacityRow}>
              <Ionicons name="bag-handle-outline" size={14} color="#7F7774" style={{ marginRight: 4 }} />
              <Text style={styles.capacityText}>1.2 Tons capacity</Text>
            </View>
          </View>
        </View>

        {/* Duration & Quantity Cards Row */}
        <View style={styles.metaCardsRow}>
          <View style={styles.metaBox}>
            <Ionicons name="calendar-outline" size={20} color="#B8521B" style={{ marginBottom: 6 }} />
            <Text style={styles.metaLabel}>DURATION</Text>
            <Text style={styles.metaValue}>3 Days</Text>
          </View>

          <View style={styles.metaBox}>
            <MaterialCommunityIcons name="truck-outline" size={22} color="#B8521B" style={{ marginBottom: 6 }} />
            <Text style={styles.metaLabel}>QUANTITY</Text>
            <Text style={styles.metaValue}>1 Vehicle</Text>
          </View>
        </View>

        {/* Pickup Location Box */}
        <View style={styles.locationBox}>
          <View style={styles.locIconCircle}>
            <Ionicons name="location-outline" size={20} color="#B8521B" />
          </View>
          <View>
            <Text style={styles.locLabel}>PICKUP LOCATION</Text>
            <Text style={styles.locValue}>Lagos Logistics Hub</Text>
          </View>
        </View>

        {/* Financial Breakdown Card */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownHeaderRow}>
            <View style={styles.orangeBar} />
            <Text style={styles.breakdownTitle}>Financial Breakdown</Text>
          </View>

          <View style={styles.breakdownItem}>
            <View>
              <Text style={styles.itemTitle}>Base Hire Rate</Text>
              <Text style={styles.itemSub}>Standard per-day pricing</Text>
            </View>
            <Text style={styles.itemAmount}>₦450,000</Text>
          </View>

          <View style={styles.breakdownItem}>
            <View>
              <Text style={styles.itemTitle}>Logistics Surcharge</Text>
              <Text style={styles.itemSub}>Maintenance &amp; fueling levy</Text>
            </View>
            <Text style={styles.itemAmount}>₦24,000</Text>
          </View>

          <View style={styles.breakdownItem}>
            <View>
              <Text style={styles.itemTitle}>Insurance Coverage</Text>
              <Text style={styles.compSub}>COMPREHENSIVE</Text>
            </View>
            <Text style={styles.freeGreenText}>Free</Text>
          </View>

          {/* Dark Total Card */}
          <View style={styles.darkTotalCard}>
            <View style={styles.darkTotalTextGroup}>
              <Text style={styles.darkTotalLabel}>TOTAL AMOUNT</Text>
              <Text style={styles.darkTaxText}>Tax included</Text>
            </View>
            <Text style={styles.darkTotalValue}>₦474,000</Text>
          </View>
        </View>

        {/* Insurance Information Card */}
        <View style={styles.insuranceCard}>
          <Ionicons name="shield-checkmark" size={22} color="#0D9488" style={styles.shieldIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.insuranceTitle}>Insurance Information</Text>
            <Text style={styles.insuranceText}>
              Every hire includes our comprehensive protection plan. This covers accidental damage, third-party liability, and 24/7 roadside assistance at no extra cost to you.
            </Text>
          </View>
        </View>

        {/* Confirm and Reserve Action Button */}
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleProceedToConfirmation}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Confirm &amp; Reserve Vehicle</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF9',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF9',
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
  },
  menuButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  vehicleHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  vehicleImageWrap: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#F5EFEB',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  premiumChoiceBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#F07D3B',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  premiumChoiceText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  vehicleHeaderBody: {
    padding: 18,
  },
  heavyFleetTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B8521B',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  vehicleName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1D1614',
    marginBottom: 6,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7F7774',
  },
  metaCardsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1D1614',
  },
  locationBox: {
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  locLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  locValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  breakdownHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  orangeBar: {
    width: 5,
    height: 20,
    backgroundColor: '#F07D3B',
    borderRadius: 3,
    marginRight: 10,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1D1614',
  },
  itemSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  itemAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D1614',
  },
  compSub: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B8521B',
    marginTop: 2,
  },
  freeGreenText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D9488',
  },
  darkTotalCard: {
    backgroundColor: '#1D1614',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  darkTotalTextGroup: {
    flex: 1,
  },
  darkTotalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A09895',
    letterSpacing: 0.8,
  },
  darkTaxText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  darkTotalValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#F07D3B',
  },
  insuranceCard: {
    backgroundColor: '#E0F2FE',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  shieldIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  insuranceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0369A1',
    marginBottom: 4,
  },
  insuranceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0C4A6E',
    lineHeight: 18,
  },
  confirmBtn: {
    height: 56,
    backgroundColor: '#F07D3B',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
