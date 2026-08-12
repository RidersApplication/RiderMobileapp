import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

interface VehicleOption {
  id: string;
  title: string;
  subtitle: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'motorcycle',
    title: 'Motorcycle',
    subtitle: 'For small deliveries',
    iconName: 'motorbike',
  },
  {
    id: 'car',
    title: 'Car',
    subtitle: 'Standard transport',
    iconName: 'car',
  },
  {
    id: 'van',
    title: 'Van',
    subtitle: 'Bulky items',
    iconName: 'van-utility',
  },
  {
    id: 'truck',
    title: 'Truck',
    subtitle: 'Large cargo',
    iconName: 'truck',
  },
];

export default function VehicleCategoryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('car');

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

        <Text style={styles.headerTitle}>Vehicle Category</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADLINE */}
        <Text style={styles.headline}>Choose your ride</Text>
        <Text style={styles.subHeadline}>
          Select the vehicle that matches your transport capabilities today.
        </Text>

        {/* VEHICLES LIST */}
        <View style={styles.optionsList}>
          {VEHICLE_OPTIONS.map((item) => {
            const isSelected = selectedCategory === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setSelectedCategory(item.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
                  <MaterialCommunityIcons
                    name={item.iconName}
                    size={26}
                    color={isSelected ? '#F07D3B' : '#7F7774'}
                  />
                </View>

                <View style={styles.optionTextGroup}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionSub}>{item.subtitle}</Text>
                </View>

                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* NOTICE CARD */}
        <View style={styles.noticeCard}>
          <View style={styles.infoIconCircle}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
          <Text style={styles.noticeText}>
            Your selection affects the routes and rates you will be eligible for. Ensure your
            vehicle matches the actual model you use for operations.
          </Text>
        </View>

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => router.push('/driver/verification' as any)}
          activeOpacity={0.88}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
          <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
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
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
  },
  subHeadline: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 24,
  },
  optionsList: {
    gap: 14,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  optionCardSelected: {
    borderColor: '#F07D3B',
    backgroundColor: '#FFF8F4',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F7F3F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconCircleSelected: {
    backgroundColor: '#FFEADF',
  },
  optionTextGroup: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  optionSub: {
    fontSize: 13,
    color: '#7F7774',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    backgroundColor: '#F07D3B',
    borderColor: '#F07D3B',
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    padding: 16,
    alignItems: 'flex-start',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFE8DE',
  },
  infoIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#B8521B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  infoIconText: {
    color: '#B8521B',
    fontWeight: '800',
    fontSize: 13,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#6E6663',
    lineHeight: 18,
  },
  continueBtn: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
