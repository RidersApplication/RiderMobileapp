import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function BookingConfirmedScreen() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.replace('/hire-vehicle/dashboard' as any);
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
        <Text style={styles.headerTitle}>Booking Confirmed</Text>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={20} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Large Check Circle */}
        <View style={styles.checkCircleOuter}>
          <View style={styles.checkCircleInner}>
            <Ionicons name="checkmark" size={48} color="#FFFFFF" />
          </View>
        </View>

        {/* Heading & Subtext */}
        <Text style={styles.mainTitle}>Booking Confirmed!</Text>
        <Text style={styles.subTitle}>Your Toyota Hilux is ready for pickup.</Text>

        {/* Reference Pill */}
        <View style={styles.refPill}>
          <Text style={styles.refLabel}>
            REFERENCE <Text style={styles.refCode}>#KH-99234812</Text>
          </Text>
        </View>

        {/* Vehicle Details Card */}
        <View style={styles.vehicleDetailsCard}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.detailsTag}>VEHICLE DETAILS</Text>
              <Text style={styles.vehicleName}>Toyota Hilux 2023</Text>
            </View>
            <View style={styles.carGraphicCircle}>
              <MaterialCommunityIcons name="car-side" size={32} color="#D1C7BD" />
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar-outline" size={18} color="#B8521B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.metaSub}>Duration &amp; Dates</Text>
              <Text style={styles.metaVal}>3 Days (Oct 24 - Oct 27, 2026)</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-outline" size={18} color="#B8521B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.metaSub}>Pickup Location</Text>
              <Text style={styles.metaVal}>Lagos Logistics Hub</Text>
            </View>
          </View>
        </View>

        {/* Feature Benefit Boxes Row */}
        <View style={styles.perksRow}>
          {/* Perk 1: Fully Insured */}
          <View style={[styles.perkBox, { backgroundColor: '#FFEDD5' }]}>
            <Ionicons name="shield-outline" size={22} color="#C2410C" style={{ marginBottom: 12 }} />
            <Text style={[styles.perkTitle, { color: '#9A3412' }]}>
              Fully Insured{'\n'}Coverage
            </Text>
          </View>

          {/* Perk 2: 24/7 Assistance */}
          <View style={[styles.perkBox, { backgroundColor: '#22D3EE' }]}>
            <Ionicons name="headset-outline" size={22} color="#083344" style={{ marginBottom: 12 }} />
            <Text style={[styles.perkTitle, { color: '#083344' }]}>
              24/7 Roadside{'\n'}Assistance
            </Text>
          </View>
        </View>

        {/* Action Button: Go to Dashboard */}
        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={handleGoToDashboard}
          activeOpacity={0.85}
        >
          <Text style={styles.dashboardBtnText}>Go to Dashboard</Text>
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
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  checkCircleOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkCircleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1D1614',
    textAlign: 'center',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6E6663',
    textAlign: 'center',
    marginBottom: 20,
  },
  refPill: {
    backgroundColor: '#F5EFEB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 24,
  },
  refLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  refCode: {
    color: '#B8521B',
    fontWeight: '900',
  },
  vehicleDetailsCard: {
    width: '100%',
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailsTag: {
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
  },
  carGraphicCircle: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#F9F6F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FFF0EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  metaSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
  },
  metaVal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
    marginTop: 2,
  },
  perksRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 14,
    marginBottom: 28,
  },
  perkBox: {
    flex: 1,
    height: 110,
    borderRadius: 22,
    padding: 16,
    justifyContent: 'center',
  },
  perkTitle: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  dashboardBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#F07D3B',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  dashboardBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
