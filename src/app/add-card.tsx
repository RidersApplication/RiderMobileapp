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
  Switch,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../context/user-context';

export default function AddCardScreen() {
  const router = useRouter();
  const { addSavedCard } = useUser();

  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveForFuture, setSaveForFuture] = useState(true);

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [addedLast4, setAddedLast4] = useState('5824');

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 16);
    const parts = cleaned.match(/.{1,4}/g);
    return parts ? parts.join(' ') : cleaned;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const handleAddCard = () => {
    const cleanNum = cardNumber.replace(/\s+/g, '');
    if (cleanNum.length < 12) {
      Alert.alert('Validation Error', 'Please enter a valid card number.');
      return;
    }
    if (!cardholderName.trim()) {
      Alert.alert('Validation Error', 'Please enter the cardholder name.');
      return;
    }
    if (expiryDate.length < 4) {
      Alert.alert('Validation Error', 'Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (cvv.length < 3) {
      Alert.alert('Validation Error', 'Please enter a valid 3 or 4 digit CVV.');
      return;
    }

    const last4 = cleanNum.slice(-4) || '5824';
    const brand = cleanNum.startsWith('4') ? 'VISA' : cleanNum.startsWith('5') ? 'MASTERCARD' : 'CARD';

    addSavedCard({
      last4,
      brand,
      expiry: expiryDate,
      cardholder: cardholderName.trim(),
    });

    setAddedLast4(last4);
    setSuccessModalVisible(true);
  };

  const handleBackToPaymentMethods = () => {
    setSuccessModalVisible(false);
    router.replace('/payment-methods' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
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
          {/* Bank-Grade Security Top Card */}
          <View style={styles.securityCard}>
            <View style={styles.securityIconBadge}>
              <Ionicons name="shield-checkmark" size={24} color="#B8521B" />
            </View>
            <View style={styles.securityTextGroup}>
              <Text style={styles.securityTitle}>Bank-Grade Security</Text>
              <Text style={styles.securityBody}>
                Your payment data is encrypted and managed by industry-leading providers. We never store your full card details on our servers.
              </Text>
            </View>
          </View>

          {/* Card Input Form Card */}
          <View style={styles.formCard}>
            {/* Card Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="card-outline" size={20} color="#7F7774" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={cardNumber}
                  onChangeText={(t) => setCardNumber(formatCardNumber(t))}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#C4BCB9"
                  keyboardType="number-pad"
                  maxLength={19}
                />
              </View>
            </View>

            {/* Cardholder Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cardholder Name</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#C4BCB9"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Expiry Date & CVV Row */}
            <View style={styles.rowTwoInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.textInput}
                    value={expiryDate}
                    onChangeText={(t) => setExpiryDate(formatExpiry(t))}
                    placeholder="MM/YY"
                    placeholderTextColor="#C4BCB9"
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.cvvLabelRow}>
                  <Text style={styles.label}>CVV</Text>
                  <TouchableOpacity onPress={() => Alert.alert('CVV Code', 'The 3 or 4 digit code on the back of your card.')}>
                    <Ionicons name="help-circle-outline" size={14} color="#7F7774" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.textInput}
                    value={cvv}
                    onChangeText={(t) => setCvv(t.replace(/[^0-9]/g, ''))}
                    placeholder="***"
                    placeholderTextColor="#C4BCB9"
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            {/* Save Card Switch Row */}
            <View style={styles.switchRow}>
              <View style={styles.switchTextGroup}>
                <Text style={styles.switchTitle}>Save Card for Future Use</Text>
                <Text style={styles.switchSub}>Pay faster on your next logistics booking</Text>
              </View>
              <Switch
                value={saveForFuture}
                onValueChange={setSaveForFuture}
                trackColor={{ false: '#E5DED9', true: '#F07D3B' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Add Card Action Button */}
            <TouchableOpacity
              style={styles.addCardButton}
              onPress={handleAddCard}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={22} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.addCardButtonText}>Add Card</Text>
            </TouchableOpacity>

            {/* Footer Encrypted Transaction Note */}
            <View style={styles.secureFooter}>
              <Ionicons name="lock-closed" size={13} color="#7F7774" style={{ marginRight: 6 }} />
              <Text style={styles.secureFooterText}>Secure encrypted transaction</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Card Added Success Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={successModalVisible}
        onRequestClose={handleBackToPaymentMethods}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-circle" size={48} color="#16A34A" />
            </View>

            <Text style={styles.successModalTitle}>Card Added Successfully!</Text>
            <Text style={styles.successModalMessage}>
              Your card ending in **** {addedLast4} has been encrypted and saved to your payment methods.
            </Text>

            <TouchableOpacity
              style={styles.backToMethodsBtn}
              onPress={handleBackToPaymentMethods}
              activeOpacity={0.85}
            >
              <Text style={styles.backToMethodsBtnText}>Back to Payment Methods</Text>
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
  securityCard: {
    backgroundColor: '#FFF0EC',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  securityIconBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  securityTextGroup: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  securityBody: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 17,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3E3735',
    marginBottom: 8,
  },
  cvvLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 18,
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1614',
  },
  rowTwoInputs: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  switchTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  switchTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 2,
  },
  switchSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
  },
  addCardButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addCardButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  secureFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secureFooterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
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
    marginBottom: 8,
    textAlign: 'center',
  },
  successModalMessage: {
    fontSize: 13,
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
  },
  backToMethodsBtn: {
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
  backToMethodsBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
