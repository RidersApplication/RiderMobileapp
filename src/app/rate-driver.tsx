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

const TAG_OPTIONS = [
  'Friendly driver',
  'Safe driving',
  'Clean vehicle',
  'Late arrival',
  'Navigation',
];

const RATING_LABELS: { [key: number]: string } = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Excellent',
  5: 'Outstanding!',
};

const ISSUE_OPTIONS = [
  'Safety or reckless driving',
  'Billing or payment issue',
  'Vehicle condition / cleanliness',
  'Late arrival or delay',
  'Unprofessional behavior',
  'Wrong route taken',
  'Other issue',
];

export default function RateDriver() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(4);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Friendly driver', 'Safe driving']);
  const [comments, setComments] = useState<string>('');

  // Report Issue Modal States
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<string>('Safety or reckless driving');
  const [issueDetails, setIssueDetails] = useState<string>('');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitRating = () => {
    Alert.alert(
      'Thank You!',
      'Your feedback has been submitted successfully.',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/home'),
        },
      ]
    );
  };

  const handleOpenReportModal = () => {
    setReportModalVisible(true);
  };

  const handleSubmitReport = () => {
    setReportModalVisible(false);
    Alert.alert(
      'Report Submitted',
      `Thank you for reporting: "${selectedIssue}". Our safety and support team will review your report within 24 hours.`,
      [
        {
          text: 'OK',
          onPress: () => router.replace('/home'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.replace('/home')}
          activeOpacity={0.7}
          accessibilityLabel="Close rating"
        >
          <Ionicons name="close" size={26} color="#F07D3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate Your Ride</Text>
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
          {/* Driver Avatar & Info */}
          <View style={styles.driverSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('../../assets/driver_avatar.png')}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={18} color="#F07D3B" />
              </View>
            </View>

            <Text style={styles.driverName}>Samuel Green</Text>
            <Text style={styles.vehicleText}>Toyota Prius • ABC-1234</Text>
          </View>

          {/* Star Rating Card */}
          <View style={styles.ratingCard}>
            <Text style={styles.ratingCardTitle}>HOW WAS YOUR TRIP?</Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                  style={styles.starButton}
                >
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={36}
                    color="#F07D3B"
                  />
                </TouchableOpacity>
              ))}
            </View>

            {rating > 0 && (
              <Text style={styles.ratingLabel}>{RATING_LABELS[rating]}</Text>
            )}
          </View>

          {/* What went well? Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What went well?</Text>
            <View style={styles.tagsContainer}>
              {TAG_OPTIONS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tagPill, isSelected && styles.tagPillSelected]}
                    onPress={() => toggleTag(tag)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        isSelected && styles.tagTextSelected,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Additional Comments */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional comments</Text>
            <TextInput
              style={styles.commentsInput}
              multiline
              numberOfLines={4}
              placeholder="Tell us more about your experience..."
              placeholderTextColor="#9A928F"
              value={comments}
              onChangeText={setComments}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Rating Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitRating}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>Submit Rating</Text>
          </TouchableOpacity>

          {/* Report an Issue */}
          <TouchableOpacity
            style={styles.reportButton}
            onPress={handleOpenReportModal}
            activeOpacity={0.7}
          >
            <Ionicons name="warning-outline" size={18} color="#59514E" style={styles.reportIcon} />
            <Text style={styles.reportText}>Report an Issue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ================= REPORT ISSUE MODAL ================= */}
      <Modal
        transparent
        animationType="slide"
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ width: '100%', justifyContent: 'flex-end' }}
          >
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleRow}>
                  <Ionicons name="warning" size={22} color="#EF4444" style={{ marginRight: 8 }} />
                  <Text style={styles.modalTitle}>Report an Issue</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setReportModalVisible(false)}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={22} color="#6E6663" />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                <Text style={styles.modalSubtitle}>
                  What went wrong with your trip? Select an issue:
                </Text>

                {/* Options List */}
                <View style={styles.issueOptionsList}>
                  {ISSUE_OPTIONS.map((option) => {
                    const isSelected = selectedIssue === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.issueOptionRow,
                          isSelected && styles.issueOptionRowSelected,
                        ]}
                        onPress={() => setSelectedIssue(option)}
                        activeOpacity={0.8}
                      >
                        <Ionicons
                          name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                          size={20}
                          color={isSelected ? '#F07D3B' : '#A09895'}
                          style={{ marginRight: 12 }}
                        />
                        <Text
                          style={[
                            styles.issueOptionText,
                            isSelected && styles.issueOptionTextSelected,
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Optional Issue Details */}
                <Text style={[styles.modalSubtitle, { marginTop: 14 }]}>
                  Describe what happened (optional):
                </Text>
                <TextInput
                  style={styles.issueInput}
                  multiline
                  numberOfLines={3}
                  placeholder="Provide any extra details about the issue..."
                  placeholderTextColor="#A09895"
                  value={issueDetails}
                  onChangeText={setIssueDetails}
                  textAlignVertical="top"
                />

                {/* Submit & Cancel Buttons */}
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={handleSubmitReport}
                  activeOpacity={0.85}
                >
                  <Text style={styles.modalSubmitBtnText}>Submit Report</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={() => setReportModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
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
  closeButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  driverSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#DBB5A4',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  driverName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  vehicleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6663',
  },
  ratingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ratingCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#A04D17',
    marginTop: 12,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagPill: {
    backgroundColor: '#F5EFEB',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tagPillSelected: {
    backgroundColor: '#FFEADF',
    borderColor: '#F07D3B',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#59514E',
  },
  tagTextSelected: {
    color: '#994514',
  },
  commentsInput: {
    backgroundColor: '#EFEAE7',
    borderRadius: 18,
    padding: 16,
    minHeight: 110,
    fontSize: 15,
    color: '#1D1614',
    fontWeight: '500',
  },
  submitButton: {
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  reportIcon: {
    marginRight: 6,
  },
  reportText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#59514E',
  },

  /* MODAL STYLES */
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
    paddingBottom: 30,
    maxHeight: '85%',
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
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1D1614',
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5EFEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#59514E',
    marginTop: 10,
    marginBottom: 10,
  },
  issueOptionsList: {
    gap: 8,
  },
  issueOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F9FAFA',
    borderWidth: 1,
    borderColor: '#F0ECE9',
  },
  issueOptionRowSelected: {
    backgroundColor: '#FFF5F0',
    borderColor: '#F07D3B',
  },
  issueOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A423F',
  },
  issueOptionTextSelected: {
    fontWeight: '800',
    color: '#1D1614',
  },
  issueInput: {
    backgroundColor: '#F5EFEB',
    borderRadius: 14,
    padding: 14,
    minHeight: 80,
    fontSize: 14,
    color: '#1D1614',
    fontWeight: '500',
    marginBottom: 18,
  },
  modalSubmitBtn: {
    height: 52,
    backgroundColor: '#EF4444',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#EF4444',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  modalSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalCancelBtn: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalCancelBtnText: {
    color: '#59514E',
    fontSize: 14,
    fontWeight: '700',
  },
});
