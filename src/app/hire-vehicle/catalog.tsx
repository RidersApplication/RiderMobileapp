import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface VehicleHireItem {
  id: string;
  name: string;
  categoryTag: string;
  rating: number;
  availableCount: number; // 0 for NONE AVAILABLE
  dailyRate: number;
  weeklyRate: number;
  image: any;
  companyName: string;
  isShieldBadge?: boolean;
}

const HIRE_VEHICLES: VehicleHireItem[] = [
  {
    id: 'hilux-1',
    name: 'Toyota Hilux - Pickup Truck',
    categoryTag: 'Logistics Pro',
    rating: 4.8,
    availableCount: 10,
    dailyRate: 45000,
    weeklyRate: 280000,
    image: require('../../../assets/map.png'),
    companyName: 'Logistics Pro',
  },
  {
    id: 'sprinter-2',
    name: 'Mercedes Sprinter - Cargo Van',
    categoryTag: 'Swift Haulage',
    rating: 4.9,
    availableCount: 0, // NONE AVAILABLE
    dailyRate: 55000,
    weeklyRate: 340000,
    image: require('../../../assets/map.png'),
    companyName: 'Swift Haulage',
  },
  {
    id: 'mack-3',
    name: 'Mack Granite - Heavy Truck',
    categoryTag: 'Titan Logistics',
    rating: 4.7,
    availableCount: 2,
    dailyRate: 120000,
    weeklyRate: 750000,
    image: require('../../../assets/map.png'),
    companyName: 'Titan Logistics',
    isShieldBadge: true,
  },
];

