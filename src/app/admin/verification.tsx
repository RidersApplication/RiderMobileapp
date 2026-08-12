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

interface VerificationItem {
  id: string;
  entityName: string;
  entityId: string;
  type: 'DRIVER' | 'BUSINESS' | 'INDIVIDUAL';
  dateSubmitted: string;
  docs: string[];
  status: 'PENDING REVIEW' | 'APPROVED' | 'REJECTED';
}

export default function AdminVerificationScreen() {
  const router = useRouter();

  const [activeTypeTab, setActiveTypeTab] = useState<'All Requests' | 'Drivers' | 'Businesses' | 'Individuals'>('All Requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All States');

  // Inspection Modal State
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);

  const [requests, setRequests] = useState<VerificationItem[]>([
    {
      id: 'v-1',
      entityName: 'Marcus Thorne',
      entityId: '#DR-882190',
      type: 'DRIVER',
      dateSubmitted: 'Oct 24, 2023',
      docs: ['card-account-details-outline', 'car-outline', 'shield-outline'],
      status: 'PENDING REVIEW',
    },
    {
      id: 'v-2',
      entityName: 'Helix Logistics Ltd.',
      entityId: '#BZ-440212',
      type: 'BUSINESS',
      dateSubmitted: 'Oct 23, 2023',
      docs: ['office-building-outline', 'file-document-outline'],
      status: 'APPROVED',
    },
    {
      id: 'v-3',
      entityName: 'Elena Rodriguez',
      entityId: '#IN-119283',
      type: 'INDIVIDUAL',
      dateSubmitted: 'Oct 21, 2023',
      docs: ['account-outline'],
      status: 'REJECTED',
    },
    {
      id: 'v-4',
      entityName: 'SwiftMove Fleets',
      entityId: '#BZ-992831',
      type: 'BUSINESS',
      dateSubmitted: 'Oct 20, 2023',
      docs: ['shield-check-outline', 'lock-outline'],
      status: 'PENDING REVIEW',
    },
  ]);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r))
    );
    setSelectedItem(null);
    Alert.alert('Verification Approved', 'Identity entity verified and granted active ecosystem access.');
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r))
    );
    setSelectedItem(null);
    Alert.alert('Verification Rejected', 'Request rejected. Clarification notification sent to applicant.');
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTypeTab === 'Drivers' && r.type !== 'DRIVER') return false;
    if (activeTypeTab === 'Businesses' && r.type !== 'BUSINESS') return false;
    if (activeTypeTab === 'Individuals' && r.type !== 'INDIVIDUAL') return false;
    if (statusFilter !== 'All States' && r.status !== statusFilter) return false;
    if (
      searchQuery &&
      !r.entityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.entityId.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* SHARED TOP NAVBAR & HAMBURGER DRAWER */}
      <AdminNavDrawer activeRoute="Verification" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PAGE HEADER & SYSTEM STATUS BANNER */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.breadcrumbText}>Logistics Pulse</Text>
            <Text style={styles.pageTitle}>Verification Requests</Text>
            <Text style={styles.pageSub}>
              Manage and validate entity identities across the Logistics Pulse network. Accuracy ensures system integrity.
            </Text>
          </View>

          <View style={styles.systemStatusPill}>
            <View style={styles.brownPulseDot} />
            <Text style={styles.systemStatusText}>SYSTEM STATUS: OPERATIONAL</Text>
          </View>
        </View>

        {/* CATEGORY TABS ROW */}
        <View style={styles.typeTabsRow}>
          {(['All Requests', 'Drivers', 'Businesses', 'Individuals'] as const).map((tab) => {
            const isSel = activeTypeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.typeTabPill, isSel && styles.typeTabPillActive]}
                onPress={() => setActiveTypeTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.typeTabText, isSel && styles.typeTabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SEARCH AND CONTROL BAR */}
        <View style={styles.searchFilterCard}>
          <View style={styles.searchFilterGrid}>
            <TouchableOpacity
              style={styles.statusDropdownBtn}
              onPress={() =>
                Alert.alert('Filter Status', 'Select status filter:', [
                  { text: 'All States', onPress: () => setStatusFilter('All States') },
                  { text: 'PENDING REVIEW', onPress: () => setStatusFilter('PENDING REVIEW') },
                  { text: 'APPROVED', onPress: () => setStatusFilter('APPROVED') },
                  { text: 'REJECTED', onPress: () => setStatusFilter('REJECTED') },
                ])
              }
              activeOpacity={0.8}
            >
              <Text style={styles.statusDropdownText}>Status: {statusFilter}</Text>
              <Ionicons name="chevron-down" size={14} color="#6E6663" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateDropdownBtn}
              onPress={() => Alert.alert('Sort Order', 'Sorted by Newest First.')}
              activeOpacity={0.8}
            >
              <Text style={styles.dateDropdownText}>Date: Newest First</Text>
              <Ionicons name="calendar-outline" size={14} color="#6E6663" />
            </TouchableOpacity>

            <View style={styles.searchBoxInputWrapper}>
              <Ionicons name="search-outline" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchBoxInput}
                placeholder="Search by name or ID..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* VERIFICATION REQUESTS LIST / TABLE */}
        <View style={styles.requestsTableCard}>
          <View style={styles.thRow}>
            <Text style={[styles.thCol, { flex: 2 }]}>ENTITY NAME</Text>
            <Text style={[styles.thCol, { flex: 1 }]}>TYPE</Text>
            <Text style={[styles.thCol, { flex: 1.2 }]}>DATE SUBMITTED</Text>
            <Text style={[styles.thCol, { flex: 1 }]}>DOCUMENTS</Text>
            <Text style={[styles.thCol, { flex: 1.2 }]}>STATUS</Text>
            <Text style={[styles.thCol, { flex: 1, textAlign: 'right' }]}>ACTIONS</Text>
          </View>

          {filteredRequests.map((r) => (
            <View key={r.id} style={styles.trRow}>
              {/* ENTITY NAME & ID */}
              <View style={styles.entityNameCol}>
                <Image
                  source={require('../../../assets/driver_avatar.png')}
                  style={styles.entityAvatar}
                />
                <View>
                  <Text style={styles.entityNameText}>{r.entityName}</Text>
                  <Text style={styles.entityIdText}>ID: {r.entityId}</Text>
                </View>
              </View>

              {/* TYPE */}
              <View style={styles.typeCol}>
                <View style={styles.typePill}>
                  <Text style={styles.typePillText}>{r.type}</Text>
                </View>
              </View>

              {/* DATE SUBMITTED */}
              <View style={styles.dateCol}>
                <Text style={styles.dateText}>{r.dateSubmitted}</Text>
              </View>

              {/* DOCUMENTS */}
              <View style={styles.docsCol}>
                <View style={styles.docIconsRow}>
                  {r.docs.map((iconName, idx) => (
                    <View key={idx} style={styles.docIconBox}>
                      <MaterialCommunityIcons name={iconName as any} size={14} color="#524945" />
                    </View>
                  ))}
                </View>
              </View>

              {/* STATUS */}
              <View style={styles.statusCol}>
                <View
                  style={[
                    styles.statusBadge,
                    r.status === 'APPROVED'
                      ? styles.statusApproved
                      : r.status === 'PENDING REVIEW'
                      ? styles.statusPending
                      : styles.statusRejected,
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      r.status === 'APPROVED'
                        ? styles.dotApproved
                        : r.status === 'PENDING REVIEW'
                        ? styles.dotPending
                        : styles.dotRejected,
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      r.status === 'APPROVED'
                        ? styles.stTextApproved
                        : r.status === 'PENDING REVIEW'
                        ? styles.stTextPending
                        : styles.stTextRejected,
                    ]}
                  >
                    {r.status}
                  </Text>
                </View>
              </View>

              {/* ACTIONS */}
              <View style={styles.actionsCol}>
                <TouchableOpacity
                  style={styles.viewDetailsBtn}
                  onPress={() => setSelectedItem(r)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* PAGINATION */}
        <View style={styles.paginationRow}>
          <Text style={styles.showingText}>Showing 1-4 of 24 requests</Text>
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
            <TouchableOpacity style={styles.pageArrowBtn} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={16} color="#6E6663" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ANALYTICS SUMMARY CARDS AT BOTTOM */}
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsLabel}>PENDING VOLUME</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <Text style={styles.analyticsVal}>12</Text>
              <Text style={[styles.analyticsSub, { color: '#D97706' }]}>+4 from yesterday</Text>
            </View>
          </View>

          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsLabel}>AVG. RESPONSE TIME</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <Text style={styles.analyticsVal}>4.2h</Text>
              <Text style={[styles.analyticsSub, { color: '#16A34A' }]}>-12% improvement</Text>
            </View>
          </View>

          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsLabel}>REJECTION RATE</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <Text style={styles.analyticsVal}>8.5%</Text>
              <Text style={[styles.analyticsSub, { color: '#6E6663' }]}>Within SLA targets</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* VERIFICATION REVIEW INSPECTION MODAL */}
      <Modal
        visible={!!selectedItem}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedItem(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSelectedItem(null)}>
          <Pressable style={styles.inspectionModalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Verification Document Review</Text>
            <Text style={styles.modalSub}>
              Inspecting credentials for {selectedItem?.entityName} ({selectedItem?.entityId}).
            </Text>

            {/* DOCUMENT PREVIEW BOX */}
            <View style={styles.docPreviewCard}>
              <View style={styles.previewHeaderRow}>
                <Ionicons name="document-text-outline" size={20} color="#F07D3B" />
                <Text style={styles.previewDocTitle}>Driver License & Vehicle Docs</Text>
              </View>
              <Text style={styles.previewDocSub}>Submitted Oct 24, 2023 • Verified via National Database</Text>
              <View style={styles.docImagePlaceholder}>
                <MaterialCommunityIcons name="card-account-details" size={40} color="#8C531B" />
                <Text style={styles.placeholderDocText}>OFFICIAL IDENTITY DOCUMENT PREVIEW</Text>
              </View>
            </View>

            {/* ACTION BUTTONS */}
            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.approveModalBtn}
                onPress={() => selectedItem && handleApprove(selectedItem.id)}
                activeOpacity={0.88}
              >
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.approveModalText}>Approve Verification</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rejectModalBtn}
                onPress={() => selectedItem && handleReject(selectedItem.id)}
                activeOpacity={0.88}
              >
                <Ionicons name="close-circle" size={18} color="#EF4444" style={{ marginRight: 6 }} />
                <Text style={styles.rejectModalText}>Reject Request</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setSelectedItem(null)}
              activeOpacity={0.7}
            >
              <Text style={styles.closeModalText}>Close</Text>
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
  headerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 14,
  },
  breadcrumbText: {
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
  systemStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  brownPulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#8C531B',
    marginRight: 6,
  },
  systemStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
  },
  typeTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeTabPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  typeTabPillActive: {
    backgroundColor: '#FFF0E6',
    borderColor: '#F07D3B',
  },
  typeTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6663',
  },
  typeTabTextActive: {
    color: '#8C531B',
    fontWeight: '800',
  },
  searchFilterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  searchFilterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  statusDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  statusDropdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  dateDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    minWidth: 150,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  dateDropdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  searchBoxInputWrapper: {
    flex: 1,
    minWidth: 180,
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  searchBoxInput: {
    flex: 1,
    fontSize: 13,
    color: '#1F2937',
  },
  requestsTableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F3ECE9',
    overflow: 'hidden',
  },
  thRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
  },
  thCol: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  trRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FAF7F5',
    gap: 10,
  },
  entityNameCol: {
    flex: 2,
    minWidth: 190,
    flexDirection: 'row',
    alignItems: 'center',
  },
  entityAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  entityNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  entityIdText: {
    fontSize: 11,
    color: '#6E6663',
    marginTop: 1,
  },
  typeCol: {
    flex: 1,
    minWidth: 90,
  },
  typePill: {
    backgroundColor: '#FAF7F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  typePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#524945',
  },
  dateCol: {
    flex: 1.2,
    minWidth: 110,
  },
  dateText: {
    fontSize: 13,
    color: '#6E6663',
  },
  docsCol: {
    flex: 1,
    minWidth: 100,
  },
  docIconsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  docIconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#FAF7F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  statusCol: {
    flex: 1.2,
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
  statusApproved: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FFF0E6',
  },
  statusRejected: {
    backgroundColor: '#FEE2E2',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  dotApproved: {
    backgroundColor: '#16A34A',
  },
  dotPending: {
    backgroundColor: '#F07D3B',
  },
  dotRejected: {
    backgroundColor: '#DC2626',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  stTextApproved: {
    color: '#15803D',
  },
  stTextPending: {
    color: '#8C531B',
  },
  stTextRejected: {
    color: '#991B1B',
  },
  actionsCol: {
    flex: 1,
    minWidth: 100,
    alignItems: 'flex-end',
  },
  viewDetailsBtn: {
    paddingVertical: 4,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
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
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: '#FFF0E6',
    borderRadius: 20,
    padding: 18,
  },
  analyticsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
  },
  analyticsVal: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
  },
  analyticsSub: {
    fontSize: 11,
    fontWeight: '700',
  },

  /* INSPECTION MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  inspectionModalCard: {
    width: '100%',
    maxWidth: 440,
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
    marginBottom: 18,
  },
  docPreviewCard: {
    backgroundColor: '#FAF7F5',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  previewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  previewDocTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  previewDocSub: {
    fontSize: 11,
    color: '#6E6663',
    marginTop: 2,
    marginBottom: 14,
  },
  docImagePlaceholder: {
    height: 120,
    backgroundColor: '#FFF0E6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F07D3B',
    borderStyle: 'dashed',
    gap: 6,
  },
  placeholderDocText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
  },
  modalActionsRow: {
    gap: 10,
    marginBottom: 8,
  },
  approveModalBtn: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#0D9488',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveModalText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rejectModalBtn: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#FEE2E2',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectModalText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
  closeModalBtn: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E6663',
  },
});
