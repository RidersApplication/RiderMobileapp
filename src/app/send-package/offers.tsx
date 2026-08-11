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
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useUser } from '../../context/user-context';

interface DriverOfferItem {
  id: string;
  name: string;
  avatar: any;
  carModel: string;
  carColor: string;
  tripsCount: number;
  rating: number;
  etaMins: number;
  offeredPrice: number;
}

const DRIVER_OFFERS: DriverOfferItem[] = [
  {
    id: 'driver-1',
    name: 'Samuel Green',
    avatar: require('../../../assets/user_avatar.png'),
    carModel: 'Toyota Prius',
    carColor: 'White',
    tripsCount: 1240,
    rating: 4.9,
    etaMins: 4,
    offeredPrice: 3200,
  },
  {
    id: 'driver-2',
    name: 'Samuel Green',
    avatar: require('../../../assets/user_avatar.png'),
    carModel: 'Toyota Corolla',
    carColor: 'White',
    tripsCount: 1240,
    rating: 4.8,
    etaMins: 4,
    offeredPrice: 4200,
  },
  {
    id: 'driver-3',
    name: 'Samuel Green',
    avatar: require('../../../assets/user_avatar.png'),
    carModel: 'Toyota Corolla',
    carColor: 'White',
    tripsCount: 1240,
    rating: 4.95,
    etaMins: 4,
    offeredPrice: 2800,
  },
];

