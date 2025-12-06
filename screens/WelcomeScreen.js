import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>WELCOME TO UA</Text>
            <Text style={styles.subtitle}>LOST AND FOUND ITEMS</Text>
          </View>
          <Image source={require('../assets/ua-logo.png')} style={styles.logo} />
        </View>

        <View style={styles.divider} />
        
        <Text style={styles.description}>
          The University of the Assumption Lost & Found System helps you recover lost items and connect found items with their owners.
        </Text>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features:</Text>
          <Text style={styles.feature}>✓ Post Lost or Found Items</Text>
          <Text style={styles.feature}>✓ Browse Recent Listings</Text>
          <Text style={styles.feature}>✓ Edit Your Posts</Text>
          <Text style={styles.feature}>✓ Delete Items When Resolved</Text>
        </View>
        
        <View style={styles.howItWorks}>
          <Text style={styles.howTitle}>How It Works:</Text>
          <Text style={styles.howStep}>1. Click "Get Started" to browse items</Text>
          <Text style={styles.howStep}>2. Use "Post Item" to report lost/found items</Text>
          <Text style={styles.howStep}>3. Contact item owners via provided info</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Get Started" 
          onPress={() => navigation.navigate('Main')}
          color="#007AFF"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom: 30,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#007AFF',
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    marginLeft: -50,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  howItWorks: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
  },
  howTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  howStep: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
