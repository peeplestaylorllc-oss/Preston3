import React, { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, FlatList, Alert, ActivityIndicator } from 'react-native';
import { BookOpen, Search, Bookmark, Settings, ChevronLeft, ChevronRight, Heart, Share, X, Plus, Minus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase, getUserId } from '@/utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BibleVerse {
  verse: number;
  text: string;
}

interface BibleBook {
  name: string;
  chapters: number;
  testament: 'Old' | 'New';
}

interface Bookmark {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  date: string;
}

export default function BibleScreen() {
  const [selectedBook, setSelectedBook] = useState('John');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [currentVerses, setCurrentVerses] = useState<BibleVerse[]>([]);
  const [bookModalVisible, setBookModalVisible] = useState(false);
  const [chapterModalVisible, setChapterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [fontSize, setFontSize] = useState(16);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [bookmarksVisible, setBookmarksVisible] = useState(false);
  const [selectedTestament, setSelectedTestament] = useState<'Old' | 'New' | 'All'>('All');
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const bibleBooks: BibleBook[] = [
    // Old Testament
    { name: 'Genesis', chapters: 50, testament: 'Old' },
    { name: 'Exodus', chapters: 40, testament: 'Old' },
    { name: 'Leviticus', chapters: 27, testament: 'Old' },
    { name: 'Numbers', chapters: 36, testament: 'Old' },
    { name: 'Deuteronomy', chapters: 34, testament: 'Old' },
    { name: 'Joshua', chapters: 24, testament: 'Old' },
    { name: 'Judges', chapters: 21, testament: 'Old' },
    { name: 'Ruth', chapters: 4, testament: 'Old' },
    { name: '1 Samuel', chapters: 31, testament: 'Old' },
    { name: '2 Samuel', chapters: 24, testament: 'Old' },
    { name: '1 Kings', chapters: 22, testament: 'Old' },
    { name: '2 Kings', chapters: 25, testament: 'Old' },
    { name: 'Psalms', chapters: 150, testament: 'Old' },
    { name: 'Proverbs', chapters: 31, testament: 'Old' },
    { name: 'Ecclesiastes', chapters: 12, testament: 'Old' },
    { name: 'Isaiah', chapters: 66, testament: 'Old' },
    // New Testament
    { name: 'Matthew', chapters: 28, testament: 'New' },
    { name: 'Mark', chapters: 16, testament: 'New' },
    { name: 'Luke', chapters: 24, testament: 'New' },
    { name: 'John', chapters: 21, testament: 'New' },
    { name: 'Acts', chapters: 28, testament: 'New' },
    { name: 'Romans', chapters: 16, testament: 'New' },
    { name: '1 Corinthians', chapters: 16, testament: 'New' },
    { name: '2 Corinthians', chapters: 13, testament: 'New' },
    { name: 'Galatians', chapters: 6, testament: 'New' },
    { name: 'Ephesians', chapters: 6, testament: 'New' },
    { name: 'Philippians', chapters: 4, testament: 'New' },
    { name: 'Colossians', chapters: 4, testament: 'New' },
    { name: '1 Thessalonians', chapters: 5, testament: 'New' },
    { name: '2 Thessalonians', chapters: 3, testament: 'New' },
    { name: '1 Timothy', chapters: 6, testament: 'New' },
    { name: '2 Timothy', chapters: 4, testament: 'New' },
    { name: 'Titus', chapters: 3, testament: 'New' },
    { name: 'Hebrews', chapters: 13, testament: 'New' },
    { name: 'James', chapters: 5, testament: 'New' },
    { name: '1 Peter', chapters: 5, testament: 'New' },
    { name: '2 Peter', chapters: 3, testament: 'New' },
    { name: '1 John', chapters: 5, testament: 'New' },
    { name: '2 John', chapters: 1, testament: 'New' },
    { name: '3 John', chapters: 1, testament: 'New' },
    { name: 'Jude', chapters: 1, testament: 'New' },
    { name: 'Revelation', chapters: 22, testament: 'New' },
  ];

  const bookNameMapping: { [key: string]: string } = {
    'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
    'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
    '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI', '2 Kings': '2KI',
    'Psalms': 'PSA', 'Proverbs': 'PRO', 'Ecclesiastes': 'ECC', 'Isaiah': 'ISA',
    'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN',
    'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO',
    'Galatians': 'GAL', 'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL',
    '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI',
    '2 Timothy': '2TI', 'Titus': 'TIT', 'Hebrews': 'HEB', 'James': 'JAS',
    '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN',
    '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV'
  };

  useEffect(() => {
    initializeUser();
    loadChapter();
  }, [selectedBook, selectedChapter]);

  useEffect(() => {
    if (userId) {
      loadBookmarks();
    }
  }, [userId]);

  const initializeUser = async () => {
    let storedUserId = await AsyncStorage.getItem('user_id');
    if (!storedUserId) {
      storedUserId = await getUserId();
      await AsyncStorage.setItem('user_id', storedUserId);
    }
    setUserId(storedUserId);
  };

  const loadBookmarks = async () => {
    if (!userId || !supabase) return;

    const { data, error } = await supabase
      .from('bible_bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading bookmarks:', error);
      return;
    }

    if (data) {
      const formattedBookmarks: Bookmark[] = data.map(item => ({
        book: item.book,
        chapter: item.chapter,
        verse: item.verse,
        text: item.verse_text,
        date: item.created_at,
      }));
      setBookmarks(formattedBookmarks);
    }
  };

  const loadChapter = async () => {
    setLoading(true);
    try {
      const bookName = selectedBook.replace(' ', '');
      const response = await fetch(
        `https://bible-api.com/${bookName}+${selectedChapter}?translation=kjv`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch chapter');
      }

      const data = await response.json();

      if (data.verses && Array.isArray(data.verses)) {
        const verses: BibleVerse[] = data.verses.map((v: any) => ({
          verse: v.verse,
          text: v.text.trim(),
        }));
        setCurrentVerses(verses);
      } else {
        setCurrentVerses([]);
      }
    } catch (error) {
      console.error('Error loading chapter:', error);
      Alert.alert('Error', 'Failed to load chapter. Please try again.');
      setCurrentVerses([]);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async (verse: BibleVerse) => {
    if (!userId || !supabase) {
      Alert.alert('Error', 'User ID not initialized');
      return;
    }

    const { data, error } = await supabase
      .from('bible_bookmarks')
      .insert({
        user_id: userId,
        book: selectedBook,
        chapter: selectedChapter,
        verse: verse.verse,
        verse_text: verse.text,
      })
      .select()
      .maybeSingle();

    if (error) {
      if (error.code === '23505') {
        Alert.alert('Already Bookmarked', 'This verse is already in your bookmarks.');
      } else {
        Alert.alert('Error', 'Failed to save bookmark. Please try again.');
        console.error('Error saving bookmark:', error);
      }
      return;
    }

    if (data) {
      const bookmark: Bookmark = {
        book: selectedBook,
        chapter: selectedChapter,
        verse: verse.verse,
        text: verse.text,
        date: data.created_at,
      };
      setBookmarks([bookmark, ...bookmarks]);
      Alert.alert('Bookmark Saved', `${selectedBook} ${selectedChapter}:${verse.verse} has been bookmarked.`);
    }
  };

  const removeBookmark = async (bookmarkToRemove: Bookmark) => {
    if (!userId || !supabase) return;

    const { error } = await supabase
      .from('bible_bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('book', bookmarkToRemove.book)
      .eq('chapter', bookmarkToRemove.chapter)
      .eq('verse', bookmarkToRemove.verse);

    if (error) {
      Alert.alert('Error', 'Failed to remove bookmark. Please try again.');
      console.error('Error removing bookmark:', error);
      return;
    }

    const newBookmarks = bookmarks.filter(b =>
      !(b.book === bookmarkToRemove.book &&
        b.chapter === bookmarkToRemove.chapter &&
        b.verse === bookmarkToRemove.verse)
    );
    setBookmarks(newBookmarks);
  };

  const isVerseBookmarked = (verseNumber: number): boolean => {
    return bookmarks.some(b =>
      b.book === selectedBook &&
      b.chapter === selectedChapter &&
      b.verse === verseNumber
    );
  };

  const navigateChapter = (direction: 'prev' | 'next') => {
    const currentBook = bibleBooks.find(b => b.name === selectedBook);
    if (!currentBook) return;

    if (direction === 'next') {
      if (selectedChapter < currentBook.chapters) {
        setSelectedChapter(selectedChapter + 1);
      } else {
        // Move to next book
        const currentIndex = bibleBooks.findIndex(b => b.name === selectedBook);
        if (currentIndex < bibleBooks.length - 1) {
          setSelectedBook(bibleBooks[currentIndex + 1].name);
          setSelectedChapter(1);
        }
      }
    } else {
      if (selectedChapter > 1) {
        setSelectedChapter(selectedChapter - 1);
      } else {
        // Move to previous book
        const currentIndex = bibleBooks.findIndex(b => b.name === selectedBook);
        if (currentIndex > 0) {
          const prevBook = bibleBooks[currentIndex - 1];
          setSelectedBook(prevBook.name);
          setSelectedChapter(prevBook.chapters);
        }
      }
    }
  };

  const filteredBooks = bibleBooks.filter(book => {
    if (selectedTestament === 'All') return true;
    return book.testament === selectedTestament;
  });

  const currentBook = bibleBooks.find(b => b.name === selectedBook);
  const chapters = currentBook ? Array.from({ length: currentBook.chapters }, (_, i) => i + 1) : [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setBookModalVisible(true)} style={styles.headerButton}>
          <Text style={styles.headerTitle}>{selectedBook}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setChapterModalVisible(true)} style={styles.headerButton}>
          <Text style={styles.headerChapter}>Chapter {selectedChapter}</Text>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setBookmarksVisible(true)} style={styles.iconButton}>
            <Bookmark size={24} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSettingsVisible(true)} style={styles.iconButton}>
            <Settings size={24} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity 
          onPress={() => navigateChapter('prev')} 
          style={styles.navButton}
        >
          <ChevronLeft size={20} color="#6B7280" />
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigateChapter('next')} 
          style={styles.navButton}
        >
          <Text style={styles.navText}>Next</Text>
          <ChevronRight size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Bible Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.chapterHeader}>
          <Text style={styles.chapterTitle}>{selectedBook} {selectedChapter}</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary[500]} />
            <Text style={styles.loadingText}>Loading chapter...</Text>
          </View>
        ) : currentVerses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No verses found</Text>
            <Text style={styles.emptyStateSubtext}>Please try selecting a different chapter</Text>
          </View>
        ) : (
          currentVerses.map((verse) => {
            const isBookmarked = isVerseBookmarked(verse.verse);
            return (
              <View key={verse.verse} style={styles.verseContainer}>
                <Text style={styles.verseNumber}>{verse.verse}</Text>
                <Text style={[styles.verseText, { fontSize }]}>{verse.text}</Text>
                <TouchableOpacity
                  style={styles.bookmarkButton}
                  onPress={() => {
                    if (isBookmarked) {
                      const bookmarkToRemove = bookmarks.find(b =>
                        b.book === selectedBook &&
                        b.chapter === selectedChapter &&
                        b.verse === verse.verse
                      );
                      if (bookmarkToRemove) {
                        removeBookmark(bookmarkToRemove);
                      }
                    } else {
                      saveBookmark(verse);
                    }
                  }}
                >
                  <Bookmark
                    size={20}
                    color={isBookmarked ? Colors.primary[500] : "#9CA3AF"}
                    fill={isBookmarked ? Colors.primary[500] : "none"}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Book Selection Modal */}
      <Modal visible={bookModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Book</Text>
            <TouchableOpacity onPress={() => setBookModalVisible(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.testamentTabs}>
            {['All', 'Old', 'New'].map((testament) => (
              <TouchableOpacity
                key={testament}
                style={[
                  styles.testamentTab,
                  selectedTestament === testament && styles.activeTestamentTab
                ]}
                onPress={() => setSelectedTestament(testament as 'Old' | 'New' | 'All')}
              >
                <Text style={[
                  styles.testamentTabText,
                  selectedTestament === testament && styles.activeTestamentTabText
                ]}>
                  {testament} Testament
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.bookItem,
                  selectedBook === item.name && styles.selectedBookItem
                ]}
                onPress={() => {
                  setSelectedBook(item.name);
                  setSelectedChapter(1);
                  setBookModalVisible(false);
                }}
              >
                <Text style={[
                  styles.bookName,
                  selectedBook === item.name && styles.selectedBookName
                ]}>
                  {item.name}
                </Text>
                <Text style={styles.bookChapters}>{item.chapters} chapters</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Chapter Selection Modal */}
      <Modal visible={chapterModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedBook} - Select Chapter</Text>
            <TouchableOpacity onPress={() => setChapterModalVisible(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={chapters}
            numColumns={5}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.chapterItem,
                  selectedChapter === item && styles.selectedChapterItem
                ]}
                onPress={() => {
                  setSelectedChapter(item);
                  setChapterModalVisible(false);
                }}
              >
                <Text style={[
                  styles.chapterNumber,
                  selectedChapter === item && styles.selectedChapterNumber
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Bookmarks Modal */}
      <Modal visible={bookmarksVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bookmarks</Text>
            <TouchableOpacity onPress={() => setBookmarksVisible(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {bookmarks.length === 0 ? (
            <View style={styles.emptyState}>
              <Bookmark size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No bookmarks yet</Text>
              <Text style={styles.emptyStateSubtext}>Long press on any verse to bookmark it</Text>
            </View>
          ) : (
            <FlatList
              data={bookmarks}
              keyExtractor={(item, index) => `${item.book}-${item.chapter}-${item.verse}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.bookmarkItem}>
                  <TouchableOpacity
                    style={styles.bookmarkContent}
                    onPress={() => {
                      setSelectedBook(item.book);
                      setSelectedChapter(item.chapter);
                      setBookmarksVisible(false);
                    }}
                  >
                    <Text style={styles.bookmarkReference}>
                      {item.book} {item.chapter}:{item.verse}
                    </Text>
                    <Text style={styles.bookmarkText} numberOfLines={2}>
                      {item.text}
                    </Text>
                    <Text style={styles.bookmarkDate}>
                      {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeBookmark(item)}
                    style={styles.removeBookmark}
                  >
                    <X size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={settingsVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bible Settings</Text>
            <TouchableOpacity onPress={() => setSettingsVisible(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingsContent}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Font Size</Text>
              <View style={styles.fontSizeControls}>
                <TouchableOpacity
                  onPress={() => setFontSize(Math.max(12, fontSize - 2))}
                  style={styles.fontButton}
                >
                  <Minus size={20} color="#6B7280" />
                </TouchableOpacity>
                <Text style={styles.fontSizeText}>{fontSize}px</Text>
                <TouchableOpacity
                  onPress={() => setFontSize(Math.min(24, fontSize + 2))}
                  style={styles.fontButton}
                >
                  <Plus size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Sample Text</Text>
              <Text style={[styles.sampleText, { fontSize }]}>
                For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  headerButton: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[500],
    fontFamily: 'CrimsonText-Bold',
  },
  headerChapter: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.dark.bgCard,
    borderRadius: 8,
  },
  navText: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chapterHeader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'CrimsonText-Bold',
  },
  verseContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  verseNumber: {
    fontSize: 12,
    color: Colors.primary[500],
    fontWeight: 'bold',
    marginRight: 12,
    marginTop: 2,
    minWidth: 20,
  },
  verseText: {
    flex: 1,
    lineHeight: 24,
    color: Colors.text.secondary,
  },
  bookmarkButton: {
    padding: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'CrimsonText-Bold',
  },
  testamentTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.bgElevated,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  testamentTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTestamentTab: {
    borderBottomColor: Colors.primary[500],
  },
  testamentTabText: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  activeTestamentTabText: {
    color: Colors.primary[500],
    fontWeight: 'bold',
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.dark.bgElevated,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedBookItem: {
    backgroundColor: '#E0F2FE',
  },
  bookName: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  selectedBookName: {
    color: Colors.primary[500],
    fontWeight: 'bold',
  },
  bookChapters: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  chapterItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  selectedChapterItem: {
    backgroundColor: '#E0F2FE',
    borderColor: Colors.primary[500],
  },
  chapterNumber: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  selectedChapterNumber: {
    color: Colors.primary[500],
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    color: Colors.text.secondary,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  bookmarkItem: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.bgElevated,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  bookmarkContent: {
    flex: 1,
    padding: 16,
  },
  bookmarkReference: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary[500],
    marginBottom: 4,
  },
  bookmarkText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  bookmarkDate: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  removeBookmark: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsContent: {
    padding: 16,
  },
  settingItem: {
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSizeText: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  sampleText: {
    color: Colors.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 16,
  },
});