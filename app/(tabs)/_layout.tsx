import { Tabs } from 'expo-router';
import { Heart, Menu, Baby, BookOpen, Music, Home, Tv } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import ChristianCross from '@/components/ChristianCross';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: Colors.dark.bgElevated,
          borderTopWidth: 0,
          paddingBottom: 12,
          paddingTop: 8,
          height: 85,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 6,
          letterSpacing: 0.3,
        },
        tabBarItemStyle: {
          flex: 1,
          minWidth: 0,
          paddingVertical: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <Home
              size={24}
              color={color}
              fill={focused ? color : 'none'}
              strokeWidth={focused ? 2 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="worship"
        options={{
          title: 'Worship',
          tabBarIcon: ({ size, color, focused }) => (
            <Tv
              size={24}
              color={color}
              strokeWidth={focused ? 2 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="give"
        options={{
          title: 'Give',
          tabBarIcon: ({ size, color, focused }) => (
            <Heart
              size={24}
              color={color}
              fill={focused ? color : 'none'}
              strokeWidth={focused ? 2 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: 'Bible',
          tabBarIcon: ({ size, color, focused }) => (
            <BookOpen
              size={24}
              color={color}
              strokeWidth={focused ? 2 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="kids"
        options={{
          title: 'Kids',
          tabBarIcon: ({ size, color, focused }) => (
            <Baby
              size={24}
              color={color}
              strokeWidth={focused ? 2 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ size, color, focused }) => (
            <Menu
              size={24}
              color={color}
              strokeWidth={focused ? 2 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}