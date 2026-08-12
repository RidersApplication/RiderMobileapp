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
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AdminNavDrawer from '../../components/admin-nav-drawer';

export default function AdminDashboardScreen() {
  const router = useRouter();

  const [selectedChartPeriod, setSelectedChartPeriod] = useState('Last 30 Days');

  const METRIC_CARDS = [
    { title: 'TOTAL USERS', val: '12,450', change: '+12%', isPos: true },
    { title: 'ACTIVE DRIVERS', val: '1,204', change: '+5%', isPos: true },
    { title: 'ACTIVE BOOKINGS', val: '432', change: '-2%', isPos: false },
    { title: 'REVENUE', val: '$84,200', change: '+15%', isPos: true },
  ];

  const LIVE_EVENTS = [
    {
      id: 'e-1',
      title: 'Driver #1204 picked up package',
      time: '2 minutes ago • Zone A-4',
      icon: 'truck-delivery-outline',
      bg: '#E6F4F1',
      color: '#0D9488',
    },
    {
      id: 'e-2',
      title: "New business 'Atelier Co' registered",
      time: '14 minutes ago • Corporate',
      icon: 'office-building-outline',
      bg: '#FFF0E6',
      color: '#F07D3B',
    },
    {
      id: 'e-3',
      title: 'Delay reported on Route 7',
      time: '45 minutes ago • Traffic Incident',
      icon: 'alert-triangle-outline',
      bg: '#FEE2E2',
      color: '#EF4444',
    },
    {
      id: 'e-4',
      title: 'Payment verified: #ORD-9932',
      time: '1 hour ago • Stripe Node',
      icon: 'check-circle-outline',
      bg: '#E6F4F1',
      color: '#0D9488',
    },
  ];

  const BAR_HEIGHTS = [45, 60, 35, 75, 48, 65, 30, 55, 82, 40, 78];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* ADMIN SHARED TOP NAVBAR & HAMBURGER DRAWER */}
      <AdminNavDrawer activeRoute="Dashboard" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LIVE PING STATUS BANNER */}
        <View style={styles.pingBanner}>
          <View style={styles.pingDotRow}>
            <View style={styles.brownDot} />
            <Text style={styles.pingText}>All logistics nodes operational.</Text>
          </View>
          <Text style={styles.lastPingText}>LAST PING: 2S AGO</Text>
        </View>

        {/* METRICS GRID */}
        <View style={styles.metricsGrid}>
          {METRIC_CARDS.map((m) => (
            <View key={m.title} style={styles.metricCard}>
              <View style={styles.metricHeaderRow}>
                <Text style={styles.metricLabel}>{m.title}</Text>
                <View
                  style={[
                    styles.changeBadge,
                    m.isPos ? styles.changePos : styles.changeNeg,
                  ]}
                >
                  <Text style={[styles.changeText, m.isPos ? styles.changeTextPos : styles.changeTextNeg]}>
                    {m.change}
                  </Text>
                </View>
              </View>
              <Text style={styles.metricVal}>{m.val}</Text>
            </View>
          ))}
        </View>

        {/* MAIN BODY FLEX ROW */}
        <View style={styles.dashboardBodyRow}>
          {/* ACTIVITY TRENDS CHART CARD */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeaderRow}>
              <View>
                <Text style={styles.chartTitle}>Activity Trends</Text>
                <Text style={styles.chartSub}>Logistics node volume & delivery metrics</Text>
              </View>

              <TouchableOpacity
                style={styles.periodDropdownBtn}
                onPress={() =>
                  Alert.alert('Filter Period', 'Select chart time range:', [
                    { text: 'Last 7 Days', onPress: () => setSelectedChartPeriod('Last 7 Days') },
                    { text: 'Last 30 Days', onPress: () => setSelectedChartPeriod('Last 30 Days') },
                    { text: 'Last 90 Days', onPress: () => setSelectedChartPeriod('Last 90 Days') },
                  ])
                }
                activeOpacity={0.8}
              >
                <Text style={styles.periodDropdownText}>{selectedChartPeriod}</Text>
                <Ionicons name="chevron-down" size={14} color="#1F2937" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>

            {/* BARS GRAPH PREVIEW */}
            <View style={styles.barsContainer}>
              {BAR_HEIGHTS.map((h, i) => {
                const isHighlight = i === 4 || i === 8;
                return (
                  <View key={i} style={styles.barColumn}>
                    <View
                      style={[
                        styles.barFill,
                        { height: `${h}%` },
                        isHighlight ? styles.barHighlight : styles.barDefault,
                      ]}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.chartDatesRow}>
              <Text style={styles.chartDateLabel}>01 OCT</Text>
              <Text style={styles.chartDateLabel}>10 OCT</Text>
              <Text style={styles.chartDateLabel}>20 OCT</Text>
              <Text style={styles.chartDateLabel}>30 OCT</Text>
            </View>
          </View>

          {/* LIVE FEED SIDEBAR CARD */}
          <View style={styles.liveFeedCard}>
            <Text style={styles.liveFeedTitle}>Live Feed</Text>
            <Text style={styles.liveFeedSub}>Real-time ecosystem events</Text>

            <View style={styles.eventsList}>
              {LIVE_EVENTS.map((e) => (
                <View key={e.id} style={styles.eventItemRow}>
                  <View style={[styles.eventIconCircle, { backgroundColor: e.bg }]}>
                    <MaterialCommunityIcons name={e.icon as any} size={18} color={e.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventItemTitle}>{e.title}</Text>
                    <Text style={styles.eventItemTime}>{e.time}</Text>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.viewLogsBtn} activeOpacity={0.8}>
              <Text style={styles.viewLogsBtnText}>VIEW ALL LOGS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTTOM FLEET & MAP SECTION */}
        <View style={styles.bottomSectionRow}>
          {/* NETWORK HEALTH */}
          <View style={styles.healthCard}>
            <Text style={styles.healthTitle}>Network Health</Text>

            <View style={styles.healthRow}>
              <Text style={styles.healthLabel}>Central Hub</Text>
              <Text style={[styles.healthVal, { color: '#0D9488' }]}>STABLE</Text>
            </View>

            <View style={styles.healthRow}>
              <Text style={styles.healthLabel}>Edge Nodes</Text>
              <Text style={[styles.healthVal, { color: '#D97706' }]}>OPTIMIZING</Text>
            </View>
            <View style={styles.healthProgressTrack}>
              <View style={[styles.healthProgressFill, { width: '70%' }]} />
            </View>

            {/* FLEET SUPPORT CARD */}
            <View style={styles.fleetSupportBox}>
              <Text style={styles.supportBoxTitle}>Fleet Support</Text>
              <Text style={styles.supportBoxSub}>
                Direct line to logistics coordinators currently open for priority nodes.
              </Text>
              <TouchableOpacity
                style={styles.contactSupportBtn}
                onPress={() => Alert.alert('Priority Support', 'Connecting to Logistics Command Center...')}
                activeOpacity={0.88}
              >
                <Text style={styles.contactSupportText}>CONTACT SUPPORT</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* INTERACTIVE FLEET MAP VIEW */}
          <View style={styles.fleetMapCard}>
            <Image
              source={require('../../../assets/map.png')}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={[styles.mapVehiclePin, { top: '30%', left: '25%' }]}>
              <Ionicons name="car" size={14} color="#1F2937" />
            </View>
            <View style={[styles.mapVehiclePin, { top: '25%', right: '30%' }]}>
              <Ionicons name="car" size={14} color="#1F2937" />
            </View>
            <View style={[styles.mapVehiclePin, { bottom: '35%', left: '45%' }]}>
              <Ionicons name="car" size={14} color="#1F2937" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  pingBanner: {
    backgroundColor: '#FFF0E6',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pingDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8C531B',
    marginRight: 8,
  },
  pingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8C531B',
  },
  lastPingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  metricHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  changeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changePos: {
    backgroundColor: '#DCFCE7',
  },
  changeNeg: {
    backgroundColor: '#FEE2E2',
  },
  changeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  changeTextPos: {
    color: '#16A34A',
  },
  changeTextNeg: {
    color: '#DC2626',
  },
  metricVal: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1F2937',
  },
  dashboardBodyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  chartCard: {
    flex: 2,
    minWidth: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  chartSub: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 2,
  },
  periodDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  periodDropdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  barsContainer: {
    height: 140,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  barColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barDefault: {
    backgroundColor: '#F3E8E2',
  },
  barHighlight: {
    backgroundColor: '#8C531B',
  },
  chartDatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  chartDateLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  liveFeedCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  liveFeedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  liveFeedSub: {
    fontSize: 12,
    color: '#6E6663',
    marginBottom: 16,
  },
  eventsList: {
    gap: 14,
    marginBottom: 18,
  },
  eventItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  eventItemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  eventItemTime: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  viewLogsBtn: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  viewLogsBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
  },
  bottomSectionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  healthCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 14,
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthLabel: {
    fontSize: 12,
    color: '#6E6663',
  },
  healthVal: {
    fontSize: 12,
    fontWeight: '800',
  },
  healthProgressTrack: {
    height: 6,
    backgroundColor: '#F3ECE9',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  healthProgressFill: {
    height: '100%',
    backgroundColor: '#D97706',
  },
  fleetSupportBox: {
    backgroundColor: '#1F2937',
    borderRadius: 18,
    padding: 16,
  },
  supportBoxTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  supportBoxSub: {
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 16,
    marginBottom: 14,
  },
  contactSupportBtn: {
    backgroundColor: '#8C531B',
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactSupportText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  fleetMapCard: {
    flex: 2,
    minWidth: 280,
    height: 240,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapVehiclePin: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
});
