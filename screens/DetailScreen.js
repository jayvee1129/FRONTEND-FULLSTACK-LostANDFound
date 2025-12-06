import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
      if (method === 'PATCH') {
        return await axios.patch(url, data);
      } else if (method === 'DELETE') {
        return await axios.delete(url);
      }
    } catch (err) {
      lastErr = err;
      console.warn(`${method} failed for ${url}:`, err.message || err);
    }
  }
  throw lastErr;
}

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  
  // State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  // DELETE Function
  const handleDelete = async () => {
    try {
      await apiRequest('DELETE', `/api/items/${item.id}/`);
      Alert.alert("Deleted", "Item removed successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message || "Could not delete");
    }
  };

  // UPDATE Function
  const handleUpdate = async () => {
    try {
      await apiRequest('PATCH', `/api/items/${item.id}/`, { title, description });
      setIsEditing(false);
      Alert.alert("Success", "Item updated!");
    } catch (error) {
      Alert.alert("Error", error.message || "Could not update");
    }
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        // EDIT MODE
        <>
          <Text style={styles.label}>Edit Title:</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />
          <Text style={styles.label}>Edit Description:</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />
          <Button title="Save Changes" onPress={handleUpdate} />
          <View style={{marginTop: 10}}><Button title="Cancel" color="gray" onPress={() => setIsEditing(false)} /></View>
        </>
      ) : (
        // VIEW MODE
        <>
          <Text style={styles.status}>{item.status}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
          <Text style={styles.contact}>Contact: {item.contact_info}</Text>
          
          <View style={styles.actions}>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
            <View style={{marginTop: 10}}>
                <Button title="Delete" color="red" onPress={handleDelete} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  status: { color: 'gray', textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 20, lineHeight: 24 },
  contact: { fontSize: 14, fontStyle: 'italic', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 5 }
});