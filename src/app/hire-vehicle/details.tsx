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

export default function VehicleDetailsScreen() {
  const router = useRouter();

  const handleHireVehicle = () => {
    router.push('/hire-vehicle/setup' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vehicle Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ================= SECTION 1 (IMAGE 4): HERO & SPECS ================= */}
        <View style={styles.heroWrap}>
          <Image
            source={require('../../../assets/map.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.specsCard}>
          <Text style={styles.fleetNoTag}>FLEET NO: #VK-2022-09</Text>
          <Text style={styles.vehicleTitle}>Hilux NPR 2022</Text>

          <View style={styles.specRow}>
            <View style={styles.specIconBox}>
              <Ionicons name="bag-handle-outline" size={22} color="#B8521B" />
            </View>
            <View>
              <Text style={styles.specLabel}>Cargo Capacity</Text>
              <Text style={styles.specValue}>4 Tons</Text>
            </View>
          </View>

          <View style={styles.specRow}>
            <View style={styles.specIconBox}>
              <Ionicons name="color-fill-outline" size={22} color="#B8521B" />
            </View>
            <View>
              <Text style={styles.specLabel}>Fuel Type</Text>
              <Text style={styles.specValue}>Diesel High-Efficiency</Text>
            </View>
          </View>
        </View>

        {/* ================= SECTION 2 (IMAGE 3): MAINTENANCE & SUSTAINABILITY ================= */}
        {/* Maintenance Overview Card */}
        <View style={styles.maintenanceCard}>
          <View style={styles.scoreRingWrap}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNumber}>98%</Text>
              <Text style={styles.scoreLabel}>SCORE</Text>
            </View>
            <View style={styles.scoreCheckBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
            </View>
          </View>

          <View style={styles.conditionBadgesRow}>
            <View style={styles.excellentBadge}>
              <Text style={styles.excellentBadgeText}>EXCELLENT CONDITION</Text>
            </View>
            <Text style={styles.upToDateText}>Up to date</Text>
          </View>

          <Text style={styles.maintenanceHeading}>Maintenance Overview</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Last Service</Text>
              <Text style={styles.metaVal}>Jan 12, 2026</Text>
            </View>

            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Total Mileage</Text>
              <Text style={styles.metaVal}>24,500 km</Text>
            </View>
          </View>
        </View>

        {/* Sustainability Card */}
        <View style={styles.sustainabilityCard}>
          <View style={styles.leafIconCircle}>
            <Ionicons name="leaf-outline" size={22} color="#B8521B" />
          </View>
          <Text style={styles.sustainabilityTitle}>Sustainability</Text>

          {/* Bar 1: Fuel Efficiency */}
          <View style={styles.progressBarGroup}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Fuel Efficiency</Text>
              <Text style={styles.progressVal}>12 km/L</Text>
            </View>
            <View style={styles.trackBg}>
              <View style={[styles.trackFill, { width: '80%', backgroundColor: '#B8521B' }]} />
            </View>
          </View>

          {/* Bar 2: Emission Rating */}
          <View style={styles.progressBarGroup}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Emission Rating</Text>
              <Text style={styles.progressVal}>Euro 6</Text>
            </View>
            <View style={styles.trackBg}>
              <View style={[styles.trackFill, { width: '90%', backgroundColor: '#F07D3B' }]} />
            </View>
          </View>
        </View>

        {/* ================= SECTION 3 (IMAGE 5): SAFETY & COMPLIANCE & HIRE BUTTON ================= */}
        <View style={styles.complianceCard}>
          <Text style={styles.complianceTitle}>Safety &amp; Compliance</Text>

          {/* Item 1: Insurance Status */}
          <View style={styles.complianceItem}>
            <View style={styles.itemLeft}>
              <Ionicons name="shield-outline" size={20} color="#16A34A" style={{ marginRight: 12 }} />
              <Text style={styles.itemLabel}>Insurance Status</Text>
            </View>
            <Text style={styles.itemStatusGreen}>Active</Text>
          </View>

          {/* Item 2: Roadworthiness */}
          <View style={styles.complianceItem}>
            <View style={styles.itemLeft}>
              <Ionicons name="checkbox-outline" size={20} color="#16A34A" style={{ marginRight: 12 }} />
              <Text style={styles.itemLabel}>Roadworthiness</Text>
            </View>
            <Text style={styles.itemStatusGreen}>Certified</Text>
          </View>

          {/* Item 3: Driver Certification */}
          <View style={styles.complianceItem}>
            <View style={styles.itemLeft}>
              <Ionicons name="card-outline" size={20} color="#16A34A" style={{ marginRight: 12 }} />
              <Text style={styles.itemLabel}>Driver Certification</Text>
            </View>
            <Text style={styles.itemStatusGreen}>Verified</Text>
          </View>
        </View>

        {/* Primary Action Button: Hire Vehicle -> Navigates to /hire-vehicle/setup */}
        <TouchableOpacity
          style={styles.hireVehicleButton}
          onPress={handleHireVehicle}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="truck-outline" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.hireVehicleButtonText}>Hire Vehicle</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  heroWrap: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F5EFEB',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  specsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  fleetNoTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F07D3B',
    letterSpacing: 1,
    marginBottom: 4,
  },
  vehicleTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1D1614',
    marginBottom: 18,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  specIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF0EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  specLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F7774',
  },
  specValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginTop: 2,
  },
  maintenanceCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 26,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  scoreRingWrap: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 14,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: '#86EFAC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#166534',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16A34A',
    letterSpacing: 0.6,
  },
  scoreCheckBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  conditionBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  excellentBadge: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  excellentBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
    letterSpacing: 0.6,
  },
  upToDateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  maintenanceHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
    textAlign: 'center',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7F7774',
    marginBottom: 4,
  },
  metaVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  sustainabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  leafIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF0EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sustainabilityTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 16,
  },
  progressBarGroup: {
    marginBottom: 14,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3E3735',
  },
  progressVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1D1614',
  },
  trackBg: {
    height: 8,
    backgroundColor: '#EFEAE7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 4,
  },
  complianceCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 26,
    padding: 20,
    marginBottom: 24,
  },
  complianceTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 16,
  },
  complianceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1D1614',
  },
  itemStatusGreen: {
    fontSize: 14,
    fontWeight: '800',
    color: '#16A34A',
  },
  hireVehicleButton: {
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
  hireVehicleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
