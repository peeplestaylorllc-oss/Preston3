import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, DollarSign, FileText, Calendar, CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CDCEnrollment() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enrollment & Tuition</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Enrollment Information</Text>
        <Text style={styles.subtitle}>
          Join our nurturing community for the 2025-26 school year
        </Text>

        <View style={styles.highlightBox}>
          <Calendar size={24} color="#8B5CF6" />
          <View style={styles.highlightContent}>
            <Text style={styles.highlightTitle}>Now Enrolling</Text>
            <Text style={styles.highlightText}>2025-26 School Year</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={24} color="#1F2937" />
            <Text style={styles.sectionTitle}>Tuition Rates 2025-26</Text>
          </View>

          <View style={styles.tuitionCard}>
            <View style={styles.tuitionRow}>
              <Text style={styles.tuitionLabel}>Monthly Tuition:</Text>
              <Text style={styles.tuitionAmount}>$1,300 - $1,665</Text>
            </View>
            <Text style={styles.tuitionNote}>
              *Rates vary by age group and program
            </Text>
          </View>

          <View style={styles.feeCard}>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Enrollment Fee:</Text>
              <Text style={styles.feeAmount}>$350</Text>
            </View>
            <Text style={styles.feeNote}>
              Non-refundable per child
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={24} color="#1F2937" />
            <Text style={styles.sectionTitle}>Enrollment Process</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Submit Online Registration</Text>
              <Text style={styles.stepDescription}>
                Complete the online registration form for the 2025-26 school year
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Pay Enrollment Fee</Text>
              <Text style={styles.stepDescription}>
                Submit the $350 non-refundable enrollment fee per child
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Complete Required Documents</Text>
              <Text style={styles.stepDescription}>
                Submit immunization records and other required paperwork
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Attend Orientation</Text>
              <Text style={styles.stepDescription}>
                Join us for new family orientation before the school year begins
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CheckCircle size={24} color="#1F2937" />
            <Text style={styles.sectionTitle}>What's Included</Text>
          </View>

          <View style={styles.includedList}>
            <Text style={styles.includedItem}>✓ Daily breakfast and lunch</Text>
            <Text style={styles.includedItem}>✓ All classroom materials and supplies</Text>
            <Text style={styles.includedItem}>✓ Music program</Text>
            <Text style={styles.includedItem}>✓ Chapel services</Text>
            <Text style={styles.includedItem}>✓ Bible lessons</Text>
            <Text style={styles.includedItem}>✓ STEM room activities</Text>
            <Text style={styles.includedItem}>✓ Library access</Text>
            <Text style={styles.includedItem}>✓ Daily parent communication</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => Linking.openURL('https://prestonhollowchurch.com/cdc-home/')}
        >
          <Text style={styles.registerButtonText}>Register Online</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL('tel:214-369-4630')}
        >
          <Text style={styles.contactButtonText}>Call to Learn More</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  highlightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  highlightContent: {
    marginLeft: 16,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  highlightText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
    marginTop: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  tuitionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  tuitionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tuitionLabel: {
    fontSize: 16,
    color: '#4B5563',
  },
  tuitionAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tuitionNote: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  feeCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  feeLabel: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: '500',
  },
  feeAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400E',
  },
  feeNote: {
    fontSize: 14,
    color: '#92400E',
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  includedList: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  includedItem: {
    fontSize: 16,
    color: '#166534',
    marginBottom: 10,
    lineHeight: 24,
  },
  registerButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  contactButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactButtonText: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 32,
  },
});
