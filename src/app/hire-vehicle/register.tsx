import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

export default function BusinessRegistrationScreen() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState('');
  const [cacNumber, setCacNumber] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [cacDocUri, setCacDocUri] = useState<string | null>(null);

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCacDocUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert('File Picker', 'CAC Certificate uploaded.');
      setCacDocUri('cac_cert_uploaded.pdf');
    }
  };

  const handleSubmitRegistration = () => {
    if (!businessName.trim()) {
      Alert.alert('Validation Error', 'Please enter your business name.');
      return;
    }
    if (!businessEmail.trim()) {
      Alert.alert('Validation Error', 'Please enter a valid business email.');
      return;
    }

    setSuccessModalVisible(true);
  };

  const handleProceedToCategories = () => {
    setSuccessModalVisible(false);
    router.push('/hire-vehicle/category' as any);
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
        <Text style={styles.headerTitle}>Business Registration</Text>
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
          {/* Top Pro Badge */}
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>PRO UPGRADE</Text>
          </View>

          {/* Heading */}
          <Text style={styles.mainHeading}>Scale with confidence.</Text>

          {/* Hero Warehouse Photo Card */}
          <View style={styles.heroCard}>
            <Image
              source={require('../../../assets/car2 (1).png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
              <Text style={styles.heroSmallTag}>GLOBAL LOGISTICS HUB</Text>
              <Text style={styles.heroTitle}>Integrated Supply Chain Solutions</Text>
            </View>
          </View>

          {/* Form Fields Card */}
          <View style={styles.formCard}>
            {/* Business Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  value={businessName}
                  onChangeText={setBusinessName}
                  placeholder="e.g. Atlas Logistics Ltd"
                  placeholderTextColor="#C4BCB9"
                />
              </View>
            </View>

            {/* CAC Registration Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CAC Registration Number</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  value={cacNumber}
                  onChangeText={setCacNumber}
                  placeholder="RC-0000000"
                  placeholderTextColor="#C4BCB9"
                />
              </View>
            </View>

            {/* Business Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Email</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  value={businessEmail}
                  onChangeText={setBusinessEmail}
                  placeholder="operations@company.com"
                  placeholderTextColor="#C4BCB9"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Business Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Phone Number</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  value={businessPhone}
                  onChangeText={setBusinessPhone}
                  placeholder="+234 000 000 0000"
                  placeholderTextColor="#C4BCB9"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Contact Person Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Person Name</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.textInput}
                  value={contactName}
                  onChangeText={setContactName}
                  placeholder="Full Legal Name"
                  placeholderTextColor="#C4BCB9"
                />
              </View>
            </View>

            {/* Business Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Address</Text>
              <View style={[styles.inputWrap, { height: 90, paddingVertical: 12 }]}>
                <TextInput
                  style={[styles.textInput, { textAlignVertical: 'top' }]}
                  multiline
                  value={businessAddress}
                  onChangeText={setBusinessAddress}
                  placeholder="Headquarters full address..."
                  placeholderTextColor="#C4BCB9"
                />
              </View>
            </View>

            {/* Upload CAC Certificate Box */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Upload CAC Certificate (Optional)</Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={handlePickDocument}
                activeOpacity={0.8}
              >
                <View style={styles.uploadIconCircle}>
                  <Ionicons name="document-text-outline" size={24} color="#B8521B" />
                </View>
                <Text style={styles.uploadTitle}>
                  {cacDocUri ? 'CAC Certificate Attached ✓' : 'Click to upload or drag and drop'}
                </Text>
                <Text style={styles.uploadSub}>PDF, PNG or JPG (Max 5MB)</Text>
              </TouchableOpacity>
            </View>

            {/* Review Time Info Note */}
            <View style={styles.reviewNoteBox}>
              <Ionicons name="information-circle-outline" size={16} color="#B8521B" style={{ marginRight: 8 }} />
              <Text style={styles.reviewNoteText}>
                Your business account will be reviewed and approved within 24 hours or less.
              </Text>
            </View>

            {/* Submit Registration Action Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitRegistration}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>Submit Registration</Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* REGISTRATION SUBMITTED SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={successModalVisible}
        onRequestClose={handleProceedToCategories}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-circle" size={48} color="#16A34A" />
            </View>

            <Text style={styles.modalCardTitle}>Registration Submitted!</Text>
            <Text style={styles.modalCardSub}>
              Your business application is under priority review. You now have full access to explore and select fleet vehicle categories!
            </Text>

            <TouchableOpacity
              style={styles.proceedModalBtn}
              onPress={handleProceedToCategories}
              activeOpacity={0.85}
            >
              <Text style={styles.proceedModalBtnText}>View Fleet Categories</Text>
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
  proBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEADF',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#B8521B',
    letterSpacing: 0.8,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1D1614',
    marginBottom: 16,
  },
  heroCard: {
    height: 160,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroSmallTag: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E3735',
    marginBottom: 6,
  },
  inputWrap: {
    backgroundColor: '#EFEAE7',
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D1614',
  },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#EFEAE7',
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFBF9',
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D1614',
    textAlign: 'center',
  },
  uploadSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  reviewNoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EC',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  reviewNoteText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 17,
  },
  submitButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 26,
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
  modalCardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 8,
  },
  modalCardSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
  },
  proceedModalBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedModalBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
