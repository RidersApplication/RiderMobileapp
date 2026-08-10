import React, { useState } from 'react';
import { Image, Modal, Pressable, SafeAreaView,TouchableOpacity, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomTab from '../components/bottom-tab';

export default function DrivingTo() {
  const router = useRouter();
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const cancelRide = () => {
    setCancelModalVisible(false);
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
       <View style={styles.header}>
               <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                 <Ionicons name="chevron-back" size={24} color="#222" />
               </TouchableOpacity>
       
               <View style={styles.userRow}>
                 <View style={styles.avatarPlaceholder}>
                   <Text style={styles.avatarInitials}>OG</Text>
                 </View>
       
                 <View>
                   <Text style={styles.smallText}>Welcome back</Text>
                   <Text style={styles.name}>Hello, Oge</Text>
                 </View>
               </View>
       
               <TouchableOpacity
                 style={styles.notification}
                 activeOpacity={0.8}
                 onPress={() => alert("Notifications")}
               >
                 <Ionicons name="notifications-outline" size={24} color="#222" />
               </TouchableOpacity>
             </View>
       

        <View style={styles.mapArea}>
          <Image source={require('../../assets/map.png')} resizeMode="cover" style={styles.map} />
        </View>

        <View style={styles.driverInfoCard}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>Your driver is on the way</Text>
            <Text style={styles.pickup}><Ionicons name="location-outline" size={12} color="#514B49" /> Pickup: 123 Innovation Drive</Text>
          </View>
          <View style={styles.eta}><Text style={styles.etaText}>3 min</Text></View>
        </View>

        <View style={styles.driverRow}>
          <View style={styles.avatar}><Text style={styles.avatarInitials}>SG</Text><View style={styles.rating}><Text style={styles.ratingText}>★ 4.9</Text></View></View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>Samuel Green</Text>
            <Text style={styles.carName}>TOYOTA PRIUS •</Text>
            <Text style={styles.plate}>ABC-1234</Text>
          </View>
          <Pressable accessibilityLabel="Call driver" style={styles.actionButton}><Ionicons name="call-outline" size={22} color="#FFFFFF" /></Pressable>
          <Pressable accessibilityLabel="Message driver" style={styles.actionButton}><Ionicons name="chatbox-outline" size={21} color="#FFFFFF" /></Pressable>
        </View>

        <View style={styles.statsRow}>
          <Stat label="PRICE" value="₦3,200" />
          <Stat label="DISTANCE" value="3 Km" />
        </View>

        <Pressable accessibilityRole="button" onPress={() => setCancelModalVisible(true)} style={styles.cancelLink}>
          <Text style={styles.cancelText}>Cancel Ride</Text>
        </Pressable>
        </View>
      </ScrollView>

      <Modal transparent animationType="fade" visible={cancelModalVisible} onRequestClose={() => setCancelModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}><Ionicons name="alert-outline" color="#F07D3B" size={30} /></View>
            <Text style={styles.modalTitle}>Cancel this ride?</Text>
            <Text style={styles.modalCopy}>Your driver has been assigned and is already on the way.</Text>
            <Pressable onPress={cancelRide} style={styles.confirmCancel}><Text style={styles.confirmCancelText}>Yes, cancel ride</Text></Pressable>
            <Pressable onPress={() => setCancelModalVisible(false)} style={styles.keepRide}><Text style={styles.keepRideText}>Keep ride</Text></Pressable>
          </View>
        </View>
      </Modal>

      <BottomTab />
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <View style={styles.stat}><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 15,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFEDD6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D96C0B",
  },
  smallText: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  notification: {
    width: 46,
    height: 46,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  content: { paddingBottom: 120 },
  header: { height: 70, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF' },
 
  mapArea: { height: 311, overflow: 'hidden' }, map: { width: '100%', height: '100%' },
  driverInfoCard: { height: 372.5, marginHorizontal: 16, marginTop: 16, borderRadius: 32, padding: 24, backgroundColor: '#FFFFFF', shadowColor: '#2F2A2B', shadowOpacity: 0.102, shadowOffset: { width: 0, height: 24 }, shadowRadius: 48, elevation: 8 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 19 }, title: { color: '#4B403C', fontSize: 16, fontWeight: '800', letterSpacing: -0.35 }, pickup: { color: '#514B49', fontSize: 10, marginTop: 5 },
  eta: { borderRadius: 18, backgroundColor: '#FF9C45', paddingVertical: 10, paddingHorizontal: 14 }, etaText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  driverRow: { height: 72, borderRadius: 16, backgroundColor: '#FFF5F4', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 19 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: '#F6EEE9', backgroundColor: '#DBB5A4', alignItems: 'center', justifyContent: 'center', position: 'relative' },
 
    rating: { position: 'absolute', minWidth: 31, bottom: -10, borderRadius: 8, paddingHorizontal: 3, paddingVertical: 2, backgroundColor: '#FFFFFF', alignItems: 'center' }, ratingText: { color: '#4E4846', fontSize: 8, fontWeight: '700' },
  driverDetails: { flex: 1, marginLeft: 10 }, driverName: { color: '#373130', fontSize: 12, fontWeight: '800' }, carName: { color: '#6E6663', fontSize: 9, fontWeight: '700', marginTop: 2 }, plate: { color: '#6E6663', fontSize: 9, fontWeight: '700', marginTop: 1 },
  actionButton: { width: 37, height: 37, borderRadius: 19, backgroundColor: '#FF9C45', alignItems: 'center', justifyContent: 'center', marginLeft: 7 },
  statsRow: { flexDirection: 'row', gap: 14, marginBottom: 25 }, stat: { flex: 1, height: 61, borderRadius: 13, backgroundColor: '#F8EBED', paddingHorizontal: 13, paddingVertical: 12 }, statLabel: { color: '#6D6563', fontSize: 8, fontWeight: '800', letterSpacing: 0.5 }, statValue: { color: '#3D3634', fontSize: 14, fontWeight: '800', marginTop: 5 },
  cancelLink: { alignSelf: 'center', padding: 3 }, cancelText: { color: '#5B504C', fontSize: 11, fontWeight: '600' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(39, 27, 20, 0.34)', alignItems: 'center', justifyContent: 'center', padding: 24 }, modalCard: { width: '100%', maxWidth: 358, borderRadius: 28, backgroundColor: '#FFFFFF', alignItems: 'center', padding: 26 }, modalIcon: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#FFF0E5', justifyContent: 'center', alignItems: 'center', marginBottom: 13 }, modalTitle: { color: '#302D2D', fontSize: 18, fontWeight: '800' }, modalCopy: { color: '#7F7774', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 8, marginBottom: 20 }, confirmCancel: { width: '100%', borderRadius: 20, backgroundColor: '#EF765E', paddingVertical: 12, alignItems: 'center', marginBottom: 10 }, confirmCancelText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' }, keepRide: { paddingVertical: 8, paddingHorizontal: 18 }, keepRideText: { color: '#5B504C', fontSize: 13, fontWeight: '700' },
});
