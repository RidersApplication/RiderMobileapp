import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DriverBottomTab from '../../components/driver-bottom-tab';

export default function DriverProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* DRIVER CARD */}
        <View style={styles.profileHeaderCard}>
          <Image
            source={require('../../../assets/driver_avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.driverName}>Capt. Samuel Green</Text>
          <Text style={styles.driverPhone}>+234 812 345 6789 • samuel.green@riders.com</Text>

          <View style={styles.badgeRow}>
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={14} color="#0D9488" style={{ marginRight: 4 }} />
              <Text style={styles.verifiedText}>Verified Partner</Text>
            </View>
          </View>
        </View>

        {/* VEHICLE DETAILS CARD */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Registered Vehicle</Text>

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIconCircle}>
              <MaterialCommunityIcons name="car" size={26} color="#F07D3B" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.vehicleModel}>Toyota Prius (2022)</Text>
              <Text style={styles.vehiclePlate}>Plate: ABC-123-XY • White</Text>
              <Text style={styles.categoryTag}>Category: Car (Standard Transport)</Text>
            </View>

            <TouchableOpacity
              style={styles.editVehicleBtn}
              onPress={() => router.push('/driver/vehicle-category' as any)}
            >
              <Text style={styles.editVehicleText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MENU OPTIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account & Verification</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/driver/verification' as any)}
          >
            <Ionicons name="document-text-outline" size={22} color="#F07D3B" style={{ marginRight: 14 }} />
            <Text style={styles.menuItemText}>Compliance Documents</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/driver/under-review' as any)}
          >
            <Ionicons name="time-outline" size={22} color="#F07D3B" style={{ marginRight: 14 }} />
            <Text style={styles.menuItemText}>Verification Status</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Bank Details', 'Bank Account: Zenith Bank (•••• 4921)')}
          >
            <Ionicons name="card-outline" size={22} color="#F07D3B" style={{ marginRight: 14 }} />
            <Text style={styles.menuItemText}>Payout Bank Account</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={() => router.push('/' as any)}
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" style={{ marginRight: 14 }} />
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Switch to User Mode</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DriverBottomTab activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFBF9' },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backBtn: { padding: 6 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 },
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  avatar: { width: 72, height: 72, borderRadius: 36, marginBottom: 12 },
  driverName: { fontSize: 20, fontWeight: '800', color: '#1F2937', marginBottom: 4 },
  driverPhone: { fontSize: 13, color: '#7F7774', marginBottom: 12, textAlign: 'center' },
  badgeRow: { flexDirection: 'row' },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  verifiedText: { fontSize: 12, fontWeight: '800', color: '#0D9488' },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginBottom: 14 },
  vehicleRow: { flexDirection: 'row', alignItems: 'center' },
  vehicleIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vehicleModel: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  vehiclePlate: { fontSize: 13, color: '#7F7774', marginTop: 2 },
  categoryTag: { fontSize: 11, color: '#F07D3B', fontWeight: '700', marginTop: 4 },
  editVehicleBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#FFF5F2', borderRadius: 10 },
  editVehicleText: { fontSize: 13, fontWeight: '700', color: '#F07D3B' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1F2937' },
});
