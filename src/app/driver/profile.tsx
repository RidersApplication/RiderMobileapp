import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import DriverBottomTab from '../../components/driver-bottom-tab';

export default function DriverProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [driverName, setDriverName] = useState('Samuel');
  const [driverEmail, setDriverEmail] = useState('samuel@email.com');
  const [driverPhone, setDriverPhone] = useState('+234 800 000 0000');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Handle incoming updated profile parameters
  useEffect(() => {
    if (params.updatedName) {
      setDriverName(params.updatedName as string);
    }
    if (params.updatedEmail) {
      setDriverEmail(params.updatedEmail as string);
    }
    if (params.updatedPhone) {
      setDriverPhone(params.updatedPhone as string);
    }
  }, [params.updatedName, params.updatedEmail, params.updatedPhone]);

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    router.replace('/' as any); // Displays index.tsx in app folder
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AVATAR & DRIVER DETAILS */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarBorder}>
            <Image
              source={require('../../../assets/driver_avatar.png')}
              style={styles.avatarImage}
            />
          </View>

          <Text style={styles.driverName}>{driverName}</Text>
          <Text style={styles.driverEmail}>{driverEmail}</Text>
          <Text style={styles.driverPhone}>{driverPhone}</Text>
        </View>

        {/* STAT CARDS ROW */}
        <View style={styles.statsRow}>
          <View style={styles.tripsStatCard}>
            <Text style={styles.statNumberTrips}>124</Text>
            <Text style={styles.statLabelTrips}>TRIPS TAKEN</Text>
          </View>

          <View style={styles.ratingStatCard}>
            <Text style={styles.statNumberRating}>4.9</Text>
            <Text style={styles.statLabelRating}>USER RATING</Text>
          </View>
        </View>

        {/* MENU OPTIONS */}
        <View style={styles.menuList}>
          {/* EDIT PROFILE */}
          <TouchableOpacity
            style={styles.menuItemCard}
            onPress={() => router.push('/driver/edit-profile' as any)}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconCircle}>
              <Feather name="user-check" size={20} color="#1F2937" />
            </View>
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* EARNING */}
          <TouchableOpacity
            style={styles.menuItemCard}
            onPress={() => router.push('/driver/earnings' as any)}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="bookmark-outline" size={20} color="#1F2937" />
            </View>
            <Text style={styles.menuItemText}>Earning</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* HELP & SUPPORT */}
          <TouchableOpacity
            style={styles.menuItemCard}
            onPress={() => router.push('/help-support' as any)}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="help-circle-outline" size={20} color="#1F2937" />
            </View>
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutCard}
            onPress={() => setLogoutModalVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.logoutIconCircle}>
              <Feather name="log-out" size={20} color="#DC2626" />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* LOGOUT CONFIRMATION MODAL */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setLogoutModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.logoutModalIconBox}>
              <Feather name="log-out" size={28} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Log out of driver account?</Text>
            <Text style={styles.modalCopy}>
              Are you sure you want to log out? You will return to the home screen.
            </Text>
            <TouchableOpacity onPress={handleConfirmLogout} style={styles.confirmLogout}>
              <Text style={styles.confirmLogoutText}>Yes, Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLogoutModalVisible(false)} style={styles.cancelLogout}>
              <Text style={styles.cancelLogoutText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* DRIVER BOTTOM TAB BAR */}
      <DriverBottomTab />
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
    paddingBottom: 110,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#EBE5E3',
    padding: 3,
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  driverName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 4,
  },
  driverEmail: {
    fontSize: 14,
    color: '#6E6663',
    marginBottom: 2,
  },
  driverPhone: {
    fontSize: 14,
    color: '#6E6663',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  tripsStatCard: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  statNumberTrips: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F07D3B',
    marginBottom: 6,
  },
  statLabelTrips: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  ratingStatCard: {
    flex: 1,
    backgroundColor: '#F07D3B',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  statNumberRating: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  statLabelRating: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  menuList: {
    gap: 14,
  },
  menuItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FAF7F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 22,
    padding: 16,
    marginTop: 6,
  },
  logoutIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
  },

  /* LOGOUT MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
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
    color: '#1F2937',
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
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
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
