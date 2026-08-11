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
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HireDashboardScreen() {
  const router = useRouter();

  const [contactDriverModalVisible, setContactDriverModalVisible] = useState(false);
  const [vendorInfoModalVisible, setVendorInfoModalVisible] = useState(false);

  const handleFinishAndRate = () => {
    router.push('/hire-vehicle/rating' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vehicle Hire</Text>
        <TouchableOpacity style={styles.searchHeaderIcon} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Status Header */}
        <Text style={styles.statusLabel}>CURRENT STATUS</Text>
        <View style={styles.statusRow}>
          <View style={styles.orangeDot} />
          <Text style={styles.statusTitle}>In Use</Text>
        </View>

        {/* Showcase Card */}
        <View style={styles.showcaseCard}>
          <View style={styles.showcaseHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.vehicleName}>Toyota Hilux 2023</Text>
              <Text style={styles.regNumber}>ABC-123-XY</Text>
            </View>
            <View style={styles.truckIconCircle}>
              <MaterialCommunityIcons name="truck" size={24} color="#B8521B" />
            </View>
          </View>

          <View style={styles.vehicleImageWrap}>
            <Image
              source={require('../../../assets/map.png')}
              style={styles.vehicleImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Hire Period Card */}
        <View style={styles.periodCard}>
          <View style={styles.periodHeaderRow}>
            <Text style={styles.periodLabel}>HIRE PERIOD</Text>
            <Text style={styles.periodDayCount}>Day 2 of 3</Text>
          </View>

          {/* Progress Bar with Thumb Dot */}
          <View style={styles.sliderTrackBg}>
            <View style={styles.sliderTrackFill}>
              <View style={styles.sliderThumbDot} />
            </View>
          </View>

          <View style={styles.datesRow}>
            <View>
              <Text style={styles.dateLabel}>START</Text>
              <Text style={styles.dateVal}>Oct 24</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.dateLabel}>END</Text>
              <Text style={styles.dateVal}>Oct 27</Text>
            </View>
          </View>
        </View>

        {/* Assigned Driver Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverAvatarWrap}>
            <Image
              source={require('../../../assets/map.png')}
              style={styles.driverAvatar}
              resizeMode="cover"
            />
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={11} color="#F59E0B" style={{ marginRight: 2 }} />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>

          <View style={styles.driverTextGroup}>
            <Text style={styles.assignedLabel}>ASSIGNED DRIVER</Text>
            <Text style={styles.driverName}>Samuel Okon</Text>
            <Text style={styles.driverSub}>Verified Class-A Pilot</Text>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.contactDriverBtn}
            onPress={() => setContactDriverModalVisible(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.contactDriverBtnText}>Contact Driver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.vendorInfoBtn}
            onPress={() => setVendorInfoModalVisible(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="briefcase-outline" size={18} color="#994514" style={{ marginRight: 6 }} />
            <Text style={styles.vendorInfoBtnText}>Vendor Info</Text>
          </TouchableOpacity>
        </View>

        {/* Complete Ride & Rate Driver Link Button */}
        <TouchableOpacity
          style={styles.completeRideBtn}
          onPress={handleFinishAndRate}
          activeOpacity={0.85}
        >
          <Text style={styles.completeRideBtnText}>Complete Ride &amp; Rate Driver</Text>
          <Ionicons name="star-outline" size={18} color="#F07D3B" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </ScrollView>

      {/* CONTACT DRIVER MODAL */}
      <Modal
        transparent
        animationType="slide"
        visible={contactDriverModalVisible}
        onRequestClose={() => setContactDriverModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Contact Driver</Text>
              <TouchableOpacity onPress={() => setContactDriverModalVisible(false)}>
                <Ionicons name="close" size={24} color="#7F7774" />
              </TouchableOpacity>
            </View>

            <View style={styles.driverModalRow}>
              <Image source={require('../../../assets/map.png')} style={styles.driverModalAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.driverModalName}>Samuel Okon</Text>
                <Text style={styles.driverModalPhone}>+234 803 123 4567</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.callDriverBtn}
              onPress={() => {
                setContactDriverModalVisible(false);
                Alert.alert('Calling Driver', 'Initiating voice call to Samuel Okon...');
              }}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.callDriverBtnText}>Call Samuel Okon</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* VENDOR INFO MODAL */}
      <Modal
        transparent
        animationType="slide"
        visible={vendorInfoModalVisible}
        onRequestClose={() => setVendorInfoModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Vendor Information</Text>
              <TouchableOpacity onPress={() => setVendorInfoModalVisible(false)}>
                <Ionicons name="close" size={24} color="#7F7774" />
              </TouchableOpacity>
            </View>

            <View style={styles.vendorDetailBox}>
              <Text style={styles.vendorLabel}>COMPANY NAME</Text>
              <Text style={styles.vendorVal}>Titan Logistics Enterprise</Text>

              <Text style={[styles.vendorLabel, { marginTop: 12 }]}>FLEET CONTRACT</Text>
              <Text style={styles.vendorVal}>Contract Ref: #TL-2026-88</Text>

              <Text style={[styles.vendorLabel, { marginTop: 12 }]}>24/7 HELPLINE</Text>
              <Text style={styles.vendorVal}>+234 (0) 700 848 2661</Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
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
  statusLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orangeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F07D3B',
    marginRight: 8,
  },
  statusTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1D1614',
  },
  showcaseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  showcaseHeaderRow: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1D1614',
  },
  regNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F7774',
    marginTop: 2,
  },
  truckIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFF0EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleImageWrap: {
    height: 180,
    width: '100%',
    backgroundColor: '#F5EFEB',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  periodCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  periodHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  periodLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  periodDayCount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B8521B',
  },
  sliderTrackBg: {
    height: 6,
    backgroundColor: '#FFEADF',
    borderRadius: 3,
    position: 'relative',
    marginBottom: 16,
  },
  sliderTrackFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#F07D3B',
    borderRadius: 3,
    position: 'relative',
  },
  sliderThumbDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F07D3B',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    right: -7,
    top: -4,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
  },
  dateVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1D1614',
    marginTop: 2,
  },
  driverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  driverAvatarWrap: {
    position: 'relative',
    marginRight: 16,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EC',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1D1614',
  },
  driverTextGroup: {
    flex: 1,
  },
  assignedLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  driverSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  contactDriverBtn: {
    flex: 1,
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  contactDriverBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  vendorInfoBtn: {
    flex: 1,
    height: 52,
    backgroundColor: '#F5EFEB',
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorInfoBtnText: {
    color: '#994514',
    fontSize: 15,
    fontWeight: '800',
  },
  completeRideBtn: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#F07D3B',
    backgroundColor: '#FFF5F2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeRideBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F07D3B',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
  },
  driverModalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverModalAvatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    marginRight: 14,
  },
  driverModalName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D1614',
  },
  driverModalPhone: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F07D3B',
    marginTop: 2,
  },
  callDriverBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callDriverBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  vendorDetailBox: {
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 18,
  },
  vendorLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  vendorVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginTop: 4,
  },
});
