import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export interface TripRecord {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  amount: string;
  status: 'Completed' | 'Cancelled';
  vehicleType: string;
}

export default function RidesScreen() {
  const router = useRouter();

  const [trips, setTrips] = useState<TripRecord[]>([
    {
      id: 'trip-1',
      date: 'Today, 2:45 PM',
      pickup: '123 Innovation Drive, Tech Hub',
      destination: 'T Building, Wuse 2',
      amount: '₦4,500',
      status: 'Completed',
      vehicleType: 'Standard Sedan',
    },
    {
      id: 'trip-2',
      date: 'Yesterday, 6:15 PM',
      pickup: 'Maitama Executive Apartments',
      destination: 'Central Business District',
      amount: '₦6,200',
      status: 'Completed',
      vehicleType: 'Comfort SUV',
    },
    {
      id: 'trip-3',
      date: 'Oct 22, 2023 • 11:30 AM',
      pickup: 'Airport Terminal 2',
      destination: 'Hilton Hotel, Abuja',
      amount: '₦12,500',
      status: 'Completed',
      vehicleType: 'Executive Van',
    },
    {
      id: 'trip-4',
      date: 'Oct 20, 2023 • 4:20 PM',
      pickup: 'Garki Model Market',
      destination: 'Jabi Lake Mall',
      amount: '₦3,800',
      status: 'Cancelled',
      vehicleType: 'Standard Sedan',
    },
  ]);

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert(
      'Delete Trip Record',
      'Are you sure you want to remove this trip record from your history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTrips((prev) => prev.filter((t) => t.id !== tripId));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <Text style={styles.headerTitle}>My Rides</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {trips.length === 0 ? (
          <View style={styles.emptyBox}>
            <MaterialCommunityIcons name="car-off" size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Trip Records</Text>
            <Text style={styles.emptySub}>All trip history items have been removed.</Text>
          </View>
        ) : (
          trips.map((item) => (
            <View key={item.id} style={styles.tripCard}>
              {/* CARD TOP ROW */}
              <View style={styles.cardHeaderRow}>
                <View style={styles.vehicleBadge}>
                  <MaterialCommunityIcons name="car-side" size={16} color="#F07D3B" style={{ marginRight: 6 }} />
                  <Text style={styles.vehicleText}>{item.vehicleType}</Text>
                </View>

                <View style={styles.topRightActions}>
                  <Text style={styles.amountText}>{item.amount}</Text>

                  {/* DELETE BUTTON */}
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteTrip(item.id)}
                    activeOpacity={0.75}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.dateText}>{item.date}</Text>

              {/* ROUTE LOCATION */}
              <View style={styles.routeContainer}>
                <View style={styles.locationRow}>
                  <Ionicons name="radio-button-on" size={14} color="#F07D3B" style={{ marginRight: 8 }} />
                  <Text style={styles.addressText} numberOfLines={1}>
                    {item.pickup}
                  </Text>
                </View>

                <View style={styles.routeConnector} />

                <View style={styles.locationRow}>
                  <Ionicons name="location" size={14} color="#1F2937" style={{ marginRight: 8 }} />
                  <Text style={styles.addressText} numberOfLines={1}>
                    {item.destination}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    gap: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  vehicleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  vehicleText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F2937',
  },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#7F7774',
    marginBottom: 14,
  },
  routeContainer: {
    backgroundColor: '#FFF5F2',
    borderRadius: 16,
    padding: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  routeConnector: {
    width: 2,
    height: 12,
    backgroundColor: '#D1D5DB',
    marginLeft: 6,
    marginVertical: 2,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 12,
  },
  emptySub: {
    fontSize: 14,
    color: '#6E6663',
    marginTop: 4,
  },
});