export default function DriverBiddingOffersScreen() {
  const router = useRouter();
  const { user } = useUser();

  const [acceptedDriver, setAcceptedDriver] = useState<DriverOfferItem | null>(null);
  const [connectingModalVisible, setConnectingModalVisible] = useState(false);
  const [selectedDriverForProfile, setSelectedDriverForProfile] = useState<DriverOfferItem | null>(null);

  const handleAcceptOffer = (driver: DriverOfferItem) => {
    setAcceptedDriver(driver);
    setConnectingModalVisible(true);

    setTimeout(() => {
      setConnectingModalVisible(false);
      router.push('/drivingtou' as any);
    }, 1600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Screen Header with User Avatar */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.userRow}
          onPress={() => router.push('/profile' as any)}
          activeOpacity={0.8}
        >
          <Image source={user.avatar} style={styles.userAvatar} />
          <View style={styles.userTextGroup}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userNameText}>Hello, {user.name}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={22} color="#3E3735" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Pickup & Destination Overview Card */}
        <View style={styles.locationOverviewCard}>
          <Text style={styles.locLabel}>PICKUP LOCATION</Text>
          <View style={styles.locInputWrap}>
            <Ionicons name="location-outline" size={18} color="#F07D3B" style={{ marginRight: 8 }} />
            <Text style={styles.locText} numberOfLines={1}>
              123 Innovation Drive, Tech Hub
            </Text>
          </View>

          <Text style={[styles.locLabel, { marginTop: 12 }]}>DESTINATION</Text>
          <View style={styles.locInputWrap}>
            <Ionicons name="search-outline" size={18} color="#7F7774" style={{ marginRight: 8 }} />
            <Text style={styles.locText} numberOfLines={1}>
              T Building, Wuse 2
            </Text>
          </View>
        </View>

        {/* Price Range Header */}
        <View style={styles.priceInputsRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.priceInputLabel}>Base Price (Min)</Text>
            <View style={styles.priceInputWrap}>
              <Text style={styles.priceTextInput}>₦ 2500</Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.priceInputLabel}>Max Price</Text>
            <View style={styles.priceInputWrap}>
              <Text style={styles.priceTextInput}>₦ 4500</Text>
            </View>
          </View>
        </View>

        {/* Bidding Drivers List */}
        <View style={styles.offersContainer}>
          {DRIVER_OFFERS.map((driver) => (
            <View key={driver.id} style={styles.offerCard}>
              <View style={styles.driverTopRow}>
                <TouchableOpacity
                  style={styles.driverProfileTouchable}
                  onPress={() => setSelectedDriverForProfile(driver)}
                  activeOpacity={0.8}
                >
                  <Image source={driver.avatar} style={styles.driverAvatar} />
                  <View style={styles.driverInfoGroup}>
                    <Text style={styles.driverName}>{driver.name}</Text>
                    <Text style={styles.carDetailsText}>
                      <MaterialCommunityIcons name="car" size={14} color="#7F7774" /> {driver.carModel} • {driver.carColor}
                    </Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.offerPriceText}>
                  ₦{driver.offeredPrice.toLocaleString('en-NG')}
                </Text>
              </View>

              {/* Badges Row */}
              <View style={styles.badgesRow}>
                <View style={styles.badgePill}>
                  <Ionicons name="reload" size={12} color="#7F7774" style={{ marginRight: 4 }} />
                  <Text style={styles.badgeText}>{driver.tripsCount.toLocaleString()} trips</Text>
                </View>

                <View style={styles.badgePill}>
                  <Ionicons name="time-outline" size={12} color="#7F7774" style={{ marginRight: 4 }} />
                  <Text style={styles.badgeText}>{driver.etaMins} mins away</Text>
                </View>
              </View>

              {/* Accept Offer Action Button */}
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptOffer(driver)}
                activeOpacity={0.85}
              >
                <Text style={styles.acceptButtonText}>Accept Offer</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CONNECTING WITH DRIVER MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={connectingModalVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.connectingCard}>
            <ActivityIndicator size="large" color="#F07D3B" />
            <Text style={styles.connectingTitle}>Offer Accepted!</Text>
            <Text style={styles.connectingSub}>
              Connecting with {acceptedDriver?.name}... Driver is en route to pickup point.
            </Text>
          </View>
        </View>
      </Modal>

      {/* DRIVER PROFILE PREVIEW MODAL */}
      <Modal
        transparent
        animationType="slide"
        visible={selectedDriverForProfile !== null}
        onRequestClose={() => setSelectedDriverForProfile(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.profileModalCard}>
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setSelectedDriverForProfile(null)}
            >
              <Ionicons name="close" size={22} color="#7F7774" />
            </TouchableOpacity>

            <Image source={selectedDriverForProfile?.avatar} style={styles.modalAvatar} />
            <Text style={styles.modalDriverName}>{selectedDriverForProfile?.name}</Text>
            <Text style={styles.modalCarText}>
              {selectedDriverForProfile?.carModel} • {selectedDriverForProfile?.carColor}
            </Text>

            <View style={styles.modalStatsRow}>
              <View style={styles.modalStatItem}>
                <Ionicons name="star" size={18} color="#F59E0B" />
                <Text style={styles.modalStatVal}>{selectedDriverForProfile?.rating}</Text>
                <Text style={styles.modalStatLabel}>Rating</Text>
              </View>

              <View style={styles.modalStatItem}>
                <Ionicons name="car" size={18} color="#F07D3B" />
                <Text style={styles.modalStatVal}>{selectedDriverForProfile?.tripsCount}</Text>
                <Text style={styles.modalStatLabel}>Trips</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.rateDriverLink}
              onPress={() => {
                setSelectedDriverForProfile(null);
                router.push('/rate-driver' as any);
              }}
            >
              <Text style={styles.rateDriverLinkText}>View Driver Reviews & Ratings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF9',
  },
  topHeader: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF9',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userTextGroup: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
  },
  userNameText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D1614',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEAE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  locationOverviewCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },
  locLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  locInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 46,
    paddingHorizontal: 14,
  },
  locText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1614',
    flex: 1,
  },
  priceInputsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  priceInputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7F7774',
    marginBottom: 6,
  },
  priceInputWrap: {
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  priceTextInput: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  offersContainer: {
    gap: 14,
  },
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  driverTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverProfileTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  driverInfoGroup: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 2,
  },
  carDetailsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
  },
  offerPriceText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F07D3B',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6E6663',
  },
  acceptButton: {
    height: 48,
    backgroundColor: '#F07D3B',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  connectingCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 28,
  },
  connectingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
    marginTop: 14,
    marginBottom: 6,
  },
  connectingSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 18,
  },
  profileModalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
    position: 'relative',
  },
  closeModalBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  modalAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 10,
  },
  modalDriverName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  modalCarText: {
    fontSize: 13,
    color: '#7F7774',
    marginBottom: 16,
  },
  modalStatsRow: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
  },
  modalStatItem: {
    alignItems: 'center',
  },
  modalStatVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginTop: 4,
  },
  modalStatLabel: {
    fontSize: 11,
    color: '#7F7774',
  },
  rateDriverLink: {
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  rateDriverLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B8521B',
  },
});
