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
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DeliveryDetailsScreen() {
  const router = useRouter();

  const [deliveryType, setDeliveryType] = useState<'door' | 'building'>('door');
  const [pickupLocation, setPickupLocation] = useState('123 Innovation Drive, Tech Hub');
  const [destination, setDestination] = useState('T Building, Wuse 2');
  const [senderPhone, setSenderPhone] = useState('+234 800 000 0000');
  const [receiverPhone, setReceiverPhone] = useState('+234 812 345 6789');
  const [parcelDesc, setParcelDesc] = useState('');
  const [packageValue, setPackageValue] = useState('5000');

  const handleContinue = () => {
    if (!destination.trim()) {
      Alert.alert('Validation Error', 'Please enter a destination.');
      return;
    }
    if (!receiverPhone.trim()) {
      Alert.alert('Validation Error', "Please enter the receiver's phone number.");
      return;
    }

    router.push('/send-package/bidding' as any);
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
        <Text style={styles.headerTitle}>Delivery Details</Text>
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Toggle Tabs */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleTab, deliveryType === 'door' && styles.toggleTabActive]}
              onPress={() => setDeliveryType('door')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleTabText,
                  deliveryType === 'door' && styles.toggleTabTextActive,
                ]}
              >
                Send to Door
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleTab, deliveryType === 'building' && styles.toggleTabActive]}
              onPress={() => setDeliveryType('building')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleTabText,
                  deliveryType === 'building' && styles.toggleTabTextActive,
                ]}
              >
                Send to Building
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section 1: Location Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="location" size={20} color="#F07D3B" style={{ marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Location Details</Text>
            </View>

            <View style={styles.cardBox}>
              {/* Pickup Location */}
              <Text style={styles.inputLabel}>PICKUP LOCATION</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="location-outline" size={20} color="#F07D3B" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                  placeholder="Enter pickup location"
                  placeholderTextColor="#A09895"
                />
              </View>

              {/* Destination */}
              <Text style={[styles.inputLabel, { marginTop: 14 }]}>DESTINATION</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="search-outline" size={20} color="#7F7774" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={destination}
                  onChangeText={setDestination}
                  placeholder="Where are you going?"
                  placeholderTextColor="#A09895"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.addStopBtn} activeOpacity={0.8}>
              <Ionicons name="add-circle-outline" size={20} color="#F07D3B" style={{ marginRight: 6 }} />
              <Text style={styles.addStopText}>Add Another Stop</Text>
            </TouchableOpacity>
          </View>

          {/* Section 2: Contact Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="person" size={20} color="#F07D3B" style={{ marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Contact Information</Text>
            </View>

            {/* Sender Phone */}
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Sender phone number</Text>
              <TextInput
                style={styles.cardTextInput}
                value={senderPhone}
                onChangeText={setSenderPhone}
                placeholder="+234 000 000 0000"
                placeholderTextColor="#A09895"
                keyboardType="phone-pad"
              />
            </View>

            {/* Receiver Phone */}
            <View style={[styles.inputCard, { marginTop: 12 }]}>
              <Text style={styles.inputLabel}>Receiver phone number</Text>
              <TextInput
                style={styles.cardTextInput}
                value={receiverPhone}
                onChangeText={setReceiverPhone}
                placeholder="+234 000 000 0000"
                placeholderTextColor="#A09895"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Section 3: Package Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <MaterialCommunityIcons name="package-variant" size={22} color="#F07D3B" style={{ marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Package Details</Text>
            </View>

            {/* Parcel Description */}
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Parcel description</Text>
              <TextInput
                style={styles.cardTextInput}
                value={parcelDesc}
                onChangeText={setParcelDesc}
                placeholder="What are you sending? (e.g., Documents, Electronics)"
                placeholderTextColor="#C4BCB9"
              />
            </View>

            {/* Package Value */}
            <View style={[styles.inputCard, { marginTop: 12 }]}>
              <Text style={styles.inputLabel}>Package value</Text>
              <View style={styles.nairaValueRow}>
                <Text style={styles.nairaSymbol}>₦</Text>
                <TextInput
                  style={styles.cardTextInput}
                  value={packageValue}
                  onChangeText={(val) => setPackageValue(val.replace(/[^0-9]/g, ''))}
                  placeholder="0.00"
                  placeholderTextColor="#A09895"
                  keyboardType="number-pad"
                />
              </View>
              <Text style={styles.infoSubtext}>
                <Ionicons name="information-circle-outline" size={13} color="#7F7774" /> Package value must be under ₦50,000
              </Text>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    color: '#F07D3B',
  },
  moreButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFEAE7',
    borderRadius: 24,
    height: 52,
    padding: 4,
    marginBottom: 24,
  },
  toggleTab: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleTabActive: {
    backgroundColor: '#F07D3B',
  },
  toggleTabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6E6663',
  },
  toggleTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  cardBox: {
    backgroundColor: '#FFF5F2',
    borderRadius: 22,
    padding: 18,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1D1614',
  },
  addStopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  addStopText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F07D3B',
  },
  inputCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
  },
  cardTextInput: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1614',
  },
  nairaValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nairaSymbol: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginRight: 6,
  },
  infoSubtext: {
    fontSize: 11,
    color: '#7F7774',
    fontWeight: '500',
    marginTop: 6,
  },
  continueButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
