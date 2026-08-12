import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function DriverDrivingToScreen() {
  const router = useRouter();

  const [isNotified, setIsNotified] = useState(false);
  const [showArrivalModal, setShowArrivalModal] = useState(false);

  const handleCallPassenger = () => {
    Alert.alert('Calling Passenger', 'Connecting call to Oge Tola (+234 800 000 0000)...');
  };

  const handleMessagePassenger = () => {
    Alert.alert('Message Passenger', 'Opening chat session with Oge Tola...');
  };

  const handleImHerePress = () => {
    setIsNotified(true);
    setShowArrivalModal(true);

    // After 1.5 seconds or modal proceed, navigate to verify-code screen
    setTimeout(() => {
      setShowArrivalModal(false);
      router.push('/driver/verify-code' as any);
    }, 1500);
  };

  const handleCancelTrip = () => {
    router.push('/driver/dashboard' as any);
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

        <Text style={styles.headerTitle}>Driving to Pickup</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* MAP SECTION */}
        <View style={styles.mapArea}>
          <Image
            source={require('../../../assets/map.png')}
            resizeMode="cover"
            style={styles.map}
          />

          {/* ARRIVAL PILL */}
          <View style={styles.arrivePillContainer}>
            <View style={styles.arrivePill}>
              <Ionicons name="location" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.arriveText}>Arrive by 20:23</Text>
            </View>
          </View>

          {/* ETA MINUTE CIRCLE */}
          <View style={styles.timeBadgeContainer}>
            <View style={styles.timeCircle}>
              <Text style={styles.timeNumber}>26</Text>
              <Text style={styles.timeUnit}>min</Text>
            </View>
          </View>
        </View>

        {/* DRIVER FLOATING INFO SHEET */}
        <View style={styles.infoSheetCard}>
          {/* TITLE & ETA ROW */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {isNotified ? 'Passenger Notified' : 'Driving to passenger'}
              </Text>
              <View style={styles.pickupRow}>
                <Ionicons name="location-outline" size={14} color="#6E6663" />
                <Text style={styles.pickup}>Pickup: 123 Innovation Drive</Text>
              </View>
            </View>

            <View style={[styles.etaBadge, isNotified && styles.etaBadgeNotified]}>
              <Text style={styles.etaText}>{isNotified ? 'ARRIVED' : '3 min'}</Text>
            </View>
          </View>

          {/* PASSENGER PROFILE ROW */}
          <View style={styles.passengerCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('../../../assets/driver_avatar.png')}
                style={styles.passengerAvatar}
              />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>★ 4.9</Text>
              </View>
            </View>

            <View style={styles.passengerDetails}>
              <Text style={styles.passengerName}>Oge Tola</Text>
              <Text style={styles.tripType}>Standard Delivery • Cash</Text>
            </View>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={handleCallPassenger}
              >
                <Ionicons name="call" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={handleMessagePassenger}
              >
                <Ionicons name="chatbox" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* FARE & DISTANCE METRICS */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>PRICE</Text>
              <Text style={styles.metricVal}>₦4,500</Text>
            </View>

            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>DISTANCE</Text>
              <Text style={styles.metricVal}>3 Km</Text>
            </View>
          </View>

          {/* PRIMARY "I'M HERE" BUTTON -> CHANGES TO "NOTIFIED" */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.hereButton, isNotified && styles.hereButtonNotified]}
            onPress={handleImHerePress}
          >
            <Text style={styles.hereButtonText}>
              {isNotified ? 'Notified' : "I'm here"}
            </Text>
            <Ionicons
              name={isNotified ? 'checkmark-circle' : 'location-sharp'}
              size={22}
              color="#FFFFFF"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          {/* CANCEL TRIP BUTTON */}
          <TouchableOpacity
            style={styles.cancelLink}
            onPress={handleCancelTrip}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelLinkText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ARRIVAL NOTIFICATION MODAL */}
      <Modal
        visible={showArrivalModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowArrivalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.arrivalCard}>
            <View style={styles.checkCircle}>
              <Ionicons name="notifications" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.modalTitle}>Passenger Notified!</Text>
            <Text style={styles.modalSub}>
              Oge Tola has been notified that you have arrived at 123 Innovation Drive.
            </Text>
            <Text style={styles.redirectSub}>Opening passenger verification code screen...</Text>
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
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF9',
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
    paddingBottom: 40,
  },
  mapArea: {
    height: 240,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  arrivePillContainer: {
    position: 'absolute',
    top: 16,
    left: 20,
  },
  arrivePill: {
    backgroundColor: '#5266F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
  },
  arriveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  timeBadgeContainer: {
    position: 'absolute',
    top: 70,
    right: 40,
  },
  timeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  timeUnit: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  infoSheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    marginTop: -20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pickup: {
    fontSize: 13,
    color: '#6E6663',
    marginLeft: 4,
  },
  etaBadge: {
    backgroundColor: '#F07D3B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  etaBadgeNotified: {
    backgroundColor: '#0D9488',
  },
  etaText: {
    fontSize: 14,
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
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    left: 2,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#F07D3B',
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
  },
  tripType: {
    fontSize: 12,
    color: '#7F7774',
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  hereButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  hereButtonNotified: {
    backgroundColor: '#0D9488',
    shadowColor: '#0D9488',
  },
  hereButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cancelLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelLinkText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6E6663',
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  arrivalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: '#6E6663',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  redirectSub: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F07D3B',
  },
});
