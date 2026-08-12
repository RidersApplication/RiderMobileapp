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
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HireRatingScreen() {
  const router = useRouter();

  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Clean Vehicle',
    'On-time Delivery',
    'Professional Staff',
  ]);

  // Report Issue Modal
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [issueCategory, setIssueCategory] = useState('Vehicle Breakdown / Mechanical Issue');
  const [issueDescription, setIssueDescription] = useState('');
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitRating = () => {
    setThankYouModalVisible(true);
  };

  const handleFinishRating = () => {
    setThankYouModalVisible(false);
    router.replace('/home' as any);
  };

  const handleSubmitReport = () => {
    if (!issueDescription.trim()) {
      Alert.alert('Required', 'Please describe the issue you encountered.');
      return;
    }
    setReportModalVisible(false);
    Alert.alert(
      'Report Received',
      'Our fleet compliance team will investigate your report and update you within 2 hours.'
    );
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
        <Text style={styles.headerTitle}>Rating</Text>
        <TouchableOpacity style={styles.searchHeaderIcon} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Vehicle Details Strip */}
        <View style={styles.detailsStrip}>
          <Text style={styles.detailsLabel}>VEHICLE DETAILS</Text>
          <Text style={styles.detailsVal}>
            Toyota Hilux 2023 <Text style={styles.bullet}>•</Text>{' '}
            <Text style={styles.regNo}>ABC-123-XY</Text>
          </Text>
        </View>

        {/* Heading */}
        <Text style={styles.mainTitle}>How was your experience?</Text>
        <Text style={styles.subTitle}>Tap to rate Titan Logistics</Text>

        {/* Interactive Star Rating */}
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
              style={{ paddingHorizontal: 6 }}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={38}
                color={star <= rating ? '#F07D3B' : '#D1C7BD'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Multiline Box */}
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackHeaderRow}>
            <Text style={styles.feedbackLabel}>TELL US MORE (OPTIONAL)</Text>
            <Text style={styles.charCount}>{feedback.length}/500</Text>
          </View>

          <TextInput
            style={styles.feedbackInput}
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Share your feedback on the vehicle condition, driver professionalism, or service quality..."
            placeholderTextColor="#A09895"
            maxLength={500}
          />
        </View>

        {/* Quick Option Pills */}
        <View style={styles.pillsRow}>
          {['Clean Vehicle', 'On-time Delivery', 'Professional Staff'].map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                style={[styles.tagPill, isSelected && styles.tagPillSelected]}
                onPress={() => toggleTag(tag)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tagPillText, isSelected && styles.tagPillTextSelected]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Submit Rating Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmitRating}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Submit Rating</Text>
        </TouchableOpacity>

        {/* Report an Issue Link */}
        <TouchableOpacity
          style={styles.reportLink}
          onPress={() => setReportModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="warning-outline" size={18} color="#B8521B" style={{ marginRight: 6 }} />
          <Text style={styles.reportLinkText}>Report an Issue</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* REPORT ISSUE MODAL */}
      <Modal
        transparent
        animationType="slide"
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Report an Issue</Text>
              <TouchableOpacity onPress={() => setReportModalVisible(false)}>
                <Ionicons name="close" size={24} color="#7F7774" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>ISSUE CATEGORY</Text>
            <TouchableOpacity style={styles.categoryDropdown} activeOpacity={0.8}>
              <Text style={styles.categoryDropdownText}>{issueCategory}</Text>
              <Ionicons name="chevron-down" size={18} color="#B8521B" />
            </TouchableOpacity>

            <Text style={[styles.modalLabel, { marginTop: 14 }]}>DESCRIPTION</Text>
            <View style={styles.issueInputWrap}>
              <TextInput
                style={styles.issueInput}
                multiline
                numberOfLines={3}
                value={issueDescription}
                onChangeText={setIssueDescription}
                placeholder="Describe what happened..."
                placeholderTextColor="#A09895"
              />
            </View>

            <TouchableOpacity
              style={styles.submitReportBtn}
              onPress={handleSubmitReport}
              activeOpacity={0.85}
            >
              <Text style={styles.submitReportBtnText}>Submit Issue Report</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* THANK YOU MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={thankYouModalVisible}
        onRequestClose={handleFinishRating}
      >
        <View style={styles.centerModalBackdrop}>
          <View style={styles.thankYouModalCard}>
            <View style={styles.thankYouCircle}>
              <Ionicons name="checkmark-circle" size={48} color="#16A34A" />
            </View>
            <Text style={styles.thankYouTitle}>Feedback Submitted!</Text>
            <Text style={styles.thankYouSub}>
              Thank you for rating Titan Logistics. Your feedback helps us maintain high fleet quality.
            </Text>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={handleFinishRating}
              activeOpacity={0.85}
            >
              <Text style={styles.doneBtnText}>Return to Home</Text>
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
  searchHeaderIcon: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  detailsStrip: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EFEAE7',
  },
  detailsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  detailsVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  bullet: {
    color: '#F07D3B',
  },
  regNo: {
    color: '#B8521B',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1D1614',
    textAlign: 'center',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6E6663',
    textAlign: 'center',
    marginBottom: 24,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  feedbackCard: {
    width: '100%',
    backgroundColor: '#F5EFEB',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
  },
  feedbackHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  feedbackLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
  },
  charCount: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A09895',
  },
  feedbackInput: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1614',
    textAlignVertical: 'top',
    height: 90,
  },
  pillsRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  tagPill: {
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FFEADF',
  },
  tagPillSelected: {
    backgroundColor: '#FFEADF',
    borderColor: '#F07D3B',
  },
  tagPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7F7774',
  },
  tagPillTextSelected: {
    color: '#B8521B',
    fontWeight: '800',
  },
  submitBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#F07D3B',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  reportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  reportLinkText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#B8521B',
  },

  /* MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
  },
  modalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  categoryDropdown: {
    backgroundColor: '#FFF5F2',
    borderRadius: 18,
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryDropdownText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1614',
  },
  issueInputWrap: {
    backgroundColor: '#F5EFEB',
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
  },
  issueInput: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1614',
    textAlignVertical: 'top',
    height: 80,
  },
  submitReportBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitReportBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  thankYouModalCard: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 26,
    alignItems: 'center',
  },
  thankYouCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  thankYouTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 6,
  },
  thankYouSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  doneBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
