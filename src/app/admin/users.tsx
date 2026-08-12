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
  ActivityIndicator,
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

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: 'Alex Uercer',
    email: 'alex.uercer@logistics.co',
    role: 'System Administrator',
  });

  // Edit Admin Profile Modal State
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [editAdminName, setEditAdminName] = useState(adminProfile.name);
  const [editAdminEmail, setEditAdminEmail] = useState(adminProfile.email);
  const [editAdminRole, setEditAdminRole] = useState(adminProfile.role);
  const [saveAdminState, setSaveAdminState] = useState<'IDLE' | 'SAVING' | 'SUCCESS'>('IDLE');

  // Filter States
  const [accountTypeFilter, setAccountTypeFilter] = useState('All Accounts');
  const [accountStatusFilter, setAccountStatusFilter] = useState('All Statuses');
  const [lastActiveFilter, setLastActiveFilter] = useState('Anytime');

  // Create User Modal State
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

  // Handle Edit Admin Profile Save
  const handleSaveAdminProfile = () => {
    if (!editAdminName.trim() || !editAdminEmail.trim()) {
      Alert.alert('Validation Error', 'Admin name and email address are required.');
      return;
    }

    setSaveAdminState('SAVING');
    setTimeout(() => {
      setSaveAdminState('SUCCESS');
      setAdminProfile({
        name: editAdminName,
        email: editAdminEmail,
        role: editAdminRole,
      });

      setTimeout(() => {
        setSaveAdminState('IDLE');
        setShowEditAdminModal(false);
      }, 900);
    }, 600);
  };

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

  // FULLY FUNCTIONAL DYNAMIC FILTER LOGIC
  const filteredUsers = users.filter((u) => {
    // 1. Account Type Filter
    if (accountTypeFilter !== 'All Accounts' && u.role !== accountTypeFilter) {
      return false;
    }
    // 2. Account Status Filter
    if (accountStatusFilter !== 'All Statuses') {
      if (accountStatusFilter === 'Active Now' && u.status !== 'ACTIVE NOW' && u.status !== 'ACTIVE') {
        return false;
      }
      if (accountStatusFilter === 'Pending Approval' && u.status !== 'PENDING APPROVAL') {
        return false;
      }
      if (accountStatusFilter === 'Suspended' && u.status !== 'SUSPENDED') {
        return false;
      }
    }
    // 3. Last Active Filter
    if (lastActiveFilter !== 'Anytime') {
      if (lastActiveFilter === 'Today' && !u.activity.includes('m ago') && !u.activity.includes('h ago') && !u.activity.includes('now')) {
        return false;
      }
      if (lastActiveFilter === 'This Week' && u.activity.includes('3d ago')) {
        return false;
      }
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* TOP NAVBAR & HAMBURGER DRAWER WITH ADMIN PROFILE */}
      <AdminNavDrawer
        activeRoute="Users"
        adminName={adminProfile.name}
        adminRole={adminProfile.role}
        onEditProfilePress={() => {
          setEditAdminName(adminProfile.name);
          setEditAdminEmail(adminProfile.email);
          setEditAdminRole(adminProfile.role);
          setShowEditAdminModal(true);
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* REARRANGED ADMINISTRATION PAGE HEADER */}
        <View style={styles.pageHeaderCard}>
          {/* 1. ADMINISTRATION & USER MANAGEMENT TITLE ABOVE ALEX UERCER DIV */}
          <View>
            <Text style={styles.breadcrumbLabel}>ADMINISTRATION</Text>
            <Text style={styles.pageTitle}>User Management</Text>
          </View>

          {/* 2. ALEX UERCER ADMIN PROFILE DIV DIRECTLY UNDER TITLE */}
          <TouchableOpacity
            style={styles.adminProfileHeaderCard}
            onPress={() => {
              setEditAdminName(adminProfile.name);
              setEditAdminEmail(adminProfile.email);
              setEditAdminRole(adminProfile.role);
              setShowEditAdminModal(true);
            }}
            activeOpacity={0.85}
          >
            <Image
              source={require('../../../assets/driver_avatar.png')}
              style={styles.adminHeaderAvatar}
            />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.adminHeaderName}>{adminProfile.name}</Text>
              <Text style={styles.adminHeaderRole}>{adminProfile.role}</Text>
            </View>
            <Feather name="edit-3" size={14} color="#F07D3B" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          {/* 3. TWO ACTION BUTTONS UNDER ALEX UERCER DIV */}
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

          {/* 4. SUBTITLE UNDER BUTTONS */}
          <Text style={styles.pageSubUnderButtons}>
            Oversee your ecosystem. Manage permissions, track activity, and ensure seamless coordination across all nodes.
          </Text>
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
              onPress={() => Alert.alert('Filters Applied', `Showing ${filteredUsers.length} matching accounts.`)}
              activeOpacity={0.88}
            >
              <Feather name="sliders" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.applyFilterText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* USERS LIST / TABLE WITH OPTIMIZED REDUCED FONT SIZES */}
        <View style={styles.usersList}>
          {/* TABLE HEADINGS WITH REDUCED COMPACT FONT */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.thText, { flex: 2 }]}>USER IDENTITY</Text>
            <Text style={[styles.thText, { flex: 1.1 }]}>ACCOUNT ROLE</Text>
            <Text style={[styles.thText, { flex: 1.1 }]}>STATUS</Text>
            <Text style={[styles.thText, { flex: 1.5 }]}>ACTIVITY</Text>
            <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>OPERATIONS</Text>
          </View>

          {filteredUsers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="filter-outline" size={32} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No matching accounts found</Text>
              <Text style={styles.emptySub}>Try adjusting your filter options above.</Text>
            </View>
          ) : (
            filteredUsers.map((u) => (
              <View key={u.id} style={styles.userRowCard}>
                {/* USER IDENTITY */}
                <View style={styles.userIdentityCol}>
                  <Image
                    source={require('../../../assets/driver_avatar.png')}
                    style={styles.userAvatar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.userNameText}>{u.name}</Text>
                    <Text style={styles.userEmailText}>{u.email}</Text>
                  </View>
                </View>

                {/* ACCOUNT ROLE */}
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

                {/* OPERATIONS */}
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
                          <Ionicons name="checkmark-circle-outline" size={18} color="#0D9488" />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={styles.opIconBtn}
                        onPress={() => Alert.alert('Edit Permissions', `Editing account node ${u.name}...`)}
                        activeOpacity={0.7}
                      >
                        <Feather name="edit-2" size={15} color="#6E6663" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.opIconBtn}
                        onPress={() => handleToggleSuspend(u.id, u.status)}
                        activeOpacity={0.7}
                      >
                        <MaterialCommunityIcons name="block-helper" size={15} color="#EF4444" />
                      </TouchableOpacity>

                      {u.status === 'PENDING APPROVAL' && (
                        <TouchableOpacity
                          style={styles.opIconBtn}
                          onPress={() => handleDeleteUser(u.id)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="trash-outline" size={15} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>

        {/* PAGINATION */}
        <View style={styles.paginationRow}>
          <Text style={styles.showingText}>Showing {filteredUsers.length} of 1,280 accounts</Text>
          <View style={styles.pagesRow}>
            <TouchableOpacity style={styles.pageArrowBtn} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={14} color="#6E6663" />
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
              <Ionicons name="chevron-forward" size={14} color="#6E6663" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* EDIT ADMIN PROFILE MODAL */}
      <Modal
        visible={showEditAdminModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditAdminModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowEditAdminModal(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <View style={styles.adminModalAvatarRow}>
              <Image
                source={require('../../../assets/driver_avatar.png')}
                style={styles.modalAdminAvatar}
              />
              <View>
                <Text style={styles.modalTitle}>Edit Admin Profile</Text>
                <Text style={styles.modalSub}>Update your administrator details below.</Text>
              </View>
            </View>

            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFieldLabel}>Admin Full Name</Text>
              <TextInput
                style={styles.modalTextInput}
                value={editAdminName}
                onChangeText={setEditAdminName}
                placeholder="Admin Name"
              />
            </View>

            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFieldLabel}>Admin Email</Text>
              <TextInput
                style={styles.modalTextInput}
                value={editAdminEmail}
                onChangeText={setEditAdminEmail}
                keyboardType="email-address"
                placeholder="admin@riders.logistics"
              />
            </View>

            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFieldLabel}>Administrator Role</Text>
              <TextInput
                style={styles.modalTextInput}
                value={editAdminRole}
                onChangeText={setEditAdminRole}
                placeholder="Role (e.g. System Admin)"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.saveAdminBtn,
                saveAdminState === 'SUCCESS' && styles.saveAdminBtnSuccess,
              ]}
              onPress={handleSaveAdminProfile}
              disabled={saveAdminState !== 'IDLE'}
              activeOpacity={0.88}
            >
              {saveAdminState === 'SAVING' ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : saveAdminState === 'SUCCESS' ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.saveAdminBtnText}>Profile Updated ✓</Text>
                </View>
              ) : (
                <Text style={styles.saveAdminBtnText}>Save Admin Profile</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelModalBtn}
              onPress={() => setShowEditAdminModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelModalText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* CREATE NEW USER MODAL */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowCreateModal(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
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
              style={styles.cancelModalBtn}
              onPress={() => setShowCreateModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelModalText}>Cancel</Text>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },

  /* REARRANGED ADMINISTRATION HEADER CARD */
  pageHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3ECE9',
    gap: 14,
  },
  titleRowWithBadge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  breadcrumbLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
  },
  adminProfileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#F07D3B',
    alignSelf: 'flex-start',
  },
  adminHeaderAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  adminHeaderName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
  },
  adminHeaderRole: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8C531B',
  },

  /* ACTION BUTTONS DIRECTLY UNDER TITLE & ABOVE SUBTITLE */
  headerActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 42,
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
    height: 42,
  },
  createUserBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* SUBTITLE WORDS REARRANGED NICELY UNDER THE TWO BUTTONS */
  pageSubUnderButtons: {
    fontSize: 13,
    color: '#6E6663',
    lineHeight: 19,
  },

  /* FILTER CONTROLS BAR */
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
    gap: 10,
  },
  filterGroup: {
    flex: 1,
    minWidth: 130,
  },
  filterLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  filterDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  dropdownValueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  applyFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 18,
  },
  applyFilterText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* USERS TABLE & CARD LIST WITH REDUCED FONT SIZES */
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
  },
  thText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 30,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 8,
  },
  emptySub: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 2,
  },
  userRowCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#FAF7F5',
    gap: 8,
  },
  userIdentityCol: {
    flex: 2,
    minWidth: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  userNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
  },
  userEmailText: {
    fontSize: 11,
    color: '#6E6663',
    marginTop: 1,
  },
  roleCol: {
    flex: 1.1,
    minWidth: 85,
  },
  roleBadge: {
    backgroundColor: '#FAF7F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#524945',
  },
  statusCol: {
    flex: 1.1,
    minWidth: 120,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
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
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5,
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
    fontSize: 9.5,
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
    minWidth: 130,
  },
  activityText: {
    fontSize: 11,
    color: '#6E6663',
  },
  operationsCol: {
    flex: 1,
    minWidth: 90,
    alignItems: 'flex-end',
  },
  opIconButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  opIconBtn: {
    padding: 4,
  },
  reactivateBtn: {
    backgroundColor: '#F3ECE9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  reactivateBtnText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: 0.3,
  },
  paginationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 10,
  },
  showingText: {
    fontSize: 11.5,
    color: '#6E6663',
  },
  pagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageArrowBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  pageBtn: {
    width: 30,
    height: 30,
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
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1F2937',
  },
  pageBtnActiveText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pageDotsText: {
    fontSize: 11.5,
    color: '#9CA3AF',
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 24,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  adminModalAvatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  modalAdminAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#F07D3B',
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  modalSub: {
    fontSize: 12,
    color: '#6E6663',
    marginBottom: 16,
  },
  modalFormGroup: {
    marginBottom: 14,
  },
  modalFieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  modalTextInput: {
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    height: 46,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  saveAdminBtn: {
    height: 48,
    backgroundColor: '#D97706',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  saveAdminBtnSuccess: {
    backgroundColor: '#0D9488',
  },
  saveAdminBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  roleSelectorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleSelectPill: {
    flex: 1,
    height: 40,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#6E6663',
  },
  roleSelectTextActive: {
    color: '#8C531B',
    fontWeight: '800',
  },
  submitCreateBtn: {
    height: 48,
    backgroundColor: '#D97706',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  submitCreateText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cancelModalBtn: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelModalText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6663',
  },
});
