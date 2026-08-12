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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function AddBankAccountScreen() {
  const router = useRouter();

  const [selectedPopularBank, setSelectedPopularBank] = useState('GTB');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [btnState, setBtnState] = useState<'IDLE' | 'LINKING' | 'SUCCESS'>('IDLE');

  const POPULAR_BANKS = [
    { id: 'GTB', code: 'GTB', name: 'GTBank', color: '#E45B25' },
    { id: 'Zenith', code: 'Z', name: 'Zenith', color: '#E11931' },
    { id: 'Access', code: 'A', name: 'Access', color: '#E7841B' },
  ];

  const handleLinkAccount = () => {
    if (!accountNumber || accountNumber.length < 10) {
      Alert.alert(
        'Invalid Account Number',
        'Please enter a valid 10-digit NUBAN account number.'
      );
      return;
    }
    if (!accountName.trim()) {
      Alert.alert(
        'Account Name Required',
        'Please enter the full account name as registered on your bank account.'
      );
      return;
    }

    setBtnState('LINKING');

    setTimeout(() => {
      setBtnState('SUCCESS');

      setTimeout(() => {
        router.push({
          pathname: '/driver/withdraw',
          params: {
            newBankAdded: 'true',
            newBankName: selectedPopularBank === 'GTB' ? 'GTBank' : selectedPopularBank === 'Zenith' ? 'Zenith Bank' : 'Access Bank',
            newAccountNum: accountNumber.slice(-4),
            newAccountName: accountName,
          },
        } as any);
      }, 1000);
    }, 800);
  };

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
          <Ionicons name="arrow-back" size={24} color="#8C531B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Bank Account</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#8C531B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HERO TITLE & SUBTITLE */}
        <Text style={styles.headlineTitle}>Connect Your{'\n'}Local Bank</Text>
        <Text style={styles.headlineSub}>
          Securely link your account for instant logistics settlement.
        </Text>

        {/* PROGRESS INDICATOR BAR */}
        <View style={styles.progressRow}>
          <View style={styles.progressActivePill} />
          <View style={styles.progressInactiveDot} />
        </View>

        {/* POPULAR BANKS SECTION */}
        <View style={styles.popularHeaderRow}>
          <Text style={styles.popularHeadingLabel}>POPULAR BANKS</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popularBanksRow}>
          {POPULAR_BANKS.map((b) => {
            const isSelected = selectedPopularBank === b.id;
            return (
              <TouchableOpacity
                key={b.id}
                style={[
                  styles.popularBankCard,
                  isSelected && styles.popularBankCardSelected,
                ]}
                onPress={() => setSelectedPopularBank(b.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.bankLogoCircle, { backgroundColor: b.color }]}>
                  <Text style={styles.bankLogoText}>{b.code}</Text>
                </View>
                <Text style={styles.bankLogoName}>{b.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FORM INPUTS */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Account Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="0000000000"
              placeholderTextColor="#C4C4C4"
              keyboardType="numeric"
              maxLength={10}
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Account Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="John Doe Logistics"
              placeholderTextColor="#C4C4C4"
              value={accountName}
              onChangeText={setAccountName}
            />
          </View>
        </View>

        {/* MATCHING NOTICE CARD */}
        <View style={styles.noticeCard}>
          <Ionicons name="information-circle" size={20} color="#8C531B" style={{ marginRight: 10 }} />
          <Text style={styles.noticeText}>
            Please ensure the account name matches your registered profile name for faster verification.
          </Text>
        </View>

        {/* LINK BANK ACCOUNT BUTTON WITH STATE CHANGE */}
        <TouchableOpacity
          style={[
            styles.linkButton,
            btnState === 'SUCCESS' && styles.linkButtonSuccess,
          ]}
          onPress={handleLinkAccount}
          disabled={btnState !== 'IDLE'}
          activeOpacity={0.88}
        >
          {btnState === 'LINKING' ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : btnState === 'SUCCESS' ? (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.linkButtonText}>Successful ✓</Text>
            </>
          ) : (
            <>
              <Ionicons name="lock-closed" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.linkButtonText}>Link Bank Account</Text>
            </>
          )}
        </TouchableOpacity>

        {/* SECURITY FOOTER BADGES */}
        <View style={styles.securityRow}>
          <View style={styles.secItem}>
            <Ionicons name="shield-checkmark-outline" size={13} color="#7F7774" style={{ marginRight: 4 }} />
            <Text style={styles.secItemText}>VERIFIED ACCOUNT</Text>
          </View>
          <View style={styles.secDivider} />
          <View style={styles.secItem}>
            <Ionicons name="lock-closed-outline" size={13} color="#7F7774" style={{ marginRight: 4 }} />
            <Text style={styles.secItemText}>PCI-DSS COMPLIANT</Text>
          </View>
        </View>

        <Text style={styles.securitySubtext}>
          Your banking credentials are never stored. Transactions are encrypted with bank-grade 256-bit r r L protocols.
        </Text>
      </ScrollView>
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
    fontSize: 18,
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
  headlineTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1F2937',
    lineHeight: 38,
    marginBottom: 8,
  },
  headlineSub: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 20,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  progressActivePill: {
    width: 48,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F07D3B',
  },
  progressInactiveDot: {
    width: 14,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  popularHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  popularHeadingLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#8C531B',
  },
  popularBanksRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  popularBankCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3ECE9',
  },
  popularBankCardSelected: {
    borderColor: '#8C531B',
    backgroundColor: '#FFF0E6',
  },
  bankLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bankLogoText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  bankLogoName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  formGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#EBE5E3',
    borderRadius: 20,
    height: 56,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 17,
    fontWeight: '700',
    color: '#8C531B',
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF0E6',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#8C531B',
    lineHeight: 18,
  },
  linkButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  linkButtonSuccess: {
    backgroundColor: '#0D9488',
    shadowColor: '#0D9488',
  },
  linkButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  securityRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  secItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secItemText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
  },
  secDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 12,
  },
  securitySubtext: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 10,
  },
});
