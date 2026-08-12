import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import DriverBottomTab from '../../components/driver-bottom-tab';

export default function DriverTripsScreen() {
  const router = useRouter();

  const trips = [
    {
      id: 'trip-101',
      date: 'Today, 2:45 PM',
      passenger: 'Chioma Adebayo',
      avatar: require('../../../assets/user_avatar.png'),
      pickup: '123 Innovation Drive, Tech Hub',
      dropoff: 'Central Bank Plaza, Wuse 2',
      status: 'Completed',
      fare: 3800,
      rating: 5,
    },
    {
      id: 'trip-102',
      date: 'Yesterday, 6:12 PM',
      passenger: 'Emeka Logistics',
      avatar: require('../../../assets/user_avatar.png'),
      pickup: 'Maitama Shopping Complex',
      dropoff: 'Nnamdi Azikiwe Airport Cargo Terminal',
      status: 'Completed',
      fare: 8500,
      rating: 5,
    },
    {
      id: 'trip-103',
      date: 'Aug 10, 11:30 AM',
      passenger: 'David K.',
      avatar: require('../../../assets/user_avatar.png'),
      pickup: 'Garki 2 Supermarket',
      dropoff: 'Utako Bus Terminal',
      status: 'Completed',
      fare: 4200,
      rating: 4,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Trips</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.tripsList}>
          {trips.map((item) => (
            <View key={item.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <Image source={item.avatar} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.passengerName}>{item.passenger}</Text>
                  <Text style={styles.tripDate}>{item.date}</Text>
                </View>
                <Text style={styles.fareText}>₦{item.fare.toLocaleString()}</Text>
              </View>

              <View style={styles.routeBox}>
                <View style={styles.routeRow}>
                  <Ionicons name="location" size={14} color="#F07D3B" style={{ marginRight: 6 }} />
                  <Text style={styles.routeText} numberOfLines={1}>{item.pickup}</Text>
                </View>
                <View style={styles.routeRow}>
                  <Ionicons name="flag" size={14} color="#10B981" style={{ marginRight: 6 }} />
                  <Text style={styles.routeText} numberOfLines={1}>{item.dropoff}</Text>
                </View>
              </View>

              <View style={styles.tripFooter}>
                <View style={styles.statusPill}>
                  <Ionicons name="checkmark-circle" size={14} color="#10B981" style={{ marginRight: 4 }} />
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <Text style={styles.ratingText}>Rated ★ {item.rating}.0</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <DriverBottomTab activeTab="rides" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFBF9' },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backBtn: { padding: 6 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 },
  tripsList: { gap: 14 },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tripHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  passengerName: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  tripDate: { fontSize: 12, color: '#7F7774', marginTop: 2 },
  fareText: { fontSize: 18, fontWeight: '900', color: '#F07D3B' },
  routeBox: { backgroundColor: '#F9FAFB', borderRadius: 14, padding: 12, gap: 6, marginBottom: 14 },
  routeRow: { flexDirection: 'row', alignItems: 'center' },
  routeText: { fontSize: 13, fontWeight: '600', color: '#1F2937', flex: 1 },
  tripFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: { fontSize: 12, fontWeight: '800', color: '#059669' },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#F59E0B' },
});
