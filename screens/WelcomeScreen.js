import React from 'react';
import { View, Text, Button, ScrollView, Image } from 'react-native';
import { welcomeStyles as styles } from './style';

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
