import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import DriverBottomTab from '../../components/driver-bottom-tab';

export default function DriverEarningsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'WEEK' | 'MONTH' | 'ALL'>('WEEK');

  const earningsData = [
    { id: '1', date: 'Today, 2:45 PM', passenger: 'Chioma Adebayo', type: 'Ride', amount: 3800 },
    { id: '2', date: 'Yesterday, 6:12 PM', passenger: 'Emeka Logistics', type: 'Cargo Delivery', amount: 8500 },
    { id: '3', date: 'Aug 10, 11:30 AM', passenger: 'David K.', type: 'Ride', amount: 4200 },
    { id: '4', date: 'Aug 09, 4:20 PM', passenger: 'Sarah Jenkins', type: 'Ride', amount: 5100 },
    { id: '5', date: 'Aug 08, 9:15 AM', passenger: 'TechHub Express', type: 'Delivery', amount: 12900 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Earnings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TOTAL BALANCE CARD */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceAmount}>₦ 142,500.00</Text>
          <Text style={styles.payoutSub}>Weekly payout scheduled for Monday</Text>

          <TouchableOpacity
            style={styles.withdrawBtn}
            onPress={() => Alert.alert('Payout Requested', '₦142,500.00 has been sent to your bank account.')}
            activeOpacity={0.88}
          >
            <Ionicons name="wallet-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.withdrawText}>Withdraw to Bank</Text>
          </TouchableOpacity>
        </View>

        {/* FILTER TABS */}
        <View style={styles.filterRow}>
          {(['WEEK', 'MONTH', 'ALL'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterPill, selectedFilter === filter && styles.filterPillActive]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
                {filter === 'WEEK' ? 'This Week' : filter === 'MONTH' ? 'This Month' : 'All Time'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* HISTORY LIST */}
        <Text style={styles.sectionTitle}>Earnings History</Text>
        <View style={styles.historyList}>
          {earningsData.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name={item.type.includes('Delivery') ? 'cube-outline' : 'car-outline'}
                  size={22}
                  color="#F07D3B"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.passengerText}>{item.passenger}</Text>
                <Text style={styles.dateText}>{item.date} • {item.type}</Text>
              </View>

              <Text style={styles.amountText}>+₦{item.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <DriverBottomTab activeTab="earnings" />
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
  balanceCard: {
    backgroundColor: '#F07D3B',
    borderRadius: 22,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  balanceLabel: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: 0.6 },
  balanceAmount: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', marginTop: 4, marginBottom: 4 },
  payoutSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 20 },
  withdrawBtn: {
    backgroundColor: '#1F2937',
    borderRadius: 14,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  filterPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterPillActive: { backgroundColor: '#FFF5F2', borderColor: '#F07D3B' },
  filterText: { fontSize: 13, fontWeight: '700', color: '#6B7280' },
  filterTextActive: { color: '#F07D3B' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937', marginBottom: 14 },
  historyList: { gap: 12 },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  passengerText: { fontSize: 15, fontWeight: '800', color: '#1F2937' },
  dateText: { fontSize: 12, color: '#7F7774', marginTop: 2 },
  amountText: { fontSize: 16, fontWeight: '900', color: '#10B981' },
});
