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
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AdminNavDrawer from '../../components/admin-nav-drawer';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Individual' | 'Business' | 'Driver';
  status: 'ACTIVE NOW' | 'PENDING APPROVAL' | 'SUSPENDED' | 'ACTIVE';
  activity: string;
}

export default function AdminUsersScreen() {
  const router = useRouter();

  const [accountTypeFilter, setAccountTypeFilter] = useState('All Accounts');
  const [accountStatusFilter, setAccountStatusFilter] = useState('All Statuses');
  const [lastActiveFilter, setLastActiveFilter] = useState('Anytime');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Individual' | 'Business' | 'Driver'>('Individual');

  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 'usr-1',
      name: 'Julian Deakin',
      email: 'julian.deakin@logistics.co',
      role: 'Individual',
      status: 'ACTIVE NOW',
      activity: '32 Rides • Last used 2m ago',
    },
    {
      id: 'usr-2',
      name: 'Sarah Morales',
      email: 's.morales@fleetmaster.com',
      role: 'Business',
      status: 'PENDING APPROVAL',
      activity: '12 Rides • Registered 1h ago',
    },
    {
      id: 'usr-3',
      name: 'Hassan Karim',
      email: 'h.karim@independent.io',
      role: 'Individual',
      status: 'SUSPENDED',
      activity: '0 Rides • Suspended 3d ago',
    },
    {
      id: 'usr-4',
      name: 'Leo Chen',
      email: 'l.chen@globalship.net',
      role: 'Driver',
      status: 'ACTIVE',
      activity: '1,402 Rides • Last used 5h ago',
    },
  ]);

  const handleExportData = () => {
    Alert.alert(
      'Export Ecosystem Data',
      'Account data export (1,280 accounts) generated in CSV/JSON format. Download initiated.'
    );
  };

  const handleCreateUserSubmit = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      Alert.alert('Validation Error', 'Please enter user name and email address.');
      return;
    }

    const newUser: UserItem = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'ACTIVE NOW',
      activity: '0 Rides • Joined just now',
    };

    setUsers((prev) => [newUser, ...prev]);
    setShowCreateModal(false);
    setNewUserName('');
    setNewUserEmail('');
    Alert.alert('User Created', `New ${newUserRole} account created for ${newUserName}.`);
  };

  const handleToggleSuspend = (id: string, currentStatus: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    Alert.alert(
      'Status Updated',
      `Account status modified to ${currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED'}.`
    );
  };

  const handleApproveUser = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'ACTIVE NOW' } : u))
    );
    Alert.alert('Account Approved', 'Business entity verification approved and activated.');
  };

  const handleDeleteUser = (id: string) => {
    Alert.alert('Delete Account', 'Are you sure you want to delete this account node?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setUsers((prev) => prev.filter((u) => u.id !== id)),
      },
    ]);
  };

  const filteredUsers = users.filter((u) => {
    if (accountTypeFilter !== 'All Accounts' && u.role !== accountTypeFilter) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* TOP NAVBAR & HAMBURGER DRAWER */}
      <AdminNavDrawer activeRoute="Users" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PAGE HEADER */}
        <View style={styles.pageHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.breadcrumbLabel}>ADMINISTRATION</Text>
            <Text style={styles.pageTitle}>User Management</Text>
            <Text style={styles.pageSub}>
              Oversee your ecosystem. Manage permissions, track activity, and ensure seamless coordination across all nodes.
            </Text>
          </View>

          <View style={styles.headerActionsRow}>
            <TouchableOpacity
              style={styles.exportBtn}
              onPress={handleExportData}
              activeOpacity={0.8}
            >
              <Feather name="download" size={16} color="#1F2937" style={{ marginRight: 6 }} />
              <Text style={styles.exportBtnText}>Export Data</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createUserBtn}
              onPress={() => setShowCreateModal(true)}
              activeOpacity={0.88}
            >
              <Ionicons name="add" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.createUserBtnText}>Create New User</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FILTER CONTROLS BAR */}
        <View style={styles.filterCard}>
          <View style={styles.filterControlsGrid}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>ACCOUNT TYPE</Text>
              <TouchableOpacity
                style={styles.filterDropdown}
                onPress={() =>
                  Alert.alert('Account Type', 'Select filter type:', [
                    { text: 'All Accounts', onPress: () => setAccountTypeFilter('All Accounts') },
                    { text: 'Individual', onPress: () => setAccountTypeFilter('Individual') },
                    { text: 'Business', onPress: () => setAccountTypeFilter('Business') },
                    { text: 'Driver', onPress: () => setAccountTypeFilter('Driver') },
                  ])
                }
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownValueText}>{accountTypeFilter}</Text>
                <Ionicons name="chevron-down" size={14} color="#6E6663" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>ACCOUNT STATUS</Text>
              <TouchableOpacity
                style={styles.filterDropdown}
                onPress={() =>
                  Alert.alert('Account Status', 'Select status filter:', [
                    { text: 'All Statuses', onPress: () => setAccountStatusFilter('All Statuses') },
                    { text: 'Active Now', onPress: () => setAccountStatusFilter('Active Now') },
                    { text: 'Pending Approval', onPress: () => setAccountStatusFilter('Pending Approval') },
                    { text: 'Suspended', onPress: () => setAccountStatusFilter('Suspended') },
                  ])
                }
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownValueText}>{accountStatusFilter}</Text>
                <Ionicons name="chevron-down" size={14} color="#6E6663" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>LAST ACTIVE</Text>
              <TouchableOpacity
                style={styles.filterDropdown}
                onPress={() =>
                  Alert.alert('Last Active', 'Select time filter:', [
                    { text: 'Anytime', onPress: () => setLastActiveFilter('Anytime') },
                    { text: 'Today', onPress: () => setLastActiveFilter('Today') },
                    { text: 'This Week', onPress: () => setLastActiveFilter('This Week') },
                  ])
                }
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownValueText}>{lastActiveFilter}</Text>
                <Ionicons name="chevron-down" size={14} color="#6E6663" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.applyFilterBtn}
              onPress={() => Alert.alert('Filters Applied', 'User management list refreshed.')}
              activeOpacity={0.88}
            >
              <Feather name="sliders" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.applyFilterText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* USERS LIST / TABLE */}
        <View style={styles.usersList}>
          {/* TABLE HEADINGS FOR DESKTOP */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.thText, { flex: 2 }]}>USER IDENTITY</Text>
            <Text style={[styles.thText, { flex: 1 }]}>ACCOUNT ROLE</Text>
            <Text style={[styles.thText, { flex: 1 }]}>STATUS</Text>
            <Text style={[styles.thText, { flex: 1.5 }]}>ACTIVITY</Text>
            <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>OPERATIONS</Text>
          </View>

          {filteredUsers.map((u) => (
            <View key={u.id} style={styles.userRowCard}>
              {/* IDENTITY */}
              <View style={styles.userIdentityCol}>
                <Image
                  source={require('../../../assets/driver_avatar.png')}
                  style={styles.userAvatar}
                />
                <View>
                  <Text style={styles.userNameText}>{u.name}</Text>
                  <Text style={styles.userEmailText}>{u.email}</Text>
                </View>
              </View>

              {/* ROLE */}
              <View style={styles.roleCol}>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleBadgeText}>{u.role}</Text>
                </View>
              </View>

              {/* STATUS */}
              <View style={styles.statusCol}>
                <View
                  style={[
                    styles.statusBadge,
                    u.status === 'ACTIVE NOW' || u.status === 'ACTIVE'
                      ? styles.statusActive
                      : u.status === 'PENDING APPROVAL'
                      ? styles.statusPending
                      : styles.statusSuspended,
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      u.status === 'ACTIVE NOW' || u.status === 'ACTIVE'
                        ? styles.dotActive
                        : u.status === 'PENDING APPROVAL'
                        ? styles.dotPending
                        : styles.dotSuspended,
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      u.status === 'ACTIVE NOW' || u.status === 'ACTIVE'
                        ? styles.stTextActive
                        : u.status === 'PENDING APPROVAL'
                        ? styles.stTextPending
                        : styles.stTextSuspended,
                    ]}
                  >
                    {u.status}
                  </Text>
                </View>
              </View>

              {/* ACTIVITY */}
              <View style={styles.activityCol}>
                <Text style={styles.activityText}>{u.activity}</Text>
              </View>

              {/* OPERATIONS ACTIONS */}
              <View style={styles.operationsCol}>
                {u.status === 'SUSPENDED' ? (
                  <TouchableOpacity
                    style={styles.reactivateBtn}
                    onPress={() => handleToggleSuspend(u.id, u.status)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.reactivateBtnText}>REACTIVATE</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.opIconButtonsRow}>
                    {u.status === 'PENDING APPROVAL' && (
                      <TouchableOpacity
                        style={styles.opIconBtn}
                        onPress={() => handleApproveUser(u.id)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="checkmark-circle-outline" size={20} color="#0D9488" />
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.opIconBtn}
                      onPress={() => Alert.alert('Edit Permissions', `Editing account node ${u.name}...`)}
                      activeOpacity={0.7}
                    >
                      <Feather name="edit-2" size={16} color="#6E6663" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.opIconBtn}
                      onPress={() => handleToggleSuspend(u.id, u.status)}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons name="block-helper" size={16} color="#EF4444" />
                    </TouchableOpacity>

                    {u.status === 'PENDING APPROVAL' && (
                      <TouchableOpacity
                        style={styles.opIconBtn}
                        onPress={() => handleDeleteUser(u.id)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* PAGINATION */}
        <View style={styles.paginationRow}>
          <Text style={styles.showingText}>Showing 4 of 1,280 accounts</Text>
          <View style={styles.pagesRow}>
            <TouchableOpacity style={styles.pageArrowBtn} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={16} color="#6E6663" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]} activeOpacity={0.8}>
              <Text style={styles.pageBtnActiveText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pageBtn} activeOpacity={0.8}>
              <Text style={styles.pageBtnText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pageBtn} activeOpacity={0.8}>
              <Text style={styles.pageBtnText}>3</Text>
            </TouchableOpacity>
            <Text style={styles.pageDotsText}>...</Text>
            <TouchableOpacity style={styles.pageBtn} activeOpacity={0.8}>
              <Text style={styles.pageBtnText}>42</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pageArrowBtn} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={16} color="#6E6663" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* CREATE NEW USER MODAL */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowCreateModal(false)}>
          <Pressable style={styles.createModalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Create New Account Node</Text>
            <Text style={styles.modalSub}>Enter identity credentials to add a new account to the network.</Text>

            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFieldLabel}>Full Name</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="e.g. Marcus Thorne"
                placeholderTextColor="#9CA3AF"
                value={newUserName}
                onChangeText={setNewUserName}
              />
            </View>

            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFieldLabel}>Email Address</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="marcus@logistics.co"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                value={newUserEmail}
                onChangeText={setNewUserEmail}
              />
            </View>

            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFieldLabel}>Account Role</Text>
              <View style={styles.roleSelectorRow}>
                {(['Individual', 'Business', 'Driver'] as const).map((role) => {
                  const isSel = newUserRole === role;
                  return (
                    <TouchableOpacity
                      key={role}
                      style={[styles.roleSelectPill, isSel && styles.roleSelectPillActive]}
                      onPress={() => setNewUserRole(role)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.roleSelectText, isSel && styles.roleSelectTextActive]}>
                        {role}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitCreateBtn}
              onPress={handleCreateUserSubmit}
              activeOpacity={0.88}
            >
              <Text style={styles.submitCreateText}>Create User Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelCreateBtn}
              onPress={() => setShowCreateModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelCreateText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 18,
  },
  pageHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 14,
  },
  breadcrumbLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 6,
  },
  pageSub: {
    fontSize: 13,
    color: '#6E6663',
    lineHeight: 18,
    maxWidth: 580,
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 44,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  exportBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
  },
  createUserBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D97706',
    borderRadius: 14,
    paddingHorizontal: 18,
    height: 44,
  },
  createUserBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  filterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  filterControlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: 12,
  },
  filterGroup: {
    flex: 1,
    minWidth: 140,
  },
  filterLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  filterDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  dropdownValueText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  applyFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 20,
  },
  applyFilterText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  usersList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F3ECE9',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
  },
  thText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  userRowCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FAF7F5',
    gap: 10,
  },
  userIdentityCol: {
    flex: 2,
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  userEmailText: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 1,
  },
  roleCol: {
    flex: 1,
    minWidth: 90,
  },
  roleBadge: {
    backgroundColor: '#FAF7F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#524945',
  },
  statusCol: {
    flex: 1,
    minWidth: 130,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusActive: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusSuspended: {
    backgroundColor: '#F3F4F6',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: '#16A34A',
  },
  dotPending: {
    backgroundColor: '#D97706',
  },
  dotSuspended: {
    backgroundColor: '#6B7280',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  stTextActive: {
    color: '#15803D',
  },
  stTextPending: {
    color: '#B45309',
  },
  stTextSuspended: {
    color: '#4B5563',
  },
  activityCol: {
    flex: 1.5,
    minWidth: 140,
  },
  activityText: {
    fontSize: 12,
    color: '#6E6663',
  },
  operationsCol: {
    flex: 1,
    minWidth: 100,
    alignItems: 'flex-end',
  },
  opIconButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  opIconBtn: {
    padding: 4,
  },
  reactivateBtn: {
    backgroundColor: '#F3ECE9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  reactivateBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  paginationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  showingText: {
    fontSize: 12,
    color: '#6E6663',
  },
  pagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pageArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  pageBtnActive: {
    backgroundColor: '#8C531B',
    borderColor: '#8C531B',
  },
  pageBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  pageBtnActiveText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pageDotsText: {
    fontSize: 12,
    color: '#9CA3AF',
    paddingHorizontal: 2,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  createModalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 12,
    color: '#6E6663',
    marginBottom: 20,
  },
  modalFormGroup: {
    marginBottom: 16,
  },
  modalFieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  modalTextInput: {
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  roleSelectorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleSelectPill: {
    flex: 1,
    height: 42,
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  roleSelectPillActive: {
    backgroundColor: '#FFF0E6',
    borderColor: '#F07D3B',
  },
  roleSelectText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6663',
  },
  roleSelectTextActive: {
    color: '#8C531B',
    fontWeight: '800',
  },
  submitCreateBtn: {
    height: 50,
    backgroundColor: '#D97706',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  submitCreateText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cancelCreateBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelCreateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E6663',
  },
});
