import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
import { homeStyles as styles } from './style';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

// Try multiple hosts as fallback
const API_HOSTS = [
  'http://192.168.30.142:8000',
  'http://127.0.0.1:8000',
  'http://localhost:8000',
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
    <View style={styles.container}>
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
                // WITH IMAGE: horizontal card
                <View style={styles.cardRow}>
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
                      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                      <Text style={[styles.badge, item.status === 'LOST' ? styles.lost : styles.found]}>{item.status}</Text>
                    </View>

                    <Text numberOfLines={1} style={styles.subtitle}>{item.description}</Text>
                    <Text style={styles.date}>{new Date(item.date_posted).toLocaleDateString()}, {new Date(item.date_posted).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                  </View>
                </View>
              ) : (
                // NO IMAGE: vertical card with Status/Date
                <View style={styles.cardNoImage}>
                  <Text style={styles.cardValue} numberOfLines={1}>{item.title}</Text>
                  
                  <Text style={styles.cardLabel}>Status: <Text style={[styles.statusBadgeText, item.status === 'LOST' ? styles.lostText : styles.foundText]}>{item.status}</Text></Text>
                  
                  <Text style={styles.cardDate}>{new Date(item.date_posted).toLocaleDateString()}, {new Date(item.date_posted).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
          </>
      )}
    </View>
  );
}

// styles are imported from ./style and are named `styles` at the top