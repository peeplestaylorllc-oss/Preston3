// Shared home screen data and types.
// These mirror the inline arrays previously defined in HomeScreen.
// You can gradually migrate your screen to import and use these instead
// of hard-coding data in the component.

export type LiveService = {
  id: number;
  title: string;
  // Using any here because in React Native ImageSource can be number | { uri: string }
  thumbnail: any;
};

export type CdcSection = {
  id: number;
  title: string;
  description: string;
  thumbnail: any;
  route: string;
};

export type PrayerRequest = {
  id: number;
  request: string;
  author: string;
  date: string;
  prayers: number;
};

export const LIVE_SERVICES: LiveService[] = [
  {
    id: 0,
    title: "WEDNESDAY'S WORD",
    thumbnail: require('@/assets/images/Screen Shot 2025-11-13 at 10.20.17 AM.png'),
  },
  {
    id: 1,
    title: 'Sunday Morning Worship',
    thumbnail: require('@/assets/images/112-SAM03161-scaled copy copy copy.jpg'),
  },
];

export const CDC_SECTIONS: CdcSection[] = [
  {
    id: 1,
    title: 'CDC Overview',
    description: 'Mission, philosophy & programs',
    thumbnail: { uri: 'https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg' },
    route: '/cdc-overview',
  },
  {
    id: 2,
    title: 'Age-Based Programs',
    description: 'Infant through Pre-K',
    thumbnail: { uri: 'https://images.pexels.com/photos/8364028/pexels-photo-8364028.jpeg' },
    route: '/cdc-programs',
  },
  {
    id: 3,
    title: 'Curriculum & Enrichment',
    description: 'Learning through play, faith & creativity',
    thumbnail: { uri: 'https://images.pexels.com/photos/8363213/pexels-photo-8363213.jpeg' },
    route: '/cdc-curriculum',
  },
  {
    id: 4,
    title: 'Tuition & Enrollment',
    description: 'Rates, financial aid & how to enroll',
    thumbnail: { uri: 'https://images.pexels.com/photos/8363105/pexels-photo-8363105.jpeg' },
    route: '/cdc-enrollment',
  },
];

export const RECENT_PRAYERS: PrayerRequest[] = [
  {
    id: 1,
    request: 'Please pray for healing for my grandmother who is in the hospital.',
    author: 'Sarah M.',
    date: '2 hours ago',
    prayers: 12,
  },
  {
    id: 2,
    request: 'Pray for wisdom as I make important career decisions.',
    author: 'Anonymous',
    date: '5 hours ago',
    prayers: 8,
  },
];
