import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import DriverBottomTab from '../../components/driver-bottom-tab';

interface RideRequest {
  id: string;
  passengerName: string;
  passengerAvatar: any;
  rating: number;
  pickup: string;
  dropoff: string;
  fare: number;
  distance: string;
  type: 'Ride' | 'Delivery';
}

const INITIAL_REQUESTS: RideRequest[] = [
  {
    id: 'req-1',
    passengerName: 'Chioma Adebayo',
    passengerAvatar: require('../../../assets/user_avatar.png'),
    rating: 4.9,
    pickup: '123 Innovation Drive, Tech Hub',
    dropoff: 'Central Bank Plaza, Wuse 2',
    fare: 3800,
    distance: '3.4 km',
    type: 'Ride',
  },
  {
    id: 'req-2',
    passengerName: 'Emeka Logistics',
    passengerAvatar: require('../../../assets/user_avatar.png'),
    rating: 4.8,
    pickup: 'Maitama Shopping Complex',
    dropoff: 'Nnamdi Azikiwe Airport Cargo Terminal',
    fare: 8500,
    distance: '14.2 km',
    type: 'Delivery',
  },
];

export default function DriverDashboardScreen() {
  const router = useRouter();

  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState<RideRequest[]>(INITIAL_REQUESTS);
  const [activeTrip, setActiveTrip] = useState<RideRequest | null>(null);
  const [tripStep, setTripStep] = useState<'EN_ROUTE' | 'ARRIVED' | 'IN_PROGRESS'>('EN_ROUTE');
  const [todayEarnings, setTodayEarnings] = useState(34500);
  const [completedCount, setCompletedCount] = useState(14);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const handleAcceptRequest = (request: RideRequest) => {
    setActiveTrip(request);
    setTripStep('EN_ROUTE');
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  const handleDeclineRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAdvanceTrip = () => {
    if (!activeTrip) return;

    if (tripStep === 'EN_ROUTE') {
      setTripStep('ARRIVED');
      Alert.alert('Arrival Notified', 'Passenger has been notified that you have arrived at the pickup location.');
    } else if (tripStep === 'ARRIVED') {
      setTripStep('IN_PROGRESS');
      Alert.alert('Trip Started', 'Trip is now in progress. Safe driving!');
    } else if (tripStep === 'IN_PROGRESS') {
      // Complete trip
      setTodayEarnings((prev) => prev + activeTrip.fare);
      setCompletedCount((prev) => prev + 1);
      setShowSummaryModal(true);
    }
  };

  const handleFinishCompletedTrip = () => {
    setShowSummaryModal(false);
    setActiveTrip(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* TOP HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.driverInfoRow}
          onPress={() => router.push('/driver/profile' as any)}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../../assets/driver_avatar.png')}
            style={styles.driverAvatar}
          />
          <View style={styles.driverTextGroup}>
            <Text style={styles.welcomeText}>Partner Driver</Text>
            <Text style={styles.driverName}>Capt. Samuel Green</Text>
          </View>
        </TouchableOpacity>

        {/* ONLINE / OFFLINE TOGGLE PILL */}
        <View style={[styles.statusTogglePill, isOnline ? styles.statusOnlineBg : styles.statusOfflineBg]}>
          <Text style={[styles.statusToggleText, isOnline ? styles.statusOnlineText : styles.statusOfflineText]}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: '#D1D5DB', true: '#FFCBA4' }}
            thumbColor={isOnline ? '#F07D3B' : '#9CA3AF'}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* STATS OVERVIEW CARD */}
        <View style={styles.statsCard}>
          <View style={styles.earningsRow}>
            <View>
              <Text style={styles.statsLabel}>TODAY'S EARNINGS</Text>
              <Text style={styles.earningsValue}>₦{todayEarnings.toLocaleString('en-NG')}</Text>
            </View>

            <TouchableOpacity
              style={styles.cashoutBtn}
              onPress={() => Alert.alert('Cash Out', `Initiated payout of ₦${todayEarnings.toLocaleString()} to your linked bank account.`)}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-up-circle-outline" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.cashoutText}>Cash Out</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statGridItem}>
              <Ionicons name="car-sport-outline" size={20} color="#F07D3B" />
              <Text style={styles.statGridVal}>{completedCount}</Text>
              <Text style={styles.statGridLabel}>Trips Done</Text>
            </View>

            <View style={styles.statGridDivider} />

            <View style={styles.statGridItem}>
              <Ionicons name="star" size={20} color="#F59E0B" />
              <Text style={styles.statGridVal}>4.92</Text>
              <Text style={styles.statGridLabel}>Rating</Text>
            </View>

            <View style={styles.statGridDivider} />

            <View style={styles.statGridItem}>
              <Ionicons name="time-outline" size={20} color="#F07D3B" />
              <Text style={styles.statGridVal}>6.5h</Text>
              <Text style={styles.statGridLabel}>Online Time</Text>
            </View>
          </View>
        </View>

        {/* ACTIVE TRIP CARD IF ANY */}
        {activeTrip ? (
          <View style={styles.activeTripCard}>
            <View style={styles.activeTripBadgeRow}>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>
                  {tripStep === 'EN_ROUTE' && 'EN ROUTE TO PICKUP'}
                  {tripStep === 'ARRIVED' && 'DRIVER ARRIVED'}
                  {tripStep === 'IN_PROGRESS' && 'TRIP IN PROGRESS'}
                </Text>
              </View>

              <Text style={styles.activeFareText}>₦{activeTrip.fare.toLocaleString('en-NG')}</Text>
            </View>

            {/* PASSENGER ROW */}
            <View style={styles.passengerRow}>
              <Image source={activeTrip.passengerAvatar} style={styles.passengerAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.passengerName}>{activeTrip.passengerName}</Text>
                <Text style={styles.passengerSub}>
                  ★ {activeTrip.rating} • {activeTrip.type}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.callCircleBtn}
                onPress={() => Alert.alert('Call Passenger', `Calling ${activeTrip.passengerName}...`)}
              >
                <Ionicons name="call" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* ROUTE STEPS */}
            <View style={styles.routeBox}>
              <View style={styles.routeItem}>
                <Ionicons name="location-outline" size={18} color="#F07D3B" style={{ marginRight: 8 }} />
                <Text style={styles.routeText} numberOfLines={1}>
                  Pickup: {activeTrip.pickup}
                </Text>
              </View>

              <View style={styles.routeItem}>
                <Ionicons name="flag-outline" size={18} color="#10B981" style={{ marginRight: 8 }} />
                <Text style={styles.routeText} numberOfLines={1}>
                  Dropoff: {activeTrip.dropoff}
                </Text>
              </View>
            </View>

            {/* ACTION BUTTON */}
            <TouchableOpacity
              style={styles.advanceTripBtn}
              onPress={handleAdvanceTrip}
              activeOpacity={0.88}
            >
              <Text style={styles.advanceTripText}>
                {tripStep === 'EN_ROUTE' && 'I Have Arrived'}
                {tripStep === 'ARRIVED' && 'Start Trip'}
                {tripStep === 'IN_PROGRESS' && 'Complete Trip & Collect Payment'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* DISPATCH REQUESTS SECTION */
          <View style={styles.dispatchSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                {isOnline ? 'Nearby Requests' : 'You Are Offline'}
              </Text>
              {isOnline && (
                <View style={styles.livePulseBadge}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.pulseText}>Live</Text>
                </View>
              )}
            </View>

            {!isOnline ? (
              <View style={styles.offlineBox}>
                <Ionicons name="power-outline" size={42} color="#9CA3AF" />
                <Text style={styles.offlineTitle}>Go Online to Receive Rides</Text>
                <Text style={styles.offlineSub}>
                  Toggle the switch at the top to start receiving nearby ride and delivery dispatch requests.
                </Text>
              </View>
            ) : requests.length === 0 ? (
              <View style={styles.emptyBox}>
                <Ionicons name="checkmark-done-circle-outline" size={48} color="#F07D3B" />
                <Text style={styles.emptyTitle}>All caught up!</Text>
                <Text style={styles.emptySub}>Looking for new passenger requests nearby...</Text>
              </View>
            ) : (
              requests.map((item) => (
                <View key={item.id} style={styles.requestCard}>
                  <View style={styles.reqTopRow}>
                    <View style={styles.reqBadgePill}>
                      <Ionicons
                        name={item.type === 'Ride' ? 'car-outline' : 'cube-outline'}
                        size={14}
                        color="#F07D3B"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.reqBadgeText}>{item.type}</Text>
                    </View>

                    <Text style={styles.reqDistanceText}>{item.distance} away</Text>
                    <Text style={styles.reqFareText}>₦{item.fare.toLocaleString('en-NG')}</Text>
                  </View>

                  <View style={styles.reqUserRow}>
                    <Image source={item.passengerAvatar} style={styles.reqAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.reqName}>{item.passengerName}</Text>
                      <Text style={styles.reqRating}>★ {item.rating} rating</Text>
                    </View>
                  </View>

                  <View style={styles.reqLocationsBox}>
                    <View style={styles.reqLocRow}>
                      <Ionicons name="ellipse" size={10} color="#F07D3B" style={{ marginRight: 8, marginTop: 4 }} />
                      <Text style={styles.reqLocText} numberOfLines={1}>{item.pickup}</Text>
                    </View>
                    <View style={styles.reqLocRow}>
                      <Ionicons name="square" size={10} color="#10B981" style={{ marginRight: 8, marginTop: 4 }} />
                      <Text style={styles.reqLocText} numberOfLines={1}>{item.dropoff}</Text>
                    </View>
                  </View>

                  <View style={styles.reqActionsRow}>
                    <TouchableOpacity
                      style={styles.declineBtn}
                      onPress={() => handleDeclineRequest(item.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => handleAcceptRequest(item)}
                      activeOpacity={0.88}
                    >
                      <Text style={styles.acceptText}>Accept Trip</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* COMPLETED TRIP SUMMARY MODAL */}
      <Modal visible={showSummaryModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.summaryCard}>
            <View style={styles.successBadgeCircle}>
              <Ionicons name="checkmark" size={36} color="#FFFFFF" />
            </View>

            <Text style={styles.summaryTitle}>Trip Completed!</Text>
            <Text style={styles.summarySub}>
              You have successfully arrived at destination and collected payment.
            </Text>

            <View style={styles.summaryFareBox}>
              <Text style={styles.summaryFareLabel}>EARNED</Text>
              <Text style={styles.summaryFareAmount}>
                ₦{activeTrip?.fare.toLocaleString('en-NG')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.finishSummaryBtn}
              onPress={handleFinishCompletedTrip}
              activeOpacity={0.88}
            >
              <Text style={styles.finishSummaryText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DRIVER BOTTOM TAB BAR */}
      <DriverBottomTab activeTab="dashboard" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF9',
  },
  topHeader: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF9',
  },
  driverInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  driverTextGroup: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 12,
    color: '#7F7774',
    fontWeight: '500',
  },
  driverName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
  },
  statusTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusOnlineBg: {
    backgroundColor: '#ECFDF5',
  },
  statusOfflineBg: {
    backgroundColor: '#F3F4F6',
  },
  statusToggleText: {
    fontSize: 10,
    fontWeight: '800',
    marginRight: 2,
  },
  statusOnlineText: {
    color: '#059669',
  },
  statusOfflineText: {
    color: '#6B7280',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statsLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
  },
  cashoutBtn: {
    backgroundColor: '#F07D3B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  cashoutText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statGridItem: {
    alignItems: 'center',
  },
  statGridVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 4,
  },
  statGridLabel: {
    fontSize: 11,
    color: '#7F7774',
    marginTop: 2,
  },
  statGridDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  activeTripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F07D3B',
  },
  activeTripBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F07D3B',
  },
  activeFareText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F07D3B',
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passengerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  passengerSub: {
    fontSize: 12,
    color: '#7F7774',
    marginTop: 2,
  },
  callCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    gap: 10,
    marginBottom: 18,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  advanceTripBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  advanceTripText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dispatchSection: {},
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  livePulseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  pulseText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
  },
  offlineBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  offlineTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 6,
  },
  offlineSub: {
    fontSize: 13,
    color: '#7F7774',
    textAlign: 'center',
    lineHeight: 18,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: '#7F7774',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  reqTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reqBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  reqBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F07D3B',
  },
  reqDistanceText: {
    fontSize: 12,
    color: '#7F7774',
    marginLeft: 10,
    flex: 1,
  },
  reqFareText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#F07D3B',
  },
  reqUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reqAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reqName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  reqRating: {
    fontSize: 12,
    color: '#7F7774',
  },
  reqLocationsBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 12,
    gap: 8,
    marginBottom: 16,
  },
  reqLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reqLocText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  reqActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  declineBtn: {
    flex: 1,
    height: 46,
    backgroundColor: '#F3F4F6',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6B7280',
  },
  acceptBtn: {
    flex: 1.5,
    height: 46,
    backgroundColor: '#F07D3B',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  acceptText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
  },
  successBadgeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
  },
  summarySub: {
    fontSize: 13,
    color: '#7F7774',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  summaryFareBox: {
    backgroundColor: '#FFF5F2',
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  summaryFareLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  summaryFareAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F07D3B',
    marginTop: 2,
  },
  finishSummaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishSummaryText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
