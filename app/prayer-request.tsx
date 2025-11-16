import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, Heart, Send } from 'lucide-react-native';

export default function PrayerRequestScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [request, setRequest] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!request.trim()) {
      Alert.alert('Missing Information', 'Please enter your prayer request.');
      return;
    }

    if (!isAnonymous && (!name.trim() || !email.trim())) {
      Alert.alert('Missing Information', 'Please enter your name and email, or submit anonymously.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Prayer Request Submitted',
        'Thank you for sharing your prayer request with us. Our prayer team will lift you up in prayer.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setName('');
              setEmail('');
              setPhone('');
              setRequest('');
              setIsAnonymous(false);
              router.back();
            },
          },
        ]
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#0891B2" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prayer Request</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.introCard}>
            <Heart size={32} color="#0891B2" />
            <Text style={styles.introTitle}>We're Here to Pray With You</Text>
            <Text style={styles.introDescription}>
              Share your prayer request with our caring prayer team. Your request will be
              handled with confidentiality and lifted up in prayer.
            </Text>
          </View>

          <View style={styles.formSection}>
            <TouchableOpacity
              style={styles.anonymousToggle}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <View style={[styles.checkbox, isAnonymous && styles.checkboxChecked]}>
                {isAnonymous && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.anonymousLabel}>Submit anonymously</Text>
            </TouchableOpacity>

            {!isAnonymous && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Name <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Email <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone (Optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Prayer Request <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Share your prayer request here..."
                value={request}
                onChangeText={setRequest}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How We Handle Your Request</Text>
            <Text style={styles.infoText}>
              • Your prayer request will be shared with our dedicated prayer team
            </Text>
            <Text style={styles.infoText}>
              • We maintain strict confidentiality
            </Text>
            <Text style={styles.infoText}>
              • You may receive a follow-up from our pastoral care team
            </Text>
            <Text style={styles.infoText}>
              • Emergency situations should be directed to 911 or local authorities
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0891B2',
    fontFamily: 'CrimsonText-Bold',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  introCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
    fontFamily: 'CrimsonText-Bold',
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0891B2',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0891B2',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  anonymousLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    height: 150,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#0891B2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0891B2',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 12,
    fontFamily: 'CrimsonText-Bold',
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 22,
    marginBottom: 6,
  },
});
