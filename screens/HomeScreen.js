import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, TextInput, ImageBackground, Animated } from 'react-native';
import { homeStyles as styles, welcomeStyles } from './style';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

// Try multiple hosts as fallback
const API_HOSTS = [
  'http://192.168.30.142:8000',
  'http://127.0.0.1:8000',
  'http://localhost:8000',
  'https://backend-fullstack-lostandfound.onrender.com',
];

let CURRENT_HOST = API_HOSTS[0]; // Track which host works

async function apiRequest(method, path, data = null) {
  let lastErr = null;
  for (const host of API_HOSTS) {
    const url = host + path;
    try {
      if (method === 'GET') {
        const response = await axios.get(url, { timeout: 5000 });  // 5 second timeout
        CURRENT_HOST = host; // Remember which host worked
        return response;
      }
    } catch (err) {
      lastErr = err;
      console.warn(`${method} failed for ${url}:`, err.message || err);
    }
  }
  throw lastErr;
}

function getFullImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return CURRENT_HOST + imagePath;
}

export default function HomeScreen({ navigation }) {

  // Animated status pill component to fade in per-item
  const StatusPill = ({ status }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-8)).current;
    useEffect(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 360, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 0, duration: 360, useNativeDriver: true }),
      ]).start();
    }, []);

    const isLost = status === 'LOST';

    return (
      <Animated.View style={[styles.statusPill, isLost ? styles.lostPill : styles.foundPill, styles.statusAbsolute, { opacity, transform: [{ translateX }] }]}>
        <Text style={styles.statusPillText}>{status}</Text>
      </Animated.View>
    );
  };

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const isFocused = useIsFocused();
  // Request a large page size so all posts are returned in one request.
  // Adjust this number to match expected maximum posts (e.g. 1000).
  const ITEMS_PER_PAGE = 1000;

  // Fetch on mount
  useEffect(() => {
    setPage(1);
    setItems([]);
    fetchItems(1, true);
  }, []);

  // Also refresh when screen becomes focused
  useEffect(() => {
    if (isFocused) {
      setPage(1);
      setItems([]);
      fetchItems(1, true);
    }
  }, [isFocused]);

  // Update filtered items when items or query change (debounced)
  useEffect(() => {
    const doFilter = () => {
      if (!query || !query.trim()) {
        setFilteredItems(items);
        return;
      }
      const q = query.trim().toLowerCase();
      const out = items.filter((it) => {
        const t = (it.title || '').toLowerCase();
        const d = (it.description || '').toLowerCase();
        return t.includes(q) || d.includes(q);
      });
      setFilteredItems(out);
    };

    // small debounce for typing
    const handle = setTimeout(doFilter, 200);
    return () => clearTimeout(handle);
  }, [items, query]);

  const fetchItems = async (pageNum, reset = false) => {
    setError(null);
    if (reset) setLoading(true);
    else setLoadingMore(true);
    
    try {
      // Always request the full set (large limit). Backend will return all items.
      const response = await apiRequest('GET', `/api/items/?limit=${ITEMS_PER_PAGE}&offset=0`);
      const newItems = response.data.results || response.data;

      // Replace items when resetting or on first load. We fetch all posts at once.
      setItems(newItems);
      setFilteredItems(newItems);
      setHasMore(false);
      setPage(1);

      // Prefetch images so the list renders quickly with cached images.
      try {
        newItems.forEach((it) => {
          const url = getFullImageUrl(it.image);
          if (url) Image.prefetch(url).catch(() => {});
        });
      } catch (e) {
        // ignore prefetch errors
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch items error:', err.message || err);
      setError(err.message || 'Network error');
      setLoading(false);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      fetchItems(page + 1);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/UA.jpeg')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={welcomeStyles.bgOverlay} />
      <View style={[styles.container, { backgroundColor: 'transparent' }]}> 
      {loading ? <ActivityIndicator size="large" /> : (
        <>
          <View>
            <View style={styles.searchRow}>
              <View style={{flex: 1}}>
                <View style={styles.searchContainer}>
                  <TextInput
                    placeholder="Search items (title or description)"
                    placeholderTextColor={'rgba(0,0,0,0.45)'}
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                    returnKeyType="search"
                    selectionColor={'#007AFF'}
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.refreshBtn}
                onPress={() => fetchItems(1, true)}
                accessibilityLabel="Refresh items"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                  <Text style={styles.refreshBtnText}>Refresh</Text>
                )}
              </TouchableOpacity>
            </View>

            {error ? <Text style={{color: 'red', marginTop: 8}}>{error}</Text> : null}
          </View>

          <FlatList
            ListFooterComponent={() => (
              loadingMore ? <ActivityIndicator size="small" style={{marginVertical: 20}} /> : null
            )}
            // We fetch all items in one request so infinite scroll is unnecessary.
            onEndReachedThreshold={0.5}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={10}
            windowSize={10}
            data={filteredItems.length ? filteredItems : items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
              {item.image ? (
                // WITH IMAGE: horizontal card that also shows description and a status/date row
                <View style={styles.cardRow}>
                  <StatusPill status={item.status} />
                  <View style={styles.leftThumbWrap}>
                    <Image 
                      source={{ uri: getFullImageUrl(item.image) }} 
                      style={styles.thumb}
                      defaultSource={require('../assets/icon.png')}
                      cache="force-cache"
                    />
                  </View>

                  <View style={styles.contentRight}>
                      <View style={styles.rowTop}>
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                      </View>

                      <Text numberOfLines={2} style={[styles.subtitle, {marginTop: 6}]}>{item.description || ''}</Text>

                      <Text style={styles.date}>{new Date(item.date_posted).toLocaleDateString()}, {new Date(item.date_posted).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                  </View>
                </View>
              ) : (
                // NO IMAGE: vertical card now shows title, description, status and date in the same order
                <View style={styles.cardNoImage}>
                  <StatusPill status={item.status} />
                  <Text style={styles.cardValue} numberOfLines={1}>{item.title}</Text>

                  <Text style={[styles.subtitle, {marginTop: 8, marginBottom: 6}]} numberOfLines={3}>{item.description || ''}</Text>

                  
                  <Text style={styles.date}>{new Date(item.date_posted).toLocaleDateString()}, {new Date(item.date_posted).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
          </>
      )}
      </View>
    </ImageBackground>
  );
}

// styles are imported from ./style and are named `styles` at the top