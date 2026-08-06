import React, { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TextInput,
  View,
} from 'react-native';

type Driver = {
  id: string;
  name: string;
  car: string;
  fare: number;
  trips: string;
  eta: string;
};

const drivers: Driver[] = [
  { id: '1', name: 'Samuel Green', car: 'Toyota Prius • White', fare: 3200, trips: '1,240 trips', eta: '4 mins away' },
  { id: '2', name: 'Samuel Green', car: 'Toyota Corolla • White', fare: 4200, trips: '1,240 trips', eta: '4 mins away' },
  { id: '3', name: 'Samuel Green', car: 'Toyota Corolla • White', fare: 2800, trips: '1,240 trips', eta: '4 mins away' },
];

const toNumber = (value: string) => Number(value.replace(/[^0-9]/g, '')) || 0;
const formatNaira = (value: number) => `₦ ${value.toLocaleString('en-NG')}`;

export default function DriversOffer() {
  const [minimum, setMinimum] = useState('2500');
  const [maximum, setMaximum] = useState('4500');
  // This screen is opened after the user taps “Find Drivers” on the price-range screen.
  const [hasSearched, setHasSearched] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const matchingDrivers = useMemo(() => {
    const min = toNumber(minimum);
    const max = toNumber(maximum);
    return drivers.filter((driver) => driver.fare >= min && driver.fare <= max);
  }, [minimum, maximum]);

  const findDrivers = () => {
    const min = toNumber(minimum);
    const max = toNumber(maximum);

    if (!min || !max || min > max) {
      Alert.alert('Invalid price range', 'Enter a minimum price that is lower than the maximum price.');
      return;
    }

    setHasSearched(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImage}><Text style={styles.profileEmoji}>👨🏾</Text></View>
          <View style={styles.greeting}>
            <Text style={styles.welcome}>Welcome back</Text>
            <Text style={styles.name}>Hello, Oge</Text>
          </View>
          <Pressable accessibilityLabel="Notifications" onPress={() => Alert.alert('Notifications', 'You have no new notifications.')} style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>♧</Text>
          </Pressable>
        </View>

        <View style={styles.tripCard}>
          <LocationField label="PICKUP LOCATION" icon="⌖" iconStyle={styles.pickupIcon} value="123 Innovation Drive, Tech Hub" />
          <LocationField label="DESTINATION" icon="⌕" iconStyle={styles.destinationIcon} value="T Building, Wuse 2" />
        </View>

        <View style={styles.priceCard}>
          <View style={styles.priceLabels}>
            <Text style={styles.priceLabel}>Base Price (Min)</Text>
            <Text style={styles.priceLabel}>Max Price</Text>
          </View>
          <View style={styles.priceFields}>
            <PriceInput value={minimum} onChangeText={setMinimum} />
            <PriceInput value={maximum} onChangeText={setMaximum} />
          </View>
          <Pressable onPress={findDrivers} style={({ pressed }) => [styles.findButton, pressed && styles.pressed]}>
            <Text style={styles.findButtonText}>Find Drivers</Text>
          </Pressable>
        </View>

        {hasSearched && (
          <View style={styles.offersSection}>
            <Text style={styles.offersTitle}>Available drivers</Text>
            {matchingDrivers.length ? (
              matchingDrivers.map((driver, index) => (
                <DriverCard key={driver.id} driver={driver} filled={index === matchingDrivers.length - 1} onAccept={() => setSelectedDriver(driver)} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No drivers found</Text>
                <Text style={styles.emptyCopy}>Try increasing your maximum price.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <Modal transparent animationType="fade" visible={Boolean(selectedDriver)} onRequestClose={() => setSelectedDriver(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.checkCircle}><Text style={styles.check}>✓</Text></View>
            <Text style={styles.modalTitle}>Offer accepted</Text>
            <Text style={styles.modalCopy}>{selectedDriver?.name} has accepted your {selectedDriver && formatNaira(selectedDriver.fare)} offer and is on the way.</Text>
            <Pressable onPress={() => setSelectedDriver(null)} style={styles.doneButton}><Text style={styles.doneButtonText}>Done</Text></Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function LocationField({ label, icon, iconStyle, value }: { label: string; icon: string; iconStyle: StyleProp<TextStyle>; value: string }) {
  return <View style={styles.locationGroup}>
    <Text style={styles.locationLabel}>{label}</Text>
    <View style={styles.locationField}><Text style={[styles.locationIcon, iconStyle]}>{icon}</Text><Text style={styles.locationText}>{value}</Text></View>
  </View>;
}

function PriceInput({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  return <View style={styles.priceInputWrap}><Text style={styles.naira}>₦</Text><TextInput value={value} onChangeText={onChangeText} keyboardType="number-pad" maxLength={6} style={styles.priceInput} accessibilityLabel="Ride price" /></View>;
}

function DriverCard({ driver, filled, onAccept }: { driver: Driver; filled: boolean; onAccept: () => void }) {
  return <View style={styles.driverCard}>
    <View style={styles.driverRow}>
      <View style={styles.driverAvatar}><Text style={styles.driverEmoji}>🧔🏾</Text></View>
      <View style={styles.driverInfo}><Text style={styles.driverName}>{driver.name}</Text><Text style={styles.car}>▣ {driver.car}</Text></View>
      <Text style={styles.fare}>{formatNaira(driver.fare)}</Text>
    </View>
    <View style={styles.tags}><Text style={styles.tag}>◷ {driver.trips}</Text><Text style={styles.tag}>◷ {driver.eta}</Text></View>
    <Pressable onPress={onAccept} style={({ pressed }) => [styles.acceptButton, filled && styles.acceptButtonFilled, pressed && styles.pressed]}><Text style={styles.acceptText}>Accept Offer</Text></Pressable>
  </View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' }, content: { padding: 15, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 }, profileImage: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EBD8CC', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#F7F1EC' }, profileEmoji: { fontSize: 24 }, greeting: { flex: 1, marginLeft: 10 }, welcome: { color: '#928D8A', fontSize: 11, marginBottom: 2 }, name: { color: '#302D2D', fontSize: 17, fontWeight: '800' }, notificationButton: { width: 37, height: 37, borderRadius: 12, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center' }, notificationIcon: { fontSize: 21, color: '#352F2E' },
  tripCard: { borderRadius: 14, borderWidth: 1, borderColor: '#F3EDED', padding: 17, marginBottom: 27, shadowColor: '#6A4430', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 1 }, locationGroup: { marginBottom: 11 }, locationLabel: { color: '#AAA4A1', fontSize: 8, fontWeight: '800', letterSpacing: 0.5, marginBottom: 6, marginLeft: 2 }, locationField: { height: 37, borderWidth: 1, borderColor: '#EBE5E3', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }, locationIcon: { width: 20, fontSize: 17 }, pickupIcon: { color: '#FF8D32' }, destinationIcon: { color: '#AAA4A1' }, locationText: { color: '#302D2D', fontSize: 11 },
  priceCard: { borderRadius: 14, borderWidth: 1, borderColor: '#F8F4F2', padding: 11, marginHorizontal: -5, shadowColor: '#6A4430', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 2 }, priceLabels: { flexDirection: 'row', gap: 15, marginBottom: 8 }, priceLabel: { flex: 1, color: '#6D6563', fontSize: 9, fontWeight: '700' }, priceFields: { flexDirection: 'row', gap: 15 }, priceInputWrap: { flex: 1, height: 44, borderRadius: 11, backgroundColor: '#FFF2F4', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }, naira: { color: '#302D2D', fontSize: 14, fontWeight: '800', marginRight: 4 }, priceInput: { flex: 1, padding: 0, color: '#302D2D', fontSize: 15, fontWeight: '800' }, findButton: { borderRadius: 22, backgroundColor: '#FF9C45', alignItems: 'center', justifyContent: 'center', paddingVertical: 13, marginTop: 16, shadowColor: '#FF9C45', shadowOpacity: 0.35, shadowRadius: 7, elevation: 3 }, findButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' }, pressed: { opacity: 0.82 },
  offersSection: { marginTop: 20 }, offersTitle: { color: '#302D2D', fontSize: 14, fontWeight: '800', marginBottom: 10, marginLeft: 1 }, driverCard: { borderRadius: 22, backgroundColor: '#FFFFFF', padding: 12, marginBottom: 14, shadowColor: '#403027', shadowOpacity: 0.07, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 3 }, driverRow: { flexDirection: 'row', alignItems: 'center' }, driverAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: '#F6EEE9', backgroundColor: '#D8B6A4', justifyContent: 'center', alignItems: 'center' }, driverEmoji: { fontSize: 23 }, driverInfo: { flex: 1, marginLeft: 9 }, driverName: { color: '#302D2D', fontSize: 13, fontWeight: '800' }, car: { color: '#3F3938', fontSize: 10, marginTop: 2 }, fare: { color: '#FF9743', fontSize: 17, fontWeight: '800' }, tags: { flexDirection: 'row', gap: 10, marginTop: 9, marginBottom: 12, marginLeft: 48 }, tag: { borderRadius: 12, overflow: 'hidden', backgroundColor: '#FFF1F3', color: '#4B4544', fontSize: 9, paddingVertical: 4, paddingHorizontal: 8 }, acceptButton: { height: 38, borderRadius: 20, borderWidth: 1, borderColor: '#FF9C45', alignItems: 'center', justifyContent: 'center' }, acceptButtonFilled: { backgroundColor: '#FF9C45' }, acceptText: { color: '#FF9C45', fontSize: 13, fontWeight: '800' },
  emptyState: { alignItems: 'center', paddingVertical: 35 }, emptyTitle: { color: '#302D2D', fontSize: 15, fontWeight: '800', marginBottom: 6 }, emptyCopy: { color: '#857D7A', fontSize: 12 }, modalBackdrop: { flex: 1, backgroundColor: 'rgba(39, 27, 20, 0.34)', alignItems: 'center', justifyContent: 'center', padding: 22 }, modalCard: { width: '100%', borderRadius: 22, backgroundColor: '#FFFFFF', padding: 25, alignItems: 'center' }, checkCircle: { width: 55, height: 55, borderRadius: 28, backgroundColor: '#FFF0DF', alignItems: 'center', justifyContent: 'center', marginBottom: 13 }, check: { color: '#FF9C45', fontSize: 28, fontWeight: '800' }, modalTitle: { color: '#302D2D', fontSize: 19, fontWeight: '800', marginBottom: 8 }, modalCopy: { color: '#7F7774', fontSize: 12, lineHeight: 18, textAlign: 'center', marginBottom: 20 }, doneButton: { borderRadius: 20, backgroundColor: '#FF9C45', paddingVertical: 11, paddingHorizontal: 28 }, doneButtonText: { color: '#FFFFFF', fontWeight: '800' },
});
