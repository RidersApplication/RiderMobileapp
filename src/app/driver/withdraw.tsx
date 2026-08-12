import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export interface BankAccountItem {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export default function WithdrawFundsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [totalBalance, setTotalBalance] = useState(1482500);
  const [amount, setAmount] = useState('5,000.00');
  const [selectedBankId, setSelectedBankId] = useState('bank-1');

  // Result Modals state
  const [transactionStatus, setTransactionStatus] = useState<'NONE' | 'SUCCESS' | 'FAILED'>('NONE');
  const [failureMessage, setFailureMessage] = useState('');

  const [bankAccounts, setBankAccounts] = useState<BankAccountItem[]>([
    {
      id: 'bank-1',
      bankName: 'Access Bank',
      accountNumber: '8901',
      accountName: 'oohn Mbe',
    },
    {
      id: 'bank-2',
      bankName: 'Zenith Bank',
      accountNumber: '4321',
      accountName: 'oohn Mbe',
    },
  ]);

  // Check if a new bank account was just added from add-bank screen
  useEffect(() => {
    if (params.newBankAdded === 'true' && params.newAccountNum) {
      const newBank: BankAccountItem = {
        id: `bank-${Date.now()}`,
        bankName: (params.newBankName as string) || 'GTBank',
        accountNumber: (params.newAccountNum as string) || '9920',
        accountName: (params.newAccountName as string) || 'Driver Logistics',
      };

      setBankAccounts((prev) => {
        if (prev.some((b) => b.accountNumber === newBank.accountNumber)) {
          return prev;
        }
        return [newBank, ...prev];
      });
      setSelectedBankId(newBank.id);
    }
  }, [params.newBankAdded, params.newAccountNum, params.newBankName, params.newAccountName]);

  const handleWithdrawPress = () => {
    const numericAmount = parseFloat(amount.replace(/,/g, ''));

    if (isNaN(numericAmount) || numericAmount < 1000) {
      setFailureMessage('Minimum withdrawal amount is ₦1,000.00. Please enter a valid amount.');
      setTransactionStatus('FAILED');
      return;
    }

    if (numericAmount > totalBalance) {
      setFailureMessage('Transaction failed. Entered amount exceeds available wallet balance.');
      setTransactionStatus('FAILED');
      return;
    }

    // Success case
    setTotalBalance((prev) => prev - numericAmount);
    setTransactionStatus('SUCCESS');
  };

  const selectedBankObj = bankAccounts.find((b) => b.id === selectedBankId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Withdraw Funds</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* TOTAL BALANCE CARD */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceValue}>
            ₦{totalBalance.toLocaleString('en-NG')}
          </Text>

          <View style={styles.secureBadge}>
            <Ionicons name="shield-checkmark" size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.secureBadgeText}>SECURE WALLET</Text>
          </View>
        </View>

        {/* ENTER AMOUNT SECTION */}
        <Text style={styles.inputSectionLabel}>Enter Amount</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>₦</Text>
          <TextInput
            style={styles.amountTextInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor="#C4C4C4"
          />
        </View>
        <View style={styles.minNoteRow}>
          <Ionicons name="information-circle-outline" size={14} color="#7F7774" style={{ marginRight: 4 }} />
          <Text style={styles.minNoteText}>Minimum withdrawal amount is ₦1,000.00</Text>
        </View>

        {/* SELECT BANK ACCOUNT SECTION */}
        <Text style={styles.sectionHeading}>Select Bank Account</Text>

        <View style={styles.bankAccountsList}>
          {bankAccounts.map((bank) => {
            const isSelected = selectedBankId === bank.id;
            return (
              <TouchableOpacity
                key={bank.id}
                style={[
                  styles.bankAccountCard,
                  isSelected && styles.bankAccountCardSelected,
                ]}
                onPress={() => setSelectedBankId(bank.id)}
                activeOpacity={0.85}
              >
                <View style={styles.bankIconCircle}>
                  <MaterialCommunityIcons name="bank-outline" size={22} color="#8C531B" />
                </View>

                <View style={styles.bankTextCol}>
                  <Text style={styles.bankNameText}>{bank.bankName}</Text>
                  <Text style={styles.accountNumberText}>
                    •••• {bank.accountNumber} • {bank.accountName}
                  </Text>
                </View>

                <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                  {isSelected && <Ionicons name="checkmark-sharp" size={14} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ADD NEW BANK ACCOUNT BUTTON */}
        <TouchableOpacity
          style={styles.addBankBtn}
          onPress={() => router.push('/driver/add-bank' as any)}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle-outline" size={20} color="#8C531B" style={{ marginRight: 8 }} />
          <Text style={styles.addBankBtnText}>Add New Bank Account</Text>
        </TouchableOpacity>

        {/* WITHDRAWAL SUMMARY NOTE CARD */}
        <View style={styles.summaryNoteCard}>
          <View style={styles.receiptIconBox}>
            <MaterialCommunityIcons name="receipt" size={20} color="#8C531B" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.summaryTitleText}>
              You are withdrawing ₦{amount || '0.00'} to {selectedBankObj?.bankName || 'Access Bank'}.
            </Text>
            <View style={styles.timeNoteRow}>
              <Ionicons name="time-outline" size={13} color="#8C531B" style={{ marginRight: 4 }} />
              <Text style={styles.timeNoteText}>
                WITHDRAWALS ARE PROCESSED WITHIN A SHORT TIME.
              </Text>
            </View>
          </View>
        </View>

        {/* WITHDRAW PRIMARY BUTTON */}
        <TouchableOpacity
          style={styles.submitWithdrawBtn}
          onPress={handleWithdrawPress}
          activeOpacity={0.88}
        >
          <Text style={styles.submitWithdrawText}>Withdraw</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* TRANSACTION SUCCESSFUL MODAL */}
      <Modal
        visible={transactionStatus === 'SUCCESS'}
        transparent
        animationType="fade"
        onRequestClose={() => setTransactionStatus('NONE')}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.resultModalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-sharp" size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.resultTitleText}>Transaction Successful!</Text>
            <Text style={styles.resultSubText}>
              ₦{amount} has been successfully transferred to your {selectedBankObj?.bankName || 'bank'} account (••••{selectedBankObj?.accountNumber}).
            </Text>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => {
                setTransactionStatus('NONE');
                router.push({
                  pathname: '/driver/wallet',
                  params: {
                    withdrawnAmount: amount.replace(/,/g, ''),
                    withdrawnBank: selectedBankObj?.bankName || 'Access Bank',
                  },
                } as any);
              }}
              activeOpacity={0.88}
            >
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* TRANSACTION FAILED MODAL */}
      <Modal
        visible={transactionStatus === 'FAILED'}
        transparent
        animationType="fade"
        onRequestClose={() => setTransactionStatus('NONE')}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.resultModalCard}>
            <View style={styles.failedIconCircle}>
              <Ionicons name="close-sharp" size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.resultTitleText}>Transaction Failed</Text>
            <Text style={styles.resultSubText}>{failureMessage}</Text>

            <TouchableOpacity
              style={styles.tryAgainBtn}
              onPress={() => setTransactionStatus('NONE')}
              activeOpacity={0.88}
            >
              <Text style={styles.tryAgainText}>Please try again</Text>
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
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  searchBtn: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: '#F07D3B',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  balanceValue: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  secureBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  inputSectionLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBE5E3',
    borderRadius: 20,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8C531B',
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  minNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  minNoteText: {
    fontSize: 12,
    color: '#7F7774',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 14,
  },
  bankAccountsList: {
    gap: 12,
    marginBottom: 14,
  },
  bankAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#F3ECE9',
  },
  bankAccountCardSelected: {
    borderColor: '#8C531B',
  },
  bankIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bankTextCol: {
    flex: 1,
  },
  bankNameText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  accountNumberText: {
    fontSize: 12,
    color: '#7F7774',
    marginTop: 2,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    backgroundColor: '#8C531B',
    borderColor: '#8C531B',
  },
  addBankBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    height: 52,
    borderWidth: 1,
    borderColor: '#FFE8DE',
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  addBankBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#8C531B',
  },
  summaryNoteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  receiptIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryTitleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 18,
  },
  timeNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeNoteText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.3,
  },
  submitWithdrawBtn: {
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
  submitWithdrawText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* MODAL OVERLAY & RESULT CARDS */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  resultModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  failedIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitleText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultSubText: {
    fontSize: 14,
    color: '#6E6663',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  doneBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#0D9488',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tryAgainBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#EF4444',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
