import React, { useState, useEffect } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppHeader from '../components/app-header';
import BottomTab from '../components/bottom-tab';

export default function DrivingTo() {
  const router = useRouter();
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [notifiedHere, setNotifiedHere] = useState(false);
  
  // State to track if driver has arrived (changes from false -> true after 4 seconds)
  const [driverArrived, setDriverArrived] = useState(false);

  useEffect(() => {
    // Automatically transition from "Your driver is on the way" to "Your driver has arrived" after 4 seconds
    const timer = setTimeout(() => {
      setDriverArrived(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const cancelRide = () => {
    setCancelModalVisible(false);
    router.replace('/home' as any);
  };

  const handleImHere = () => {
    setNotifiedHere(true);
    setVerifyModalVisible(true);
  };

  const handleProceedToVerify = () => {
    setVerifyModalVisible(false);
    router.push('/verifyrider' as any);
  };

  const handleCallDriver = () => {
    Alert.alert("Calling Driver", "Connecting to Samuel Green (+234 802 345 6789)...");
  };

  const handleMessageDriver = () => {
    Alert.alert("Message Driver", "Opening chat session with Samuel Green...");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* ================= REUSABLE APP HEADER ================= */}
      <AppHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ================= MAP SECTION WITH OVERLAYS ================= */}
        <View style={styles.mapArea}>
          <Image
            source={require('../../assets/map.png')}
            resizeMode="cover"
            style={styles.map}
          />

          {/* Arrive by 20:23 Indigo Pill Badge */}
          <View style={styles.arriveBadgeContainer}>
            <View style={styles.arrivePill}>
              <Text style={styles.arriveText}>Arrive by 20:23</Text>
            </View>
            <View style={styles.arrivePinDot}>
              <Ionicons name="location-sharp" size={18} color="#4F46E5" />
            </View>
          </View>

          {/* 26 min Green Circle Badge */}
          <View style={styles.timeBadgeContainer}>
            <View style={styles.timeCircle}>
              <Text style={styles.timeNumber}>26</Text>
              <Text style={styles.timeUnit}>min</Text>
            </View>
            <View style={styles.timePinDot}>
              <Ionicons name="disc" size={20} color="#16A34A" />
            </View>
          </View>

          {/* Scattered Car Indicators on Map */}
          <View style={[styles.mapCarDot, { top: '56%', right: '24%' }]}>
            <Ionicons name="car-sharp" size={12} color="#333" />
          </View>
          <View style={[styles.mapCarDot, { top: '59%', right: '20%' }]}>
            <Ionicons name="car-sharp" size={12} color="#333" />
          </View>
        </View>

        {/* ================= DRIVER INFO FLOATING SHEET ================= */}
        <View style={styles.driverInfoCard}>

          {/* Title & Top Section (Dynamic depending on driverArrived state) */}
          <View style={styles.titleRow}>
            <View style={styles.titleTextColumn}>
              <Text style={styles.title}>
                {driverArrived ? "Your driver has arrived" : "Your driver is on the way"}
              </Text>
              <View style={styles.pickupRow}>
                <Ionicons name="location-outline" size={14} color="#6E6663" />
                <Text style={styles.pickup}>Pickup: 123 Innovation Drive</Text>
              </View>
            </View>

            {driverArrived ? (
              /* Toyota Prius car image appears when driver arrives */
              <Image
                source={require('../../assets/prius_car.png')}
                style={styles.carImage}
                resizeMode="contain"
              />
            ) : (
              /* ETA badge shown while driver is on the way */
              <View style={styles.etaBadge}>
                <Text style={styles.etaText}>3 min</Text>
              </View>
            )}
          </View>

          {/* Driver Details Container (Peach Background) */}
          <View style={styles.driverRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
              onPress={() => router.push('/rate-driver' as any)}
              accessibilityLabel="View driver profile and rate driver"
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../assets/driver_avatar.png')}
                  style={styles.driverAvatarImage}
                />
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>★ 4.9</Text>
                </View>
              </View>

              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>Samuel Green</Text>
                <Text style={styles.carName}>TOYOTA PRIUS •</Text>
                <Text style={styles.plate}>ABC-1234</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                accessibilityLabel="Call driver"
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={handleCallDriver}
              >
                <Ionicons name="call" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                accessibilityLabel="Message driver"
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={handleMessageDriver}
              >
                <Ionicons name="chatbox" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Primary "I'm here" Button (Appears when driver arrives) */}
          {driverArrived && (
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.hereButton, notifiedHere && styles.hereButtonActive]}
              onPress={handleImHere}
            >
              <Text style={styles.hereButtonText}>
                {notifiedHere ? "I'm Here (Notified)" : "I'm here"}
              </Text>
              <Ionicons name="checkmark-circle-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {/* Stats Row: Price & Distance */}
          <View style={styles.statsRow}>
            <Stat label="PRICE" value="₦3,200" />
            <Stat label="DISTANCE" value="3 Km" />
          </View>

          {/* Cancel Ride Action */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCancelModalVisible(true)}
            style={styles.cancelLink}
          >
            <Text style={styles.cancelText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ================= CANCEL RIDE MODAL ================= */}
      <Modal
        transparent
        animationType="fade"
        visible={cancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}>
              <Ionicons name="alert-outline" color="#F07D3B" size={30} />
            </View>
            <Text style={styles.modalTitle}>Cancel this ride?</Text>
            <Text style={styles.modalCopy}>
              {driverArrived
                ? "Your driver has arrived and is waiting for you at the pickup location."
                : "Your driver has been assigned and is already on the way."}
            </Text>
            <Pressable onPress={cancelRide} style={styles.confirmCancel}>
              <Text style={styles.confirmCancelText}>Yes, cancel ride</Text>
            </Pressable>
            <Pressable onPress={() => setCancelModalVisible(false)} style={styles.keepRide}>
              <Text style={styles.keepRideText}>Keep ride</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ================= VERIFY DRIVER MODAL ================= */}
      <Modal
        transparent
        animationType="fade"
        visible={verifyModalVisible}
        onRequestClose={() => setVerifyModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={[styles.modalIcon, { backgroundColor: '#FFF0EC' }]}>
              <Ionicons name="shield-checkmark" color="#F07D3B" size={32} />
            </View>
            <Text style={styles.modalTitle}>Verify Driver</Text>
            <Text style={styles.modalCopy}>
              Samuel Green has been informed you are here. Please verify your driver code before starting the trip.
            </Text>
            <Pressable onPress={handleProceedToVerify} style={styles.confirmVerify}>
              <Text style={styles.confirmVerifyText}>Verify Driver</Text>
            </Pressable>
            <Pressable onPress={() => setVerifyModalVisible(false)} style={styles.keepRide}>
              <Text style={styles.keepRideText}>Not Now</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <BottomTab />
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    paddingBottom: 130,
  },

  /* MAP SECTION */
  mapArea: {
    height: 330,
    position: 'relative',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  /* MAP OVERLAYS */
  arriveBadgeContainer: {
    position: 'absolute',
    top: 45,
    left: 75,
    alignItems: 'center',
  },
  arrivePill: {
    backgroundColor: '#4F46E5',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  arriveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  arrivePinDot: {
    marginTop: -2,
  },

  timeBadgeContainer: {
    position: 'absolute',
    top: 125,
    right: 80,
    alignItems: 'center',
  },
  timeCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  timeNumber: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 16,
  },
  timeUnit: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  timePinDot: {
    marginTop: 2,
  },
  mapCarDot: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  /* DRIVER INFO FLOATING CARD */
  driverInfoCard: {
    marginTop: -24,
    marginHorizontal: 14,
    borderRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    elevation: 10,
  },

  /* TITLE ROW */
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleTextColumn: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  pickup: {
    color: '#6E6663',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  carImage: {
    width: 88,
    height: 48,
  },
  etaBadge: {
    borderRadius: 18,
    backgroundColor: '#FF9C45',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  etaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  /* DRIVER CONTAINER */
  driverRow: {
    borderRadius: 20,
    backgroundColor: '#FFF0EC',
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
    alignItems: 'center',
  },
  driverAvatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#DBB5A4',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  ratingText: {
    color: '#1A1A1A',
    fontSize: 10,
    fontWeight: '700',
  },
  driverDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  driverName: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '800',
  },
  carName: {
    color: '#6E6663',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  plate: {
    color: '#6E6663',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
    letterSpacing: 0.2,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F07D3B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  /* "I'M HERE" BUTTON */
  hereButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F07D3B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  hereButtonActive: {
    backgroundColor: '#E06B29',
  },
  hereButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8,
  },

  /* STATS ROW */
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  stat: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#FFF0EC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  statLabel: {
    color: '#7A726F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  statValue: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 3,
  },

  /* CANCEL RIDE */
  cancelLink: {
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelText: {
    color: '#5B504C',
    fontSize: 14,
    fontWeight: '700',
  },

  /* MODAL */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 358,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 26,
  },
  modalIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFF0E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  modalTitle: {
    color: '#302D2D',
    fontSize: 18,
    fontWeight: '800',
  },
  modalCopy: {
    color: '#7F7774',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  confirmCancel: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#EF765E',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmCancelText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  confirmVerify: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#F07D3B',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  confirmVerifyText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  keepRide: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  keepRideText: {
    color: '#5B504C',
    fontSize: 13,
    fontWeight: '700',
  },
});
