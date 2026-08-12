import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface AdminNavProps {
  title?: string;
  activeRoute?: string;
}

export default function AdminNavDrawer({ title, activeRoute }: AdminNavProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const NAV_ITEMS = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'grid-outline' },
    { label: 'Users', route: '/admin/users', icon: 'people-outline' },
    { label: 'Drivers', route: '/admin/dashboard', icon: 'car-outline' },
    { label: 'Businesses', route: '/admin/dashboard', icon: 'briefcase-outline' },
    { label: 'Bookings', route: '/admin/dashboard', icon: 'calendar-outline' },
    { label: 'Payments', route: '/admin/dashboard', icon: 'card-outline' },
    { label: 'Verification', route: '/admin/verification', icon: 'shield-checkmark-outline' },
    { label: 'Support', route: '/admin/dashboard', icon: 'help-circle-outline' },
  ];

  const handleNavigate = (route: string) => {
    setDrawerOpen(false);
    router.push(route as any);
  };

  return (
    <>
      {/* ADMIN TOP NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.navLeftRow}>
          {/* HAMBURGER MENU BUTTON */}
          <TouchableOpacity
            style={styles.hamburgerBtn}
            onPress={() => setDrawerOpen(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="menu" size={26} color="#1F2937" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoRow}
            onPress={() => router.push('/admin/dashboard' as any)}
            activeOpacity={0.8}
          >
            <View style={styles.logoGridIcon}>
              <MaterialCommunityIcons name="view-grid" size={20} color="#F07D3B" />
            </View>
            <View>
              <Text style={styles.logoText}>RIDERS</Text>
              <Text style={styles.logoSubtext}>LOGISTICS CONTROL</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* SEARCH INPUT BAR (HIDDEN ON VERY SMALL PHONES) */}
        <View style={styles.searchBarBox}>
          <Ionicons name="search-outline" size={16} color="#6E6663" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search logistics nodes, users, or IDs..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* RIGHT ACTIONS */}
        <View style={styles.navRightRow}>
          <View style={styles.liveStatusPill}>
            <View style={styles.greenPulseDot} />
            <Text style={styles.liveStatusText}>Live status: operational</Text>
          </View>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={20} color="#1F2937" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={20} color="#1F2937" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileAvatarWrapper}
            onPress={() => router.push('/admin/login' as any)}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../assets/driver_avatar.png')}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* SLIDE-OUT MOBILE NAVIGATION DRAWER */}
      <Modal
        visible={drawerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDrawerOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setDrawerOpen(false)}>
          <Pressable style={styles.drawerCard} onPress={(e) => e.stopPropagation()}>
            {/* DRAWER HEADER */}
            <View style={styles.drawerHeader}>
              <View style={styles.logoRow}>
                <View style={styles.logoGridIcon}>
                  <MaterialCommunityIcons name="view-grid" size={22} color="#F07D3B" />
                </View>
                <View>
                  <Text style={styles.logoText}>RIDERS ADMIN</Text>
                  <Text style={styles.logoSubtext}>COMMAND TERMINAL</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setDrawerOpen(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#1F2937" />
              </TouchableOpacity>
            </View>

            {/* NAV LINKS LIST */}
            <View style={styles.drawerList}>
              {NAV_ITEMS.map((item) => {
                const isSelected =
                  currentPath === item.route || activeRoute === item.label;
                return (
                  <TouchableOpacity
                    key={item.label}
                    style={[
                      styles.drawerItem,
                      isSelected && styles.drawerItemSelected,
                    ]}
                    onPress={() => handleNavigate(item.route)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={isSelected ? '#F07D3B' : '#6E6663'}
                      style={{ marginRight: 14 }}
                    />
                    <Text
                      style={[
                        styles.drawerItemLabel,
                        isSelected && styles.drawerItemLabelSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <View style={styles.activeIndicatorLine} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* DRAWER FOOTER ADMIN PROFILE */}
            <View style={styles.drawerFooter}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/driver_avatar.png')}
                  style={styles.footerAvatar}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.footerAdminName}>Alex Uercer</Text>
                  <Text style={styles.footerAdminRole}>System Admin</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => handleNavigate('/admin/login')}
                activeOpacity={0.7}
              >
                <Feather name="log-out" size={18} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 64,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    zIndex: 10,
  },
  navLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hamburgerBtn: {
    padding: 6,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoGridIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  logoSubtext: {
    fontSize: 8,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
  },
  searchBarBox: {
    flex: 1,
    maxWidth: 340,
    height: 40,
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginHorizontal: 12,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 13,
    color: '#1F2937',
  },
  navRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  greenPulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#16A34A',
    marginRight: 6,
  },
  liveStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  iconBtn: {
    padding: 6,
  },
  profileAvatarWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#F07D3B',
    marginLeft: 4,
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
  },

  /* DRAWER MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  drawerCard: {
    width: 280,
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
    marginBottom: 16,
  },
  closeBtn: {
    padding: 4,
  },
  drawerList: {
    flex: 1,
    gap: 6,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    position: 'relative',
  },
  drawerItemSelected: {
    backgroundColor: '#FFF0E6',
  },
  drawerItemLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6E6663',
  },
  drawerItemLabelSelected: {
    color: '#8C531B',
    fontWeight: '900',
  },
  activeIndicatorLine: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 4,
    backgroundColor: '#F07D3B',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  drawerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3ECE9',
  },
  footerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  footerAdminName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
  },
  footerAdminRole: {
    fontSize: 11,
    color: '#6E6663',
  },
  logoutBtn: {
    padding: 8,
  },
});
