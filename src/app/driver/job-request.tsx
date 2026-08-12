import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function JobRequestScreen() {
  const router = useRouter();
  const [customPrice, setCustomPrice] = useState('4,500');

  // Modal & Animation States
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [countdown, setCountdown] = useState(4);

  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedDeclineReason, setSelectedDeclineReason] = useState<string>(
    'Fare too low for distance'
  );
  const [isDeclineGlowing, setIsDeclineGlowing] = useState(false);

  const DECLINE_REASONS = [
    'Fare too low for distance',
    'Distance too far to pickup',
    'Ending shift soon',
    'Vehicle maintenance required',
  ];

  // Accept Request Handler - Triggers 4-second countdown modal
  const handleAcceptRequest = () => {
    setShowAcceptedModal(true);
    setCountdown(4);
  };

  // 4-second countdown effect for Accepted Modal
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showAcceptedModal && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showAcceptedModal && countdown === 0) {
      setShowAcceptedModal(false);
      router.push('/driver/drivingtou' as any);
    }
    return () => clearTimeout(timer);
  }, [showAcceptedModal, countdown, router]);

  // Decline Button Handler - Triggers glowing effect & decline modal
  const handleDeclinePress = () => {
    setIsDeclineGlowing(true);
    setTimeout(() => {
      setIsDeclineGlowing(false);
      setShowDeclineModal(true);
    }, 250);
  };

  // Confirm Decline
  const handleConfirmDecline = () => {
    setShowDeclineModal(false);
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

        <Text style={styles.headerTitle}>Job Request</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* MAP PREVIEW CARD */}
        <View style={styles.mapCard}>
          <Image
            source={require('../../../assets/map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />

          {/* FLOATING ROUTE BADGES */}
          <View style={styles.blueArrivalPill}>
            <Ionicons name="location" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.blueArrivalText}>Arrive by 20:23</Text>
          </View>

          <View style={styles.greenMinBadge}>
            <Text style={styles.greenMinNumber}>26</Text>
            <Text style={styles.greenMinText}>min</Text>
          </View>
        </View>

        {/* ASKING PRICE CARD */}
        <View style={styles.askingPriceCard}>
          <Text style={styles.askingPriceLabel}>ASKING PRICE</Text>
          <Text style={styles.askingPriceValue}>₦4,500 – ₦6,000</Text>

          <View style={styles.bonusBadge}>
            <Ionicons name="sparkles" size={13} color="#8C531B" style={{ marginRight: 6 }} />
            <Text style={styles.bonusBadgeText}>HIGH DEMAND BONUS INCLUDED</Text>
          </View>
        </View>

        {/* ROUTE LOCATION CARD */}
        <View style={styles.routeCard}>
          {/* PICKUP */}
          <View style={styles.routeRow}>
            <View style={styles.pickupDotOuter}>
              <View style={styles.pickupDotInner} />
            </View>
            <View style={styles.routeTextGroup}>
              <Text style={styles.routeLabel}>PICKUP</Text>
              <Text style={styles.routeAddress}>123 Innovation Drive, Tech Hub</Text>
            </View>
          </View>

          {/* DASHED LINE */}
          <View style={styles.dashedLineContainer}>
            <View style={styles.dashedLine} />
          </View>

          {/* DESTINATION */}
          <View style={styles.routeRow}>
            <View style={styles.destDot}>
              <Ionicons name="location-sharp" size={12} color="#FFFFFF" />
            </View>
            <View style={styles.routeTextGroup}>
              <Text style={styles.routeLabel}>DESTINATION</Text>
              <Text style={styles.routeAddress}>T Building, Wuse 2</Text>
            </View>
          </View>
        </View>

        {/* EDITABLE SET PRICE INPUT BOX */}
        <View style={styles.setPriceBox}>
          <Text style={styles.setPriceLabel}>Set Price</Text>
          <View style={styles.priceInputWrapper}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={customPrice}
              onChangeText={setCustomPrice}
            />
          </View>
        </View>

        {/* ACCEPT JOB REQUEST BUTTON */}
        <TouchableOpacity
          style={styles.acceptBtn}
          onPress={handleAcceptRequest}
          activeOpacity={0.88}
        >
          <Text style={styles.acceptBtnText}>Accept Job Request</Text>
        </TouchableOpacity>

        {/* DECLINE BUTTON WITH GLOWING EFFECT */}
        <TouchableOpacity
          style={[
            styles.declineBtn,
            isDeclineGlowing && styles.declineBtnGlowing,
          ]}
          onPress={handleDeclinePress}
          activeOpacity={0.7}
        >
          <Text style={[styles.declineBtnText, isDeclineGlowing && styles.declineBtnTextGlowing]}>
            Decline
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ANIMATED ACCEPTED NOTIFICATION POPUP MODAL (4s COUNTDOWN) */}
      <Modal
        visible={showAcceptedModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAcceptedModal(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.acceptedModalCard}>
            <View style={styles.pulseCheckCircle}>
              <Ionicons name="checkmark" size={38} color="#FFFFFF" />
            </View>

            <Text style={styles.acceptedTitle}>Job Request Accepted!</Text>
            <Text style={styles.acceptedSub}>
              Accepted at <Text style={{ color: '#F07D3B', fontWeight: '800' }}>₦{customPrice}</Text>. Connecting to passenger & route...
            </Text>

            <View style={styles.timerBadge}>
              <ActivityIndicator size="small" color="#F07D3B" style={{ marginRight: 8 }} />
              <Text style={styles.timerText}>
                Opening Driving Page in <Text style={styles.timerNumber}>{countdown}s</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.skipWaitBtn}
              onPress={() => {
                setShowAcceptedModal(false);
                router.push('/driver/drivingtou' as any);
              }}
            >
              <Text style={styles.skipWaitText}>Go Now ➔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DECLINE CONFIRMATION MODAL */}
      <Modal
        visible={showDeclineModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDeclineModal(false)}
      >
        <Pressable
          style={styles.popupOverlay}
          onPress={() => setShowDeclineModal(false)}
        >
          <Pressable style={styles.declineSheetCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />

            <View style={styles.declineHeaderRow}>
              <View style={styles.warningIconCircle}>
                <Ionicons name="alert-circle-outline" size={24} color="#EF4444" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.declineModalTitle}>Decline Job Request?</Text>
                <Text style={styles.declineModalSub}>
                  Select a reason to help us match better requests for your vehicle.
                </Text>
              </View>
            </View>

            {/* REASONS LIST */}
            <View style={styles.reasonsList}>
              {DECLINE_REASONS.map((reason) => {
                const isSelected = selectedDeclineReason === reason;
                return (
                  <TouchableOpacity
                    key={reason}
                    style={[
                      styles.reasonOptionCard,
                      isSelected && styles.reasonOptionSelected,
                    ]}
                    onPress={() => setSelectedDeclineReason(reason)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.radioCircle, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <Text style={[styles.reasonText, isSelected && styles.reasonTextSelected]}>
                      {reason}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* MODAL ACTION BUTTONS */}
            <TouchableOpacity
              style={styles.confirmDeclineBtn}
              onPress={handleConfirmDecline}
              activeOpacity={0.88}
            >
              <Text style={styles.confirmDeclineText}>Decline Job</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keepRequestBtn}
              onPress={() => setShowDeclineModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.keepRequestText}>Keep Request</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
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
  mapCard: {
    height: 180,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  blueArrivalPill: {
    position: 'absolute',
    top: 16,
    left: 20,
    backgroundColor: '#5266F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  blueArrivalText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  greenMinBadge: {
    position: 'absolute',
    top: 60,
    right: 40,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenMinNumber: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 16,
  },
  greenMinText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  askingPriceCard: {
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
  askingPriceLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  askingPriceValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#8C531B',
    marginBottom: 12,
  },
  bonusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
  },
  bonusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
  },
  routeCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupDotOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#8C531B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickupDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8C531B',
  },
  dashedLineContainer: {
    marginLeft: 10,
    height: 24,
    justifyContent: 'center',
  },
  dashedLine: {
    width: 2,
    height: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  destDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeTextGroup: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  setPriceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  setPriceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6663',
  },
  priceInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    marginRight: 2,
  },
  priceInput: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    minWidth: 55,
    textAlign: 'right',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  acceptBtn: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  acceptBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  declineBtn: {
    height: 54,
    backgroundColor: '#FFF5F2',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE8DE',
  },
  declineBtnGlowing: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  declineBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#524945',
  },
  declineBtnTextGlowing: {
    color: '#DC2626',
  },

  /* ACCEPTED POPUP MODAL */
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  acceptedModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  pulseCheckCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  acceptedTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  acceptedSub: {
    fontSize: 14,
    color: '#6E6663',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  timerNumber: {
    color: '#F07D3B',
    fontWeight: '800',
    fontSize: 15,
  },
  skipWaitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipWaitText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F07D3B',
  },

  /* DECLINE SHEET MODAL */
  declineSheetCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  declineHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  warningIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  declineModalSub: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 2,
    lineHeight: 16,
  },
  reasonsList: {
    gap: 10,
    marginBottom: 24,
  },
  reasonOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  reasonOptionSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#EF4444',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  reasonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reasonTextSelected: {
    color: '#DC2626',
    fontWeight: '800',
  },
  confirmDeclineBtn: {
    height: 52,
    backgroundColor: '#EF4444',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#EF4444',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  confirmDeclineText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  keepRequestBtn: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keepRequestText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6E6663',
  },
});
