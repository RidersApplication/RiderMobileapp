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
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomTab from '../components/bottom-tab';
import { useUser } from '../context/user-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(false);
    router.replace('/home');
  };

  const handleSavedLocations = () => {
    Alert.alert(
      'Saved Locations',
      'Manage your home, work, and favorite pickup locations.'
    );
  };

  const handleHelpSupport = () => {
    Alert.alert(
      'Help & Support',
      'Our 24/7 customer support team is available to assist you.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Profile Avatar & Header Info */}
        <View style={styles.profileHeader}>
          <Image source={user.avatar} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.tripsCard}>
            <Text style={styles.tripsNumber}>{user.tripsTaken}</Text>
            <Text style={styles.tripsLabel}>TRIPS TAKEN</Text>
          </View>

          <View style={styles.ratingCard}>
            <Text style={styles.ratingNumber}>{user.rating}</Text>
            <Text style={styles.ratingLabel}>USER RATING</Text>
          </View>
        </View>

        {/* Menu Options List */}
        <View style={styles.menuContainer}>
          {/* Edit Profile */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => router.push('/edit-profile' as any)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="person-outline" size={20} color="#4A423F" />
              </View>
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4BCB9" />
          </TouchableOpacity>

          {/* Saved Locations */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => router.push('/saved-locations' as any)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="bookmark-outline" size={20} color="#4A423F" />
              </View>
              <Text style={styles.menuText}>Saved Locations</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4BCB9" />
          </TouchableOpacity>

          {/* Payment Methods */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => router.push('/payment-methods' as any)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="wallet-outline" size={20} color="#4A423F" />
              </View>
              <Text style={styles.menuText}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4BCB9" />
          </TouchableOpacity>

          {/* Ride History */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => router.push('/ride-history' as any)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="car-outline" size={20} color="#4A423F" />
              </View>
              <Text style={styles.menuText}>Ride History</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4BCB9" />
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => router.push('/help-support' as any)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="help-circle-outline" size={20} color="#4A423F" />
              </View>
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4BCB9" />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            activeOpacity={0.75}
            onPress={() => setLogoutModalVisible(true)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.logoutIconBox}>
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              </View>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.logoutModalIconBox}>
              <Ionicons name="log-out" size={28} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Log out of account?</Text>
            <Text style={styles.modalCopy}>
              Are you sure you want to log out? You will need to sign in again to book rides.
            </Text>
            <Pressable onPress={handleLogout} style={styles.confirmLogout}>
              <Text style={styles.confirmLogoutText}>Yes, Log Out</Text>
            </Pressable>
            <Pressable onPress={() => setLogoutModalVisible(false)} style={styles.cancelLogout}>
              <Text style={styles.cancelLogoutText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <BottomTab activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF9',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 26,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8D5C8',
    marginBottom: 14,
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6E6663',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6E6663',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  tripsCard: {
    flex: 1,
    backgroundColor: '#FFF0EC',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  tripsNumber: {
    fontSize: 30,
    fontWeight: '800',
    color: '#F07D3B',
  },
  tripsLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
    marginTop: 6,
  },
  ratingCard: {
    flex: 1,
    backgroundColor: '#F07D3B',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  ratingNumber: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  ratingLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
    marginTop: 6,
    opacity: 0.95,
  },
  menuContainer: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    height: 64,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F7EFEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1614',
  },
  logoutItem: {
    backgroundColor: '#FFF5F5',
    marginTop: 8,
  },
  logoutIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
  },
  logoutModalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    color: '#1D1614',
    fontSize: 19,
    fontWeight: '800',
  },
  modalCopy: {
    color: '#6E6663',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 22,
  },
  confirmLogout: {
    width: '100%',
    borderRadius: 22,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmLogoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  cancelLogout: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  cancelLogoutText: {
    color: '#6E6663',
    fontSize: 14,
    fontWeight: '700',
  },
});