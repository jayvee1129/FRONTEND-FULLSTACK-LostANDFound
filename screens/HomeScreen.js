import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

// Try multiple hosts as fallback
const API_HOSTS = [
  'http://192.168.30.142:8000',
  'http://127.0.0.1:8000',
  'http://localhost:8000',
];

async function apiRequest(method, path, data = null) {
  let lastErr = null;
  for (const host of API_HOSTS) {
    const url = host + path;
    try {
      if (method === 'GET') {
        return await axios.get(url);
      }
    } catch (err) {
      lastErr = err;
      console.warn(`${method} failed for ${url}:`, err.message || err);
    }
  }
  throw lastErr;
}

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused(); // triggers when screen comes into focus

  // Fetch on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Also refresh when screen becomes focused
  useEffect(() => {
    if (isFocused) fetchItems();
  }, [isFocused]);

  const fetchItems = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiRequest('GET', '/api/items/');
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch items error:', err.message || err);
      setError(err.message || 'Network error');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={{paddingBottom:8}}>
              {error ? <Text style={{color: 'red', marginBottom: 8}}>{error}</Text> : null}
              <TouchableOpacity onPress={fetchItems} style={{alignSelf:'flex-end', marginBottom:8}}>
                <Text style={{color:'#007AFF'}}>Refresh</Text>
              </TouchableOpacity>
            </View>
          )}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
              <View style={styles.card}>
                <View style={styles.headerRow}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={[styles.badge, item.status === 'LOST' ? styles.lost : styles.found]}>
                    {item.status}
                  </Text>
                </View>
                <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
                <Text style={styles.date}>{new Date(item.date_posted).toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 10 },
  card: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 2 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  title: { fontSize: 18, fontWeight: 'bold' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, overflow: 'hidden', color: 'white', fontSize: 12 },
  lost: { backgroundColor: '#d9534f' },
  found: { backgroundColor: '#5cb85c' },
  desc: { color: '#555', marginBottom: 5 },
  date: { color: '#999', fontSize: 12 }
});