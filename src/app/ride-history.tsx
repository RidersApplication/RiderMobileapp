import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomTab from '../components/bottom-tab';

export type RideRecord = {
  id: string;
  date: string;
  amount: string;
  status: 'COMPLETED' | 'CANCELLED';
  pickup: string;
  pickupSub: string;
  destination: string;
  destinationSub: string;
  driverName: string;
  driverRating: string;
  carType: string;
  driverAvatar: any;
};

const RIDE_HISTORY_DATA: RideRecord[] = [
  {
    id: 'RIDE-101',
    date: 'OCT 12, 2023',
    amount: '₦4,500',
    status: 'COMPLETED',
    pickup: '123 Main St',
    pickupSub: 'Lagos Business District',
    destination: '456 Oak Ave',
    destinationSub: 'Residential Block B',
    driverName: 'Marcus Thompson',
    driverRating: '4.9',
    carType: 'Economy',
    driverAvatar: require('../../assets/driver_avatar.png'),
  },
  {
    id: 'RIDE-102',
    date: 'OCT 10, 2023',
    amount: '₦0',
    status: 'CANCELLED',
    pickup: '789 Silver Plaza',
    pickupSub: '',
    destination: 'Central Station',
    destinationSub: '',
    driverName: 'Sarah Jenkins',
    driverRating: '4.8',
    carType: 'Premium',
    driverAvatar: require('../../assets/driver_avatar.png'),
  },
  {
    id: 'RIDE-103',
    date: 'OCT 08, 2023',
    amount: '₦8,200',
    status: 'COMPLETED',
    pickup: 'Murtala Muhammed Airport',
    pickupSub: '',
    destination: 'Ikoyi Estates Phase II',
    destinationSub: '',
    driverName: 'David Okafor',
    driverRating: '5.0',
    carType: 'XL Luxury',
    driverAvatar: require('../../assets/driver_avatar.png'),
  },
];

