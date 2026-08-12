import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CategoryItem {
  id: string;
  name: string;
  desc: string;
  image: any;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    desc: 'Ideal for staff transport and city commutes',
    image: require('../../../assets/car1.png'),
  },
  {
    id: 'suv',
    name: 'SUV',
    desc: 'Robust performance for field work and rough terrains',
    image: require('../../../assets/car1.png'),
  },
  {
    id: 'bus',
    name: 'Bus',
    desc: 'High-capacity seating for group transport',
    image: require('../../../assets/car (2).png'),
  },
  {
    id: 'light-truck',
    name: 'Light Truck',
    desc: 'Efficient for small cargo and urban deliveries',
    image: require('../../../assets/car (3).png'),
  },
  {
    id: 'heavy-truck',
    name: 'Heavy Truck',
    desc: 'For large-scale logistics and haulage',
    image: require('../../../assets/car (4).png'),
  },
];

export default function VehicleCategoryScreen() {
  const router = useRouter();
  const [selectedCatId, setSelectedCatId] = useState('light-truck');

  const handleContinue = () => {
    router.push('/hire-vehicle/reason' as any);
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
        <Text style={styles.headerTitle}>Vehicle Category</Text>
        <TouchableOpacity style={styles.searchHeaderIcon} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={styles.subHeading}>Select a vehicle category</Text>

        <View style={styles.categoryList}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                onPress={() => setSelectedCatId(cat.id)}
                activeOpacity={0.85}
              >
                <Image source={cat.image} style={styles.catImage} resizeMode="cover" />

                <View style={styles.catTextGroup}>
                  <Text style={styles.catName}>{cat.name}</Text>
                  <Text style={styles.catDesc}>{cat.desc}</Text>
                </View>

                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#B8521B"
                    style={{ marginLeft: 8 }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
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
  searchHeaderIcon: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6E6663',
    marginBottom: 18,
  },
  categoryList: {
    gap: 14,
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  categoryCardSelected: {
    backgroundColor: '#FFF5F2',
    borderColor: '#F07D3B',
  },
  catImage: {
    width: 80,
    height: 64,
    borderRadius: 16,
    marginRight: 16,
  },
  catTextGroup: {
    flex: 1,
  },
  catName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  catDesc: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    lineHeight: 17,
  },
  continueButton: {
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
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
