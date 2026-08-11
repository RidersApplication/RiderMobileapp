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
  FlatList,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface FAQItem {
  id: string;
  category: 'Payments' | 'Rides' | 'Deliveries' | 'Account';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Rides',
    question: 'How do I request a refund for a delayed ride?',
    answer:
      "If your ride was delayed significantly or cancelled by a driver after payment, go to Ride History -> Select Ride -> Tap 'Request Refund'. Refunds are processed instantly back to your Riders Wallet.",
  },
  {
    id: 'faq-2',
    category: 'Deliveries',
    question: 'Can I change my delivery address after dispatch?',
    answer:
      "Yes! You can update the delivery destination in real-time before the driver arrives at the pickup location by tapping 'Edit Destination' on the active dispatch map.",
  },
  {
    id: 'faq-3',
    category: 'Rides',
    question: 'What should I do if a driver cancels my trip?',
    answer:
      'If your driver cancels, our automated system immediately re-assigns the nearest top-rated driver to your location at no extra charge.',
  },
  {
    id: 'faq-4',
    category: 'Payments',
    question: 'How are delivery fares calculated?',
    answer:
      'Fares are transparently calculated based on distance, estimated trip duration, selected vehicle category (Bike, Sedan, Van), and live traffic conditions.',
  },
  {
    id: 'faq-5',
    category: 'Account',
    question: 'How do I update my profile details or phone number?',
    answer:
      "Go to Profile -> Tap 'Edit Profile'. You can change your name, phone number, profile photo, and email address anytime.",
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export default function HelpSupportScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Modals
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [callModalVisible, setCallModalVisible] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello Oge! Welcome to Riders Support. How can we assist you today?',
      time: '10:00 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Agent auto response
    setTimeout(() => {
      const agentReply: ChatMessage = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent',
        text: 'Thank you for reaching out! A support specialist is reviewing your inquiry and will respond shortly.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, agentReply]);
    }, 1200);
  };

  const handleDialCall = () => {
    Linking.openURL('tel:+2348007433777').catch(() => {});
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Main Title */}
        <Text style={styles.mainHeading}>
          How can we <Text style={styles.italicHighlight}>help</Text> you?
        </Text>

        {/* Search Input Box */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#8A7C75" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for ride, payments, or delivery issues..."
            placeholderTextColor="#A09895"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#8A7C75" />
            </TouchableOpacity>
          )}
        </View>

        {/* Support Option 1: Chat with Us */}
        <View style={styles.contactCard}>
          <View style={styles.contactIconCircle}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#B8521B" />
          </View>
          <Text style={styles.contactTitle}>Chat with Us</Text>
          <Text style={styles.contactSub}>
            Instant support with our dedicated logistics specialists.
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => setChatModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.contactButtonText}>Start Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Support Option 2: Call Us */}
        <View style={styles.contactCard}>
          <View style={styles.contactIconCircle}>
            <Ionicons name="call" size={24} color="#B8521B" />
          </View>
          <Text style={styles.contactTitle}>Call Us</Text>
          <Text style={styles.contactSub}>
            Speak directly with a support agent for urgent matters.
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => setCallModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.contactButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Categories Section */}
        <View style={styles.sectionHeaderGroup}>
          <Text style={styles.smallSectionLabel}>KNOWLEDGE BASE</Text>
          <Text style={styles.sectionHeading}>FAQ Categories</Text>
        </View>

        <View style={styles.categoriesGrid}>
          {/* Category 1: Payments */}
          <TouchableOpacity
            style={[
              styles.catCard,
              selectedCategory === 'Payments' && styles.catCardSelected,
            ]}
            onPress={() =>
              setSelectedCategory((prev) => (prev === 'Payments' ? null : 'Payments'))
            }
            activeOpacity={0.8}
          >
            <View style={styles.catIconBox}>
              <Ionicons name="wallet-outline" size={24} color="#B8521B" />
            </View>
            <Text style={styles.catTitle}>Payments</Text>
          </TouchableOpacity>

          {/* Category 2: Rides */}
          <TouchableOpacity
            style={[
              styles.catCard,
              selectedCategory === 'Rides' && styles.catCardSelected,
            ]}
            onPress={() =>
              setSelectedCategory((prev) => (prev === 'Rides' ? null : 'Rides'))
            }
            activeOpacity={0.8}
          >
            <View style={styles.catIconBox}>
              <Ionicons name="car-sport-outline" size={24} color="#B8521B" />
            </View>
            <Text style={styles.catTitle}>Rides</Text>
          </TouchableOpacity>

          {/* Category 3: Deliveries */}
          <TouchableOpacity
            style={[
              styles.catCard,
              selectedCategory === 'Deliveries' && styles.catCardSelected,
            ]}
            onPress={() =>
              setSelectedCategory((prev) => (prev === 'Deliveries' ? null : 'Deliveries'))
            }
            activeOpacity={0.8}
          >
            <View style={styles.catIconBox}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={26} color="#B8521B" />
            </View>
            <Text style={styles.catTitle}>Deliveries</Text>
          </TouchableOpacity>

          {/* Category 4: Account */}
          <TouchableOpacity
            style={[
              styles.catCard,
              selectedCategory === 'Account' && styles.catCardSelected,
            ]}
            onPress={() =>
              setSelectedCategory((prev) => (prev === 'Account' ? null : 'Account'))
            }
            activeOpacity={0.8}
          >
            <View style={styles.catIconBox}>
              <Ionicons name="person-circle-outline" size={26} color="#B8521B" />
            </View>
            <Text style={styles.catTitle}>Account</Text>
          </TouchableOpacity>
        </View>

        {/* Top Questions Accordion Section */}
        <View style={styles.sectionHeaderGroup}>
          <Text style={styles.sectionHeading}>Top Questions</Text>
        </View>

        <View style={styles.faqList}>
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <View key={faq.id} style={styles.faqCard}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleExpand(faq.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.faqTitleRow}>
                    <View style={styles.orangeAccentBar} />
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-forward'}
                    size={18}
                    color="#C4BCB9"
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.faqAnswerBox}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* LIVE CHAT SUPPORT MODAL */}
      <Modal
        transparent
        animationType="slide"
        visible={chatModalVisible}
        onRequestClose={() => setChatModalVisible(false)}
      >
        <SafeAreaView style={styles.modalFullBackdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <View style={styles.chatModalHeader}>
              <TouchableOpacity onPress={() => setChatModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="#1D1614" />
              </TouchableOpacity>
              <View style={styles.chatAgentInfo}>
                <Text style={styles.chatAgentName}>Riders Specialist Support</Text>
                <Text style={styles.chatAgentStatus}>🟢 Online • Typically replies in 1m</Text>
              </View>
              <TouchableOpacity onPress={() => setChatModalVisible(false)}>
                <Ionicons name="close" size={24} color="#7F7774" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={chatMessages}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.chatListContent}
              renderItem={({ item }) => {
                const isUser = item.sender === 'user';
                return (
                  <View
                    style={[
                      styles.chatBubbleRow,
                      isUser ? styles.userBubbleRow : styles.agentBubbleRow,
                    ]}
                  >
                    <View
                      style={[
                        styles.chatBubble,
                        isUser ? styles.userBubble : styles.agentBubble,
                      ]}
                    >
                      <Text style={[styles.chatBubbleText, isUser && styles.userBubbleText]}>
                        {item.text}
                      </Text>
                      <Text style={[styles.chatBubbleTime, isUser && styles.userBubbleTime]}>
                        {item.time}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />

            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Type your message..."
                placeholderTextColor="#A09895"
                value={chatInput}
                onChangeText={setChatInput}
              />
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handleSendChatMessage}
                activeOpacity={0.8}
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      {/* CALL US DIRECT DIAL MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={callModalVisible}
        onRequestClose={() => setCallModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.callIconCircle}>
              <Ionicons name="call" size={32} color="#B8521B" />
            </View>
            <Text style={styles.modalCardTitle}>Speak with Support</Text>
            <Text style={styles.phoneNumberText}>+234 (0) 800-RIDERS-HELP</Text>
            <Text style={styles.modalCardSub}>
              Our support agents are available 24/7 to resolve trip delays, driver issues, and urgent inquiries.
            </Text>

            <TouchableOpacity
              style={styles.dialCallButton}
              onPress={handleDialCall}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.dialCallButtonText}>Dial Call Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeCallModalBtn}
              onPress={() => setCallModalVisible(false)}
            >
              <Text style={styles.closeCallModalText}>Cancel</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 16,
  },
  italicHighlight: {
    color: '#B8521B',
    fontStyle: 'italic',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE7',
    borderRadius: 22,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1614',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  contactIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  contactSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7F7774',
    lineHeight: 18,
    marginBottom: 16,
  },
  contactButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5EFEB',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#994514',
  },
  sectionHeaderGroup: {
    marginTop: 16,
    marginBottom: 14,
  },
  smallSectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#994514',
    letterSpacing: 1,
    marginBottom: 2,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1D1614',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  catCard: {
    width: '48%',
    backgroundColor: '#FFF0EC',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catCardSelected: {
    borderWidth: 2,
    borderColor: '#B8521B',
    backgroundColor: '#FFEADF',
  },
  catIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  catTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
  },
  faqList: {
    gap: 12,
  },
  faqCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  orangeAccentBar: {
    width: 4,
    height: 16,
    backgroundColor: '#B8521B',
    borderRadius: 2,
    marginRight: 10,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1614',
    lineHeight: 20,
  },
  faqAnswerBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  faqAnswerText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    lineHeight: 19,
  },

  /* CHAT MODAL STYLES */
  modalFullBackdrop: {
    flex: 1,
    backgroundColor: '#FFFBF9',
  },
  chatModalHeader: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  chatAgentInfo: {
    flex: 1,
    marginLeft: 14,
  },
  chatAgentName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D1614',
  },
  chatAgentStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16A34A',
  },
  chatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  chatBubbleRow: {
    flexDirection: 'row',
  },
  userBubbleRow: {
    justifyContent: 'flex-end',
  },
  agentBubbleRow: {
    justifyContent: 'flex-start',
  },
  chatBubble: {
    maxWidth: '80%',
    borderRadius: 18,
    padding: 14,
  },
  userBubble: {
    backgroundColor: '#F07D3B',
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: '#EFEAE7',
    borderBottomLeftRadius: 4,
  },
  chatBubbleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1614',
    lineHeight: 20,
  },
  userBubbleText: {
    color: '#FFFFFF',
  },
  chatBubbleTime: {
    fontSize: 10,
    color: '#8A7C75',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userBubbleTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  chatInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#EFEAE7',
    borderRadius: 24,
    paddingHorizontal: 18,
    fontSize: 15,
    fontWeight: '500',
    color: '#1D1614',
    marginRight: 10,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F07D3B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* CALL MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(39, 27, 20, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
  },
  callIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFEADF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalCardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D1614',
    marginBottom: 4,
  },
  phoneNumberText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#B8521B',
    marginBottom: 10,
  },
  modalCardSub: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6E6663',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  dialCallButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#F07D3B',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dialCallButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  closeCallModalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeCallModalText: {
    color: '#7F7774',
    fontSize: 14,
    fontWeight: '700',
  },
});