export default function RideHistoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRide, setSelectedRide] = useState<RideRecord | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const filteredRides = useMemo(() => {
    if (!searchQuery.trim()) return RIDE_HISTORY_DATA;
    const query = searchQuery.toLowerCase();
    return RIDE_HISTORY_DATA.filter(
      (ride) =>
        ride.driverName.toLowerCase().includes(query) ||
        ride.pickup.toLowerCase().includes(query) ||
        ride.destination.toLowerCase().includes(query) ||
        ride.date.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleOpenDetails = (ride: RideRecord) => {
    setSelectedRide(ride);
    setDetailsModalVisible(true);
  };

  const handleRebook = () => {
    setDetailsModalVisible(false);
    router.push('/map-home');
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
        <Text style={styles.headerTitle}>Ride History</Text>
        <TouchableOpacity style={styles.searchHeaderIcon} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color="#8A7C75" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Search Bar Input */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#8A7C75" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routes or drivers"
            placeholderTextColor="#8A7C75"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={[styles.filterPill, styles.filterPillActive]}>
            <Text style={styles.filterTextActive}>Date</Text>
            <Ionicons name="chevron-down" size={14} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Status</Text>
            <Ionicons name="chevron-down" size={14} color="#59514E" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Type</Text>
            <Ionicons name="chevron-down" size={14} color="#59514E" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* Ride Cards List */}
        <View style={styles.cardsList}>
          {filteredRides.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="car-sport-outline" size={48} color="#D0C8C4" />
              <Text style={styles.emptyTitle}>No rides found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search query.</Text>
            </View>
          ) : (
            filteredRides.map((ride) => (
              <View key={ride.id} style={styles.rideCard}>
                {/* Top Row: Date & Status Badge */}
                <View style={styles.cardTopRow}>
                  <Text style={styles.rideDate}>{ride.date}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      ride.status === 'COMPLETED'
                        ? styles.badgeCompleted
                        : styles.badgeCancelled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusBadgeText,
                        ride.status === 'COMPLETED'
                          ? styles.badgeTextCompleted
                          : styles.badgeTextCancelled,
                      ]}
                    >
                      {ride.status}
                    </Text>
                  </View>
                </View>

                {/* Amount */}
                <Text style={styles.rideAmount}>{ride.amount}</Text>

                {/* Timeline Route */}
                <View style={styles.routeTimeline}>
                  {/* Pickup */}
                  <View style={styles.timelineItem}>
                    <View style={styles.ringOuterOrange}>
                      <View style={styles.ringInnerOrange} />
                    </View>
                    <View style={styles.timelineTextGroup}>
                      <Text style={styles.locationTitle}>{ride.pickup}</Text>
                      {!!ride.pickupSub && (
                        <Text style={styles.locationSub}>{ride.pickupSub}</Text>
                      )}
                    </View>
                  </View>

                  {/* Vertical Connector Line */}
                  <View style={styles.connectorLine} />

                  {/* Destination */}
                  <View style={styles.timelineItem}>
                    <View style={styles.ringOuterGrey}>
                      <View style={styles.ringInnerGrey} />
                    </View>
                    <View style={styles.timelineTextGroup}>
                      <Text style={styles.locationTitle}>{ride.destination}</Text>
                      {!!ride.destinationSub && (
                        <Text style={styles.locationSub}>{ride.destinationSub}</Text>
                      )}
                    </View>
                  </View>
                </View>

                {/* Driver Footer Row */}
                <View style={styles.driverFooter}>
                  <View style={styles.driverInfoLeft}>
                    <Image source={ride.driverAvatar} style={styles.driverAvatar} />
                    <View>
                      <Text style={styles.driverName}>{ride.driverName}</Text>
                      <Text style={styles.driverRatingText}>
                        ★ {ride.driverRating} • {ride.carType}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      ride.status === 'COMPLETED'
                        ? handleOpenDetails(ride)
                        : Alert.alert('Trip Support', 'Connecting to support for cancelled ride...')
                    }
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.actionLinkText,
                        ride.status === 'CANCELLED' && styles.supportLinkText,
                      ]}
                    >
                      {ride.status === 'COMPLETED' ? 'Details' : 'Support'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Ride Receipt Details Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={detailsModalVisible}
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Trip Details</Text>
              <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#59514E" />
              </TouchableOpacity>
            </View>

            {selectedRide && (
              <View style={styles.modalBody}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Date & Time</Text>
                  <Text style={styles.modalValue}>{selectedRide.date}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Pickup</Text>
                  <Text style={styles.modalValue}>{selectedRide.pickup}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Destination</Text>
                  <Text style={styles.modalValue}>{selectedRide.destination}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Driver</Text>
                  <Text style={styles.modalValue}>{selectedRide.driverName}</Text>
                </View>
                <View style={[styles.modalRow, { borderBottomWidth: 0, marginTop: 8 }]}>
                  <Text style={[styles.modalLabel, { fontSize: 16, fontWeight: '800' }]}>
                    Total Fare
                  </Text>
                  <Text style={[styles.modalValue, { fontSize: 20, fontWeight: '800', color: '#F07D3B' }]}>
                    {selectedRide.amount}
                  </Text>
                </View>

                <Pressable onPress={handleRebook} style={styles.rebookBtn}>
                  <Text style={styles.rebookBtnText}>Book This Ride Again</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <BottomTab activeTab="activity" />
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
  searchHeaderIcon: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 22,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1D1614',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  filterPillActive: {
    backgroundColor: '#F07D3B',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#59514E',
  },
  filterTextActive: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardsList: {
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D1614',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8A7C75',
    marginTop: 4,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  rideDate: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeCompleted: {
    backgroundColor: '#E0F2FE',
  },
  badgeCancelled: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  badgeTextCompleted: {
    color: '#0369A1',
  },
  badgeTextCancelled: {
    color: '#DC2626',
  },
  rideAmount: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 16,
  },
  routeTimeline: {
    position: 'relative',
    marginBottom: 18,
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringOuterOrange: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  ringInnerOrange: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F07D3B',
  },
  ringOuterGrey: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#A09895',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  ringInnerGrey: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A09895',
  },
  connectorLine: {
    width: 2,
    height: 18,
    backgroundColor: '#E5DED9',
    marginLeft: 7,
    marginVertical: 2,
  },
  timelineTextGroup: {
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
  },
  locationSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 1,
  },
  driverFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F5EFEB',
  },
  driverInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#E8D5C8',
  },
  driverName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1D1614',
  },
  driverRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6E6663',
    marginTop: 2,
  },
  actionLinkText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B8521B',
  },
  supportLinkText: {
    color: '#7F7774',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5EFEB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  modalBody: {
    marginTop: 14,
  },
  modalRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFA',
  },
  modalLabel: {
    fontSize: 12,
    color: '#7F7774',
    fontWeight: '600',
  },
  modalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1D1614',
    marginTop: 2,
  },
  rebookBtn: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#F07D3B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rebookBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
