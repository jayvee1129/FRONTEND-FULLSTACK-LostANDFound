import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

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
      if (method === 'POST') {
        return await axios.post(url, data);
      }
    } catch (err) {
      lastErr = err;
      console.warn(`${method} failed for ${url}:`, err.message || err);
    }
  }
  throw lastErr;
}

export default function AddItemScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('LOST');

  const handleSubmit = async () => {
    try {
      const response = await apiRequest('POST', '/api/items/', { 
        title, 
        description, 
        status,
        contact_info: contact
      });
      console.log('Item posted successfully:', response.data);
      Alert.alert("Success", "Item Posted!");
      setTitle(''); setDescription(''); setContact('');
      navigation.navigate('Home'); 
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.detail || "Could not post item: " + (error.message || 'Network error'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is the item?</Text>
      <TextInput style={styles.input} placeholder="e.g. Blue Wallet" value={title} onChangeText={setTitle} />
      
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} placeholder="Details..." value={description} onChangeText={setDescription} multiline />

      <Text style={styles.label}>Contact Info</Text>
      <TextInput style={styles.input} placeholder="Phone or Email" value={contact} onChangeText={setContact} />

      <View style={styles.statusContainer}>
        <TouchableOpacity style={[styles.btn, status==='LOST' && styles.activeLost]} onPress={()=>setStatus('LOST')}>
          <Text style={styles.btnText}>LOST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, status==='FOUND' && styles.activeFound]} onPress={()=>setStatus('FOUND')}>
          <Text style={styles.btnText}>FOUND</Text>
        </TouchableOpacity>
      </View>

      <Button title="Post Item" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  btn: { flex: 1, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  activeLost: { backgroundColor: '#d9534f', borderColor: '#d9534f' },
  activeFound: { backgroundColor: '#5cb85c', borderColor: '#5cb85c' },
  btnText: { fontWeight: 'bold' }
});