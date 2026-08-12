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

interface SupportTicket {
  id: string;
  ticketId: string;
  subject: string;
  submitter: string;
  role: 'Rider' | 'Driver' | 'Business';
  category: 'Rider Issue' | 'Driver Payment' | 'Vehicle Breakdown' | 'System Bug';
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN PROGRESS' | 'RESOLVED';
  time: string;
  description: string;
}

export default function AdminSupportScreen() {
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');

  // Response Modal State
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseText, setResponseText] = useState('');

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 't-1',
      ticketId: '#TCK-9901',
      subject: 'Vehicle Breakdown on Route 4',
      submitter: 'David Okon',
      role: 'Driver',
      category: 'Vehicle Breakdown',
      priority: 'URGENT',
      status: 'OPEN',
      time: '12m ago',
      description: 'Vehicle tire blowout near Expressway Toll Gate. Need emergency tow truck assistance and passenger reassignment.',
    },
    {
      id: 't-2',
      ticketId: '#TCK-9884',
      subject: 'Incorrect Fare Calculation',
      submitter: 'Grace Mensah',
      role: 'Rider',
      category: 'Rider Issue',
      priority: 'MEDIUM',
      status: 'IN PROGRESS',
      time: '45m ago',
      description: 'Charged ₦8,500 instead of estimated ₦5,200 due to detour route during peak rain volume.',
    },
    {
      id: 't-3',
      ticketId: '#TCK-9850',
      subject: 'Payout Delay to Access Bank',
      submitter: 'Samuel Driver',
      role: 'Driver',
      category: 'Driver Payment',
      priority: 'HIGH',
      status: 'OPEN',
      time: '2h ago',
      description: 'Withdrawal of ₦145,000 processed 6 hours ago but not yet credited to Access Bank account.',
    },
    {
      id: 't-4',
      ticketId: '#TCK-9812',
      subject: 'GPS Location Drift in Zone B',
      submitter: 'SwiftMove Fleets',
      role: 'Business',
      category: 'System Bug',
      priority: 'LOW',
      status: 'RESOLVED',
      time: '1d ago',
      description: 'Fleet map tracking pins experienced intermittent 5-minute latency in industrial zone B.',
    },
  ]);

  const handleSendResponse = () => {
    if (!responseText.trim()) {
      Alert.alert('Validation Error', 'Please enter a response message.');
      return;
    }

    if (selectedTicket) {
      setTickets((prev) =>
        prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: 'IN PROGRESS' } : t))
      );
    }

    setSelectedTicket(null);
    setResponseText('');
    Alert.alert('Response Dispatched', 'Support response sent to submitter and logged in ticket timeline.');
  };

  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'RESOLVED' } : t))
    );
    setSelectedTicket(null);
    Alert.alert('Ticket Resolved', 'Support ticket marked as RESOLVED and closed.');
  };

  const filteredTickets = tickets.filter((t) => {
    if (categoryFilter !== 'All Categories' && t.category !== categoryFilter) return false;
    if (statusFilter !== 'All Statuses' && t.status !== statusFilter) return false;
    if (
      searchQuery &&
      !t.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.submitter.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* SHARED TOP NAVBAR & HAMBURGER DRAWER */}
      <AdminNavDrawer activeRoute="Support" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PAGE HEADER */}
        <View style={styles.pageHeaderCard}>
          <Text style={styles.breadcrumbText}>ADMINISTRATION</Text>
          <Text style={styles.pageTitle}>Support & Command Desk</Text>
          <Text style={styles.pageSub}>
            Manage customer tickets, prioritize high-urgency logistics incidents, and dispatch help coordinators across all network nodes.
          </Text>
        </View>

        {/* METRICS ROW */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>OPEN TICKETS</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <Text style={styles.metricVal}>24</Text>
              <Text style={[styles.metricSub, { color: '#DC2626' }]}>+3 urgent</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>AVG RESPONSE</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <Text style={styles.metricVal}>18m</Text>
              <Text style={[styles.metricSub, { color: '#16A34A' }]}>-4m faster</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>CSAT SCORE</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <Text style={styles.metricVal}>98.2%</Text>
              <Text style={[styles.metricSub, { color: '#8C531B' }]}>Target: 95%</Text>
            </View>
          </View>
        </View>

        {/* SEARCH & FILTER CONTROLS */}
        <View style={styles.searchFilterCard}>
          <View style={styles.searchFilterGrid}>
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() =>
                Alert.alert('Filter Category', 'Select category:', [
                  { text: 'All Categories', onPress: () => setCategoryFilter('All Categories') },
                  { text: 'Rider Issue', onPress: () => setCategoryFilter('Rider Issue') },
                  { text: 'Driver Payment', onPress: () => setCategoryFilter('Driver Payment') },
                  { text: 'Vehicle Breakdown', onPress: () => setCategoryFilter('Vehicle Breakdown') },
                  { text: 'System Bug', onPress: () => setCategoryFilter('System Bug') },
                ])
              }
              activeOpacity={0.8}
            >
              <Text style={styles.dropdownValueText}>Category: {categoryFilter}</Text>
              <Ionicons name="chevron-down" size={14} color="#6E6663" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() =>
                Alert.alert('Filter Status', 'Select status:', [
                  { text: 'All Statuses', onPress: () => setStatusFilter('All Statuses') },
                  { text: 'OPEN', onPress: () => setStatusFilter('OPEN') },
                  { text: 'IN PROGRESS', onPress: () => setStatusFilter('IN PROGRESS') },
                  { text: 'RESOLVED', onPress: () => setStatusFilter('RESOLVED') },
                ])
              }
              activeOpacity={0.8}
            >
              <Text style={styles.dropdownValueText}>Status: {statusFilter}</Text>
              <Ionicons name="chevron-down" size={14} color="#6E6663" />
            </TouchableOpacity>

            <View style={styles.searchBoxWrapper}>
              <Ionicons name="search-outline" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search ticket ID or subject..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* TICKETS TABLE / LIST */}
        <View style={styles.ticketsTableCard}>
          <View style={styles.thRow}>
            <Text style={[styles.thCol, { flex: 1.2 }]}>TICKET ID</Text>
            <Text style={[styles.thCol, { flex: 2 }]}>SUBJECT / INCIDENT</Text>
            <Text style={[styles.thCol, { flex: 1.4 }]}>SUBMITTER</Text>
            <Text style={[styles.thCol, { flex: 1.2 }]}>PRIORITY</Text>
            <Text style={[styles.thCol, { flex: 1.2 }]}>STATUS</Text>
            <Text style={[styles.thCol, { flex: 1, textAlign: 'right' }]}>ACTION</Text>
          </View>

          {filteredTickets.map((t) => (
            <View key={t.id} style={styles.trRow}>
              {/* ID & TIME */}
              <View style={styles.idCol}>
                <Text style={styles.ticketIdText}>{t.ticketId}</Text>
                <Text style={styles.timeText}>{t.time}</Text>
              </View>

              {/* SUBJECT & CATEGORY */}
              <View style={styles.subjectCol}>
                <Text style={styles.subjectText}>{t.subject}</Text>
                <Text style={styles.categorySubText}>{t.category}</Text>
              </View>

              {/* SUBMITTER */}
              <View style={styles.submitterCol}>
                <Text style={styles.submitterName}>{t.submitter}</Text>
                <Text style={styles.submitterRole}>{t.role}</Text>
              </View>

              {/* PRIORITY */}
              <View style={styles.priorityCol}>
                <View
                  style={[
                    styles.priorityBadge,
                    t.priority === 'URGENT'
                      ? styles.pUrgent
                      : t.priority === 'HIGH'
                      ? styles.pHigh
                      : t.priority === 'MEDIUM'
                      ? styles.pMedium
                      : styles.pLow,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      t.priority === 'URGENT'
                        ? styles.pTextUrgent
                        : t.priority === 'HIGH'
                        ? styles.pTextHigh
                        : t.priority === 'MEDIUM'
                        ? styles.pTextMedium
                        : styles.pTextLow,
                    ]}
                  >
                    {t.priority}
                  </Text>
                </View>
              </View>

              {/* STATUS */}
              <View style={styles.statusCol}>
                <View
                  style={[
                    styles.statusBadge,
                    t.status === 'RESOLVED'
                      ? styles.stResolved
                      : t.status === 'IN PROGRESS'
                      ? styles.stInProgress
                      : styles.stOpen,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      t.status === 'RESOLVED'
                        ? styles.stTextResolved
                        : t.status === 'IN PROGRESS'
                        ? styles.stTextInProgress
                        : styles.stTextOpen,
                    ]}
                  >
                    {t.status}
                  </Text>
                </View>
              </View>

              {/* ACTION */}
              <View style={styles.actionCol}>
                <TouchableOpacity
                  style={styles.respondBtn}
                  onPress={() => setSelectedTicket(t)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.respondBtnText}>Respond</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* PAGINATION */}
        <View style={styles.paginationRow}>
          <Text style={styles.showingText}>Showing {filteredTickets.length} of 24 tickets</Text>
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
            <TouchableOpacity style={styles.pageArrowBtn} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={14} color="#6E6663" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* TICKET RESPONSE MODAL */}
      <Modal
        visible={!!selectedTicket}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedTicket(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSelectedTicket(null)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Respond to {selectedTicket?.ticketId}</Text>
            <Text style={styles.modalSub}>
              {selectedTicket?.subject} ({selectedTicket?.submitter} • {selectedTicket?.role})
            </Text>

            <View style={styles.descBox}>
              <Text style={styles.descHeader}>Issue Description:</Text>
              <Text style={styles.descBody}>{selectedTicket?.description}</Text>
            </View>

            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFieldLabel}>Coordinator Support Reply</Text>
              <TextInput
                style={styles.modalTextArea}
                placeholder="Type official support response..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                value={responseText}
                onChangeText={setResponseText}
              />
            </View>

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.sendResponseBtn}
                onPress={handleSendResponse}
                activeOpacity={0.88}
              >
                <Ionicons name="send" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.sendResponseText}>Dispatch Support Reply</Text>
              </TouchableOpacity>

              {selectedTicket?.status !== 'RESOLVED' && (
                <TouchableOpacity
                  style={styles.resolveModalBtn}
                  onPress={() => selectedTicket && handleResolveTicket(selectedTicket.id)}
                  activeOpacity={0.88}
                >
                  <Ionicons name="checkmark-done" size={16} color="#16A34A" style={{ marginRight: 6 }} />
                  <Text style={styles.resolveModalText}>Mark as Resolved</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.cancelModalBtn}
              onPress={() => setSelectedTicket(null)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelModalText}>Close</Text>
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
  pageHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  breadcrumbText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 4,
  },
  pageSub: {
    fontSize: 13,
    color: '#6E6663',
    lineHeight: 18,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
  },
  metricVal: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1F2937',
  },
  metricSub: {
    fontSize: 10,
    fontWeight: '700',
  },
  searchFilterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
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
  filterDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  dropdownValueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  searchBoxWrapper: {
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
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1F2937',
  },
  ticketsTableCard: {
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
  },
  thCol: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
  },
  trRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#FAF7F5',
    gap: 8,
  },
  idCol: {
    flex: 1.2,
    minWidth: 90,
  },
  ticketIdText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
  },
  timeText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 1,
  },
  subjectCol: {
    flex: 2,
    minWidth: 180,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
  },
  categorySubText: {
    fontSize: 11,
    color: '#8C531B',
    marginTop: 1,
  },
  submitterCol: {
    flex: 1.4,
    minWidth: 110,
  },
  submitterName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  submitterRole: {
    fontSize: 10,
    color: '#6E6663',
  },
  priorityCol: {
    flex: 1.2,
    minWidth: 90,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  pUrgent: {
    backgroundColor: '#FEE2E2',
  },
  pHigh: {
    backgroundColor: '#FFF0E6',
  },
  pMedium: {
    backgroundColor: '#FEF3C7',
  },
  pLow: {
    backgroundColor: '#F3F4F6',
  },
  priorityText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  pTextUrgent: {
    color: '#DC2626',
  },
  pTextHigh: {
    color: '#D97706',
  },
  pTextMedium: {
    color: '#B45309',
  },
  pTextLow: {
    color: '#4B5563',
  },
  statusCol: {
    flex: 1.2,
    minWidth: 100,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  stResolved: {
    backgroundColor: '#DCFCE7',
  },
  stInProgress: {
    backgroundColor: '#E0F2FE',
  },
  stOpen: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  stTextResolved: {
    color: '#15803D',
  },
  stTextInProgress: {
    color: '#0369A1',
  },
  stTextOpen: {
    color: '#B45309',
  },
  actionCol: {
    flex: 1,
    minWidth: 80,
    alignItems: 'flex-end',
  },
  respondBtn: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  respondBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
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
    maxWidth: 440,
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
  descBox: {
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  descHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
    marginBottom: 4,
  },
  descBody: {
    fontSize: 13,
    color: '#1F2937',
    lineHeight: 18,
  },
  modalFormGroup: {
    marginBottom: 16,
  },
  modalFieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  modalTextArea: {
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    minHeight: 80,
    padding: 12,
    fontSize: 13,
    color: '#1F2937',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  modalActionsRow: {
    gap: 8,
    marginBottom: 8,
  },
  sendResponseBtn: {
    flexDirection: 'row',
    height: 46,
    backgroundColor: '#D97706',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendResponseText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  resolveModalBtn: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#DCFCE7',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resolveModalText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803D',
  },
  cancelModalBtn: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelModalText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6663',
  },
});
