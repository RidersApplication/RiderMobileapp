import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function SetupHireScreen() {
  const router = useRouter();

  const [rentalDurationUnit, setRentalDurationUnit] = useState<'days' | 'weeks' | 'months'>('days');
  const [startDate, setStartDate] = useState('Oct 24, 2026');
  const [quantity, setQuantity] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('Lagos Logistics Hub');
  const [driverRequired, setDriverRequired] = useState(true);

  // Pricing calculations
  const dailyRate = 150000; // N150,000 per day
  const baseRate = dailyRate * 3 * quantity; // N450,000 for 3 days
  const surcharge = 24000;
  const estimatedTotal = baseRate + surcharge;

  const handleContinue = () => {
    router.push({
      pathname: '/hire-vehicle/summary',
      params: {
        durationUnit: rentalDurationUnit,
        startDate,
        quantity,
        pickupLocation,
        driverRequired: driverRequired ? 'true' : 'false',
        total: estimatedTotal,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setup Your Hire</Text>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={20} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Card 1: Rental Duration */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Rental Duration</Text>
          <View style={styles.segmentedBg}>
            <TouchableOpacity
              style={[
                styles.segmentPill,
                rentalDurationUnit === 'days' && styles.segmentPillSelected,
              ]}
              onPress={() => setRentalDurationUnit('days')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentText,
                  rentalDurationUnit === 'days' && styles.segmentTextSelected,
                ]}
              >
                Days
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentPill,
                rentalDurationUnit === 'weeks' && styles.segmentPillSelected,
              ]}
              onPress={() => setRentalDurationUnit('weeks')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentText,
                  rentalDurationUnit === 'weeks' && styles.segmentTextSelected,
                ]}
              >
                Weeks
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentPill,
                rentalDurationUnit === 'months' && styles.segmentPillSelected,
              ]}
              onPress={() => setRentalDurationUnit('months')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.segmentText,
                  rentalDurationUnit === 'months' && styles.segmentTextSelected,
                ]}
              >
                Months
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 2: Start Date */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Start Date</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="calendar-outline" size={20} color="#F07D3B" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.textInput}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="e.g. Oct 24, 2026"
              placeholderTextColor="#A09895"
            />
          </View>
        </View>

        {/* Card 3: Vehicle Quantity */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Vehicle Quantity</Text>
          <View style={styles.counterInputWrap}>
            <TouchableOpacity
              style={styles.counterBtnMinus}
              onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
              activeOpacity={0.8}
            >
              <Ionicons name="remove" size={18} color="#B8521B" />
            </TouchableOpacity>

            <Text style={styles.counterValue}>
              {quantity < 10 ? `0${quantity}` : quantity}
            </Text>

            <TouchableOpacity
              style={styles.counterBtnPlus}
              onPress={() => setQuantity((prev) => prev + 1)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 4: Pickup Location */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Pickup Location</Text>
          <View style={styles.inputWrapLight}>
            <Ionicons name="location-outline" size={20} color="#B8521B" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.textInput}
              value={pickupLocation}
              onChangeText={setPickupLocation}
              placeholder="Search logistics hub..."
              placeholderTextColor="#C4BCB9"
            />
          </View>
        </View>

        {/* Card 5: Driver Required */}
        <View style={[styles.card, styles.rowBetween]}>
          <View style={styles.rowLeft}>
            <View style={styles.driverIconBox}>
              <MaterialCommunityIcons name="card-account-details-outline" size={22} color="#B8521B" />
            </View>
            <Text style={styles.driverLabel}>Driver Required</Text>
          </View>

          <Switch
            value={driverRequired}
            onValueChange={setDriverRequired}
            trackColor={{ false: '#EFEAE7', true: '#F07D3B' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Card 6: Booking Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemLabel}>Base Hire Rate (3 Days)</Text>
            <Text style={styles.summaryItemVal}>₦{baseRate.toLocaleString('en-NG')}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemLabel}>Logistics Surcharge</Text>
            <Text style={styles.summaryItemVal}>₦{surcharge.toLocaleString('en-NG')}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemLabel}>Insurance Coverage</Text>
            <Text style={styles.freeText}>Free</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.estimatedTotalLabel}>ESTIMATED TOTAL</Text>
          <View style={styles.totalRow}>
            <Text style={styles.estimatedTotalVal}>
              ₦{estimatedTotal.toLocaleString('en-NG')}
            </Text>
            <Text style={styles.taxIncludedText}>*tax included</Text>
          </View>
        </View>

        {/* Action Button: Continue */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </ScrollView>
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
  menuButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 12,
  },
  segmentedBg: {
    backgroundColor: '#F5EFEB',
    borderRadius: 20,
    padding: 4,
    flexDirection: 'row',
  },
  segmentPill: {
    flex: 1,
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentPillSelected: {
    backgroundColor: '#F07D3B',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E6663',
  },
  segmentTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  inputWrap: {
    backgroundColor: '#F9F6F0',
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapLight: {
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1D1614',
  },
  counterInputWrap: {
    backgroundColor: '#F9F6F0',
    borderRadius: 18,
    height: 54,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterBtnMinus: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1D1614',
  },
  counterBtnPlus: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverIconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFF0EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  driverLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryItemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6663',
  },
  summaryItemVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  freeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0D9488',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEAE7',
    marginVertical: 14,
  },
  estimatedTotalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F07D3B',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  estimatedTotalVal: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1D1614',
  },
  taxIncludedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7F7774',
  },
  continueBtn: {
    height: 56,
    backgroundColor: '#F07D3B',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
