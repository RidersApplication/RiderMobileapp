import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import DriverBottomTab from '../../components/driver-bottom-tab';

export interface ActivityItem {
  id: string;
  title: string;
  date: string;
  amount: string;
  isPositive: boolean;
  iconName: string;
  iconBg: string;
  iconColor: string;
}

export default function DriverWalletScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [balance, setBalance] = useState(1482500);
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'act-1',
      title: 'Delivery Payment',
      date: 'Oct 24, 2023 • 2:45 PM',
      amount: '- ₦12,400',
      isPositive: false,
      iconName: 'truck-delivery-outline',
      iconBg: '#FFF0E6',
      iconColor: '#F07D3B',
    },
    {
      id: 'act-2',
      title: 'Wallet Top-up',
      date: 'Oct 23, 2023 • 10:15 AM',
      amount: '+ ₦50,000',
      isPositive: true,
      iconName: 'bank-outline',
      iconBg: '#E6F4F1',
      iconColor: '#0D9488',
    },
    {
      id: 'act-3',
      title: 'Ride Payment',
      date: 'Oct 22, 2023 • 6:30 PM',
      amount: '- ₦4,500',
      isPositive: false,
      iconName: 'car-outline',
      iconBg: '#FFF0E6',
      iconColor: '#F07D3B',
    },
  ]);

  // Handle incoming withdrawal parameters
  useEffect(() => {
    if (params.withdrawnAmount) {
      const numericAmount = parseFloat(params.withdrawnAmount as string);
      if (!isNaN(numericAmount) && numericAmount > 0) {
        setBalance((prev) => Math.max(0, prev - numericAmount));

        const bankName = (params.withdrawnBank as string) || 'Bank Account';
        const formattedAmount = numericAmount.toLocaleString('en-NG');

        const newActivityItem: ActivityItem = {
          id: `act-${Date.now()}`,
          title: `Withdrawal to ${bankName}`,
          date: 'Just now',
          amount: `- ₦${formattedAmount}`,
          isPositive: false,
          iconName: 'wallet-outline',
          iconBg: '#FEE2E2',
          iconColor: '#EF4444',
        };

        setActivities((prev) => {
          if (prev.some((a) => a.id === newActivityItem.id)) return prev;
          return [newActivityItem, ...prev];
        });
      }
    }
  }, [params.withdrawnAmount, params.withdrawnBank]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wallet</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOTAL BALANCE CARD */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceValue}>
            ₦{balance.toLocaleString('en-NG')}
          </Text>

          <View style={styles.secureBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.secureBadgeText}>SECURE WALLET</Text>
          </View>
        </View>

        {/* WITHDRAW BUTTON */}
        <TouchableOpacity
          style={styles.withdrawBtn}
          onPress={() => router.push('/driver/withdraw' as any)}
          activeOpacity={0.88}
        >
          <Ionicons name="wallet-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.withdrawBtnText}>Withdraw</Text>
        </TouchableOpacity>

        {/* PAYMENT METHODS SECTION */}
        <Text style={styles.sectionTitle}>Payment Methods</Text>

        <View style={styles.paymentMethodCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconBox}>
              <Ionicons name="card" size={20} color="#6E6663" />
            </View>

            <TouchableOpacity activeOpacity={0.7}>
              <Feather name="more-horizontal" size={20} color="#6E6663" />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardTypeLabel}>Debit Card</Text>
          <Text style={styles.cardNumberText}>•••• •••• •••• 1234</Text>
        </View>

        {/* RECENT ACTIVITY SECTION */}
        <View style={styles.activityHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Feather name="sliders" size={18} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {activities.map((item) => (
            <View key={item.id} style={styles.activityCard}>
              <View style={[styles.activityIconCircle, { backgroundColor: item.iconBg }]}>
                <MaterialCommunityIcons
                  name={item.iconName as any}
                  size={22}
                  color={item.iconColor}
                />
              </View>
              <View style={styles.activityTextCol}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityDate}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.activityAmount,
                  item.isPositive ? styles.textPositive : styles.textNegative,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <DriverBottomTab />
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
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  searchBtn: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: '#F07D3B',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  balanceValue: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  secureBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  withdrawBtn: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  withdrawBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 14,
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIconBox: {
    width: 44,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3ECE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTypeLabel: {
    fontSize: 12,
    color: '#6E6663',
    marginBottom: 4,
  },
  cardNumberText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  activityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  activityIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  activityTextCol: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  activityDate: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '800',
  },
  textNegative: {
    color: '#DC2626',
  },
  textPositive: {
    color: '#0D9488',
  },
});
