import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser, SavedLocationItem } from '../context/user-context';

export default function SavedLocationsScreen() {
  const router = useRouter();
  const {
    savedLocations,
    deleteSavedLocation,
  } = useUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<SavedLocationItem | null>(null);

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return savedLocations;
    const query = searchQuery.toLowerCase();
    return savedLocations.filter(
      (loc) =>
        loc.title.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query) ||
        loc.category.toLowerCase().includes(query)
    );
  }, [savedLocations, searchQuery]);

  const homeLocations = useMemo(
    () => filteredLocations.filter((loc) => loc.category === 'Home'),
    [filteredLocations]
  );
  const workLocations = useMemo(
    () => filteredLocations.filter((loc) => loc.category === 'Work'),
    [filteredLocations]
  );
  const othersLocations = useMemo(
    () => filteredLocations.filter((loc) => loc.category === 'Others'),
    [filteredLocations]
  );

  const handleOpenAdd = () => {
    router.push('/add-location' as any);
  };

  const handleOpenEdit = (item: SavedLocationItem) => {
    router.push('/add-location' as any);
  };

  const promptDelete = (item: SavedLocationItem) => {
    setItemToDelete(item);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteSavedLocation(itemToDelete.id);
    }
    setDeleteModalVisible(false);
    setItemToDelete(null);
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
        <Text style={styles.headerTitle}>Saved Locations</Text>
        <TouchableOpacity
          style={styles.searchHeaderIcon}
          activeOpacity={0.7}
          onPress={handleOpenAdd}
        >
          <Ionicons name="search" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Search Bar Input */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#8A7C75" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your addresses..."
            placeholderTextColor="#8A7C75"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* HOME SECTION */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Home</Text>
          <Text style={styles.primaryBaseBadge}>Primary Base</Text>
        </View>
        <View style={styles.cardsGroup}>
          {homeLocations.length === 0 ? (
            <Text style={styles.noItemsText}>No saved home addresses.</Text>
          ) : (
            homeLocations.map((item) => (
              <LocationCard
                key={item.id}
                item={item}
                onEdit={() => handleOpenEdit(item)}
                onDelete={() => promptDelete(item)}
              />
            ))
          )}
        </View>

        {/* WORK SECTION */}
        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Work</Text>
        </View>
        <View style={styles.cardsGroup}>
          {workLocations.length === 0 ? (
            <Text style={styles.noItemsText}>No saved work addresses.</Text>
          ) : (
            workLocations.map((item) => (
              <LocationCard
                key={item.id}
                item={item}
                onEdit={() => handleOpenEdit(item)}
                onDelete={() => promptDelete(item)}
              />
            ))
          )}
        </View>

        {/* OTHERS SECTION */}
        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Others</Text>
        </View>
        <View style={styles.cardsGroup}>
          {othersLocations.length === 0 ? (
            <Text style={styles.noItemsText}>No other saved addresses.</Text>
          ) : (
            othersLocations.map((item) => (
              <LocationCard
                key={item.id}
                item={item}
                onEdit={() => handleOpenEdit(item)}
                onDelete={() => promptDelete(item)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleOpenAdd}
        activeOpacity={0.85}
        accessibilityLabel="Add location"
      >
        <Ionicons name="navigate" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Delete Confirmation Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.deleteIconBox}>
              <Ionicons name="trash" size={28} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Delete Saved Location?</Text>
            <Text style={styles.modalCopy}>
              Are you sure you want to delete &quot;{itemToDelete?.title}&quot;? This action cannot be undone.
            </Text>
            <Pressable onPress={confirmDelete} style={styles.confirmDeleteBtn}>
              <Text style={styles.confirmDeleteText}>Yes, Delete</Text>
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

function LocationCard({
  item,
  onEdit,
  onDelete,
}: {
  item: SavedLocationItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isCyanBg = item.title.includes('Gym') || item.title.includes('Iron');

  return (
    <View style={[styles.card, isCyanBg && styles.cardCyan]}>
      <View
        style={[
          styles.iconBox,
          isCyanBg ? styles.iconBoxCyan : styles.iconBoxPeach,
        ]}
      >
        <Ionicons
          name={
            item.category === 'Home'
              ? 'home'
              : item.category === 'Work'
              ? 'briefcase'
              : isCyanBg
              ? 'fitness'
              : 'cafe'
          }
          size={20}
          color="#3E3735"
        />
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardAddress}>{item.address}</Text>
      </View>

      <View style={styles.actionsColumn}>
        <TouchableOpacity style={styles.actionBtn} onPress={onEdit} activeOpacity={0.7}>
          <Ionicons name="pencil" size={18} color="#4A423F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onDelete} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
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
    paddingBottom: 100,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 22,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1D1614',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
  },
  primaryBaseBadge: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7F7774',
  },
  cardsGroup: {
    gap: 12,
  },
  noItemsText: {
    fontSize: 13,
    color: '#A09895',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardCyan: {
    backgroundColor: '#FFF5F5',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconBoxPeach: {
    backgroundColor: '#FFEADF',
  },
  iconBoxCyan: {
    backgroundColor: '#CFFAFE',
  },
  textGroup: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 3,
  },
  cardAddress: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 17,
  },
  actionsColumn: {
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    padding: 6,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  /* DELETE MODAL STYLES */
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
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  deleteIconBox: {
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
