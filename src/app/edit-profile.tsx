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
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/user-context';

const PRESET_AVATARS = [
  require('../../assets/user_avatar.png'),
  require('../../assets/driver_avatar.png'),
];

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [avatarSource, setAvatarSource] = useState<any>(user.avatar);

  const [saved, setSaved] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Validation Error', 'Please enter your phone number.');
      return;
    }

    updateUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatar: avatarSource,
    });

    setSaved(true);

    setTimeout(() => {
      router.replace('/profile' as any);
    }, 900);
  };

  const handleTakeCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Camera access is required to take a profile picture.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setAvatarSource({ uri: result.assets[0].uri });
        setPickerModalVisible(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open camera.');
    }
  };

  const handlePickGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Gallery access is required to choose a profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setAvatarSource({ uri: result.assets[0].uri });
        setPickerModalVisible(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open photo library.');
    }
  };

  const handleSelectPreset = (preset: any) => {
    setAvatarSource(preset);
    setPickerModalVisible(false);
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
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
          {/* Change Avatar Section */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={() => setPickerModalVisible(true)}
              activeOpacity={0.8}
            >
              <Image source={avatarSource} style={styles.avatar} />
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPickerModalVisible(true)}>
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="person-outline" size={20} color="#7F7774" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#A09895"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={20} color="#7F7774" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#A09895"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="call-outline" size={20} color="#7F7774" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#A09895"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, saved && styles.saveButtonSaved]}
            onPress={handleSave}
            activeOpacity={0.85}
            disabled={saved}
          >
            {saved ? (
              <View style={styles.savedRow}>
                <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.saveButtonText}>Saved!</Text>
              </View>
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Image Picker Option Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={pickerModalVisible}
        onRequestClose={() => setPickerModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Profile Photo</Text>
              <TouchableOpacity onPress={() => setPickerModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6E6663" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>Select how you would like to choose your profile picture:</Text>

            <TouchableOpacity style={styles.pickerOption} onPress={handleTakeCamera} activeOpacity={0.8}>
              <View style={styles.pickerIconBox}>
                <Ionicons name="camera-outline" size={24} color="#F07D3B" />
              </View>
              <View style={styles.pickerOptionTextGroup}>
                <Text style={styles.pickerOptionTitle}>Take Photo</Text>
                <Text style={styles.pickerOptionSub}>Use your camera to take a new picture</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pickerOption} onPress={handlePickGallery} activeOpacity={0.8}>
              <View style={styles.pickerIconBox}>
                <Ionicons name="images-outline" size={24} color="#F07D3B" />
              </View>
              <View style={styles.pickerOptionTextGroup}>
                <Text style={styles.pickerOptionTitle}>Import from Gallery</Text>
                <Text style={styles.pickerOptionSub}>Choose an existing photo from your device</Text>
              </View>
            </TouchableOpacity>

            <Text style={[styles.modalSubtitle, { marginTop: 16 }]}>Or select a preset avatar:</Text>
            <View style={styles.presetsRow}>
              {PRESET_AVATARS.map((preset, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.presetWrap}
                  onPress={() => handleSelectPreset(preset)}
                  activeOpacity={0.8}
                >
                  <Image source={preset} style={styles.presetImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8D5C8',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#F07D3B',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F07D3B',
  },
  formContainer: {
    gap: 20,
    marginBottom: 36,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F3EBE7',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
  saveButton: {
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
  saveButtonSaved: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
  },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1D1614',
  },
  modalSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6E6663',
    marginTop: 14,
    marginBottom: 14,
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EC',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  pickerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  pickerOptionTextGroup: {
    flex: 1,
  },
  pickerOptionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
  },
  pickerOptionSub: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 2,
    fontWeight: '500',
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 6,
  },
  presetWrap: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#F07D3B',
    padding: 2,
  },
  presetImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});
