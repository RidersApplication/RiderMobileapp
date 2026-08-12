import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

const { width } = Dimensions.get('window');

export default function DriverOnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP HERO IMAGE CONTAINER */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../../assets/driver_avatar.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* BACK BUTTON */}
          <SafeAreaView style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push('/' as any)}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={22} color="#1F2937" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* BOTTOM SHEET / CONTENT CARD */}
        <View style={styles.bottomCard}>
          <Text style={styles.mainTitle}>Drive & Earn with Riders</Text>
          <Text style={styles.subtitle}>
            Join thousands of partners making money on their own terms.
          </Text>

          {/* FEATURE 1 */}
          <View style={styles.featureRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar-outline" size={22} color="#F07D3B" />
            </View>
            <View style={styles.featureTextGroup}>
              <Text style={styles.featureTitle}>Flex Schedule</Text>
              <Text style={styles.featureSub}>Work whenever you want.</Text>
            </View>
          </View>

          {/* FEATURE 2 */}
          <View style={styles.featureRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="wallet-outline" size={22} color="#F07D3B" />
            </View>
            <View style={styles.featureTextGroup}>
              <Text style={styles.featureTitle}>Daily Payouts</Text>
              <Text style={styles.featureSub}>Access your earnings instantly.</Text>
            </View>
          </View>

          {/* FEATURE 3 */}
          <View style={styles.featureRow}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="truck-outline" size={22} color="#F07D3B" />
            </View>
            <View style={styles.featureTextGroup}>
              <Text style={styles.featureTitle}>Ride & Cargo</Text>
              <Text style={styles.featureSub}>Double your earning potential.</Text>
            </View>
          </View>

          {/* GET STARTED ACTION BUTTON */}
          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={() => router.push('/driver/register' as any)}
            activeOpacity={0.88}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          {/* TERMS CAPTION */}
          <Text style={styles.termsText}>
            By continuing, you agree to our terms and conditions
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
    backgroundColor: '#1F2937',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  bottomCard: {
    marginTop: -32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 28,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextGroup: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 3,
  },
  featureSub: {
    fontSize: 13,
    color: '#7F7774',
  },
  getStartedBtn: {
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
    elevation: 5,
  },
  getStartedText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  termsText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
