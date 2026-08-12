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
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RatePassengerScreen() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(4);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Friendly Passenger',
    'Good Talk',
  ]);
  const [comment, setComment] = useState('');

  // Modals
  const [showRatingSubmittedModal, setShowRatingSubmittedModal] = useState(false);
  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [selectedIssueCategory, setSelectedIssueCategory] = useState('Passenger Misconduct');
  const [issueDetails, setIssueDetails] = useState('');

  const RATING_LABELS: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Excellent',
    5: 'Outstanding',
  };

  const TAG_OPTIONS = [
    { id: 'Friendly Passenger', label: 'Friendly Passenger', positive: true },
    { id: 'Good Talk', label: 'Good Talk', positive: true },
    { id: 'Late arrival', label: 'Late arrival', positive: false },
    { id: 'Navigation', label: 'Navigation', positive: false },
  ];

  const ISSUE_CATEGORIES = [
    'Passenger Misconduct',
    'Fare / Cash Discrepancy',
    'Safety or Health Concern',
    'Item Left in Vehicle',
    'Incorrect Route / Destination',
  ];

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmitRating = () => {
    setShowRatingSubmittedModal(true);
    setTimeout(() => {
      setShowRatingSubmittedModal(false);
      router.push('/driver/dashboard' as any);
    }, 2500);
  };

  const handleOpenReportModal = () => {
    setShowReportIssueModal(true);
  };

  const handleSubmitIssueReport = () => {
    setShowReportIssueModal(false);
    Alert.alert(
      'Issue Report Logged',
      `Thank you for reporting. Your ticket for "${selectedIssueCategory}" has been submitted to Driver Support (#REF-8910).`,
      [
        {
          text: 'Return to Dashboard',
          onPress: () => router.push('/driver/dashboard' as any),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFBF9" barStyle="dark-content" />

      {/* HEADER WITH CLOSE X BUTTON */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.push('/driver/dashboard' as any)}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color="#F07D3B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Rate Your Ride</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* PASSENGER AVATAR & NAME */}
        <View style={styles.passengerSection}>
          <Image
            source={require('../../../assets/driver_avatar.png')}
            style={styles.passengerAvatar}
          />
          <Text style={styles.passengerName}>Oge</Text>
        </View>

        {/* HOW WAS YOUR TRIP CARD */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingCardLabel}>HOW WAS YOUR TRIP?</Text>

          {/* 5 STAR RATING INTERACTION */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <TouchableOpacity
                key={starIndex}
                onPress={() => setRating(starIndex)}
                activeOpacity={0.7}
                style={styles.starTouchable}
              >
                <Ionicons
                  name={starIndex <= rating ? 'star' : 'star-outline'}
                  size={36}
                  color={starIndex <= rating ? '#F07D3B' : '#D1D5DB'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.ratingTextLabel}>{RATING_LABELS[rating] || 'Excellent'}</Text>
        </View>

        {/* WHAT WENT WELL TAGS */}
        <Text style={styles.sectionHeading}>What went well?</Text>
        <View style={styles.tagsContainer}>
          {TAG_OPTIONS.map((item) => {
            const isSelected = selectedTags.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.tagPill,
                  item.positive ? styles.tagPillPositive : styles.tagPillNeutral,
                  isSelected && styles.tagPillSelected,
                ]}
                onPress={() => toggleTag(item.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tagPillText,
                    isSelected && styles.tagPillTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ADDITIONAL COMMENTS */}
        <Text style={styles.sectionHeading}>Additional comments</Text>
        <View style={styles.commentInputBox}>
          <TextInput
            style={styles.commentTextInput}
            placeholder="Tell us more about your experience..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* SUBMIT RATING BUTTON */}
        <TouchableOpacity
          style={styles.submitRatingBtn}
          onPress={handleSubmitRating}
          activeOpacity={0.88}
        >
          <Text style={styles.submitRatingText}>Submit Rating</Text>
        </TouchableOpacity>

        {/* REPORT AN ISSUE LINK */}
        <TouchableOpacity
          style={styles.reportIssueBtn}
          onPress={handleOpenReportModal}
          activeOpacity={0.7}
        >
          <Ionicons name="warning-outline" size={16} color="#6E6663" style={{ marginRight: 6 }} />
          <Text style={styles.reportIssueText}>Report an Issue</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* RATING SUBMITTED ANIMATED POPUP MODAL */}
      <Modal
        visible={showRatingSubmittedModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRatingSubmittedModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.submittedCard}>
            <View style={styles.successStarCircle}>
              <Ionicons name="star" size={38} color="#FFFFFF" />
            </View>
            <Text style={styles.modalTitle}>Rating Submitted!</Text>
            <Text style={styles.modalSub}>
              Thank you for rating Oge <Text style={{ color: '#F07D3B', fontWeight: '800' }}>{rating} stars</Text>. Your feedback helps improve our community.
            </Text>

            {/* ANIMATED MOVING DOTS LOADER */}
            <View style={styles.movingDotsRow}>
              <ActivityIndicator size="small" color="#F07D3B" style={{ marginRight: 8 }} />
              <Text style={styles.movingDotsText}>Returning to Dashboard...</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* REPORT ISSUE MODAL */}
      <Modal
        visible={showReportIssueModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReportIssueModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowReportIssueModal(false)}>
          <Pressable style={styles.reportSheetCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />

            <View style={styles.reportHeaderRow}>
              <View style={styles.warningIconBox}>
                <Ionicons name="warning" size={24} color="#EF4444" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.reportModalTitle}>Report an Issue</Text>
                <Text style={styles.reportModalSub}>
                  Select the category that best describes your trip concern:
                </Text>
              </View>
            </View>

            {/* ISSUE CATEGORIES */}
            <View style={styles.categoriesList}>
              {ISSUE_CATEGORIES.map((cat) => {
                const isSelected = selectedIssueCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryItem,
                      isSelected && styles.categoryItemSelected,
                    ]}
                    onPress={() => setSelectedIssueCategory(cat)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.radioCircle, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* DETAILS INPUT */}
            <Text style={styles.detailsLabel}>Issue Details (Optional)</Text>
            <View style={styles.detailsInputBox}>
              <TextInput
                style={styles.detailsTextInput}
                placeholder="Provide additional details..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                value={issueDetails}
                onChangeText={setIssueDetails}
              />
            </View>

            {/* ACTION BUTTONS */}
            <TouchableOpacity
              style={styles.submitReportBtn}
              onPress={handleSubmitIssueReport}
              activeOpacity={0.88}
            >
              <Text style={styles.submitReportText}>Submit Issue Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelReportBtn}
              onPress={() => setShowReportIssueModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelReportText}>Cancel</Text>
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
    backgroundColor: '#F3F4F6',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFBF9',
  },
  closeBtn: {
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
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  passengerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  passengerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  passengerName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
  },
  ratingCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  ratingCardLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8C531B',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  starTouchable: {
    padding: 4,
  },
  ratingTextLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8C531B',
  },
  sectionHeading: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    marginBottom: 24,
  },
  tagPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tagPillPositive: {
    backgroundColor: '#FFF0E6',
  },
  tagPillNeutral: {
    backgroundColor: '#FCE7F3',
  },
  tagPillSelected: {
    backgroundColor: '#FFF0E6',
    borderWidth: 1.5,
    borderColor: '#F07D3B',
  },
  tagPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#524945',
  },
  tagPillTextSelected: {
    color: '#8C531B',
    fontWeight: '800',
  },
  commentInputBox: {
    width: '100%',
    backgroundColor: '#EBE5E3',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    minHeight: 110,
  },
  commentTextInput: {
    fontSize: 15,
    color: '#1F2937',
    textAlignVertical: 'top',
  },
  submitRatingBtn: {
    width: '100%',
    height: 54,
    backgroundColor: '#F07D3B',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitRatingText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  reportIssueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  reportIssueText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#524945',
  },

  /* MODAL OVERLAY */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  submittedCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
  },
  successStarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: '#6E6663',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  movingDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  movingDotsText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F07D3B',
  },

  /* REPORT SHEET MODAL */
  reportSheetCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
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
  reportHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  warningIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  reportModalSub: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 2,
  },
  categoriesList: {
    gap: 8,
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  categoryItemSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioSelected: {
    borderColor: '#EF4444',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  categoryTextSelected: {
    color: '#DC2626',
    fontWeight: '800',
  },
  detailsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  detailsInputBox: {
    backgroundColor: '#EBE5E3',
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
    minHeight: 70,
  },
  detailsTextInput: {
    fontSize: 13,
    color: '#1F2937',
    textAlignVertical: 'top',
  },
  submitReportBtn: {
    height: 50,
    backgroundColor: '#EF4444',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  submitReportText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cancelReportBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelReportText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E6663',
  },
});
