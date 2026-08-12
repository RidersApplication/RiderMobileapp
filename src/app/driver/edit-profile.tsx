import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function EditDriverProfileScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('Samuel Green');
  const [email, setEmail] = useState('samuel@email.com');
  const [phone, setPhone] = useState('+234 800 000 0000');
  const [vehicleModel, setVehicleModel] = useState('Toyota Prius 2020');
  const [plateNumber, setPlateNumber] = useState('ABC-1234');
  const [licenseId, setLicenseId] = useState('DL-89021-NG');

  // Avatar state & photo picker modal
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('avatar-1');
  const [showPhotoPickerModal, setShowPhotoPickerModal] = useState(false);

  const AVATAR_OPTIONS = [
    { id: 'avatar-1', title: 'Default Driver Avatar', source: require('../../../assets/driver_avatar.png') },
    { id: 'avatar-2', title: 'Executive Driver Avatar', source: require('../../../assets/driver_avatar.png') },
  ];

  const [saveState, setSaveState] = useState<'IDLE' | 'SAVING' | 'SUCCESS'>('IDLE');

  const handleSaveProfile = () => {
    if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Full Name cannot be empty.');
      return;
    }

    setSaveState('SAVING');

    setTimeout(() => {
      setSaveState('SUCCESS');

      setTimeout(() => {
        router.push({
          pathname: '/driver/profile',
          params: {
            updatedName: fullName,
            updatedEmail: email,
            updatedPhone: phone,
            updatedVehicle: vehicleModel,
            updatedPlate: plateNumber,
            updatedAvatarId: selectedAvatarId,
          },
        } as any);
      }, 1000);
    }, 600);
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

        <Text style={styles.headerTitle}>Edit Driver Profile</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* AVATAR WITH EDIT CAMERA BADGE */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => setShowPhotoPickerModal(true)}
            activeOpacity={0.85}
          >
            <Image
              source={require('../../../assets/driver_avatar.png')}
              style={styles.avatarImage}
            />
            <View style={styles.cameraBadge}>
              <Feather name="camera" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarSub}>Tap photo to replace driver profile image</Text>
        </View>

        {/* DRIVER PROFILE FORMS */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View style={styles.sectionDividerRow}>
          <Text style={styles.sectionDividerTitle}>VEHICLE & LICENSE INFORMATION</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Vehicle Model</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              value={vehicleModel}
              onChangeText={setVehicleModel}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>License Plate Number</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              value={plateNumber}
              onChangeText={setPlateNumber}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Driver License ID</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              value={licenseId}
              onChangeText={setLicenseId}
            />
          </View>
        </View>

        {/* DRIVER SCOPED NOTICE */}
        <View style={styles.driverScopedNotice}>
          <Ionicons name="information-circle-outline" size={18} color="#8C531B" style={{ marginRight: 8 }} />
          <Text style={styles.driverScopedNoticeText}>
            Driver Mode Active: Profile edits made here exclusively update your Driver Account credentials.
          </Text>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            saveState === 'SUCCESS' && styles.saveBtnSuccess,
          ]}
          onPress={handleSaveProfile}
          disabled={saveState !== 'IDLE'}
          activeOpacity={0.88}
        >
          {saveState === 'SAVING' ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : saveState === 'SUCCESS' ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.saveBtnText}>Changes Updated ✓</Text>
            </View>
          ) : (
            <Text style={styles.saveBtnText}>Save Driver Profile</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* PHOTO PICKER / REPLACE MODAL */}
      <Modal
        visible={showPhotoPickerModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPhotoPickerModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowPhotoPickerModal(false)}>
          <Pressable style={styles.photoPickerSheetCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.photoPickerTitle}>Change Profile Photo</Text>
            <Text style={styles.photoPickerSub}>Choose an image source to update your driver avatar:</Text>

            <TouchableOpacity
              style={styles.photoOptionBtn}
              onPress={() => {
                setShowPhotoPickerModal(false);
                Alert.alert('Photo Updated', 'New profile image loaded from photo library.');
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="image-outline" size={22} color="#F07D3B" style={{ marginRight: 14 }} />
              <Text style={styles.photoOptionText}>Choose from Photo Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoOptionBtn}
              onPress={() => {
                setShowPhotoPickerModal(false);
                Alert.alert('Camera Capture', 'New profile image captured from camera.');
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="camera-outline" size={22} color="#F07D3B" style={{ marginRight: 14 }} />
              <Text style={styles.photoOptionText}>Take New Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelPickerBtn}
              onPress={() => setShowPhotoPickerModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelPickerText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#F07D3B',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarSub: {
    fontSize: 12,
    color: '#6E6663',
  },
  formGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  inputBox: {
    backgroundColor: '#EBE5E3',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  sectionDividerRow: {
    marginTop: 10,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE9',
    paddingBottom: 6,
  },
  sectionDividerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
  },
  driverScopedNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  driverScopedNoticeText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#8C531B',
    lineHeight: 17,
  },
  saveBtn: {
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
  saveBtnSuccess: {
    backgroundColor: '#0D9488',
    shadowColor: '#0D9488',
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* PHOTO PICKER MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  photoPickerSheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  photoPickerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  photoPickerSub: {
    fontSize: 13,
    color: '#6E6663',
    marginBottom: 20,
  },
  photoOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  photoOptionText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  cancelPickerBtn: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  cancelPickerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6E6663',
  },
});
