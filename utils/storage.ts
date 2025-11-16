import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  USER_PREFERENCES: 'user_preferences',
  GIVING_HISTORY: 'giving_history',
  PRAYER_REQUESTS: 'prayer_requests',
  NOTIFICATION_SETTINGS: 'notification_settings',
  CACHED_SERMONS: 'cached_sermons',
  BIBLE_BOOKMARKS: 'bible_bookmarks',
} as const;

export const storage = {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

// User preferences interface
export interface UserPreferences {
  notifications: {
    serviceReminders: boolean;
    blogUpdates: boolean;
    eventAlerts: boolean;
    prayerUpdates: boolean;
  };
  giving: {
    defaultAmount?: string;
    defaultFrequency?: 'once' | 'weekly' | 'monthly';
    defaultCategory?: string;
  };
  display: {
    fontSize: 'small' | 'medium' | 'large';
    darkMode: boolean;
  };
}

export const defaultPreferences: UserPreferences = {
  notifications: {
    serviceReminders: true,
    blogUpdates: true,
    eventAlerts: true,
    prayerUpdates: false,
  },
  giving: {},
  display: {
    fontSize: 'medium',
    darkMode: false,
  },
};