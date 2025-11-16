import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Settings, Bell, Heart, Palette, Type, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { storage, StorageKeys, UserPreferences, defaultPreferences } from '@/utils/storage';

export default function SettingsScreen() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const saved = await storage.getItem<UserPreferences>(StorageKeys.USER_PREFERENCES);
    if (saved) {
      setPreferences(saved);
    }
  };

  const savePreferences = async (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    await storage.setItem(StorageKeys.USER_PREFERENCES, newPreferences);
  };

  const updateNotificationSetting = (key: keyof UserPreferences['notifications'], value: boolean) => {
    const newPreferences = {
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: value,
      },
    };
    savePreferences(newPreferences);
  };

  const updateDisplaySetting = (key: keyof UserPreferences['display'], value: any) => {
    const newPreferences = {
      ...preferences,
      display: {
        ...preferences.display,
        [key]: value,
      },
    };
    savePreferences(newPreferences);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Notifications Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Service Reminders</Text>
            <Switch
              value={preferences.notifications.serviceReminders}
              onValueChange={(value) => updateNotificationSetting('serviceReminders', value)}
              trackColor={{ false: '#D1D5DB', true: '#FEF3C7' }}
              thumbColor={preferences.notifications.serviceReminders ? '#F59E0B' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Blog Updates</Text>
            <Switch
              value={preferences.notifications.blogUpdates}
              onValueChange={(value) => updateNotificationSetting('blogUpdates', value)}
              trackColor={{ false: '#D1D5DB', true: '#FEF3C7' }}
              thumbColor={preferences.notifications.blogUpdates ? '#F59E0B' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Event Alerts</Text>
            <Switch
              value={preferences.notifications.eventAlerts}
              onValueChange={(value) => updateNotificationSetting('eventAlerts', value)}
              trackColor={{ false: '#D1D5DB', true: '#FEF3C7' }}
              thumbColor={preferences.notifications.eventAlerts ? '#F59E0B' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Prayer Updates</Text>
            <Switch
              value={preferences.notifications.prayerUpdates}
              onValueChange={(value) => updateNotificationSetting('prayerUpdates', value)}
              trackColor={{ false: '#D1D5DB', true: '#FEF3C7' }}
              thumbColor={preferences.notifications.prayerUpdates ? '#F59E0B' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Display Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Palette size={20} color="#1E3A8A" />
            <Text style={styles.sectionTitle}>Display</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Font Size</Text>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>
                {preferences.display.fontSize.charAt(0).toUpperCase() + preferences.display.fontSize.slice(1)}
              </Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={preferences.display.darkMode}
              onValueChange={(value) => updateDisplaySetting('darkMode', value)}
              trackColor={{ false: '#D1D5DB', true: '#DBEAFE' }}
              thumbColor={preferences.display.darkMode ? '#1E3A8A' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Giving Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color="#DC2626" />
            <Text style={styles.sectionTitle}>Giving Preferences</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Default Amount</Text>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>
                {preferences.giving.defaultAmount ? `$${preferences.giving.defaultAmount}` : 'Not set'}
              </Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Default Frequency</Text>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>
                {preferences.giving.defaultFrequency || 'One time'}
              </Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#6B7280" />
            <Text style={styles.sectionTitle}>About</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>App Version</Text>
            <Text style={styles.settingValueText}>1.0.0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Contact Support</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'CrimsonText-Bold',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
    fontFamily: 'CrimsonText-Bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
});