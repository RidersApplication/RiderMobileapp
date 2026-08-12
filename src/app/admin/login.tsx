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

export default function AdminLoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('admin@riders.logistics');
  const [token, setToken] = useState('••••••••');
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitializeSession = () => {
    if (!email || !token) {
      Alert.alert('Authentication Error', 'Terminal ID and Access Token are required.');
      return;
    }

    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      router.push('/admin/dashboard' as any);
    }, 800);
  };

  const handleResetLink = () => {
    Alert.alert(
      'Reset Access Token',
      'A secure access token reset link has been dispatched to admin@riders.logistics.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoGridIcon}>
            <MaterialCommunityIcons name="view-grid" size={20} color="#F07D3B" />
          </View>
          <Text style={styles.logoText}>RIDERS</Text>
        </View>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => router.replace('/' as any)}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={16} color="#8C531B" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 12, fontWeight: '800', color: '#8C531B' }}>Go Back to Main Page</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Secure{'\n'}Node Entry</Text>
          <Text style={styles.heroSub}>
            Access the central Riders logistics command and terminal management interface.
          </Text>
        </View>

        {/* LOGIN FORM CARD */}
        <View style={styles.loginCard}>
          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>TERMINAL ID / EMAIL</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.tokenHeaderRow}>
              <Text style={styles.fieldLabel}>ACCESS TOKEN</Text>
              <TouchableOpacity onPress={handleResetLink} activeOpacity={0.7}>
                <Text style={styles.resetLinkText}>RESET LINK</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                value={token}
                onChangeText={setToken}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.initBtn}
            onPress={handleInitializeSession}
            disabled={isInitializing}
            activeOpacity={0.88}
          >
            {isInitializing ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <View style={styles.initBtnContent}>
                <Text style={styles.initBtnText}>INITIALIZE SESSION</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerCopyright}>© 2024 RIDERS</Text>

        <View style={styles.footerLinksRow}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.footerLink}>PRIVACY POLICY</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.footerLink}>TERMS OF SERVICE</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.footerLink}>HELP CENTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F5',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoGridIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1F2937',
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroSection: {
    maxWidth: 480,
    width: '100%',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#1F2937',
    lineHeight: 40,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
  },
  loginCard: {
    maxWidth: 480,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  formGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  tokenHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resetLinkText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.5,
  },
  inputBox: {
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  textInput: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  initBtn: {
    height: 54,
    backgroundColor: '#D97706',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#D97706',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  initBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  backMainAppCardBtn: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#FFF0E6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F07D3B',
  },
  backMainAppCardText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#8C531B',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3ECE9',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerCopyright: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  footerLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLink: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.5,
  },
  footerDot: {
    fontSize: 10,
    color: '#D1D5DB',
  },
});
