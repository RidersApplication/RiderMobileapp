import React from 'react';
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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function UpgradePlanScreen() {
  const router = useRouter();

  const handleRegisterBusiness = () => {
    router.push('/hire-vehicle/register' as any);
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
        <Text style={styles.headerTitle}>Upgrade Plan</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Upgrade Hero Image Card */}
        <View style={styles.heroCard}>
          <Image
            source={require('../../../assets/map.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.businessOnlyBadge}>
              <Text style={styles.businessOnlyText}>BUSINESS ONLY</Text>
            </View>
            <Text style={styles.heroTitle}>Upgrade to Pro</Text>
          </View>
        </View>

        {/* Subtitle Statement */}
        <Text style={styles.statementText}>
          Vehicle hiring is available only for businesses and organizations.
        </Text>

        {/* Feature Benefit Card 1 */}
        <View style={styles.featureCard}>
          <View style={styles.featureIconBox}>
            <MaterialCommunityIcons name="truck-outline" size={24} color="#B8521B" />
          </View>
          <View style={styles.featureTextGroup}>
            <Text style={styles.featureTitle}>Access to fleet vehicles</Text>
            <Text style={styles.featureSub}>
              Unlock our full inventory of vans, trucks, and specialized mobility solutions.
            </Text>
          </View>
        </View>

        {/* Feature Benefit Card 2 */}
        <View style={styles.featureCard}>
          <View style={[styles.featureIconBox, { backgroundColor: '#CFFAFE' }]}>
            <Ionicons name="card-outline" size={22} color="#0D9488" />
          </View>
          <View style={styles.featureTextGroup}>
            <Text style={styles.featureTitle}>Corporate pricing</Text>
            <Text style={styles.featureSub}>
              Exclusive business rates and tax-deductible invoicing for every journey.
            </Text>
          </View>
        </View>

        {/* Feature Benefit Card 3 */}
        <View style={styles.featureCard}>
          <View style={[styles.featureIconBox, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="git-network-outline" size={22} color="#EF4444" />
          </View>
          <View style={styles.featureTextGroup}>
            <Text style={styles.featureTitle}>Bulk logistics support</Text>
            <Text style={styles.featureSub}>
              Priority coordination for high-volume shipments and recurring fleet needs.
            </Text>
          </View>
        </View>

        {/* Trusted Enterprises Badge */}
        <View style={styles.trustedBadge}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#7F7774" style={{ marginRight: 6 }} />
          <Text style={styles.trustedBadgeText}>TRUSTED BY 5,000+ ENTERPRISES</Text>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegisterBusiness}
          activeOpacity={0.85}
        >
          <Text style={styles.registerButtonText}>Register Your Business</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Cancel and Return Link */}
        <TouchableOpacity
          style={styles.cancelLink}
          onPress={() => router.replace('/home' as any)}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelLinkText}>Cancel and return</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  heroCard: {
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  businessOnlyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F07D3B',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  businessOnlyText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statementText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3E3735',
    lineHeight: 22,
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureTextGroup: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 3,
  },
  featureSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 17,
  },
  trustedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  trustedBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.8,
  },
  registerButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  cancelLink: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelLinkText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6E6663',
  },
});
