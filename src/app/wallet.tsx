import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomTab from '../components/bottom-tab';
import { useUser, TransactionItem } from '../context/user-context';

export default function WalletScreen() {
  const router = useRouter();
  const { walletBalance, transactions } = useUser();
  const [selectedTx, setSelectedTx] = useState<TransactionItem | null>(null);

  const formatNaira = (val: number) => {
    const formatted = Math.abs(val).toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return val < 0 ? `- ₦${formatted}` : `+ ₦${formatted}`;
  };

  const handleAddMoney = () => {
    router.push('/add-funds' as any);
  };

  const handleAddCard = () => {
    router.push('/payment-methods' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity style={styles.searchHeaderIcon} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceAmount}>
            ₦ {walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>

          <View style={styles.walletIconBadge}>
            <Ionicons name="wallet-outline" size={26} color="#FFFFFF" />
          </View>
        </View>

        {/* Add Money Primary Button */}
        <TouchableOpacity
          style={styles.addMoneyBtn}
          onPress={handleAddMoney}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.addMoneyText}>Add Money</Text>
        </TouchableOpacity>

        {/* Payment Methods Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity onPress={handleAddCard}>
            <Text style={styles.seeAllText}>See All &gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.methodsScroll}
        >
          {/* Card 1: Saved Debit Card */}
          <View style={styles.cardItem}>
            <View style={styles.cardItemTop}>
              <View style={styles.cardIconBox}>
                <Ionicons name="card" size={18} color="#7F7774" />
              </View>
              <TouchableOpacity style={styles.cardOptionBtn}>
                <Ionicons name="ellipsis-horizontal" size={18} color="#7F7774" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTypeLabel}>Debit Card</Text>
            <Text style={styles.cardNumber}>•••• •••• •••• 1234</Text>
          </View>

          {/* Card 2: Add New Card Placeholder */}
          <TouchableOpacity
            style={styles.addCardDashed}
            onPress={handleAddCard}
            activeOpacity={0.8}
          >
            <View style={styles.addCardIconCircle}>
              <Ionicons name="add" size={24} color="#F07D3B" />
            </View>
            <Text style={styles.addCardDashedText}>Add Card</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Recent Activity Section */}
        <View style={[styles.sectionHeaderRow, { marginTop: 26 }]}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Ionicons name="options-outline" size={20} color="#1D1614" />
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {transactions.map((tx) => {
            const isTopUp = tx.amount > 0;
            return (
              <TouchableOpacity
                key={tx.id}
                style={styles.activityRow}
                activeOpacity={0.75}
                onPress={() => setSelectedTx(tx)}
              >
                <View style={styles.activityLeft}>
                  <View
                    style={[
                      styles.activityIconCircle,
                      isTopUp ? styles.topupIconBg : styles.paymentIconBg,
                    ]}
                  >
                    {tx.iconType === 'truck' ? (
                      <MaterialCommunityIcons name="truck-delivery-outline" size={22} color="#F07D3B" />
                    ) : tx.iconType === 'bank' ? (
                      <Ionicons name="business-outline" size={20} color="#0D9488" />
                    ) : (
                      <Ionicons name="car-sport-outline" size={22} color="#F07D3B" />
                    )}
                  </View>

                  <View style={styles.activityTextGroup}>
                    <Text style={styles.activityTitle}>{tx.type}</Text>
                    <Text style={styles.activityDate}>{tx.date}</Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.activityAmount,
                    isTopUp ? styles.amountPositive : styles.amountNegative,
                  ]}
                >
                  {formatNaira(tx.amount)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Transaction Details Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={!!selectedTx}
        onRequestClose={() => setSelectedTx(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Transaction Details</Text>
              <TouchableOpacity onPress={() => setSelectedTx(null)}>
                <Ionicons name="close" size={22} color="#59514E" />
              </TouchableOpacity>
            </View>

            {selectedTx && (
              <View style={styles.modalBody}>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Transaction Type</Text>
                  <Text style={styles.modalValue}>{selectedTx.type}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Date & Time</Text>
                  <Text style={styles.modalValue}>{selectedTx.date}</Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Status</Text>
                  <Text style={[styles.modalValue, { color: '#16A34A', fontWeight: '800' }]}>
                    SUCCESSFUL
                  </Text>
                </View>
                <View style={[styles.modalRow, { borderBottomWidth: 0, marginTop: 10 }]}>
                  <Text style={[styles.modalLabel, { fontSize: 16, fontWeight: '800' }]}>
                    Amount
                  </Text>
                  <Text
                    style={[
                      styles.modalValue,
                      {
                        fontSize: 20,
                        fontWeight: '800',
                        color: selectedTx.amount > 0 ? '#0D9488' : '#DC2626',
                      },
                    ]}
                  >
                    {formatNaira(selectedTx.amount)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedTx(null)}
                >
                  <Text style={styles.modalCloseBtnText}>Close Receipt</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <BottomTab activeTab="wallet" />
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
    paddingBottom: 120,
  },
  balanceCard: {
    backgroundColor: '#F07D3B',
    borderRadius: 24,
    padding: 22,
    position: 'relative',
    marginBottom: 20,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    opacity: 0.9,
    marginBottom: 6,
  },
  balanceAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  walletIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMoneyBtn: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addMoneyText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#994514',
  },
  methodsScroll: {
    gap: 14,
  },
  cardItem: {
    width: 220,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 36,
    height: 24,
    backgroundColor: '#F5EFEB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardOptionBtn: {
    padding: 4,
  },
  cardTypeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F7774',
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1D1614',
    letterSpacing: 0.5,
  },
  addCardDashed: {
    width: 140,
    height: 110,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F0D5C7',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBF9',
  },
  addCardIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  addCardDashedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#994514',
  },
  activityList: {
    gap: 12,
  },
  activityRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  paymentIconBg: {
    backgroundColor: '#FFF0EC',
  },
  topupIconBg: {
    backgroundColor: '#CCFBF1',
  },
  activityTextGroup: {
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  activityDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '800',
  },
  amountNegative: {
    color: '#DC2626',
  },
  amountPositive: {
    color: '#0D9488',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5EFEB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
  },
  modalBody: {
    marginTop: 14,
  },
  modalRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFA',
  },
  modalLabel: {
    fontSize: 12,
    color: '#7F7774',
    fontWeight: '600',
  },
  modalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1D1614',
    marginTop: 2,
  },
  modalCloseBtn: {
    marginTop: 20,
    height: 48,
    backgroundColor: '#F07D3B',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});