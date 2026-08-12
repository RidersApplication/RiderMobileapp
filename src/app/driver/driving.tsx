import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DrivingScreen() {
  const router = useRouter();
  const [tripState, setTripState] = useState<'EN_ROUTE' | 'TRIP_STARTED'>('TRIP_STARTED');

  const handleCallPassenger = () => {
    Alert.alert('Calling Passenger', 'Connecting phone call to Oge Tola (+234 800 000 0000)...');
  };

  const handleChatPassenger = () => {
    Alert.alert('In-App Chat', 'Opening messaging screen with Oge Tola...');
  };

  const handleCancelRide = () => {
    router.push('/driver/dashboard' as any);
  };

  const handleEndTrip = () => {
    router.push('/driver/rate-passenger' as any);
  };

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

        <Text style={styles.headerTitle}>Driving</Text>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() =>
            setTripState((prev) => (prev === 'EN_ROUTE' ? 'TRIP_STARTED' : 'EN_ROUTE'))
          }
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      {/* MAP VIEW CONTAINER */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../../assets/map.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* FLOATING BLUE ARRIVAL PILL */}
        <View style={styles.blueArrivalPill}>
          <Ionicons name="location" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={styles.blueArrivalText}>Arrive by 20:23</Text>
        </View>

        {/* FLOATING GREEN MINUTE BADGE */}
        <View style={styles.greenMinBadge}>
          <View style={styles.targetRingOuter}>
            <View style={styles.targetRingInner} />
          </View>
          <Text style={styles.greenMinNumber}>26</Text>
          <Text style={styles.greenMinText}>min</Text>
        </View>
      </View>

      {/* BOTTOM SHEET CARD */}
      <View style={styles.bottomCard}>
        <View style={styles.cardTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headline}>
              {tripState === 'TRIP_STARTED' ? 'Trip Started' : 'Driving towards passenger'}
            </Text>
            <Text style={styles.subHeadline}>📍 Pickup: 123 Innovation Drive</Text>
          </View>

          <TouchableOpacity
            style={styles.etaOrangeBadge}
            onPress={() =>
              setTripState((prev) => (prev === 'EN_ROUTE' ? 'TRIP_STARTED' : 'EN_ROUTE'))
            }
            activeOpacity={0.8}
          >
            <Text style={styles.etaOrangeText}>
              {tripState === 'TRIP_STARTED' ? '25 min' : '3 min'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* PASSENGER PROFILE ROW (Shown during EN_ROUTE state) */}
        {tripState === 'EN_ROUTE' && (
          <View style={styles.passengerCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('../../../assets/driver_avatar.png')}
                style={styles.passengerAvatar}
              />
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color="#F07D3B" style={{ marginRight: 2 }} />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>

            <Text style={styles.passengerName}>Oge Tola</Text>

            {/* ACTION BUTTONS (PHONE & CHAT) */}
            <TouchableOpacity
              style={styles.actionCircleBtn}
              onPress={handleCallPassenger}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCircleBtn}
              onPress={handleChatPassenger}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="message-text" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* METRICS ROW (PRICE & DISTANCE) */}
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>PRICE</Text>
            <Text style={styles.metricValue}>₦4,500</Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>DISTANCE</Text>
            <Text style={styles.metricValue}>3 Km</Text>
          </View>
        </View>

        {/* ACTION BUTTON (END TRIP vs CANCEL RIDE) */}
        {tripState === 'TRIP_STARTED' ? (
          <TouchableOpacity
            style={styles.endTripBtn}
            onPress={handleEndTrip}
            activeOpacity={0.7}
          >
            <Text style={styles.endTripBtnText}>End Trip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={handleCancelRide}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelBtnText}>Cancel Ride</Text>
          </TouchableOpacity>
        )}
      </View>
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
    zIndex: 10,
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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  blueArrivalPill: {
    position: 'absolute',
    top: 24,
    left: 40,
    backgroundColor: '#5266F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  blueArrivalText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  greenMinBadge: {
    position: 'absolute',
    top: 90,
    right: 70,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  targetRingOuter: {
    position: 'absolute',
    bottom: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#059669',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetRingInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  greenMinNumber: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 18,
  },
  greenMinText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  subHeadline: {
    fontSize: 13,
    color: '#6E6663',
    fontWeight: '500',
  },
  etaOrangeBadge: {
    backgroundColor: '#F07D3B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  etaOrangeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  passengerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  passengerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    left: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE8DE',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1F2937',
  },
  passengerName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  actionCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    borderRadius: 16,
    padding: 16,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  endTripBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  endTripBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#524945',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#524945',
  },
});
