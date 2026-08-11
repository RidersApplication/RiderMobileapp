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
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser, SavedCardItem } from '../context/user-context';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { savedCards, deleteSavedCard } = useUser();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<SavedCardItem | null>(null);

  const handleOpenAddCard = () => {
    router.push('/add-card' as any);
  };

  const promptDeleteCard = (card: SavedCardItem) => {
    setCardToDelete(card);
    setDeleteModalVisible(true);
  };

  const confirmDeleteCard = () => {
    if (cardToDelete) {
      deleteSavedCard(cardToDelete.id);
    }
    setDeleteModalVisible(false);
    setCardToDelete(null);
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity style={styles.searchHeaderIcon} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Secure Transactions Golden Banner */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>Secure Transactions</Text>
          <Text style={styles.bannerSubtitle}>
            Manage your premium logistics financing options with industrial-grade security and real-time movement tracking.
          </Text>
        </View>

        {/* Saved Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Card</Text>

          {savedCards.length === 0 ? (
            <View style={styles.emptyCardBox}>
              <Ionicons name="card-outline" size={32} color="#C4BCB9" />
              <Text style={styles.emptyCardText}>No saved cards found.</Text>
            </View>
          ) : (
            savedCards.map((card) => (
              <View key={card.id} style={styles.savedCardItem}>
                <View style={styles.savedCardAccentBorder} />
                <View style={styles.savedCardContent}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.cardIconBox}>
                      <Ionicons name="card-outline" size={18} color="#7F7774" />
                    </View>
                    <TouchableOpacity
                      onPress={() => promptDeleteCard(card)}
                      activeOpacity={0.7}
                      style={styles.trashBtn}
                    >
                      <Ionicons name="trash-outline" size={18} color="#A09895" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.cardNumberText}>
                    * * * * &nbsp; {card.last4}
                  </Text>

                  <View style={styles.cardBottomRow}>
                    <View>
                      <Text style={styles.smallMetaLabel}>EXPIRY DATE</Text>
                      <Text style={styles.metaValue}>{card.expiry}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.smallMetaLabel}>BRAND</Text>
                      <Text style={styles.brandValue}>{card.brand}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Add New Card Option */}
        <TouchableOpacity
          style={styles.addNewCardCard}
          onPress={handleOpenAddCard}
          activeOpacity={0.85}
        >
          <View style={styles.plusIconCircle}>
            <Ionicons name="add" size={22} color="#B8521B" />
          </View>

          <View style={styles.addCardTextGroup}>
            <Text style={styles.addCardTitle}>Add New Card</Text>
            <Text style={styles.addCardSub}>
              Securely link a new Visa, Mastercard, or AMEX for instant freight payments.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Mobile Money Option */}
        <TouchableOpacity style={styles.optionCard} activeOpacity={0.8}>
          <View style={styles.optionIconBox}>
            <Ionicons name="phone-portrait-outline" size={20} color="#0D9488" />
          </View>
          <View style={styles.addCardTextGroup}>
            <Text style={styles.optionTitle}>Mobile Money</Text>
            <Text style={styles.optionSub}>M-Pesa, Orange, or MTN</Text>
          </View>
        </TouchableOpacity>

        {/* Bank Transfer Option */}
        <TouchableOpacity style={styles.optionCard} activeOpacity={0.8}>
          <View style={styles.optionIconBox}>
            <Ionicons name="business-outline" size={20} color="#B8521B" />
          </View>
          <View style={styles.addCardTextGroup}>
            <Text style={styles.optionTitle}>Bank Transfer</Text>
            <Text style={styles.optionSub}>Direct SWIFT/ACH deposit</Text>
          </View>
        </TouchableOpacity>

        {/* Financial Grade Encryption Banner */}
        <View style={styles.encryptionCard}>
          <View style={styles.lockBadge}>
            <Ionicons name="reload-circle-outline" size={24} color="#FFFFFF" />
          </View>

          <View style={styles.addCardTextGroup}>
            <Text style={styles.encryptionTitle}>Financial Grade Encryption</Text>
            <Text style={styles.encryptionSub}>
              Your payment data is encrypted and never stored on our local servers.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Delete Card Confirmation Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.deleteIconCircle}>
              <Ionicons name="trash" size={28} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Remove Saved Card?</Text>
            <Text style={styles.modalCopy}>
              Are you sure you want to remove card ending in **** {cardToDelete?.last4}?
            </Text>
            <Pressable onPress={confirmDeleteCard} style={styles.confirmDeleteBtn}>
              <Text style={styles.confirmDeleteText}>Yes, Remove Card</Text>
            </Pressable>
            <Pressable onPress={() => setDeleteModalVisible(false)} style={styles.cancelDeleteBtn}>
              <Text style={styles.cancelDeleteText}>Cancel</Text>
            </Pressable>
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
  searchHeaderIcon: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  bannerCard: {
    backgroundColor: '#C45415',
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    shadowColor: '#C45415',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 12,
  },
  emptyCardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  emptyCardText: {
    fontSize: 14,
    color: '#7F7774',
    marginTop: 8,
  },
  savedCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  savedCardAccentBorder: {
    width: 6,
    backgroundColor: '#B8521B',
  },
  savedCardContent: {
    flex: 1,
    padding: 18,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIconBox: {
    width: 38,
    height: 26,
    backgroundColor: '#F5EFEB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashBtn: {
    padding: 4,
  },
  cardNumberText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
    letterSpacing: 2,
    marginBottom: 18,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  smallMetaLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#9A928F',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1D1614',
  },
  brandValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E3A8A',
    letterSpacing: 1,
  },
  addNewCardCard: {
    backgroundColor: '#FFF0EC',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  plusIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFE3D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  addCardTextGroup: {
    flex: 1,
  },
  addCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 3,
  },
  addCardSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 17,
  },
  optionCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
  },
  optionSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F7774',
    marginTop: 2,
  },
  encryptionCard: {
    backgroundColor: '#1E1B18',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  lockBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#B8521B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  encryptionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  encryptionSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A09895',
    lineHeight: 16,
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
    maxWidth: 350,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
  },
  deleteIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    color: '#1D1614',
    fontSize: 19,
    fontWeight: '800',
  },
  modalCopy: {
    color: '#6E6663',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 22,
  },
  confirmDeleteBtn: {
    width: '100%',
    borderRadius: 22,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmDeleteText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  cancelDeleteBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  cancelDeleteText: {
    color: '#6E6663',
    fontSize: 14,
    fontWeight: '700',
  },
});
