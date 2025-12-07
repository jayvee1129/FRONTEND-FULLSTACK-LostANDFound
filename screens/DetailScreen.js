import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Image, ScrollView, ImageBackground, Animated } from 'react-native';
import { detailStyles as styles, welcomeStyles } from './style';
import axios from 'axios';

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
      if (method === 'PATCH') {
        const response = await axios.patch(url, data, {
          headers: { 'Content-Type': 'application/json' }
        });
        CURRENT_HOST = host; // Remember which host worked
        return response;
      } else if (method === 'DELETE') {
        const response = await axios.delete(url);
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

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  
  // State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [loading, setLoading] = useState(false);

  // Animated pill for detail screen
  const DetailStatus = ({ status, inline }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-10)).current;
    useEffect(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]).start();
    }, []);

    const isLost = status === 'LOST';

    const baseStyle = [styles.detailStatusPill, isLost ? styles.detailLost : styles.detailFound, { opacity, transform: [{ translateX }] }];
    if (inline) {
      return (
        <Animated.View style={baseStyle}>
          <Text style={styles.detailStatusPillText}>{status}</Text>
        </Animated.View>
      );
    }

    return (
      <Animated.View style={[...baseStyle, styles.detailPillAbsolute]}>
        <Text style={styles.detailStatusPillText}>{status}</Text>
      </Animated.View>
    );
  };

  // DELETE Function
  const handleDelete = async () => {
    try {
      setLoading(true);
      await apiRequest('DELETE', `/api/items/${item.id}/`);
      Alert.alert("Deleted", "Item removed successfully");
      navigation.navigate('Home'); // Go back to home after delete
    } catch (error) {
      Alert.alert("Error", error.message || "Could not delete");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE Function
  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty");
      return;
    }
    
    try {
      setLoading(true);
      console.log('Updating item:', { id: item.id, title, description });
      const response = await apiRequest('PATCH', `/api/items/${item.id}/`, { title, description });
      console.log('Update response:', response.data);
      setIsEditing(false);
      Alert.alert("Success", "Item updated!");
      // Refresh the home screen by navigating back
      navigation.navigate('Home');
    } catch (error) {
      console.error('Update error details:', error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.detail || error.message || "Could not update");
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
      {isEditing ? (
        // EDIT MODE
        <>
          <Text style={styles.label}>Edit Title:</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title" />
          <Text style={styles.label}>Edit Description:</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline numberOfLines={4} placeholder="Enter description" />
          <Button title={loading ? "Saving..." : "Save Changes"} onPress={handleUpdate} disabled={loading} />
          <View style={{marginTop: 10}}><Button title="Cancel" color="gray" onPress={() => setIsEditing(false)} disabled={loading} /></View>
        </>
      ) : (
        // VIEW MODE
        <>
          {item.image ? (
            <View style={{position: 'relative'}}>
              <Image source={{ uri: getFullImageUrl(item.image) }} style={styles.detailImage} />

              {/* Animated detail pill overlapping image */}
              <DetailStatus status={item.status} />
            </View>
          ) : (
            <DetailStatus status={item.status} inline />
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
          <Text style={styles.contact}>Contact: {item.contact_info}</Text>
          
          <View style={styles.actions}>
            <Button title="Edit" onPress={() => setIsEditing(true)} disabled={loading} />
            <View style={{marginTop: 10}}>
                <Button title="Delete" color="red" onPress={handleDelete} disabled={loading} />
            </View>
          </View>
        </>
      )}
      </ScrollView>
    </ImageBackground>
  );
}

