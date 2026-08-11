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

interface ReasonItem {
  id: string;
  title: string;
  desc: string;
  iconType: 'people' | 'medical' | 'truck' | 'terrain';
}

const REASONS: ReasonItem[] = [
  {
    id: 'staff',
    title: 'Staff Transport',
    desc: 'Reliable daily commute for your employees.',
    iconType: 'people',
  },
  {
    id: 'medical',
    title: 'Medical Delivery',
    desc: 'Specialized handling for sensitive medical supplies.',
    iconType: 'medical',
  },
  {
    id: 'cargo',
    title: 'Logistics / Cargo',
    desc: 'Efficient bulk movement and supply chain solutions.',
    iconType: 'truck',
  },
  {
    id: 'field',
    title: 'Field Operations',
    desc: 'Robust vehicles for remote and off-road worksites.',
    iconType: 'terrain',
  },
];

export default function ReasonForHireScreen() {
  const router = useRouter();
  const [selectedReasonId, setSelectedReasonId] = useState('cargo');

  const handleContinue = () => {
    router.push('/hire-vehicle/catalog' as any);
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
        <Text style={styles.purposeLabel}>PURPOSE</Text>
        <Text style={styles.mainHeading}>Reason for hire</Text>
        <Text style={styles.subHeading}>
          Choose the operational profile that best fits your immediate requirements.
        </Text>

        <View style={styles.reasonList}>
          {REASONS.map((item) => {
            const isSelected = selectedReasonId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.reasonCard, isSelected && styles.reasonCardSelected]}
                onPress={() => setSelectedReasonId(item.id)}
                activeOpacity={0.85}
              >
                <View style={styles.iconCircle}>
                  {item.iconType === 'people' ? (
                    <Ionicons name="people" size={22} color="#B8521B" />
                  ) : item.iconType === 'medical' ? (
                    <Ionicons name="medical" size={22} color="#B8521B" />
                  ) : item.iconType === 'truck' ? (
                    <MaterialCommunityIcons name="truck-outline" size={24} color="#B8521B" />
                  ) : (
                    <Ionicons name="map-outline" size={22} color="#B8521B" />
                  )}
                </View>

                <View style={styles.reasonTextGroup}>
                  <Text style={styles.reasonTitle}>{item.title}</Text>
                  <Text style={styles.reasonDesc}>{item.desc}</Text>
                </View>
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
  purposeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B8521B',
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1D1614',
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 24,
  },
  reasonList: {
    gap: 14,
    marginBottom: 24,
  },
  reasonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
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
  reasonCardSelected: {
    backgroundColor: '#FFF5F2',
    borderColor: '#F07D3B',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reasonTextGroup: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  reasonDesc: {
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
