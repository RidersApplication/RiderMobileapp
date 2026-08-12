import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import BottomTab from '../components/bottom-tab';

export default function VerifyRider() {
  const router = useRouter();
  const [code, setCode] = useState(['5', '2', '9', '8']);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const fullCode = code.join('');
    setCopied(true);
    Alert.alert(
      'Code Copied',
      `Verification code ${fullCode} has been copied to your clipboard. Share it with your driver.`
    );
    setTimeout(() => setCopied(false), 3000);
  };

  const handleRegenerateCode = () => {
    const newCode = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10).toString()
    );
    setCode(newCode);
    Alert.alert('New Code Generated', `Your new verification code is ${newCode.join('')}`);
  };

  const handleCompleteRide = () => {
    router.push('/rate-driver' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Screen Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Trip</Text>
      </View>

      <View style={styles.container}>
        {/* Title and Instruction */}
        <View style={styles.titleSection}>
          <Text style={styles.instructionText}>
            Share this code with your driver to start
          </Text>
          <View style={styles.underlineContainer}>
            <Text style={styles.instructionTextBold}>the trip</Text>
            <View style={styles.orangeUnderline} />
          </View>
        </View>

        {/* 4-Digit Code Display */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <View key={index} style={styles.codeBox}>
              <Text style={styles.codeDigit}>{digit}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.copyButton, copied && styles.copyButtonActive]}
            onPress={handleCopyCode}
            activeOpacity={0.85}
          >
            <Ionicons name="copy-outline" size={20} color="#FFFFFF" style={styles.copyIcon} />
            <Text style={styles.copyButtonText}>
              {copied ? 'Code Copied!' : 'Copy Code'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.regenerateButton}
            onPress={handleRegenerateCode}
            activeOpacity={0.7}
          >
            <Ionicons name="reload-outline" size={18} color="#994514" style={styles.reloadIcon} />
            <Text style={styles.regenerateText}>Regenerate Code</Text>
          </TouchableOpacity>
        </View>

        {/* Driver Pickup Info Card */}
        <TouchableOpacity
          style={styles.pickupCard}
          onPress={handleCompleteRide}
          activeOpacity={0.8}
          accessibilityLabel="View driver profile and rate driver"
        >
          <View style={styles.shieldIconContainer}>
            <Ionicons name="shield-checkmark" size={24} color="#B8521B" />
          </View>
          <View style={styles.pickupTextColumn}>
            <Text style={styles.pickupTitle}>Waiting for Pickup</Text>
            <Text style={styles.pickupSubtext}>
              Your driver, Michael, is arriving in a White Tesla Model 3 (ABC-1234). Tap to view profile or rate.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Map Overlay with Safety Tip */}
      <View style={styles.bottomMapSection}>
        <Image
          source={require('../../assets/downmap.png')}
          style={styles.mapBackground}
          resizeMode="cover"
        />
        <View style={styles.safetyCard}>
          <Ionicons name="information-circle-outline" size={20} color="#59514E" style={styles.infoIcon} />
          <Text style={styles.safetyText}>
            For your safety, only share this code when you have identified your driver and vehicle.
          </Text>
        </View>
      </View>

      <BottomTab />
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
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF9',
  },
  backButton: {
    padding: 6,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    zIndex: 2,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  instructionText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#4A423F',
    textAlign: 'center',
    lineHeight: 26,
  },
  underlineContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  instructionTextBold: {
    fontSize: 19,
    fontWeight: '600',
    color: '#4A423F',
    textAlign: 'center',
  },
  orangeUnderline: {
    width: 68,
    height: 4,
    backgroundColor: '#F07D3B',
    borderRadius: 2,
    marginTop: 6,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 28,
  },
  codeBox: {
    width: 68,
    height: 84,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  codeDigit: {
    fontSize: 42,
    fontWeight: '800',
    color: '#26201E',
  },
  actionsContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  copyButton: {
    width: '100%',
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
  copyButtonActive: {
    backgroundColor: '#E06B29',
  },
  copyIcon: {
    marginRight: 8,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  reloadIcon: {
    marginRight: 6,
  },
  regenerateText: {
    color: '#994514',
    fontSize: 16,
    fontWeight: '700',
  },
  pickupCard: {
    backgroundColor: '#FFF0EC',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FDE0D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  pickupTextColumn: {
    flex: 1,
  },
  pickupTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2C2421',
    marginBottom: 4,
  },
  pickupSubtext: {
    fontSize: 13,
    color: '#6E6663',
    lineHeight: 18,
    fontWeight: '500',
  },
  bottomMapSection: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
    marginTop: 10,
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  safetyCard: {
    marginHorizontal: 20,
    marginBottom: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoIcon: {
    marginRight: 10,
  },
  safetyText: {
    fontSize: 12,
    color: '#59514E',
    flex: 1,
    lineHeight: 16,
    fontWeight: '500',
  },
});
