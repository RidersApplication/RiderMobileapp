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
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../context/user-context';

export default function AddLocationScreen() {
  const router = useRouter();
  const { addSavedLocation } = useUser();

  const [deliveryAddress, setDeliveryAddress] = useState('Area 11, P.M.B 183, Garki');
  const [labelAs, setLabelAs] = useState('');
  const [category, setCategory] = useState<'Home' | 'Work' | 'Others'>('Home');
  const [instructions, setInstructions] = useState('');

  const handleSaveLocation = () => {
    if (!deliveryAddress.trim()) {
      Alert.alert('Validation Error', 'Please enter a delivery address.');
      return;
    }

    const title = labelAs.trim() || (category === 'Home' ? 'Home' : category === 'Work' ? 'Workplace' : 'Saved Location');
    const iconName =
      category === 'Home'
        ? 'home-outline'
        : category === 'Work'
        ? 'briefcase-outline'
        : 'location-outline';

    addSavedLocation({
      title,
      address: deliveryAddress.trim(),
      category,
      iconName,
    });

    Alert.alert('Location Saved', `"${title}" has been saved to your locations.`, [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
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
        <Text style={styles.headerTitle}>Saved Locations</Text>
        <TouchableOpacity style={styles.searchHeaderIcon} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color="#8A7C75" />
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
          {/* Top Map Section with Route Overlay */}
          <View style={styles.mapArea}>
            <Image
              source={require('../../assets/map.png')}
              style={styles.mapImage}
              resizeMode="cover"
            />

            {/* Arrive Badge */}
            <View style={styles.arriveBadge}>
              <Text style={styles.arriveText}>Arrive by 20:23</Text>
            </View>

            {/* 26 min Badge */}
            <View style={styles.timeBadge}>
              <Text style={styles.timeNumber}>26</Text>
              <Text style={styles.timeUnit}>min</Text>
            </View>
          </View>

          {/* Form Card Overlay */}
          <View style={styles.formCard}>
            {/* Delivery Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.labelTitle}>DELIVERY ADDRESS</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="map-outline" size={22} color="#7F7774" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={deliveryAddress}
                  onChangeText={setDeliveryAddress}
                  placeholder="Enter delivery address"
                  placeholderTextColor="#A09895"
                />
              </View>
            </View>

            {/* Label As */}
            <View style={styles.inputGroup}>
              <Text style={styles.labelTitle}>LABEL AS</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  value={labelAs}
                  onChangeText={setLabelAs}
                  placeholder="e.g. Grandma's House"
                  placeholderTextColor="#C4BCB9"
                />
              </View>

              {/* Category Pills */}
              <View style={styles.pillsRow}>
                <TouchableOpacity
                  style={[styles.pill, category === 'Home' && styles.pillHomeActive]}
                  onPress={() => setCategory('Home')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="home"
                    size={16}
                    color={category === 'Home' ? '#FFFFFF' : '#4A423F'}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[styles.pillText, category === 'Home' && styles.pillTextActive]}>
                    Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.pill, category === 'Work' && styles.pillActive]}
                  onPress={() => setCategory('Work')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="briefcase-outline"
                    size={16}
                    color={category === 'Work' ? '#FFFFFF' : '#4A423F'}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[styles.pillText, category === 'Work' && styles.pillTextActive]}>
                    Work
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.pill, category === 'Others' && styles.pillActive]}
                  onPress={() => setCategory('Others')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={16}
                    color={category === 'Others' ? '#FFFFFF' : '#4A423F'}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[styles.pillText, category === 'Others' && styles.pillTextActive]}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Delivery Instructions */}
            <View style={styles.inputGroup}>
              <Text style={styles.labelTitle}>DELIVERY INSTRUCTIONS</Text>
              <TextInput
                style={styles.multilineInput}
                multiline
                numberOfLines={3}
                value={instructions}
                onChangeText={setInstructions}
                placeholder="Yellow gate, near the library, etc."
                placeholderTextColor="#C4BCB9"
                textAlignVertical="top"
              />
            </View>

            {/* Save Location Primary Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveLocation}
              activeOpacity={0.85}
            >
              <Text style={styles.saveButtonText}>Save Location</Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            {/* Disclaimer Footer Text */}
            <Text style={styles.disclaimerText}>
              By saving this location, you agree to our terms for precise routing and Riders movement updates.
            </Text>
          </View>
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
    color: '#1D1614',
  },
  searchHeaderIcon: {
    padding: 6,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mapArea: {
    height: 220,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  arriveBadge: {
    position: 'absolute',
    top: 40,
    left: 60,
    backgroundColor: '#4F46E5',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  arriveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  timeBadge: {
    position: 'absolute',
    top: 90,
    right: 80,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  timeNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 15,
  },
  timeUnit: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  formCard: {
    marginTop: -20,
    backgroundColor: '#FFFBF9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 58,
    paddingHorizontal: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1614',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  pill: {
    flex: 1,
    height: 48,
    backgroundColor: '#EFEAE7',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillHomeActive: {
    backgroundColor: '#F07D3B',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pillActive: {
    backgroundColor: '#F07D3B',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A423F',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  multilineInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    minHeight: 110,
    fontSize: 15,
    fontWeight: '500',
    color: '#1D1614',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  saveButton: {
    height: 56,
    backgroundColor: '#F07D3B',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  disclaimerText: {
    fontSize: 11,
    color: '#7F7774',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
});
