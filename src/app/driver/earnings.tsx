import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import DriverBottomTab from '../../components/driver-bottom-tab';

export interface TripEarningItem {
  id: string;
  pickupLocation: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffTime: string;
  distance: string;
  totalEarnings: number;
  baseFare: number;
  distanceAndTimeFare: number;
  tip: number;
}

const INITIAL_TRIP_EARNINGS: TripEarningItem[] = [
  {
    id: 'trip-101',
    pickupLocation: 'Central Business District - Area 11',
    pickupTime: 'Today, 2:45 PM',
    dropoffLocation: 'Maitama Executive Apartments',
    dropoffTime: 'Today, 3:12 PM',
    distance: '6.8 km',
    totalEarnings: 18400,
    baseFare: 12500,
    distanceAndTimeFare: 3900,
    tip: 2000,
  },
  {
    id: 'trip-102',
    pickupLocation: 'Wuse II - Banex Plaza',
    pickupTime: 'Today, 1:15 PM',
    dropoffLocation: 'Garki Area 1 - Secretariat',
    dropoffTime: 'Today, 2:05 PM',
    distance: '14 km',
    totalEarnings: 34150,
    baseFare: 18200,
    distanceAndTimeFare: 10950,
    tip: 5000,
  },
];

export default function DriverEarningsScreen() {
  const router = useRouter();
  const [availableBalance, setAvailableBalance] = useState(1482500);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawInput, setWithdrawInput] = useState('');
  const [trips, setTrips] = useState<TripEarningItem[]>(INITIAL_TRIP_EARNINGS);

  const handleWithdrawClick = () => {
    setShowWithdrawModal(true);
  };

  const handleConfirmWithdrawal = () => {
    const amount = parseFloat(withdrawInput.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    if (amount > availableBalance) {
      Alert.alert('Insufficient Balance', 'Request exceeds available balance.');
      return;
    }

    setAvailableBalance((prev) => prev - amount);
    setShowWithdrawModal(false);
    setWithdrawInput('');
    Alert.alert(
      'Withdrawal Requested',
      `₦${amount.toLocaleString('en-NG')} will be transferred to your registered bank account.`
    );
  };

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert(
      'Delete Trip Record',
      'Are you sure you want to delete this trip earnings record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTrips((prev) => prev.filter((t) => t.id !== tripId));
          },
        },
      ]
    );
  };

  const filteredTrips = trips.filter(
    (t) =>
      t.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <Text style={styles.headerTitle}>Earnings</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CARD 1: AVAILABLE FOR WITHDRAWAL */}
        <View style={styles.withdrawalCard}>
          <Text style={styles.cardSubLabel}>AVAILABLE FOR WITHDRAWAL</Text>
          <Text style={styles.bigAmountValue}>
            ₦{availableBalance.toLocaleString('en-NG')}
          </Text>

          <TouchableOpacity
            style={styles.withdrawMainBtn}
            onPress={() => router.push('/driver/wallet' as any)}
            activeOpacity={0.88}
          >
            <Text style={styles.withdrawMainText}>Withdraw</Text>
          </TouchableOpacity>

          <View style={styles.autoPayoutNote}>
            <Ionicons
              name="information-circle-outline"
              size={15}
              color="#8C531B"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.autoPayoutText}>Next auto-payout: Monday, Oct 23</Text>
          </View>
        </View>

        {/* CARD 2: TODAY'S TOTAL */}
        <View style={styles.todaysTotalCard}>
          <Text style={styles.todaysTotalLabel}>TODAY'S TOTAL</Text>
          <Text style={styles.todaysTotalValue}>₦214,200</Text>

          <View style={styles.statLineRow}>
            <Text style={styles.statLineLabel}>Completed Trips</Text>
            <Text style={styles.statLineVal}>14</Text>
          </View>

          <View style={styles.statLineRow}>
            <Text style={styles.statLineLabel}>Hours Active</Text>
            <Text style={styles.statLineVal}>6.5h</Text>
          </View>

          {/* PROGRESS BAR */}
          <View style={styles.progressBarTrack}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* EARNING HISTORY SECTION */}
        <Text style={styles.sectionHeading}>Earning History</Text>

        {/* SEARCH TRIPS INPUT */}
        <View style={styles.searchBarBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search trips..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* PERIOD FILTER DROPDOWN BUTTON */}
        <TouchableOpacity
          style={styles.filterDropdownBtn}
          onPress={() =>
            Alert.alert('Select Period', 'Choose time filter for earnings:', [
              { text: 'This Week', onPress: () => setSelectedPeriod('This Week') },
              { text: 'This Month', onPress: () => setSelectedPeriod('This Month') },
              { text: 'All Time', onPress: () => setSelectedPeriod('All Time') },
            ])
          }
          activeOpacity={0.8}
        >
          <Ionicons name="calendar-outline" size={16} color="#1F2937" style={{ marginRight: 6 }} />
          <Text style={styles.filterDropdownText}>{selectedPeriod}</Text>
          <Ionicons name="chevron-down" size={16} color="#1F2937" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        {/* DETAILED TRIP CARDS LIST */}
        <View style={styles.tripsList}>
          {filteredTrips.map((trip) => (
            <View key={trip.id} style={styles.tripBreakdownCard}>
              {/* PICKUP ROW */}
              <View style={styles.routeRow}>
                <View style={styles.pickupDotOuter}>
                  <View style={styles.pickupDotInner} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.routeHeaderLabel}>PICKUP</Text>
                  <Text style={styles.routeTitleText}>{trip.pickupLocation}</Text>
                  <Text style={styles.routeTimeSub}>{trip.pickupTime}</Text>
                </View>
              </View>

              {/* VERTICAL CONNECTOR */}
              <View style={styles.connectorLineContainer}>
                <View style={styles.connectorLine} />
              </View>

              {/* DROPOFF ROW */}
              <View style={styles.routeRow}>
                <View style={styles.dropoffPin}>
                  <Ionicons name="location-sharp" size={10} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.routeHeaderLabel}>DROP-OFF</Text>
                  <Text style={styles.routeTitleText}>{trip.dropoffLocation}</Text>
                  <Text style={styles.routeTimeSub}>
                    {trip.dropoffTime} • {trip.distance}
                  </Text>
                </View>
              </View>

              {/* INNER EARNINGS BREAKDOWN BOX */}
              <View style={styles.breakdownInnerCard}>
                <View style={styles.breakdownHeaderRow}>
                  <Text style={styles.breakdownTitle}>EARNINGS</Text>
                  <Text style={styles.breakdownTotalVal}>
                    ₦{trip.totalEarnings.toLocaleString('en-NG')}
                  </Text>
                </View>

                <View style={styles.breakdownLineRow}>
                  <Text style={styles.breakdownLineLabel}>Base fare</Text>
                  <Text style={styles.breakdownLineVal}>
                    ₦{trip.baseFare.toLocaleString('en-NG')}
                  </Text>
                </View>

                <View style={styles.breakdownLineRow}>
                  <Text style={styles.breakdownLineLabel}>Distance & Time</Text>
                  <Text style={styles.breakdownLineVal}>
                    ₦{trip.distanceAndTimeFare.toLocaleString('en-NG')}
                  </Text>
                </View>

                <View style={styles.breakdownLineRow}>
                  <Text style={styles.tipLineLabel}>Tip</Text>
                  <Text style={styles.tipLineVal}>
                    +₦{trip.tip.toLocaleString('en-NG')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* WITHDRAW MODAL */}
      <Modal
        visible={showWithdrawModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWithdrawModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowWithdrawModal(false)}
        >
          <View style={styles.modalSheetCard} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Withdraw Earnings</Text>
            <Text style={styles.modalSub}>
              Available balance: ₦{availableBalance.toLocaleString('en-NG')}
            </Text>

            <Text style={styles.inputLabel}>AMOUNT TO WITHDRAW (₦)</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputCurrencySymbol}>₦</Text>
              <TextInput
                style={styles.textInput}
                placeholder="100,000"
                keyboardType="numeric"
                value={withdrawInput}
                onChangeText={setWithdrawInput}
              />
            </View>

            <TouchableOpacity
              style={styles.modalSubmitBtn}
              onPress={handleConfirmWithdrawal}
              activeOpacity={0.88}
            >
              <Text style={styles.modalSubmitText}>Confirm Withdrawal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setShowWithdrawModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <DriverBottomTab activeTab="earnings" />
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
    paddingBottom: 110,
  },
  withdrawalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  cardSubLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.8,
  },
  bigAmountValue: {
    fontSize: 34,
    fontWeight: '900',
    color: '#1F2937',
    marginTop: 6,
    marginBottom: 18,
  },
  withdrawMainBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  withdrawMainText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  autoPayoutNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoPayoutText: {
    fontSize: 12,
    color: '#8C531B',
    fontWeight: '600',
  },
  todaysTotalCard: {
    backgroundColor: '#FFE5D4',
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
  },
  todaysTotalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
  },
  todaysTotalValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1F2937',
    marginTop: 4,
    marginBottom: 16,
  },
  statLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statLineLabel: {
    fontSize: 13,
    color: '#8C531B',
    fontWeight: '600',
  },
  statLineVal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(140, 83, 27, 0.2)',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#8C531B',
    borderRadius: 3,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 14,
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBE5E3',
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  filterDropdownBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBE5E3',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  filterDropdownText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  tripsList: {
    gap: 16,
  },
  tripBreakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8C531B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickupDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8C531B',
  },
  connectorLineContainer: {
    marginLeft: 9,
    height: 20,
    justifyContent: 'center',
  },
  connectorLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#D1D5DB',
  },
  dropoffPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8C531B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeHeaderLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
  },
  routeTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 1,
  },
  routeTimeSub: {
    fontSize: 12,
    color: '#7F7774',
    marginTop: 1,
  },
  breakdownInnerCard: {
    backgroundColor: '#FFFBF9',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  deleteTripBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  breakdownHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#F3ECE9',
  },
  breakdownTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
  },
  breakdownTotalVal: {
    fontSize: 24,
    fontWeight: '900',
    color: '#8C531B',
  },
  breakdownLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  breakdownLineLabel: {
    fontSize: 13,
    color: '#6E6663',
  },
  breakdownLineVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  tipLineLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
  },
  tipLineVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D9488',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  modalSub: {
    fontSize: 13,
    color: '#6E6663',
    marginBottom: 20,
    marginTop: 2,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 16,
    height: 54,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputCurrencySymbol: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  modalSubmitBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalSubmitText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  modalCancelBtn: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6E6663',
  },
});
