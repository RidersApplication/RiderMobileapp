import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function ApplicationUnderReviewScreen() {
  const router = useRouter();

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

        <Text style={styles.headerTitle}>Verification</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CENTER HOURGLASS GRAPHIC */}
        <View style={styles.graphicSection}>
          <View style={styles.hourGlassCard}>
            <Ionicons name="hourglass-outline" size={54} color="#F07D3B" />
            <View style={styles.safetyCheckBadge}>
              <Ionicons name="shield-checkmark" size={14} color="#0D9488" style={{ marginRight: 4 }} />
              <Text style={styles.safetyCheckText}>Safety Check</Text>
            </View>
          </View>
        </View>

        {/* HEADINGS */}
        <Text style={styles.headline}>Your application is under review</Text>
        <Text style={styles.subHeadline}>
          You will be approved within 24–48 hours. We are currently verifying your documents to ensure safety and compliance.
        </Text>

        {/* STATUS CARDS LIST */}
        <View style={styles.statusList}>
          {/* ITEM 1: IDENTITY DOCUMENT */}
          <View style={styles.statusCard}>
            <View style={styles.checkIconCircle}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </View>

            <View style={styles.statusTextGroup}>
              <Text style={styles.statusTitle}>Identity Document</Text>
              <Text style={styles.statusSubVerified}>Verified Successfully</Text>
            </View>
          </View>

          {/* ITEM 2: BACKGROUND CHECK */}
          <View style={styles.statusCard}>
            <View style={styles.pendingIconCircle}>
              <Ionicons name="ellipsis-horizontal" size={18} color="#FFFFFF" />
            </View>

            <View style={styles.statusTextGroup}>
              <Text style={styles.statusTitle}>Background Check</Text>
              <Text style={styles.statusSubPending}>Estimated 12 hours remaining</Text>
            </View>
          </View>
        </View>

        {/* GO TO HOME BUTTON */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.push('/driver/dashboard' as any)}
          activeOpacity={0.88}
        >
          <Text style={styles.homeBtnText}>Go to Home</Text>
          <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* CONTACT SUPPORT LINK */}
        <TouchableOpacity
          style={styles.supportLink}
          onPress={() => Alert.alert('Contact Support', 'Opening Driver Support Chat...')}
          activeOpacity={0.7}
        >
          <Text style={styles.supportLinkText}>Contact support team</Text>
          <Feather name="external-link" size={15} color="#1F2937" style={{ marginLeft: 6 }} />
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
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  graphicSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  hourGlassCard: {
    width: 140,
    height: 140,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  safetyCheckBadge: {
    position: 'absolute',
    bottom: -12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CCECE6',
  },
  safetyCheckText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0D9488',
  },
  headline: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  subHeadline: {
    fontSize: 14,
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  statusList: {
    width: '100%',
    gap: 14,
    marginBottom: 36,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE8DE',
  },
  checkIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#8C531B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  pendingIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  statusTextGroup: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 3,
  },
  statusSubVerified: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6E6663',
  },
  statusSubPending: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6E6663',
  },
  homeBtn: {
    width: '100%',
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  homeBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  supportLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
});
