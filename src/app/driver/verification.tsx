import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  required: boolean; // ALL are optional now
  status: 'NOT_STARTED' | 'PENDING' | 'UPLOADED';
  uri?: string;
  fileName?: string;
  fileType?: 'image' | 'pdf' | 'doc';
  fileSize?: string;
  uploadedAt?: string;
  isUploading?: boolean;
}

export default function VerificationScreen() {
  const router = useRouter();

  // Documents State - EVERYTHING IS OPTIONAL!
  const [documents, setDocuments] = useState<Record<string, DocumentItem>>({
    license: {
      id: 'license',
      title: "Driver's License",
      subtitle: 'Government issued photo ID / License (Optional)',
      required: false,
      status: 'PENDING',
      fileName: 'drivers_license_front.jpg',
      fileType: 'image',
      uploadedAt: 'Oct 22, 2024',
    },
    registration: {
      id: 'registration',
      title: 'Vehicle Registration',
      subtitle: 'Official vehicle registration certificate (Optional)',
      required: false,
      status: 'NOT_STARTED',
    },
    insurance: {
      id: 'insurance',
      title: 'Insurance Document',
      subtitle: 'Active vehicle commercial insurance policy (Optional)',
      required: false,
      status: 'UPLOADED',
      fileName: 'policy_v4_final_2024.pdf',
      fileType: 'pdf',
      uploadedAt: 'Oct 20, 2024',
    },
    proof_address: {
      id: 'proof_address',
      title: 'Proof of Address',
      subtitle: 'Utility bill, bank statement, or tenancy agreement (Optional)',
      required: false,
      status: 'NOT_STARTED',
    },
  });

  // Active document selection state for modals
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open source selection modal for a specific document
  const handleOpenUploadModal = (docId: string) => {
    setSelectedDocId(docId);
    setSourceModalVisible(true);
  };

  // Select source: Camera, Gallery, or Document Attachment
  const handleSelectSource = async (sourceType: 'camera' | 'library' | 'document') => {
    if (!selectedDocId) return;
    setSourceModalVisible(false);

    try {
      if (sourceType === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Camera permission is required to capture document photos.'
          );
          return;
        }

        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets[0]?.uri) {
          processDocumentUpload(selectedDocId, result.assets[0].uri, 'image');
        }
      } else if (sourceType === 'library') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Photo library permission is required to choose images.'
          );
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets[0]?.uri) {
          processDocumentUpload(selectedDocId, result.assets[0].uri, 'image');
        }
      } else if (sourceType === 'document') {
        // Attach Document File (PDF / DOC)
        const dummyDocUri = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800';
        processDocumentUpload(selectedDocId, dummyDocUri, 'pdf');
      }
    } catch (error) {
      Alert.alert('Upload Error', 'Failed to attach file. Please try again.');
    }
  };

  // Process Document Upload (Simulate upload progress)
  const processDocumentUpload = (
    docId: string,
    fileUri: string,
    type: 'image' | 'pdf' | 'doc' = 'image'
  ) => {
    setDocuments((prev) => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        isUploading: true,
      },
    }));

    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const ext = type === 'pdf' ? 'pdf' : type === 'doc' ? 'docx' : 'jpg';
      const generatedName = `${docId}_doc_${now.getTime().toString().slice(-4)}.${ext}`;

      setDocuments((prev) => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          status: 'UPLOADED',
          uri: fileUri,
          fileName: generatedName,
          fileType: type,
          uploadedAt: dateStr,
          isUploading: false,
        },
      }));

      const docName = documents[docId]?.title || 'Document';
      Alert.alert('Upload Successful', `${docName} has been uploaded successfully!`);
    }, 600);
  };

  // Add custom extra document card
  const handleAddCustomDocument = () => {
    const customId = `custom_${Date.now()}`;
    const customNum = Object.keys(documents).length + 1;
    setDocuments((prev) => ({
      ...prev,
      [customId]: {
        id: customId,
        title: `Additional Document #${customNum}`,
        subtitle: 'Extra certificate, permit, or photo (Optional)',
        required: false,
        status: 'NOT_STARTED',
      },
    }));
    handleOpenUploadModal(customId);
  };

  // Remove document
  const handleRemoveDoc = (docId: string) => {
    Alert.alert(
      'Remove Document',
      `Are you sure you want to remove ${documents[docId]?.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setDocuments((prev) => ({
              ...prev,
              [docId]: {
                ...prev[docId],
                status: 'NOT_STARTED',
                uri: undefined,
                fileName: undefined,
                fileType: undefined,
                uploadedAt: undefined,
              },
            }));
            setPreviewDoc(null);
          },
        },
      ]
    );
  };

  // View document preview
  const handleViewDocument = (doc: DocumentItem) => {
    if (doc.status === 'NOT_STARTED' && !doc.uri) {
      Alert.alert('No Document', 'Please upload an image or document first.');
      return;
    }
    setPreviewDoc(doc);
  };

  // Handle Submission - Navigates directly to under-review page
  const handleSubmitDocuments = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/driver/under-review' as any);
    }, 300);
  };

  // Filtered documents list for search
  const docList = Object.values(documents).filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <Text style={styles.headerTitle}>Verification</Text>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() =>
            Alert.prompt
              ? Alert.prompt('Search Documents', 'Enter keyword to filter:', (text) =>
                setSearchQuery(text || '')
              )
              : Alert.alert('Verification Info', 'All verification documents are optional.')
          }
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={22} color="#F07D3B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADLINE */}
        <Text style={styles.headline}>
          Optional <Text style={styles.orangeText}>Verification</Text>
        </Text>
        <Text style={styles.subHeadline}>
          Upload documents or photos whenever convenient. All items are completely optional.
        </Text>

        {/* DOCUMENT CARDS LIST */}
        {docList.map((doc) => {
          const isUploaded = doc.status === 'UPLOADED';
          const isPending = doc.status === 'PENDING';
          const isNotStarted = doc.status === 'NOT_STARTED';

          return (
            <View
              key={doc.id}
              style={[
                styles.docCard,
                isUploaded && styles.docCardUploadedBorder,
                doc.isUploading && styles.docCardUploading,
              ]}
            >
              <View style={styles.docCardHeader}>
                <View style={styles.docTitleRow}>
                  {doc.id === 'license' && (
                    <Ionicons name="ribbon" size={20} color="#8C531B" style={{ marginRight: 8 }} />
                  )}
                  {doc.id === 'registration' && (
                    <Ionicons name="document-text-outline" size={20} color="#1F2937" style={{ marginRight: 8 }} />
                  )}
                  {doc.id === 'insurance' && (
                    <Ionicons name="shield-checkmark" size={20} color="#0D9488" style={{ marginRight: 8 }} />
                  )}
                  {doc.id === 'proof_address' && (
                    <Ionicons name="location-outline" size={20} color="#6E6663" style={{ marginRight: 8 }} />
                  )}
                  {doc.id.startsWith('custom_') && (
                    <Ionicons name="add-circle-outline" size={20} color="#F07D3B" style={{ marginRight: 8 }} />
                  )}

                  <View style={{ flex: 1 }}>
                    <View style={styles.titleBadgeRow}>
                      <Text style={styles.docTitle}>{doc.title}</Text>
                      <Text style={styles.optionalBadge}> (Optional)</Text>
                    </View>
                    <Text style={styles.docSubtext}>{doc.subtitle}</Text>
                  </View>
                </View>

                {doc.id === 'license' && <Ionicons name="card-outline" size={26} color="#F3ECE9" />}
                {doc.id === 'registration' && (
                  <MaterialCommunityIcons name="truck-outline" size={26} color="#F3ECE9" />
                )}
                {doc.id === 'insurance' && (
                  <Ionicons name="shield-outline" size={26} color="#F3ECE9" />
                )}
                {doc.id === 'proof_address' && (
                  <Ionicons name="home-outline" size={26} color="#F3ECE9" />
                )}
              </View>

              {/* UPLOADING LOADER */}
              {doc.isUploading ? (
                <View style={styles.uploadingBox}>
                  <ActivityIndicator size="small" color="#F07D3B" />
                  <Text style={styles.uploadingText}>Attaching image / document...</Text>
                </View>
              ) : (
                <>
                  {/* BADGES & DETAILS */}
                  <View style={styles.statusBadgeRow}>
                    {isPending && (
                      <View style={styles.badgePending}>
                        <Text style={styles.badgePendingText}>PENDING REVIEW</Text>
                      </View>
                    )}
                    {isUploaded && (
                      <View style={styles.badgeUploaded}>
                        <Ionicons name="checkmark-circle" size={14} color="#0D9488" style={{ marginRight: 4 }} />
                        <Text style={styles.badgeUploadedText}>UPLOADED</Text>
                      </View>
                    )}
                    {isNotStarted && (
                      <View style={styles.badgeNotStarted}>
                        <Text style={styles.badgeNotStartedText}>OPTIONAL</Text>
                      </View>
                    )}
                  </View>

                  {/* THUMBNAIL / FILE METADATA */}
                  {doc.fileName && (
                    <View style={styles.fileMetadataRow}>
                      {doc.uri && doc.fileType !== 'pdf' ? (
                        <Image source={{ uri: doc.uri }} style={styles.docThumbnail} />
                      ) : (
                        <View style={styles.docIconPlaceholder}>
                          <Ionicons
                            name={doc.fileType === 'pdf' ? 'document-text' : 'image'}
                            size={22}
                            color="#F07D3B"
                          />
                        </View>
                      )}

                      <View style={styles.fileMetadataText}>
                        <Text style={styles.fileNameText} numberOfLines={1}>
                          {doc.fileName}
                        </Text>
                        <Text style={styles.fileDateText}>
                          {doc.fileType === 'pdf' ? 'PDF Document' : 'Image File'}{' '}
                          {doc.uploadedAt ? `• Uploaded ${doc.uploadedAt}` : ''}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* ACTION BUTTONS ROW */}
                  <View style={styles.cardActionsRow}>
                    {isNotStarted ? (
                      <TouchableOpacity
                        style={styles.uploadBtn}
                        onPress={() => handleOpenUploadModal(doc.id)}
                        activeOpacity={0.85}
                      >
                        <Feather name="upload-cloud" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.uploadBtnText}>Upload Image / Document</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.uploadedActionGroup}>
                        <TouchableOpacity
                          style={styles.actionBtnOutline}
                          onPress={() => handleViewDocument(doc)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="eye-outline" size={16} color="#B8521B" style={{ marginRight: 4 }} />
                          <Text style={styles.actionBtnOutlineText}>View</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.actionBtnFilled}
                          onPress={() => handleOpenUploadModal(doc.id)}
                          activeOpacity={0.8}
                        >
                          <Feather name="refresh-cw" size={14} color="#524945" style={{ marginRight: 4 }} />
                          <Text style={styles.actionBtnFilledText}>Replace</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.actionBtnTrash}
                          onPress={() => handleRemoveDoc(doc.id)}
                          activeOpacity={0.7}
                        >
                          <Feather name="trash-2" size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
          );
        })}

        {/* ADD CUSTOM DOCUMENT BUTTON */}
        <TouchableOpacity
          style={styles.addCustomDocBtn}
          onPress={handleAddCustomDocument}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="#F07D3B" style={{ marginRight: 6 }} />
          <Text style={styles.addCustomDocText}>Add Additional Document / Image</Text>
        </TouchableOpacity>

        {/* BOTTOM BANNER CARD */}
        <View style={styles.darkBanner}>
          <Text style={styles.bannerTitle}>Ready to proceed?</Text>
          <Text style={styles.bannerSubtitle}>
            Verification typically takes 24-48 buisness hours once submitted.
          </Text>

          <TouchableOpacity
            style={[styles.submitDocsBtn, isSubmitting && styles.submitDocsBtnDisabled]}
            onPress={handleSubmitDocuments}
            disabled={isSubmitting}
            activeOpacity={0.88}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitDocsText}> SUBMIT DOCUMENTS</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* FOOTER LINKS */}
        <View style={styles.footerLinksRow}>
          <TouchableOpacity
            style={styles.footerLink}
            onPress={() => Alert.alert('Driver Support', 'Support Hotline: +1 (800) 555-RIDE')}
          >
            <Ionicons name="help-circle-outline" size={16} color="#6E6663" style={{ marginRight: 4 }} />
            <Text style={styles.footerLinkText}>Support</Text>
          </TouchableOpacity>

          <Text style={styles.dotSeparator}>•</Text>

          <TouchableOpacity
            style={styles.footerLink}
            onPress={() => Alert.alert('Privacy Policy', 'All data uploads are encrypted and strictly optional.')}
          >
            <Ionicons name="shield-outline" size={16} color="#6E6663" style={{ marginRight: 4 }} />
            <Text style={styles.footerLinkText}>Privacy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* UPLOAD SOURCE MODAL (CAMERA vs GALLERY vs DOCUMENT FILE) */}
      <Modal
        visible={sourceModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSourceModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSourceModalVisible(false)}>
          <View style={styles.sourceModalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Upload Image or Document</Text>
            <Text style={styles.modalSubtitle}>Select source to capture photo or attach file</Text>

            {/* OPTION 1: CAMERA */}
            <TouchableOpacity
              style={styles.sourceOptionBtn}
              onPress={() => handleSelectSource('camera')}
              activeOpacity={0.8}
            >
              <View style={[styles.sourceIconCircle, { backgroundColor: '#FFEADF' }]}>
                <Ionicons name="camera-outline" size={22} color="#F07D3B" />
              </View>
              <View style={styles.sourceOptionTextCol}>
                <Text style={styles.sourceOptionTitle}>Take Photo (Camera)</Text>
                <Text style={styles.sourceOptionSub}>Snap a clear picture of document</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* OPTION 2: GALLERY */}
            <TouchableOpacity
              style={styles.sourceOptionBtn}
              onPress={() => handleSelectSource('library')}
              activeOpacity={0.8}
            >
              <View style={[styles.sourceIconCircle, { backgroundColor: '#E6F4F1' }]}>
                <Ionicons name="images-outline" size={22} color="#0D9488" />
              </View>
              <View style={styles.sourceOptionTextCol}>
                <Text style={styles.sourceOptionTitle}>Choose from Gallery</Text>
                <Text style={styles.sourceOptionSub}>Upload existing image from device</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* OPTION 3: DOCUMENT FILE / PDF */}
            <TouchableOpacity
              style={styles.sourceOptionBtn}
              onPress={() => handleSelectSource('document')}
              activeOpacity={0.8}
            >
              <View style={[styles.sourceIconCircle, { backgroundColor: '#FFF0E6' }]}>
                <Ionicons name="document-attach-outline" size={22} color="#8C531B" />
              </View>
              <View style={styles.sourceOptionTextCol}>
                <Text style={styles.sourceOptionTitle}>Attach Document File (PDF / DOC)</Text>
                <Text style={styles.sourceOptionSub}>Select document file from device</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelModalBtn}
              onPress={() => setSourceModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* DOCUMENT PREVIEW MODAL */}
      <Modal
        visible={!!previewDoc}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewDoc(null)}
      >
        <View style={styles.previewOverlay}>
          <SafeAreaView style={styles.previewContainer}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle} numberOfLines={1}>
                {previewDoc?.title}
              </Text>
              <TouchableOpacity
                style={styles.closePreviewBtn}
                onPress={() => setPreviewDoc(null)}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.previewBody}>
              {previewDoc?.uri && previewDoc.fileType !== 'pdf' ? (
                <Image
                  source={{ uri: previewDoc.uri }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.dummyDocumentPreview}>
                  <Ionicons name="document-text" size={70} color="#F07D3B" />
                  <Text style={styles.dummyDocText}>{previewDoc?.fileName || 'Document File'}</Text>
                  <Text style={styles.dummyDocSub}>Optional verification copy attached</Text>
                </View>
              )}
            </View>

            <View style={styles.previewFooter}>
              <Text style={styles.previewMetaText}>
                File: {previewDoc?.fileName || 'Document'} • {previewDoc?.uploadedAt || 'Attached'}
              </Text>

              <View style={styles.previewFooterBtns}>
                <TouchableOpacity
                  style={styles.previewReplaceBtn}
                  onPress={() => {
                    const docId = previewDoc?.id;
                    setPreviewDoc(null);
                    if (docId) handleOpenUploadModal(docId);
                  }}
                >
                  <Feather name="refresh-cw" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.previewReplaceText}>Replace Image / File</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
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
    color: '#B8521B',
  },
  subHeadline: {
    fontSize: 14,
    color: '#6E6663',
    lineHeight: 20,
    marginBottom: 24,
  },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3ECE9',
  },
  docCardUploadedBorder: {
    borderColor: '#CCECE6',
  },
  docCardUploading: {
    borderColor: '#F07D3B',
  },
  docCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  docTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 10,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  optionalBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  docSubtext: {
    fontSize: 12,
    color: '#7F7774',
    marginTop: 2,
  },
  uploadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 10,
  },
  uploadingText: {
    fontSize: 13,
    color: '#F07D3B',
    fontWeight: '600',
    marginLeft: 10,
  },
  statusBadgeRow: {
    marginTop: 12,
    marginBottom: 10,
  },
  badgePending: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEADF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgePendingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B8521B',
  },
  badgeNotStarted: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3ECE9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeNotStartedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F7774',
  },
  badgeUploaded: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeUploadedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
  },
  fileMetadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  docThumbnail: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  docIconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileMetadataText: {
    flex: 1,
    marginLeft: 10,
  },
  fileNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  fileDateText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  cardActionsRow: {
    marginTop: 4,
  },
  uploadBtn: {
    height: 44,
    backgroundColor: '#F07D3B',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  uploadedActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnOutline: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B8521B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnOutlineText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B8521B',
  },
  actionBtnFilled: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3ECE9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnFilledText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#524945',
  },
  actionBtnTrash: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCustomDocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F2',
    borderRadius: 16,
    height: 48,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFE8DE',
    borderStyle: 'dashed',
  },
  addCustomDocText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F07D3B',
  },
  darkBanner: {
    backgroundColor: '#271B14',
    borderRadius: 22,
    padding: 22,
    marginTop: 6,
    marginBottom: 24,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#D1D5DB',
    marginBottom: 20,
  },
  submitDocsBtn: {
    height: 52,
    backgroundColor: '#F07D3B',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F07D3B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitDocsBtnDisabled: {
    opacity: 0.7,
  },
  submitDocsText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  footerLinksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  footerLinkText: {
    fontSize: 14,
    color: '#6E6663',
    fontWeight: '600',
  },
  dotSeparator: {
    color: '#9CA3AF',
    marginHorizontal: 8,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sourceModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#6E6663',
    marginBottom: 20,
    marginTop: 2,
  },
  sourceOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F5',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  sourceIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceOptionTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  sourceOptionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  sourceOptionSub: {
    fontSize: 12,
    color: '#6E6663',
    marginTop: 2,
  },
  cancelModalBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F3ECE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelModalText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#524945',
  },

  /* PREVIEW MODAL STYLES */
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  previewHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  closePreviewBtn: {
    padding: 8,
  },
  previewBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  dummyDocumentPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 40,
    width: '100%',
  },
  dummyDocText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 16,
  },
  dummyDocSub: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 6,
  },
  previewFooter: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  previewMetaText: {
    fontSize: 13,
    color: '#D1D5DB',
    marginBottom: 16,
    textAlign: 'center',
  },
  previewFooterBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  previewReplaceBtn: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: '#F07D3B',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewReplaceText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
