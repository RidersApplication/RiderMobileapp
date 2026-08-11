import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../context/user-context';

const QUICK_AMOUNTS = [1000, 2000, 5000, 10000];

export default function AddFundsScreen() {
  const router = useRouter();
  const { walletBalance, topUpWallet } = useUser();

  const [amountInput, setAmountInput] = useState<string>('5000');
  const [selectedMethod, setSelectedMethod] = useState<'saved' | 'debit' | 'bank'>('saved');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [topUpSuccessAmount, setTopUpSuccessAmount] = useState<number>(5000);

  const numericAmount = Number(amountInput.replace(/[^0-9]/g, '')) || 0;

  const handleSelectQuickAmount = (val: number) => {
    setAmountInput(val.toString());
  };

  const handleTopUp = () => {
    if (numericAmount < 1000) {
      Alert.alert('Invalid Amount', 'Minimum top-up amount is ₦1,000.00');
      return;
    }

    const methodLabel =
      selectedMethod === 'saved'
        ? 'Visa Card (...4567)'
        : selectedMethod === 'debit'
        ? 'Debit Card'
        : 'Bank Transfer';

    topUpWallet(numericAmount, methodLabel);
    setTopUpSuccessAmount(numericAmount);
    setSuccessModalVisible(true);
  };

  const handleBackToWallet = () => {
    setSuccessModalVisible(false);
    router.replace('/wallet' as any);
  };

  const formatNaira = (val: number) => `₦${val.toLocaleString('en-NG')}`;

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
        <Text style={styles.headerTitle}>Add Funds</Text>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Current Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>
              ₦ {walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>

          {/* Funding Amount Input Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How much do you want to fund?</Text>
            <View style={styles.amountInputWrap}>
              <Text style={styles.nairaSymbol}>₦</Text>
              <TextInput
                style={styles.amountInput}
                value={amountInput}
                onChangeText={(val) => setAmountInput(val.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                placeholder="5000"
                placeholderTextColor="#A09895"
              />
            </View>
            <Text style={styles.minInfoText}>
              <Ionicons name="information-circle-outline" size={13} color="#7F7774" /> Minimum amount is ₦1,000.00
            </Text>

            {/* Quick Amount Pills */}
            <View style={styles.quickPillsRow}>
              {QUICK_AMOUNTS.map((val) => {
                const isSelected = numericAmount === val;
                return (
                  <TouchableOpacity
                    key={val}
                    style={[styles.quickPill, isSelected && styles.quickPillSelected]}
                    onPress={() => handleSelectQuickAmount(val)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.quickPillText, isSelected && styles.quickPillTextSelected]}>
                      {formatNaira(val)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Payment Method Section */}
          <View style={styles.section}>
            <View style={styles.methodHeaderRow}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <TouchableOpacity onPress={() => Alert.alert('Add Card', 'Enter details for new card')}>
                <Text style={styles.addNewCardText}>Add New Card</Text>
              </TouchableOpacity>
            </View>

            {/* Method Option 1: Saved Card */}
            <TouchableOpacity
              style={[styles.methodCard, selectedMethod === 'saved' && styles.methodCardSelected]}
              onPress={() => setSelectedMethod('saved')}
              activeOpacity={0.85}
            >
              <View style={styles.visaBox}>
                <Text style={styles.visaText}>VISA</Text>
              </View>
              <View style={styles.methodTextGroup}>
                <Text style={styles.methodTitle}>Saved Card</Text>
                <Text style={styles.methodSub}>•••• 4567</Text>
              </View>
              <Ionicons
                name={selectedMethod === 'saved' ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={selectedMethod === 'saved' ? '#B8521B' : '#C4BCB9'}
              />
            </TouchableOpacity>

            {/* Method Option 2: Debit Card */}
            <TouchableOpacity
              style={[styles.methodCard, selectedMethod === 'debit' && styles.methodCardSelected]}
              onPress={() => setSelectedMethod('debit')}
              activeOpacity={0.85}
            >
              <View style={styles.methodIconBox}>
                <Ionicons name="card-outline" size={20} color="#7F7774" />
              </View>
              <View style={styles.methodTextGroup}>
                <Text style={styles.methodTitle}>Debit Card</Text>
                <Text style={styles.methodSub}>Pay with any Mastercard or Verve</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#C4BCB9" />
            </TouchableOpacity>

            {/* Method Option 3: Bank Transfer */}
            <TouchableOpacity
              style={[styles.methodCard, selectedMethod === 'bank' && styles.methodCardSelected]}
              onPress={() => setSelectedMethod('bank')}
              activeOpacity={0.85}
            >
              <View style={styles.methodIconBox}>
                <Ionicons name="business-outline" size={20} color="#7F7774" />
              </View>
              <View style={styles.methodTextGroup}>
                <Text style={styles.methodTitle}>Bank Transfer</Text>
                <Text style={styles.methodSub}>Fast secure bank deposit</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#C4BCB9" />
            </TouchableOpacity>
          </View>

          {/* Transaction Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>TRANSACTION SUMMARY</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount to Fund</Text>
              <Text style={styles.summaryValue}>{formatNaira(numericAmount)}.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Selected Method</Text>
              <Text style={styles.summaryValue}>
                {selectedMethod === 'saved'
                  ? 'Visa Card (...4567)'
                  : selectedMethod === 'debit'
                  ? 'Debit Card'
                  : 'Bank Transfer'}
              </Text>
            </View>
            <View style={[styles.summaryRow, { borderBottomWidth: 0, marginTop: 4 }]}>
              <Text style={[styles.summaryLabel, { color: '#1D1614', fontWeight: '800' }]}>
                Total to Pay
              </Text>
              <Text style={styles.totalPayValue}>{formatNaira(numericAmount)}.00</Text>
            </View>
          </View>

          {/* Top Up Wallet Action Button */}
          <TouchableOpacity
            style={styles.topUpButton}
            onPress={handleTopUp}
            activeOpacity={0.85}
          >
            <Text style={styles.topUpButtonText}>Top Up Wallet</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Top Up Successful Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={successModalVisible}
        onRequestClose={handleBackToWallet}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-circle" size={48} color="#16A34A" />
            </View>

            <Text style={styles.successModalTitle}>Top Up Successful!</Text>
            <Text style={styles.successAmountText}>
              + ₦{topUpSuccessAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Text>

            <Text style={styles.successModalMessage}>
              Your wallet balance has been updated successfully. You can now use your balance for rides and deliveries.
            </Text>

            <TouchableOpacity
              style={styles.backToWalletBtn}
              onPress={handleBackToWallet}
              activeOpacity={0.85}
            >
              <Text style={styles.backToWalletBtnText}>Back to Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: '#F07D3B',
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 12,
  },
  amountInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 18,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  nairaSymbol: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3E3735',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 26,
    fontWeight: '800',
    color: '#1D1614',
  },
  minInfoText: {
    fontSize: 12,
    color: '#7F7774',
    fontWeight: '500',
    marginBottom: 16,
  },
  quickPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickPill: {
    flex: 1,
    minWidth: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  quickPillSelected: {
    backgroundColor: '#FFEADF',
    borderWidth: 1.5,
    borderColor: '#F07D3B',
  },
  quickPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1614',
  },
  quickPillTextSelected: {
    color: '#994514',
    fontWeight: '800',
  },
  methodHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addNewCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#994514',
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  methodCardSelected: {
    borderColor: '#B8521B',
  },
  visaBox: {
    width: 44,
    height: 30,
    backgroundColor: '#1E1E1E',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  visaText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  methodIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5EFEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  methodTextGroup: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
  },
  methodSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: '#FFF0EC',
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
  },
  summaryCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.04)',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6E6663',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1614',
  },
  totalPayValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#A04D17',
  },
  topUpButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  topUpButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  /* SUCCESS MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 26,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successModalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  successAmountText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D9488',
    marginBottom: 12,
  },
  successModalMessage: {
    fontSize: 13,
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
  },
  backToWalletBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  backToWalletBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
