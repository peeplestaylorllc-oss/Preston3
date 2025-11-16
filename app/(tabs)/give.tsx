import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { Heart, CreditCard, Smartphone, RotateCcw, Info } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GiveScreen() {
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('once');
  const [selectedCategory, setSelectedCategory] = useState<string>('tithes');

  const presetAmounts = ['25', '50', '100', '250'];
  

  const categories = [
    { value: 'tithes', label: 'Tithes & Offerings', description: 'General church support' },
    { value: 'missions', label: 'Missions', description: 'Global outreach programs' },
    { value: 'building', label: 'Building Fund', description: 'Facility improvements' },
    { value: 'youth', label: 'Youth Ministry', description: 'Programs for young people' },
    { value: 'children', label: 'Children\'s Ministry', description: 'KidZone and nursery' },
  ];

  const handleGive = async () => {
    const url = 'https://pushpay.com/g/umcprestonhollow?src=hpp';
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open the giving page.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Give</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Giving Impact Section */}
        <View style={styles.impactSection}>
          <Heart size={32} color="#F59E0B" />
          <Text style={styles.impactTitle}>Your Generosity Makes a Difference</Text>
          <Text style={styles.impactDescription}>
            Every gift helps us serve our community, support families in need, 
            and spread God's love both locally and around the world.
          </Text>
        </View>




        {/* Text to Give Info */}
        <View style={styles.textGiveSection}>
          <View style={styles.textGiveContent}>
          <View style={styles.textGiveHeader}>
            <Smartphone size={24} color="#1E3A8A" />
            <Text style={styles.textGiveTitle}>Text to Give</Text>
          </View>
          <Text style={styles.textGiveDescription}>
            TEXT PHUMC TO 77977
          </Text>
          </View>
        </View>

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <Info size={20} color="#059669" />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Secure & Safe</Text>
            <Text style={styles.securityDescription}>
              All donations are processed through our secure, encrypted payment system. 
              Your information is never stored on our servers.
            </Text>
          </View>
        </View>

        {/* Give Button */}
        <TouchableOpacity style={styles.giveButton} onPress={handleGive}>
          <Heart size={20} color={Colors.primary[500]} />
          <Text style={styles.giveButtonText}>
            Give Online
          </Text>
        </TouchableOpacity>

        {/* Payment Methods */}
        <View style={styles.paymentMethods}>
          <View style={styles.paymentMethodsContent}>
          <Text style={styles.paymentTitle}>Accepted Payment Methods</Text>
          <View style={styles.paymentIcons}>
            <View style={styles.paymentIcon}>
              <CreditCard size={24} color="#6B7280" />
              <Text style={styles.paymentLabel}>Card</Text>
            </View>
            <View style={styles.paymentIcon}>
              <Text style={styles.paymentBrand}>Check</Text>
            </View>
            <View style={styles.paymentIcon}>
              <Text style={styles.paymentBrand}>In Person</Text>
            </View>
          </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary[500],
    fontFamily: 'CrimsonText-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  impactSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.dark.bgElevated,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold',
  },
  impactDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionContent: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 24,
    marginTop: 8,
    fontFamily: 'CrimsonText-Bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  textGiveSection: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginBottom: 20,
  },
  textGiveContent: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  textGiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textGiveTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginLeft: 8,
    fontFamily: 'CrimsonText-Bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  textGiveDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  textGiveNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary[500],
    textAlign: 'center',
    marginVertical: 8,
  },
  textGiveExample: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  securityInfo: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  securityText: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 20,
  },
  giveButton: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  giveButtonText: {
    color: Colors.primary[500],
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 1,
  },
  paymentMethods: {
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    marginTop: 20,
  },
  paymentMethodsContent: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  paymentIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  paymentIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  paymentBrand: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
});