import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { addItemStyles as styles, welcomeStyles } from './style';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

// Try multiple hosts as fallback
const API_HOSTS = [
  'http://192.168.30.142:8000',
  'http://127.0.0.1:8000',
  'http://localhost:8000',
  'https://backend-fullstack-lostandfound.onrender.com',
];

let CURRENT_HOST = API_HOSTS[0]; // will store the host that worked last

async function apiRequest(method, path, data = null, isFormData = false) {
  let lastErr = null;
  for (const host of API_HOSTS) {
    const url = host + path;
    try {
      // For FormData in Expo/React Native, fetch is more reliable than axios
      if (isFormData && method === 'POST') {
        const resp = await fetch(url, {
          method: 'POST',
          body: data,
        });
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`HTTP ${resp.status}: ${text}`);
        }
        const json = await resp.json();
        CURRENT_HOST = host;
        return { data: json };
      }

      // Non-form requests via axios
      const resp = await axios({ method, url, data });
      CURRENT_HOST = host;
      return resp;
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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,  // Reduced from 0.8 for faster upload
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image. Make sure you have granted permissions.');
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter an item title');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('status', status);
      formData.append('contact_info', contact);

      if (image) {
        try {
          const fileName = `item-${Date.now()}.jpg`;
          // Fetch the local file and convert to blob — this is more reliable on Expo/Android
          const fileResp = await fetch(image.uri);
          const blob = await fileResp.blob();
          formData.append('image', blob, fileName);
          console.log('Image blob appended, size:', blob.size, 'type:', blob.type);
        } catch (err) {
          console.warn('Failed to append image blob, falling back to direct uri append', err);
          const imageFile = {
            uri: image.uri,
            type: 'image/jpeg',
            name: `item-${Date.now()}.jpg`,
          };
          formData.append('image', imageFile);
          console.log('Image being sent (fallback):', imageFile);
        }
      }

      const response = await apiRequest('POST', '/api/items/', formData, true);
      console.log('Item posted successfully:', response.data);
      // Extra logging for debug
      if (!response || !response.data) console.warn('No response data from server');
      Alert.alert("Success", "Item Posted!");
      setTitle('');
      setDescription('');
      setContact('');
      setImage(null);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.detail || "Could not post item: " + (error.message || 'Network error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/UA.jpeg')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={welcomeStyles.bgOverlay} />
      <ScrollView style={[styles.container, { backgroundColor: 'transparent' }]}> 
      <Text style={styles.label}>What is the item?</Text>
      <TextInput style={styles.input} placeholder="e.g. Blue Wallet" value={title} onChangeText={setTitle} />
      
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} placeholder="Details..." value={description} onChangeText={setDescription} multiline numberOfLines={4} />

      <Text style={styles.label}>Contact Info</Text>
      <TextInput style={styles.input} placeholder="Phone or Email" value={contact} onChangeText={setContact} />

      <Text style={styles.label}>Upload Photo (Optional)</Text>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.removeImageBtn} onPress={() => setImage(null)}>
            <Text style={styles.removeImageText}>Remove Image</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage} disabled={loading}>
        <Text style={styles.uploadBtnText}>📁 Upload Image from Device</Text>
      </TouchableOpacity>

      <View style={styles.statusContainer}>
        <TouchableOpacity style={[styles.btn, status==='LOST' && styles.activeLost]} onPress={()=>setStatus('LOST')} disabled={loading}>
          <Text style={styles.btnText}>LOST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, status==='FOUND' && styles.activeFound]} onPress={()=>setStatus('FOUND')} disabled={loading}>
          <Text style={styles.btnText}>FOUND</Text>
        </TouchableOpacity>
      </View>

      <Button title={loading ? "Posting..." : "Post Item"} onPress={handleSubmit} disabled={loading} />
      </ScrollView>
    </ImageBackground>
  );
}

