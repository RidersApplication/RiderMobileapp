import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function PassengerCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['0', '0', '0', '0']);
  const [activeInputIndex, setActiveInputIndex] = useState<number | null>(null);

  const handleDigitChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = digit || '0';
    setCode(newCode);

    // Auto advance focus
    if (digit && index < 3) {
      setActiveInputIndex(index + 1);
    }
  };

  const handleStartTrip = () => {
    router.push('/driver/driving' as any);
  };

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
        keyboardShouldPersistTaps="handled"
      >
        {/* STEP BADGE */}
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>STEP 2 OF 2</Text>
        </View>

        {/* HEADLINE */}
        <Text style={styles.headline}>Enter passenger code to start trip</Text>
        <Text style={styles.subHeadline}>
          Confirm your identity with the client before initiating the logistics protocol.
        </Text>

        {/* CODE ENTRY CARD */}
        <View style={styles.codeCard}>
          <View style={styles.codeRow}>
            {code.map((digit, idx) => (
              <TextInput
                key={idx}
                style={[
                  styles.codeBoxInput,
                  activeInputIndex === idx && styles.codeBoxInputActive,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleDigitChange(text, idx)}
                onFocus={() => setActiveInputIndex(idx)}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* START TRIP BUTTON */}
          <TouchableOpacity
            style={styles.startTripBtn}
            onPress={handleStartTrip}
            activeOpacity={0.88}
          >
            <Text style={styles.startTripText}>START TRIP</Text>
          </TouchableOpacity>

          {/* INFO CAPTION */}
          <View style={styles.infoNoteRow}>
            <Ionicons name="information-circle-outline" size={16} color="#7F7774" style={{ marginRight: 6 }} />
            <Text style={styles.infoNoteText}>
              The code was sent to the passenger's registered device.
            </Text>
          </View>
        </View>

        {/* PASSENGER CARD */}
        <View style={styles.detailCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-outline" size={22} color="#8C531B" />
          </View>
          <View style={styles.detailTextGroup}>
            <Text style={styles.detailLabel}>PASSENGER</Text>
            <Text style={styles.detailValue}>Oge Tola</Text>
          </View>
        </View>

        {/* DESTINATION CARD */}
        <View style={styles.detailCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="location-outline" size={22} color="#8C531B" />
          </View>
          <View style={styles.detailTextGroup}>
            <Text style={styles.detailLabel}>DESTINATION</Text>
            <Text style={styles.detailValue}>Global Port Terminal</Text>
          </View>
        </View>
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
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEADF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 16,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B8521B',
    letterSpacing: 0.5,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 34,
  },
  subHeadline: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 28,
  },
  codeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  codeBoxInput: {
    width: 64,
    height: 72,
    backgroundColor: '#F3ECE9',
    borderRadius: 16,
    fontSize: 32,
    fontWeight: '800',
    color: '#524945',
    textAlign: 'center',
  },
  codeBoxInputActive: {
    backgroundColor: '#FFEADF',
    borderWidth: 2,
    borderColor: '#F07D3B',
  },
  startTripBtn: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  startTripText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  infoNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoNoteText: {
    fontSize: 12,
    color: '#7F7774',
    flex: 1,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  detailTextGroup: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
  },
});
