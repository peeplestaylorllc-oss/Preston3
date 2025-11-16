import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserId } from './supabase';

export interface User {
  id: string;
  isGuest: boolean;
}

const AUTH_KEY = '@auth_user';

export const authService = {
  async getCurrentUser(): Promise<User> {
    try {
      const stored = await AsyncStorage.getItem(AUTH_KEY);
      if (stored) {
        return JSON.parse(stored);
      }

      const guestId = await getUserId();
      const user: User = {
        id: guestId,
        isGuest: true,
      };

      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      const guestId = await getUserId();
      return {
        id: guestId,
        isGuest: true,
      };
    }
  },

  async getUserId(): Promise<string> {
    const user = await this.getCurrentUser();
    return user.id;
  },
};
