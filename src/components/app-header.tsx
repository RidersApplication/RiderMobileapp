import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../context/user-context';

export interface AppHeaderProps {
  showBackButton?: boolean;
  onBackPress?: () => void;
  userName?: string;
  userAvatar?: any;
}

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'ride' | 'offer' | 'promo';
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Driver Arrived',
    message: 'Samuel Green has arrived at 123 Innovation Drive.',
    time: '2 mins ago',
    type: 'ride',
    read: false,
  },
  {
    id: '2',
    title: 'Ride Offer Accepted',
    message: 'Your offer of ₦3,200 for Toyota Prius was accepted.',
    time: '5 mins ago',
    type: 'offer',
    read: false,
  },
  {
    id: '3',
    title: 'Weekend Promo',
    message: 'Get 15% discount on all rides this weekend!',
    time: '1 hour ago',
    type: 'promo',
    read: true,
  },
];

export default function AppHeader({
  showBackButton = false,
  onBackPress,
  userName: customUserName,
  userAvatar: customUserAvatar,
}: AppHeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const userName = customUserName ?? `Hello, ${user.name}`;
  const userAvatar = customUserAvatar ?? user.avatar;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={handleBack}
              activeOpacity={0.8}
              accessibilityLabel="Go back"
            >
              <Ionicons name="chevron-back" size={24} color="#222" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.userRow, showBackButton && { marginLeft: 12 }]}
            onPress={() => router.push('/profile' as any)}
            activeOpacity={0.8}
            accessibilityLabel="Open Profile"
          >
            <Image source={userAvatar} style={styles.avatarImage} />
            <View style={styles.userInfoText}>
              <Text style={styles.smallText}>Welcome back</Text>
              <Text style={styles.name}>{userName}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Notifications"
        >
          <Ionicons name="notifications-outline" size={24} color="#222" />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ================= NOTIFICATIONS MODAL ================= */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleRow}>
                <Ionicons name="notifications" size={22} color="#F07D3B" />
                <Text style={styles.modalTitle}>Notifications</Text>
                {unreadCount > 0 && (
                  <View style={styles.headerUnreadBadge}>
                    <Text style={styles.headerUnreadText}>{unreadCount} new</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <Ionicons name="close" size={22} color="#555" />
              </TouchableOpacity>
            </View>

            {/* Action Bar */}
            {notifications.length > 0 && (
              <View style={styles.actionBar}>
                <TouchableOpacity onPress={markAllAsRead}>
                  <Text style={styles.actionText}>Mark all read</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearAll}>
                  <Text style={[styles.actionText, { color: '#EF4444' }]}>Clear all</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Notifications List */}
            <ScrollView
              style={styles.listScroll}
              showsVerticalScrollIndicator={false}
            >
              {notifications.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="notifications-off-outline" size={48} color="#CCCCCC" />
                  <Text style={styles.emptyTitle}>No notifications</Text>
                  <Text style={styles.emptySubtitle}>
                    You are all caught up! New ride updates will appear here.
                  </Text>
                </View>
              ) : (
                notifications.map((item) => (
                  <View
                    key={item.id}
                    style={[
                      styles.notificationCard,
                      !item.read && styles.unreadCard,
                    ]}
                  >
                    <View style={styles.iconCircle}>
                      <Ionicons
                        name={
                          item.type === 'ride'
                            ? 'car-sport-outline'
                            : item.type === 'offer'
                            ? 'pricetag-outline'
                            : 'gift-outline'
                        }
                        size={20}
                        color="#F07D3B"
                      />
                    </View>

                    <View style={styles.cardContent}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardTime}>{item.time}</Text>
                      </View>
                      <Text style={styles.cardMessage}>{item.message}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeNotification(item.id)}
                      style={styles.deleteBtn}
                    >
                      <Ionicons name="close-circle-outline" size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFEDD6',
  },
  userInfoText: {
    marginLeft: 12,
  },
  smallText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  /* MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '80%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  headerUnreadBadge: {
    backgroundColor: '#FFF0EC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 10,
  },
  headerUnreadText: {
    color: '#F07D3B',
    fontSize: 11,
    fontWeight: '700',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F07D3B',
  },
  listScroll: {
    marginTop: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  unreadCard: {
    backgroundColor: '#FFF8F6',
    borderLeftWidth: 3,
    borderLeftColor: '#F07D3B',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  cardTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  cardMessage: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 6,
  },
});
