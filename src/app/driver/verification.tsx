import React, { useState } from 'react';
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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function VerificationScreen() {
  const router = useRouter();

  const [licenseStatus, setLicenseStatus] = useState<'PENDING' | 'UPLOADED'>('PENDING');
  const [regStatus, setRegStatus] = useState<'NOT_STARTED' | 'UPLOADED'>('NOT_STARTED');
  const [insuranceStatus, setInsuranceStatus] = useState<'UPLOADED' | 'NOT_STARTED'>('UPLOADED');

  const handleUploadReg = () => {
    Alert.alert('Upload Document', 'Vehicle Registration document uploaded successfully!');
    setRegStatus('UPLOADED');
  };

  const handleReplaceLicense = () => {
    Alert.alert('Replace File', 'Select new Driver\'s License photo/PDF from device.');
  };

  const handleViewInsurance = () => {
    Alert.alert('View Document', 'Opening policy_v4_final_2024.pdf');
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

        <Text style={styles.headerTitle}>Verification</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADLINE */}
        <Text style={styles.headline}>
          Secure Your <Text style={styles.orangeText}>Compliance Status</Text>
        </Text>
        <Text style={styles.subHeadline}>
          Upload latest documents to maintain active fleet status and route eligibility.
        </Text>

        {/* DOCUMENT CARD 1: DRIVER'S LICENSE */}
        <View style={styles.docCard}>
          <View style={styles.docCardHeader}>
            <View style={styles.docTitleRow}>
              <Ionicons name="ribbon" size={20} color="#8C531B" style={{ marginRight: 8 }} />
              <Text style={styles.docTitle}>Driver's License</Text>
            </View>
            <Ionicons name="card-outline" size={32} color="#F3ECE9" />
          </View>

          <View style={styles.badgePending}>
            <Text style={styles.badgePendingText}>
              {licenseStatus === 'PENDING' ? 'PENDING APPROVAL' : 'APPROVED'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.replaceBtn}
            onPress={handleReplaceLicense}
            activeOpacity={0.8}
          >
            <Feather name="edit-2" size={16} color="#524945" style={{ marginRight: 6 }} />
            <Text style={styles.replaceBtnText}>Replace File</Text>
          </TouchableOpacity>
        </View>

        {/* DOCUMENT CARD 2: VEHICLE REGISTRATION */}
        <View style={styles.docCard}>
          <View style={styles.docCardHeader}>
            <View style={styles.docTitleRow}>
              <Ionicons name="document-text-outline" size={20} color="#1F2937" style={{ marginRight: 8 }} />
              <Text style={styles.docTitle}>Vehicle Registration</Text>
            </View>
            <MaterialCommunityIcons name="truck-outline" size={32} color="#F3ECE9" />
          </View>

          <View style={[styles.badgeNotStarted, regStatus === 'UPLOADED' && styles.badgeUploaded]}>
            <Text style={[styles.badgeNotStartedText, regStatus === 'UPLOADED' && styles.badgeUploadedText]}>
              {regStatus === 'NOT_STARTED' ? 'NOT STARTED' : 'UPLOADED'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={handleUploadReg}
            activeOpacity={0.85}
          >
            <Feather name="upload-cloud" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.uploadBtnText}>
              {regStatus === 'NOT_STARTED' ? 'Upload' : 'Uploaded'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* DOCUMENT CARD 3: INSURANCE DOCUMENT */}
        <View style={[styles.docCard, styles.docCardInsurance]}>
          <View style={styles.insuranceLeftBar} />

          <View style={styles.insuranceBody}>
            <View style={styles.insuranceTopRow}>
              <View style={styles.insuranceIconBox}>
                <Ionicons name="shield-checkmark" size={20} color="#0D9488" />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.docTitle}>Insurance Document</Text>
                <View style={styles.fileRow}>
                  <Ionicons name="attach-outline" size={16} color="#7F7774" style={{ marginRight: 2 }} />
                  <Text style={styles.fileNameText}>policy_v4_final_2024.pdf</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.viewLinkBtn}
                onPress={handleViewInsurance}
                activeOpacity={0.7}
              >
                <Ionicons name="eye-outline" size={18} color="#B8521B" style={{ marginRight: 4 }} />
                <Text style={styles.viewLinkText}>View</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.badgeUploaded}>
              <Text style={styles.badgeUploadedText}>UPLOADED</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM DARK BANNER CARD */}
        <View style={styles.darkBanner}>
          <Text style={styles.bannerTitle}>Ready to proceed?</Text>
          <Text style={styles.bannerSubtitle}>
            Verification typically takes 24–48 business hours.
          </Text>

          <TouchableOpacity
            style={styles.submitDocsBtn}
            onPress={() => router.push('/driver/under-review' as any)}
            activeOpacity={0.88}
          >
            <Text style={styles.submitDocsText}>SUBMIT DOCUMENTS</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER LINKS */}
        <View style={styles.footerLinksRow}>
          <TouchableOpacity
            style={styles.footerLink}
            onPress={() => Alert.alert('Support', 'Connecting to Driver Support Hotline...')}
          >
            <Ionicons name="help-circle-outline" size={16} color="#6E6663" style={{ marginRight: 4 }} />
            <Text style={styles.footerLinkText}>Support</Text>
          </TouchableOpacity>

          <Text style={styles.dotSeparator}>•</Text>

          <TouchableOpacity
            style={styles.footerLink}
            onPress={() => Alert.alert('Privacy Policy', 'Opening Privacy & Data Protection Agreement...')}
          >
            <Ionicons name="shield-outline" size={16} color="#6E6663" style={{ marginRight: 4 }} />
            <Text style={styles.footerLinkText}>Privacy</Text>
          </TouchableOpacity>
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
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
  },
  orangeText: {
    color: '#B8521B',
  },
  subHeadline: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 24,
  },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  docCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
  },
  badgePending: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEADF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 14,
  },
  badgePendingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B8521B',
  },
  badgeNotStarted: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3ECE9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 14,
  },
  badgeNotStartedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
  },
  badgeUploaded: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
  },
  badgeUploadedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
  },
  replaceBtn: {
    height: 44,
    backgroundColor: '#F3ECE9',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  replaceBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#524945',
  },
  uploadBtn: {
    height: 44,
    backgroundColor: '#F07D3B',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  docCardInsurance: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
  },
  insuranceLeftBar: {
    width: 6,
    backgroundColor: '#0D9488',
  },
  insuranceBody: {
    flex: 1,
    padding: 18,
  },
  insuranceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insuranceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  fileNameText: {
    fontSize: 12,
    color: '#7F7774',
  },
  viewLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewLinkText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#B8521B',
  },
  darkBanner: {
    backgroundColor: '#271B14',
    borderRadius: 22,
    padding: 22,
    marginTop: 10,
    marginBottom: 24,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#D1D5DB',
    marginBottom: 20,
  },
  submitDocsBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitDocsText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  footerLinksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  footerLinkText: {
    fontSize: 14,
    color: '#6E6663',
    fontWeight: '600',
  },
  dotSeparator: {
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
});