export default function VehicleHireCatalogScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'price' | 'type'>('all');

  // Modals
  const [selectedVehicleForSchedule, setSelectedVehicleForSchedule] = useState<VehicleHireItem | null>(null);
  const [contactSalesModalVisible, setContactSalesModalVisible] = useState(false);

  // Form details for contact sales
  const [salesName, setSalesName] = useState('');
  const [salesPhone, setSalesPhone] = useState('');

  const filteredVehicles = HIRE_VEHICLES.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = (vehicle: VehicleHireItem) => {
    router.push('/hire-vehicle/setup' as any);
  };

  const handleOpenDetails = (vehicle: VehicleHireItem) => {
    router.push('/hire-vehicle/details' as any);
  };

  const handleSubmitSales = () => {
    setContactSalesModalVisible(false);
    Alert.alert(
      'Inquiry Submitted',
      'Our enterprise logistics sales team will contact you within 30 minutes.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vehicle Hire</Text>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="search" size={20} color="#F07D3B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="options-outline" size={20} color="#F07D3B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Search Bar Input */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#8A7C75" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for vehicles..."
            placeholderTextColor="#A09895"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Pills Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsRow}
        >
          <TouchableOpacity
            style={[styles.filterPill, selectedFilter === 'all' && styles.filterPillSelected]}
            onPress={() => setSelectedFilter('all')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="options"
              size={14}
              color={selectedFilter === 'all' ? '#FFFFFF' : '#3E3735'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'all' && styles.filterPillTextSelected,
              ]}
            >
              All Vehicles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, selectedFilter === 'price' && styles.filterPillSelected]}
            onPress={() => setSelectedFilter('price')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'price' && styles.filterPillTextSelected,
              ]}
            >
              Price v
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, selectedFilter === 'type' && styles.filterPillSelected]}
            onPress={() => setSelectedFilter('type')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterPillText,
                selectedFilter === 'type' && styles.filterPillTextSelected,
              ]}
            >
              Type v
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Vehicles Showcase List */}
        <View style={styles.vehicleList}>
          {filteredVehicles.map((vehicle) => {
            const isAvailable = vehicle.availableCount > 0;
            return (
              <View key={vehicle.id} style={styles.vehicleCard}>
                {/* Image & Availability Badge */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleOpenDetails(vehicle)}
                  style={styles.vehicleImageWrap}
                >
                  <Image source={vehicle.image} style={styles.vehicleImage} resizeMode="cover" />

                  {isAvailable ? (
                    <View style={styles.availableBadge}>
                      <Text style={styles.availableBadgeText}>
                        {vehicle.availableCount} AVAILABLE
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.noneAvailableBadge}>
                      <Text style={styles.noneAvailableBadgeText}>NONE AVAILABLE</Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Card Details Body */}
                <View style={styles.cardBody}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleOpenDetails(vehicle)}
                    style={styles.titleRatingRow}
                  >
                    <Text style={styles.vehicleName}>{vehicle.name}</Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={13} color="#F59E0B" style={{ marginRight: 3 }} />
                      <Text style={styles.ratingText}>{vehicle.rating}</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.categoryTagRow}>
                    <Ionicons
                      name={vehicle.isShieldBadge ? 'shield-checkmark-outline' : 'checkmark-circle-outline'}
                      size={14}
                      color="#7F7774"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.categoryTagText}>{vehicle.companyName}</Text>
                  </View>

                  {/* Rates Boxes */}
                  <View style={styles.ratesRow}>
                    <View style={styles.rateBox}>
                      <Text style={styles.rateLabel}>DAILY RATE</Text>
                      <Text style={styles.rateValue}>
                        ₦{vehicle.dailyRate.toLocaleString('en-NG')}
                      </Text>
                    </View>

                    <View style={styles.rateBox}>
                      <Text style={styles.rateLabel}>WEEKLY RATE</Text>
                      <Text style={styles.rateValue}>
                        ₦{vehicle.weeklyRate.toLocaleString('en-NG')}
                      </Text>
                    </View>
                  </View>

                  {/* Action Button: BOOK NOW -> Goes to setup page directly */}
                  {isAvailable ? (
                    <TouchableOpacity
                      style={styles.bookNowBtn}
                      onPress={() => handleBookNow(vehicle)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.bookNowBtnText}>BOOK NOW</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.viewScheduleBtn}
                      onPress={() => setSelectedVehicleForSchedule(vehicle)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.viewScheduleBtnText}>VIEW SCHEDULE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}

          {/* Need a Custom Logistics Plan? Card */}
          <View style={styles.customPlanCard}>
            <View style={styles.customPlanAccentBorder} />
            <View style={styles.customPlanContent}>
              <Text style={styles.customPlanTitle}>Need a custom logistics plan?</Text>
              <Text style={styles.customPlanSub}>
                Our enterprise solutions offer volume discounts for long-term rentals.
              </Text>
              <TouchableOpacity
                style={styles.contactSalesBtn}
                onPress={() => setContactSalesModalVisible(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.contactSalesBtnText}>CONTACT SALES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* VIEW SCHEDULE MODAL (For None Available Vehicles) */}
      <Modal
        transparent
        animationType="fade"
        visible={selectedVehicleForSchedule !== null}
        onRequestClose={() => setSelectedVehicleForSchedule(null)}
      >
        <View style={styles.centerModalBackdrop}>
          <View style={styles.scheduleModalCard}>
            <View style={styles.scheduleHeaderRow}>
              <Text style={styles.scheduleModalTitle}>Availability Schedule</Text>
              <TouchableOpacity onPress={() => setSelectedVehicleForSchedule(null)}>
                <Ionicons name="close" size={22} color="#7F7774" />
              </TouchableOpacity>
            </View>

            <Text style={styles.scheduleVehicleName}>{selectedVehicleForSchedule?.name}</Text>
            <Text style={styles.scheduleStatusNotice}>
              Currently fully booked by Swift Haulage corporate accounts. Next available opening:
            </Text>

            <View style={styles.nextDateBox}>
              <Ionicons name="calendar-outline" size={20} color="#B8521B" style={{ marginRight: 8 }} />
              <Text style={styles.nextDateText}>Available from Oct 28, 2026</Text>
            </View>

            <TouchableOpacity
              style={styles.preBookBtn}
              onPress={() => {
                setSelectedVehicleForSchedule(null);
                Alert.alert('Pre-Booked', 'You have been added to the priority waitlist for this vehicle.');
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.preBookBtnText}>Join Waitlist for Next Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* CONTACT SALES ENTERPRISE MODAL */}
      <Modal
        transparent
        animationType="slide"
        visible={contactSalesModalVisible}
        onRequestClose={() => setContactSalesModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.bookingModalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contact Enterprise Sales</Text>
              <TouchableOpacity onPress={() => setContactSalesModalVisible(false)}>
                <Ionicons name="close" size={24} color="#7F7774" />
              </TouchableOpacity>
            </View>

            <Text style={styles.salesSub}>
              Get custom volume discounts, dedicated logistics managers, and multi-month fleet lease terms.
            </Text>

            <Text style={styles.label}>YOUR NAME</Text>
            <View style={styles.salesInputWrap}>
              <TextInput
                style={styles.salesInput}
                placeholder="Full Name"
                placeholderTextColor="#A09895"
                value={salesName}
                onChangeText={setSalesName}
              />
            </View>

            <Text style={[styles.label, { marginTop: 12 }]}>PHONE NUMBER</Text>
            <View style={styles.salesInputWrap}>
              <TextInput
                style={styles.salesInput}
                placeholder="+234 000 000 0000"
                placeholderTextColor="#A09895"
                value={salesPhone}
                onChangeText={setSalesPhone}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              style={styles.submitSalesBtn}
              onPress={handleSubmitSales}
              activeOpacity={0.85}
            >
              <Text style={styles.submitSalesBtnText}>Request Enterprise Quote</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 22,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1D1614',
  },
  filterPillsRow: {
    gap: 10,
    marginBottom: 20,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  filterPillSelected: {
    backgroundColor: '#F07D3B',
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3E3735',
  },
  filterPillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  vehicleList: {
    gap: 20,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  vehicleImageWrap: {
    height: 200,
    width: '100%',
    position: 'relative',
    backgroundColor: '#F5EFEB',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  availableBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#DCFCE7',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  availableBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
    letterSpacing: 0.6,
  },
  noneAvailableBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#FEE2E2',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  noneAvailableBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#991B1B',
    letterSpacing: 0.6,
  },
  cardBody: {
    padding: 20,
  },
  titleRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  vehicleName: {
    flex: 1,
    fontSize: 19,
    fontWeight: '800',
    color: '#1D1614',
    paddingRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D1614',
  },
  categoryTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7F7774',
  },
  ratesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  rateBox: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    padding: 14,
  },
  rateLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B8521B',
  },
  bookNowBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bookNowBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  viewScheduleBtn: {
    height: 52,
    backgroundColor: '#F5EFEB',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewScheduleBtnText: {
    color: '#8A7C75',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  customPlanCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: 10,
  },
  customPlanAccentBorder: {
    width: 6,
    backgroundColor: '#B8521B',
  },
  customPlanContent: {
    flex: 1,
    padding: 20,
  },
  customPlanTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 6,
  },
  customPlanSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 18,
    marginBottom: 16,
  },
  contactSalesBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFEAE7',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  contactSalesBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#994514',
    letterSpacing: 0.6,
  },

  /* MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bookingModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 8,
  },

  /* SCHEDULE MODAL STYLES */
  scheduleModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scheduleModalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1D1614',
  },
  scheduleVehicleName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F07D3B',
    marginBottom: 8,
  },
  scheduleStatusNotice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 18,
    marginBottom: 16,
  },
  nextDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  nextDateText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B8521B',
  },
  preBookBtn: {
    height: 50,
    backgroundColor: '#F07D3B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preBookBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  /* CONTACT SALES MODAL STYLES */
  salesSub: {
    fontSize: 13,
    color: '#6E6663',
    lineHeight: 18,
    marginBottom: 16,
  },
  salesInputWrap: {
    backgroundColor: '#EFEAE7',
    borderRadius: 18,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  salesInput: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D1614',
  },
  submitSalesBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitSalesBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
