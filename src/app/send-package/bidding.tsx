import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useUser } from '../../context/user-context';

export default function VehicleBiddingScreen() {
  const router = useRouter();
  const { user } = useUser();

  const [selectedVehicle, setSelectedVehicle] = useState<'motorbike' | 'car' | 'van'>('car');
  const [minPrice, setMinPrice] = useState('2500');
  const [maxPrice, setMaxPrice] = useState('4500');
  const [searchingModalVisible, setSearchingModalVisible] = useState(false);

  // Animation pulse
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (searchingModalVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();

      const timer = setTimeout(() => {
        setSearchingModalVisible(false);
        router.push('/send-package/offers' as any);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [searchingModalVisible, pulseAnim, router]);

  const handleFindDrivers = () => {
    setSearchingModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Screen Top Header with User Info */}
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

        {/* Section 1: Vehicle Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Type</Text>

          {/* Motorbike */}
          <TouchableOpacity
            style={[
              styles.vehicleCard,
              selectedVehicle === 'motorbike' && styles.vehicleCardSelected,
            ]}
            onPress={() => setSelectedVehicle('motorbike')}
            activeOpacity={0.85}
          >
            <View style={styles.vehicleIconCircle}>
              <MaterialCommunityIcons name="motorbike" size={24} color="#F07D3B" />
            </View>
            <View style={styles.vehicleTextGroup}>
              <Text style={styles.vehicleName}>Motorbike</Text>
              <Text style={styles.vehicleDesc}>Best for small items & envelopes</Text>
            </View>
            {selectedVehicle === 'motorbike' && (
              <Ionicons name="checkmark-circle" size={22} color="#B8521B" />
            )}
          </TouchableOpacity>

          {/* Car */}
          <TouchableOpacity
            style={[
              styles.vehicleCard,
              selectedVehicle === 'car' && styles.vehicleCardSelected,
            ]}
            onPress={() => setSelectedVehicle('car')}
            activeOpacity={0.85}
          >
            <View style={styles.vehicleIconCircle}>
              <MaterialCommunityIcons name="car" size={24} color="#F07D3B" />
            </View>
            <View style={styles.vehicleTextGroup}>
              <Text style={styles.vehicleName}>Car</Text>
              <Text style={styles.vehicleDesc}>Standard parcels & fragile items</Text>
            </View>
            {selectedVehicle === 'car' && (
              <Ionicons name="checkmark-circle" size={22} color="#B8521B" />
            )}
          </TouchableOpacity>

          {/* Van */}
          <TouchableOpacity
            style={[
              styles.vehicleCard,
              selectedVehicle === 'van' && styles.vehicleCardSelected,
            ]}
            onPress={() => setSelectedVehicle('van')}
            activeOpacity={0.85}
          >
            <View style={styles.vehicleIconCircle}>
              <MaterialCommunityIcons name="truck-outline" size={24} color="#F07D3B" />
            </View>
            <View style={styles.vehicleTextGroup}>
              <Text style={styles.vehicleName}>Van</Text>
              <Text style={styles.vehicleDesc}>Large/Bulk items & furniture</Text>
            </View>
            {selectedVehicle === 'van' && (
              <Ionicons name="checkmark-circle" size={22} color="#B8521B" />
            )}
          </TouchableOpacity>
        </View>

        {/* Section 2: Set Your Price Range */}
        <View style={styles.priceSectionCard}>
          <View style={styles.priceHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>Set Your Price Range</Text>
              <Text style={styles.priceSubTitle}>Drivers will bid within this range</Text>
            </View>

            <View style={styles.biddingBadge}>
              <Text style={styles.biddingBadgeText}>BIDDING ACTIVE</Text>
            </View>
          </View>

          {/* Min & Max Price Input Row */}
          <View style={styles.priceInputsRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.priceInputLabel}>Base Price (Min)</Text>
              <View style={styles.priceInputWrap}>
                <Text style={styles.nairaPrefix}>₦</Text>
                <TextInput
                  style={styles.priceTextInput}
                  value={minPrice}
                  onChangeText={(val) => setMinPrice(val.replace(/[^0-9]/g, ''))}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.priceInputLabel}>Max Price</Text>
              <View style={styles.priceInputWrap}>
                <Text style={styles.nairaPrefix}>₦</Text>
                <TextInput
                  style={styles.priceTextInput}
                  value={maxPrice}
                  onChangeText={(val) => setMaxPrice(val.replace(/[^0-9]/g, ''))}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>

          {/* Interactive Dual Range Slider Visual */}
          <View style={styles.sliderTrackContainer}>
            <View style={styles.sliderTrackBg} />
            <View style={styles.sliderTrackActive} />
            <View style={[styles.sliderThumb, { left: '20%' }]} />
            <View style={[styles.sliderThumb, { left: '75%' }]} />
          </View>

          {/* Recommended Box */}
          <View style={styles.recommendedBox}>
            <Ionicons name="bulb" size={18} color="#F07D3B" style={{ marginRight: 8 }} />
            <Text style={styles.recommendedText}>
              Recommended: <Text style={{ fontWeight: '800', color: '#B8521B' }}>₦2,500 - ₦4,000</Text>
            </Text>
          </View>

          {/* Warning Info Text */}
          <Text style={styles.warningInfoText}>
            <Ionicons name="information-circle-outline" size={13} color="#EF4444" /> Price range must have at least <Text style={{ fontWeight: '800', color: '#1D1614' }}>₦1500</Text> difference to attract drivers and improve matching.
          </Text>
        </View>

        {/* Bottom Meta Stats & Action */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#7F7774" style={{ marginRight: 4 }} />
            <Text style={styles.metaText}>PICKUP IN 4 MINS</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={16} color="#7F7774" style={{ marginRight: 4 }} />
            <Text style={styles.metaText}>12.4 KM</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.findDriversButton}
          onPress={handleFindDrivers}
          activeOpacity={0.85}
        >
          <Text style={styles.findDriversButtonText}>Find Drivers</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </ScrollView>

      {/* SEARCHING FOR DRIVERS ANIMATED MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={searchingModalVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.searchingModalCard}>
            <Animated.View
              style={[
                styles.radarCircle,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Ionicons name="car-sport" size={38} color="#F07D3B" />
            </Animated.View>

            <ActivityIndicator size="small" color="#F07D3B" style={{ marginTop: 18 }} />
            <Text style={styles.searchingTitle}>Broadcast to Drivers...</Text>
            <Text style={styles.searchingSub}>
              Broadcasting your price range (₦{minPrice} - ₦{maxPrice}) to 14 nearby top drivers...
            </Text>
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
    marginBottom: 20,
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 10,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  vehicleCardSelected: {
    backgroundColor: '#FFF5F2',
    borderColor: '#F07D3B',
  },
  vehicleIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vehicleTextGroup: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  vehicleDesc: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  priceSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  priceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  priceSubTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  biddingBadge: {
    backgroundColor: '#FCEAE3',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  biddingBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A04D17',
    letterSpacing: 0.5,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 16,
  },
  nairaPrefix: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
    marginRight: 6,
  },
  priceTextInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  sliderTrackContainer: {
    height: 30,
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  sliderTrackBg: {
    height: 6,
    backgroundColor: '#EFEAE7',
    borderRadius: 3,
    width: '100%',
  },
  sliderTrackActive: {
    position: 'absolute',
    left: '20%',
    width: '55%',
    height: 6,
    backgroundColor: '#F07D3B',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#F07D3B',
    top: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFE3D8',
  },
  recommendedText: {
    fontSize: 13,
    color: '#6E6663',
    fontWeight: '600',
  },
  warningInfoText: {
    fontSize: 11,
    color: '#7F7774',
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
  },
  findDriversButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  findDriversButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  /* SEARCHING MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  searchingModalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 28,
  },
  radarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
    marginTop: 14,
    marginBottom: 6,
  },
  searchingSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 18,
  },
});
