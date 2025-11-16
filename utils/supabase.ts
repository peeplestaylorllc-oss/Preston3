import { createClient } from '@supabase/supabase-js';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your Expo config (app.json or app.config).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Returns a stable anonymous user id stored on the device.
 * Generated once and persisted in AsyncStorage.
 */
const USER_ID_KEY = 'anon_user_id';

export const getUserId = async (): Promise<string> => {
  try {
    const existing = await AsyncStorage.getItem(USER_ID_KEY);
    if (existing) {
      return existing;
    }

    const deviceId = Device.deviceName || Platform.OS;
    const uniqueId = `${deviceId}-${Date.now()}`;

    await AsyncStorage.setItem(USER_ID_KEY, uniqueId);
    return uniqueId;
  } catch (error) {
    console.warn(
      'Failed to read/write anonymous user id. Falling back to ephemeral id.',
      error
    );
    const deviceId = Device.deviceName || Platform.OS;
    return `${deviceId}-${Date.now()}`;
  }
};
