import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DriverRegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleRegister = () => {
    if (!agreed) {
      Alert.alert('Terms Agreement', 'Please accept the terms and privacy policy to continue.');
      return;
    }
    router.push('/driver/vehicle-category' as any);
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
          <Ionicons name="arrow-back" size={24} color="#F07D3B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Registration</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* MAIN HEADLINE */}
        <Text style={styles.headline}>
          Become a <Text style={styles.orangeText}>Premium</Text> Partner
        </Text>
        <Text style={styles.subHeadline}>
          Join our elite driver network and enjoy 24/7 support with weekly payouts.
        </Text>

        {/* 3 FEATURE PILLS */}
        <View style={styles.featurePillsRow}>
          <View style={styles.featurePill}>
            <MaterialCommunityIcons name="truck-outline" size={22} color="#F07D3B" />
            <Text style={styles.pillText}>Modern Fleet</Text>
          </View>

          <View style={styles.featurePill}>
            <Ionicons name="cash-outline" size={22} color="#F07D3B" />
            <Text style={styles.pillText}>Weekly Pay</Text>
          </View>

          <View style={styles.featurePill}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#F07D3B" />
            <Text style={styles.pillText}>Full Coverage</Text>
          </View>
        </View>

        {/* FORM CONTAINER CARD */}
        <View style={styles.formCard}>
          <View style={styles.formHeaderRow}>
            <Text style={styles.formTitle}>Driver Registration</Text>
            <View style={styles.quickFormBadge}>
              <Text style={styles.quickFormText}>QUICK FORM</Text>
            </View>
          </View>

          {/* FULL NAME */}
          <Text style={styles.inputLabel}>FULL NAME</Text>
          <View style={styles.inputContainer}>
            <Feather name="user" size={18} color="#B8B8B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.textInput}
              placeholder="Full legal name"
              placeholderTextColor="#C4C4C4"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* PHONE NUMBER */}
          <Text style={styles.inputLabel}>PHONE NUMBER</Text>
          <View style={styles.inputContainer}>
            <Feather name="phone" size={18} color="#B8B8B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.textInput}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor="#C4C4C4"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* EMAIL */}
          <Text style={styles.inputLabel}>EMAIL</Text>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={18} color="#B8B8B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.textInput}
              placeholder="name@company.com"
              placeholderTextColor="#C4C4C4"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.inputLabel}>PASSWORD</Text>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={18} color="#B8B8B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.textInput}
              placeholder="••••••••"
              placeholderTextColor="#C4C4C4"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color="#B8B8B8" />
            </TouchableOpacity>
          </View>

          {/* CHECKBOX & TERMS */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text style={styles.termsLabel}>
              I agree to the <Text style={styles.highlightText}>Terms</Text> and{' '}
              <Text style={styles.highlightText}>Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Register as Driver</Text>
          </TouchableOpacity>
        </View>
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
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
  },
  orangeText: {
    color: '#F07D3B',
  },
  subHeadline: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 20,
  },
  featurePillsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  featurePill: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE8DE',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 6,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  quickFormBadge: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  quickFormText: {
    color: '#F07D3B',
    fontSize: 10,
    fontWeight: '800',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6E6663',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F3F1',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 22,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#F07D3B',
    borderColor: '#F07D3B',
  },
  termsLabel: {
    fontSize: 13,
    color: '#6E6663',
    flex: 1,
  },
  highlightText: {
    color: '#F07D3B',
    fontWeight: '700',
  },
  submitBtn: {
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
  submitBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
