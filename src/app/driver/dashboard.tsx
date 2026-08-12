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
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import DriverBottomTab from '../../components/driver-bottom-tab';

export default function DriverDashboardScreen() {
  const router = useRouter();

  const [isOnline, setIsOnline] = useState(true);
  const [showNewRequestModal, setShowNewRequestModal] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(12500);
  const [completedTrips, setCompletedTrips] = useState(8);

  const handleAcceptRide = () => {
    setShowNewRequestModal(false);
    router.push('/driver/job-request' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Dashboard</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CURRENT ZONE MAP CARD */}
        <View style={styles.mapZoneCard}>
          <Image
            source={require('../../../assets/map.png')}
            style={styles.mapZoneImage}
            resizeMode="cover"
          />

          <View style={styles.zoneOverlayCard}>
            <Text style={styles.zoneLabel}>CURRENT ZONE</Text>
            <Text style={styles.zoneName}>Nyanya Market</Text>

            <View style={styles.highDemandRow}>
              <Text style={styles.fireIcon}>🔥</Text>
              <Text style={styles.highDemandText}>High Demand Area (+₦500)</Text>
            </View>
          </View>
        </View>

        {/* TODAY'S EARNINGS CARD */}
        <View style={styles.earningsCard}>
          <View>
            <Text style={styles.earningsLabel}>TODAY'S EARNINGS</Text>
            <Text style={styles.earningsValue}>
              ₦{todayEarnings.toLocaleString('en-NG')}
            </Text>
          </View>

          <View style={styles.tripsCountCol}>
            <Text style={styles.tripsLabel}>TRIPS</Text>
            <Text style={styles.tripsValue}>
              {completedTrips < 10 ? `0${completedTrips}` : completedTrips}
            </Text>
          </View>
        </View>

        {/* METRICS ROW (HOURS & RATING) */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricIconCircle}>
              <Ionicons name="time-outline" size={20} color="#F07D3B" />
            </View>
            <Text style={styles.metricCardLabel}>HOURS ONLINE</Text>
            <Text style={styles.metricCardValue}>6.4h</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIconCircle}>
              <Ionicons name="star" size={20} color="#F07D3B" />
            </View>
            <Text style={styles.metricCardLabel}>DRIVER RATING</Text>
            <Text style={styles.metricCardValue}>4.92</Text>
          </View>
        </View>

        {/* TRIGGER NEW REQUEST POPUP BUTTON (IF CLOSED) */}
        {!showNewRequestModal && (
          <TouchableOpacity
            style={styles.triggerBanner}
            onPress={() => setShowNewRequestModal(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="notifications" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.triggerBannerText}>New Job Request Available (Tap to View)</Text>
          </TouchableOpacity>
        )}

        {/* RECENT ACTIVITY SECTION */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.push('/driver/trips' as any)}>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {/* ITEM 1 */}
          <View style={styles.activityItem}>
            <View style={styles.activityIconBox}>
              <MaterialCommunityIcons name="package-variant-closed" size={22} color="#8C531B" />
            </View>

            <View style={styles.activityTextCol}>
              <Text style={styles.activityTitle}>Order #29841</Text>
              <Text style={styles.activitySub}>Delivered • Victoria Island</Text>
            </View>

            <Text style={styles.activityAmount}>+₦1,450</Text>
          </View>

          {/* ITEM 2 */}
          <View style={styles.activityItem}>
            <View style={styles.activityIconBox}>
              <MaterialCommunityIcons name="package-variant-closed" size={22} color="#8C531B" />
            </View>

            <View style={styles.activityTextCol}>
              <Text style={styles.activityTitle}>Order #29838</Text>
              <Text style={styles.activitySub}>Delivered • Ikoyi South</Text>
            </View>

            <Text style={styles.activityAmount}>+₦2,100</Text>
          </View>
        </View>

        {/* NEXT BEST AREA INSIGHT CARD */}
        <View style={styles.insightCard}>
          <View style={styles.insightHeaderRow}>
            <Ionicons name="sparkles" size={20} color="#8C531B" style={{ marginRight: 8 }} />
            <Text style={styles.insightTitle}>Next Best Area: Maitama</Text>
          </View>
          <Text style={styles.insightBody}>
            Current data shows a 45% surge in delivery requests near the Coastal Road. Move
            there to maximize your earnings potential.
          </Text>
        </View>
      </ScrollView>

      {/* SCREEN 5: NEW REQUEST BOTTOM SHEET MODAL */}
      <Modal
        visible={showNewRequestModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewRequestModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowNewRequestModal(false)}
        >
          <Pressable style={styles.newReqSheetCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />

            {/* HEADER ROW */}
            <View style={styles.sheetHeaderRow}>
              <View>
                <Text style={styles.sheetSubLabel}>NEW REQUEST</Text>
                <Text style={styles.sheetPriceRange}>₦4,500 – ₦6,000</Text>
                <Text style={styles.sheetPriceSub}>Estimated Earnings</Text>
              </View>

              <View style={styles.ratingBox}>
                <Text style={styles.ratingNumber}>4.8</Text>
                <Ionicons name="star" size={14} color="#F07D3B" style={{ marginLeft: 3 }} />
              </View>
            </View>

            {/* ROUTE SPECIFICATION */}
            <View style={styles.sheetRouteBox}>
              <View style={styles.sheetRouteRow}>
                <View style={styles.pickupRing}>
                  <View style={styles.pickupDot} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pointTagText}>PICKUP • 1.2 KM AWAY</Text>
                  <Text style={styles.pointAddressText}>Hilton Hotel, Abuja Central</Text>
                </View>
              </View>

              <View style={styles.sheetDashedConnector} />

              <View style={styles.sheetRouteRow}>
                <View style={styles.dropoffCircle}>
                  <Ionicons name="location-sharp" size={12} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pointTagText}>DROPOFF • 8.4 KM</Text>
                  <Text style={styles.pointAddressText}>Garki Modern Market</Text>
                </View>
              </View>
            </View>

            {/* TAGS PILLS ROW */}
            <View style={styles.tagsRow}>
              <View style={styles.tagPill}>
                <Ionicons name="time-outline" size={14} color="#6E6663" style={{ marginRight: 4 }} />
                <Text style={styles.tagText}>12 min ride</Text>
              </View>

              <View style={styles.tagPill}>
                <Ionicons name="people-outline" size={14} color="#6E6663" style={{ marginRight: 4 }} />
                <Text style={styles.tagText}>3 Passengers</Text>
              </View>

              <View style={styles.tagPill}>
                <Ionicons name="cash-outline" size={14} color="#6E6663" style={{ marginRight: 4 }} />
                <Text style={styles.tagText}>Cash Payment</Text>
              </View>
            </View>

            {/* ACTION BUTTONS ROW */}
            <View style={styles.sheetActionRow}>
              <TouchableOpacity
                style={styles.closeCircleBtn}
                onPress={() => setShowNewRequestModal(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptRideBtn}
                onPress={handleAcceptRide}
                activeOpacity={0.88}
              >
                <Text style={styles.acceptRideText}>Accept Ride</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* DRIVER NAVIGATION BAR */}
      <DriverBottomTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF9',
  },
  topHeader: {
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
    paddingBottom: 100,
  },
  mapZoneCard: {
    height: 190,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  mapZoneImage: {
    width: '100%',
    height: '100%',
  },
  zoneOverlayCard: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  zoneLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.8,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 2,
    marginBottom: 4,
  },
  highDemandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  highDemandText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
  },
  earningsCard: {
    backgroundColor: '#F07D3B',
    borderRadius: 22,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  earningsLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tripsCountCol: {
    alignItems: 'flex-end',
  },
  tripsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  tripsValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  metricIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricCardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metricCardValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
  },
  triggerBanner: {
    backgroundColor: '#8C531B',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  triggerBannerText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
  },
  activityList: {
    gap: 12,
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  activityIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityTextCol: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  activitySub: {
    fontSize: 12,
    color: '#7F7774',
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  insightCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFE8DE',
  },
  insightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  insightBody: {
    fontSize: 13,
    color: '#6E6663',
    lineHeight: 20,
  },

  /* MODAL POPUP STYLES (SCREEN 5) */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  newReqSheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -6 },
    elevation: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  sheetSubLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.8,
  },
  sheetPriceRange: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F07D3B',
    marginTop: 2,
  },
  sheetPriceSub: {
    fontSize: 12,
    color: '#6E6663',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  sheetRouteBox: {
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  sheetRouteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F07D3B',
  },
  sheetDashedConnector: {
    marginLeft: 10,
    height: 20,
    borderLeftWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  dropoffCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pointTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.5,
  },
  pointAddressText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  sheetActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  closeCircleBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFF5F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptRideBtn: {
    flex: 1,
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  acceptRideText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
